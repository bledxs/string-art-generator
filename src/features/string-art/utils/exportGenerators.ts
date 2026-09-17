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

export function generatePinSequenceText(
	lines: number[],
	colorRuns?: ColorRun[],
): string {
	let output = `# Secuencia de Clavos - String Art Studio\n# Total de líneas: ${lines.length}\n`;

	if (colorRuns && colorRuns.length > 0) {
		output += `# Bobinas totales: ${colorRuns.length}\n\n`;
		for (let idx = 0; idx < colorRuns.length; idx++) {
			const run = colorRuns[idx];
			const runLines = lines.slice(run.startIndex, run.endIndex + 1);
			output += `========================================================\n`;
			output += `BOBINA ${idx + 1}: ${run.name.toUpperCase()} (${run.color})\n`;
			output += `Rango de líneas: ${run.startIndex + 1} a ${run.endIndex + 1} (${runLines.length} pasos)\n`;
			output += `========================================================\n`;
			output += `${runLines.join(' -> ')}\n\n`;
		}
		return output;
	}

	return `${output}\n${lines.join(' -> ')}`;
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
