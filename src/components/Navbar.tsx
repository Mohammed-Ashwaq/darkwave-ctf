
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Terminal, Award, Flag, User, BarChart, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-ctf-background/90 backdrop-blur-lg border-b border-white/10 py-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-white">
            <Terminal className="h-6 w-6 text-ctf-orange" />
            <span className="tracking-tight">DarkWave CTF</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/challenges" icon={<Flag className="w-4 h-4 mr-1" />} text="Challenges" />
            <NavLink to="/leaderboard" icon={<Award className="w-4 h-4 mr-1" />} text="Leaderboard" />
            <NavLink to="/scoreboard" icon={<BarChart className="w-4 h-4 mr-1" />} text="Scoreboard" />
            
            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard" icon={<User className="w-4 h-4 mr-1" />} text="Dashboard" />
                <button 
                  onClick={handleLogout}
                  className="bg-ctf-card hover:bg-ctf-card/70 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  <LogIn className="w-4 h-4 mr-1" />
                  Log In
                </Link>
                <Link 
                  to="/register"
                  className="bg-ctf-orange hover:bg-ctf-orange/90 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <button onClick={toggleNavbar} className="md:hidden text-white">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-3 animate-fade-in">
            <MobileNavLink to="/challenges" text="Challenges" />
            <MobileNavLink to="/leaderboard" text="Leaderboard" />
            <MobileNavLink to="/scoreboard" text="Scoreboard" />
            
            {isAuthenticated ? (
              <>
                <MobileNavLink to="/dashboard" text="Dashboard" />
                <button 
                  onClick={handleLogout}
                  className="bg-ctf-card hover:bg-ctf-card/70 text-white py-2 rounded-md transition-colors mt-2"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <MobileNavLink to="/login" text="Log In" />
                <Link 
                  to="/register"
                  className="bg-ctf-orange hover:bg-ctf-orange/90 text-white py-2 rounded-md transition-colors mt-2 text-center"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) => (
  <Link 
    to={to} 
    className="flex items-center text-gray-300 hover:text-white hover:border-b-2 hover:border-ctf-orange transition-all pb-1"
  >
    {icon}
    {text}
  </Link>
);

const MobileNavLink = ({ to, text }: { to: string; text: string }) => (
  <Link 
    to={to} 
    className="text-gray-300 hover:text-white hover:bg-ctf-card p-2 rounded-md transition-colors"
  >
    {text}
  </Link>
);

export default Navbar;
