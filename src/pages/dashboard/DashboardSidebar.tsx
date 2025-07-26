// src/pages/dashboard/DashboardSidebar.tsx
import React from "react";

interface Project {
  id: string;
  name: string;
  description?: string;
}

interface DashboardSidebarProps {
  projects: Project[];
  selectedProjectId: string | null;
  onSelectProject: (id: string) => void;
  onCreateProject?: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  projects,
  selectedProjectId,
  onSelectProject,
  onCreateProject,
}) => {
  return (
    <aside className="w-72 bg-gray-800 p-6 flex flex-col">
      <h2 className="text-2xl font-semibold mb-6 text-white">My Projects</h2>

      <div className="flex-1 overflow-y-auto">
        {projects.length === 0 && (
          <p className="text-gray-400 italic">No projects found. Create one!</p>
        )}

        {projects.map((project) => {
          const isSelected = project.id === selectedProjectId;
          return (
            <button
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              className={`block w-full text-left p-4 mb-3 rounded-lg transition-colors
                ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              aria-pressed={isSelected}
            >
              <h3 className="text-lg font-medium truncate">{project.name}</h3>
              {project.description && (
                <p className="text-sm text-indigo-200 truncate">{project.description}</p>
              )}
            </button>
          );
        })}
      </div>

      <button
        onClick={onCreateProject}
        className="mt-6 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3 rounded-lg transition"
        aria-label="Create New Project"
      >
        + New Project
      </button>
    </aside>
  );
};

export default DashboardSidebar;
