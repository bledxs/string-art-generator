'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { calculateFitScale, calculateZoom } from '../utils/canvasTransform';

export interface CanvasTransform {
	scale: number;
	offsetX: number;
	offsetY: number;
}

export function useCanvasTransform(contentSize = 700) {
	const containerRef = useRef<HTMLElement | null>(null);
	const [transform, setTransform] = useState<CanvasTransform>({
		scale: 1,
		offsetX: 0,
		offsetY: 0,
	});
	const [isDragging, setIsDragging] = useState(false);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

	const fitToScreen = useCallback(() => {
		const el = containerRef.current;
		if (!el) return;
		const scale = calculateFitScale(
			el.clientWidth,
			el.clientHeight,
			contentSize,
		);
		setTransform({ scale, offsetX: 0, offsetY: 0 });
	}, [contentSize]);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;
		fitToScreen();

		const observer = new ResizeObserver(() => fitToScreen());
		observer.observe(el);
		return () => observer.disconnect();
	}, [fitToScreen]);

	const zoomIn = useCallback(() => {
		setTransform((p) => ({ ...p, scale: calculateZoom(p.scale, 'in') }));
	}, []);

	const zoomOut = useCallback(() => {
		setTransform((p) => ({ ...p, scale: calculateZoom(p.scale, 'out') }));
	}, []);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		const handleNativeWheel = (e: WheelEvent) => {
			e.preventDefault();
			const factor = e.deltaY < 0 ? 1.1 : 0.9;
			setTransform((p) => ({
				...p,
				scale: Math.min(Math.max(p.scale * factor, 0.2), 5),
			}));
		};

		el.addEventListener('wheel', handleNativeWheel, { passive: false });
		return () => el.removeEventListener('wheel', handleNativeWheel);
	}, []);

	const handlePointerDown = (x: number, y: number) => {
		setIsDragging(true);
		setDragStart({ x, y });
	};

	const handlePointerMove = (x: number, y: number) => {
		if (!isDragging) return;
		setTransform((p) => ({
			...p,
			offsetX: p.offsetX + (x - dragStart.x),
			offsetY: p.offsetY + (y - dragStart.y),
		}));
		setDragStart({ x, y });
	};

	return {
		containerRef,
		transform,
		isDragging,
		zoomIn,
		zoomOut,
		resetTransform: fitToScreen,
		fitToScreen,
		onMouseDown: (e: React.MouseEvent) =>
			e.button === 0 && handlePointerDown(e.clientX, e.clientY),
		onMouseMove: (e: React.MouseEvent) =>
			handlePointerMove(e.clientX, e.clientY),
		onMouseUp: () => setIsDragging(false),
		onTouchStart: (e: React.TouchEvent) =>
			e.touches.length === 1 &&
			handlePointerDown(e.touches[0].clientX, e.touches[0].clientY),
		onTouchMove: (e: React.TouchEvent) =>
			e.touches.length === 1 &&
			handlePointerMove(e.touches[0].clientX, e.touches[0].clientY),
		onTouchEnd: () => setIsDragging(false),
	};
}
