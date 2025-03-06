
import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { register, isAuthenticated } = useAuth();

  // Simple email validation regex
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const success = await register(username, email, password);
      if (!success) {
        setError("Registration failed. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during registration");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12 flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="glass-card rounded-lg p-8">
            <h1 className="text-2xl font-bold text-white text-center mb-6">Create an Account</h1>
            
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-md mb-6">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username field */}
              <div>
                <label htmlFor="username" className="block text-gray-300 mb-2">Username</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <User size={18} />
                  </span>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full bg-ctf-card/70 border border-gray-700 pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-ctf-blue text-white"
                    placeholder="Choose a username"
                  />
                </div>
              </div>
              
              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <Mail size={18} />
                  </span>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-ctf-card/70 border border-gray-700 pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-ctf-blue text-white"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              {/* Password field */}
              <div>
                <label htmlFor="password" className="block text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <Lock size={18} />
                  </span>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full bg-ctf-card/70 border border-gray-700 pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-ctf-blue text-white"
                    placeholder="Create a secure password"
                  />
                </div>
              </div>
              
              {/* Confirm Password field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-gray-300 mb-2">Confirm Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <Lock size={18} />
                  </span>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full bg-ctf-card/70 border border-gray-700 pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-ctf-blue text-white"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
              
              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-ctf-orange hover:bg-ctf-orange/90 text-white font-medium px-4 py-3 rounded-md transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Create Account <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-ctf-blue hover:underline">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
