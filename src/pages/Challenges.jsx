import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChallengeCard from "@/components/ChallengeCard";
import CategoryFilter from "@/components/CategoryFilter";
import DifficultyFilter from "@/components/DifficultyFilter";
import { Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const allChallenges = [
  // Existing challenges
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
  {
    id: "4",
    title: "endianness",
    category: "General Skills",
    difficulty: "Easy",
    solves: 16623,
    solveRate: 59,
  },
  {
    id: "5",
    title: "Commitment Issues",
    category: "General Skills",
    difficulty: "Easy",
    solves: 22943,
    solveRate: 96,
  },
  // New General Skills Challenges
  {
    id: "16",
    title: "Bit Flipper",
    category: "General Skills",
    difficulty: "Easy",
    solves: 8742,
    solveRate: 88,
    description: "Learn how to manipulate bits and understand binary operations."
  },
  {
    id: "17",
    title: "Regex Master",
    category: "General Skills",
    difficulty: "Medium",
    solves: 5621,
    solveRate: 76,
    description: "Apply your regex skills to extract patterns from a large dataset."
  },
  {
    id: "18",
    title: "Command Line Ninja",
    category: "General Skills",
    difficulty: "Easy",
    solves: 9832,
    solveRate: 92,
    description: "Navigate through a complex directory structure using only command line tools."
  },
  {
    id: "19",
    title: "Base Converter",
    category: "General Skills",
    difficulty: "Medium",
    solves: 4328,
    solveRate: 65,
    description: "Convert between different number bases to reveal the hidden message."
  },
  {
    id: "20",
    title: "Cipher Decoder",
    category: "General Skills",
    difficulty: "Medium",
    solves: 3765,
    solveRate: 58,
    description: "Decode messages encrypted with classical ciphers."
  },
  // Existing challenges 
  {
    id: "6",
    title: "Collaborative Development",
    category: "General Skills",
    difficulty: "Easy",
    solves: 16860,
    solveRate: 95,
  },
  {
    id: "7",
    title: "Blame Game",
    category: "General Skills",
    difficulty: "Easy",
    solves: 19542,
    solveRate: 91,
  },
  {
    id: "8",
    title: "binhexa",
    category: "General Skills",
    difficulty: "Easy",
    solves: 17136,
    solveRate: 81,
  },
  {
    id: "9",
    title: "repetitions",
    category: "General Skills",
    difficulty: "Easy",
    solves: 31042,
    solveRate: 89,
  },
  {
    id: "10",
    title: "SQL Injection Basics",
    category: "Web Exploitation",
    difficulty: "Medium",
    solves: 15243,
    solveRate: 78,
  },
  {
    id: "11",
    title: "XSS Adventure",
    category: "Web Exploitation",
    difficulty: "Medium",
    solves: 12578,
    solveRate: 67,
  },
  // New Web Exploitation Challenges
  {
    id: "21",
    title: "Cookie Monster",
    category: "Web Exploitation",
    difficulty: "Easy",
    solves: 7832,
    solveRate: 82,
    description: "Manipulate browser cookies to gain unauthorized access to a web application."
  },
  {
    id: "22",
    title: "JWT Weakness",
    category: "Web Exploitation",
    difficulty: "Medium",
    solves: 4521,
    solveRate: 63,
    description: "Exploit weaknesses in JWT implementation to forge authentication tokens."
  },
  {
    id: "23",
    title: "CSRF Attack",
    category: "Web Exploitation",
    difficulty: "Medium",
    solves: 3298,
    solveRate: 58,
    description: "Perform a Cross-Site Request Forgery attack to execute unauthorized actions."
  },
  {
    id: "24",
    title: "API Bypass",
    category: "Web Exploitation",
    difficulty: "Hard",
    solves: 2154,
    solveRate: 43,
    description: "Bypass API security controls to access restricted endpoints."
  },
  {
    id: "25",
    title: "Prototype Pollution",
    category: "Web Exploitation",
    difficulty: "Hard",
    solves: 1876,
    solveRate: 38,
    description: "Exploit JavaScript prototype pollution to compromise a web application."
  },
  // Remaining existing challenges
  {
    id: "12",
    title: "Memory Corruption",
    category: "Binary Exploitation",
    difficulty: "Hard",
    solves: 5428,
    solveRate: 42,
  },
  {
    id: "13",
    title: "Reverse Engineering Challenge",
    category: "Reverse Engineering",
    difficulty: "Hard",
    solves: 6219,
    solveRate: 39,
  },
  {
    id: "14",
    title: "Cryptographic Puzzle",
    category: "Cryptography",
    difficulty: "Medium",
    solves: 9876,
    solveRate: 54,
  },
  {
    id: "15",
    title: "Forensics Investigation",
    category: "Forensics",
    difficulty: "Expert",
    solves: 3421,
    solveRate: 28,
  },
];

const categories = [
  "General Skills",
  "Web Exploitation",
  "Binary Exploitation",
  "Reverse Engineering",
  "Cryptography",
  "Forensics",
];

const difficulties = ["Easy", "Medium", "Hard", "Expert"];

const Challenges = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleDifficultyChange = (difficulty) => {
    if (selectedDifficulties.includes(difficulty)) {
      setSelectedDifficulties(selectedDifficulties.filter((d) => d !== difficulty));
    } else {
      setSelectedDifficulties([...selectedDifficulties, difficulty]);
    }
  };

  const filteredChallenges = allChallenges.filter((challenge) => {
    // Filter by search term
    const matchesSearchTerm = challenge.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Filter by category
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(challenge.category);

    // Filter by difficulty
    const matchesDifficulty =
      selectedDifficulties.length === 0 ||
      selectedDifficulties.includes(challenge.difficulty);

    return matchesSearchTerm && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">Challenges</h1>
            <p className="text-gray-300">
              Browse through our collection of challenges across different categories and difficulty levels.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search challenges..."
                className="glass-card pl-10 pr-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-ctf-blue text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Column */}
            <div className="space-y-6">
              <CategoryFilter
                categories={categories}
                selectedCategories={selectedCategories}
                onChange={handleCategoryChange}
              />
              
              <DifficultyFilter
                difficulties={difficulties}
                selectedDifficulties={selectedDifficulties}
                onChange={handleDifficultyChange}
              />
            </div>
            
            {/* Challenges Grid */}
            <div className="lg:col-span-3">
              {filteredChallenges.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredChallenges.map((challenge) => (
                    <ChallengeCard
                      key={challenge.id}
                      id={challenge.id}
                      title={challenge.title}
                      category={challenge.category}
                      difficulty={challenge.difficulty}
                      solves={challenge.solves}
                      solveRate={challenge.solveRate}
                    />
                  ))}
                </div>
              ) : (
                <div className="glass-card rounded-lg p-8 text-center">
                  <p className="text-gray-300">No challenges found matching your filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Challenges;
