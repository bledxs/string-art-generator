'use client';

import type { useCanvasTransform } from '../../hooks/useCanvasTransform';
import type { LoomConfig, Pin } from '../../types';
import { CanvasViewport } from './CanvasViewport';
import { StudioCanvas } from './StudioCanvas';
import { ZoomControls } from './ZoomControls';

interface StudioWorkspaceStageProps {
	size: number;
	pins: Pin[];
	lines: number[];
	currentPin: number;
	lineWeight: number;
	opacity: number;
	transform: ReturnType<typeof useCanvasTransform>;
	colorMode?: 'dark-on-light' | 'light-on-dark';
	loomConfig?: LoomConfig;
	colorRuns?: import('../../types').ColorRun[];
}

export function StudioWorkspaceStage({
	size,
	pins,
	lines,
	currentPin,
	lineWeight,
	opacity,
	transform,
	colorMode = 'dark-on-light',
	loomConfig,
	colorRuns,
}: StudioWorkspaceStageProps) {
	return (
		<main className='relative flex flex-1 flex-col overflow-hidden'>
			<CanvasViewport {...transform}>
				<StudioCanvas
					size={size}
					pins={pins}
					lines={lines}
					currentPin={currentPin}
					lineWeight={lineWeight}
					opacity={opacity}
					colorMode={colorMode}
					loomConfig={loomConfig}
					colorRuns={colorRuns}
				/>
			</CanvasViewport>

			<ZoomControls
				scale={transform.transform.scale}
				onZoomIn={transform.zoomIn}
				onZoomOut={transform.zoomOut}
				onReset={transform.resetTransform}
			/>
		</main>
	);
}
