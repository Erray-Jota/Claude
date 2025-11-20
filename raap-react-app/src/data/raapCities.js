/**
 * RaaP Cities with Coordinates and Cost Factors
 * Used for calculating nearest city to any user-entered location
 */

export const RAAP_CITIES = {
  // West Coast (High)
  'San Francisco, CA': { lat: 37.7749, lng: -122.4194, factor: 1.42 },
  'Los Angeles, CA': { lat: 34.0522, lng: -118.2437, factor: 1.28 },
  'Seattle, WA': { lat: 47.6062, lng: -122.3321, factor: 1.18 },
  'Portland, OR': { lat: 45.5152, lng: -122.6784, factor: 1.15 },
  'San Diego, CA': { lat: 32.7157, lng: -117.1611, factor: 1.21 },

  // Mountain West (Medium-Low)
  'Denver, CO': { lat: 39.7392, lng: -104.9903, factor: 0.98 },
  'Boise, ID': { lat: 43.6150, lng: -116.2023, factor: 0.87 },
  'Salt Lake City, UT': { lat: 40.7608, lng: -111.8910, factor: 0.92 },
  'Phoenix, AZ': { lat: 33.4484, lng: -112.0740, factor: 0.94 },

  // Southwest (Medium)
  'Austin, TX': { lat: 30.2672, lng: -97.7431, factor: 0.91 },
  'Dallas, TX': { lat: 32.7767, lng: -96.7970, factor: 0.89 },
  'Houston, TX': { lat: 29.7604, lng: -95.3698, factor: 0.88 },

  // Midwest (Medium-Low)
  'Chicago, IL': { lat: 41.8781, lng: -87.6298, factor: 1.12 },
  'Minneapolis, MN': { lat: 44.9778, lng: -93.2650, factor: 1.06 },
  'Kansas City, MO': { lat: 39.0997, lng: -94.5786, factor: 0.86 },

  // Southeast (Low-Medium)
  'Atlanta, GA': { lat: 33.7490, lng: -84.3880, factor: 0.88 },
  'Nashville, TN': { lat: 36.1627, lng: -86.7816, factor: 0.84 },
  'Charlotte, NC': { lat: 35.2271, lng: -80.8431, factor: 0.82 },

  // Northeast (High)
  'New York, NY': { lat: 40.7128, lng: -74.0060, factor: 1.51 },
  'Boston, MA': { lat: 42.3601, lng: -71.0589, factor: 1.32 },
  'Washington, DC': { lat: 38.9072, lng: -77.0369, factor: 1.09 },
};

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - Latitude of point 1
 * @param {number} lon1 - Longitude of point 1
 * @param {number} lat2 - Latitude of point 2
 * @param {number} lon2 - Longitude of point 2
 * @returns {number} Distance in miles
 */
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Find nearest RaaP city to a given location
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {Object} Nearest RaaP city with factor
 */
export function findNearestRaapCity(lat, lng) {
  let nearestCity = null;
  let nearestDistance = Infinity;

  for (const [cityName, cityData] of Object.entries(RAAP_CITIES)) {
    const distance = haversineDistance(lat, lng, cityData.lat, cityData.lng);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestCity = { name: cityName, ...cityData, distance };
    }
  }

  return nearestCity;
}

export default RAAP_CITIES;
