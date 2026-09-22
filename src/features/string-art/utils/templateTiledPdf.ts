// biome-ignore lint/correctness/noUnresolvedImports: jspdf provides named jsPDF export
import { jsPDF } from 'jspdf';
import type { LoomConfig } from '../types';
import {
	BRAND_COLORS,
	calculatePhysicalLoomMetrics,
	getCircularPinPoints,
	getRectangularPinPoints,
	MM_TO_POINTS,
	type PhysicalLoomMetrics,
	type TemplatePinPoint,
} from './templateMetrics';
import {
	calculateLoomTilingGrid,
	drawMiniMap,
	drawRegistrationCross,
	getTileSheetInfo,
	type LoomTilingGrid,
	type PaperSize,
	type TileSheetInfo,
} from './templateTiler';

export function generateTiledLoomTemplatePdf(
	loom: LoomConfig,
	paperSize: PaperSize = 'a4',
): Blob {
	const metrics = calculatePhysicalLoomMetrics(loom);
	const grid = calculateLoomTilingGrid(loom, paperSize);
	const pageW = grid.paper.widthMm * MM_TO_POINTS;
	const pageH = grid.paper.heightMm * MM_TO_POINTS;

	const doc = new jsPDF({
		orientation: 'portrait',
		unit: 'pt',
		format: [pageW, pageH],
	});

	for (let row = 0; row < grid.rows; row++) {
		for (let col = 0; col < grid.cols; col++) {
			if (row > 0 || col > 0) {
				doc.addPage([pageW, pageH], 'portrait');
			}
			const sheet = getTileSheetInfo(grid, col, row);
			renderTiledPage(doc, metrics, grid, sheet, pageW, pageH);
		}
	}

	return doc.output('blob');
}

function renderTiledPage(
	doc: jsPDF,
	metrics: PhysicalLoomMetrics,
	grid: LoomTilingGrid,
	sheet: TileSheetInfo,
	pageW: number,
	pageH: number,
): void {
	renderTiledHeader(doc, metrics, grid, sheet, pageW);

	const tileLeftPt = (pageW - grid.tileWidthMm * MM_TO_POINTS) / 2;
	const tileTopPt = 70;
	const originX = tileLeftPt - sheet.xMinMm * MM_TO_POINTS;
	const originY = tileTopPt - sheet.yMinMm * MM_TO_POINTS;

	renderTiledLoomContent(doc, metrics, sheet, originX, originY);
	renderSeamAndRegistrationGuides(doc, grid, sheet, tileLeftPt, tileTopPt);
	renderTiledFooter(doc, pageW, pageH);
}

function renderTiledHeader(
	doc: jsPDF,
	metrics: PhysicalLoomMetrics,
	grid: LoomTilingGrid,
	sheet: TileSheetInfo,
	pageW: number,
): void {
	doc.setFont('helvetica', 'bold');
	doc.setFontSize(12);
	doc.setTextColor(BRAND_COLORS.primary);
	doc.text('STRING ART STUDIO — TILED LOOM TEMPLATE', 30, 28);

	const shape = metrics.shape === 'circle' ? 'Circle' : 'Rect';
	const dim =
		metrics.shape === 'circle'
			? `Ø ${(metrics.widthMm / 10).toFixed(0)} cm`
			: `${(metrics.widthMm / 10).toFixed(0)}×${(metrics.heightMm / 10).toFixed(0)} cm`;

	doc.setFont('helvetica', 'normal');
	doc.setFontSize(8.5);
	doc.setTextColor(BRAND_COLORS.text);
	doc.text(
		`${shape} ${dim} · ${metrics.pinCount} Pins · Sheet ${sheet.sheetIndex} of ${sheet.totalSheets} (Row ${sheet.row + 1}/${sheet.rows}, Col ${sheet.col + 1}/${sheet.cols})`,
		30,
		42,
	);

	drawMiniMap(doc, grid, sheet, pageW - 65, 14);
}

function renderTiledLoomContent(
	doc: jsPDF,
	metrics: PhysicalLoomMetrics,
	sheet: TileSheetInfo,
	originX: number,
	originY: number,
): void {
	const radiusPt = (metrics.widthMm * MM_TO_POINTS) / 2;
	const halfHPt =
		metrics.shape === 'circle'
			? radiusPt
			: (metrics.heightMm * MM_TO_POINTS) / 2;

	doc.setDrawColor(BRAND_COLORS.primary);
	doc.setLineWidth(2);
	if (metrics.shape === 'circle') {
		doc.circle(originX, originY, radiusPt, 'S');
	} else {
		const halfWPt = (metrics.widthMm * MM_TO_POINTS) / 2;
		doc.rect(
			originX - halfWPt,
			originY - halfHPt,
			halfWPt * 2,
			halfHPt * 2,
			'S',
		);
	}

	doc.setDrawColor(BRAND_COLORS.accent);
	doc.setLineWidth(1.5);
	doc.line(originX - 12, originY, originX + 12, originY);
	doc.line(originX, originY - 12, originX, originY + 12);

	const pins =
		metrics.shape === 'circle'
			? getCircularPinPoints(metrics.pinCount, 0, 0, radiusPt)
			: getRectangularPinPoints(metrics, 0, 0);

	const interval =
		metrics.pinCount <= 100 ? 5 : metrics.pinCount <= 200 ? 10 : 15;

	for (const p of pins) {
		const px = p.x / MM_TO_POINTS;
		const py = p.y / MM_TO_POINTS;
		if (
			px >= sheet.xMinMm - 5 &&
			px <= sheet.xMaxMm + 5 &&
			py >= sheet.yMinMm - 5 &&
			py <= sheet.yMaxMm + 5
		) {
			renderSingleTiledPin(doc, p, originX, originY, interval);
		}
	}
}

function renderSingleTiledPin(
	doc: jsPDF,
	p: TemplatePinPoint,
	originX: number,
	originY: number,
	interval: number,
): void {
	const sx = originX + p.x;
	const sy = originY + p.y;
	const slx = originX + p.lx;
	const sly = originY + p.ly;

	if (p.id === 0) {
		doc.setFillColor(BRAND_COLORS.accent);
		doc.setDrawColor(BRAND_COLORS.primary);
		doc.setLineWidth(1);
		doc.circle(sx, sy, 4, 'FD');
		doc.setFont('helvetica', 'bold');
		doc.setFontSize(7.5);
		doc.setTextColor(BRAND_COLORS.accent);
		doc.text('0 (TOP)', slx, sly, { align: 'center', baseline: 'middle' });
		return;
	}

	doc.setFillColor(BRAND_COLORS.primary);
	doc.circle(sx, sy, 2.2, 'F');
	if (p.id % interval === 0) {
		doc.setFont('helvetica', 'bold');
		doc.setFontSize(7);
		doc.setTextColor(BRAND_COLORS.text);
		doc.text(String(p.id), slx, sly, {
			align: 'center',
			baseline: 'middle',
		});
	}
}

function renderSeamAndRegistrationGuides(
	doc: jsPDF,
	grid: LoomTilingGrid,
	sheet: TileSheetInfo,
	tileX: number,
	tileY: number,
): void {
	const tileWPt = grid.tileWidthMm * MM_TO_POINTS;
	const tileHPt = grid.tileHeightMm * MM_TO_POINTS;

	if (sheet.col < grid.cols - 1) {
		const seamX = tileX + tileWPt;
		doc.setDrawColor(BRAND_COLORS.muted);
		doc.setLineWidth(0.6);
		doc.line(seamX, tileY - 10, seamX, tileY + tileHPt + 10);
		doc.setFont('helvetica', 'bold');
		doc.setFontSize(6);
		doc.setTextColor(BRAND_COLORS.accent);
		doc.text('SEAM / UNIÓN', seamX + 2, tileY + tileHPt / 2, { angle: 90 });
		drawRegistrationCross(doc, seamX, tileY);
		drawRegistrationCross(doc, seamX, tileY + tileHPt);
	}

	if (sheet.row < grid.rows - 1) {
		const seamY = tileY + tileHPt;
		doc.setDrawColor(BRAND_COLORS.muted);
		doc.setLineWidth(0.6);
		doc.line(tileX - 10, seamY, tileX + tileWPt + 10, seamY);
		doc.setFont('helvetica', 'bold');
		doc.setFontSize(6);
		doc.setTextColor(BRAND_COLORS.accent);
		doc.text('SEAM / UNIÓN', tileX + tileWPt / 2, seamY + 8, {
			align: 'center',
		});
		drawRegistrationCross(doc, tileX, seamY);
		drawRegistrationCross(doc, tileX + tileWPt, seamY);
	}
}

function renderTiledFooter(doc: jsPDF, pageW: number, pageH: number): void {
	const cx = pageW / 2;
	const calY = pageH - 36;
	const calWidth = 50 * MM_TO_POINTS;
	const calX0 = cx - calWidth / 2;

	doc.setDrawColor(BRAND_COLORS.primary);
	doc.setLineWidth(1);
	doc.line(calX0, calY, calX0 + calWidth, calY);

	for (const mm of [0, 10, 20, 30, 40, 50]) {
		const tx = calX0 + mm * MM_TO_POINTS;
		const tickH = mm % 25 === 0 ? 4 : 2.5;
		doc.line(tx, calY, tx, calY - tickH);
	}

	doc.setFont('helvetica', 'bold');
	doc.setFontSize(6.5);
	doc.setTextColor(BRAND_COLORS.primary);
	doc.text('50 mm CALIBRATION BAR (100% SCALE)', cx, calY + 8, {
		align: 'center',
	});

	doc.setFont('helvetica', 'normal');
	doc.setFontSize(6);
	doc.setTextColor(BRAND_COLORS.muted);
	doc.text(
		'Trim along seam lines, align (+) crosses, and tape on back. String Art Studio (www.stringartgenerator.app)',
		cx,
		calY + 18,
		{ align: 'center' },
	);
}
