'use client';

import { ChevronDown, Download, FileJson, FileText, Image } from 'lucide-react';
import React, { useRef } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useStringArtContext } from '@/context/string-art-context';
import { ExportService } from '@/services/export-service';

export function ExportPanel() {
  const { managers, state, canvasProps } = useStringArtContext();
  const { parametersManager, errorManager } = managers;
  const { isGenerating } = state;

  const { pinShape } = parametersManager.config;

  const { threadsToDraw: generatedThreads, actualPins: pins } = canvasProps;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const hasValidData = generatedThreads && generatedThreads.length > 0;
  const canExport = !isGenerating && hasValidData;

  const handleExportImage = () => {
    const canvas =
      canvasRef.current ||
      document.querySelector('canvas[data-string-art-canvas]');

    if (!canvas) {
      errorManager.showError(
        'No se pudo acceder al canvas para exportar la imagen.',
      );
      toast.error('Error de Exportación', {
        description: 'No se pudo acceder al canvas para exportar la imagen.',
      });

      return;
    }

    try {
      ExportService.exportImage(canvas as HTMLCanvasElement);
      // 🆕 Mostrar éxito usando el error manager (podríamos crear un success manager)
      toast.success('Imagen Exportada', {
        description: 'La imagen se ha descargado exitosamente.',
      });
    } catch (error) {
      errorManager.showError('Error al exportar la imagen.');
      toast.error('Error de Exportación', {
        description: 'Error al exportar la imagen.',
      });
    }
  };

  const handleExportSequence = () => {
    if (!generatedThreads || !pins) {
      errorManager.showError(
        'No hay datos suficientes para exportar la secuencia.',
      );
      toast.error('Datos Insuficientes', {
        description: 'No hay datos suficientes para exportar la secuencia.',
      });

      return;
    }

    try {
      ExportService.exportSequence(generatedThreads, pins);
      toast.success('Secuencia Exportada', {
        description: 'El archivo JSON se ha descargado exitosamente.',
      });
    } catch (error) {
      errorManager.showError('Error al exportar la secuencia.');
      toast.error('Error de Exportación', {
        description: 'Error al exportar la secuencia.',
      });
    }
  };

  const handleExportInstructions = () => {
    if (!generatedThreads || !pins) {
      errorManager.showError(
        'No hay datos suficientes para exportar las instrucciones.',
      );
      toast.error('Datos Insuficientes', {
        description:
          'No hay datos suficientes para exportar las instrucciones.',
      });
      return;
    }

    try {
      ExportService.exportInstructions(generatedThreads, pins.length, pinShape);
      toast.success('Instrucciones Exportadas', {
        description: 'El archivo TXT se ha descargado exitosamente.',
      });
    } catch (error) {
      errorManager.showError('Error al exportar las instrucciones.');
      toast.error('Error de Exportación', {
        description: 'Error al exportar las instrucciones.',
      });
    }
  };

  return (
    <div>
      <h2 className='text-xl font-semibold mb-3 text-card-foreground'>
        4. Exportar Resultado
      </h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='w-full' disabled={!canExport}>
            <Download className='w-4 h-4 mr-2' />
            Exportar
            <ChevronDown className='w-4 h-4 ml-2' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end'>
          <DropdownMenuItem onClick={handleExportImage} disabled={!canExport}>
            <Image className='w-4 h-4 mr-2' />
            Exportar Imagen (PNG)
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleExportSequence}
            disabled={!canExport}>
            <FileJson className='w-4 h-4 mr-2' />
            Exportar Secuencia (JSON)
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleExportInstructions}
            disabled={!canExport}>
            <FileText className='w-4 h-4 mr-2' />
            Exportar Instrucciones (TXT)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {!hasValidData && (
        <p className='text-sm text-muted-foreground mt-2'>
          Genera el string art para habilitar las opciones de exportación.
        </p>
      )}
    </div>
  );
}
