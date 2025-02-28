
import { ArrowRight, Award, Flag, Server, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import ChallengeCard from "@/components/ChallengeCard";
import StatCard from "@/components/StatCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const featuredChallenges = [
  {
    id: "1",
    title: "Binary Search",
    category: "General Skills",
    difficulty: "Easy",
    solves: 40501,
    solveRate: 93,
  },
  {
    id: "2",
    title: "Time Machine",
    category: "General Skills",
    difficulty: "Easy",
    solves: 35463,
    solveRate: 93,
  },
  {
    id: "3",
    title: "Super SSH",
    category: "General Skills",
    difficulty: "Easy",
    solves: 48545,
    solveRate: 94,
  },
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Stats Section */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="Challenges" 
                value="150+" 
                description="Across multiple categories" 
                icon={<Flag className="w-6 h-6 text-ctf-blue" />}
              />
              <StatCard 
                title="Players" 
                value="10,000+" 
                description="From around the world"
                icon={<Users className="w-6 h-6 text-ctf-blue" />}
              />
              <StatCard 
                title="Competitions" 
                value="24" 
                description="Annually with prizes"
                icon={<Award className="w-6 h-6 text-ctf-blue" />}
              />
              <StatCard 
                title="Servers" 
                value="99.9%" 
                description="Uptime for reliability"
                icon={<Server className="w-6 h-6 text-ctf-blue" />}
              />
            </div>
          </div>
        </section>
        
        {/* Featured Challenges */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white">Featured Challenges</h2>
              <Link 
                to="/challenges" 
                className="text-ctf-blue hover:text-ctf-blue/90 flex items-center gap-1 font-medium"
              >
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredChallenges.map((challenge) => (
                <ChallengeCard 
                  key={challenge.id}
                  id={challenge.id}
                  title={challenge.title}
                  category={challenge.category}
                  difficulty={challenge.difficulty as any}
                  solves={challenge.solves}
                  solveRate={challenge.solveRate}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="glass-card rounded-lg overflow-hidden">
              <div className="p-8 md:p-12 relative">
                {/* Background decorations */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-ctf-orange/10 rounded-full blur-[80px] -z-0"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-ctf-blue/10 rounded-full blur-[80px] -z-0"></div>
                
                <div className="max-w-3xl relative z-10">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                    Ready to test your cybersecurity skills?
                  </h2>
                  <p className="text-gray-300 mb-8">
                    Join thousands of security professionals and enthusiasts. Solve challenges, learn new techniques, and compete with others in our global community.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                      to="/challenges" 
                      className="bg-ctf-blue hover:bg-ctf-blue/90 text-white font-medium px-6 py-3 rounded-md flex items-center justify-center gap-2 transition-colors"
                    >
                      Browse Challenges <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link 
                      to="/register" 
                      className="bg-ctf-card hover:bg-ctf-card/70 text-white font-medium px-6 py-3 rounded-md transition-colors text-center"
                    >
                      Sign Up Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
