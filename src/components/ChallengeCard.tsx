
import { ThumbsUp, User } from "lucide-react";
import { Link } from "react-router-dom";

export interface ChallengeCardProps {
  id: string;
  title: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  solves: number;
  solveRate: number;
}

const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case "Easy":
      return "bg-green-600 text-white";
    case "Medium":
      return "bg-yellow-600 text-white";
    case "Hard":
      return "bg-red-600 text-white";
    case "Expert":
      return "bg-purple-600 text-white";
    default:
      return "bg-green-600 text-white";
  }
};

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  id,
  title,
  category,
  difficulty,
  solves,
  solveRate,
}) => {
  const difficultyClass = getDifficultyColor(difficulty);

  return (
    <Link
      to={`/challenges/${id}`}
      className="glass-card rounded-lg overflow-hidden hover-scale transform-gpu"
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="text-ctf-muted text-sm flex items-center">
            <span>{category}</span>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyClass}`}>
            {difficulty}
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
        
        <div className="flex items-center justify-between text-sm text-ctf-muted mt-4">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            <span>{solves.toLocaleString()} solves</span>
          </div>
          <div className="flex items-center">
            <ThumbsUp className="w-4 h-4 mr-1" />
            <span>{solveRate}%</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ChallengeCard;
