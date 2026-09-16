'use client';

import type * as React from 'react';
import { cn } from '@/shared/utils/cn';
import type { CanvasTransform } from '../../hooks/useCanvasTransform';

interface CanvasViewportProps {
	transform: CanvasTransform;
	isDragging: boolean;
	onMouseDown: (e: React.MouseEvent) => void;
	onMouseMove: (e: React.MouseEvent) => void;
	onMouseUp: () => void;
	onWheel: (e: React.WheelEvent) => void;
	children: React.ReactNode;
}

export function CanvasViewport({
	transform,
	isDragging,
	onMouseDown,
	onMouseMove,
	onMouseUp,
	onWheel,
	children,
}: Readonly<CanvasViewportProps>) {
	return (
		<section
			aria-label='Lienzo interactivo de String Art'
			className={cn(
				'studio-grid relative flex size-full flex-1 select-none items-center justify-center overflow-hidden',
				isDragging ? 'cursor-grabbing' : 'cursor-grab',
			)}
			onMouseDown={onMouseDown}
			onMouseMove={onMouseMove}
			onMouseUp={onMouseUp}
			onMouseLeave={onMouseUp}
			onWheel={onWheel}
		>
			<div
				className='flex items-center justify-center transition-transform duration-75 ease-out will-change-transform'
				style={{
					transform: `translate3d(${transform.offsetX}px, ${transform.offsetY}px, 0) scale(${transform.scale})`,
				}}
			>
				{children}
			</div>
		</section>
	);
}
