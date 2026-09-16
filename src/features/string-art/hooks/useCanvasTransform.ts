'use client';

import { useCallback, useState } from 'react';

export interface CanvasTransform {
	scale: number;
	offsetX: number;
	offsetY: number;
}

export function useCanvasTransform(initialScale = 1) {
	const [transform, setTransform] = useState<CanvasTransform>({
		scale: initialScale,
		offsetX: 0,
		offsetY: 0,
	});
	const [isDragging, setIsDragging] = useState(false);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

	const zoomIn = useCallback(() => {
		setTransform((p) => ({ ...p, scale: Math.min(p.scale * 1.25, 5) }));
	}, []);

	const zoomOut = useCallback(() => {
		setTransform((p) => ({ ...p, scale: Math.max(p.scale / 1.25, 0.2) }));
	}, []);

	const resetTransform = useCallback(() => {
		setTransform({ scale: 1, offsetX: 0, offsetY: 0 });
	}, []);

	const handleWheel = useCallback((e: React.WheelEvent) => {
		e.preventDefault();
		const factor = e.deltaY < 0 ? 1.1 : 0.9;
		setTransform((p) => ({
			...p,
			scale: Math.min(Math.max(p.scale * factor, 0.2), 5),
		}));
	}, []);

	const handleMouseDown = useCallback((e: React.MouseEvent) => {
		if (e.button !== 0) return;
		setIsDragging(true);
		setDragStart({ x: e.clientX, y: e.clientY });
	}, []);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent) => {
			if (!isDragging) return;
			const dx = e.clientX - dragStart.x;
			const dy = e.clientY - dragStart.y;
			setDragStart({ x: e.clientX, y: e.clientY });
			setTransform((p) => ({
				...p,
				offsetX: p.offsetX + dx,
				offsetY: p.offsetY + dy,
			}));
		},
		[isDragging, dragStart],
	);

	const handleTouchStart = useCallback((e: React.TouchEvent) => {
		if (e.touches.length !== 1) return;
		setIsDragging(true);
		setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
	}, []);

	const handleTouchMove = useCallback(
		(e: React.TouchEvent) => {
			if (!isDragging || e.touches.length !== 1) return;
			const dx = e.touches[0].clientX - dragStart.x;
			const dy = e.touches[0].clientY - dragStart.y;
			setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
			setTransform((p) => ({
				...p,
				offsetX: p.offsetX + dx,
				offsetY: p.offsetY + dy,
			}));
		},
		[isDragging, dragStart],
	);

	const handleEnd = useCallback(() => {
		setIsDragging(false);
	}, []);

	return {
		transform,
		isDragging,
		zoomIn,
		zoomOut,
		resetTransform,
		onWheel: handleWheel,
		onMouseDown: handleMouseDown,
		onMouseMove: handleMouseMove,
		onMouseUp: handleEnd,
		onTouchStart: handleTouchStart,
		onTouchMove: handleTouchMove,
		onTouchEnd: handleEnd,
	};
}
