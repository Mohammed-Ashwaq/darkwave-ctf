
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

export interface User {
  id: string;
  username: string;
  email: string;
  points: number;
  solvedChallenges: number;
  rank: string;
  avatarUrl?: string;
  bio?: string;
}

// Function to fetch user profile data from profiles table
export const fetchUserProfile = async (userId: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }

  return {
    id: data.id,
    username: data.username,
    email: data.email,
    points: data.points,
    solvedChallenges: data.solved_challenges,
    rank: data.rank,
    avatarUrl: data.avatar_url,
    bio: data.bio,
  };
};

// Function to handle setting up user from Supabase session
export const handleSupabaseSession = async (
  session: { user: SupabaseUser } | null,
  setUser: (user: User | null) => void,
  setIsLoading: (isLoading: boolean) => void
): Promise<void> => {
  if (session?.user) {
    const userData = await fetchUserProfile(session.user.id);
    if (userData) {
      setUser(userData);
    }
  } else {
    setUser(null);
  }
  setIsLoading(false);
};

// Login function
export const loginUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  const userData = await fetchUserProfile(data.user.id);
  if (!userData) {
    return { success: false, error: "Failed to load user profile" };
  }

  return { success: true, user: userData };
};

// Register function
export const registerUser = async (username: string, email: string, password: string) => {
  try {
    // Create auth user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          username,
        },
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    // Check if profile already exists
    if (data.user) {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (profileError && profileError.code !== "PGRST116") {
        // If error is not "no rows returned", it's a real error
        console.error("Error checking profile:", profileError);
      }

      // If profile doesn't exist, create it manually
      if (!profileData) {
        const { error: insertError } = await supabase
          .from("profiles")
          .insert([
            {
              id: data.user.id,
              username,
              email,
              points: 0,
              solved_challenges: 0,
              rank: "Beginner"
            }
          ]);

        if (insertError) {
          console.error("Error creating profile:", insertError);
          return { success: false, error: "Failed to create user profile" };
        }
      }
    }
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Registration failed" };
  }
};

// Logout function
export const logoutUser = async () => {
  await supabase.auth.signOut();
};
