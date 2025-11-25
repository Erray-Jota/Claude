import { useProject } from '../../contexts/ProjectContext';
import IntroductionTab from './IntroductionTab';
import ProjectTab from './ProjectTab';
import SmartStartTab from './SmartStartTab';

const ArchiveTab = () => {
  const { activeSubtabs } = useProject();

  return (
    <div>
      {activeSubtabs.archive === 1 && <IntroductionTab />}
      {activeSubtabs.archive === 2 && <ProjectTab />}
      {activeSubtabs.archive === 3 && <SmartStartTab />}
    </div>
  );
};

export default ArchiveTab;
