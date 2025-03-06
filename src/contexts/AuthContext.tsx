
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  username: string;
  email: string;
  points: number;
  solvedChallenges: number;
  rank: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would make an API call to verify credentials
      // For demo purposes, we'll use a mock user
      if (email === "demo@example.com" && password === "password") {
        const mockUser: User = {
          id: "1",
          username: "demouser",
          email: "demo@example.com",
          points: 1250,
          solvedChallenges: 8,
          rank: "Advanced"
        };
        
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        return true;
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An error occurred during login",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      // In a real app, this would make an API call to create a user
      // For demo purposes, we'll create a mock user
      const mockUser: User = {
        id: Date.now().toString(),
        username,
        email,
        points: 0,
        solvedChallenges: 0,
        rank: "Beginner"
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      toast({
        title: "Registration successful",
        description: "Your account has been created",
      });
      return true;
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An error occurred during registration",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
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
