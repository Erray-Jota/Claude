/**
 * UNIT OPTIMIZATION ENGINE
 *
 * This engine optimizes the unit mix for a modular multifamily building based on:
 * - Target unit mix (desired number of studios, 1BR, 2BR, 3BR)
 * - Building length constraint
 * - Modular unit widths
 * - Common area requirements
 *
 * The optimization ensures units fit within the building length while staying
 * as close as possible to the target unit mix.
 */

// ============================================================================
// CONSTANTS: Unit Dimensions
// ============================================================================

/**
 * Standard modular unit widths (in feet)
 * These represent typical factory-built module widths for each unit type
 */
export const UNIT_WIDTHS = {
  studio: 12,    // Studio units: 12' wide module
  oneBed: 14,    // 1-bedroom: 14' wide module
  twoBed: 26,    // 2-bedroom: 26' wide (typically two 13' modules)
  threeBed: 28,  // 3-bedroom: 28' wide (two 14' modules)
};

/**
 * Standard unit sizes (Gross Square Feet per unit)
 * These include in-unit circulation and are based on typical modular layouts
 */
export const UNIT_SIZES_GSF = {
  studio: 450,     // 450 SF studio
  oneBed: 650,     // 650 SF one-bedroom
  twoBed: 950,     // 950 SF two-bedroom
  threeBed: 1200,  // 1200 SF three-bedroom
};

/**
 * Default unit distribution percentages
 * Used when no target mix is provided
 */
export const DEFAULT_UNIT_MIX = {
  studio: 25,    // 25% studios
  oneBed: 40,    // 40% one-bedrooms
  twoBed: 30,    // 30% two-bedrooms
  threeBed: 5,   // 5% three-bedrooms
};

// ============================================================================
// CONSTANTS: Building Parameters
// ============================================================================

/**
 * Base building parameters for scaling calculations
 * These represent the "baseline" project used for cost calibration
 */
export const BASE_BUILDING = {
  floors: 5,
  totalUnits: 120,
  length: 280,      // feet
  gsf: 78336,       // Total GSF for base building
  commonAreaPct: 5, // 5% common area factor
};

/**
 * Lobby configurations and their impact on building layout
 */
export const LOBBY_TYPES = {
  1: { name: 'Single Loaded', width: 8, description: 'Units on one side of corridor' },
  2: { name: 'Double Loaded', width: 6, description: 'Units on both sides of corridor' },
  3: { name: 'Wrap', width: 10, description: 'Units wrap around core' },
};

// ============================================================================
// CORE OPTIMIZATION LOGIC
// ============================================================================

/**
 * Calculates the actual width consumed by the lobby/corridor
 * @param {number} lobbyType - Type of lobby (1=single, 2=double, 3=wrap)
 * @param {number} buildingLength - Total building length in feet
 * @returns {number} Lobby width in feet
 */
export const calculateLobbyWidth = (lobbyType, buildingLength) => {
  const lobby = LOBBY_TYPES[lobbyType] || LOBBY_TYPES[2];
  return lobby.width;
};

/**
 * Optimizes unit mix to fit within building length constraint
 *
 * ALGORITHM:
 * 1. Start with target unit counts
 * 2. Calculate width required for each unit type
 * 3. Calculate total width needed (sum of all unit widths)
 * 4. If width exceeds building length:
 *    - Reduce units proportionally, prioritizing larger units first
 *    - Re-calculate until units fit
 * 5. If width is under building length:
 *    - Add units proportionally, maintaining target mix ratios
 *    - Re-calculate until building is optimally filled
 *
 * @param {Object} targets - Target unit counts {studio, oneBed, twoBed, threeBed}
 * @param {number} buildingLength - Available length in feet
 * @param {number} lobbyType - Lobby configuration type
 * @param {number} floors - Number of floors
 * @returns {Object} Optimized unit counts and metrics
 */
export const optimizeUnits = (targets, buildingLength, lobbyType, floors = 5) => {
  // Calculate available width for units (excluding lobby/corridor)
  const lobbyWidth = calculateLobbyWidth(lobbyType, buildingLength);
  const availableWidth = buildingLength - lobbyWidth;

  // Start with target counts
  let optimized = { ...targets };

  // Calculate required width for target units
  const calculateRequiredWidth = (units) => {
    return (
      units.studio * UNIT_WIDTHS.studio +
      units.oneBed * UNIT_WIDTHS.oneBed +
      units.twoBed * UNIT_WIDTHS.twoBed +
      units.threeBed * UNIT_WIDTHS.threeBed
    );
  };

  let requiredWidth = calculateRequiredWidth(optimized);
  let iterations = 0;
  const maxIterations = 50; // Prevent infinite loops

  // OPTIMIZATION LOOP
  while (Math.abs(requiredWidth - availableWidth) > 2 && iterations < maxIterations) {
    iterations++;

    if (requiredWidth > availableWidth) {
      // TOO WIDE: Reduce units (prioritize reducing larger units)
      if (optimized.threeBed > 0) {
        optimized.threeBed--;
      } else if (optimized.twoBed > 0) {
        optimized.twoBed--;
      } else if (optimized.oneBed > 0) {
        optimized.oneBed--;
      } else if (optimized.studio > 0) {
        optimized.studio--;
      }
    } else {
      // TOO NARROW: Add units (maintain target proportions)
      const totalTarget = targets.studio + targets.oneBed + targets.twoBed + targets.threeBed;
      const ratios = {
        studio: targets.studio / totalTarget,
        oneBed: targets.oneBed / totalTarget,
        twoBed: targets.twoBed / totalTarget,
        threeBed: targets.threeBed / totalTarget,
      };

      // Find which unit type to add based on ratios
      const currentTotal = optimized.studio + optimized.oneBed + optimized.twoBed + optimized.threeBed;
      const currentRatios = {
        studio: optimized.studio / currentTotal,
        oneBed: optimized.oneBed / currentTotal,
        twoBed: optimized.twoBed / currentTotal,
        threeBed: optimized.threeBed / currentTotal,
      };

      // Add unit type that's most under-represented
      const deficits = {
        studio: ratios.studio - currentRatios.studio,
        oneBed: ratios.oneBed - currentRatios.oneBed,
        twoBed: ratios.twoBed - currentRatios.twoBed,
        threeBed: ratios.threeBed - currentRatios.threeBed,
      };

      const maxDeficitType = Object.keys(deficits).reduce((a, b) =>
        deficits[a] > deficits[b] ? a : b
      );

      // Check if adding this unit would exceed available width
      const widthIfAdded = requiredWidth + UNIT_WIDTHS[maxDeficitType];
      if (widthIfAdded <= availableWidth + 2) {
        optimized[maxDeficitType]++;
      } else {
        break; // Can't add any more units
      }
    }

    requiredWidth = calculateRequiredWidth(optimized);
  }

  // Calculate final metrics
  const totalOptimized = optimized.studio + optimized.oneBed + optimized.twoBed + optimized.threeBed;
  const totalTarget = targets.studio + targets.oneBed + targets.twoBed + targets.threeBed;

  // Calculate GSF per unit type
  const gsfByType = {
    studio: optimized.studio * UNIT_SIZES_GSF.studio,
    oneBed: optimized.oneBed * UNIT_SIZES_GSF.oneBed,
    twoBed: optimized.twoBed * UNIT_SIZES_GSF.twoBed,
    threeBed: optimized.threeBed * UNIT_SIZES_GSF.threeBed,
  };

  const totalUnitGSF = gsfByType.studio + gsfByType.oneBed + gsfByType.twoBed + gsfByType.threeBed;

  return {
    optimized,
    totalOptimized,
    requiredWidth,
    availableWidth,
    utilizationPct: (requiredWidth / availableWidth) * 100,
    gsfByType,
    totalUnitGSF,
    lobbyWidth,
    convergenceIterations: iterations,
  };
};

/**
 * Calculates total building GSF including common areas
 *
 * @param {Object} optimized - Optimized unit counts
 * @param {number} floors - Number of floors
 * @param {number} commonAreaPct - Common area percentage (default 5%)
 * @param {number} podiumCount - Number of podium floors (default 0)
 * @returns {Object} GSF breakdown
 */
export const calculateBuildingGSF = (optimized, floors, commonAreaPct = 5, podiumCount = 0) => {
  // Unit GSF per floor
  const unitGSFPerFloor =
    optimized.studio * UNIT_SIZES_GSF.studio +
    optimized.oneBed * UNIT_SIZES_GSF.oneBed +
    optimized.twoBed * UNIT_SIZES_GSF.twoBed +
    optimized.threeBed * UNIT_SIZES_GSF.threeBed;

  // Typical floors (residential)
  const residentialFloors = floors - podiumCount;
  const totalUnitGSF = unitGSFPerFloor * residentialFloors;

  // Common areas (lobbies, corridors, stairs, elevators, mechanical)
  const commonGSF = totalUnitGSF * (commonAreaPct / 100);

  // Podium GSF (typically parking or amenity space)
  const podiumGSFPerFloor = unitGSFPerFloor * 1.2; // Podiums typically 20% larger footprint
  const totalPodiumGSF = podiumGSFPerFloor * podiumCount;

  // Total building GSF
  const totalGSF = totalUnitGSF + commonGSF + totalPodiumGSF;

  return {
    totalGSF,
    totalUnitGSF,
    commonGSF,
    totalPodiumGSF,
    unitGSFPerFloor,
    residentialFloors,
    gsfPerUnit: totalGSF / (optimized.studio + optimized.oneBed + optimized.twoBed + optimized.threeBed),
  };
};

/**
 * Calculates unit ratio (scale factor relative to base building)
 * Used for cost scaling
 *
 * @param {number} totalOptimized - Total optimized unit count
 * @returns {number} Unit ratio (e.g., 1.0 = same as base, 1.5 = 50% larger)
 */
export const calculateUnitRatio = (totalOptimized) => {
  return totalOptimized / BASE_BUILDING.totalUnits;
};

/**
 * Calculates floor multiplier (scale factor for number of floors)
 * Used for cost scaling
 *
 * @param {number} floors - Number of floors
 * @returns {number} Floor multiplier
 */
export const calculateFloorMultiplier = (floors) => {
  return floors / BASE_BUILDING.floors;
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  // Constants
  UNIT_WIDTHS,
  UNIT_SIZES_GSF,
  DEFAULT_UNIT_MIX,
  BASE_BUILDING,
  LOBBY_TYPES,

  // Functions
  calculateLobbyWidth,
  optimizeUnits,
  calculateBuildingGSF,
  calculateUnitRatio,
  calculateFloorMultiplier,
};
