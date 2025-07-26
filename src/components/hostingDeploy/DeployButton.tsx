// src/components/hostingDeploy/DeployButton.tsx
import React, { useState } from "react";

interface DeployButtonProps {
  isDeploying: boolean;
  onDeploy: () => void;
}

const DeployButton: React.FC<DeployButtonProps> = ({ isDeploying, onDeploy }) => {
  const [deployStatus, setDeployStatus] = useState<string>("");

  const handleClick = async () => {
    setDeployStatus("Deploying...");
    await onDeploy();
    setDeployStatus("Deployment Successful!");
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        className={`deploy-btn py-2 px-4 rounded-lg text-white transition-all duration-300 ${
          isDeploying ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
        onClick={handleClick}
        disabled={isDeploying}
      >
        {isDeploying ? "Deploying..." : "Deploy to Netlify / Vercel"}
      </button>

      {/* Display deployment status */}
      {deployStatus && (
        <p className={`status-text ${deployStatus === "Deployment Successful!" ? "text-green-500" : "text-red-500"}`}>
          {deployStatus}
        </p>
      )}
    </div>
  );
};

export default DeployButton;
