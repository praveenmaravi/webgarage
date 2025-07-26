import React, { ReactNode } from "react";

interface StudioLayoutProps {
  children: ReactNode;
  mode: "2d" | "3d";
  onModeChange: (mode: "2d" | "3d") => void;
}

const StudioLayout: React.FC<StudioLayoutProps> = ({ children, mode, onModeChange }) => {
  return (
    <div className="h-screen flex flex-col bg-gray-100 text-gray-900">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-300 shadow-sm">
        <div className="text-xl font-semibold">WebGarage Studio</div>

        {/* Mode Toggle */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onModeChange("2d")}
            className={`px-3 py-1 rounded-md font-medium ${
              mode === "2d" ? "bg-blue-600 text-white" : "hover:bg-gray-200"
            }`}
            aria-label="Switch to 2D Builder"
          >
            2D Builder
          </button>

          <button
            onClick={() => onModeChange("3d")}
            className={`px-3 py-1 rounded-md font-medium ${
              mode === "3d" ? "bg-blue-600 text-white" : "hover:bg-gray-200"
            }`}
            aria-label="Switch to 3D Builder"
          >
            3D Builder
          </button>
        </div>

        {/* Project Actions */}
        <div className="flex items-center space-x-3">
          <button
            className="px-4 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
            aria-label="Save Project"
          >
            Save
          </button>
          <button
            className="px-4 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            aria-label="Deploy Project"
          >
            Deploy
          </button>
          <button
            className="px-4 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
            aria-label="Preview Project"
          >
            Preview
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-grow overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-300 overflow-y-auto">
          {/* You can replace this with your components / layers panel */}
          <div className="p-4 font-semibold border-b border-gray-200">Components & Layers</div>
          <div className="p-4 text-gray-600">[Sidebar content goes here]</div>
        </aside>

        {/* Center Content */}
        <main className="flex-grow bg-gray-50 overflow-auto relative">
          {children}
        </main>

        {/* Right Sidebar (GarageBot AI Assistant) */}
        <aside className="w-80 bg-white border-l border-gray-300 overflow-y-auto flex flex-col">
          <div className="p-4 font-semibold border-b border-gray-200">GarageBot AI Assistant</div>
          <div className="flex-grow p-4 text-gray-700">[GarageBot panel goes here]</div>
        </aside>
      </div>

      {/* Footer or Bottom Bar for extra controls (optional) */}
      {/* <footer className="h-12 bg-white border-t border-gray-300 flex items-center justify-center">
        Footer Content Here
      </footer> */}
    </div>
  );
};

export default StudioLayout;
