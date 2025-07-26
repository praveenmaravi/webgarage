import { useState, useEffect, useCallback } from "react";
import { debounce } from "@/utils/debounce";

type ProjectMeta = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  owner: string;
};

type Page = {
  id: string;
  name: string;
  elements: any[];        // 2D/3D UI elements
  flow?: any;             // Backend flow (optional)
  animation?: any;        // Animation timeline data
};

type Project = {
  meta: ProjectMeta;
  pages: Page[];
  currentPageId: string;
};

const defaultProject: Project = {
  meta: {
    id: crypto.randomUUID(),
    name: "Untitled Project",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    owner: "anonymous"
  },
  pages: [
    {
      id: crypto.randomUUID(),
      name: "Home",
      elements: []
    }
  ],
  currentPageId: ""
};

export function useProject() {
  const [project, setProject] = useState<Project>(() => {
    const stored = localStorage.getItem("webgarage_project");
    return stored ? JSON.parse(stored) : defaultProject;
  });

  // Autosave with debounce
  useEffect(() => {
    const save = debounce(() => {
      localStorage.setItem("webgarage_project", JSON.stringify(project));
    }, 1000);

    save();
  }, [project]);

  const updateMeta = useCallback((updates: Partial<ProjectMeta>) => {
    setProject(prev => ({
      ...prev,
      meta: { ...prev.meta, ...updates, updatedAt: new Date().toISOString() }
    }));
  }, []);

  const addPage = useCallback((name: string) => {
    const newPage: Page = {
      id: crypto.randomUUID(),
      name,
      elements: []
    };
    setProject(prev => ({
      ...prev,
      pages: [...prev.pages, newPage],
      currentPageId: newPage.id
    }));
  }, []);

  const switchPage = useCallback((pageId: string) => {
    setProject(prev => ({ ...prev, currentPageId: pageId }));
  }, []);

  const updatePage = useCallback((pageId: string, updates: Partial<Page>) => {
    setProject(prev => ({
      ...prev,
      pages: prev.pages.map(p =>
        p.id === pageId ? { ...p, ...updates } : p
      )
    }));
  }, []);

  const getCurrentPage = () => {
    return project.pages.find(p => p.id === project.currentPageId);
  };

  return {
    project,
    updateMeta,
    addPage,
    switchPage,
    updatePage,
    getCurrentPage
  };
}
