
import React from "react";
import { Check } from "lucide-react";

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategories,
  onChange,
}) => {
  return (
    <div className="glass-card p-5 rounded-lg">
      <h3 className="text-lg font-medium mb-4 text-white">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <div
            key={category}
            className="flex items-center"
          >
            <button
              onClick={() => onChange(category)}
              className={`mr-2 h-5 w-5 rounded border transition-colors flex items-center justify-center
                ${
                  selectedCategories.includes(category)
                    ? "border-ctf-orange bg-ctf-orange/20"
                    : "border-gray-600"
                }`}
            >
              {selectedCategories.includes(category) && (
                <Check className="h-3 w-3 text-ctf-orange" />
              )}
            </button>
            <span className="text-gray-300">{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
