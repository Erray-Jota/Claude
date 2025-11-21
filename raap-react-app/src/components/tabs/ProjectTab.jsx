import { useProject } from '../../contexts/ProjectContext';
import { useCalculations, formatMega, formatCurrency, formatTime } from '../../hooks/useCalculations';
import ProjectInfoBanner from '../ProjectInfoBanner';
import { ASSET_PATHS } from '../../data/constants';
import LocationInput from '../LocationInput';

const ProjectTab = () => {
  const { projectData, updateProjectData, switchTab } = useProject();
  const calculations = useCalculations(projectData);

  const handleInputChange = (field, value) => {
    updateProjectData({ [field]: value });
  };

  const handlePropertyLocationChange = (locationData) => {
    updateProjectData({
      propertyLocation: locationData.displayLocation,
      propertyFactor: locationData.factor,
      propertyCoordinates: { lat: locationData.coordinates.lat, lng: locationData.coordinates.lng }
    });
  };

  const handleFactoryLocationChange = (locationData) => {
    updateProjectData({
      factoryLocation: locationData.displayLocation,
      factoryFactor: locationData.factor,
      factoryCoordinates: { lat: locationData.coordinates.lat, lng: locationData.coordinates.lng }
    });
  };

  const handleTargetChange = (unitType, value) => {
    updateProjectData({
      targets: {
        ...projectData.targets,
        [unitType]: parseInt(value) || 0,
      },
    });
  };

  const totalUnits =
    (projectData.targets.studio || 0) +
    (projectData.targets.oneBed || 0) +
    (projectData.targets.twoBed || 0) +
    (projectData.targets.threeBed || 0);

  const projectImageSrc = {
    3: ASSET_PATHS.PROJECT_GRAPHIC_3_FLOORS,
    4: ASSET_PATHS.PROJECT_GRAPHIC_4_FLOORS,
    5: ASSET_PATHS.PROJECT_GRAPHIC_5_FLOORS,
  }[projectData.floors] || ASSET_PATHS.PROJECT_GRAPHIC_URL;

  return (
    <div>
      {/* Hero Image - Changes based on number of floors */}
      <div style={{ marginBottom: '20px', borderRadius: '12px', overflow: 'hidden', height: '200px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <video key={projectData.floors} autoPlay muted loop style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
          <source src={projectImageSrc} type="video/mp4" />
        </video>
      </div>

      {/* Project Info Banner */}
      <ProjectInfoBanner calculations={calculations} />

      {/* Main Content */}
      <div className="grid-2" style={{ gap: '12px' }}>
        {/* Target Unit Mix */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', gap: '8px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                  <LocationInput
                    label="📍 Site Location"
                    value={projectData.propertyLocation}
                    placeholder="Enter city or zip code"
                    onChange={handlePropertyLocationChange}
                  />
                </div>
                <div style={{ flex: 0.6 }}>
                  <label className="form-label" style={{ fontSize: '10px' }}>Floors</label>
                  <select
                    className="form-select"
                    value={projectData.floors}
                    onChange={(e) => handleInputChange('floors', parseInt(e.target.value))}
                    style={{ display: 'block', width: '100%', fontSize: '12px', padding: '4px' }}
                  >
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <h2>
            🎯 Target Unit Mix
            <span style={{ fontSize: '12px', fontWeight: 400, color: '#6b7280' }}>
              (Units: <strong style={{ color: '#111827' }}>{totalUnits}</strong>)
            </span>
          </h2>

          <div className="grid-4" style={{ gap: '8px' }}>
            <div className="unit-input-container">
              <label>Studio</label>
              <input
                type="number"
                value={projectData.targets.studio}
                min="0"
                onFocus={(e) => e.target.select()}
                onChange={(e) => handleTargetChange('studio', e.target.value)}
                style={{ textAlign: 'center', fontSize: '18px', fontWeight: 600, padding: '8px' }}
              />
            </div>
            <div className="unit-input-container">
              <label>1 Bed</label>
              <input
                type="number"
                value={projectData.targets.oneBed}
                min="0"
                onFocus={(e) => e.target.select()}
                onChange={(e) => handleTargetChange('oneBed', e.target.value)}
                style={{ textAlign: 'center', fontSize: '18px', fontWeight: 600, padding: '8px' }}
              />
            </div>
            <div className="unit-input-container">
              <label>2 Bed</label>
              <input
                type="number"
                value={projectData.targets.twoBed}
                min="0"
                onFocus={(e) => e.target.select()}
                onChange={(e) => handleTargetChange('twoBed', e.target.value)}
                style={{ textAlign: 'center', fontSize: '18px', fontWeight: 600, padding: '8px' }}
              />
            </div>
            <div className="unit-input-container">
              <label>3 Bed</label>
              <input
                type="number"
                value={projectData.targets.threeBed}
                min="0"
                onFocus={(e) => e.target.select()}
                onChange={(e) => handleTargetChange('threeBed', e.target.value)}
                style={{ textAlign: 'center', fontSize: '18px', fontWeight: 600, padding: '8px' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* RaaP Benefits */}
      <div className="card" style={{ marginTop: '12px' }}>
        <h2>💡 RaaP Benefits</h2>
        <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0, fontSize: '13px', color: '#374151' }}>
          <li style={{ marginBottom: '6px', display: 'flex', alignItems: 'flex-start' }}>
            <span style={{ color: '#16a34a', fontWeight: 'bold', marginRight: '6px', fontSize: '16px', flexShrink: 0 }}>✓</span>
            <span>2X factory throughput & millions in savings</span>
          </li>
          <li style={{ marginBottom: '6px', display: 'flex', alignItems: 'flex-start' }}>
            <span style={{ color: '#16a34a', fontWeight: 'bold', marginRight: '6px', fontSize: '16px', flexShrink: 0 }}>✓</span>
            <span>Clear scope, pricing & fewer change orders</span>
          </li>
          <li style={{ marginBottom: 0, display: 'flex', alignItems: 'flex-start' }}>
            <span style={{ color: '#16a34a', fontWeight: 'bold', marginRight: '6px', fontSize: '16px', flexShrink: 0 }}>✓</span>
            <span>De-risked construction & reduced RFIs</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectTab;
