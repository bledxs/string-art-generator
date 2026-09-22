// biome-ignore lint/correctness/noUnresolvedImports: jspdf provides named jsPDF type
import type { jsPDF } from 'jspdf';
import type { LoomConfig } from '../types';
import {
	BRAND_COLORS,
	calculatePhysicalLoomMetrics,
	type PhysicalLoomMetrics,
} from './templateMetrics';

export type PaperSize = 'a4' | 'letter' | 'legal';

export interface PaperDimensions {
	name: PaperSize;
	label: string;
	widthMm: number;
	heightMm: number;
	printableWidthMm: number;
	printableHeightMm: number;
}

export const PAPER_SIZES: Record<PaperSize, PaperDimensions> = {
	a4: {
		name: 'a4',
		label: 'A4 (210 × 297 mm)',
		widthMm: 210,
		heightMm: 297,
		printableWidthMm: 190,
		printableHeightMm: 277,
	},
	letter: {
		name: 'letter',
		label: 'Carta / Letter (216 × 279 mm)',
		widthMm: 215.9,
		heightMm: 279.4,
		printableWidthMm: 195.9,
		printableHeightMm: 259.4,
	},
	legal: {
		name: 'legal',
		label: 'Oficio / Legal (216 × 356 mm)',
		widthMm: 215.9,
		heightMm: 355.6,
		printableWidthMm: 195.9,
		printableHeightMm: 335.6,
	},
};

export interface LoomTilingGrid {
	paper: PaperDimensions;
	cols: number;
	rows: number;
	totalSheets: number;
	tileWidthMm: number;
	tileHeightMm: number;
	overlapMm: number;
	totalSpanWidthMm: number;
	totalSpanHeightMm: number;
	label: string;
}

export interface TileSheetInfo {
	sheetIndex: number;
	col: number;
	row: number;
	cols: number;
	rows: number;
	totalSheets: number;
	xMinMm: number;
	xMaxMm: number;
	yMinMm: number;
	yMaxMm: number;
	overlapMm: number;
}

export function calculateLoomTilingGrid(
	loom: LoomConfig,
	paperSize: PaperSize = 'a4',
): LoomTilingGrid {
	const metrics = calculatePhysicalLoomMetrics(loom);
	const paper = PAPER_SIZES[paperSize] ?? PAPER_SIZES.a4;
	const marginClearanceMm = 40;
	const totalSpanWidthMm = metrics.widthMm + marginClearanceMm;
	const totalSpanHeightMm = metrics.heightMm + marginClearanceMm;

	const rawCols = totalSpanWidthMm / paper.printableWidthMm;
	const rawRows = totalSpanHeightMm / paper.printableHeightMm;

	// Always enforce an even number of columns and rows: 2, 4, 6, 8, etc.
	const cols = Math.max(2, 2 * Math.ceil(rawCols / 2));
	const rows = Math.max(2, 2 * Math.ceil(rawRows / 2));
	const totalSheets = cols * rows;

	const tileWidthMm = totalSpanWidthMm / cols;
	const tileHeightMm = totalSpanHeightMm / rows;

	return {
		paper,
		cols,
		rows,
		totalSheets,
		tileWidthMm,
		tileHeightMm,
		overlapMm: 10,
		totalSpanWidthMm,
		totalSpanHeightMm,
		label: `${totalSheets} ${paperSize.toUpperCase()} (${cols}×${rows})`,
	};
}

export function getTileSheetInfo(
	grid: LoomTilingGrid,
	col: number,
	row: number,
): TileSheetInfo {
	const sheetIndex = 1 + row * grid.cols + col;
	const halfW = grid.totalSpanWidthMm / 2;
	const halfH = grid.totalSpanHeightMm / 2;

	const xMinMm = -halfW + col * grid.tileWidthMm;
	const xMaxMm = xMinMm + grid.tileWidthMm;
	const yMinMm = -halfH + row * grid.tileHeightMm;
	const yMaxMm = yMinMm + grid.tileHeightMm;

	return {
		sheetIndex,
		col,
		row,
		cols: grid.cols,
		rows: grid.rows,
		totalSheets: grid.totalSheets,
		xMinMm,
		xMaxMm,
		yMinMm,
		yMaxMm,
		overlapMm: grid.overlapMm,
	};
}

export function getTileSheetName(
	sheet: TileSheetInfo,
	metrics: PhysicalLoomMetrics,
): string {
	const shapeLabel = metrics.shape === 'circle' ? 'Circle' : 'Rect';
	return `${shapeLabel} Ø${(metrics.widthMm / 10).toFixed(0)}cm — Sheet ${sheet.sheetIndex}/${sheet.totalSheets} (Row ${sheet.row + 1}, Col ${sheet.col + 1})`;
}

export function drawMiniMap(
	doc: jsPDF,
	grid: LoomTilingGrid,
	sheet: TileSheetInfo,
	x0: number,
	y0: number,
): void {
	const mapW = 40;
	const mapH = 32;
	const cellW = mapW / grid.cols;
	const cellH = mapH / grid.rows;

	for (let r = 0; r < grid.rows; r++) {
		for (let c = 0; c < grid.cols; c++) {
			const cx = x0 + c * cellW;
			const cy = y0 + r * cellH;
			const isCurrent = r === sheet.row && c === sheet.col;

			doc.setFillColor(
				isCurrent ? BRAND_COLORS.accent : BRAND_COLORS.secondary,
			);
			doc.setDrawColor(BRAND_COLORS.primary);
			doc.setLineWidth(0.5);
			doc.rect(cx, cy, cellW, cellH, 'FD');
		}
	}
}

export function drawRegistrationCross(doc: jsPDF, x: number, y: number): void {
	doc.setDrawColor(BRAND_COLORS.accent);
	doc.setLineWidth(1.2);
	doc.line(x - 6, y, x + 6, y);
	doc.line(x, y - 6, x, y + 6);
}
