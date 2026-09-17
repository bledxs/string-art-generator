'use client';

import { Check, Layers } from 'lucide-react';
import { Slider } from '@/shared/ui/slider';
import type { AlgorithmConfig, ColorLayer } from '../../types';
import {
	COLOR_PALETTES,
	type ColorPalettePreset,
} from '../../utils/colorDecomposition';

interface ColorPalettePanelProps {
	config: AlgorithmConfig;
	onChange: (updated: AlgorithmConfig) => void;
	disabled?: boolean;
}

export function ColorPalettePanel({
	config,
	onChange,
	disabled = false,
}: Readonly<ColorPalettePanelProps>) {
	const currentPaletteId = config.colorPaletteType ?? 'monochrome';
	const isLightOnDark = config.colorMode === 'light-on-dark';
	const activeLayers: ColorLayer[] = (
		config.colorLayers && config.colorLayers.length > 0
			? config.colorLayers
			: (COLOR_PALETTES.find((p) => p.id === currentPaletteId)?.layers ??
				COLOR_PALETTES[0].layers)
	).map((l) =>
		currentPaletteId === 'monochrome'
			? { ...l, color: isLightOnDark ? '#f4f2ed' : '#120e0b' }
			: l,
	);

	const handleSelectPalette = (preset: ColorPalettePreset) => {
		const totalLines = preset.layers.reduce((sum, l) => sum + l.linesCount, 0);
		const targetMode = preset.recommendedMode;
		onChange({
			...config,
			colorPaletteType: preset.id,
			colorLayers: preset.layers.map((l) => ({
				...l,
				color:
					preset.id === 'monochrome'
						? targetMode === 'light-on-dark'
							? '#f4f2ed'
							: '#120e0b'
						: l.color,
			})),
			colorMode: targetMode,
			maxLines: totalLines,
		});
	};

	const handleLayerLinesChange = (layerIndex: number, newLines: number) => {
		const updatedLayers = activeLayers.map((layer, idx) => {
			if (idx === layerIndex) {
				return { ...layer, linesCount: newLines };
			}
			return layer;
		});
		const newTotalLines = updatedLayers.reduce(
			(sum, l) => sum + l.linesCount,
			0,
		);
		onChange({
			...config,
			colorLayers: updatedLayers,
			maxLines: newTotalLines,
		});
	};

	return (
		<div className='flex flex-col gap-4'>
			{/* Palette Presets */}
			<div className='flex flex-col gap-1.5'>
				<span className='font-medium text-foreground text-xs'>
					Paleta y Bobinas de Color
				</span>
				<div className='grid grid-cols-1 gap-2'>
					{COLOR_PALETTES.map((palette) => {
						const isSelected = currentPaletteId === palette.id;
						return (
							<button
								key={palette.id}
								type='button'
								disabled={disabled}
								onClick={() => handleSelectPalette(palette)}
								className={`flex flex-col items-start gap-1 rounded-xl border p-2.5 text-left transition-all ${
									isSelected
										? 'border-primary bg-primary/5 shadow-xs'
										: 'border-border/60 bg-muted/20 hover:border-border hover:bg-muted/40'
								}`}
							>
								<div className='flex w-full items-center justify-between'>
									<span className='font-semibold text-foreground text-xs'>
										{palette.name}
									</span>
									<div className='flex items-center gap-1.5'>
										{/* Color Swatch Dots */}
										<div className='flex items-center -space-x-1'>
											{palette.layers.map((l) => (
												<span
													key={l.id}
													className='size-3.5 rounded-full border border-background shadow-xs'
													style={{ backgroundColor: l.color }}
													title={`${l.name} (${l.color})`}
												/>
											))}
										</div>
										{isSelected && <Check className='size-3.5 text-primary' />}
									</div>
								</div>
								<span className='text-muted-foreground text-xs'>
									{palette.description}
								</span>
							</button>
						);
					})}
				</div>
			</div>

			{/* Layer Breakdown & Line Weight Adjustment */}
			<div className='flex flex-col gap-3 rounded-xl border bg-muted/10 p-3'>
				<div className='flex items-center justify-between'>
					<span className='flex items-center gap-1.5 font-medium text-foreground text-xs'>
						<Layers className='size-3.5 text-primary' />
						Capas Secuenciales ({activeLayers.length})
					</span>
					<span className='font-mono text-muted-foreground text-xs'>
						Total: {config.maxLines} líneas
					</span>
				</div>

				<div className='flex flex-col gap-3'>
					{activeLayers.map((layer, index) => (
						<div key={layer.id} className='flex flex-col gap-1.5'>
							<div className='flex items-center justify-between text-xs'>
								<div className='flex items-center gap-2'>
									<span
										className='size-3 shrink-0 rounded-full border border-black/20 shadow-xs'
										style={{ backgroundColor: layer.color }}
									/>
									<span className='font-medium text-foreground text-xs'>
										{index + 1}ª {layer.name}
									</span>
								</div>
								<span className='font-mono font-semibold text-muted-foreground text-xs'>
									{layer.linesCount} lín
								</span>
							</div>
							<Slider
								disabled={disabled}
								value={[layer.linesCount]}
								min={100}
								max={2000}
								step={50}
								onValueChange={(vals) => handleLayerLinesChange(index, vals[0])}
								aria-label={`Líneas para capa ${layer.name}`}
							/>
						</div>
					))}
				</div>
			</div>

			{/* Physical String Art Info Banner */}
			<div className='rounded-lg border border-primary/20 bg-primary/5 p-2.5 text-xs'>
				<span className='font-semibold text-foreground text-xs'>
					Producción Real por Capas:
				</span>
				<p className='mt-1 text-muted-foreground text-xs'>
					El algoritmo teje bobina por bobina en secuencia. Esto previene el
					enredo sucio («efecto barro») y permite cambiar de hilo fácilmente en
					el taller.
				</p>
			</div>
		</div>
	);
}
