import { createContext, useContext, useState, useCallback } from 'react';

const ProjectContext = createContext();

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const [projectData, setProjectData] = useState({
    projectName: 'Alpine Vista Apartments',
    floors: 5,
    targetLength: 280,
    lobbyType: 2,
    podiumCount: 0,
    commonAreaPct: 5,
    propertyFactor: 0.87,
    factoryFactor: 0.87,
    targets: { studio: 40, oneBed: 40, twoBed: 40, threeBed: 0 },
    optimized: { studio: 40, oneBed: 40, twoBed: 40, threeBed: 0 },
    length: 280.0,
    requiredLength: 280.0,
  });

  const [activeTab, setActiveTab] = useState(2); // Start with Project tab
  const [activeSubtabs, setActiveSubtabs] = useState({
    design: 1,
    cost: 1,
    factors: 1,
    smartstart: 1,
  });

  const updateProjectData = useCallback((updates) => {
    setProjectData((prev) => ({ ...prev, ...updates }));
  }, []);

  const switchTab = useCallback((tabIndex) => {
    setActiveTab(tabIndex);
  }, []);

  const switchSubtab = useCallback((group, subtabIndex) => {
    setActiveSubtabs((prev) => ({ ...prev, [group]: subtabIndex }));
  }, []);

  const value = {
    projectData,
    updateProjectData,
    activeTab,
    switchTab,
    activeSubtabs,
    switchSubtab,
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};
