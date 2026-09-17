'use client';

import {
	Activity,
	Contrast,
	Feather,
	Focus,
	Layers,
	Moon,
	MoveHorizontal,
	Route,
	Scale,
	Shield,
	Sun,
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Slider } from '@/shared/ui/slider';
import type { AlgorithmConfig } from '../../types';
import {
	findMaterialByWeight,
	THREAD_MATERIALS,
	type ThreadMaterial,
} from '../../utils/threadMaterials';

interface AlgorithmConfigPanelProps {
	config: AlgorithmConfig;
	onChange: (updated: AlgorithmConfig) => void;
	disabled?: boolean;
}

export function AlgorithmConfigPanel({
	config,
	onChange,
	disabled = false,
}: AlgorithmConfigPanelProps) {
	const currentMaterial = findMaterialByWeight(config.lineWeight);
	const isLightOnDark = config.colorMode === 'light-on-dark';

	const updateField = (field: keyof AlgorithmConfig, value: number) => {
		onChange({ ...config, [field]: value });
	};

	const handleSelectMaterial = (mat: ThreadMaterial) => {
		onChange({
			...config,
			lineWeight: mat.lineWeight,
			opacityStep: mat.recommendedOpacity,
		});
	};

	const setColorMode = (mode: 'dark-on-light' | 'light-on-dark') => {
		onChange({
			...config,
			colorMode: mode,
		});
	};

	return (
		<div className='flex flex-col gap-4'>
			{/* Mode Selection: Subtractive vs Additive */}
			<div className='flex flex-col gap-1.5'>
				<span className='font-medium text-foreground text-xs'>
					Modo de Representación
				</span>
				<div className='grid grid-cols-2 gap-1.5'>
					<Button
						type='button'
						variant={!isLightOnDark ? 'default' : 'outline'}
						size='sm'
						disabled={disabled}
						onClick={() => setColorMode('dark-on-light')}
						className='h-auto flex-col items-start p-2 text-left'
					>
						<span className='flex items-center gap-1.5 font-semibold text-xs'>
							<Sun className='size-3.5 text-amber-500' />
							Sustractivo
						</span>
						<span className='text-muted-foreground text-xs opacity-80'>
							Hilo oscuro · Fondo claro
						</span>
					</Button>
					<Button
						type='button'
						variant={isLightOnDark ? 'default' : 'outline'}
						size='sm'
						disabled={disabled}
						onClick={() => setColorMode('light-on-dark')}
						className='h-auto flex-col items-start p-2 text-left'
					>
						<span className='flex items-center gap-1.5 font-semibold text-xs'>
							<Moon className='size-3.5 text-indigo-400' />
							Aditivo (Luz)
						</span>
						<span className='text-muted-foreground text-xs opacity-80'>
							Hilo claro · Fondo ébano
						</span>
					</Button>
				</div>
			</div>

			{/* Thread Material Presets */}
			<div className='flex flex-col gap-1.5'>
				<span className='font-medium text-foreground text-xs'>
					Tipo y Grosor de Hilo
				</span>
				<div className='grid grid-cols-2 gap-1.5'>
					{THREAD_MATERIALS.map((mat) => (
						<Button
							key={mat.id}
							type='button'
							variant={currentMaterial.id === mat.id ? 'default' : 'outline'}
							size='sm'
							disabled={disabled}
							onClick={() => handleSelectMaterial(mat)}
							className='h-auto flex-col items-start p-2 text-left'
						>
							<span className='font-semibold text-xs'>{mat.name}</span>
							<span className='font-mono text-xs opacity-75'>
								{mat.thicknessMm}mm
							</span>
						</Button>
					))}
				</div>
			</div>

			{/* Calibrated Line Weight Slider */}
			<div className='flex flex-col gap-2'>
				<div className='flex items-center justify-between text-xs'>
					<span className='flex items-center gap-1.5 font-medium text-foreground'>
						<Feather className='size-3.5 text-primary' />
						Grosor de trazo
					</span>
					<span className='font-mono text-muted-foreground'>
						{config.lineWeight}px
					</span>
				</div>
				<Slider
					value={[config.lineWeight]}
					min={0.4}
					max={2.5}
					step={0.05}
					disabled={disabled}
					onValueChange={(val) => updateField('lineWeight', val[0])}
				/>
			</div>

			{/* Line Count Limit */}
			<div className='flex flex-col gap-2'>
				<div className='flex items-center justify-between text-xs'>
					<span className='flex items-center gap-1.5 font-medium text-foreground'>
						<Layers className='size-3.5 text-primary' />
						Límite de líneas
					</span>
					<span className='font-mono text-muted-foreground'>
						{config.maxLines}
					</span>
				</div>
				<Slider
					value={[config.maxLines]}
					min={500}
					max={4000}
					step={50}
					disabled={disabled}
					onValueChange={(val) => updateField('maxLines', val[0])}
				/>
			</div>

			{/* Edge Weight / Detail Emphasis */}
			<div className='flex flex-col gap-2'>
				<div className='flex items-center justify-between text-xs'>
					<span className='flex items-center gap-1.5 font-medium text-foreground'>
						<Focus className='size-3.5 text-primary' />
						Énfasis de bordes
					</span>
					<span className='font-mono text-muted-foreground'>
						{Math.round((config.edgeWeight ?? 0.25) * 100)}%
					</span>
				</div>
				<Slider
					value={[config.edgeWeight ?? 0.25]}
					min={0}
					max={0.8}
					step={0.05}
					disabled={disabled}
					onValueChange={(val) => updateField('edgeWeight', val[0])}
				/>
			</div>

			{/* Background / Shadow Protection */}
			<div className='flex flex-col gap-2'>
				<div className='flex items-center justify-between text-xs'>
					<span className='flex items-center gap-1.5 font-medium text-foreground'>
						<Shield className='size-3.5 text-primary' />
						{isLightOnDark
							? 'Protección de sombras (Negro)'
							: 'Protección de blancos'}
					</span>
					<span className='font-mono text-muted-foreground'>
						{(config.whitePenalty ?? 1.3).toFixed(1)}x
					</span>
				</div>
				<Slider
					value={[config.whitePenalty ?? 1.3]}
					min={1.0}
					max={3.0}
					step={0.1}
					disabled={disabled}
					onValueChange={(val) => updateField('whitePenalty', val[0])}
				/>
			</div>

			{/* Fractional Length Normalization */}
			<div className='flex flex-col gap-2'>
				<div className='flex items-center justify-between text-xs'>
					<span className='flex items-center gap-1.5 font-medium text-foreground'>
						<Scale className='size-3.5 text-primary' />
						Normalización de longitud
					</span>
					<span className='font-mono text-muted-foreground'>
						γ = {(config.lengthPenalty ?? 0.5).toFixed(2)}
					</span>
				</div>
				<Slider
					value={[config.lengthPenalty ?? 0.5]}
					min={0.0}
					max={0.9}
					step={0.05}
					disabled={disabled}
					onValueChange={(val) => updateField('lengthPenalty', val[0])}
				/>
				<span className='text-muted-foreground text-xs opacity-75'>
					Atenúa cuerdas largas por el centro y prioriza detalles locales
				</span>
			</div>

			{/* Angular Anti-Rebound / Anti-Ping-Pong */}
			<div className='flex flex-col gap-2'>
				<div className='flex items-center justify-between text-xs'>
					<span className='flex items-center gap-1.5 font-medium text-foreground'>
						<Route className='size-3.5 text-primary' />
						Filtro anti-rebote
					</span>
					<span className='font-mono text-muted-foreground'>
						{Math.round((1 - (config.reboundPenalty ?? 0.85)) * 100)}%
					</span>
				</div>
				<Slider
					value={[config.reboundPenalty ?? 0.85]}
					min={0.5}
					max={1.0}
					step={0.05}
					disabled={disabled}
					onValueChange={(val) => updateField('reboundPenalty', val[0])}
				/>
				<span className='text-muted-foreground text-xs opacity-75'>
					Evita oscilaciones opuestas y hace que el trazo camine por el contorno
				</span>
			</div>

			{/* Opacity Step */}
			<div className='flex flex-col gap-2'>
				<div className='flex items-center justify-between text-xs'>
					<span className='flex items-center gap-1.5 font-medium text-foreground'>
						<Activity className='size-3.5 text-primary' />
						Opacidad de hilo
					</span>
					<span className='font-mono text-muted-foreground'>
						{config.opacityStep}
					</span>
				</div>
				<Slider
					value={[config.opacityStep]}
					min={3}
					max={50}
					step={1}
					disabled={disabled}
					onValueChange={(val) => updateField('opacityStep', val[0])}
				/>
			</div>

			{/* Min Distance */}
			<div className='flex flex-col gap-2'>
				<div className='flex items-center justify-between text-xs'>
					<span className='flex items-center gap-1.5 font-medium text-foreground'>
						<MoveHorizontal className='size-3.5 text-primary' />
						Distancia mín. de cuerda
					</span>
					<span className='font-mono text-muted-foreground'>
						{config.minDistance} clavos
					</span>
				</div>
				<Slider
					value={[config.minDistance]}
					min={5}
					max={50}
					step={1}
					disabled={disabled}
					onValueChange={(val) => updateField('minDistance', val[0])}
				/>
			</div>

			{/* Contrast */}
			<div className='flex flex-col gap-2'>
				<div className='flex items-center justify-between text-xs'>
					<span className='flex items-center gap-1.5 font-medium text-foreground'>
						<Contrast className='size-3.5 text-primary' />
						Contraste de entrada
					</span>
					<span className='font-mono text-muted-foreground'>
						{config.contrast}
					</span>
				</div>
				<Slider
					value={[config.contrast]}
					min={-50}
					max={80}
					step={5}
					disabled={disabled}
					onValueChange={(val) => updateField('contrast', val[0])}
				/>
			</div>
		</div>
	);
}
