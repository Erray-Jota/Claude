import { ProjectProvider, useProject } from './contexts/ProjectContext';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import IntroductionTab from './components/tabs/IntroductionTab';
import ProjectTab from './components/tabs/ProjectTab';
import './App.css';

function AppContent() {
  const { activeTab } = useProject();

  return (
    <div className="container">
      <Header />
      <TabNavigation />

      <div style={{ marginTop: '20px' }}>
        {activeTab === 1 && <IntroductionTab />}
        {activeTab === 2 && <ProjectTab />}
        {activeTab === 3 && <div className="card"><h2>📐 Design Tab</h2><p>Design tab coming soon...</p></div>}
        {activeTab === 4 && <div className="card"><h2>💰 Cost Analysis Tab</h2><p>Cost analysis tab coming soon...</p></div>}
        {activeTab === 5 && <div className="card"><h2>✨ Other Factors Tab</h2><p>Other factors tab coming soon...</p></div>}
        {activeTab === 6 && <div className="card"><h2>✅ Portfolio Tab</h2><p>Portfolio tab coming soon...</p></div>}
        {activeTab === 7 && <div className="card"><h2>🚀 SmartStart Tab</h2><p>SmartStart tab coming soon...</p></div>}
      </div>
    </div>
  );
}

function App() {
  return (
    <ProjectProvider>
      <AppContent />
    </ProjectProvider>
  );
}

export default App;
