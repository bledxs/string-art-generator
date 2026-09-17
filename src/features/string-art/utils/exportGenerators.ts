import type { AlgorithmConfig, LoomConfig, Pin } from '../types';

export function generateSvgString(
	pins: Pin[],
	lines: number[],
	size: number,
	opacity: number,
	lineWeight: number,
	colorMode: 'dark-on-light' | 'light-on-dark' = 'dark-on-light',
): string {
	let pathData = '';
	if (lines.length > 1 && pins.length > 0) {
		const startPin = pins[lines[0]];
		if (startPin)
			pathData = `M ${startPin.x.toFixed(1)} ${startPin.y.toFixed(1)}`;
		for (let i = 1; i < lines.length; i++) {
			const pin = pins[lines[i]];
			if (pin) pathData += ` L ${pin.x.toFixed(1)} ${pin.y.toFixed(1)}`;
		}
	}

	const isLightOnDark = colorMode === 'light-on-dark';
	const bgColor = isLightOnDark ? '#09090b' : '#ffffff';
	const rimColor = isLightOnDark ? '#27272a' : '#e2e8f0';
	const strokeColor = isLightOnDark ? '#f8fafc' : '#0f172a';

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" fill="${bgColor}" />
  <circle cx="${size / 2}" cy="${size / 2}" r="${(size / 2) * 0.95}" fill="none" stroke="${rimColor}" stroke-width="2" />
  <path d="${pathData}" fill="none" stroke="${strokeColor}" stroke-width="${lineWeight}" stroke-opacity="${opacity}" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;
}

export function generatePinSequenceText(lines: number[]): string {
	const header = `# Secuencia de Clavos - String Art Studio\n# Total de líneas: ${lines.length}\n\n`;
	return header + lines.join(' -> ');
}

export function generateProjectJson(
	lines: number[],
	loom: LoomConfig,
	algo: AlgorithmConfig,
): string {
	return JSON.stringify(
		{
			version: '1.0.0',
			generatedAt: new Date().toISOString(),
			loom,
			algorithm: algo,
			linesCount: lines.length,
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
