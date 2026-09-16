'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import type * as React from 'react';
import { cn } from '../utils/cn';

export function Slider({
	className,
	...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
	return (
		<SliderPrimitive.Root
			className={cn(
				'relative flex w-full touch-none select-none items-center',
				className,
			)}
			{...props}
		>
			<SliderPrimitive.Track className='relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary'>
				<SliderPrimitive.Range className='absolute h-full bg-primary' />
			</SliderPrimitive.Track>
			<SliderPrimitive.Thumb className='block size-4 cursor-grab rounded-full border border-primary/50 bg-background shadow-sm transition-colors hover:scale-110 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring active:scale-95 disabled:pointer-events-none disabled:opacity-50' />
		</SliderPrimitive.Root>
	);
}
