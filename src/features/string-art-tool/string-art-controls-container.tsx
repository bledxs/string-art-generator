import { ExportControlsClient } from '../controls/export-controls-client';
import { ExportControlsContainer } from '../controls/export-controls-container';
import { GenerationControlsClient } from '../controls/generation-controls-client';
import { GenerationControlsContainer } from '../controls/generation-controls-container';
import { ImageControlsClient } from '../controls/image-controls-client';
import { ImageControlsContainer } from '../controls/image-controls-container';
import { ParametersControlsClient } from '../controls/parameters-controls-client';
import { ParametersControlsContainer } from '../controls/parameters-controls-container';
import { PresetsControlsClient } from '../controls/presets-controls-client';
import { PresetsControlsContainer } from '../controls/presets-controls-container';
import { StatusControlsClient } from '../controls/status-controls-client';
import { StatusControlsContainer } from '../controls/status-controls-container';

export function StringArtControlsContainer() {
  return (
    <div className='space-y-6'>
      {/* 1. Cargar imagen */}
      <ImageControlsContainer>
        <ImageControlsClient />
      </ImageControlsContainer>

      {/* 2. Configurar parámetros */}
      <ParametersControlsContainer>
        <ParametersControlsClient />
      </ParametersControlsContainer>

      {/* 3. Presets */}
      <PresetsControlsContainer>
        <PresetsControlsClient />
      </PresetsControlsContainer>

      {/* 4. Generar */}
      <GenerationControlsContainer>
        <GenerationControlsClient />
      </GenerationControlsContainer>

      {/* 5. Exportar */}
      <ExportControlsContainer>
        <ExportControlsClient />
      </ExportControlsContainer>

      {/* 6. Progress (solo durante generación) */}
      <StatusControlsContainer>
        <StatusControlsClient />
      </StatusControlsContainer>
    </div>
  );
}
