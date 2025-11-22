// Main string art generation algorithm
import type { StringArtParameters, Path, StringArtResult } from '../types';
import type { ProcessedImage } from './imageProcessor';
import { optimizePaths } from './pathOptimizer';

interface PinPosition {
  x: number;
  y: number;
}

/**
 * Generate string art from processed image
 */
export function generateStringArt(
  image: ProcessedImage,
  params: StringArtParameters,
  onProgress?: (progress: number) => void,
  onPartialPaths?: (paths: Path[]) => void,
): StringArtResult {
  const startTime = performance.now();

  // Calculate pin positions in a circle
  const pins = calculatePinPositions(params.pins, image.width);

  // Generate paths using greedy algorithm (70% of progress)
  const rawPaths = generatePaths(
    image,
    pins,
    params,
    (p) => {
      if (onProgress) onProgress(p * 0.7);
    },
    onPartialPaths,
  );

  // Optimize paths (30% of progress)
  if (onProgress) onProgress(70);
  const optimizationResult = optimizePaths(rawPaths, params.pins, (p) => {
    if (onProgress) onProgress(70 + p * 0.3);
  });

  const endTime = performance.now();

  return {
    paths: optimizationResult.paths,
    metadata: {
      totalLines: optimizationResult.paths.length,
      processingTime: endTime - startTime,
      parameters: params,
      optimization: optimizationResult.metrics,
    },
  };
}

/**
 * Calculate pin positions around a circle
 */
function calculatePinPositions(pinCount: number, size: number): PinPosition[] {
  const center = size / 2;
  const radius = size / 2 - 10; // Margin from edge

  return Array.from({ length: pinCount }, (_, i) => {
    const angle = (i * 2 * Math.PI) / pinCount;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  });
}

/**
 * Generate paths using greedy algorithm
 * Connects pins by selecting the line that covers the darkest pixels
 */
function generatePaths(
  image: ProcessedImage,
  pins: PinPosition[],
  params: StringArtParameters,
  onProgress?: (progress: number) => void,
  onPartialPaths?: (paths: Path[]) => void,
): Path[] {
  const paths: Path[] = [];
  const minDistance = Math.floor(pins.length * 0.1); // Skip nearby pins
  let currentPin = 0;

  // Create mutable brightness map (darkens as lines are drawn)
  const brightness = image.brightness.map((row) => [...row]);

  for (let i = 0; i < params.lines; i++) {
    // Report progress every 100 lines
    if (i % 100 === 0 && onProgress) {
      onProgress((i / params.lines) * 100);
    }

    // Send partial paths every 50 lines for progressive rendering
    if (i % 50 === 0 && onPartialPaths && paths.length > 0) {
      onPartialPaths([...paths]); // Send copy of current paths
    }

    let bestPin = -1;
    let bestScore = Infinity;

    // Find next pin that creates darkest line
    for (let nextPin = 0; nextPin < pins.length; nextPin++) {
      // Skip same pin and nearby pins
      const distance = Math.abs(nextPin - currentPin);
      const wrapDistance = pins.length - distance;
      if (Math.min(distance, wrapDistance) < minDistance) {
        continue;
      }

      // Calculate line score (lower = darker)
      const score = calculateLineScore(
        pins[currentPin],
        pins[nextPin],
        brightness,
      );

      if (score < bestScore) {
        bestScore = score;
        bestPin = nextPin;
      }
    }

    // No valid pin found
    if (bestPin === -1) break;

    // Add path
    paths.push({
      from: currentPin,
      to: bestPin,
      weight: params.lineWeight,
    });

    // Darken pixels along this line
    darkenLine(
      pins[currentPin],
      pins[bestPin],
      brightness,
      params.lineOpacity * 50, // Adjust darkness impact
    );

    currentPin = bestPin;
  }

  return paths;
}

/**
 * Calculate score for a line (sum of brightness along line)
 * Lower score = darker line = better match
 */
function calculateLineScore(
  from: PinPosition,
  to: PinPosition,
  brightness: number[][],
): number {
  let score = 0;
  let count = 0;

  // Use Bresenham-like stepping to sample every pixel
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const steps = Math.ceil(distance);

  if (steps === 0) return Infinity; // Same point

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = Math.floor(from.x + dx * t);
    const y = Math.floor(from.y + dy * t);

    if (y >= 0 && y < brightness.length && x >= 0 && x < brightness[0].length) {
      score += brightness[y][x];
      count++;
    }
  }

  // Normalize score by length to prefer darker average, not just shorter lines
  // However, standard greedy often just sums.
  // If we normalize, we might pick very short dark lines over long dark lines.
  // But usually we want to cover dark areas.
  // Let's stick to sum, but maybe we should penalize length slightly?
  // The original code just summed.
  return count > 0 ? score / count : Infinity;
}

/**
 * Darken pixels along a line (simulate string being placed)
 */
function darkenLine(
  from: PinPosition,
  to: PinPosition,
  brightness: number[][],
  amount: number,
): void {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const steps = Math.ceil(distance);

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = Math.floor(from.x + dx * t);
    const y = Math.floor(from.y + dy * t);

    if (y >= 0 && y < brightness.length && x >= 0 && x < brightness[0].length) {
      // Cap at 255 (white)
      brightness[y][x] = Math.min(255, brightness[y][x] + amount);
    }
  }
}
