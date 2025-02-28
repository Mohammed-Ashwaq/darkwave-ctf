
import React from "react";
import { Check } from "lucide-react";

interface DifficultyFilterProps {
  difficulties: string[];
  selectedDifficulties: string[];
  onChange: (difficulty: string) => void;
}

const DifficultyFilter: React.FC<DifficultyFilterProps> = ({
  difficulties,
  selectedDifficulties,
  onChange,
}) => {
  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-600";
      case "Medium":
        return "bg-yellow-600";
      case "Hard":
        return "bg-red-600";
      case "Expert":
        return "bg-purple-600";
      default:
        return "bg-green-600";
    }
  };

  return (
    <div className="glass-card p-5 rounded-lg">
      <h3 className="text-lg font-medium mb-4 text-white">Difficulty</h3>
      <div className="space-y-2">
        {difficulties.map((difficulty) => (
          <div
            key={difficulty}
            className="flex items-center"
          >
            <button
              onClick={() => onChange(difficulty)}
              className={`mr-2 h-5 w-5 rounded border transition-colors flex items-center justify-center
                ${
                  selectedDifficulties.includes(difficulty)
                    ? "border-ctf-orange bg-ctf-orange/20"
                    : "border-gray-600"
                }`}
            >
              {selectedDifficulties.includes(difficulty) && (
                <Check className="h-3 w-3 text-ctf-orange" />
              )}
            </button>
            <div className="flex items-center">
              <div className={`h-3 w-3 rounded-full mr-2 ${getDifficultyColor(difficulty)}`}></div>
              <span className="text-gray-300">{difficulty}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DifficultyFilter;
