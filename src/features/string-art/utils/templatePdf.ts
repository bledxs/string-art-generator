// biome-ignore lint/correctness/noUnresolvedImports: jspdf provides named jsPDF export
import { jsPDF } from 'jspdf';
import type { LoomConfig } from '../types';
import {
	calculatePhysicalLoomMetrics,
	calculatePhysicalPins,
	type PhysicalLoomMetrics,
	type PhysicalPin,
} from './templateMetrics';

export function generateLoomTemplatePdf(loom: LoomConfig): Blob {
	const metrics = calculatePhysicalLoomMetrics(loom);
	const padX = 30;
	const padY = 35;
	const pageW = Math.max(210, metrics.widthMm + padX * 2);
	const pageH = Math.max(297, metrics.heightMm + padY * 2 + 35);
	const orientation: 'landscape' | 'portrait' =
		pageW > pageH ? 'landscape' : 'portrait';

	const doc = new jsPDF({
		orientation,
		unit: 'mm',
		format: [pageW, pageH],
	});

	const cx = pageW / 2;
	const cy = padY + metrics.heightMm / 2;
	const pins = calculatePhysicalPins(metrics, cx, cy);

	drawPdfHeader(doc, metrics, cx);
	drawPdfLoomFrame(doc, metrics, cx, cy);
	drawPdfPins(doc, pins);
	drawPdfCalibrationBar(doc, cx, cy + metrics.heightMm / 2 + 22);

	return doc.output('blob');
}

function drawPdfHeader(
	doc: jsPDF,
	metrics: PhysicalLoomMetrics,
	cx: number,
): void {
	doc.setFont('helvetica', 'bold');
	doc.setFontSize(14);
	doc.setTextColor(15, 23, 42);
	doc.text('STRING ART STUDIO - DRILLING TEMPLATE', cx, 16, {
		align: 'center',
	});

	doc.setFont('helvetica', 'normal');
	doc.setFontSize(8.5);
	doc.setTextColor(100, 116, 139);
	const specs =
		metrics.shape === 'circle'
			? `Circular Loom | Diameter: ${(metrics.widthMm / 10).toFixed(1)} cm | ${metrics.pinCount} Pins | Spacing: ${metrics.pinSpacingMm.toFixed(2)} mm`
			: `Rectangular Loom (${metrics.aspectRatio}) | ${(metrics.widthMm / 10).toFixed(1)} × ${(metrics.heightMm / 10).toFixed(1)} cm | ${metrics.pinCount} Pins`;
	doc.text(specs, cx, 22, { align: 'center' });
}

function drawPdfLoomFrame(
	doc: jsPDF,
	metrics: PhysicalLoomMetrics,
	cx: number,
	cy: number,
): void {
	doc.setDrawColor(203, 213, 225);
	doc.setLineWidth(0.3);
	doc.line(cx - 8, cy, cx + 8, cy);
	doc.line(cx, cy - 8, cx, cy + 8);

	if (metrics.shape === 'circle') {
		doc.circle(cx, cy, metrics.radiusMm, 'S');
	} else {
		doc.rect(
			cx - metrics.widthMm / 2,
			cy - metrics.heightMm / 2,
			metrics.widthMm,
			metrics.heightMm,
			'S',
		);
	}
}

function drawPdfPins(doc: jsPDF, pins: PhysicalPin[]): void {
	for (const p of pins) {
		const isMajor = p.id % 10 === 0;
		const isMid = p.id % 5 === 0;
		const tickLen = isMajor ? 4.5 : isMid ? 3.0 : 1.5;

		doc.setDrawColor(15, 23, 42);
		doc.setFillColor(15, 23, 42);
		doc.circle(p.x, p.y, 0.35, 'FD');
		doc.setLineWidth(isMajor ? 0.3 : 0.15);
		doc.line(p.x, p.y, p.x + p.nx * tickLen, p.y + p.ny * tickLen);

		if (p.id === 0) {
			doc.setDrawColor(37, 99, 235);
			doc.setLineWidth(0.5);
			doc.circle(p.x, p.y, 1.8, 'S');
			doc.setFont('helvetica', 'bold');
			doc.setFontSize(6.5);
			doc.setTextColor(37, 99, 235);
			doc.text(
				'PIN 0 (TOP)',
				p.x + p.nx * (tickLen + 3),
				p.y + p.ny * (tickLen + 3),
				{
					align: 'center',
					baseline: 'middle',
				},
			);
		} else if (isMajor) {
			doc.setFont('helvetica', 'normal');
			doc.setFontSize(5.5);
			doc.setTextColor(71, 85, 105);
			doc.text(
				String(p.id),
				p.x + p.nx * (tickLen + 2.5),
				p.y + p.ny * (tickLen + 2.5),
				{
					align: 'center',
					baseline: 'middle',
				},
			);
		}
	}
}

function drawPdfCalibrationBar(doc: jsPDF, cx: number, y: number): void {
	const x0 = cx - 25;
	const x1 = cx + 25;
	doc.setDrawColor(15, 23, 42);
	doc.setLineWidth(0.4);
	doc.line(x0, y, x1, y);

	for (const mm of [0, 10, 20, 30, 40, 50]) {
		const tickH = mm % 25 === 0 ? 3.5 : 2;
		doc.line(x0 + mm, y, x0 + mm, y - tickH);
	}

	doc.setFont('helvetica', 'bold');
	doc.setFontSize(6.5);
	doc.setTextColor(15, 23, 42);
	doc.text('50 mm CALIBRATION SCALE BAR', cx, y + 4.5, { align: 'center' });

	doc.setFont('helvetica', 'normal');
	doc.setFontSize(5.5);
	doc.setTextColor(100, 116, 139);
	doc.text(
		'Measure with physical ruler. Ensure print scaling is 100% (Do NOT scale to fit page).',
		cx,
		y + 8,
		{ align: 'center' },
	);
}
