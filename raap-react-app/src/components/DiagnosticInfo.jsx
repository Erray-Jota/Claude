import { useProject } from '../contexts/ProjectContext';

const DiagnosticInfo = () => {
  const { projectData } = useProject();
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY || '';

  return (
    <div style={{ position: 'fixed', bottom: 10, right: 10, background: '#1F2937', color: '#F9FAFB', padding: '12px', borderRadius: '8px', fontSize: '12px', maxWidth: '300px', zIndex: 9999, fontFamily: 'monospace' }}>
      <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#10B981' }}>🔍 Map Diagnostics</div>

      <div style={{ marginBottom: '4px' }}>
        <strong>API Key:</strong> {apiKey ? (apiKey === 'YOUR_API_KEY_HERE' ? '❌ Placeholder' : '✅ Set') : '❌ Missing'}
      </div>

      <div style={{ marginBottom: '4px' }}>
        <strong>Site Location:</strong> {projectData.propertyLocation || '❌ Not set'}
      </div>

      <div style={{ marginBottom: '4px' }}>
        <strong>Site Coords:</strong> {projectData.propertyCoordinates ? `✅ ${projectData.propertyCoordinates.lat.toFixed(2)}, ${projectData.propertyCoordinates.lng.toFixed(2)}` : '❌ Missing'}
      </div>

      <div style={{ marginBottom: '4px' }}>
        <strong>Factory Location:</strong> {projectData.factoryLocation || '❌ Not set'}
      </div>

      <div style={{ marginBottom: '4px' }}>
        <strong>Factory Coords:</strong> {projectData.factoryCoordinates ? `✅ ${projectData.factoryCoordinates.lat.toFixed(2)}, ${projectData.factoryCoordinates.lng.toFixed(2)}` : '❌ Missing'}
      </div>

      <div style={{ marginTop: '8px', padding: '8px', background: '#374151', borderRadius: '4px', fontSize: '11px' }}>
        {apiKey === 'YOUR_API_KEY_HERE' ?
          '⚠️ Add real Google Maps API key to .env file' :
          apiKey && projectData.propertyCoordinates ?
            '✅ Maps should load!' :
            '⚠️ Check API key and coordinates'
        }
      </div>
    </div>
  );
};

export default DiagnosticInfo;
