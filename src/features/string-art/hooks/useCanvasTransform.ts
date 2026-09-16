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
		setTransform((prev) => ({
			...prev,
			scale: Math.min(prev.scale * 1.25, 5),
		}));
	}, []);

	const zoomOut = useCallback(() => {
		setTransform((prev) => ({
			...prev,
			scale: Math.max(prev.scale / 1.25, 0.2),
		}));
	}, []);

	const resetTransform = useCallback(() => {
		setTransform({ scale: 1, offsetX: 0, offsetY: 0 });
	}, []);

	const handleWheel = useCallback((e: React.WheelEvent) => {
		e.preventDefault();
		const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
		setTransform((prev) => ({
			...prev,
			scale: Math.min(Math.max(prev.scale * zoomFactor, 0.2), 5),
		}));
	}, []);

	const handleMouseDown = useCallback((e: React.MouseEvent) => {
		if (e.button !== 0) return; // Only primary button
		setIsDragging(true);
		setDragStart({ x: e.clientX, y: e.clientY });
	}, []);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent) => {
			if (!isDragging) return;
			const dx = e.clientX - dragStart.x;
			const dy = e.clientY - dragStart.y;
			setDragStart({ x: e.clientX, y: e.clientY });
			setTransform((prev) => ({
				...prev,
				offsetX: prev.offsetX + dx,
				offsetY: prev.offsetY + dy,
			}));
		},
		[isDragging, dragStart],
	);

	const handleMouseUp = useCallback(() => {
		setIsDragging(false);
	}, []);

	return {
		transform,
		isDragging,
		zoomIn,
		zoomOut,
		resetTransform,
		handleWheel,
		handleMouseDown,
		handleMouseMove,
		handleMouseUp,
	};
}
