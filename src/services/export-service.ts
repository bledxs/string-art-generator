import type { Thread, Pin } from '../types/string-art';

export class ExportService {
  static exportImage(canvasRef: HTMLCanvasElement): void {
    const dataUrl = canvasRef.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'string-art.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  static exportSequence(threads: Thread[], pins: Pin[]): void {
    const sequenceData = threads.map((thread) => {
      const startPinCoords = pins[thread.startPinIndex];
      const endPinCoords = pins[thread.endPinIndex];
      return {
        startPinIndex: thread.startPinIndex,
        endPinIndex: thread.endPinIndex,
        startCoords: startPinCoords || null,
        endCoords: endPinCoords || null,
      };
    });

    const jsonString = JSON.stringify(sequenceData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    this.downloadBlob(blob, 'string_art_sequence.json');
  }

  static exportInstructions(threads: Thread[], totalPins: number): void {
    let instructions = `Instrucciones para String Art\n\n`;
    instructions += `Total de Puntillas: ${totalPins}\n`;
    instructions += `Total de Hilos: ${threads.length}\n`;
    instructions += `--------------------------------------------------\n\n`;

    if (threads.length > 0) {
      const firstThread = threads[0];
      instructions += `Paso 1: Conectar Puntilla ${
        firstThread.startPinIndex + 1
      } con Puntilla ${firstThread.endPinIndex + 1}\n`;

      for (let i = 1; i < threads.length; i++) {
        const currentThread = threads[i];
        instructions += `Paso ${i + 1}: Desde Puntilla ${
          currentThread.startPinIndex + 1
        }, conectar con Puntilla ${currentThread.endPinIndex + 1}\n`;
      }
    }

    instructions += `\nNota: Las puntillas están numeradas del 1 al ${totalPins}.\n`;
    instructions += `El final de un hilo es el punto de inicio para el siguiente hilo.\n`;

    const blob = new Blob([instructions], { type: 'text/plain;charset=utf-8' });
    this.downloadBlob(blob, 'string_art_instrucciones.txt');
  }

  private static downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
