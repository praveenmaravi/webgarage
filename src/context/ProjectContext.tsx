import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the structure for the project settings
interface ProjectSettings {
  theme: string;            // Project theme (light/dark or custom)
  layout: string;           // Layout type (grid, flex, etc.)
  components: string[];     // List of active components in the project
}

interface ProjectContextProps {
  projectId: string;                     // Current project ID
  setProjectId: (id: string) => void;     // Function to set the current project ID
  projectSettings: ProjectSettings;      // Settings associated with the current project
  setProjectSettings: (settings: ProjectSettings) => void; // Function to update project settings
}

const ProjectContext = createContext<ProjectContextProps | undefined>(undefined);

// The ProjectProvider component will wrap the application to provide the context value
export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projectId, setProjectId] = useState<string>(""); // Default empty project ID
  const [projectSettings, setProjectSettings] = useState<ProjectSettings>({
    theme: "light",                   // Default theme
    layout: "grid",                   // Default layout type
    components: [],                   // No components initially
  });

  return (
    <ProjectContext.Provider value={{ projectId, setProjectId, projectSettings, setProjectSettings }}>
      {children}
    </ProjectContext.Provider>
  );
};

// Custom hook to access the project context
export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error("useProject must be used within a ProjectProvider");
  return context;
};
