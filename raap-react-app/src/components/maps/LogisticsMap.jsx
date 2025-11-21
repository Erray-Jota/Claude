import { useState, useEffect, useRef } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const LogisticsMap = ({ factoryLocation, siteLocation, apiKey }) => {
  const [routeInfo, setRouteInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const polylineRef = useRef(null);

  // Debug: Log received props
  console.log('LogisticsMap - factoryLocation:', factoryLocation);
  console.log('LogisticsMap - siteLocation:', siteLocation);

  useEffect(() => {
    if (!factoryLocation || !siteLocation || !apiKey) {
      setRouteInfo(null);
      // Clear polyline if it exists
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
        polylineRef.current = null;
      }
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

        // Extract highway information
        const highways = [];
        const warnings = [];
        leg.steps.forEach(step => {
          // Check for highways
          if (step.instructions) {
            const instruction = step.instructions.toLowerCase();
            const highwayMatch = instruction.match(/i-\d+|us-\d+|state highway \d+|interstate \d+/gi);
            if (highwayMatch) {
              highwayMatch.forEach(hw => {
                if (!highways.includes(hw)) {
                  highways.push(hw);
                }
              });
            }
          }

          // Check for warnings
          if (step.warnings && step.warnings.length > 0) {
            warnings.push(...step.warnings);
          }
        });

        // Calculate route quality for oversized loads
        const routeAnalysis = {
          hasInterstates: highways.some(hw => hw.toLowerCase().includes('i-') || hw.toLowerCase().includes('interstate')),
          majorHighways: highways,
          totalHighways: highways.length,
          warnings: warnings
        };

        setRouteInfo({
          distance: leg.distance.text,
          duration: leg.duration.text,
          polyline: route.overview_polyline,
          steps: leg.steps,
          routeAnalysis: routeAnalysis,
          path: route.overview_path
        });

        // Draw polyline on map
        if (mapRef.current && route.overview_path) {
          // Clear existing polyline
          if (polylineRef.current) {
            polylineRef.current.setMap(null);
          }

          // Create new polyline
          polylineRef.current = new google.maps.Polyline({
            path: route.overview_path,
            geodesic: true,
            strokeColor: '#2563EB',
            strokeOpacity: 0.8,
            strokeWeight: 4,
            map: mapRef.current
          });
        }
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

  // Create unique key for map remount when locations change
  const mapKey = factoryLocation
    ? `${factoryLocation.lat}-${factoryLocation.lng}-${siteLocation.lat}-${siteLocation.lng}`
    : `${siteLocation.lat}-${siteLocation.lng}`;

  return (
    <div>
      <APIProvider apiKey={apiKey}>
        <div style={{ width: '100%', height: '500px', borderRadius: '8px', overflow: 'hidden', border: '2px solid #e5e7eb', marginBottom: '16px' }}>
          <Map
            key={mapKey}
            defaultZoom={6}
            defaultCenter={center}
            mapId="logistics-map"
            gestureHandling="greedy"
            disableDefaultUI={false}
            onLoad={(map) => {
              mapRef.current = map;
            }}
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
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
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

            <div style={{ padding: '16px', background: '#EFF6FF', border: '1px solid #93C5FD', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', color: '#1E40AF' }}>
                🛣️ Route Type
              </h3>
              <p style={{ fontSize: '14px', margin: 0, color: '#1E3A8A' }}>
                {routeInfo.routeAnalysis.hasInterstates ? '✓ Interstate Highway' : '⚠️ Non-Interstate'}
              </p>
            </div>
          </div>

          {/* Route Analysis for Oversized Loads */}
          {routeInfo.routeAnalysis.majorHighways.length > 0 && (
            <div style={{ marginBottom: '16px', padding: '16px', background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#0C4A6E' }}>
                🛣️ Major Highways on Route
              </h4>
              <p style={{ fontSize: '13px', color: '#075985', margin: 0 }}>
                {routeInfo.routeAnalysis.majorHighways.join(', ')}
              </p>
              <p style={{ fontSize: '12px', color: '#0369A1', marginTop: '8px', marginBottom: 0 }}>
                Interstate highways typically have 16ft+ clearances, but a detailed route survey is still required for oversized loads.
              </p>
            </div>
          )}

          {/* Google Route Warnings */}
          {routeInfo.routeAnalysis.warnings.length > 0 && (
            <div style={{ marginBottom: '16px', padding: '16px', background: '#FEF3C7', border: '1px solid #FDE047', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#92400E' }}>
                ⚠️ Route Warnings
              </h4>
              <ul style={{ fontSize: '13px', color: '#78350F', marginTop: '8px', paddingLeft: '20px', marginBottom: 0 }}>
                {routeInfo.routeAnalysis.warnings.map((warning, idx) => (
                  <li key={idx}>{warning}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {routeInfo && (
        <div style={{ marginTop: '16px', padding: '16px', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#991B1B' }}>
            ⚠️ Oversized Load Requirements
          </h4>
          <p style={{ fontSize: '13px', color: '#7F1D1D', marginBottom: '8px' }}>
            Module dimensions: <strong>16ft Wide × 72ft Long × 14-16ft High</strong>
          </p>
          <p style={{ fontSize: '13px', color: '#7F1D1D', margin: 0 }}>
            These dimensions exceed standard vehicle limits and will require:
          </p>
          <ul style={{ fontSize: '13px', color: '#7F1D1D', marginTop: '8px', paddingLeft: '20px', marginBottom: '8px' }}>
            <li>State-specific oversized load permits</li>
            <li>Professional route survey for bridge clearances (16ft+ required)</li>
            <li>Escort vehicles (requirements vary by state)</li>
            <li>Travel time restrictions (typically daylight only)</li>
            <li>Possible road closure coordination for extremely narrow sections</li>
          </ul>
          <p style={{ fontSize: '12px', color: '#991B1B', fontStyle: 'italic', margin: 0, paddingTop: '8px', borderTop: '1px solid #FCA5A5' }}>
            ℹ️ This route analysis uses standard vehicle routing. A specialized oversized load route survey by a licensed carrier is required before transport.
          </p>
        </div>
      )}
    </div>
  );
};

export default LogisticsMap;
