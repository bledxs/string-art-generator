'use client';

import * as React from 'react';
import { BorderBeam } from '@/shared/ui/magicui/border-beam';
import { cn } from '@/shared/utils/cn';

export interface ShimmerButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	shimmerColor?: string;
	shimmerSize?: number;
	shimmerDuration?: number;
	className?: string;
	children?: React.ReactNode;
}

/**
 * Magic UI - ShimmerButton
 * Interactive button with a fluid perimeter light beam and surface sheen sweep.
 */
export const ShimmerButton = React.forwardRef<
	HTMLButtonElement,
	ShimmerButtonProps
>(
	(
		{
			shimmerColor = '#ffffff',
			shimmerSize = 60,
			shimmerDuration = 3.5,
			className,
			children,
			...props
		},
		ref,
	) => {
		return (
			<button
				ref={ref}
				className={cn(
					'relative inline-flex h-10 cursor-pointer select-none items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md bg-primary px-6 font-medium text-primary-foreground text-sm shadow-xs transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring active:translate-y-px disabled:pointer-events-none disabled:opacity-50',
					className,
				)}
				{...props}
			>
				{/* Perimeter Shimmer Beam */}
				<BorderBeam
					size={shimmerSize}
					duration={shimmerDuration}
					colorFrom={shimmerColor}
					colorTo='transparent'
					borderWidth={1.5}
				/>

				{/* Surface Sheen Sweep */}
				<span
					aria-hidden='true'
					className='pointer-events-none absolute inset-0 -translate-x-full animate-shimmer-sweep bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/25'
				/>

				{/* Button content */}
				<span className='relative z-10 flex items-center justify-center gap-2'>
					{children}
				</span>
			</button>
		);
	},
);

ShimmerButton.displayName = 'ShimmerButton';
