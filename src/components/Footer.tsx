
import { Terminal, Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-ctf-card/50 border-t border-white/10 py-8 mt-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <Terminal className="h-5 w-5 text-ctf-orange mr-2" />
            <p className="text-white font-bold">DarkWave CTF</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 border-t border-white/10 pt-6 text-center md:text-left">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} DarkWave CTF. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
