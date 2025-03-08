
import { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const handleSupabaseSession = (session, setUser, setIsLoading) => {
  if (session) {
    const userData = {
      id: session.user.id,
      email: session.user.email,
      username: session.user.user_metadata?.username || 'User',
      points: 0,
      solvedChallenges: 0,
      rank: 'Beginner'
    };
    
    setUser(userData);
  }
  
  setIsLoading(false);
};

const loginUser = async (email, password) => {
  if (!email || !password) {
    return { success: false, error: "Email and password are required" };
  }
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    if (!data.session) {
      return { success: false, error: "No session created" };
    }
    
    const user = {
      id: data.user.id,
      email: data.user.email,
      username: data.user.user_metadata?.username || 'User',
      points: 0,
      solvedChallenges: 0,
      rank: 'Beginner'
    };
    
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const registerUser = async (username, email, password) => {
  if (!username || !email || !password) {
    return { success: false, error: "Username, email, and password are required" };
  }
  
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { 
          username,
        },
      }
    });
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert(
        {
          id: data.user.id,
          username,
          email,
          points: 0,
          solved_challenges: 0,
          rank: 'Beginner',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        { onConflict: 'id' }
      );
    
    if (profileError) {
      console.error("Error creating profile:", profileError);
    }
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const logoutUser = async () => {
  try {
    await supabase.auth.signOut();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if we have a session
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSupabaseSession(session, setUser, setIsLoading);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        handleSupabaseSession(session, setUser, setIsLoading);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    try {
      const result = await loginUser(email, password);
      
      if (!result.success) {
        toast({
          title: "Login failed",
          description: result.error,
          variant: "destructive",
        });
        return false;
      }

      setUser(result.user);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      return true;
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message || "An error occurred during login",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (username, email, password) => {
    try {
      const result = await registerUser(username, email, password);
      
      if (!result.success) {
        toast({
          title: "Registration failed",
          description: result.error,
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Registration successful",
        description: "Your account has been created. Please check your email for verification.",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
