// biome-ignore lint/correctness/noUnresolvedImports: jspdf provides named jsPDF export
import { jsPDF } from 'jspdf';
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

export function generateLoomTemplatePdf(loom: LoomConfig): Blob {
	const metrics = calculatePhysicalLoomMetrics(loom);
	const [pageW, pageH, cx, cy, radius, halfH] = computePdfLayout(metrics);

	const doc = new jsPDF({
		orientation: pageW > pageH ? 'landscape' : 'portrait',
		unit: 'pt',
		format: [pageW, pageH],
	});

	drawPdfHeader(doc, metrics, cx);
	drawPdfLoomFrame(doc, metrics, cx, cy, radius, halfH);
	drawPdfPins(doc, metrics, cx, cy, radius);
	drawPdfBottomWorkshopZone(doc, cx, cy + halfH, pageW);

	return doc.output('blob');
}

function computePdfLayout(
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

function drawPdfHeader(
	doc: jsPDF,
	metrics: PhysicalLoomMetrics,
	cx: number,
): void {
	// 1. Title
	doc.setFont('helvetica', 'bold');
	doc.setFontSize(20);
	doc.setTextColor(BRAND_COLORS.primary);
	const title =
		metrics.shape === 'circle'
			? `String Art Studio — ${metrics.pinCount} Pins Loom Template`
			: `String Art Studio — ${metrics.pinCount} Pins Rectangular Loom`;
	doc.text(title, cx, 38, { align: 'center' });

	// 2. Badge
	const level = getLoomSkillLevel(metrics.pinCount);
	const badgeText =
		metrics.shape === 'circle'
			? `${level} (${metrics.pinCount} Pins · Ø ${(metrics.widthMm / 10).toFixed(1)} cm)`
			: `${level} (${metrics.pinCount} Pins · ${(metrics.widthMm / 10).toFixed(1)}×${(metrics.heightMm / 10).toFixed(1)} cm)`;
	const badgeWidth = Math.max(220, badgeText.length * 6.2);
	doc.setFillColor(BRAND_COLORS.secondary);
	doc.setDrawColor(BRAND_COLORS.accent);
	doc.setLineWidth(1);
	doc.roundedRect(cx - badgeWidth / 2, 58, badgeWidth, 22, 11, 11, 'FD');
	doc.setFontSize(9.5);
	doc.setTextColor(BRAND_COLORS.badgeText);
	doc.text(badgeText, cx, 72, { align: 'center' });

	// 3. Subtitle
	doc.setFont('helvetica', 'normal');
	doc.setFontSize(10);
	doc.setTextColor(BRAND_COLORS.text);
	const subtitle =
		metrics.shape === 'circle'
			? `${metrics.pinCount} Pins (0 to ${metrics.pinCount - 1}) | Circle: ${metrics.widthMm.toFixed(0)}mm (${(metrics.widthMm / 10).toFixed(1)}cm) | Clockwise`
			: `${metrics.pinCount} Pins (0 to ${metrics.pinCount - 1}) | Frame (${metrics.aspectRatio}): ${metrics.widthMm.toFixed(0)}×${metrics.heightMm.toFixed(0)}mm | Clockwise`;
	doc.text(subtitle, cx, 98, { align: 'center' });
}

function drawPdfLoomFrame(
	doc: jsPDF,
	metrics: PhysicalLoomMetrics,
	cx: number,
	cy: number,
	radius: number,
	halfH: number,
): void {
	doc.setDrawColor(BRAND_COLORS.primary);
	doc.setLineWidth(2);
	if (metrics.shape === 'circle') {
		doc.circle(cx, cy, radius, 'S');
	} else {
		const halfW = (metrics.widthMm * MM_TO_POINTS) / 2;
		doc.rect(cx - halfW, cy - halfH, halfW * 2, halfH * 2, 'S');
	}

	const crossSize = 12;
	doc.setDrawColor(BRAND_COLORS.accent);
	doc.setLineWidth(1.5);
	doc.line(cx - crossSize, cy, cx + crossSize, cy);
	doc.line(cx, cy - crossSize, cx, cy + crossSize);
}

function drawPdfPins(
	doc: jsPDF,
	metrics: PhysicalLoomMetrics,
	cx: number,
	cy: number,
	radius: number,
): void {
	const pins =
		metrics.shape === 'circle'
			? getCircularPinPoints(metrics.pinCount, cx, cy, radius)
			: getRectangularPinPoints(metrics, cx, cy);

	const interval =
		metrics.pinCount <= 100 ? 5 : metrics.pinCount <= 200 ? 10 : 15;

	for (const p of pins) {
		renderPdfSinglePin(doc, p, interval);
	}
}

function renderPdfSinglePin(
	doc: jsPDF,
	p: TemplatePinPoint,
	interval: number,
): void {
	if (p.id === 0) {
		doc.setFillColor(BRAND_COLORS.accent);
		doc.setDrawColor(BRAND_COLORS.primary);
		doc.setLineWidth(1);
		doc.circle(p.x, p.y, 4, 'FD');
		doc.setFont('helvetica', 'bold');
		doc.setFontSize(7.5);
		doc.setTextColor(BRAND_COLORS.accent);
		doc.text('0 (TOP)', p.lx, p.ly, { align: 'center', baseline: 'middle' });
		return;
	}

	doc.setFillColor(BRAND_COLORS.primary);
	doc.circle(p.x, p.y, 2.2, 'F');
	if (p.id % interval === 0) {
		doc.setFont('helvetica', 'bold');
		doc.setFontSize(7);
		doc.setTextColor(BRAND_COLORS.text);
		doc.text(String(p.id), p.lx, p.ly, { align: 'center', baseline: 'middle' });
	}
}

function drawPdfBottomWorkshopZone(
	doc: jsPDF,
	cx: number,
	bottomOfLoomY: number,
	pageW: number,
): void {
	// 1. Instructions Box (placed below loom with guaranteed breathing room)
	const boxW = Math.min(pageW - 60, 540);
	const boxX = cx - boxW / 2;
	const boxY = bottomOfLoomY + 24;

	doc.setFillColor(BRAND_COLORS.boxBg);
	doc.setDrawColor(BRAND_COLORS.boxBorder);
	doc.roundedRect(boxX, boxY, boxW, 28, 5, 5, 'FD');
	doc.setFont('helvetica', 'bold');
	doc.setFontSize(8.5);
	doc.setTextColor(BRAND_COLORS.accent);
	doc.text('Instructions:', boxX + 10, boxY + 17);
	doc.setFont('helvetica', 'normal');
	doc.setFontSize(7.5);
	doc.setTextColor(BRAND_COLORS.text);
	doc.text(
		'1. Print at 100% scale (no fit-to-page). 2. Fix to board. 3. Align Pin 0 at 12:00. 4. Hammer pins. 5. Follow Studio guide!',
		boxX + 70,
		boxY + 17,
	);

	// 2. 50 mm Calibration Bar
	const calY = boxY + 44;
	const calWidth = 50 * MM_TO_POINTS;
	const calX0 = cx - calWidth / 2;
	doc.setDrawColor(BRAND_COLORS.primary);
	doc.setLineWidth(1.2);
	doc.line(calX0, calY, calX0 + calWidth, calY);

	for (const mm of [0, 10, 20, 30, 40, 50]) {
		const tx = calX0 + mm * MM_TO_POINTS;
		const tickH = mm % 25 === 0 ? 5 : 3;
		doc.line(tx, calY, tx, calY - tickH);
	}

	doc.setFont('helvetica', 'bold');
	doc.setFontSize(7);
	doc.setTextColor(BRAND_COLORS.primary);
	doc.text('50 mm CALIBRATION SCALE BAR / REGLA DE CALIBRACIÓN', cx, calY + 9, {
		align: 'center',
	});
	doc.setFont('helvetica', 'normal');
	doc.setFontSize(6.5);
	doc.setTextColor(BRAND_COLORS.muted);
	doc.text(
		'Measure with physical ruler. Ensure print scaling is 100% (Do NOT scale to fit page).',
		cx,
		calY + 18,
		{ align: 'center' },
	);

	// 3. Footer
	const footerY = calY + 36;
	doc.setFont('helvetica', 'bold');
	doc.setFontSize(9);
	doc.setTextColor(BRAND_COLORS.primary);
	doc.text('String Art Studio — Printable Artisan Loom Template', cx, footerY, {
		align: 'center',
	});
	doc.setFont('helvetica', 'normal');
	doc.setFontSize(7.5);
	doc.setTextColor(BRAND_COLORS.muted);
	doc.text(
		`Generated on ${new Date().toLocaleDateString()} | String Art Studio (www.stringartgenerator.app)`,
		cx,
		footerY + 12,
		{ align: 'center' },
	);
}
