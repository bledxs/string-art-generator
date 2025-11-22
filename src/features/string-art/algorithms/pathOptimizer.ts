// Path optimization algorithms for string art
import type { Path } from '../types';

/**
 * Optimization result with metrics
 */
export interface OptimizationResult {
  paths: Path[];
  metrics: {
    originalCrossings: number;
    optimizedCrossings: number;
    crossingsReduced: number;
    pathsSimplified: number;
    processingTime: number;
  };
}

/**
 * Main path optimizer - applies multiple optimization strategies
 */
export function optimizePaths(
  paths: Path[],
  pinCount: number,
  onProgress?: (progress: number) => void,
): OptimizationResult {
  const startTime = performance.now();

  // Track original metrics
  // Disabled expensive O(N^2) calculation for performance
  const originalCrossings = -1;

  let optimizedPaths = [...paths];

  // Step 1: Remove redundant consecutive paths (10% of work)
  if (onProgress) onProgress(0);
  optimizedPaths = removeRedundantPaths(optimizedPaths);
  if (onProgress) onProgress(10);

  // Step 2: Reduce crossings using local swap optimization (60% of work)
  if (onProgress) onProgress(10);
  optimizedPaths = reduceCrossings(optimizedPaths, pinCount, (p) => {
    if (onProgress) onProgress(10 + p * 0.6);
  });
  if (onProgress) onProgress(70);

  // Step 3: Smooth transitions between distant pins (30% of work)
  if (onProgress) onProgress(70);
  optimizedPaths = smoothTransitions(optimizedPaths, pinCount, (p) => {
    if (onProgress) onProgress(70 + p * 0.3);
  });
  if (onProgress) onProgress(100);

  // Disabled expensive O(N^2) calculation for performance
  const optimizedCrossings = -1;
  const endTime = performance.now();

  return {
    paths: optimizedPaths,
    metrics: {
      originalCrossings,
      optimizedCrossings,
      crossingsReduced: 0,
      pathsSimplified: paths.length - optimizedPaths.length,
      processingTime: endTime - startTime,
    },
  };
}

/**
 * Remove redundant consecutive paths (e.g., A→B followed by B→A)
 */
function removeRedundantPaths(paths: Path[]): Path[] {
  const filtered: Path[] = [];

  for (let i = 0; i < paths.length; i++) {
    const current = paths[i];
    const next = paths[i + 1];

    // Skip if next path is reverse of current
    if (next && current.from === next.to && current.to === next.from) {
      i++; // Skip both paths
      continue;
    }

    filtered.push(current);
  }

  return filtered;
}

/**
 * Reduce crossings using local swap optimization
 * Try swapping adjacent paths to see if it reduces crossings
 */
function reduceCrossings(
  paths: Path[],
  pinCount: number,
  onProgress?: (progress: number) => void,
): Path[] {
  const optimized = [...paths];
  const maxIterations = 3; // Multiple passes for better results
  let improved = true;
  let iteration = 0;

  while (improved && iteration < maxIterations) {
    improved = false;
    iteration++;

    for (let i = 0; i < optimized.length - 1; i++) {
      // Report progress
      if (i % 100 === 0 && onProgress) {
        onProgress((i / optimized.length) * (1 / maxIterations));
      }

      const path1 = optimized[i];
      const path2 = optimized[i + 1];

      // Check if swapping these paths reduces crossings
      if (shouldSwapPaths(path1, path2, pinCount)) {
        // Swap paths
        optimized[i] = path2;
        optimized[i + 1] = path1;
        improved = true;
      }
    }
  }

  return optimized;
}

/**
 * Determine if swapping two consecutive paths reduces crossings
 */
function shouldSwapPaths(path1: Path, path2: Path, pinCount: number): boolean {
  // Calculate crossing penalty for current order
  const currentPenalty = getCrossingPenalty(path1, path2, pinCount);

  // Calculate crossing penalty if swapped
  const swappedPenalty = getCrossingPenalty(path2, path1, pinCount);

  return swappedPenalty < currentPenalty;
}

/**
 * Calculate a penalty score based on how much two paths cross
 * Lower score = better (less crossing)
 */
function getCrossingPenalty(
  path1: Path,
  path2: Path,
  pinCount: number,
): number {
  // Check if paths actually cross
  if (!pathsCross(path1, path2, pinCount)) {
    return 0;
  }

  // Calculate angular separation between paths
  const separation = getAngularSeparation(path1, path2, pinCount);

  // Penalize crossings more when paths are perpendicular (90 degrees)
  // Less penalty for parallel or nearly parallel paths
  return Math.abs(separation - Math.PI / 2) * 10;
}

/**
 * Check if two paths cross each other
 */
function pathsCross(path1: Path, path2: Path, pinCount: number): boolean {
  // Paths share a pin - no crossing
  if (
    path1.from === path2.from ||
    path1.from === path2.to ||
    path1.to === path2.from ||
    path1.to === path2.to
  ) {
    return false;
  }

  // Convert pin indices to angles
  const a1 = (path1.from * 2 * Math.PI) / pinCount;
  const a2 = (path1.to * 2 * Math.PI) / pinCount;
  const b1 = (path2.from * 2 * Math.PI) / pinCount;
  const b2 = (path2.to * 2 * Math.PI) / pinCount;

  // Normalize angles to [0, 2π]
  const normalize = (angle: number) =>
    ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

  const [min1, max1] = [normalize(a1), normalize(a2)].sort((x, y) => x - y);
  const [min2, max2] = [normalize(b1), normalize(b2)].sort((x, y) => x - y);

  // Check if arcs intersect (simplified circle intersection test)
  return (min2 > min1 && min2 < max1) !== (max2 > min1 && max2 < max1);
}

/**
 * Calculate angular separation between two paths
 */
function getAngularSeparation(
  path1: Path,
  path2: Path,
  pinCount: number,
): number {
  // Get midpoint angles of both paths
  const mid1 = ((path1.from + path1.to) / 2) * ((2 * Math.PI) / pinCount);
  const mid2 = ((path2.from + path2.to) / 2) * ((2 * Math.PI) / pinCount);

  // Calculate smallest angular distance
  let diff = Math.abs(mid1 - mid2);
  if (diff > Math.PI) {
    diff = 2 * Math.PI - diff;
  }

  return diff;
}

/**
 * Smooth transitions between distant pins by inserting intermediate paths
 * This reduces visual "jumps" in the string art
 */
function smoothTransitions(
  paths: Path[],
  pinCount: number,
  onProgress?: (progress: number) => void,
): Path[] {
  const smoothed: Path[] = [];
  const maxJump = Math.floor(pinCount * 0.3); // Threshold for "large jump"

  for (let i = 0; i < paths.length; i++) {
    if (i % 100 === 0 && onProgress) {
      onProgress(i / paths.length);
    }

    const current = paths[i];
    smoothed.push(current);

    // Check if next path has a large jump
    if (i < paths.length - 1) {
      const next = paths[i + 1];
      const jump = getMinPinDistance(current.to, next.from, pinCount);

      // If jump is large, consider adding intermediate path
      if (jump > maxJump && shouldAddIntermediate(current, next, pinCount)) {
        // Find optimal intermediate pin
        const intermediatePin = findIntermediatePin(
          current.to,
          next.from,
          pinCount,
        );

        if (intermediatePin !== -1) {
          smoothed.push({
            from: current.to,
            to: intermediatePin,
            weight: current.weight,
          });
        }
      }
    }
  }

  return smoothed;
}

/**
 * Calculate minimum distance between two pins (considering wrap-around)
 */
function getMinPinDistance(
  pin1: number,
  pin2: number,
  pinCount: number,
): number {
  const distance = Math.abs(pin1 - pin2);
  const wrapDistance = pinCount - distance;
  return Math.min(distance, wrapDistance);
}

/**
 * Determine if an intermediate path should be added
 */
function shouldAddIntermediate(
  path1: Path,
  path2: Path,
  pinCount: number,
): boolean {
  // Don't add intermediate if paths are already connected
  if (path1.to === path2.from) {
    return false;
  }

  // Don't add if it would create too much density
  const jump = getMinPinDistance(path1.to, path2.from, pinCount);
  return jump > pinCount * 0.25;
}

/**
 * Find optimal intermediate pin between two pins
 */
function findIntermediatePin(
  from: number,
  to: number,
  pinCount: number,
): number {
  // Calculate midpoint pin
  const distance = Math.abs(to - from);
  const wrapDistance = pinCount - distance;

  if (distance <= wrapDistance) {
    // Direct path is shorter
    return Math.floor((from + to) / 2);
  } else {
    // Wrap-around path is shorter
    const mid = (from + to + pinCount) / 2;
    return Math.floor(mid % pinCount);
  }
}

/**
 * Count total crossings in path set (for metrics)
 */
function countCrossings(paths: Path[], pinCount: number): number {
  let count = 0;

  for (let i = 0; i < paths.length; i++) {
    for (let j = i + 1; j < paths.length; j++) {
      if (pathsCross(paths[i], paths[j], pinCount)) {
        count++;
      }
    }
  }

  return count;
}

/**
 * Fast path optimizer for real-time preview (skips expensive operations)
 */
export function quickOptimize(paths: Path[]): Path[] {
  // Only remove redundant paths for quick preview
  return removeRedundantPaths(paths);
}
