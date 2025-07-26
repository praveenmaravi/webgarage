// src/components/hostingDeploy/DeployModal.tsx
import React from "react";

interface DeployModalProps {
  isOpen: boolean;
  deploymentStatus: string;
  onClose: () => void;
}

const DeployModal: React.FC<DeployModalProps> = ({
  isOpen,
  deploymentStatus,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg max-w-sm w-full shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Deployment Status</h2>
        <p className="text-lg">{deploymentStatus}</p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeployModal;
