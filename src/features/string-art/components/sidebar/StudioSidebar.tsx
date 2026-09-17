'use client';

import { X } from 'lucide-react';
import { useTranslation } from '@/shared/i18n';
import { Button } from '@/shared/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import type {
	AlgorithmConfig,
	ColorRun,
	EngineStatus,
	LoomConfig,
	PresetImage,
} from '../../types';
import { findMaterialByWeight } from '../../utils/threadMaterials';
import { AlgorithmConfigPanel } from './AlgorithmConfigPanel';
import { ColorPalettePanel } from './ColorPalettePanel';
import { LoomConfigPanel } from './LoomConfigPanel';
import { PresetGallery } from './PresetGallery';
import { SidebarActions } from './SidebarActions';
import { ThreadSpoolWidget } from './ThreadSpoolWidget';

export interface StudioSidebarProps {
	linesCount?: number;
	colorRuns?: ColorRun[];
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
	colorRuns,
	loom,
	algo,
	presets,
	execution,
	onCloseMobile,
}: Readonly<StudioSidebarProps>) {
	const { t } = useTranslation();
	const isBusy = execution.status === 'running';

	const activeMaterial = findMaterialByWeight(algo.config.lineWeight);
	const localizedMaterialName = (() => {
		switch (activeMaterial.id) {
			case 'silk-extra-fine':
				return t.engine.materials.silk;
			case 'cotton-standard':
				return t.engine.materials.cotton;
			case 'embroidery-heavy':
				return t.engine.materials.embroidery;
			case 'rustic-cord':
				return t.engine.materials.rustic;
			default:
				return activeMaterial.name;
		}
	})();

	return (
		<aside className='flex size-full min-w-0 flex-col border-r bg-card/60 backdrop-blur-md md:w-80 md:shrink-0'>
			{onCloseMobile && (
				<div className='flex h-12 items-center justify-between border-b px-4 md:hidden'>
					<span className='font-semibold text-sm'>{t.sidebar.panelTitle}</span>
					<Button
						variant='ghost'
						size='icon'
						onClick={onCloseMobile}
						aria-label={t.sidebar.closeAria}
						className='size-8'
					>
						<X className='size-4' />
					</Button>
				</div>
			)}

			<div className='min-w-0 flex-1 overflow-y-auto p-4'>
				<Tabs defaultValue='image' className='w-full min-w-0'>
					<TabsList className='grid w-full grid-cols-4 p-1'>
						<TabsTrigger value='image' className='truncate p-1 text-xs'>
							{t.sidebar.tabs.presets}
						</TabsTrigger>
						<TabsTrigger value='loom' className='truncate p-1 text-xs'>
							{t.sidebar.tabs.loom}
						</TabsTrigger>
						<TabsTrigger value='color' className='truncate p-1 text-xs'>
							{t.sidebar.tabs.color}
						</TabsTrigger>
						<TabsTrigger value='algo' className='truncate p-1 text-xs'>
							{t.sidebar.tabs.engine}
						</TabsTrigger>
					</TabsList>

					<TabsContent value='image' className='mt-4 min-w-0'>
						<PresetGallery
							selectedPresetId={presets.selectedId}
							activeImageSrc={presets.activeImageSrc}
							onSelectPreset={presets.onSelect}
							onCustomImageUpload={presets.onUpload}
							onOpenCropper={presets.onOpenCropper}
							onAutoCalibrate={presets.onAutoCalibrate}
						/>
					</TabsContent>

					<TabsContent value='loom' className='mt-4 min-w-0'>
						<LoomConfigPanel
							config={loom.config}
							disabled={isBusy}
							onChange={loom.onChange}
						/>
					</TabsContent>

					<TabsContent value='color' className='mt-4 min-w-0'>
						<ColorPalettePanel
							config={algo.config}
							disabled={isBusy}
							onChange={algo.onChange}
						/>
					</TabsContent>

					<TabsContent value='algo' className='mt-4 min-w-0'>
						<AlgorithmConfigPanel
							config={algo.config}
							disabled={isBusy}
							onChange={algo.onChange}
						/>
					</TabsContent>
				</Tabs>
			</div>

			<div className='flex min-w-0 flex-col gap-3 border-t bg-card/80 p-3'>
				<ThreadSpoolWidget
					linesCount={linesCount}
					diameterCm={loom.config.physicalDiameterCm}
					materialName={localizedMaterialName}
					colorRuns={colorRuns}
					colorLayers={algo.config.colorLayers}
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
