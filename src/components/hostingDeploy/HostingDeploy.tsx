import React, { useState } from 'react';
import DeployButton from './DeployButton';
import DeployModal from './DeployModal';
import { deployToNetlify, deployToVercel } from './deployUtils';

const HostingDeploy = () => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<'netlify' | 'vercel' | null>(null);

  const handleDeploy = async () => {
    if (!selectedPlatform) {
      setDeploymentStatus("Please select a platform to deploy.");
      return;
    }

    setIsDeploying(true);
    setDeploymentStatus("Deploying...");

    try {
      let result;
      if (selectedPlatform === 'netlify') {
        result = await deployToNetlify('your-project-id'); // Replace with actual project ID
      } else if (selectedPlatform === 'vercel') {
        result = await deployToVercel('your-project-id'); // Replace with actual project ID
      }

      setDeploymentStatus(result);
    } catch (error) {
      setDeploymentStatus("Deployment failed. Please try again.");
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="hosting-deploy">
      <h2 className="text-2xl font-bold mb-4">Hosting & Deployment</h2>
      
      {/* Platform selection */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`${
            selectedPlatform === 'netlify' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          } py-2 px-4 rounded-lg`}
          onClick={() => setSelectedPlatform('netlify')}
        >
          Netlify
        </button>
        <button
          className={`${
            selectedPlatform === 'vercel' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          } py-2 px-4 rounded-lg`}
          onClick={() => setSelectedPlatform('vercel')}
        >
          Vercel
        </button>
      </div>

      {/* Deploy Button */}
      <DeployButton isDeploying={isDeploying} onDeploy={handleDeploy} />
      
      {/* Deployment status modal */}
      {deploymentStatus && (
        <DeployModal
          isOpen={!!deploymentStatus}
          deploymentStatus={deploymentStatus}
          onClose={() => setDeploymentStatus(null)}
        />
      )}
    </div>
  );
};

export default HostingDeploy;
