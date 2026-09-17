import type { AlgorithmConfig, ColorRun, LoomConfig, Pin } from '../types';

export function generateSvgString(
	pins: Pin[],
	lines: number[],
	size: number,
	opacity: number,
	lineWeight: number,
	colorMode: 'dark-on-light' | 'light-on-dark' = 'dark-on-light',
	loom?: LoomConfig,
	colorRuns?: ColorRun[],
): string {
	const isLightOnDark = colorMode === 'light-on-dark';
	const bgColor = isLightOnDark ? '#09090b' : '#ffffff';
	const rimColor = isLightOnDark ? '#27272a' : '#e2e8f0';
	const defaultStrokeColor = isLightOnDark ? '#f8fafc' : '#0f172a';

	let pathsHtml = '';

	if (colorRuns && colorRuns.length > 0) {
		pathsHtml = colorRuns
			.map((run, idx) => {
				const runLines = lines.slice(run.startIndex, run.endIndex + 1);
				if (runLines.length < 2) return '';
				let d = '';
				const startPin = pins[runLines[0]];
				if (startPin) d = `M ${startPin.x.toFixed(1)} ${startPin.y.toFixed(1)}`;
				for (let i = 1; i < runLines.length; i++) {
					const pin = pins[runLines[i]];
					if (pin) d += ` L ${pin.x.toFixed(1)} ${pin.y.toFixed(1)}`;
				}
				const sanitizedId = `layer-${idx + 1}-${run.name.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase()}`;
				const count = run.lineCount ?? runLines.length;
				return `  <g id="${sanitizedId}" stroke="${run.color}" stroke-width="${lineWeight}" stroke-opacity="${opacity}" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <desc>${run.name} (${run.color}) - ${count} lineas</desc>
    <path d="${d}" />
  </g>`;
			})
			.join('\n');
	} else if (lines.length > 1 && pins.length > 0) {
		let pathData = '';
		const startPin = pins[lines[0]];
		if (startPin)
			pathData = `M ${startPin.x.toFixed(1)} ${startPin.y.toFixed(1)}`;
		for (let i = 1; i < lines.length; i++) {
			const pin = pins[lines[i]];
			if (pin) pathData += ` L ${pin.x.toFixed(1)} ${pin.y.toFixed(1)}`;
		}
		pathsHtml = `  <path d="${pathData}" fill="none" stroke="${defaultStrokeColor}" stroke-width="${lineWeight}" stroke-opacity="${opacity}" stroke-linecap="round" stroke-linejoin="round" />`;
	}

	const isRect = loom?.shape === 'rectangle';
	const outline = isRect
		? `<rect x="${size * 0.05}" y="${size * 0.05}" width="${size * 0.9}" height="${size * 0.9}" rx="6" fill="none" stroke="${rimColor}" stroke-width="2" />`
		: `<circle cx="${size / 2}" cy="${size / 2}" r="${(size / 2) * 0.95}" fill="none" stroke="${rimColor}" stroke-width="2" />`;

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" fill="${bgColor}" />
  ${outline}
${pathsHtml}
</svg>`;
}

function formatProjectInfo(
	linesCount: number,
	loom?: LoomConfig,
	algo?: AlgorithmConfig,
	timeElapsedMs?: number,
): string {
	const totalPins = loom?.pinCount ?? 240;
	const opacity =
		algo?.opacityStep != null ? (algo.opacityStep / 100).toFixed(2) : '0.18';
	const weight = algo?.lineWeight ?? 0.85;
	const isLightOnDark = algo?.colorMode === 'light-on-dark';
	const bgColor = isLightOnDark
		? '#09090b (Ébano / Negro)'
		: '#ffffff (Abedul / Blanco)';
	const timeStr =
		timeElapsedMs != null ? `${(timeElapsedMs / 1000).toFixed(2)}s` : 'N/A';
	const dateStr = new Date().toLocaleString();

	return `PROJECT INFORMATION:
- Total Pins: ${totalPins}
- Total Lines: ${linesCount}
- Line Opacity: ${opacity}
- Line Weight: ${weight}
- Background Color: ${bgColor}
- Processing Time: ${timeStr}
- Generated: ${dateStr}`;
}

function formatPhysicalDimensions(loom?: LoomConfig): string {
	const diameter = loom?.physicalDiameterCm ?? 50;
	const pinCount = loom?.pinCount ?? 240;
	const isRect = loom?.shape === 'rectangle';

	if (isRect) {
		const ratioStr = loom?.aspectRatio ?? '1:1';
		const [wR, hR] = ratioStr.split(':').map(Number);
		const maxRatio = Math.max(wR, hR);
		const widthCm = Math.round(diameter * (wR / maxRatio));
		const heightCm = Math.round(diameter * (hR / maxRatio));
		const perimeter = 2 * (widthCm + heightCm);
		const spacing = (perimeter / pinCount).toFixed(2);

		return `PHYSICAL DIMENSIONS:
- Shape: Rectangular (${ratioStr})
- Dimensions: ${widthCm} cm x ${heightCm} cm
- Perimeter: ${perimeter.toFixed(1)} cm
- Pin Spacing: ~${spacing} cm
- Pin Height: 1.0 - 1.5 cm
- 📍 PIN 0 LOCATION: First pin on the top edge (near top-left corner).
  Pin numbering proceeds CLOCKWISE around the frame perimeter.`;
	}

	const circumference = (Math.PI * diameter).toFixed(2);
	const spacing = ((Math.PI * diameter) / pinCount).toFixed(2);
	const angle = (360 / pinCount).toFixed(2);

	return `PHYSICAL DIMENSIONS:
- Shape: Circular
- Circle Diameter: ${diameter} cm
- Circumference: ${circumference} cm
- Pin Spacing: ${spacing} cm
- Angle Between Pins: ${angle}°
- Pin Height: 1.0 - 1.5 cm
- 📍 PIN 0 LOCATION: Top center (12:00 clock position).
  Pin numbering proceeds CLOCKWISE around the circle (12:00 → 3:00 → 6:00 → 9:00).`;
}

function formatEstimatedMaterials(
	linesCount: number,
	loom?: LoomConfig,
	colorRuns?: ColorRun[],
): string {
	const diameter = loom?.physicalDiameterCm ?? 50;
	const pinCount = loom?.pinCount ?? 240;
	const totalMeters = Math.round((linesCount * (diameter * 0.65)) / 100);
	const totalYards = Math.round(totalMeters * 1.09361);
	const safetyMeters = totalMeters * 2;
	const safetyYards = Math.round(safetyMeters * 1.09361);
	const minBoardSize = diameter + 5;

	let colorBreakdown = '';
	if (colorRuns && colorRuns.length > 1) {
		colorBreakdown = '\n- Multi-Color Spool Breakdown:\n';
		for (let i = 0; i < colorRuns.length; i++) {
			const run = colorRuns[i];
			const count = run.lineCount ?? run.endIndex - run.startIndex;
			const runMeters = Math.round((count * (diameter * 0.65)) / 100);
			colorBreakdown += `  * Spool ${i + 1} (${run.name} - ${run.color}): ~${runMeters}m (${count} lines)\n`;
		}
	}

	return `ESTIMATED MATERIALS:
- String Length Required: ~${totalMeters}m (~${totalYards} yards)
  (Recommend ordering 2x for safety: ${safetyMeters}m or ${safetyYards} yards)
- Board Size: Minimum ${minBoardSize} cm
- ${pinCount} pins/nails (evenly spaced)${colorBreakdown}
==================================================

MATERIALS NEEDED:
- Board or backing material (${minBoardSize} cm minimum)
- ${pinCount} pins/nails (evenly spaced)
- Thread/string (recommended ~${safetyMeters}m total)
- Hammer and ruler for precise pin placement
- Tape measure or template
- Pencil for marking`;
}

function formatSetupInstructions(loom?: LoomConfig): string {
	const diameter = loom?.physicalDiameterCm ?? 50;
	const pinCount = loom?.pinCount ?? 240;
	const isRect = loom?.shape === 'rectangle';

	if (isRect) {
		return `SETUP INSTRUCTIONS:

1. PREPARE THE BOARD:
   - Choose a rectangular wooden board (${diameter} cm max)
   - Mark the center point and perimeter frame
   - Ensure the surface is sanded smooth

2. PLACE THE PINS:
   - Distribute ${pinCount} pins evenly around the rectangular perimeter
   - 📍 PIN 0 LOCATION: Pin 0 is the first pin on the top edge at the top-left corner.
   - Number each pin from 0 to ${pinCount - 1} CLOCKWISE:
     * Top edge: Left to Right (Pin 0 starts here)
     * Right edge: Top to Bottom
     * Bottom edge: Right to Left
     * Left edge: Bottom to Top
   - Ensure pins protrude ~1.0 - 1.5 cm above board
   - Tip: Mark every 20th or 50th pin with a small sticker or pencil mark for reference`;
	}

	const angle = (360 / pinCount).toFixed(2);
	const spacing = ((Math.PI * diameter) / pinCount).toFixed(2);
	const radius = (diameter / 2).toFixed(1);

	return `SETUP INSTRUCTIONS:

1. PREPARE THE BOARD:
   - Choose a circular board (${diameter} cm diameter)
   - Mark the exact center point
   - Draw a circle with radius ${radius} cm

2. PLACE THE PINS:
   - Divide the circle into ${pinCount} equal segments
   - Angle between pins: ${angle}°
   - Pin spacing along rim: ~${spacing} cm
   - 📍 PIN 0 LOCATION: Pin 0 is located at the exact TOP CENTER (12:00 clock position).
   - Number each pin from 0 to ${pinCount - 1} CLOCKWISE (12:00 → 1:00 → 3:00 → 6:00 → 9:00)
   - Ensure pins protrude ~1.0 - 1.5 cm above board
   - Tip: Mark every 20th or 50th pin with a small sticker or pencil mark for easy tracking`;
}

function formatSingleSpoolSequence(lines: number[]): string {
	let out = '';
	for (let i = 1; i < lines.length; i++) {
		const from = lines[i - 1];
		const to = lines[i];
		const stepNum = String(i).padStart(7, ' ');
		const fromStr = String(from).padStart(4, ' ');
		const toStr = String(to).padStart(4, ' ');
		out += `${stepNum}. Pin ${fromStr} → Pin ${toStr}\n`;
	}
	return out;
}

function formatMultiSpoolSequence(
	lines: number[],
	colorRuns: ColorRun[],
): string {
	let out = '';
	let globalStep = 1;
	for (let r = 0; r < colorRuns.length; r++) {
		const run = colorRuns[r];
		const startIdx = run.startIndex;
		const endIdx = run.endIndex;
		const runLines = lines.slice(startIdx, endIdx + 1);
		const count = run.lineCount ?? Math.max(0, runLines.length - 1);

		out += `==================================================\n`;
		out += `SPOOL ${r + 1}/${colorRuns.length}: ${run.name.toUpperCase()} (${run.color})\n`;
		out += `Range: Steps ${globalStep} to ${globalStep + Math.max(0, runLines.length - 2)} (${count} lines)\n`;
		out += `[Attach ${run.name} thread to Pin ${lines[startIdx]} and begin]\n`;
		out += `==================================================\n\n`;

		for (let i = 1; i < runLines.length; i++) {
			const from = runLines[i - 1];
			const to = runLines[i];
			const stepNum = String(globalStep++).padStart(7, ' ');
			const fromStr = String(from).padStart(4, ' ');
			const toStr = String(to).padStart(4, ' ');
			out += `${stepNum}. Pin ${fromStr} → Pin ${toStr}\n`;
		}
		out += `\n[Tie off ${run.name} thread at Pin ${lines[endIdx]} and trim excess]\n\n`;
	}
	return out;
}

function formatConstructionTips(linesCount: number, loom?: LoomConfig): string {
	const pinCount = loom?.pinCount ?? 240;
	const pinHours = Math.max(1, Math.round(pinCount / 20));
	const stringHours = Math.max(1, Math.round(linesCount / 500));
	const totalHours = pinHours + stringHours;

	return `==================================================

CONSTRUCTION TIPS:
- Maintain consistent tension on the string
- Don't pull too tight - pins may bend
- Work in good lighting
- Take breaks every 500-1000 lines
- You can adjust opacity by varying string passes
- Mark every 20th or 50th pin with a colored sticker for reference
- Use a continuous string without cutting (tie new thread when needed)

ESTIMATED TIME:
- Pin placement: ~${pinHours} hours (at ~20 pins/hour)
- Stringing: ~${stringHours} hours (at ~500 lines/hour)
- Total: ~${totalHours} hours

==================================================

Need the complete sequence? Export as JSON format.
Generated by String Art Studio`;
}

export function generatePinSequenceText(
	lines: number[],
	loom?: LoomConfig,
	algo?: AlgorithmConfig,
	colorRuns?: ColorRun[],
	timeElapsedMs?: number,
): string {
	const linesCount = lines.length > 0 ? lines.length - 1 : 0;
	const divider = '==================================================';

	const sequenceBody =
		lines.length <= 1
			? 'STRINGING SEQUENCE:\n(No lines generated yet)\n'
			: `STRINGING SEQUENCE:\nFollow this exact order for best results:\n\n${
					colorRuns && colorRuns.length > 1
						? formatMultiSpoolSequence(lines, colorRuns)
						: formatSingleSpoolSequence(lines)
				}`;

	return `STRING ART INSTRUCTIONS
${divider}

${formatProjectInfo(linesCount, loom, algo, timeElapsedMs)}

${divider}

${formatPhysicalDimensions(loom)}

==================================================

${formatEstimatedMaterials(linesCount, loom, colorRuns)}

==================================================

${formatSetupInstructions(loom)}

3. ${sequenceBody}
${formatConstructionTips(linesCount, loom)}`;
}

export function generateProjectJson(
	lines: number[],
	loom: LoomConfig,
	algo: AlgorithmConfig,
	colorRuns?: ColorRun[],
): string {
	return JSON.stringify(
		{
			version: '1.1.0',
			generatedAt: new Date().toISOString(),
			loom,
			algorithm: algo,
			linesCount: lines.length,
			colorRuns: colorRuns ?? [],
			sequence: lines,
		},
		null,
		2,
	);
}

export function triggerDownload(
	content: string,
	filename: string,
	mimeType: string,
): void {
	const blob = new Blob([content], { type: mimeType });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}
