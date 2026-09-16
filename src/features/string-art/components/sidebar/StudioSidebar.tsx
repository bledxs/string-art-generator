'use client';

import { Play, RotateCcw, Sliders, Square } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import type {
	AlgorithmConfig,
	EngineStatus,
	LoomConfig,
	PresetImage,
} from '../../types';
import { AlgorithmConfigPanel } from './AlgorithmConfigPanel';
import { LoomConfigPanel } from './LoomConfigPanel';
import { PresetGallery } from './PresetGallery';

export interface StudioSidebarProps {
	loom: {
		config: LoomConfig;
		onChange: (cfg: LoomConfig) => void;
	};
	algo: {
		config: AlgorithmConfig;
		onChange: (cfg: AlgorithmConfig) => void;
	};
	presets: {
		selectedId: string | null;
		onSelect: (p: PresetImage) => void;
		onUpload: (url: string) => void;
	};
	execution: {
		status: EngineStatus;
		onStart: () => void;
		onPause: () => void;
		onResume: () => void;
		onStop: () => void;
	};
}

export function StudioSidebar({
	loom,
	algo,
	presets,
	execution,
}: StudioSidebarProps) {
	const isBusy = execution.status === 'running';

	return (
		<aside className='flex h-full w-80 shrink-0 flex-col border-r bg-card/40 backdrop-blur-md'>
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
							onSelectPreset={presets.onSelect}
							onCustomImageUpload={presets.onUpload}
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

			<div className='border-t bg-card/80 p-3'>
				{execution.status === 'idle' && (
					<Button
						variant='default'
						size='lg'
						onClick={execution.onStart}
						className='w-full gap-2 font-medium'
					>
						<Play className='size-4 fill-current' />
						Generar Arte de Hilo
					</Button>
				)}

				{execution.status === 'running' && (
					<div className='flex gap-2'>
						<Button
							variant='secondary'
							size='lg'
							onClick={execution.onPause}
							className='flex-1 gap-2'
						>
							<Sliders className='size-4' />
							Pausar
						</Button>
						<Button
							variant='destructive'
							size='lg'
							onClick={execution.onStop}
							className='size-10 px-0'
						>
							<Square className='size-4 fill-current' />
						</Button>
					</div>
				)}

				{execution.status === 'paused' && (
					<div className='flex gap-2'>
						<Button
							variant='default'
							size='lg'
							onClick={execution.onResume}
							className='flex-1 gap-2'
						>
							<Play className='size-4 fill-current' />
							Reanudar
						</Button>
						<Button
							variant='destructive'
							size='lg'
							onClick={execution.onStop}
							className='size-10 px-0'
						>
							<Square className='size-4 fill-current' />
						</Button>
					</div>
				)}

				{execution.status === 'completed' && (
					<Button
						variant='outline'
						size='lg'
						onClick={execution.onStart}
						className='w-full gap-2'
					>
						<RotateCcw className='size-4' />
						Regenerar
					</Button>
				)}
			</div>
		</aside>
	);
}
