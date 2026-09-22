'use client';

import type React from 'react';
import { useEffect, useRef } from 'react';
import { cn } from '@/shared/utils/cn';
import {
	type Circle,
	hexToRgb,
	remapValue,
	useMousePosition,
} from './particles.utils';

export interface ParticlesProps extends React.ComponentPropsWithoutRef<'div'> {
	className?: string;
	quantity?: number;
	staticity?: number;
	ease?: number;
	size?: number;
	refresh?: boolean;
	color?: string;
	vx?: number;
	vy?: number;
}

/**
 * Magic UI - Particles
 * Interactive particle canvas background responding to cursor movement.
 */
export function Particles({
	className = '',
	quantity = 60,
	staticity = 50,
	ease = 50,
	size = 0.5,
	refresh = false,
	color = '#f59e0b',
	vx = 0,
	vy = 0,
	...props
}: Readonly<ParticlesProps>) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const canvasContainerRef = useRef<HTMLDivElement>(null);
	const context = useRef<CanvasRenderingContext2D | null>(null);
	const circles = useRef<Circle[]>([]);
	const mousePosition = useMousePosition();
	const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
	const rafID = useRef<number | null>(null);
	const resizeTimeout = useRef<NodeJS.Timeout | null>(null);

	const rgb = hexToRgb(color);

	const circleParams = (): Circle => {
		const x = Math.floor(Math.random() * canvasSize.current.w);
		const y = Math.floor(Math.random() * canvasSize.current.h);
		const pSize = Math.floor(Math.random() * 2) + size;
		const targetAlpha = Number.parseFloat(
			(Math.random() * 0.5 + 0.1).toFixed(2),
		);
		const dx = (Math.random() - 0.5) * 0.15;
		const dy = (Math.random() - 0.5) * 0.15;
		const magnetism = 0.1 + Math.random() * 3.5;
		return {
			x,
			y,
			translateX: 0,
			translateY: 0,
			size: pSize,
			alpha: 0,
			targetAlpha,
			dx,
			dy,
			magnetism,
		};
	};

	const drawCircle = (circle: Circle, update = false) => {
		if (context.current) {
			const { x, y, translateX, translateY, size: circleSize, alpha } = circle;
			context.current.translate(translateX, translateY);
			context.current.beginPath();
			context.current.arc(x, y, circleSize, 0, 2 * Math.PI);
			context.current.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
			context.current.fill();
			context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

			if (!update) {
				circles.current.push(circle);
			}
		}
	};

	const clearContext = () => {
		if (context.current) {
			context.current.clearRect(
				0,
				0,
				canvasSize.current.w,
				canvasSize.current.h,
			);
		}
	};

	const drawParticles = () => {
		clearContext();
		circles.current = [];
		for (let i = 0; i < quantity; i++) {
			const circle = circleParams();
			drawCircle(circle);
		}
	};

	const resizeCanvas = () => {
		if (canvasContainerRef.current && canvasRef.current && context.current) {
			canvasSize.current.w = canvasContainerRef.current.offsetWidth;
			canvasSize.current.h = canvasContainerRef.current.offsetHeight;

			canvasRef.current.width = canvasSize.current.w * dpr;
			canvasRef.current.height = canvasSize.current.h * dpr;
			canvasRef.current.style.width = `${canvasSize.current.w}px`;
			canvasRef.current.style.height = `${canvasSize.current.h}px`;
			context.current.scale(dpr, dpr);

			drawParticles();
		}
	};

	const initCanvas = () => {
		resizeCanvas();
		drawParticles();
	};

	const onMouseMove = () => {
		if (canvasRef.current) {
			const rect = canvasRef.current.getBoundingClientRect();
			const { w, h } = canvasSize.current;
			const x = mousePosition.x - rect.left - w / 2;
			const y = mousePosition.y - rect.top - h / 2;
			const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
			if (inside) {
				mouse.current.x = x;
				mouse.current.y = y;
			}
		}
	};

	const animate = () => {
		clearContext();
		const currentCircles = circles.current;
		for (let i = 0; i < currentCircles.length; i++) {
			const circle = currentCircles[i];
			const edge = [
				circle.x + circle.translateX - circle.size,
				canvasSize.current.w - circle.x - circle.translateX - circle.size,
				circle.y + circle.translateY - circle.size,
				canvasSize.current.h - circle.y - circle.translateY - circle.size,
			];
			const closestEdge = Math.min(...edge);
			const remapClosestEdge = Number.parseFloat(
				remapValue(closestEdge, 0, 20, 0, 1).toFixed(2),
			);
			if (remapClosestEdge > 1) {
				circle.alpha += 0.02;
				if (circle.alpha > circle.targetAlpha) {
					circle.alpha = circle.targetAlpha;
				}
			} else {
				circle.alpha = circle.targetAlpha * remapClosestEdge;
			}
			circle.x += circle.dx + vx;
			circle.y += circle.dy + vy;
			circle.translateX +=
				(mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
				ease;
			circle.translateY +=
				(mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
				ease;

			drawCircle(circle, true);

			if (
				circle.x < -circle.size ||
				circle.x > canvasSize.current.w + circle.size ||
				circle.y < -circle.size ||
				circle.y > canvasSize.current.h + circle.size
			) {
				currentCircles.splice(i, 1);
				const newCircle = circleParams();
				drawCircle(newCircle);
			}
		}
		rafID.current = window.requestAnimationFrame(animate);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: onMouseMove depends on mouse position
	useEffect(() => {
		onMouseMove();
	}, [mousePosition.x, mousePosition.y]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: refresh canvas
	useEffect(() => {
		initCanvas();
	}, [refresh]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: init & animation loop
	useEffect(() => {
		if (canvasRef.current) {
			context.current = canvasRef.current.getContext('2d');
		}
		initCanvas();
		animate();

		const handleResize = () => {
			if (resizeTimeout.current) {
				clearTimeout(resizeTimeout.current);
			}
			resizeTimeout.current = setTimeout(() => {
				initCanvas();
			}, 200);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			if (rafID.current !== null) {
				window.cancelAnimationFrame(rafID.current);
			}
			if (resizeTimeout.current) {
				clearTimeout(resizeTimeout.current);
			}
			window.removeEventListener('resize', handleResize);
		};
	}, [color]);

	return (
		<div
			className={cn(
				'pointer-events-none absolute inset-0 size-full',
				className,
			)}
			ref={canvasContainerRef}
			aria-hidden='true'
			{...props}
		>
			<canvas ref={canvasRef} className='size-full' />
		</div>
	);
}
