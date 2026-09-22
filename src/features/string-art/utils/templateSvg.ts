import type { LoomConfig } from '../types';
import {
	BRAND_COLORS,
	calculatePhysicalLoomMetrics,
	getCircularPinPoints,
	getLoomSkillLevel,
	getRectangularPinPoints,
	MM_TO_POINTS,
	type PhysicalLoomMetrics,
	type TemplatePinPoint,
} from './templateMetrics';

const TOP_CLEARANCE = 160;
const FOOTER_RESERVED = 165;

export function generateLoomTemplateSvg(loom: LoomConfig): string {
	const metrics = calculatePhysicalLoomMetrics(loom);
	const [pageW, pageH, cx, cy, radius, halfH] = computeSvgLayout(metrics);

	const headerSvg = renderSvgHeader(metrics, cx);
	const frameSvg = renderSvgFrame(metrics, cx, cy, radius, halfH);
	const pinsSvg = renderSvgPins(metrics, cx, cy, radius);
	const bottomSvg = renderSvgBottomWorkshopZone(cx, cy + halfH, pageW);

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${pageW.toFixed(1)} ${pageH.toFixed(1)}" width="${pageW.toFixed(1)}pt" height="${pageH.toFixed(1)}pt">
  <rect width="100%" height="100%" fill="#ffffff" />
  ${headerSvg}
  ${frameSvg}
  ${pinsSvg}
  ${bottomSvg}
</svg>`;
}

function computeSvgLayout(
	metrics: PhysicalLoomMetrics,
): [number, number, number, number, number, number] {
	const radius = (metrics.widthMm * MM_TO_POINTS) / 2;
	const halfH =
		metrics.shape === 'circle' ? radius : (metrics.heightMm * MM_TO_POINTS) / 2;

	const minH = TOP_CLEARANCE + halfH * 2 + FOOTER_RESERVED;
	const w = metrics.widthMm;
	const h = metrics.heightMm;

	let pageW = Math.max(595.28, (w + 40) * MM_TO_POINTS);
	let pageH = minH;

	if (w <= 180 && h <= 180 && minH <= 841.89) {
		pageW = 210 * MM_TO_POINTS;
		pageH = 297 * MM_TO_POINTS;
	} else if (w <= 260 && h <= 260 && minH <= 1190.55) {
		pageW = 297 * MM_TO_POINTS;
		pageH = 420 * MM_TO_POINTS;
	} else if (w <= 385 && h <= 385 && minH <= 1683.78) {
		pageW = 420 * MM_TO_POINTS;
		pageH = 594 * MM_TO_POINTS;
	}

	const cx = pageW / 2;
	const cy = TOP_CLEARANCE + halfH;
	return [pageW, pageH, cx, cy, radius, halfH];
}

function renderSvgHeader(metrics: PhysicalLoomMetrics, cx: number): string {
	const title =
		metrics.shape === 'circle'
			? `String Art Studio — ${metrics.pinCount} Pins Loom Template`
			: `String Art Studio — ${metrics.pinCount} Pins Rectangular Loom`;

	const level = getLoomSkillLevel(metrics.pinCount);
	const badgeText =
		metrics.shape === 'circle'
			? `${level} (${metrics.pinCount} Pins · Ø ${(metrics.widthMm / 10).toFixed(1)} cm)`
			: `${level} (${metrics.pinCount} Pins · ${(metrics.widthMm / 10).toFixed(1)}×${(metrics.heightMm / 10).toFixed(1)} cm)`;

	const badgeW = Math.max(220, badgeText.length * 6.2);
	const badgeX = cx - badgeW / 2;

	const subtitle =
		metrics.shape === 'circle'
			? `${metrics.pinCount} Pins (0 to ${metrics.pinCount - 1}) | Circle: ${metrics.widthMm.toFixed(0)}mm (${(metrics.widthMm / 10).toFixed(1)}cm) | Clockwise`
			: `${metrics.pinCount} Pins (0 to ${metrics.pinCount - 1}) | Frame (${metrics.aspectRatio}): ${metrics.widthMm.toFixed(0)}×${metrics.heightMm.toFixed(0)}mm | Clockwise`;

	return `<g id="header">
    <text x="${cx.toFixed(1)}" y="38" font-family="Helvetica, Arial, sans-serif" font-size="20" font-weight="bold" text-anchor="middle" fill="${BRAND_COLORS.primary}">${title}</text>
    <rect x="${badgeX.toFixed(1)}" y="58" width="${badgeW.toFixed(1)}" height="22" rx="11" fill="${BRAND_COLORS.secondary}" stroke="${BRAND_COLORS.accent}" stroke-width="1" />
    <text x="${cx.toFixed(1)}" y="72" font-family="Helvetica, Arial, sans-serif" font-size="9.5" font-weight="bold" text-anchor="middle" dominant-baseline="central" fill="${BRAND_COLORS.badgeText}">${badgeText}</text>
    <text x="${cx.toFixed(1)}" y="98" font-family="Helvetica, Arial, sans-serif" font-size="10" text-anchor="middle" fill="${BRAND_COLORS.text}">${subtitle}</text>
  </g>`;
}

function renderSvgFrame(
	metrics: PhysicalLoomMetrics,
	cx: number,
	cy: number,
	radius: number,
	halfH: number,
): string {
	const outline =
		metrics.shape === 'circle'
			? `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${radius.toFixed(1)}" fill="none" stroke="${BRAND_COLORS.primary}" stroke-width="2" />`
			: `<rect x="${(cx - (metrics.widthMm * MM_TO_POINTS) / 2).toFixed(1)}" y="${(cy - halfH).toFixed(1)}" width="${(metrics.widthMm * MM_TO_POINTS).toFixed(1)}" height="${(halfH * 2).toFixed(1)}" fill="none" stroke="${BRAND_COLORS.primary}" stroke-width="2" />`;

	return `<g id="frame">
    ${outline}
    <line x1="${(cx - 12).toFixed(1)}" y1="${cy.toFixed(1)}" x2="${(cx + 12).toFixed(1)}" y2="${cy.toFixed(1)}" stroke="${BRAND_COLORS.accent}" stroke-width="1.5" />
    <line x1="${cx.toFixed(1)}" y1="${(cy - 12).toFixed(1)}" x2="${cx.toFixed(1)}" y2="${(cy + 12).toFixed(1)}" stroke="${BRAND_COLORS.accent}" stroke-width="1.5" />
  </g>`;
}

function renderSvgPins(
	metrics: PhysicalLoomMetrics,
	cx: number,
	cy: number,
	radius: number,
): string {
	const pins =
		metrics.shape === 'circle'
			? getCircularPinPoints(metrics.pinCount, cx, cy, radius)
			: getRectangularPinPoints(metrics, cx, cy);

	const interval =
		metrics.pinCount <= 100 ? 5 : metrics.pinCount <= 200 ? 10 : 15;

	const items = pins.map((p) => renderSvgSinglePin(p, interval));
	return `<g id="pins">${items.join('')}</g>`;
}

function renderSvgSinglePin(p: TemplatePinPoint, interval: number): string {
	if (p.id === 0) {
		return `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4" fill="${BRAND_COLORS.accent}" stroke="${BRAND_COLORS.primary}" stroke-width="1" /><text x="${p.lx.toFixed(1)}" y="${p.ly.toFixed(1)}" font-family="Helvetica, Arial, sans-serif" font-size="7.5" font-weight="bold" fill="${BRAND_COLORS.accent}" text-anchor="middle" dominant-baseline="central">0 (TOP)</text>`;
	}
	const dot = `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="2.2" fill="${BRAND_COLORS.primary}" />`;
	const label =
		p.id % interval === 0
			? `<text x="${p.lx.toFixed(1)}" y="${p.ly.toFixed(1)}" font-family="Helvetica, Arial, sans-serif" font-size="7" font-weight="bold" fill="${BRAND_COLORS.text}" text-anchor="middle" dominant-baseline="central">${p.id}</text>`
			: '';
	return `${dot}${label}`;
}

function renderSvgBottomWorkshopZone(
	cx: number,
	bottomOfLoomY: number,
	pageW: number,
): string {
	const boxW = Math.min(pageW - 60, 540);
	const boxX = cx - boxW / 2;
	const boxY = bottomOfLoomY + 24;

	const calY = boxY + 44;
	const calWidth = 50 * MM_TO_POINTS;
	const calX0 = cx - calWidth / 2;

	const ticks = [0, 10, 20, 30, 40, 50]
		.map((mm) => {
			const tx = calX0 + mm * MM_TO_POINTS;
			const tickH = mm % 25 === 0 ? 5 : 3;
			return `<line x1="${tx.toFixed(1)}" y1="${calY.toFixed(1)}" x2="${tx.toFixed(1)}" y2="${(calY - tickH).toFixed(1)}" stroke="${BRAND_COLORS.primary}" stroke-width="1" />`;
		})
		.join('');

	const footerY = calY + 36;
	const dateStr = new Date().toLocaleDateString();

	return `<g id="workshop-zone">
    <rect x="${boxX.toFixed(1)}" y="${boxY.toFixed(1)}" width="${boxW.toFixed(1)}" height="28" rx="5" fill="${BRAND_COLORS.boxBg}" stroke="${BRAND_COLORS.boxBorder}" stroke-width="1" />
    <text x="${(boxX + 10).toFixed(1)}" y="${(boxY + 17).toFixed(1)}" font-family="Helvetica, Arial, sans-serif" font-size="8.5" font-weight="bold" fill="${BRAND_COLORS.accent}">Instructions:</text>
    <text x="${(boxX + 70).toFixed(1)}" y="${(boxY + 17).toFixed(1)}" font-family="Helvetica, Arial, sans-serif" font-size="7.5" fill="${BRAND_COLORS.text}">1. Print at 100% scale (no fit-to-page). 2. Fix to board. 3. Align Pin 0 at 12:00. 4. Hammer pins. 5. Follow Studio guide!</text>
    <line x1="${calX0.toFixed(1)}" y1="${calY.toFixed(1)}" x2="${(calX0 + calWidth).toFixed(1)}" y2="${calY.toFixed(1)}" stroke="${BRAND_COLORS.primary}" stroke-width="1.2" />
    ${ticks}
    <text x="${cx.toFixed(1)}" y="${(calY + 9).toFixed(1)}" font-family="Helvetica, Arial, sans-serif" font-size="7" font-weight="bold" text-anchor="middle" fill="${BRAND_COLORS.primary}">50 mm CALIBRATION SCALE BAR / REGLA DE CALIBRACIÓN</text>
    <text x="${cx.toFixed(1)}" y="${(calY + 18).toFixed(1)}" font-family="Helvetica, Arial, sans-serif" font-size="6.5" text-anchor="middle" fill="${BRAND_COLORS.muted}">Measure with physical ruler. Ensure print scaling is 100% (Do NOT scale to fit page).</text>
    <text x="${cx.toFixed(1)}" y="${footerY.toFixed(1)}" font-family="Helvetica, Arial, sans-serif" font-size="9" font-weight="bold" text-anchor="middle" fill="${BRAND_COLORS.primary}">String Art Studio — Printable Artisan Loom Template</text>
    <text x="${cx.toFixed(1)}" y="${(footerY + 12).toFixed(1)}" font-family="Helvetica, Arial, sans-serif" font-size="7.5" text-anchor="middle" fill="${BRAND_COLORS.muted}">Generated on ${dateStr} | String Art Studio (www.stringartgenerator.app)</text>
  </g>`;
}
