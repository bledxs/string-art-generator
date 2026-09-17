'use client';

import { Circle, Ratio, Ruler, Square } from 'lucide-react';
import { useTranslation } from '@/shared/i18n';
import { Button } from '@/shared/ui/button';
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
}: Readonly<LoomConfigPanelProps>) {
	const { t } = useTranslation();
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

	const aspectRatios: Array<{
		id: '1:1' | '3:4' | '4:3' | '16:9';
		label: string;
		desc: string;
	}> = [
		{ id: '1:1', label: '1:1', desc: t.loom.ratios.square },
		{ id: '3:4', label: '3:4', desc: t.loom.ratios.portrait },
		{ id: '4:3', label: '4:3', desc: t.loom.ratios.landscape },
		{ id: '16:9', label: '16:9', desc: t.loom.ratios.widescreen },
	];

	return (
		<div className='flex flex-col gap-4'>
			{/* Shape Selector */}
			<div className='flex flex-col gap-1.5'>
				<span className='font-medium text-foreground text-xs'>
					{t.loom.shapeTitle}
				</span>
				<div className='grid grid-cols-2 gap-1.5'>
					<Button
						type='button'
						variant={!isRect ? 'default' : 'outline'}
						size='sm'
						disabled={disabled}
						onClick={() => handleShapeChange('circle')}
						className='h-auto w-full min-w-0 flex-col items-start whitespace-normal p-2 text-left'
					>
						<span className='flex items-center gap-1.5 font-semibold text-xs'>
							<Circle className='size-3.5 shrink-0 text-amber-500' />
							<span className='truncate'>{t.loom.circular}</span>
						</span>
						<span
							className={`break-words text-xs leading-tight ${
								!isRect
									? 'font-normal text-primary-foreground/90'
									: 'text-muted-foreground opacity-80'
							}`}
						>
							{t.loom.circularDesc}
						</span>
					</Button>

					<Button
						type='button'
						variant={isRect ? 'default' : 'outline'}
						size='sm'
						disabled={disabled}
						onClick={() => handleShapeChange('rectangle')}
						className='h-auto w-full min-w-0 flex-col items-start whitespace-normal p-2 text-left'
					>
						<span className='flex items-center gap-1.5 font-semibold text-xs'>
							<Square className='size-3.5 shrink-0 text-indigo-400' />
							<span className='truncate'>{t.loom.rectangular}</span>
						</span>
						<span
							className={`break-words text-xs leading-tight ${
								isRect
									? 'font-normal text-primary-foreground/90'
									: 'text-muted-foreground opacity-80'
							}`}
						>
							{t.loom.rectangularDesc}
						</span>
					</Button>
				</div>
			</div>

			{/* Aspect Ratio Selector (Only when Rectangular) */}
			{isRect && (
				<div className='flex flex-col gap-1.5'>
					<div className='flex items-center justify-between text-xs'>
						<span className='flex items-center gap-1.5 font-medium text-foreground'>
							<Ratio className='size-3.5 shrink-0 text-primary' />
							{t.loom.ratioTitle}
						</span>
						<span className='font-mono text-muted-foreground text-xs'>
							{config.aspectRatio ?? '1:1'}
						</span>
					</div>
					<div className='grid grid-cols-2 gap-1.5'>
						{aspectRatios.map((item) => {
							const isSelected = (config.aspectRatio ?? '1:1') === item.id;
							return (
								<Button
									key={item.id}
									type='button'
									variant={isSelected ? 'default' : 'outline'}
									size='sm'
									disabled={disabled}
									onClick={() => handleAspectRatioChange(item.id)}
									className='h-auto w-full min-w-0 items-center justify-between px-2.5 py-1.5 text-left'
								>
									<span className='font-bold font-mono text-xs'>
										{item.label}
									</span>
									<span
										className={`truncate text-xs ${
											isSelected
												? 'font-normal text-primary-foreground/90'
												: 'text-muted-foreground opacity-80'
										}`}
									>
										{item.desc}
									</span>
								</Button>
							);
						})}
					</div>
				</div>
			)}

			{/* Number of Pins */}
			<div className='flex flex-col gap-1.5'>
				<div className='flex items-center justify-between text-xs'>
					<span className='flex items-center gap-1.5 font-medium text-foreground'>
						{isRect ? (
							<Square className='size-3.5 shrink-0 text-primary' />
						) : (
							<Circle className='size-3.5 shrink-0 text-primary' />
						)}
						{t.loom.pinsTitle}
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
					onValueChange={(values) =>
						onChange({ ...config, pinCount: values[0] })
					}
				/>
				<span className='text-muted-foreground text-xs leading-tight opacity-80'>
					{isRect ? t.loom.pinsRectDesc : t.loom.pinsCircleDesc}
				</span>
			</div>

			{/* Physical Dimensions */}
			<div className='flex flex-col gap-1.5'>
				<div className='flex items-center justify-between text-xs'>
					<span className='flex items-center gap-1.5 font-medium text-foreground'>
						<Ruler className='size-3.5 shrink-0 text-primary' />
						{isRect ? t.loom.diameterRectTitle : t.loom.diameterTitle}
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
					onValueChange={(values) =>
						onChange({ ...config, physicalDiameterCm: values[0] })
					}
				/>
				<span className='text-muted-foreground text-xs leading-tight opacity-80'>
					{t.loom.diameterDesc}
				</span>
			</div>
		</div>
	);
}
