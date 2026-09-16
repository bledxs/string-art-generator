'use client';

import type * as React from 'react';
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
	onWheel: (e: React.WheelEvent) => void;
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
	onWheel,
	children,
}: Readonly<CanvasViewportProps>) {
	return (
		<section
			ref={containerRef}
			aria-label='Lienzo interactivo de String Art'
			className={cn(
				'studio-grid relative flex size-full flex-1 touch-none select-none items-center justify-center overflow-hidden',
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
