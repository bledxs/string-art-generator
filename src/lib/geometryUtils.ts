import type { Point, Pin, PinPlacementShape } from '../types/stringArt';

/**
 * Calcula las posiciones de las puntillas (pins) distribuidas equitativamente en un círculo.
 * @param numPins Número total de puntillas.
 * @param canvasWidth Ancho del lienzo.
 * @param canvasHeight Alto del lienzo.
 * @param radiusMultiplier Factor para ajustar el radio (ej. 0.95 para un pequeño margen).
 * @returns Un array de objetos Point que representan las posiciones de las puntillas.
 */
function calculateCirclePinPositions(
  numPins: number,
  canvasWidth: number,
  canvasHeight: number,
  radiusMultiplier: number = 0.98, // Mantenemos el default
): Pin[] {
  const pins: Pin[] = [];
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  const radius = Math.min(centerX, centerY) * radiusMultiplier;

  if (numPins <= 0) return [];

  for (let i = 0; i < numPins; i++) {
    const angle = (i / numPins) * 2 * Math.PI;
    const x = Math.round(centerX + radius * Math.cos(angle));
    const y = Math.round(centerY + radius * Math.sin(angle));
    pins.push({ x, y });
  }
  return pins;
}

/**
 * Calcula las posiciones de las puntillas (pins) distribuidas en un cuadrado centrado.
 * @param numPins Número total de puntillas.
 * @param canvasWidth Ancho del lienzo.
 * @param canvasHeight Alto del lienzo.
 * @param sizeMultiplier Factor para ajustar el tamaño del cuadrado (ej. 0.9 para un pequeño margen).
 * @returns Un array de objetos Pin que representan las posiciones de las puntillas.
 */

function calculateSquarePinPositions(
  numPins: number,
  canvasWidth: number,
  canvasHeight: number,
  sizeMultiplier: number = 0.9, // Para que el cuadrado no toque los bordes exactos
): Pin[] {
  const pins: Pin[] = [];
  if (numPins < 4 && numPins > 0) {
    // Necesitamos al menos 4 para un cuadrado, o manejarlo diferente
    console.warn(
      'Se necesitan al menos 4 puntillas para un cuadrado. Se usarán 4.',
    );
    // Podríamos forzar numPins a 4 o distribuir como podamos.
    // Por ahora, si es < 4 pero > 0, las pondremos en las esquinas si es posible.
    // Esta lógica se puede refinar mucho.
  }
  if (numPins <= 0) return [];

  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  const boardSize = Math.min(canvasWidth, canvasHeight);
  const sideLength = boardSize * sizeMultiplier;
  const halfSide = sideLength / 2;

  const xMin = centerX - halfSide;
  const xMax = centerX + halfSide;
  const yMin = centerY - halfSide;
  const yMax = centerY + halfSide;

  const perimeter = sideLength * 4;
  if (perimeter === 0) return [];

  // Distribuir puntillas a lo largo del perímetro.
  // Esta es una forma simple. Se puede mejorar para asegurar puntillas en las esquinas.
  const spacing = perimeter / numPins;
  let currentPerimeterPos = 0;

  for (let i = 0; i < numPins; i++) {
    let x = 0,
      y = 0;

    if (currentPerimeterPos < sideLength) {
      // Borde superior (de izq a der)
      x = xMin + currentPerimeterPos;
      y = yMin;
    } else if (currentPerimeterPos < sideLength * 2) {
      // Borde derecho (de arriba a abajo)
      x = xMax;
      y = yMin + (currentPerimeterPos - sideLength);
    } else if (currentPerimeterPos < sideLength * 3) {
      // Borde inferior (de der a izq)
      x = xMax - (currentPerimeterPos - sideLength * 2);
      y = yMax;
    } else {
      // Borde izquierdo (de abajo a arriba)
      x = xMin;
      y = yMax - (currentPerimeterPos - sideLength * 3);
    }
    pins.push({ x: Math.round(x), y: Math.round(y) });
    currentPerimeterPos += spacing;
  }
  return pins;
}

/**
 * Obtiene todos los píxeles que forman una línea entre dos puntos usando el algoritmo de Bresenham.
 * @param p1 Punto de inicio de la línea.
 * @param p2 Punto final de la línea.
 * @returns Un array de objetos Point que representan los píxeles de la línea.
 */
export function getLinePixels(p1: Point, p2: Point): Point[] {
  const pixels: Point[] = [];
  let x0 = Math.round(p1.x);
  let y0 = Math.round(p1.y);
  const x1 = Math.round(p2.x);
  const y1 = Math.round(p2.y);

  const dx = Math.abs(x1 - x0);
  const dy = -Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;
  let e2: number;

  while (true) {
    pixels.push({ x: x0, y: y0 });
    if (x0 === x1 && y0 === y1) break;
    e2 = 2 * err;
    if (e2 >= dy) {
      if (x0 === x1) break;
      err += dy;
      x0 += sx;
    }
    if (e2 <= dx) {
      if (y0 === y1) break;
      err += dx;
      y0 += sy;
    }
  }
  return pixels;
}

/**
 * Obtiene las posiciones de las puntillas (pins) según la forma especificada.
 * @param shape Forma de colocación de las puntillas ('circle' o 'square').
 * @param numPins Número total de puntillas.
 * @param canvasWidth Ancho del lienzo.
 * @param canvasHeight Alto del lienzo.
 * @param options Opciones adicionales para ajustar el radio o tamaño de las puntillas.
 * @return Un array de objetos Pin que representan las posiciones de las puntillas.
 */

export function getPinPositions(
  shape: PinPlacementShape,
  numPins: number,
  canvasWidth: number,
  canvasHeight: number,
  // Podríamos pasar opciones específicas de forma aquí si es necesario
  options?: { radiusMultiplier?: number; sizeMultiplier?: number },
): Pin[] {
  switch (shape) {
    case 'square':
      return calculateSquarePinPositions(
        numPins,
        canvasWidth,
        canvasHeight,
        options?.sizeMultiplier,
      );
    case 'circle':
    default: // Círculo por defecto
      return calculateCirclePinPositions(
        numPins,
        canvasWidth,
        canvasHeight,
        options?.radiusMultiplier,
      );
  }
}
