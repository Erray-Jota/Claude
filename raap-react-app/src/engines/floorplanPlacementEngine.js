/**
 * FLOORPLAN PLACEMENT ENGINE
 *
 * This engine handles the placement of modular units on a floor plan following
 * architectural and modular construction best practices:
 *
 * - Double-loaded corridor layouts (units on both sides)
 * - Single-loaded corridor layouts (units on one side)
 * - Wrap layouts (units around central core)
 * - Unit adjacency rules (compatible unit types next to each other)
 * - Core placement (stairs, elevators, mechanical)
 * - End-unit conditions
 *
 * The placement engine generates a visual representation of the floor plan
 * showing unit positions, corridors, cores, and circulation.
 */

import { UNIT_WIDTHS } from './unitOptimizationEngine';

// ============================================================================
// CONSTANTS: Layout Rules
// ============================================================================

/**
 * Corridor widths for different layout types (in feet)
 */
export const CORRIDOR_WIDTHS = {
  singleLoaded: 8,   // Single-loaded corridor (units one side)
  doubleLoaded: 6,   // Double-loaded corridor (units both sides)
  wrap: 10,          // Wrap layout (wider for circulation)
};

/**
 * Unit depth (perpendicular to building length) in feet
 * These represent typical module depths
 */
export const UNIT_DEPTHS = {
  studio: 28,      // Shallow depth for studios
  oneBed: 32,      // Standard depth
  twoBed: 32,      // Standard depth (two modules deep)
  threeBed: 36,    // Deeper for 3BR layouts
  corridor: 6,     // Corridor depth
};

/**
 * Core dimensions (stairs, elevators, mechanical)
 */
export const CORE_DIMENSIONS = {
  width: 24,        // Typical core width (stairs + elevator)
  depth: 32,        // Typical core depth
  minUnitsPerCore: 30,  // Minimum units per core (building code typical)
  maxUnitsPerCore: 60,  // Maximum units per core (efficiency)
};

/**
 * Unit adjacency rules
 * Defines which unit types can be placed next to each other
 * TRUE = compatible, FALSE = avoid if possible
 */
export const ADJACENCY_MATRIX = {
  studio: {
    studio: true,
    oneBed: true,
    twoBed: false,    // Avoid - different module depths may complicate
    threeBed: false,
  },
  oneBed: {
    studio: true,
    oneBed: true,
    twoBed: true,
    threeBed: true,
  },
  twoBed: {
    studio: false,
    oneBed: true,
    twoBed: true,
    threeBed: true,
  },
  threeBed: {
    studio: false,
    oneBed: true,
    twoBed: true,
    threeBed: true,
  },
};

/**
 * Unit placement preferences
 * Score-based system for optimal placement
 */
export const PLACEMENT_PREFERENCES = {
  cornerUnit: 1.2,      // Premium for corner units (better light/views)
  endUnit: 1.1,         // Slight premium for end units
  midUnit: 1.0,         // Standard mid-corridor units
  nearCore: 0.9,        // Slight penalty near core (noise)
};

// ============================================================================
// PLACEMENT ALGORITHM
// ============================================================================

/**
 * Calculates number of cores needed based on unit count
 * @param {number} totalUnits - Total units per floor
 * @returns {number} Number of cores needed
 */
export const calculateCoresNeeded = (totalUnits) => {
  if (totalUnits <= CORE_DIMENSIONS.minUnitsPerCore) return 1;
  return Math.ceil(totalUnits / CORE_DIMENSIONS.maxUnitsPerCore);
};

/**
 * Generates a floor plan layout
 *
 * ALGORITHM:
 * 1. Determine layout type (single/double/wrap) based on lobbyType
 * 2. Calculate core positions
 * 3. Divide building into placement zones
 * 4. Sort units by size (largest first for stability)
 * 5. Place units following rules:
 *    - Place larger units first (easier to fill gaps with smaller units)
 *    - Maintain adjacency rules
 *    - Optimize for corridor efficiency
 * 6. Generate visual grid representation
 *
 * @param {Object} optimized - Optimized unit counts
 * @param {number} buildingLength - Building length in feet
 * @param {number} lobbyType - Lobby configuration (1=single, 2=double, 3=wrap)
 * @param {number} floors - Number of floors
 * @returns {Object} Floor plan layout data
 */
export const generateFloorPlan = (optimized, buildingLength, lobbyType, floors = 5) => {
  // Determine layout type
  const layoutType = lobbyType === 1 ? 'singleLoaded' : lobbyType === 3 ? 'wrap' : 'doubleLoaded';
  const corridorWidth = CORRIDOR_WIDTHS[layoutType];

  // Calculate cores needed
  const totalUnits = optimized.studio + optimized.oneBed + optimized.twoBed + optimized.threeBed;
  const coresNeeded = calculateCoresNeeded(totalUnits);

  // Create unit pool (all units to be placed)
  const unitPool = [];

  // Add all units to pool with metadata
  for (let i = 0; i < optimized.studio; i++) {
    unitPool.push({ type: 'studio', width: UNIT_WIDTHS.studio, depth: UNIT_DEPTHS.studio, id: `STU-${i + 1}` });
  }
  for (let i = 0; i < optimized.oneBed; i++) {
    unitPool.push({ type: 'oneBed', width: UNIT_WIDTHS.oneBed, depth: UNIT_DEPTHS.oneBed, id: `1BR-${i + 1}` });
  }
  for (let i = 0; i < optimized.twoBed; i++) {
    unitPool.push({ type: 'twoBed', width: UNIT_WIDTHS.twoBed, depth: UNIT_DEPTHS.twoBed, id: `2BR-${i + 1}` });
  }
  for (let i = 0; i < optimized.threeBed; i++) {
    unitPool.push({ type: 'threeBed', width: UNIT_WIDTHS.threeBed, depth: UNIT_DEPTHS.threeBed, id: `3BR-${i + 1}` });
  }

  // Sort by width (largest first) for stable placement
  unitPool.sort((a, b) => b.width - a.width);

  // Initialize placement arrays (north and south sides for double-loaded)
  const northSide = [];
  const southSide = [];
  let currentPosition = 0;

  // Place cores first
  const corePositions = [];
  if (coresNeeded === 1) {
    // Single core - place at center
    corePositions.push({
      x: buildingLength / 2 - CORE_DIMENSIONS.width / 2,
      width: CORE_DIMENSIONS.width,
      type: 'core',
    });
  } else {
    // Multiple cores - distribute evenly
    const spacing = buildingLength / (coresNeeded + 1);
    for (let i = 1; i <= coresNeeded; i++) {
      corePositions.push({
        x: spacing * i - CORE_DIMENSIONS.width / 2,
        width: CORE_DIMENSIONS.width,
        type: 'core',
      });
    }
  }

  // PLACEMENT LOGIC for Double-Loaded Corridor
  if (layoutType === 'doubleLoaded') {
    let northPosition = 0;
    let southPosition = 0;
    let placingNorth = true; // Alternate between north and south

    for (const unit of unitPool) {
      // Check if placement would conflict with core
      const positionToUse = placingNorth ? northPosition : southPosition;
      let conflictsWithCore = false;

      for (const core of corePositions) {
        if (
          positionToUse < core.x + core.width &&
          positionToUse + unit.width > core.x
        ) {
          conflictsWithCore = true;
          break;
        }
      }

      if (conflictsWithCore) {
        // Skip to after the core
        const blockingCore = corePositions.find(
          (core) => positionToUse < core.x + core.width
        );
        if (blockingCore) {
          if (placingNorth) {
            northPosition = blockingCore.x + blockingCore.width;
          } else {
            southPosition = blockingCore.x + blockingCore.width;
          }
        }
      }

      // Place unit
      const placement = {
        ...unit,
        x: placingNorth ? northPosition : southPosition,
        side: placingNorth ? 'north' : 'south',
      };

      if (placingNorth) {
        northSide.push(placement);
        northPosition += unit.width;
        placingNorth = false; // Alternate
      } else {
        southSide.push(placement);
        southPosition += unit.width;
        placingNorth = true; // Alternate
      }
    }
  }

  // PLACEMENT LOGIC for Single-Loaded
  if (layoutType === 'singleLoaded') {
    let position = 0;

    for (const unit of unitPool) {
      // Check core conflicts
      let conflictsWithCore = false;
      for (const core of corePositions) {
        if (position < core.x + core.width && position + unit.width > core.x) {
          conflictsWithCore = true;
          const blockingCore = core;
          position = blockingCore.x + blockingCore.width;
          break;
        }
      }

      const placement = {
        ...unit,
        x: position,
        side: 'north',
      };

      northSide.push(placement);
      position += unit.width;
    }
  }

  // PLACEMENT LOGIC for Wrap Layout
  if (layoutType === 'wrap') {
    // Simplified wrap - place units around perimeter
    // This would be more complex in a real implementation
    let position = 0;
    let currentSide = 'north';
    const sidesRotation = ['north', 'east', 'south', 'west'];
    let sideIndex = 0;

    for (const unit of unitPool) {
      const placement = {
        ...unit,
        x: position,
        side: sidesRotation[sideIndex],
      };

      if (currentSide === 'north' || currentSide === 'south') {
        northSide.push(placement);
      } else {
        southSide.push(placement);
      }

      position += unit.width;

      // Rotate sides when position exceeds building length
      if (position > buildingLength) {
        position = 0;
        sideIndex = (sideIndex + 1) % sidesRotation.length;
        currentSide = sidesRotation[sideIndex];
      }
    }
  }

  // Calculate total building depth
  const maxDepth = Math.max(
    ...unitPool.map((u) => u.depth),
    UNIT_DEPTHS.corridor
  );

  const buildingDepth =
    layoutType === 'doubleLoaded'
      ? maxDepth * 2 + corridorWidth
      : maxDepth + corridorWidth;

  return {
    layoutType,
    northSide,
    southSide,
    corePositions,
    corridorWidth,
    buildingLength,
    buildingDepth,
    totalUnits,
    coresNeeded,
    unitsPerCore: Math.ceil(totalUnits / coresNeeded),
  };
};

/**
 * Generates a visual grid representation of the floor plan
 * Returns a 2D array where each cell represents a specific area
 *
 * Cell types:
 * - 'STUDIO', 'ONEBR', 'TWOBR', '3BDRM' - Unit types
 * - 'CORR' - Corridor
 * - 'CORE' - Stairs/Elevator core
 * - 'VOID' - Empty space
 *
 * @param {Object} floorPlan - Floor plan from generateFloorPlan()
 * @param {number} gridResolution - Feet per grid cell (default 2)
 * @returns {Array} 2D grid array
 */
export const generateFloorPlanGrid = (floorPlan, gridResolution = 2) => {
  const { buildingLength, buildingDepth, northSide, southSide, corridorWidth, corePositions } = floorPlan;

  // Calculate grid dimensions
  const gridWidth = Math.ceil(buildingLength / gridResolution);
  const gridHeight = Math.ceil(buildingDepth / gridResolution);

  // Initialize grid with void
  const grid = Array(gridHeight)
    .fill(null)
    .map(() => Array(gridWidth).fill('VOID'));

  const corridorStart = Math.floor((buildingDepth / 2 - corridorWidth / 2) / gridResolution);
  const corridorEnd = Math.ceil((buildingDepth / 2 + corridorWidth / 2) / gridResolution);

  // Fill corridor
  for (let y = corridorStart; y < corridorEnd; y++) {
    for (let x = 0; x < gridWidth; x++) {
      grid[y][x] = 'CORR';
    }
  }

  // Helper to get cell type label
  const getCellType = (unitType) => {
    const typeMap = {
      studio: 'STUDIO',
      oneBed: 'ONEBR',
      twoBed: 'TWOBR',
      threeBed: '3BDRM',
    };
    return typeMap[unitType] || 'UNIT';
  };

  // Place north side units
  for (const unit of northSide) {
    const startX = Math.floor(unit.x / gridResolution);
    const endX = Math.ceil((unit.x + unit.width) / gridResolution);
    const startY = 0;
    const endY = corridorStart;

    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX && x < gridWidth; x++) {
        grid[y][x] = getCellType(unit.type);
      }
    }
  }

  // Place south side units
  for (const unit of southSide) {
    const startX = Math.floor(unit.x / gridResolution);
    const endX = Math.ceil((unit.x + unit.width) / gridResolution);
    const startY = corridorEnd;
    const endY = gridHeight;

    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX && x < gridWidth; x++) {
        grid[y][x] = getCellType(unit.type);
      }
    }
  }

  // Place cores
  for (const core of corePositions) {
    const startX = Math.floor(core.x / gridResolution);
    const endX = Math.ceil((core.x + core.width) / gridResolution);
    const coreDepth = CORE_DIMENSIONS.depth / gridResolution;
    const startY = Math.floor((buildingDepth / 2 - coreDepth / 2) / gridResolution);
    const endY = Math.ceil((buildingDepth / 2 + coreDepth / 2) / gridResolution);

    for (let y = startY; y < endY && y < gridHeight; y++) {
      for (let x = startX; x < endX && x < gridWidth; x++) {
        grid[y][x] = 'CORE';
      }
    }
  }

  return grid;
};

/**
 * Calculates efficiency metrics for a floor plan
 *
 * @param {Object} floorPlan - Floor plan object
 * @param {Object} optimized - Optimized unit counts
 * @returns {Object} Efficiency metrics
 */
export const calculateFloorPlanEfficiency = (floorPlan, optimized) => {
  const { buildingLength, buildingDepth, corridorWidth, coresNeeded } = floorPlan;

  // Total building footprint
  const totalFootprint = buildingLength * buildingDepth;

  // Corridor area
  const corridorArea = buildingLength * corridorWidth;

  // Core area
  const coreArea = coresNeeded * CORE_DIMENSIONS.width * CORE_DIMENSIONS.depth;

  // Unit area (approximate)
  const unitArea =
    optimized.studio * UNIT_WIDTHS.studio * UNIT_DEPTHS.studio +
    optimized.oneBed * UNIT_WIDTHS.oneBed * UNIT_DEPTHS.oneBed +
    optimized.twoBed * UNIT_WIDTHS.twoBed * UNIT_DEPTHS.twoBed +
    optimized.threeBed * UNIT_WIDTHS.threeBed * UNIT_DEPTHS.threeBed;

  // Net-to-gross efficiency
  const netToGross = (unitArea / totalFootprint) * 100;

  // Circulation efficiency (lower is better)
  const circulationPct = ((corridorArea + coreArea) / totalFootprint) * 100;

  return {
    totalFootprint,
    unitArea,
    corridorArea,
    coreArea,
    netToGross,
    circulationPct,
    unitsPerCore: Math.ceil((optimized.studio + optimized.oneBed + optimized.twoBed + optimized.threeBed) / coresNeeded),
  };
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  // Constants
  CORRIDOR_WIDTHS,
  UNIT_DEPTHS,
  CORE_DIMENSIONS,
  ADJACENCY_MATRIX,
  PLACEMENT_PREFERENCES,

  // Functions
  calculateCoresNeeded,
  generateFloorPlan,
  generateFloorPlanGrid,
  calculateFloorPlanEfficiency,
};
