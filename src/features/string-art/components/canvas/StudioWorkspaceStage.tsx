'use client';

import { ChevronDown } from 'lucide-react';
import { useTranslation } from '@/shared/i18n';
import { Button } from '@/shared/ui/button';
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
	const { t } = useTranslation();

	const handleScrollToGuide = () => {
		const target = document.getElementById('seo-content');
		target?.scrollIntoView({ behavior: 'smooth' });
	};

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

			<Button
				variant='outline'
				size='sm'
				onClick={handleScrollToGuide}
				aria-label={t.zoom.viewGuideAria}
				className='absolute bottom-2 left-2 z-20 flex h-7 items-center gap-1.5 rounded-lg border bg-background/85 px-2.5 text-muted-foreground text-xs shadow-md backdrop-blur-md transition-colors hover:bg-background hover:text-foreground sm:bottom-4 sm:left-4'
			>
				<span>{t.zoom.viewGuide}</span>
				<ChevronDown className='size-3.5 text-primary' />
			</Button>

			<ZoomControls
				scale={transform.transform.scale}
				onZoomIn={transform.zoomIn}
				onZoomOut={transform.zoomOut}
				onReset={transform.resetTransform}
			/>
		</main>
	);
}
