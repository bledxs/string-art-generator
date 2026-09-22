'use client';

import type * as React from 'react';
import { Particles } from '@/shared/ui/magicui';
import { cn } from '@/shared/utils/cn';
import type { CanvasTransform } from '../../hooks/useCanvasTransform';

interface CanvasViewportProps {
	containerRef?: React.RefObject<HTMLElement | null>;
	transform: CanvasTransform;
	isDragging: boolean;
	onMouseDown: (e: React.MouseEvent) => void;
	onMouseMove: (e: React.MouseEvent) => void;
	onMouseUp: () => void;
	onTouchStart?: (e: React.TouchEvent) => void;
	onTouchMove?: (e: React.TouchEvent) => void;
	onTouchEnd?: () => void;
	children: React.ReactNode;
}

export function CanvasViewport({
	containerRef,
	transform,
	isDragging,
	onMouseDown,
	onMouseMove,
	onMouseUp,
	onTouchStart,
	onTouchMove,
	onTouchEnd,
	children,
}: Readonly<CanvasViewportProps>) {
	return (
		<section
			ref={containerRef}
			aria-label='Lienzo interactivo de String Art'
			className={cn(
				'studio-grid relative flex size-full flex-1 touch-none select-none items-center justify-center overflow-hidden overscroll-contain bg-canvas-bg',
				isDragging ? 'cursor-grabbing' : 'cursor-grab',
			)}
			onMouseDown={onMouseDown}
			onMouseMove={onMouseMove}
			onMouseUp={onMouseUp}
			onMouseLeave={onMouseUp}
			onTouchStart={onTouchStart}
			onTouchMove={onTouchMove}
			onTouchEnd={onTouchEnd}
			onTouchCancel={onTouchEnd}
		>
			<div className='studio-spotlight pointer-events-none absolute inset-0 z-0' />
			<Particles
				className='pointer-events-none absolute inset-0 z-0'
				quantity={50}
				size={0.6}
				color='#f59e0b'
				ease={50}
			/>
			<div
				className='relative z-10 flex items-center justify-center transition-transform duration-75 ease-out will-change-transform'
				style={{
					transform: `translate3d(${transform.offsetX}px, ${transform.offsetY}px, 0) scale(${transform.scale})`,
				}}
			>
				{children}
			</div>
		</section>
	);
}
