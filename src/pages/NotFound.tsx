
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-ctf-blue mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Page Not Found</h2>
          <p className="text-gray-300 max-w-md mx-auto mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          
          <Link 
            to="/" 
            className="inline-flex items-center bg-ctf-blue hover:bg-ctf-blue/90 text-white font-medium px-6 py-3 rounded-md transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
