import { useMemo } from 'react';

// Base constants
const BASE_SITE = 21567408;
const BASE_GC = 8088967;
const BASE_FAB = 16040830;
const GSF_BASE = 78336;
const BOISE_FACTOR = 0.87;

export const useCalculations = (projectData) => {
  return useMemo(() => {
    const { targets, floors, targetLength, propertyFactor, factoryFactor } = projectData;

    // Calculate total units
    const totalTargetUnits =
      (targets.studio || 0) +
      (targets.oneBed || 0) +
      (targets.twoBed || 0) +
      (targets.threeBed || 0);

    // Unit optimization logic (simplified version)
    const optimizeUnits = () => {
      // This is a simplified version - full logic would be more complex
      return {
        studio: targets.studio || 0,
        oneBed: targets.oneBed || 0,
        twoBed: targets.twoBed || 0,
        threeBed: targets.threeBed || 0,
      };
    };

    const optimized = optimizeUnits();
    const totalOptimized =
      optimized.studio + optimized.oneBed + optimized.twoBed + optimized.threeBed;

    // Calculate costs
    const unitRatio = totalOptimized / 120;
    const floorMultiplier = floors / 5;
    const totalGSF = GSF_BASE * floorMultiplier * unitRatio;

    const siteCost = BASE_SITE * propertyFactor * unitRatio * floorMultiplier;
    const modularCost =
      BASE_GC * propertyFactor * unitRatio * floorMultiplier +
      BASE_FAB * factoryFactor * unitRatio * floorMultiplier;

    const savings = siteCost - modularCost;
    const savingsPercent = (savings / siteCost) * 100;
    const isSavings = savings > 0;

    const siteCostPerSF = siteCost / totalGSF;
    const modularCostPerSF = modularCost / totalGSF;
    const siteCostPerUnit = siteCost / totalOptimized;
    const modularCostPerUnit = modularCost / totalOptimized;

    // Time calculations
    const siteBuildTimeMonths = 18;
    const modularBuildTimeMonths = 11;
    const timeSavings = siteBuildTimeMonths - modularBuildTimeMonths;

    // Required length calculation (simplified)
    const requiredLength = targetLength; // Would need full optimization logic

    return {
      totalTargetUnits,
      optimized,
      totalOptimized,
      totalGSF,
      siteCost,
      modularCost,
      savings,
      savingsPercent,
      isSavings,
      siteCostPerSF,
      modularCostPerSF,
      siteCostPerUnit,
      modularCostPerUnit,
      siteBuildTimeMonths,
      modularBuildTimeMonths,
      timeSavings,
      requiredLength,
      unitRatio,
      floorMultiplier,
    };
  }, [projectData]);
};

// Utility functions
export const formatCurrency = (amount) => {
  return '$' + Math.round(amount).toLocaleString();
};

export const formatMega = (amount) => {
  return '$' + (amount / 1000000).toFixed(1) + 'M';
};

export const formatTime = (months) => {
  return months + ' mo';
};
