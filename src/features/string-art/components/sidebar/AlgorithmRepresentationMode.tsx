'use client';

import { Moon, Sun } from 'lucide-react';
import { useTranslation } from '@/shared/i18n';
import { Button } from '@/shared/ui/button';

interface AlgorithmRepresentationModeProps {
	colorMode: 'dark-on-light' | 'light-on-dark';
	disabled?: boolean;
	onModeChange: (mode: 'dark-on-light' | 'light-on-dark') => void;
}

export function AlgorithmRepresentationMode({
	colorMode,
	disabled = false,
	onModeChange,
}: Readonly<AlgorithmRepresentationModeProps>) {
	const { t } = useTranslation();
	const isLightOnDark = colorMode === 'light-on-dark';

	return (
		<div className='flex flex-col gap-1.5'>
			<span className='font-medium text-foreground text-xs'>
				{t.engine.colorModeTitle}
			</span>
			<div className='grid grid-cols-2 gap-1.5'>
				<Button
					type='button'
					variant={!isLightOnDark ? 'default' : 'outline'}
					size='sm'
					disabled={disabled}
					onClick={() => onModeChange('dark-on-light')}
					className='h-auto w-full min-w-0 flex-col items-start whitespace-normal p-2 text-left'
				>
					<span className='flex items-center gap-1.5 font-semibold text-xs'>
						<Sun className='size-3.5 shrink-0 text-amber-500' />
						<span className='truncate'>{t.engine.subtractive}</span>
					</span>
					<span
						className={`break-words text-xs leading-tight ${
							!isLightOnDark
								? 'font-normal text-primary-foreground/90'
								: 'text-muted-foreground opacity-85'
						}`}
					>
						{t.engine.subtractiveDesc}
					</span>
				</Button>

				<Button
					type='button'
					variant={isLightOnDark ? 'default' : 'outline'}
					size='sm'
					disabled={disabled}
					onClick={() => onModeChange('light-on-dark')}
					className='h-auto w-full min-w-0 flex-col items-start whitespace-normal p-2 text-left'
				>
					<span className='flex items-center gap-1.5 font-semibold text-xs'>
						<Moon className='size-3.5 shrink-0 text-indigo-400' />
						<span className='truncate'>{t.engine.additive}</span>
					</span>
					<span
						className={`break-words text-xs leading-tight ${
							isLightOnDark
								? 'font-normal text-primary-foreground/90'
								: 'text-muted-foreground opacity-85'
						}`}
					>
						{t.engine.additiveDesc}
					</span>
				</Button>
			</div>
		</div>
	);
}
