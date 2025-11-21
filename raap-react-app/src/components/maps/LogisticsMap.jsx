import { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const LogisticsMap = ({ factoryLocation, siteLocation, apiKey }) => {
  const [routeInfo, setRouteInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!factoryLocation || !siteLocation || !apiKey) {
      setRouteInfo(null);
      return;
    }

    const fetchRoute = async () => {
      setLoading(true);
      setError(null);

      try {
        const directionsService = new google.maps.DirectionsService();

        const result = await new Promise((resolve, reject) => {
          directionsService.route(
            {
              origin: { lat: factoryLocation.lat, lng: factoryLocation.lng },
              destination: { lat: siteLocation.lat, lng: siteLocation.lng },
              travelMode: google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                resolve(result);
              } else {
                reject(new Error(`Directions request failed: ${status}`));
              }
            }
          );
        });

        const route = result.routes[0];
        const leg = route.legs[0];

        setRouteInfo({
          distance: leg.distance.text,
          duration: leg.duration.text,
          polyline: route.overview_polyline,
          steps: leg.steps
        });
      } catch (err) {
        console.error('Route calculation error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoute();
  }, [factoryLocation, siteLocation, apiKey]);

  const center = factoryLocation && siteLocation
    ? {
        lat: (factoryLocation.lat + siteLocation.lat) / 2,
        lng: (factoryLocation.lng + siteLocation.lng) / 2
      }
    : siteLocation;

  return (
    <div>
      <APIProvider apiKey={apiKey}>
        <div style={{ width: '100%', height: '500px', borderRadius: '8px', overflow: 'hidden', border: '2px solid #e5e7eb', marginBottom: '16px' }}>
          <Map
            defaultZoom={6}
            defaultCenter={center}
            mapId="logistics-map"
            gestureHandling="greedy"
            disableDefaultUI={false}
          >
            {/* Factory Marker (Orange) */}
            {factoryLocation && (
              <AdvancedMarker
                position={{ lat: factoryLocation.lat, lng: factoryLocation.lng }}
              >
                <Pin background="#F59E0B" borderColor="#fff" glyphColor="#fff" scale={1.2} />
              </AdvancedMarker>
            )}

            {/* Site Marker (Green) */}
            <AdvancedMarker
              position={{ lat: siteLocation.lat, lng: siteLocation.lng }}
            >
              <Pin background="#2D5A3D" borderColor="#fff" glyphColor="#fff" scale={1.2} />
            </AdvancedMarker>
          </Map>
        </div>
      </APIProvider>

      {/* Route Information */}
      {loading && (
        <div style={{ padding: '16px', background: '#F3F4F6', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ margin: 0, color: '#4b5563' }}>Calculating route...</p>
        </div>
      )}

      {error && (
        <div style={{ padding: '16px', background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: '8px' }}>
          <p style={{ margin: 0, color: '#991B1B' }}>Error: {error}</p>
        </div>
      )}

      {routeInfo && !loading && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ padding: '16px', background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', color: '#065F46' }}>
              📏 Distance
            </h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#047857' }}>
              {routeInfo.distance}
            </p>
          </div>

          <div style={{ padding: '16px', background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', color: '#92400E' }}>
              ⏱️ Drive Time
            </h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#B45309' }}>
              {routeInfo.duration}
            </p>
          </div>
        </div>
      )}

      {routeInfo && (
        <div style={{ marginTop: '16px', padding: '16px', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#991B1B' }}>
            ⚠️ Oversized Load Notice
          </h4>
          <p style={{ fontSize: '13px', color: '#7F1D1D', marginBottom: '8px' }}>
            Module dimensions: <strong>16ft Wide × 72ft Long × 14-16ft High</strong>
          </p>
          <p style={{ fontSize: '13px', color: '#7F1D1D', margin: 0 }}>
            These dimensions exceed standard vehicle limits and will require:
          </p>
          <ul style={{ fontSize: '13px', color: '#7F1D1D', marginTop: '8px', paddingLeft: '20px' }}>
            <li>Oversized load permits</li>
            <li>Route survey for bridge clearances (16ft+ required)</li>
            <li>Escort vehicles in most states</li>
            <li>Possible travel time restrictions (daylight only)</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LogisticsMap;
