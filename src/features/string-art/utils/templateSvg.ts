import type { LoomConfig } from '../types';
import {
	calculatePhysicalLoomMetrics,
	calculatePhysicalPins,
	type PhysicalPin,
} from './templateMetrics';

export function generateLoomTemplateSvg(loom: LoomConfig): string {
	const metrics = calculatePhysicalLoomMetrics(loom);
	const padX = 35;
	const padY = 45;
	const totalW = metrics.widthMm + padX * 2;
	const totalH = metrics.heightMm + padY * 2 + 35;
	const cx = totalW / 2;
	const cy = padY + metrics.heightMm / 2;
	const pins = calculatePhysicalPins(metrics, cx, cy);

	const specsText =
		metrics.shape === 'circle'
			? `Circular Loom | Ø ${(metrics.widthMm / 10).toFixed(1)} cm | ${metrics.pinCount} Pins | Spacing: ${metrics.pinSpacingMm.toFixed(2)} mm`
			: `Rectangular Loom (${metrics.aspectRatio}) | ${(metrics.widthMm / 10).toFixed(1)} × ${(metrics.heightMm / 10).toFixed(1)} cm | ${metrics.pinCount} Pins`;

	const outline =
		metrics.shape === 'circle'
			? `<circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="${metrics.radiusMm.toFixed(2)}" fill="none" stroke="#cbd5e1" stroke-width="0.4" stroke-dasharray="2 2" />`
			: `<rect x="${(cx - metrics.widthMm / 2).toFixed(2)}" y="${(cy - metrics.heightMm / 2).toFixed(2)}" width="${metrics.widthMm.toFixed(2)}" height="${metrics.heightMm.toFixed(2)}" fill="none" stroke="#cbd5e1" stroke-width="0.4" stroke-dasharray="2 2" />`;

	const pinElements = renderSvgPins(pins);
	const calY = cy + metrics.heightMm / 2 + 25;
	const calBar = renderSvgCalibrationBar(cx, calY);

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalW.toFixed(1)} ${totalH.toFixed(1)}" width="${totalW.toFixed(1)}mm" height="${totalH.toFixed(1)}mm">
  <rect width="100%" height="100%" fill="#ffffff" />
  <text x="${cx.toFixed(1)}" y="18" font-family="Helvetica, Arial, sans-serif" font-size="5.5" font-weight="bold" text-anchor="middle" fill="#0f172a">STRING ART STUDIO - DRILLING TEMPLATE</text>
  <text x="${cx.toFixed(1)}" y="25" font-family="Helvetica, Arial, sans-serif" font-size="3.2" text-anchor="middle" fill="#64748b">${specsText}</text>
  <line x1="${(cx - 8).toFixed(1)}" y1="${cy.toFixed(1)}" x2="${(cx + 8).toFixed(1)}" y2="${cy.toFixed(1)}" stroke="#cbd5e1" stroke-width="0.3" />
  <line x1="${cx.toFixed(1)}" y1="${(cy - 8).toFixed(1)}" x2="${cx.toFixed(1)}" y2="${(cy + 8).toFixed(1)}" stroke="#cbd5e1" stroke-width="0.3" />
  ${outline}
  ${pinElements}
  ${calBar}
</svg>`;
}

function renderSvgPins(pins: PhysicalPin[]): string {
	return pins
		.map((p) => {
			const isMajor = p.id % 10 === 0;
			const isMid = p.id % 5 === 0;
			const tickLen = isMajor ? 4.5 : isMid ? 3.0 : 1.5;
			const tx2 = p.x + p.nx * tickLen;
			const ty2 = p.y + p.ny * tickLen;
			const pinDot = `<circle cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="0.4" fill="#0f172a" />`;
			const tick = `<line x1="${p.x.toFixed(2)}" y1="${p.y.toFixed(2)}" x2="${tx2.toFixed(2)}" y2="${ty2.toFixed(2)}" stroke="#334155" stroke-width="${isMajor ? 0.35 : 0.2}" />`;

			let label = '';
			if (p.id === 0) {
				const lx = p.x + p.nx * (tickLen + 3);
				const ly = p.y + p.ny * (tickLen + 3);
				label = `<circle cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="1.8" fill="none" stroke="#2563eb" stroke-width="0.6" /><text x="${lx.toFixed(2)}" y="${ly.toFixed(2)}" font-family="Helvetica, Arial, sans-serif" font-size="2.6" font-weight="bold" fill="#2563eb" text-anchor="middle" dominant-baseline="central">PIN 0 (TOP)</text>`;
			} else if (isMajor) {
				const lx = p.x + p.nx * (tickLen + 2.5);
				const ly = p.y + p.ny * (tickLen + 2.5);
				label = `<text x="${lx.toFixed(2)}" y="${ly.toFixed(2)}" font-family="monospace" font-size="2.2" fill="#475569" text-anchor="middle" dominant-baseline="central">${p.id}</text>`;
			}
			return `${pinDot}${tick}${label}`;
		})
		.join('\n  ');
}

function renderSvgCalibrationBar(cx: number, y: number): string {
	const x0 = cx - 25;
	const x1 = cx + 25;
	const ticks = [0, 10, 20, 30, 40, 50]
		.map(
			(mm) =>
				`<line x1="${(x0 + mm).toFixed(1)}" y1="${y}" x2="${(x0 + mm).toFixed(1)}" y2="${y - (mm % 25 === 0 ? 3.5 : 2)}" stroke="#0f172a" stroke-width="0.3" />`,
		)
		.join('');

	return `<g>
    <line x1="${x0.toFixed(1)}" y1="${y}" x2="${x1.toFixed(1)}" y2="${y}" stroke="#0f172a" stroke-width="0.5" />
    ${ticks}
    <text x="${cx.toFixed(1)}" y="${y + 4.5}" font-family="Helvetica, Arial, sans-serif" font-size="2.4" font-weight="bold" text-anchor="middle" fill="#0f172a">50 mm CALIBRATION SCALE BAR</text>
    <text x="${cx.toFixed(1)}" y="${y + 8}" font-family="Helvetica, Arial, sans-serif" font-size="1.9" text-anchor="middle" fill="#64748b">Measure with physical ruler. Ensure print scaling is 100% (Do NOT scale to fit page).</text>
  </g>`;
}
