export interface Point {
  x: number;
  y: number;
}

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

export interface StringArtParameters {
  numPins: number;
  numThreads: number;
  threadOpacity: number;
}

export type PinPlacementShape = 'circle' | 'square';

export interface StringArtPreset {
  id: string;
  name: string;
  numPins: number;
  numThreads: number;
  threadOpacity: number;
  threadWidth: number;
  pinShape?: PinPlacementShape;
}
