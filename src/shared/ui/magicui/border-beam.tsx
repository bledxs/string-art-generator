'use client';

import { type MotionStyle, motion, type Transition } from 'motion/react';
import type * as React from 'react';

import { cn } from '@/shared/utils/cn';

export interface BorderBeamProps {
	/**
	 * The size of the border beam in pixels.
	 * @default 80
	 */
	size?: number;
	/**
	 * The duration of the border beam animation in seconds.
	 * @default 6
	 */
	duration?: number;
	/**
	 * The delay of the border beam animation in seconds.
	 * @default 0
	 */
	delay?: number;
	/**
	 * Start gradient color.
	 * @default "#ffaa40"
	 */
	colorFrom?: string;
	/**
	 * End gradient color.
	 * @default "#9c40ff"
	 */
	colorTo?: string;
	/**
	 * Optional transition override.
	 */
	transition?: Transition;
	/**
	 * Additional class name for the moving beam element.
	 */
	className?: string;
	/**
	 * Additional inline style.
	 */
	style?: React.CSSProperties;
	/**
	 * Whether to reverse the animation direction.
	 * @default false
	 */
	reverse?: boolean;
	/**
	 * The initial offset percentage (0-100).
	 * @default 0
	 */
	initialOffset?: number;
	/**
	 * Border width of the beam in pixels.
	 * @default 1.5
	 */
	borderWidth?: number;
}

/**
 * Magic UI - BorderBeam
 * Animated beam of light traveling strictly along the border of its container.
 * Requires the container to have `relative` positioning and `overflow-hidden`.
 */
export function BorderBeam({
	className,
	size = 80,
	delay = 0,
	duration = 6,
	colorFrom = '#ffaa40',
	colorTo = '#9c40ff',
	transition,
	style,
	reverse = false,
	initialOffset = 0,
	borderWidth = 1.5,
}: Readonly<BorderBeamProps>) {
	const containerStyle: React.CSSProperties = {
		padding: `${borderWidth}px`,
		borderRadius: 'inherit',
		mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
		WebkitMask:
			'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
		maskComposite: 'exclude',
		WebkitMaskComposite: 'xor',
	};

	const beamStyle: MotionStyle & Record<string, string | number | undefined> = {
		width: size,
		height: size,
		offsetPath: `rect(0 auto auto 0 round ${size}px)`,
		backgroundImage: `linear-gradient(to left, ${colorFrom}, ${colorTo}, transparent)`,
		...style,
	};

	return (
		<div
			className='pointer-events-none absolute inset-0 size-full'
			style={containerStyle}
		>
			<motion.div
				className={cn('absolute aspect-square', className)}
				style={beamStyle}
				initial={{ offsetDistance: `${initialOffset}%` }}
				animate={{
					offsetDistance: reverse
						? [`${100 - initialOffset}%`, `${-initialOffset}%`]
						: [`${initialOffset}%`, `${100 + initialOffset}%`],
				}}
				transition={{
					repeat: Number.POSITIVE_INFINITY,
					ease: 'linear',
					duration,
					delay: -delay,
					...transition,
				}}
			/>
		</div>
	);
}
