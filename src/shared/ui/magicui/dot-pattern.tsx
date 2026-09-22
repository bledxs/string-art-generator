'use client';

import { motion } from 'motion/react';
import type * as React from 'react';
import { useEffect, useId, useRef, useState } from 'react';

import { cn } from '@/shared/utils/cn';

export interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
	width?: number;
	height?: number;
	x?: number;
	y?: number;
	cx?: number;
	cy?: number;
	cr?: number;
	className?: string;
	glow?: boolean;
}

/**
 * Magic UI - DotPattern
 * SVG background dot pattern with optional pulsing glow.
 */
export function DotPattern({
	width = 24,
	height = 24,
	x = 0,
	y = 0,
	cx = 1,
	cy = 1,
	cr = 1,
	className,
	glow = false,
	...props
}: Readonly<DotPatternProps>) {
	const id = useId();
	const containerRef = useRef<SVGSVGElement>(null);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	useEffect(() => {
		const updateDimensions = () => {
			if (containerRef.current) {
				const { width: w, height: h } =
					containerRef.current.getBoundingClientRect();
				setDimensions({ width: w, height: h });
			}
		};

		updateDimensions();
		window.addEventListener('resize', updateDimensions);
		return () => {
			window.removeEventListener('resize', updateDimensions);
		};
	}, []);

	const cols = Math.ceil((dimensions.width || 800) / width);
	const rows = Math.ceil((dimensions.height || 600) / height);
	const totalDots = Math.min(cols * rows, 500);

	const dots = Array.from({ length: totalDots }, (_, i) => {
		const col = i % cols;
		const row = Math.floor(i / cols);
		return {
			x: col * width + cx + x,
			y: row * height + cy + y,
			delay: (i % 7) * 0.4,
			duration: 2.5 + (i % 5) * 0.5,
		};
	});

	return (
		<svg
			ref={containerRef}
			aria-hidden='true'
			className={cn(
				'pointer-events-none absolute inset-0 size-full text-foreground/10',
				className,
			)}
			{...props}
		>
			<defs>
				<radialGradient id={`${id}-gradient`}>
					<stop offset='0%' stopColor='currentColor' stopOpacity='1' />
					<stop offset='100%' stopColor='currentColor' stopOpacity='0' />
				</radialGradient>
			</defs>
			{dots.map((dot) => (
				<motion.circle
					key={`${dot.x}-${dot.y}`}
					cx={dot.x}
					cy={dot.y}
					r={cr}
					fill={glow ? `url(#${id}-gradient)` : 'currentColor'}
					initial={glow ? { opacity: 0.3, scale: 1 } : undefined}
					animate={
						glow
							? {
									opacity: [0.3, 0.9, 0.3],
									scale: [1, 1.4, 1],
								}
							: undefined
					}
					transition={
						glow
							? {
									duration: dot.duration,
									repeat: Number.POSITIVE_INFINITY,
									repeatType: 'reverse',
									delay: dot.delay,
									ease: 'easeInOut',
								}
							: undefined
					}
				/>
			))}
		</svg>
	);
}
