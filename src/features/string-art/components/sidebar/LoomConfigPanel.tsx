'use client';

import { Circle, Ruler } from 'lucide-react';
import { Slider } from '@/shared/ui/slider';
import type { LoomConfig } from '../../types';

interface LoomConfigPanelProps {
	config: LoomConfig;
	onChange: (updated: LoomConfig) => void;
	disabled?: boolean;
}

export function LoomConfigPanel({
	config,
	onChange,
	disabled = false,
}: LoomConfigPanelProps) {
	const handlePinCountChange = (values: number[]) => {
		onChange({ ...config, pinCount: values[0] });
	};

	const handleDiameterChange = (values: number[]) => {
		onChange({ ...config, physicalDiameterCm: values[0] });
	};

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-col gap-2'>
				<div className='flex items-center justify-between text-xs'>
					<span className='flex items-center gap-1.5 font-medium text-foreground'>
						<Circle className='size-3.5 text-primary' />
						Número de clavos
					</span>
					<span className='font-mono text-muted-foreground'>
						{config.pinCount}
					</span>
				</div>
				<Slider
					value={[config.pinCount]}
					min={100}
					max={360}
					step={10}
					disabled={disabled}
					onValueChange={handlePinCountChange}
				/>
				<span className='text-muted-foreground text-xs'>
					Determina la resolución angular alrededor del bastidor circular.
				</span>
			</div>

			<div className='flex flex-col gap-2'>
				<div className='flex items-center justify-between text-xs'>
					<span className='flex items-center gap-1.5 font-medium text-foreground'>
						<Ruler className='size-3.5 text-primary' />
						Diámetro físico
					</span>
					<span className='font-mono text-muted-foreground'>
						{config.physicalDiameterCm} cm
					</span>
				</div>
				<Slider
					value={[config.physicalDiameterCm]}
					min={20}
					max={120}
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
