"use client";

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Project } from "./interface";

interface ProjectContextProps {
  projects: Project[];
  appliedFilter: string;
  filteredProjects: Project[];
  sort: boolean;
  setAppliedFilter: Dispatch<SetStateAction<string>>;
  setFilteredProjects: Dispatch<SetStateAction<Project[]>>;
  setSort: Dispatch<SetStateAction<boolean>>;
  singleProject: Project | null;
  setSingleProject: Dispatch<SetStateAction<Project | null>>;
}

const ProjectsContext = createContext<ProjectContextProps>({
  projects: [] as Project[],
  appliedFilter: "all",
  filteredProjects: [] as Project[],
  sort: false,
  setAppliedFilter: () => {},
  setFilteredProjects: () => {},
  setSort: () => {},
  singleProject: null,
  setSingleProject: () => {},
});

// ProjectsProvider component to manage and expose context values
const ProjectsProvider = ({ children, data }: { children: React.ReactNode; data: Project[] }) => {
  const [projects, setProjects] = useState(data);
  const [appliedFilter, setAppliedFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState(data);
  const [sort, setSort] = useState(false);
  const [singleProject, setSingleProject] = useState<Project | null>(null);

  useEffect(() => {
    const filtered = applyFilters(projects, appliedFilter);
    setFilteredProjects(filtered);
  }, [appliedFilter, projects]); // Ajout de projects dans le tableau de dépendances

  useEffect(() => {
    if (sort) {
      // Assuming you want to sort projects by their sequence
      const sorted = [...projects].sort((a, b) => a.sequence - b.sequence);
      setFilteredProjects(sorted);
      setProjects(sorted);
    }
  }, [sort, projects]);

  const applyFilters = (data: Project[], filterValues: string) => {
    if (filterValues === "all") {
      return data;
    }

    return data.filter((project) => project.techStack.some((tech) => filterValues === tech.trim()));
  };

  const value = {
    projects,
    appliedFilter,
    filteredProjects,
    sort,
    setAppliedFilter,
    setFilteredProjects,
    setSort,
    singleProject,
    setSingleProject,
  };

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
};

// Custom hook to consume the ProjectsContext
const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};

export { ProjectsProvider, useProjects };
