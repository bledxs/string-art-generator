import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';
import { cn } from '../utils/cn';

export const badgeVariants = cva(
	'inline-flex items-center rounded-full border px-2 py-0.5 font-semibold text-[11px] transition-colors focus:outline-none focus:ring-1 focus:ring-ring',
	{
		variants: {
			variant: {
				default:
					'border-transparent bg-primary text-primary-foreground shadow-xs',
				secondary:
					'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
				destructive:
					'border-transparent bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/80',
				outline: 'text-foreground',
				accent:
					'border-primary/20 bg-primary/10 font-mono text-[10px] text-primary',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}
