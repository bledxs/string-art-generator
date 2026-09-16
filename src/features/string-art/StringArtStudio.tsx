'use client';

import { Download } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { StudioWorkspaceStage } from './components/canvas/StudioWorkspaceStage';
import { TimelinePlayer } from './components/player';
import { StudioModals } from './components/StudioModals';
import { StudioSidebar } from './components/sidebar';
import { StudioHeader } from './components/toolbar';
import { useCanvasTransform } from './hooks/useCanvasTransform';
import { useStudioWorkbench } from './hooks/useStudioWorkbench';
import { useWeavingAssistant } from './hooks/useWeavingAssistant';

export function StringArtStudio() {
	const studio = useStudioWorkbench();
	const transform = useCanvasTransform();
	const assistant = useWeavingAssistant(studio.engine.progress.lineSequence);

	const exportAction = (
		<Button
			variant='outline'
			size='sm'
			disabled={studio.displayedLines.length < 2}
			onClick={() => studio.setIsExportOpen(true)}
			className='gap-1.5 text-xs'
		>
			<Download className='size-3.5' />
			Exportar
		</Button>
	);

	return (
		<div className='flex h-screen w-screen flex-col overflow-hidden bg-background'>
			<StudioHeader
				status={studio.engine.status}
				linesCount={studio.displayedLines.length}
				pinCount={studio.loomConfig.pinCount}
				diameterCm={studio.loomConfig.physicalDiameterCm}
				timeElapsedMs={studio.engine.progress.timeElapsedMs}
				actionSlot={exportAction}
			/>

			<div className='flex flex-1 overflow-hidden'>
				<StudioSidebar {...studio.sidebarProps} />
				<StudioWorkspaceStage
					size={studio.canvasSize}
					pins={studio.pins}
					lines={studio.displayedLines}
					currentPin={studio.engine.progress.currentPin}
					lineWeight={studio.algoConfig.lineWeight}
					opacity={studio.algoConfig.opacityStep / 100}
					transform={transform}
				/>
			</div>

			<TimelinePlayer
				totalLines={studio.engine.progress.lineSequence.length}
				visibleLines={studio.visibleLinesCount}
				isPlaying={studio.isPlaying}
				currentPins={{ from: assistant.fromPin, to: assistant.toPin }}
				onVisibleLinesChange={studio.setVisibleLinesCount}
				onTogglePlay={studio.togglePlay}
				onOpenAssistant={() => studio.setIsAssistantOpen(true)}
			/>

			<StudioModals
				exportModal={{
					isOpen: studio.isExportOpen,
					onClose: () => studio.setIsExportOpen(false),
					pins: studio.pins,
					lines: studio.displayedLines,
					loom: studio.loomConfig,
					algo: studio.algoConfig,
				}}
				assistantModal={{
					isOpen: studio.isAssistantOpen,
					onClose: () => studio.setIsAssistantOpen(false),
					stepData: assistant,
					onNext: assistant.nextStep,
					onPrev: assistant.prevStep,
					onJump: assistant.jumpSteps,
				}}
			/>
		</div>
	);
}
