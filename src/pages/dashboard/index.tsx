// src/pages/dashboard/index.tsx
import React, { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import Project3DView from "./Project3DView";

interface Project {
  id: string;
  name: string;
  description?: string;
}

const DashboardPage: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Example projects; in real app, fetch from API or global store
  const projects: Project[] = [
    { id: "1", name: "Landing Page SaaS", description: "Marketing site with 3D animations" },
    { id: "2", name: "E-commerce App", description: "Shop with payment integration" },
    { id: "3", name: "Portfolio Site", description: "3D portfolio with animated UI" },
  ];

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar with project list */}
      <DashboardSidebar
        projects={projects}
        selectedProjectId={selectedProjectId}
        onSelectProject={setSelectedProjectId}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header with selected project name */}
        <DashboardHeader
          projectName={
            selectedProjectId
              ? projects.find((p) => p.id === selectedProjectId)?.name
              : null
          }
        />

        {/* 3D project view or placeholder */}
        <main className="flex-1">
          {selectedProjectId ? (
            <Project3DView projectId={selectedProjectId} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-xl">
              Select a project to view in 3D
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
