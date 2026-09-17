import { Circle, Ratio, Ruler, Square } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Slider } from '@/shared/ui/slider';
import type { LoomConfig } from '../../types';

interface LoomConfigPanelProps {
	config: LoomConfig;
	onChange: (updated: LoomConfig) => void;
	disabled?: boolean;
}

const ASPECT_RATIOS: Array<{
	id: '1:1' | '3:4' | '4:3' | '16:9';
	label: string;
	desc: string;
}> = [
	{ id: '1:1', label: '1:1', desc: 'Cuadrado' },
	{ id: '3:4', label: '3:4', desc: 'Retrato' },
	{ id: '4:3', label: '4:3', desc: 'Apaisado' },
	{ id: '16:9', label: '16:9', desc: 'Panorámico' },
];

export function LoomConfigPanel({
	config,
	onChange,
	disabled = false,
}: LoomConfigPanelProps) {
	const isRect = config.shape === 'rectangle';

	const handleShapeChange = (shape: 'circle' | 'rectangle') => {
		onChange({
			...config,
			shape,
			aspectRatio:
				shape === 'rectangle' ? (config.aspectRatio ?? '1:1') : undefined,
		});
	};

	const handleAspectRatioChange = (
		aspectRatio: '1:1' | '3:4' | '4:3' | '16:9',
	) => {
		onChange({ ...config, aspectRatio });
	};

	const handlePinCountChange = (values: number[]) => {
		onChange({ ...config, pinCount: values[0] });
	};

	const handleDiameterChange = (values: number[]) => {
		onChange({ ...config, physicalDiameterCm: values[0] });
	};

	return (
		<div className='flex flex-col gap-4'>
			{/* Shape Selector */}
			<div className='flex flex-col gap-1.5'>
				<span className='font-medium text-foreground text-xs'>
					Forma del Bastidor
				</span>
				<div className='grid grid-cols-2 gap-1.5'>
					<Button
						type='button'
						variant={!isRect ? 'default' : 'outline'}
						size='sm'
						disabled={disabled}
						onClick={() => handleShapeChange('circle')}
						className='h-auto flex-col items-start p-2 text-left'
					>
						<span className='flex items-center gap-1.5 font-semibold text-xs'>
							<Circle className='size-3.5 text-amber-500' />
							Circular
						</span>
						<span className='text-muted-foreground text-xs opacity-80'>
							Aro radial clásico
						</span>
					</Button>
					<Button
						type='button'
						variant={isRect ? 'default' : 'outline'}
						size='sm'
						disabled={disabled}
						onClick={() => handleShapeChange('rectangle')}
						className='h-auto flex-col items-start p-2 text-left'
					>
						<span className='flex items-center gap-1.5 font-semibold text-xs'>
							<Square className='size-3.5 text-indigo-400' />
							Rectangular
						</span>
						<span className='text-muted-foreground text-xs opacity-80'>
							Marco ortogonal (Perspicere)
						</span>
					</Button>
				</div>
			</div>

			{/* Aspect Ratio Selector (Only when Rectangular) */}
			{isRect && (
				<div className='flex flex-col gap-1.5'>
					<div className='flex items-center justify-between text-xs'>
						<span className='flex items-center gap-1.5 font-medium text-foreground'>
							<Ratio className='size-3.5 text-primary' />
							Proporción de Marco
						</span>
						<span className='font-mono text-muted-foreground text-xs'>
							{config.aspectRatio ?? '1:1'}
						</span>
					</div>
					<div className='grid grid-cols-4 gap-1'>
						{ASPECT_RATIOS.map((item) => (
							<Button
								key={item.id}
								type='button'
								variant={
									(config.aspectRatio ?? '1:1') === item.id
										? 'default'
										: 'outline'
								}
								size='sm'
								disabled={disabled}
								onClick={() => handleAspectRatioChange(item.id)}
								className='flex-col p-1.5 text-center'
							>
								<span className='font-bold text-xs'>{item.label}</span>
								<span className='text-xs opacity-75'>{item.desc}</span>
							</Button>
						))}
					</div>
				</div>
			)}

			{/* Number of Pins */}
			<div className='flex flex-col gap-2'>
				<div className='flex items-center justify-between text-xs'>
					<span className='flex items-center gap-1.5 font-medium text-foreground'>
						{isRect ? (
							<Square className='size-3.5 text-primary' />
						) : (
							<Circle className='size-3.5 text-primary' />
						)}
						Número de clavos
					</span>
					<span className='font-mono text-muted-foreground'>
						{config.pinCount}
					</span>
				</div>
				<Slider
					value={[config.pinCount]}
					min={100}
					max={500}
					step={10}
					disabled={disabled}
					onValueChange={handlePinCountChange}
				/>
				<span className='text-muted-foreground text-xs'>
					{isRect
						? 'Distribución proporcional en los 4 bordes del marco.'
						: 'Resolución angular alrededor del aro circular.'}
				</span>
			</div>

			{/* Physical Dimensions */}
			<div className='flex flex-col gap-2'>
				<div className='flex items-center justify-between text-xs'>
					<span className='flex items-center gap-1.5 font-medium text-foreground'>
						<Ruler className='size-3.5 text-primary' />
						{isRect ? 'Ancho mayor físico' : 'Diámetro físico'}
					</span>
					<span className='font-mono text-muted-foreground'>
						{config.physicalDiameterCm} cm
					</span>
				</div>
				<Slider
					value={[config.physicalDiameterCm]}
					min={20}
					max={150}
					step={5}
					disabled={disabled}
					onValueChange={handleDiameterChange}
				/>
				<span className='text-muted-foreground text-xs'>
					Permite estimar con exactitud los metros de hilo y la escala real.
				</span>
			</div>
		</div>
	);
}
