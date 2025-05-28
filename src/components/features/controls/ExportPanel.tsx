import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ExportService } from '@/services/exportService';
import type { Pin, Thread } from '@/types/stringArt';
import { ChevronDown, Download, FileJson, FileText, Image } from 'lucide-react';
import React from 'react';

interface ExportPanelProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  generatedThreads: Thread[] | null;
  pins: Pin[] | null;
  isGenerating: boolean;
  onError: (message: string) => void;
  onSuccess: () => void;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({
  canvasRef,
  generatedThreads,
  pins,
  isGenerating,
  onError,
  onSuccess,
}) => {
  const hasValidData = generatedThreads && generatedThreads.length > 0;
  const canExport = !isGenerating && hasValidData;

  const handleExportImage = () => {
    if (!canvasRef.current) {
      onError('No se pudo acceder al canvas para exportar la imagen.');
      return;
    }
    try {
      ExportService.exportImage(canvasRef.current);
      onSuccess();
    } catch {
      onError('Error al exportar la imagen.');
    }
  };

  const handleExportSequence = () => {
    if (!generatedThreads || !pins) {
      onError('No hay datos suficientes para exportar la secuencia.');
      return;
    }
    try {
      ExportService.exportSequence(generatedThreads, pins);
      onSuccess();
    } catch {
      onError('Error al exportar la secuencia.');
    }
  };

  const handleExportInstructions = () => {
    if (!generatedThreads || !pins) {
      onError('No hay datos suficientes para exportar las instrucciones.');
      return;
    }
    try {
      ExportService.exportInstructions(generatedThreads, pins.length);
      onSuccess();
    } catch {
      onError('Error al exportar las instrucciones.');
    }
  };

  return (
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
        <DropdownMenuItem onClick={handleExportSequence} disabled={!canExport}>
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
  );
};
