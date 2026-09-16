// Pure canvas rendering utilities for Nordic Artisan physical materials

export function drawBirchBoard(
	ctx: CanvasRenderingContext2D,
	center: number,
	radius: number,
): void {
	ctx.save();
	// Layered Nordic Birch Plywood outer rim
	ctx.beginPath();
	ctx.arc(center, center, radius * 1.035, 0, Math.PI * 2);
	const rimGradient = ctx.createRadialGradient(
		center - 15,
		center - 20,
		radius * 0.9,
		center,
		center,
		radius * 1.04,
	);
	rimGradient.addColorStop(0, '#ebdccb');
	rimGradient.addColorStop(0.7, '#dfcbba');
	rimGradient.addColorStop(1, '#c5ab94');
	ctx.fillStyle = rimGradient;
	ctx.shadowColor = 'rgba(25, 18, 12, 0.28)';
	ctx.shadowBlur = 24;
	ctx.shadowOffsetY = 8;
	ctx.fill();
	ctx.restore();

	// Main pale birch wood surface
	ctx.save();
	ctx.beginPath();
	ctx.arc(center, center, radius, 0, Math.PI * 2);
	const woodGradient = ctx.createRadialGradient(
		center - 30,
		center - 40,
		radius * 0.1,
		center,
		center,
		radius,
	);
	woodGradient.addColorStop(0, '#fdfbf7');
	woodGradient.addColorStop(0.65, '#f7f1e6');
	woodGradient.addColorStop(1, '#ece0cd');
	ctx.fillStyle = woodGradient;
	ctx.fill();

	// Subtle natural wood growth ring
	ctx.beginPath();
	ctx.arc(center, center, radius * 0.62, 0, Math.PI * 2);
	ctx.strokeStyle = 'rgba(180, 150, 120, 0.07)';
	ctx.lineWidth = 1.5;
	ctx.stroke();
	ctx.restore();
}

export function drawRadialTicks(
	ctx: CanvasRenderingContext2D,
	center: number,
	radius: number,
): void {
	ctx.save();
	ctx.strokeStyle = 'rgba(120, 90, 65, 0.4)';
	const totalTicks = 72; // 5-degree increments

	for (let i = 0; i < totalTicks; i++) {
		const angle = (i * Math.PI * 2) / totalTicks;
		const isMajor = i % 6 === 0;
		const innerR = radius * (isMajor ? 0.965 : 0.98);
		const outerR = radius * 1.015;

		const cos = Math.cos(angle);
		const sin = Math.sin(angle);

		ctx.beginPath();
		ctx.moveTo(center + cos * innerR, center + sin * innerR);
		ctx.lineTo(center + cos * outerR, center + sin * outerR);
		ctx.lineWidth = isMajor ? 1.5 : 0.75;
		ctx.stroke();
	}
	ctx.restore();
}

export function drawBrassPin(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	center: number,
): void {
	// Micro-shadow radiating outward from studio lamp
	const dx = (x - center) / center;
	const dy = (y - center) / center;
	ctx.beginPath();
	ctx.arc(x + dx * 1.2, y + dy * 1.2, 1.8, 0, Math.PI * 2);
	ctx.fillStyle = 'rgba(50, 35, 20, 0.35)';
	ctx.fill();

	// Brass pin head with metallic specular highlight
	ctx.beginPath();
	ctx.arc(x, y, 1.8, 0, Math.PI * 2);
	const brass = ctx.createRadialGradient(x - 0.5, y - 0.5, 0.2, x, y, 1.8);
	brass.addColorStop(0, '#fef08a');
	brass.addColorStop(0.5, '#d97706');
	brass.addColorStop(1, '#78350f');
	ctx.fillStyle = brass;
	ctx.fill();
}
