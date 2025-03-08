
import React from "react";

const StatCard = ({ title, value, description, icon }) => {
  return (
    <div className="glass-card rounded-lg p-6 hover-scale">
      <div className="flex items-start">
        <div className="bg-ctf-blue/20 p-3 rounded-lg mr-4">
          {icon}
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-400">{title}</h3>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
          {description && (
            <p className="text-sm text-gray-400 mt-1">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
