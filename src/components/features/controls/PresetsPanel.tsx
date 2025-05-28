import React, { useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { PinPlacementShape, StringArtPreset } from '@/types/stringArt';

interface PresetsPanelProps {
  presets: StringArtPreset[];
  selectedPresetId: string;
  newPresetName: string;
  isGenerating: boolean;
  currentConfig: {
    numPins: number;
    numThreads: number;
    threadOpacity: number;
    threadWidth: number;
    pinShape: PinPlacementShape;
  };
  onSavePreset: () => void;
  onLoadPreset: () => void;
  onDeletePreset: () => void;
  onSelectedPresetChange: (id: string) => void;
  onNewPresetNameChange: (name: string) => void;
}

export const PresetsPanel: React.FC<PresetsPanelProps> = ({
  presets,
  selectedPresetId,
  newPresetName,
  isGenerating,
  onSavePreset,
  onLoadPreset,
  onDeletePreset,
  onSelectedPresetChange,
  onNewPresetNameChange,
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <div>
      <h2 className='text-xl font-semibold mb-3 text-card-foreground'>
        3. Presets de Configuración
      </h2>
      <div className='space-y-4'>
        {/* Save New Preset */}
        <div>
          <Label htmlFor='newPresetName' className='text-sm font-medium'>
            Nombre del Nuevo Preset:
          </Label>
          <div className='flex space-x-2 mt-1'>
            <Input
              id='newPresetName'
              type='text'
              value={newPresetName}
              onChange={(e) => onNewPresetNameChange(e.target.value)}
              placeholder='Ej: Retrato Detallado'
              className='flex-grow'
              disabled={isGenerating}
            />
            <Button
              onClick={onSavePreset}
              disabled={isGenerating || !newPresetName.trim()}>
              Guardar
            </Button>
          </div>
        </div>

        {/* Load/Delete Existing Presets */}
        {presets.length > 0 && (
          <div>
            <Label htmlFor='selectPreset' className='text-sm font-medium'>
              Gestionar Presets Guardados:
            </Label>
            <Select
              value={selectedPresetId}
              onValueChange={onSelectedPresetChange}
              disabled={isGenerating}>
              <SelectTrigger id='selectPreset' className='w-full mt-1'>
                <SelectValue placeholder='Selecciona un preset...' />
              </SelectTrigger>
              <SelectContent>
                {presets.map((preset) => (
                  <SelectItem key={preset.id} value={preset.id}>
                    {preset.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className='flex space-x-2 mt-2'>
              <Button
                onClick={onLoadPreset}
                disabled={isGenerating || !selectedPresetId}
                className='flex-grow'
                variant='outline'>
                Cargar Seleccionado
              </Button>

              <AlertDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}>
                <AlertDialogTrigger asChild>
                  <Button
                    disabled={isGenerating || !selectedPresetId}
                    variant='destructive'
                    className='flex-grow'>
                    Eliminar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer. El preset se eliminará
                      permanentemente.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={() => setShowDeleteDialog(false)}>
                      Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={onDeletePreset}>
                      Sí, eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        )}
        {presets.length === 0 && (
          <p className='text-sm text-muted-foreground mt-2'>
            No hay presets guardados.
          </p>
        )}
      </div>
    </div>
  );
};
