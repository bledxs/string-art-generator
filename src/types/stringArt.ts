export interface Point {
  x: number;
  y: number;
}

// Pin es esencialmente un Point, pero podemos darle un tipo nominal si es necesario más adelante.
export type Pin = Point;

export interface Thread {
  startPinIndex: number;
  endPinIndex: number;
}

// Matriz que representa la imagen en escala de grises.
// Cada valor es un número entre 0 (negro) y 255 (blanco).
export type GrayscaleMatrix = number[][];

// Para futuras mejoras con color
export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

// Representa las dimensiones y la posición de una imagen escalada dentro de un contenedor.
export interface ScaledImageDetails {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
}

// Podríamos necesitar más tipos a medida que avanzamos, como para los parámetros de configuración.
export interface StringArtParameters {
  numPins: number;
  numThreads: number;
  threadOpacity: number;
  // Podríamos añadir más aquí, como 'reductionAmount', 'minPinDistance', etc.
}

export type PinPlacementShape = 'circle' | 'square';

export interface StringArtPreset {
  id: string; // Identificador único, p.ej. timestamp o UUID
  name: string; // Nombre dado por el usuario
  numPins: number;
  numThreads: number;
  threadOpacity: number;
  threadWidth: number;
  pinShape?: PinPlacementShape;
}
