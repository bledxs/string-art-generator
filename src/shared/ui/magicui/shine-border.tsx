'use client';

import type * as React from 'react';

import { cn } from '@/shared/utils/cn';

export interface ShineBorderProps extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * Width of the border in pixels
	 * @default 1
	 */
	borderWidth?: number;
	/**
	 * Duration of the animation in seconds
	 * @default 8
	 */
	duration?: number;
	/**
	 * Color of the border, can be a single color or an array of colors
	 * @default ["#ffaa40", "#9c40ff", "#ffaa40"]
	 */
	shineColor?: string | string[];
}

/**
 * Magic UI - ShineBorder
 * Animated background border glow effect.
 */
export function ShineBorder({
	borderWidth = 1,
	duration = 8,
	shineColor = ['#ffaa40', '#9c40ff', '#ffaa40'],
	className,
	style,
	...props
}: Readonly<ShineBorderProps>) {
	const colors = Array.isArray(shineColor) ? shineColor.join(',') : shineColor;

	const borderStyle: React.CSSProperties &
		Record<string, string | number | undefined> = {
		'--duration': `${duration}s`,
		backgroundImage: `radial-gradient(transparent, transparent, ${colors}, transparent, transparent)`,
		backgroundSize: '300% 300%',
		mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
		WebkitMask:
			'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
		WebkitMaskComposite: 'xor',
		maskComposite: 'exclude',
		padding: `${borderWidth}px`,
		borderRadius: 'inherit',
		willChange: 'background-position',
		...style,
	};

	return (
		<div
			style={borderStyle}
			className={cn(
				'pointer-events-none absolute inset-0 size-full animate-shine',
				className,
			)}
			{...props}
		/>
	);
}
