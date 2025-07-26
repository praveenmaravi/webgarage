import React from "react";

interface DashboardHeaderProps {
  projectName?: string | null;
  onOpenStudio?: () => void;
  onSettingsClick?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  projectName,
  onOpenStudio,
  onSettingsClick,
}) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-700 bg-gray-900 text-white">
      <h1 className="text-2xl font-semibold truncate">
        {projectName ?? "Select a Project"}
      </h1>

      <div className="flex space-x-4">
        <button
          onClick={onOpenStudio}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white transition"
          aria-label="Open Studio"
        >
          Open Studio
        </button>

        <button
          onClick={onSettingsClick}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white transition"
          aria-label="Project Settings"
        >
          Settings
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
