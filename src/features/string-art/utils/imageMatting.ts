export interface MattingOptions {
	enableRadialFeather?: boolean;
	featherStrength?: number; // 0 to 100
	isolateSubject?: boolean;
	isolationTolerance?: number; // 10 to 60
	isLightOnDark?: boolean;
}

export function applyRadialVignette(
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number,
	strength: number,
	isLightOnDark = false,
): void {
	if (strength <= 0) return;

	const centerX = width / 2;
	const centerY = height / 2;
	const maxRadius = Math.min(centerX, centerY);
	const startRatio = Math.max(0.3, 1 - (strength / 100) * 0.6);
	const innerRadius = maxRadius * startRatio;

	const gradient = ctx.createRadialGradient(
		centerX,
		centerY,
		innerRadius,
		centerX,
		centerY,
		maxRadius,
	);

	const targetColor = isLightOnDark ? '9, 9, 11' : '255, 255, 255';
	gradient.addColorStop(0, `rgba(${targetColor}, 0)`);
	gradient.addColorStop(0.7, `rgba(${targetColor}, 0.65)`);
	gradient.addColorStop(1, `rgba(${targetColor}, 1)`);

	ctx.save();
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, width, height);
	ctx.restore();
}

function sampleCornerLuminance(
	data: Uint8ClampedArray,
	width: number,
	height: number,
): number {
	const sampleOffsets = [
		4 * (2 * width + 2),
		4 * (2 * width + (width - 3)),
		4 * ((height - 3) * width + 2),
		4 * ((height - 3) * width + (width - 3)),
	];

	let totalLum = 0;
	for (const offset of sampleOffsets) {
		const r = data[offset];
		const g = data[offset + 1];
		const b = data[offset + 2];
		totalLum += 0.299 * r + 0.587 * g + 0.114 * b;
	}
	return totalLum / sampleOffsets.length;
}

export function applySmartSubjectMatting(
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number,
	tolerance = 35,
	isLightOnDark = false,
): void {
	const imgData = ctx.getImageData(0, 0, width, height);
	const data = imgData.data;
	const bgLum = sampleCornerLuminance(data, width, height);
	const centerX = width / 2;
	const centerY = height / 2;
	const safeCoreRadius = (width / 2) * 0.35;
	const targetVal = isLightOnDark ? 0 : 255;

	for (let y = 0; y < height; y++) {
		const dy = y - centerY;
		for (let x = 0; x < width; x++) {
			const dx = x - centerX;
			const dist = Math.hypot(dx, dy);
			if (dist < safeCoreRadius) continue;

			const idx = (y * width + x) * 4;
			const lum =
				0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
			const diff = Math.abs(lum - bgLum);

			if (diff < tolerance) {
				const blendWeight = Math.min(
					1,
					((dist - safeCoreRadius) / safeCoreRadius) * (1 - diff / tolerance),
				);
				data[idx] = Math.round(
					data[idx] * (1 - blendWeight) + targetVal * blendWeight,
				);
				data[idx + 1] = Math.round(
					data[idx + 1] * (1 - blendWeight) + targetVal * blendWeight,
				);
				data[idx + 2] = Math.round(
					data[idx + 2] * (1 - blendWeight) + targetVal * blendWeight,
				);
			}
		}
	}

	ctx.putImageData(imgData, 0, 0);
}

export function processCroppedImageMatting(
	canvas: HTMLCanvasElement,
	options: MattingOptions,
): void {
	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	if (options.isolateSubject) {
		applySmartSubjectMatting(
			ctx,
			canvas.width,
			canvas.height,
			options.isolationTolerance ?? 35,
			options.isLightOnDark ?? false,
		);
	}

	if (options.enableRadialFeather && (options.featherStrength ?? 0) > 0) {
		applyRadialVignette(
			ctx,
			canvas.width,
			canvas.height,
			options.featherStrength ?? 40,
			options.isLightOnDark ?? false,
		);
	}
}
