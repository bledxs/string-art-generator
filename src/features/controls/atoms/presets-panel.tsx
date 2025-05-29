'use client';

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
import { useStringArtContext } from '@/context/string-art-context';

export function PresetsPanel() {
  const { managers, state, actions } = useStringArtContext();
  const { parametersManager, presetsManager, errorManager } = managers;
  const { isGenerating } = state;

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const {
    presets = [],
    selectedPresetId = '',
    newPresetName = '',
    setSelectedPresetId,
    setNewPresetName,
  } = presetsManager || {};

  const handleSavePreset = () => {
    try {
      presetsManager.savePreset(parametersManager.config);
      errorManager.clearError();
    } catch (error) {
      errorManager.showError(
        error instanceof Error ? error.message : 'Error al guardar preset.',
      );
    }
  };

  const handleLoadPreset = () => {
    const preset = presetsManager.getSelectedPreset();
    if (!preset) {
      errorManager.showError('No hay ningún preset seleccionado para cargar.');
      return;
    }
    parametersManager.loadFromPreset(preset);
    errorManager.clearError();
  };

  const handleDeletePreset = () => {
    try {
      presetsManager.deletePreset(presetsManager.selectedPresetId);
      errorManager.clearError();
    } catch (error) {
      errorManager.showError(
        error instanceof Error ? error.message : 'Error al eliminar preset.',
      );
    }
  };

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
              onChange={(e) => setNewPresetName?.(e.target.value)}
              placeholder='Ej: Retrato Detallado'
              className='flex-grow'
              disabled={isGenerating}
            />
            <Button
              onClick={handleSavePreset}
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
              onValueChange={setSelectedPresetId}
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
                onClick={handleLoadPreset}
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
                    <AlertDialogAction onClick={handleDeletePreset}>
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
}
