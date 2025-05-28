import type { Area } from 'react-easy-crop';
import type {
  GrayscaleMatrix,
  Point,
  ScaledImageDetails,
} from '../types/stringArt';

const TEMP_CANVAS_SIZE_WARNING_THRESHOLD = 3000 * 3000; // Umbral para advertir sobre canvas temporal grande

/**
 * Calcula las dimensiones y offsets para escalar una imagen manteniendo su aspect ratio
 * para que quepa dentro de un contenedor (targetWidth, targetHeight).
 * La imagen se centrará en el contenedor.
 */
export function calculateScaledImageDetails(
  imageWidth: number,
  imageHeight: number,
  targetWidth: number,
  targetHeight: number,
): ScaledImageDetails {
  const scale = Math.min(targetWidth / imageWidth, targetHeight / imageHeight);
  const scaledWidth = imageWidth * scale;
  const scaledHeight = imageHeight * scale;
  const offsetX = (targetWidth - scaledWidth) / 2;
  const offsetY = (targetHeight - scaledHeight) / 2;

  return {
    width: Math.round(scaledWidth),
    height: Math.round(scaledHeight),
    offsetX: Math.round(offsetX),
    offsetY: Math.round(offsetY),
  };
}

/**
 * Carga una imagen desde una URL, la dibuja escalada en un canvas temporal
 * y devuelve el objeto ImageData.
 * @param imageUrl URL de la imagen.
 * @param targetCanvasWidth Ancho deseado del canvas donde se procesará la imagen.
 * @param targetCanvasHeight Alto deseado del canvas donde se procesará la imagen.
 * @returns Una promesa que resuelve a ImageData o null si hay un error.
 */
export async function loadImageDataFromUrl(
  imageUrl: string,
  targetCanvasWidth: number,
  targetCanvasHeight: number,
): Promise<{ imageData: ImageData; scaledDetails: ScaledImageDetails }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const scaledDetails = calculateScaledImageDetails(
        img.width,
        img.height,
        targetCanvasWidth,
        targetCanvasHeight,
      );

      if (
        targetCanvasWidth * targetCanvasHeight >
        TEMP_CANVAS_SIZE_WARNING_THRESHOLD
      ) {
        console.warn(
          `Creando canvas temporal de procesamiento de ${targetCanvasWidth}x${targetCanvasHeight}. Esto podría consumir mucha memoria.`,
        );
      }

      const canvas = document.createElement('canvas');
      canvas.width = targetCanvasWidth;
      canvas.height = targetCanvasHeight;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      if (!ctx) {
        const error = new Error(
          'No se pudo obtener el contexto 2D del canvas temporal.',
        );
        console.error(error.message);
        reject(error);
        return;
      }

      ctx.drawImage(
        img,
        scaledDetails.offsetX,
        scaledDetails.offsetY,
        scaledDetails.width,
        scaledDetails.height,
      );
      const imageData = ctx.getImageData(
        0,
        0,
        targetCanvasWidth,
        targetCanvasHeight,
      );
      resolve({ imageData, scaledDetails });
    };
    img.onerror = (event) => {
      const errorMessage =
        typeof event === 'string'
          ? event
          : event.type || 'Error desconocido al cargar imagen';
      const error = new Error(`Error al cargar la imagen: ${errorMessage}`);
      console.error(error.message, event);
      reject(error);
    };
    img.src = imageUrl;
  });
}

/**
 * Convierte un objeto ImageData a una matriz 2D de valores de escala de grises.
 * @param imageData El objeto ImageData a convertir.
 * @returns Una GrayscaleMatrix.
 */
export function convertToGrayscaleMatrix(
  imageData: ImageData,
): GrayscaleMatrix {
  const { data, width, height } = imageData;
  const matrix: GrayscaleMatrix = [];

  for (let y = 0; y < height; y++) {
    const row: number[] = [];
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      // Fórmula de luminancia estándar (perceptual)
      const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
      row.push(gray);
    }
    matrix.push(row);
  }
  return matrix;
}

/**
 * Obtiene el valor de escala de grises de un píxel específico en la matriz.
 * Devuelve undefined si las coordenadas están fuera de los límites.
 * @param matrix La GrayscaleMatrix.
 * @param p El Point (coordenadas x, y) del píxel.
 * @returns El valor de escala de grises (0-255) o undefined.
 */
export function getPixelGrayscaleValue(
  matrix: GrayscaleMatrix,
  p: Point,
): number | undefined {
  const y = Math.round(p.y);
  const x = Math.round(p.x);
  if (y >= 0 && y < matrix.length && x >= 0 && x < matrix[y].length) {
    return matrix[y][x];
  }
  return undefined;
}

/**
 * Crea un ImageData a partir de una sección recortada de una imagen fuente.
 * @param imageSrc URL de la imagen original (puede ser un objectURL).
 * @param pixelCrop El área de recorte en píxeles de la imagen original.
 * @returns Una promesa que resuelve a ImageData de la porción recortada, o null si hay error.
 */
export async function getCroppedImageData(
  imageSrc: string,
  pixelCrop: Area,
): Promise<ImageData | null> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      if (!ctx) {
        console.error('No se pudo obtener contexto 2D para recortar imagen.');
        reject(new Error('Error de contexto de canvas en recorte.'));
        return;
      }

      ctx.drawImage(
        image,
        pixelCrop.x, // Coordenada X del inicio del recorte en la imagen original
        pixelCrop.y, // Coordenada Y del inicio del recorte en la imagen original
        pixelCrop.width, // Ancho de la sección a recortar de la imagen original
        pixelCrop.height, // Alto de la sección a recortar de la imagen original
        0, // Coordenada X donde dibujar en el canvas de destino (el canvas recortado)
        0, // Coordenada Y donde dibujar en el canvas de destino
        pixelCrop.width, // Ancho con el que dibujar en el canvas de destino
        pixelCrop.height, // Alto con el que dibujar en el canvas de destino
      );

      resolve(ctx.getImageData(0, 0, pixelCrop.width, pixelCrop.height));
    };
    image.onerror = (error) => {
      console.error('Error al cargar imagen para recorte:', error);
      reject(new Error('Fallo al cargar imagen fuente para recorte.'));
    };
    image.src = imageSrc;
  });
}

// La función loadImageDataFromUrl que tenías antes se usaba para cargar la imagen COMPLETA
// y escalarla. Ahora, el flujo será:
// 1. Cargar imagen original (URL con ImageLoader).
// 2. Usuario recorta -> obtenemos pixelCrop.
// 3. Usamos getCroppedImageData(originalURL, pixelCrop) -> obtenemos croppedImageData.
// 4. Ahora, necesitamos una URL para el StringArtCanvas (PREVISUALIZACIÓN DE IMAGEN RECORTADA)
//    y también necesitamos escalar esta croppedImageData para el TARGET_CANVAS_WIDTH/HEIGHT
//    y generar la grayscaleMatrix.

/**
 * Procesa una imagen recortada: la escala, genera su URL de previsualización y su matriz de grises.
 * @param croppedImageData ImageData de la imagen ya recortada.
 * @param targetCanvasWidth Ancho del canvas de destino del string art.
 * @param targetCanvasHeight Alto del canvas de destino del string art.
 * @returns Objeto con grayscaleMatrix, scaledDetails para la imagen recortada, y una previewUrl de la imagen recortada.
 */
export async function processCroppedImageForStringArt(
  croppedImageData: ImageData,
  targetCanvasWidth: number,
  targetCanvasHeight: number,
): Promise<{
  grayscaleMatrix: GrayscaleMatrix;
  scaledDetails: ScaledImageDetails;
  previewUrl: string; // URL de la imagen recortada y escalada para previsualización
} | null> {
  try {
    // Calcular cómo la imagen recortada (con sus dimensiones originales de recorte)
    // se escalará para caber en el canvas de string art.
    const details = calculateScaledImageDetails(
      croppedImageData.width,
      croppedImageData.height,
      targetCanvasWidth,
      targetCanvasHeight,
    );

    // Crear un canvas temporal para dibujar la imagen recortada y escalada,
    // y de ahí obtener su URL para previsualización y la matriz de grises.
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = targetCanvasWidth;
    tempCanvas.height = targetCanvasHeight;
    const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });

    if (!tempCtx) {
      console.error(
        'No se pudo obtener contexto para procesar imagen recortada.',
      );
      return null;
    }

    // Dibujar la croppedImageData escalada en el canvas temporal
    // Para esto, necesitamos primero poner la croppedImageData en un canvas, luego dibujar ese canvas escalado.
    const sourceCanvas = document.createElement('canvas');
    sourceCanvas.width = croppedImageData.width;
    sourceCanvas.height = croppedImageData.height;
    const sourceCtx = sourceCanvas.getContext('2d');
    if (!sourceCtx) return null;
    sourceCtx.putImageData(croppedImageData, 0, 0);

    // Dibujar el sourceCanvas (que contiene la imagen recortada original) escalado en tempCanvas
    tempCtx.drawImage(
      sourceCanvas,
      details.offsetX,
      details.offsetY,
      details.width,
      details.height,
    );

    const finalImageDataForGrayscale = tempCtx.getImageData(
      0,
      0,
      targetCanvasWidth,
      targetCanvasHeight,
    );
    const matrix = convertToGrayscaleMatrix(finalImageDataForGrayscale);
    const previewUrl = tempCanvas.toDataURL(); // URL de la imagen recortada y escalada

    return {
      grayscaleMatrix: matrix,
      scaledDetails: details, // Estos detalles son cómo la imagen recortada se ajusta al canvas final
      previewUrl: previewUrl,
    };
  } catch (error) {
    console.error('Error procesando imagen recortada:', error);
    return null;
  }
}
