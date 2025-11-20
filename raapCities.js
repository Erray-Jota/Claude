/**
 * RaaP City Database - Construction Cost Factors
 *
 * This database contains 600+ US cities with their corresponding construction
 * cost adjustment factors. These factors represent the relative cost of construction
 * in each location compared to a national baseline.
 *
 * Cost Factor Ranges:
 * - 1.35-1.45: Highest cost metros (San Francisco, NYC, Honolulu)
 * - 1.15-1.35: High cost metros (Boston, Seattle, DC, Chicago)
 * - 1.00-1.15: Medium-high cost areas (most major metros)
 * - 0.85-1.00: Medium cost areas (smaller metros, suburban)
 * - 0.70-0.85: Lower cost areas (rural, smaller cities)
 *
 * Usage:
 * import { raapCities, getCityFactor, getCitiesByState } from './raapCities.js';
 */

export const raapCities = [
  // ALABAMA
  { city: "Birmingham", state: "AL", factor: 0.82 },
  { city: "Montgomery", state: "AL", factor: 0.79 },
  { city: "Mobile", state: "AL", factor: 0.80 },
  { city: "Huntsville", state: "AL", factor: 0.81 },
  { city: "Tuscaloosa", state: "AL", factor: 0.78 },
  { city: "Hoover", state: "AL", factor: 0.81 },
  { city: "Dothan", state: "AL", factor: 0.77 },
  { city: "Auburn", state: "AL", factor: 0.79 },
  { city: "Decatur", state: "AL", factor: 0.77 },
  { city: "Madison", state: "AL", factor: 0.80 },
  { city: "Florence", state: "AL", factor: 0.76 },
  { city: "Gadsden", state: "AL", factor: 0.75 },

  // ALASKA
  { city: "Anchorage", state: "AK", factor: 1.28 },
  { city: "Fairbanks", state: "AK", factor: 1.32 },
  { city: "Juneau", state: "AK", factor: 1.30 },
  { city: "Sitka", state: "AK", factor: 1.29 },
  { city: "Ketchikan", state: "AK", factor: 1.27 },
  { city: "Wasilla", state: "AK", factor: 1.26 },
  { city: "Kenai", state: "AK", factor: 1.25 },
  { city: "Kodiak", state: "AK", factor: 1.28 },

  // ARIZONA
  { city: "Phoenix", state: "AZ", factor: 0.87 },
  { city: "Tucson", state: "AZ", factor: 0.85 },
  { city: "Mesa", state: "AZ", factor: 0.86 },
  { city: "Chandler", state: "AZ", factor: 0.88 },
  { city: "Scottsdale", state: "AZ", factor: 0.92 },
  { city: "Glendale", state: "AZ", factor: 0.86 },
  { city: "Gilbert", state: "AZ", factor: 0.87 },
  { city: "Tempe", state: "AZ", factor: 0.88 },
  { city: "Peoria", state: "AZ", factor: 0.85 },
  { city: "Surprise", state: "AZ", factor: 0.85 },
  { city: "Flagstaff", state: "AZ", factor: 0.89 },
  { city: "Yuma", state: "AZ", factor: 0.83 },
  { city: "Prescott", state: "AZ", factor: 0.86 },
  { city: "Goodyear", state: "AZ", factor: 0.86 },
  { city: "Avondale", state: "AZ", factor: 0.85 },

  // ARKANSAS
  { city: "Little Rock", state: "AR", factor: 0.80 },
  { city: "Fort Smith", state: "AR", factor: 0.77 },
  { city: "Fayetteville", state: "AR", factor: 0.79 },
  { city: "Springdale", state: "AR", factor: 0.78 },
  { city: "Jonesboro", state: "AR", factor: 0.76 },
  { city: "North Little Rock", state: "AR", factor: 0.79 },
  { city: "Conway", state: "AR", factor: 0.78 },
  { city: "Rogers", state: "AR", factor: 0.79 },
  { city: "Pine Bluff", state: "AR", factor: 0.75 },
  { city: "Bentonville", state: "AR", factor: 0.80 },

  // CALIFORNIA
  { city: "San Francisco", state: "CA", factor: 1.35 },
  { city: "San Jose", state: "CA", factor: 1.32 },
  { city: "Oakland", state: "CA", factor: 1.28 },
  { city: "Los Angeles", state: "CA", factor: 1.18 },
  { city: "San Diego", state: "CA", factor: 1.15 },
  { city: "Sacramento", state: "CA", factor: 1.12 },
  { city: "Fresno", state: "CA", factor: 1.05 },
  { city: "Long Beach", state: "CA", factor: 1.17 },
  { city: "Santa Ana", state: "CA", factor: 1.16 },
  { city: "Anaheim", state: "CA", factor: 1.15 },
  { city: "Riverside", state: "CA", factor: 1.08 },
  { city: "Stockton", state: "CA", factor: 1.09 },
  { city: "Bakersfield", state: "CA", factor: 1.04 },
  { city: "Irvine", state: "CA", factor: 1.20 },
  { city: "Fremont", state: "CA", factor: 1.30 },
  { city: "San Bernardino", state: "CA", factor: 1.06 },
  { city: "Modesto", state: "CA", factor: 1.07 },
  { city: "Oxnard", state: "CA", factor: 1.14 },
  { city: "Fontana", state: "CA", factor: 1.07 },
  { city: "Moreno Valley", state: "CA", factor: 1.06 },
  { city: "Glendale", state: "CA", factor: 1.17 },
  { city: "Huntington Beach", state: "CA", factor: 1.18 },
  { city: "Santa Clarita", state: "CA", factor: 1.15 },
  { city: "Garden Grove", state: "CA", factor: 1.15 },
  { city: "Oceanside", state: "CA", factor: 1.13 },
  { city: "Santa Rosa", state: "CA", factor: 1.22 },
  { city: "Ontario", state: "CA", factor: 1.08 },
  { city: "Rancho Cucamonga", state: "CA", factor: 1.09 },
  { city: "Elk Grove", state: "CA", factor: 1.11 },
  { city: "Corona", state: "CA", factor: 1.08 },
  { city: "Pasadena", state: "CA", factor: 1.18 },
  { city: "Salinas", state: "CA", factor: 1.16 },
  { city: "Pomona", state: "CA", factor: 1.10 },
  { city: "Hayward", state: "CA", factor: 1.27 },
  { city: "Sunnyvale", state: "CA", factor: 1.33 },
  { city: "Escondido", state: "CA", factor: 1.13 },
  { city: "Torrance", state: "CA", factor: 1.17 },
  { city: "Roseville", state: "CA", factor: 1.12 },
  { city: "Visalia", state: "CA", factor: 1.03 },
  { city: "Fullerton", state: "CA", factor: 1.16 },
  { city: "Orange", state: "CA", factor: 1.17 },
  { city: "Thousand Oaks", state: "CA", factor: 1.19 },
  { city: "Berkeley", state: "CA", factor: 1.30 },
  { city: "Santa Clara", state: "CA", factor: 1.32 },
  { city: "Simi Valley", state: "CA", factor: 1.14 },
  { city: "Concord", state: "CA", factor: 1.24 },
  { city: "Vallejo", state: "CA", factor: 1.20 },
  { city: "Carlsbad", state: "CA", factor: 1.16 },
  { city: "Antioch", state: "CA", factor: 1.18 },
  { city: "Richmond", state: "CA", factor: 1.25 },

  // COLORADO
  { city: "Denver", state: "CO", factor: 0.90 },
  { city: "Colorado Springs", state: "CO", factor: 0.88 },
  { city: "Aurora", state: "CO", factor: 0.89 },
  { city: "Fort Collins", state: "CO", factor: 0.90 },
  { city: "Lakewood", state: "CO", factor: 0.89 },
  { city: "Thornton", state: "CO", factor: 0.88 },
  { city: "Arvada", state: "CO", factor: 0.89 },
  { city: "Westminster", state: "CO", factor: 0.89 },
  { city: "Pueblo", state: "CO", factor: 0.84 },
  { city: "Centennial", state: "CO", factor: 0.91 },
  { city: "Boulder", state: "CO", factor: 0.95 },
  { city: "Greeley", state: "CO", factor: 0.86 },
  { city: "Longmont", state: "CO", factor: 0.88 },
  { city: "Loveland", state: "CO", factor: 0.87 },

  // CONNECTICUT
  { city: "Bridgeport", state: "CT", factor: 1.18 },
  { city: "New Haven", state: "CT", factor: 1.17 },
  { city: "Hartford", state: "CT", factor: 1.16 },
  { city: "Stamford", state: "CT", factor: 1.22 },
  { city: "Waterbury", state: "CT", factor: 1.14 },
  { city: "Norwalk", state: "CT", factor: 1.20 },
  { city: "Danbury", state: "CT", factor: 1.17 },
  { city: "New Britain", state: "CT", factor: 1.15 },
  { city: "Meriden", state: "CT", factor: 1.14 },
  { city: "Bristol", state: "CT", factor: 1.13 },
  { city: "West Haven", state: "CT", factor: 1.16 },
  { city: "Greenwich", state: "CT", factor: 1.25 },

  // DELAWARE
  { city: "Wilmington", state: "DE", factor: 1.08 },
  { city: "Dover", state: "DE", factor: 1.04 },
  { city: "Newark", state: "DE", factor: 1.06 },
  { city: "Middletown", state: "DE", factor: 1.05 },
  { city: "Smyrna", state: "DE", factor: 1.03 },

  // FLORIDA
  { city: "Miami", state: "FL", factor: 0.85 },
  { city: "Jacksonville", state: "FL", factor: 0.83 },
  { city: "Tampa", state: "FL", factor: 0.84 },
  { city: "Orlando", state: "FL", factor: 0.85 },
  { city: "St. Petersburg", state: "FL", factor: 0.84 },
  { city: "Hialeah", state: "FL", factor: 0.84 },
  { city: "Tallahassee", state: "FL", factor: 0.82 },
  { city: "Fort Lauderdale", state: "FL", factor: 0.86 },
  { city: "Port St. Lucie", state: "FL", factor: 0.83 },
  { city: "Cape Coral", state: "FL", factor: 0.82 },
  { city: "Pembroke Pines", state: "FL", factor: 0.85 },
  { city: "Hollywood", state: "FL", factor: 0.85 },
  { city: "Miramar", state: "FL", factor: 0.85 },
  { city: "Coral Springs", state: "FL", factor: 0.85 },
  { city: "Clearwater", state: "FL", factor: 0.83 },
  { city: "Miami Gardens", state: "FL", factor: 0.84 },
  { city: "Palm Bay", state: "FL", factor: 0.81 },
  { city: "West Palm Beach", state: "FL", factor: 0.86 },
  { city: "Pompano Beach", state: "FL", factor: 0.84 },
  { city: "Lakeland", state: "FL", factor: 0.81 },
  { city: "Davie", state: "FL", factor: 0.85 },
  { city: "Miami Beach", state: "FL", factor: 0.88 },
  { city: "Deltona", state: "FL", factor: 0.82 },
  { city: "Boca Raton", state: "FL", factor: 0.87 },
  { city: "Gainesville", state: "FL", factor: 0.82 },

  // GEORGIA
  { city: "Atlanta", state: "GA", factor: 0.88 },
  { city: "Augusta", state: "GA", factor: 0.82 },
  { city: "Columbus", state: "GA", factor: 0.81 },
  { city: "Savannah", state: "GA", factor: 0.83 },
  { city: "Athens", state: "GA", factor: 0.84 },
  { city: "Sandy Springs", state: "GA", factor: 0.90 },
  { city: "Roswell", state: "GA", factor: 0.89 },
  { city: "Macon", state: "GA", factor: 0.80 },
  { city: "Johns Creek", state: "GA", factor: 0.91 },
  { city: "Albany", state: "GA", factor: 0.79 },
  { city: "Warner Robins", state: "GA", factor: 0.80 },
  { city: "Alpharetta", state: "GA", factor: 0.91 },
  { city: "Marietta", state: "GA", factor: 0.89 },
  { city: "Valdosta", state: "GA", factor: 0.78 },

  // HAWAII
  { city: "Honolulu", state: "HI", factor: 1.42 },
  { city: "Pearl City", state: "HI", factor: 1.40 },
  { city: "Hilo", state: "HI", factor: 1.38 },
  { city: "Kailua", state: "HI", factor: 1.41 },
  { city: "Waipahu", state: "HI", factor: 1.39 },
  { city: "Kaneohe", state: "HI", factor: 1.40 },

  // IDAHO
  { city: "Boise", state: "ID", factor: 0.86 },
  { city: "Meridian", state: "ID", factor: 0.85 },
  { city: "Nampa", state: "ID", factor: 0.83 },
  { city: "Idaho Falls", state: "ID", factor: 0.82 },
  { city: "Pocatello", state: "ID", factor: 0.81 },
  { city: "Caldwell", state: "ID", factor: 0.82 },
  { city: "Coeur d'Alene", state: "ID", factor: 0.84 },
  { city: "Twin Falls", state: "ID", factor: 0.80 },

  // ILLINOIS
  { city: "Chicago", state: "IL", factor: 1.23 },
  { city: "Aurora", state: "IL", factor: 1.18 },
  { city: "Naperville", state: "IL", factor: 1.20 },
  { city: "Joliet", state: "IL", factor: 1.16 },
  { city: "Rockford", state: "IL", factor: 1.10 },
  { city: "Springfield", state: "IL", factor: 1.08 },
  { city: "Elgin", state: "IL", factor: 1.17 },
  { city: "Peoria", state: "IL", factor: 1.09 },
  { city: "Champaign", state: "IL", factor: 1.07 },
  { city: "Waukegan", state: "IL", factor: 1.15 },
  { city: "Cicero", state: "IL", factor: 1.20 },
  { city: "Bloomington", state: "IL", factor: 1.06 },
  { city: "Arlington Heights", state: "IL", factor: 1.21 },
  { city: "Evanston", state: "IL", factor: 1.22 },
  { city: "Decatur", state: "IL", factor: 1.04 },

  // INDIANA
  { city: "Indianapolis", state: "IN", factor: 0.92 },
  { city: "Fort Wayne", state: "IN", factor: 0.88 },
  { city: "Evansville", state: "IN", factor: 0.86 },
  { city: "South Bend", state: "IN", factor: 0.87 },
  { city: "Carmel", state: "IN", factor: 0.94 },
  { city: "Bloomington", state: "IN", factor: 0.89 },
  { city: "Fishers", state: "IN", factor: 0.93 },
  { city: "Hammond", state: "IN", factor: 0.90 },
  { city: "Gary", state: "IN", factor: 0.88 },
  { city: "Muncie", state: "IN", factor: 0.85 },
  { city: "Lafayette", state: "IN", factor: 0.87 },
  { city: "Terre Haute", state: "IN", factor: 0.85 },

  // IOWA
  { city: "Des Moines", state: "IA", factor: 0.89 },
  { city: "Cedar Rapids", state: "IA", factor: 0.87 },
  { city: "Davenport", state: "IA", factor: 0.86 },
  { city: "Sioux City", state: "IA", factor: 0.85 },
  { city: "Iowa City", state: "IA", factor: 0.88 },
  { city: "Waterloo", state: "IA", factor: 0.84 },
  { city: "Council Bluffs", state: "IA", factor: 0.85 },
  { city: "Ames", state: "IA", factor: 0.87 },
  { city: "West Des Moines", state: "IA", factor: 0.90 },
  { city: "Dubuque", state: "IA", factor: 0.86 },

  // KANSAS
  { city: "Wichita", state: "KS", factor: 0.84 },
  { city: "Overland Park", state: "KS", factor: 0.88 },
  { city: "Kansas City", state: "KS", factor: 0.87 },
  { city: "Olathe", state: "KS", factor: 0.87 },
  { city: "Topeka", state: "KS", factor: 0.83 },
  { city: "Lawrence", state: "KS", factor: 0.85 },
  { city: "Shawnee", state: "KS", factor: 0.86 },
  { city: "Manhattan", state: "KS", factor: 0.84 },
  { city: "Lenexa", state: "KS", factor: 0.87 },
  { city: "Salina", state: "KS", factor: 0.81 },

  // KENTUCKY
  { city: "Louisville", state: "KY", factor: 0.88 },
  { city: "Lexington", state: "KY", factor: 0.86 },
  { city: "Bowling Green", state: "KY", factor: 0.82 },
  { city: "Owensboro", state: "KY", factor: 0.81 },
  { city: "Covington", state: "KY", factor: 0.85 },
  { city: "Richmond", state: "KY", factor: 0.82 },
  { city: "Georgetown", state: "KY", factor: 0.84 },
  { city: "Florence", state: "KY", factor: 0.85 },
  { city: "Hopkinsville", state: "KY", factor: 0.80 },
  { city: "Nicholasville", state: "KY", factor: 0.84 },

  // LOUISIANA
  { city: "New Orleans", state: "LA", factor: 0.86 },
  { city: "Baton Rouge", state: "LA", factor: 0.84 },
  { city: "Shreveport", state: "LA", factor: 0.81 },
  { city: "Lafayette", state: "LA", factor: 0.82 },
  { city: "Lake Charles", state: "LA", factor: 0.80 },
  { city: "Kenner", state: "LA", factor: 0.85 },
  { city: "Bossier City", state: "LA", factor: 0.81 },
  { city: "Monroe", state: "LA", factor: 0.79 },
  { city: "Alexandria", state: "LA", factor: 0.79 },

  // MAINE
  { city: "Portland", state: "ME", factor: 1.10 },
  { city: "Lewiston", state: "ME", factor: 1.06 },
  { city: "Bangor", state: "ME", factor: 1.07 },
  { city: "South Portland", state: "ME", factor: 1.09 },
  { city: "Auburn", state: "ME", factor: 1.05 },
  { city: "Biddeford", state: "ME", factor: 1.06 },

  // MARYLAND
  { city: "Baltimore", state: "MD", factor: 1.12 },
  { city: "Frederick", state: "MD", factor: 1.10 },
  { city: "Rockville", state: "MD", factor: 1.16 },
  { city: "Gaithersburg", state: "MD", factor: 1.15 },
  { city: "Bowie", state: "MD", factor: 1.12 },
  { city: "Annapolis", state: "MD", factor: 1.14 },
  { city: "Hagerstown", state: "MD", factor: 1.04 },
  { city: "Salisbury", state: "MD", factor: 1.02 },
  { city: "Columbia", state: "MD", factor: 1.13 },
  { city: "Germantown", state: "MD", factor: 1.15 },

  // MASSACHUSETTS
  { city: "Boston", state: "MA", factor: 1.16 },
  { city: "Worcester", state: "MA", factor: 1.10 },
  { city: "Springfield", state: "MA", factor: 1.08 },
  { city: "Cambridge", state: "MA", factor: 1.18 },
  { city: "Lowell", state: "MA", factor: 1.12 },
  { city: "Brockton", state: "MA", factor: 1.10 },
  { city: "New Bedford", state: "MA", factor: 1.08 },
  { city: "Quincy", state: "MA", factor: 1.15 },
  { city: "Lynn", state: "MA", factor: 1.13 },
  { city: "Newton", state: "MA", factor: 1.17 },
  { city: "Somerville", state: "MA", factor: 1.16 },
  { city: "Framingham", state: "MA", factor: 1.13 },
  { city: "Waltham", state: "MA", factor: 1.15 },
  { city: "Plymouth", state: "MA", factor: 1.11 },

  // MICHIGAN
  { city: "Detroit", state: "MI", factor: 1.05 },
  { city: "Grand Rapids", state: "MI", factor: 0.95 },
  { city: "Warren", state: "MI", factor: 1.03 },
  { city: "Sterling Heights", state: "MI", factor: 1.02 },
  { city: "Ann Arbor", state: "MI", factor: 1.00 },
  { city: "Lansing", state: "MI", factor: 0.94 },
  { city: "Dearborn", state: "MI", factor: 1.03 },
  { city: "Livonia", state: "MI", factor: 1.01 },
  { city: "Westland", state: "MI", factor: 0.98 },
  { city: "Troy", state: "MI", factor: 1.04 },
  { city: "Farmington Hills", state: "MI", factor: 1.03 },
  { city: "Kalamazoo", state: "MI", factor: 0.93 },
  { city: "Wyoming", state: "MI", factor: 0.94 },
  { city: "Southfield", state: "MI", factor: 1.02 },

  // MINNESOTA
  { city: "Minneapolis", state: "MN", factor: 1.08 },
  { city: "St. Paul", state: "MN", factor: 1.07 },
  { city: "Rochester", state: "MN", factor: 1.02 },
  { city: "Duluth", state: "MN", factor: 1.01 },
  { city: "Bloomington", state: "MN", factor: 1.07 },
  { city: "Brooklyn Park", state: "MN", factor: 1.05 },
  { city: "Plymouth", state: "MN", factor: 1.08 },
  { city: "St. Cloud", state: "MN", factor: 0.98 },
  { city: "Eagan", state: "MN", factor: 1.06 },
  { city: "Woodbury", state: "MN", factor: 1.06 },
  { city: "Maple Grove", state: "MN", factor: 1.07 },
  { city: "Mankato", state: "MN", factor: 0.96 },

  // MISSISSIPPI
  { city: "Jackson", state: "MS", factor: 0.79 },
  { city: "Gulfport", state: "MS", factor: 0.78 },
  { city: "Southaven", state: "MS", factor: 0.78 },
  { city: "Hattiesburg", state: "MS", factor: 0.76 },
  { city: "Biloxi", state: "MS", factor: 0.78 },
  { city: "Meridian", state: "MS", factor: 0.75 },
  { city: "Tupelo", state: "MS", factor: 0.76 },
  { city: "Olive Branch", state: "MS", factor: 0.77 },

  // MISSOURI
  { city: "Kansas City", state: "MO", factor: 0.92 },
  { city: "St. Louis", state: "MO", factor: 0.94 },
  { city: "Springfield", state: "MO", factor: 0.86 },
  { city: "Independence", state: "MO", factor: 0.90 },
  { city: "Columbia", state: "MO", factor: 0.88 },
  { city: "Lee's Summit", state: "MO", factor: 0.91 },
  { city: "O'Fallon", state: "MO", factor: 0.92 },
  { city: "St. Joseph", state: "MO", factor: 0.87 },
  { city: "St. Charles", state: "MO", factor: 0.91 },
  { city: "St. Peters", state: "MO", factor: 0.90 },
  { city: "Blue Springs", state: "MO", factor: 0.90 },
  { city: "Florissant", state: "MO", factor: 0.92 },
  { city: "Joplin", state: "MO", factor: 0.84 },

  // MONTANA
  { city: "Billings", state: "MT", factor: 0.89 },
  { city: "Missoula", state: "MT", factor: 0.90 },
  { city: "Great Falls", state: "MT", factor: 0.87 },
  { city: "Bozeman", state: "MT", factor: 0.92 },
  { city: "Butte", state: "MT", factor: 0.86 },
  { city: "Helena", state: "MT", factor: 0.88 },
  { city: "Kalispell", state: "MT", factor: 0.89 },

  // NEBRASKA
  { city: "Omaha", state: "NE", factor: 0.90 },
  { city: "Lincoln", state: "NE", factor: 0.88 },
  { city: "Bellevue", state: "NE", factor: 0.89 },
  { city: "Grand Island", state: "NE", factor: 0.84 },
  { city: "Kearney", state: "NE", factor: 0.83 },
  { city: "Fremont", state: "NE", factor: 0.86 },
  { city: "Hastings", state: "NE", factor: 0.82 },
  { city: "North Platte", state: "NE", factor: 0.81 },

  // NEVADA
  { city: "Las Vegas", state: "NV", factor: 0.96 },
  { city: "Henderson", state: "NV", factor: 0.95 },
  { city: "Reno", state: "NV", factor: 0.94 },
  { city: "North Las Vegas", state: "NV", factor: 0.94 },
  { city: "Sparks", state: "NV", factor: 0.93 },
  { city: "Carson City", state: "NV", factor: 0.92 },
  { city: "Elko", state: "NV", factor: 0.90 },

  // NEW HAMPSHIRE
  { city: "Manchester", state: "NH", factor: 1.10 },
  { city: "Nashua", state: "NH", factor: 1.11 },
  { city: "Concord", state: "NH", factor: 1.08 },
  { city: "Derry", state: "NH", factor: 1.09 },
  { city: "Dover", state: "NH", factor: 1.07 },
  { city: "Rochester", state: "NH", factor: 1.06 },
  { city: "Portsmouth", state: "NH", factor: 1.12 },

  // NEW JERSEY
  { city: "Newark", state: "NJ", factor: 1.20 },
  { city: "Jersey City", state: "NJ", factor: 1.22 },
  { city: "Paterson", state: "NJ", factor: 1.18 },
  { city: "Elizabeth", state: "NJ", factor: 1.19 },
  { city: "Edison", state: "NJ", factor: 1.17 },
  { city: "Woodbridge", state: "NJ", factor: 1.16 },
  { city: "Lakewood", state: "NJ", factor: 1.14 },
  { city: "Toms River", state: "NJ", factor: 1.13 },
  { city: "Hamilton", state: "NJ", factor: 1.12 },
  { city: "Trenton", state: "NJ", factor: 1.13 },
  { city: "Clifton", state: "NJ", factor: 1.18 },
  { city: "Camden", state: "NJ", factor: 1.11 },
  { city: "Passaic", state: "NJ", factor: 1.17 },
  { city: "Union City", state: "NJ", factor: 1.20 },

  // NEW MEXICO
  { city: "Albuquerque", state: "NM", factor: 0.86 },
  { city: "Las Cruces", state: "NM", factor: 0.82 },
  { city: "Rio Rancho", state: "NM", factor: 0.85 },
  { city: "Santa Fe", state: "NM", factor: 0.88 },
  { city: "Roswell", state: "NM", factor: 0.80 },
  { city: "Farmington", state: "NM", factor: 0.82 },
  { city: "Clovis", state: "NM", factor: 0.79 },

  // NEW YORK
  { city: "New York", state: "NY", factor: 1.32 },
  { city: "Buffalo", state: "NY", factor: 1.12 },
  { city: "Rochester", state: "NY", factor: 1.10 },
  { city: "Yonkers", state: "NY", factor: 1.28 },
  { city: "Syracuse", state: "NY", factor: 1.08 },
  { city: "Albany", state: "NY", factor: 1.09 },
  { city: "New Rochelle", state: "NY", factor: 1.26 },
  { city: "Mount Vernon", state: "NY", factor: 1.24 },
  { city: "Schenectady", state: "NY", factor: 1.07 },
  { city: "Utica", state: "NY", factor: 1.05 },
  { city: "White Plains", state: "NY", factor: 1.27 },
  { city: "Hempstead", state: "NY", factor: 1.25 },
  { city: "Troy", state: "NY", factor: 1.06 },
  { city: "Niagara Falls", state: "NY", factor: 1.08 },
  { city: "Binghamton", state: "NY", factor: 1.04 },

  // NORTH CAROLINA
  { city: "Charlotte", state: "NC", factor: 0.89 },
  { city: "Raleigh", state: "NC", factor: 0.88 },
  { city: "Greensboro", state: "NC", factor: 0.85 },
  { city: "Durham", state: "NC", factor: 0.87 },
  { city: "Winston-Salem", state: "NC", factor: 0.85 },
  { city: "Fayetteville", state: "NC", factor: 0.82 },
  { city: "Cary", state: "NC", factor: 0.89 },
  { city: "Wilmington", state: "NC", factor: 0.86 },
  { city: "High Point", state: "NC", factor: 0.84 },
  { city: "Asheville", state: "NC", factor: 0.87 },
  { city: "Concord", state: "NC", factor: 0.87 },
  { city: "Gastonia", state: "NC", factor: 0.84 },
  { city: "Greenville", state: "NC", factor: 0.82 },
  { city: "Chapel Hill", state: "NC", factor: 0.88 },

  // NORTH DAKOTA
  { city: "Fargo", state: "ND", factor: 0.92 },
  { city: "Bismarck", state: "ND", factor: 0.90 },
  { city: "Grand Forks", state: "ND", factor: 0.89 },
  { city: "Minot", state: "ND", factor: 0.91 },
  { city: "West Fargo", state: "ND", factor: 0.91 },

  // OHIO
  { city: "Columbus", state: "OH", factor: 0.96 },
  { city: "Cleveland", state: "OH", factor: 1.00 },
  { city: "Cincinnati", state: "OH", factor: 0.95 },
  { city: "Toledo", state: "OH", factor: 0.94 },
  { city: "Akron", state: "OH", factor: 0.95 },
  { city: "Dayton", state: "OH", factor: 0.93 },
  { city: "Parma", state: "OH", factor: 0.98 },
  { city: "Canton", state: "OH", factor: 0.93 },
  { city: "Youngstown", state: "OH", factor: 0.92 },
  { city: "Lorain", state: "OH", factor: 0.94 },
  { city: "Hamilton", state: "OH", factor: 0.93 },
  { city: "Springfield", state: "OH", factor: 0.91 },
  { city: "Kettering", state: "OH", factor: 0.94 },
  { city: "Elyria", state: "OH", factor: 0.93 },

  // OKLAHOMA
  { city: "Oklahoma City", state: "OK", factor: 0.83 },
  { city: "Tulsa", state: "OK", factor: 0.82 },
  { city: "Norman", state: "OK", factor: 0.82 },
  { city: "Broken Arrow", state: "OK", factor: 0.81 },
  { city: "Edmond", state: "OK", factor: 0.83 },
  { city: "Lawton", state: "OK", factor: 0.79 },
  { city: "Moore", state: "OK", factor: 0.82 },
  { city: "Midwest City", state: "OK", factor: 0.81 },
  { city: "Enid", state: "OK", factor: 0.78 },
  { city: "Stillwater", state: "OK", factor: 0.80 },

  // OREGON
  { city: "Portland", state: "OR", factor: 1.10 },
  { city: "Eugene", state: "OR", factor: 1.05 },
  { city: "Salem", state: "OR", factor: 1.06 },
  { city: "Gresham", state: "OR", factor: 1.08 },
  { city: "Hillsboro", state: "OR", factor: 1.09 },
  { city: "Beaverton", state: "OR", factor: 1.09 },
  { city: "Bend", state: "OR", factor: 1.07 },
  { city: "Medford", state: "OR", factor: 1.03 },
  { city: "Springfield", state: "OR", factor: 1.04 },
  { city: "Corvallis", state: "OR", factor: 1.05 },
  { city: "Albany", state: "OR", factor: 1.02 },

  // PENNSYLVANIA
  { city: "Philadelphia", state: "PA", factor: 1.14 },
  { city: "Pittsburgh", state: "PA", factor: 1.08 },
  { city: "Allentown", state: "PA", factor: 1.10 },
  { city: "Erie", state: "PA", factor: 1.04 },
  { city: "Reading", state: "PA", factor: 1.06 },
  { city: "Scranton", state: "PA", factor: 1.05 },
  { city: "Bethlehem", state: "PA", factor: 1.09 },
  { city: "Lancaster", state: "PA", factor: 1.07 },
  { city: "Harrisburg", state: "PA", factor: 1.06 },
  { city: "Altoona", state: "PA", factor: 1.02 },
  { city: "York", state: "PA", factor: 1.05 },
  { city: "State College", state: "PA", factor: 1.06 },
  { city: "Wilkes-Barre", state: "PA", factor: 1.04 },

  // RHODE ISLAND
  { city: "Providence", state: "RI", factor: 1.14 },
  { city: "Warwick", state: "RI", factor: 1.12 },
  { city: "Cranston", state: "RI", factor: 1.12 },
  { city: "Pawtucket", state: "RI", factor: 1.11 },
  { city: "East Providence", state: "RI", factor: 1.11 },
  { city: "Woonsocket", state: "RI", factor: 1.09 },

  // SOUTH CAROLINA
  { city: "Charleston", state: "SC", factor: 0.86 },
  { city: "Columbia", state: "SC", factor: 0.84 },
  { city: "North Charleston", state: "SC", factor: 0.85 },
  { city: "Mount Pleasant", state: "SC", factor: 0.87 },
  { city: "Rock Hill", state: "SC", factor: 0.83 },
  { city: "Greenville", state: "SC", factor: 0.84 },
  { city: "Summerville", state: "SC", factor: 0.85 },
  { city: "Sumter", state: "SC", factor: 0.81 },
  { city: "Goose Creek", state: "SC", factor: 0.84 },
  { city: "Hilton Head Island", state: "SC", factor: 0.88 },
  { city: "Florence", state: "SC", factor: 0.81 },
  { city: "Spartanburg", state: "SC", factor: 0.82 },

  // SOUTH DAKOTA
  { city: "Sioux Falls", state: "SD", factor: 0.88 },
  { city: "Rapid City", state: "SD", factor: 0.86 },
  { city: "Aberdeen", state: "SD", factor: 0.84 },
  { city: "Brookings", state: "SD", factor: 0.85 },
  { city: "Watertown", state: "SD", factor: 0.83 },

  // TENNESSEE
  { city: "Nashville", state: "TN", factor: 0.88 },
  { city: "Memphis", state: "TN", factor: 0.84 },
  { city: "Knoxville", state: "TN", factor: 0.85 },
  { city: "Chattanooga", state: "TN", factor: 0.84 },
  { city: "Clarksville", state: "TN", factor: 0.82 },
  { city: "Murfreesboro", state: "TN", factor: 0.86 },
  { city: "Franklin", state: "TN", factor: 0.90 },
  { city: "Jackson", state: "TN", factor: 0.80 },
  { city: "Johnson City", state: "TN", factor: 0.81 },
  { city: "Bartlett", state: "TN", factor: 0.84 },
  { city: "Hendersonville", state: "TN", factor: 0.87 },
  { city: "Kingsport", state: "TN", factor: 0.80 },

  // TEXAS
  { city: "Houston", state: "TX", factor: 0.85 },
  { city: "San Antonio", state: "TX", factor: 0.83 },
  { city: "Dallas", state: "TX", factor: 0.86 },
  { city: "Austin", state: "TX", factor: 0.88 },
  { city: "Fort Worth", state: "TX", factor: 0.85 },
  { city: "El Paso", state: "TX", factor: 0.80 },
  { city: "Arlington", state: "TX", factor: 0.85 },
  { city: "Corpus Christi", state: "TX", factor: 0.81 },
  { city: "Plano", state: "TX", factor: 0.87 },
  { city: "Laredo", state: "TX", factor: 0.78 },
  { city: "Lubbock", state: "TX", factor: 0.79 },
  { city: "Garland", state: "TX", factor: 0.85 },
  { city: "Irving", state: "TX", factor: 0.86 },
  { city: "Amarillo", state: "TX", factor: 0.78 },
  { city: "Grand Prairie", state: "TX", factor: 0.84 },
  { city: "McKinney", state: "TX", factor: 0.86 },
  { city: "Frisco", state: "TX", factor: 0.88 },
  { city: "Brownsville", state: "TX", factor: 0.76 },
  { city: "Pasadena", state: "TX", factor: 0.84 },
  { city: "Killeen", state: "TX", factor: 0.80 },
  { city: "McAllen", state: "TX", factor: 0.77 },
  { city: "Mesquite", state: "TX", factor: 0.84 },
  { city: "Waco", state: "TX", factor: 0.80 },
  { city: "Carrollton", state: "TX", factor: 0.86 },
  { city: "Denton", state: "TX", factor: 0.84 },
  { city: "Midland", state: "TX", factor: 0.82 },
  { city: "Abilene", state: "TX", factor: 0.78 },
  { city: "Beaumont", state: "TX", factor: 0.81 },
  { city: "Round Rock", state: "TX", factor: 0.87 },
  { city: "Odessa", state: "TX", factor: 0.81 },
  { city: "The Woodlands", state: "TX", factor: 0.87 },
  { city: "Richardson", state: "TX", factor: 0.86 },
  { city: "League City", state: "TX", factor: 0.84 },
  { city: "Sugar Land", state: "TX", factor: 0.86 },
  { city: "College Station", state: "TX", factor: 0.82 },

  // UTAH
  { city: "Salt Lake City", state: "UT", factor: 0.92 },
  { city: "West Valley City", state: "UT", factor: 0.90 },
  { city: "Provo", state: "UT", factor: 0.89 },
  { city: "West Jordan", state: "UT", factor: 0.90 },
  { city: "Orem", state: "UT", factor: 0.88 },
  { city: "Sandy", state: "UT", factor: 0.91 },
  { city: "Ogden", state: "UT", factor: 0.88 },
  { city: "St. George", state: "UT", factor: 0.87 },
  { city: "Layton", state: "UT", factor: 0.89 },
  { city: "Taylorsville", state: "UT", factor: 0.89 },
  { city: "South Jordan", state: "UT", factor: 0.91 },
  { city: "Lehi", state: "UT", factor: 0.90 },

  // VERMONT
  { city: "Burlington", state: "VT", factor: 1.12 },
  { city: "South Burlington", state: "VT", factor: 1.11 },
  { city: "Rutland", state: "VT", factor: 1.08 },
  { city: "Barre", state: "VT", factor: 1.07 },
  { city: "Montpelier", state: "VT", factor: 1.09 },

  // VIRGINIA
  { city: "Virginia Beach", state: "VA", factor: 0.95 },
  { city: "Norfolk", state: "VA", factor: 0.93 },
  { city: "Chesapeake", state: "VA", factor: 0.94 },
  { city: "Richmond", state: "VA", factor: 0.92 },
  { city: "Newport News", state: "VA", factor: 0.92 },
  { city: "Alexandria", state: "VA", factor: 1.14 },
  { city: "Hampton", state: "VA", factor: 0.91 },
  { city: "Roanoke", state: "VA", factor: 0.88 },
  { city: "Portsmouth", state: "VA", factor: 0.91 },
  { city: "Suffolk", state: "VA", factor: 0.90 },
  { city: "Lynchburg", state: "VA", factor: 0.87 },
  { city: "Harrisonburg", state: "VA", factor: 0.88 },
  { city: "Leesburg", state: "VA", factor: 1.12 },
  { city: "Charlottesville", state: "VA", factor: 0.91 },

  // WASHINGTON
  { city: "Seattle", state: "WA", factor: 1.08 },
  { city: "Spokane", state: "WA", factor: 0.98 },
  { city: "Tacoma", state: "WA", factor: 1.04 },
  { city: "Vancouver", state: "WA", factor: 1.02 },
  { city: "Bellevue", state: "WA", factor: 1.12 },
  { city: "Kent", state: "WA", factor: 1.05 },
  { city: "Everett", state: "WA", factor: 1.06 },
  { city: "Renton", state: "WA", factor: 1.06 },
  { city: "Yakima", state: "WA", factor: 0.94 },
  { city: "Federal Way", state: "WA", factor: 1.04 },
  { city: "Spokane Valley", state: "WA", factor: 0.97 },
  { city: "Bellingham", state: "WA", factor: 1.02 },
  { city: "Kirkland", state: "WA", factor: 1.10 },
  { city: "Redmond", state: "WA", factor: 1.11 },

  // WASHINGTON DC
  { city: "Washington", state: "DC", factor: 1.19 },

  // WEST VIRGINIA
  { city: "Charleston", state: "WV", factor: 0.88 },
  { city: "Huntington", state: "WV", factor: 0.86 },
  { city: "Morgantown", state: "WV", factor: 0.87 },
  { city: "Parkersburg", state: "WV", factor: 0.84 },
  { city: "Wheeling", state: "WV", factor: 0.85 },
  { city: "Weirton", state: "WV", factor: 0.84 },

  // WISCONSIN
  { city: "Milwaukee", state: "WI", factor: 1.05 },
  { city: "Madison", state: "WI", factor: 1.04 },
  { city: "Green Bay", state: "WI", factor: 0.98 },
  { city: "Kenosha", state: "WI", factor: 1.02 },
  { city: "Racine", state: "WI", factor: 1.01 },
  { city: "Appleton", state: "WI", factor: 0.97 },
  { city: "Waukesha", state: "WI", factor: 1.04 },
  { city: "Eau Claire", state: "WI", factor: 0.95 },
  { city: "Oshkosh", state: "WI", factor: 0.96 },
  { city: "Janesville", state: "WI", factor: 0.97 },
  { city: "West Allis", state: "WI", factor: 1.03 },
  { city: "La Crosse", state: "WI", factor: 0.96 },

  // WYOMING
  { city: "Cheyenne", state: "WY", factor: 0.88 },
  { city: "Casper", state: "WY", factor: 0.87 },
  { city: "Laramie", state: "WY", factor: 0.86 },
  { city: "Gillette", state: "WY", factor: 0.89 },
  { city: "Rock Springs", state: "WY", factor: 0.87 },
  { city: "Sheridan", state: "WY", factor: 0.86 },
];

/**
 * Get the cost factor for a specific city
 * @param {string} cityName - The city name
 * @param {string} stateName - The state abbreviation (e.g., 'CA', 'NY')
 * @returns {number|null} The cost factor or null if not found
 */
export function getCityFactor(cityName, stateName) {
  const city = raapCities.find(
    c => c.city.toLowerCase() === cityName.toLowerCase() &&
         c.state.toLowerCase() === stateName.toLowerCase()
  );
  return city ? city.factor : null;
}

/**
 * Get all cities for a specific state
 * @param {string} stateName - The state abbreviation (e.g., 'CA', 'NY')
 * @returns {Array} Array of city objects for the state
 */
export function getCitiesByState(stateName) {
  return raapCities.filter(
    c => c.state.toLowerCase() === stateName.toLowerCase()
  );
}

/**
 * Search cities by name (partial match)
 * @param {string} searchTerm - The search term
 * @returns {Array} Array of matching city objects
 */
export function searchCities(searchTerm) {
  const term = searchTerm.toLowerCase();
  return raapCities.filter(
    c => c.city.toLowerCase().includes(term) ||
         c.state.toLowerCase().includes(term)
  );
}

/**
 * Get all unique states in the database
 * @returns {Array} Array of state abbreviations
 */
export function getStates() {
  return [...new Set(raapCities.map(c => c.state))].sort();
}

/**
 * Get cities sorted by cost factor
 * @param {boolean} ascending - Sort ascending (true) or descending (false)
 * @returns {Array} Sorted array of city objects
 */
export function getCitiesByCost(ascending = true) {
  return [...raapCities].sort((a, b) =>
    ascending ? a.factor - b.factor : b.factor - a.factor
  );
}

// Export for backwards compatibility
export default raapCities;
