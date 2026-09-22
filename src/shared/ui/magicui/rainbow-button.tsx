'use client';

import * as React from 'react';
import { cn } from '@/shared/utils/cn';

export interface RainbowButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children?: React.ReactNode;
}

/**
 * Magic UI - RainbowButton
 * Button with an animated rainbow gradient border and glow effect.
 */
export const RainbowButton = React.forwardRef<
	HTMLButtonElement,
	RainbowButtonProps
>(({ className, children, style, ...props }, ref) => {
	const rainbowStyle: React.CSSProperties &
		Record<string, string | number | undefined> = {
		'--color-1': 'oklch(66% 0.22 25)',
		'--color-2': 'oklch(60% 0.26 300)',
		'--color-3': 'oklch(70% 0.16 250)',
		'--color-4': 'oklch(80% 0.13 225)',
		'--color-5': 'oklch(90% 0.23 130)',
		backgroundImage:
			'linear-gradient(var(--card), var(--card)), linear-gradient(90deg, var(--color-1), var(--color-5), var(--color-3), var(--color-4), var(--color-2), var(--color-1))',
		backgroundOrigin: 'border-box',
		backgroundClip: 'padding-box, border-box',
		backgroundSize: '100% 100%, 200% 100%',
		border: '2px solid transparent',
		animation: 'rainbow 3s linear infinite',
		...style,
	};

	return (
		<button
			ref={ref}
			style={rainbowStyle}
			className={cn(
				'group relative inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl px-5 py-2.5 font-medium text-foreground text-xs shadow-md transition-all duration-300 hover:shadow-lg active:translate-y-px disabled:pointer-events-none disabled:opacity-50',
				className,
			)}
			{...props}
		>
			<span className='relative z-10 flex items-center justify-center gap-2'>
				{children}
			</span>
		</button>
	);
});

RainbowButton.displayName = 'RainbowButton';
