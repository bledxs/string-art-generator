'use client';

import { useInView, useMotionValue, useSpring } from 'motion/react';
import type * as React from 'react';
import { useEffect, useRef } from 'react';
import { cn } from '@/shared/utils/cn';

export interface NumberTickerProps
	extends React.ComponentPropsWithoutRef<'span'> {
	value: number;
	startValue?: number;
	direction?: 'up' | 'down';
	delay?: number;
	decimalPlaces?: number;
	className?: string;
}

/**
 * Magic UI - NumberTicker
 * Animated number component that smoothly transitions to target value.
 */
export function NumberTicker({
	value,
	startValue = 0,
	direction = 'up',
	delay = 0,
	decimalPlaces = 0,
	className,
	...props
}: Readonly<NumberTickerProps>) {
	const ref = useRef<HTMLSpanElement>(null);
	const motionValue = useMotionValue(direction === 'down' ? value : startValue);
	const springValue = useSpring(motionValue, {
		damping: 60,
		stiffness: 100,
	});
	const isInView = useInView(ref, { once: true, margin: '0px' });

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout> | null = null;

		if (isInView) {
			timer = setTimeout(() => {
				motionValue.set(direction === 'down' ? startValue : value);
			}, delay * 1000);
		}

		return () => {
			if (timer !== null) {
				clearTimeout(timer);
			}
		};
	}, [motionValue, isInView, delay, value, direction, startValue]);

	useEffect(
		() =>
			springValue.on('change', (latest) => {
				if (ref.current) {
					ref.current.textContent = Intl.NumberFormat(undefined, {
						minimumFractionDigits: decimalPlaces,
						maximumFractionDigits: decimalPlaces,
					}).format(Number(latest.toFixed(decimalPlaces)));
				}
			}),
		[springValue, decimalPlaces],
	);

	return (
		<span
			ref={ref}
			className={cn('inline-block tabular-nums tracking-normal', className)}
			{...props}
		>
			{startValue}
		</span>
	);
}
