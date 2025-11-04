// Image processing utilities for string art generation

export interface ProcessedImage {
  width: number;
  height: number;
  brightness: number[][];
}

/**
 * Convert image URL to ImageBitmap (works in Workers)
 */
export async function loadImage(imageUrl: string): Promise<ImageBitmap> {
  // Convert data URL to Blob
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  // Create ImageBitmap (available in Workers)
  return await createImageBitmap(blob);
}

/**
 * Extract brightness matrix from image
 * Returns 2D array with values 0-255 (0 = black, 255 = white)
 */
export function extractBrightness(
  img: ImageBitmap,
  targetSize = 400,
): ProcessedImage {
  // Create canvas for processing
  const canvas = new OffscreenCanvas(targetSize, targetSize);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');

  // Calculate scaling to fit target size
  const scale = targetSize / Math.max(img.width, img.height);
  const scaledWidth = img.width * scale;
  const scaledHeight = img.height * scale;
  const offsetX = (targetSize - scaledWidth) / 2;
  const offsetY = (targetSize - scaledHeight) / 2;

  // Draw image centered and scaled
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, targetSize, targetSize);
  ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);

  // Get pixel data
  const imageData = ctx.getImageData(0, 0, targetSize, targetSize);
  const pixels = imageData.data;

  // Convert to brightness matrix
  const brightness: number[][] = [];
  for (let y = 0; y < targetSize; y++) {
    brightness[y] = [];
    for (let x = 0; x < targetSize; x++) {
      const i = (y * targetSize + x) * 4;
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];

      // Calculate perceived brightness (grayscale)
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      brightness[y][x] = gray;
    }
  }

  return {
    width: targetSize,
    height: targetSize,
    brightness,
  };
}

/**
 * Get brightness value at specific coordinates (with bounds checking)
 */
export function getBrightness(
  image: ProcessedImage,
  x: number,
  y: number,
): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);

  if (xi < 0 || xi >= image.width || yi < 0 || yi >= image.height) {
    return 255; // White outside bounds
  }

  return image.brightness[yi][xi];
}
