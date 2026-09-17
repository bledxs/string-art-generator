'use client';

import { Download } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { StudioWorkspaceStage } from './components/canvas/StudioWorkspaceStage';
import { TimelinePlayer } from './components/player';
import { StudioModals } from './components/StudioModals';
import { MobileSidebarDrawer, StudioSidebar } from './components/sidebar';
import { StudioHeader } from './components/toolbar';
import { useCanvasTransform } from './hooks/useCanvasTransform';
import { useStudioWorkbench } from './hooks/useStudioWorkbench';
import { useWeavingAssistant } from './hooks/useWeavingAssistant';

export function StringArtStudio() {
	const studio = useStudioWorkbench();
	const transform = useCanvasTransform(studio.canvasSize);
	const assistant = useWeavingAssistant(studio.engine.progress.lineSequence);
	const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

	const exportAction = (
		<Button
			variant='outline'
			size='sm'
			disabled={studio.displayedLines.length < 2}
			onClick={() => studio.setIsExportOpen(true)}
			className='gap-1.5 p-2 text-xs sm:px-3'
			aria-label='Exportar proyecto'
		>
			<Download className='size-3.5' />
			<span className='hidden sm:inline'>Exportar</span>
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
				converged={studio.engine.progress.converged}
				actionSlot={exportAction}
				onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
			/>

			<div className='flex flex-1 overflow-hidden'>
				<div className='hidden md:flex'>
					<StudioSidebar {...studio.sidebarProps} />
				</div>
				<StudioWorkspaceStage
					size={studio.canvasSize}
					pins={studio.pins}
					lines={studio.displayedLines}
					currentPin={studio.engine.progress.currentPin}
					lineWeight={studio.algoConfig.lineWeight}
					opacity={studio.algoConfig.opacityStep / 100}
					colorMode={studio.algoConfig.colorMode}
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

			<MobileSidebarDrawer
				isOpen={isMobileSidebarOpen}
				onClose={() => setIsMobileSidebarOpen(false)}
				sidebarProps={studio.sidebarProps}
			/>

			<StudioModals
				{...studio.baseModalsProps}
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
