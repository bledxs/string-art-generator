'use client';

import { useEffect, useState } from 'react';

export interface MousePosition {
	x: number;
	y: number;
}

export function useMousePosition(): MousePosition {
	const [mousePosition, setMousePosition] = useState<MousePosition>({
		x: 0,
		y: 0,
	});

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			setMousePosition({ x: event.clientX, y: event.clientY });
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	return mousePosition;
}

export interface Circle {
	x: number;
	y: number;
	translateX: number;
	translateY: number;
	size: number;
	alpha: number;
	targetAlpha: number;
	dx: number;
	dy: number;
	magnetism: number;
}

export function hexToRgb(hex: string): [number, number, number] {
	let clean = hex.replace('#', '');
	if (clean.length === 3) {
		clean = clean
			.split('')
			.map((char) => char + char)
			.join('');
	}
	const hexInt = Number.parseInt(clean, 16);
	if (Number.isNaN(hexInt)) {
		return [245, 158, 11]; // default amber
	}
	const red = (hexInt >> 16) & 255;
	const green = (hexInt >> 8) & 255;
	const blue = hexInt & 255;
	return [red, green, blue];
}

export function remapValue(
	value: number,
	start1: number,
	end1: number,
	start2: number,
	end2: number,
): number {
	const remapped =
		((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
	return remapped > 0 ? remapped : 0;
}
