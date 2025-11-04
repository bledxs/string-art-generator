// Main string art generation algorithm
import type { StringArtParameters, Path, StringArtResult } from '../types';
import type { ProcessedImage } from './imageProcessor';
import { getBrightness } from './imageProcessor';

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
): StringArtResult {
  const startTime = performance.now();

  // Calculate pin positions in a circle
  const pins = calculatePinPositions(params.pins, image.width);

  // Generate paths using greedy algorithm
  const paths = generatePaths(image, pins, params, onProgress);

  const endTime = performance.now();

  return {
    paths,
    metadata: {
      totalLines: paths.length,
      processingTime: endTime - startTime,
      parameters: params,
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
  const samples = 50; // Sample points along line
  let score = 0;

  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const x = from.x + (to.x - from.x) * t;
    const y = from.y + (to.y - from.y) * t;

    const xi = Math.floor(x);
    const yi = Math.floor(y);

    if (
      yi >= 0 &&
      yi < brightness.length &&
      xi >= 0 &&
      xi < brightness[0].length
    ) {
      score += brightness[yi][xi];
    }
  }

  return score;
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
  const samples = 50;

  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const x = from.x + (to.x - from.x) * t;
    const y = from.y + (to.y - from.y) * t;

    const xi = Math.floor(x);
    const yi = Math.floor(y);

    if (
      yi >= 0 &&
      yi < brightness.length &&
      xi >= 0 &&
      xi < brightness[0].length
    ) {
      brightness[yi][xi] = Math.max(0, brightness[yi][xi] + amount);
    }
  }
}
