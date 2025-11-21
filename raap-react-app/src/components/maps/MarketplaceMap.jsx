import { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow, Pin } from '@vis.gl/react-google-maps';

const MarketplaceMap = ({ siteLocation, providers, apiKey }) => {
  const [selectedProvider, setSelectedProvider] = useState(null);

  // Color mapping for different categories
  const getCategoryColor = (category) => {
    const colors = {
      'Fabricator': '#F59E0B', // Orange
      'GC': '#3B82F6',         // Blue
      'AoR': '#8B5CF6',        // Purple
      'Consultant': '#EC4899'  // Pink
    };
    return colors[category] || '#EF4444'; // Red default
  };

  return (
    <APIProvider apiKey={apiKey}>
      <div style={{ width: '100%', height: '500px', borderRadius: '8px', overflow: 'hidden', border: '2px solid #e5e7eb' }}>
        <Map
          zoom={5}
          center={{ lat: siteLocation.lat, lng: siteLocation.lng }}
          mapId="marketplace-map"
          gestureHandling="greedy"
          disableDefaultUI={false}
          style={{ width: '100%', height: '100%' }}
        >
          {/* Site Location Marker (Green) */}
          <AdvancedMarker
            position={{ lat: siteLocation.lat, lng: siteLocation.lng }}
            onClick={() => setSelectedProvider({
              name: 'Project Site',
              category: 'Site',
              location: siteLocation.name || 'Project Location'
            })}
          >
            <Pin background="#2D5A3D" borderColor="#1a3d2a" glyphColor="#fff" scale={1.2} />
          </AdvancedMarker>

          {/* Provider Markers */}
          {providers.map((provider, index) => (
            <AdvancedMarker
              key={index}
              position={{ lat: provider.lat, lng: provider.lng }}
              onClick={() => setSelectedProvider(provider)}
            >
              <Pin
                background={getCategoryColor(provider.category)}
                borderColor="#fff"
                glyphColor="#fff"
                scale={1.0}
              />
            </AdvancedMarker>
          ))}

          {/* Info Window */}
          {selectedProvider && (
            <InfoWindow
              position={{
                lat: selectedProvider.lat || siteLocation.lat,
                lng: selectedProvider.lng || siteLocation.lng
              }}
              onCloseClick={() => setSelectedProvider(null)}
            >
              <div style={{ padding: '8px', minWidth: '200px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', color: '#111827' }}>
                  {selectedProvider.name}
                </h3>
                {selectedProvider.category !== 'Site' && (
                  <>
                    <p style={{ fontSize: '14px', marginBottom: '4px', color: '#4b5563' }}>
                      <strong>Category:</strong> {selectedProvider.category}
                    </p>
                    <p style={{ fontSize: '14px', marginBottom: '4px', color: '#4b5563' }}>
                      <strong>Type:</strong> {selectedProvider.type}
                    </p>
                    <p style={{ fontSize: '14px', marginBottom: '4px', color: '#4b5563' }}>
                      <strong>Region:</strong> {selectedProvider.region}
                    </p>
                    <p style={{ fontSize: '14px', marginBottom: '4px', color: '#4b5563' }}>
                      <strong>Capacity:</strong> {selectedProvider.capacity}
                    </p>
                    <p style={{ fontSize: '14px', color: '#4b5563' }}>
                      <strong>Established:</strong> {selectedProvider.established}
                    </p>
                  </>
                )}
                {selectedProvider.category === 'Site' && (
                  <p style={{ fontSize: '14px', color: '#4b5563' }}>
                    {selectedProvider.location}
                  </p>
                )}
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default MarketplaceMap;
