'use client';

import { X } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import type {
	AlgorithmConfig,
	EngineStatus,
	LoomConfig,
	PresetImage,
} from '../../types';
import { findMaterialByWeight } from '../../utils/threadMaterials';
import { AlgorithmConfigPanel } from './AlgorithmConfigPanel';
import { LoomConfigPanel } from './LoomConfigPanel';
import { PresetGallery } from './PresetGallery';
import { SidebarActions } from './SidebarActions';
import { ThreadSpoolWidget } from './ThreadSpoolWidget';

export interface StudioSidebarProps {
	linesCount?: number;
	loom: { config: LoomConfig; onChange: (cfg: LoomConfig) => void };
	algo: { config: AlgorithmConfig; onChange: (cfg: AlgorithmConfig) => void };
	presets: {
		selectedId: string | null;
		activeImageSrc: string;
		onSelect: (p: PresetImage) => void;
		onUpload: (url: string) => void;
		onOpenCropper: () => void;
		onAutoCalibrate?: (
			rec: import('../../utils/imageAnalyzer').CalibrationRecommendation,
		) => void;
	};
	execution: {
		status: EngineStatus;
		onStart: () => void;
		onPause: () => void;
		onResume: () => void;
		onStop: () => void;
	};
	onCloseMobile?: () => void;
}

export function StudioSidebar({
	linesCount = 0,
	loom,
	algo,
	presets,
	execution,
	onCloseMobile,
}: Readonly<StudioSidebarProps>) {
	const isBusy = execution.status === 'running';

	return (
		<aside className='flex size-full flex-col border-r bg-card/60 backdrop-blur-md md:w-80 md:shrink-0'>
			{onCloseMobile && (
				<div className='flex h-12 items-center justify-between border-b px-4 md:hidden'>
					<span className='font-semibold text-sm'>Configuración de Arte</span>
					<Button
						variant='ghost'
						size='icon'
						onClick={onCloseMobile}
						aria-label='Cerrar panel'
						className='size-8'
					>
						<X className='size-4' />
					</Button>
				</div>
			)}

			<div className='flex-1 overflow-y-auto p-4'>
				<Tabs defaultValue='image' className='w-full'>
					<TabsList className='grid w-full grid-cols-3'>
						<TabsTrigger value='image'>Muestras</TabsTrigger>
						<TabsTrigger value='loom'>Bastidor</TabsTrigger>
						<TabsTrigger value='algo'>Algoritmo</TabsTrigger>
					</TabsList>

					<TabsContent value='image' className='mt-4'>
						<PresetGallery
							selectedPresetId={presets.selectedId}
							activeImageSrc={presets.activeImageSrc}
							onSelectPreset={presets.onSelect}
							onCustomImageUpload={presets.onUpload}
							onOpenCropper={presets.onOpenCropper}
							onAutoCalibrate={presets.onAutoCalibrate}
						/>
					</TabsContent>

					<TabsContent value='loom' className='mt-4'>
						<LoomConfigPanel
							config={loom.config}
							disabled={isBusy}
							onChange={loom.onChange}
						/>
					</TabsContent>

					<TabsContent value='algo' className='mt-4'>
						<AlgorithmConfigPanel
							config={algo.config}
							disabled={isBusy}
							onChange={algo.onChange}
						/>
					</TabsContent>
				</Tabs>
			</div>

			<div className='flex flex-col gap-3 border-t bg-card/80 p-3'>
				<ThreadSpoolWidget
					linesCount={linesCount}
					diameterCm={loom.config.physicalDiameterCm}
					materialName={findMaterialByWeight(algo.config.lineWeight).name}
				/>
				<SidebarActions
					status={execution.status}
					onStart={execution.onStart}
					onPause={execution.onPause}
					onResume={execution.onResume}
					onStop={execution.onStop}
				/>
			</div>
		</aside>
	);
}
