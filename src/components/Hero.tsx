
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-ctf-blue/10 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-ctf-orange/10 rounded-full blur-[100px] -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <span className="bg-ctf-orange/20 text-ctf-orange px-3 py-1 rounded-full text-sm font-medium animate-pulse-slow">
              New challenges every week
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white text-shadow animate-fade-in">
            Master Cybersecurity with <span className="text-ctf-blue">DarkWave</span> <span className="text-ctf-orange">CTF</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-10 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Test your skills, learn new techniques, and climb the ranks in our cutting-edge cyber security challenges platform.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Link 
              to="/challenges" 
              className="bg-ctf-blue hover:bg-ctf-blue/90 text-white font-medium px-6 py-3 rounded-md flex items-center justify-center gap-2 transition-colors"
            >
              Start Hacking <ArrowRight className="h-4 w-4" />
            </Link>
            <Link 
              to="/register" 
              className="bg-ctf-card hover:bg-ctf-card/70 text-white font-medium px-6 py-3 rounded-md transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
