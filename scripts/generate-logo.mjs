import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const publicDir = join(rootDir, 'public');

/**
 * Generates an ultra-crisp, mathematical String Art geometric logo.
 * Harmonized with the studio's warm amber/gold and dark slate palette.
 */
function createStringArtLogoSvg(size = 1024) {
	const cx = size / 2;
	const cy = size / 2;
	const radius = size * 0.4; // 409.6
	const pinCount = 96;

	// Calculate pin positions
	const pins = [];
	for (let i = 0; i < pinCount; i++) {
		const angle = (i * 2 * Math.PI) / pinCount - Math.PI / 2;
		pins.push({
			x: cx + radius * Math.cos(angle),
			y: cy + radius * Math.sin(angle),
		});
	}

	// Generate string art chords (multi-layered caustics)
	const layer1Lines = []; // Wide chords (deep copper background)
	for (let i = 0; i < pinCount; i++) {
		const target = (i + 31) % pinCount;
		const p1 = pins[i];
		const p2 = pins[target];
		layer1Lines.push(
			`<line x1="${p1.x.toFixed(2)}" y1="${p1.y.toFixed(2)}" x2="${p2.x.toFixed(2)}" y2="${p2.y.toFixed(2)}" stroke="url(#copperGrad)" stroke-width="1.5" stroke-opacity="0.35" />`,
		);
	}

	const layer2Lines = []; // Medium chords (vibrant amber)
	for (let i = 0; i < pinCount; i++) {
		const target = (i + 37) % pinCount;
		const p1 = pins[i];
		const p2 = pins[target];
		layer2Lines.push(
			`<line x1="${p1.x.toFixed(2)}" y1="${p1.y.toFixed(2)}" x2="${p2.x.toFixed(2)}" y2="${p2.y.toFixed(2)}" stroke="url(#amberGrad)" stroke-width="2.0" stroke-opacity="0.65" />`,
		);
	}

	const layer3Lines = []; // Dense inner chords (bright gold)
	for (let i = 0; i < pinCount; i += 2) {
		const target = (i * 2) % pinCount;
		const p1 = pins[i];
		const p2 = pins[target];
		layer3Lines.push(
			`<line x1="${p1.x.toFixed(2)}" y1="${p1.y.toFixed(2)}" x2="${p2.x.toFixed(2)}" y2="${p2.y.toFixed(2)}" stroke="#fde047" stroke-width="2.2" stroke-opacity="0.75" />`,
		);
	}

	// Generate pin markers along the perimeter
	const pinMarkers = pins.map((p, i) => {
		const isMajor = i % 12 === 0;
		const isZero = i === 0;
		const r = isZero ? 7 : isMajor ? 5.5 : 3.5;
		const fill = isZero ? '#ffffff' : isMajor ? '#fbbf24' : '#d97706';
		return `<circle cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="${r}" fill="${fill}" />`;
	});

	return `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
	<defs>
		<!-- Background gradient: deep luxury obsidian/dark slate -->
		<radialGradient id="bgSphere" cx="50%" cy="50%" r="50%">
			<stop offset="0%" stop-color="#1c1917" />
			<stop offset="65%" stop-color="#0c0a09" />
			<stop offset="100%" stop-color="#050505" />
		</radialGradient>

		<!-- Golden amber cord gradient -->
		<linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
			<stop offset="0%" stop-color="#f59e0b" />
			<stop offset="50%" stop-color="#fbbf24" />
			<stop offset="100%" stop-color="#d97706" />
		</linearGradient>

		<!-- Copper cord gradient -->
		<linearGradient id="copperGrad" x1="100%" y1="0%" x2="0%" y2="100%">
			<stop offset="0%" stop-color="#d97706" />
			<stop offset="50%" stop-color="#b45309" />
			<stop offset="100%" stop-color="#78350f" />
		</linearGradient>

		<!-- Loom outer rim gradient -->
		<linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
			<stop offset="0%" stop-color="#fbbf24" stop-opacity="0.8" />
			<stop offset="30%" stop-color="#78350f" stop-opacity="0.6" />
			<stop offset="70%" stop-color="#b45309" stop-opacity="0.6" />
			<stop offset="100%" stop-color="#f59e0b" stop-opacity="0.8" />
		</linearGradient>

		<!-- Inner glow filter -->
		<filter id="centerGlow" x="-50%" y="-50%" width="200%" height="200%">
			<feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur" />
			<feMerge>
				<feMergeNode in="blur" />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
	</defs>

	<!-- Dark base disk with subtle rim -->
	<circle cx="${cx}" cy="${cy}" r="${radius + 40}" fill="url(#bgSphere)" />
	<circle cx="${cx}" cy="${cy}" r="${radius + 40}" fill="none" stroke="url(#rimGrad)" stroke-width="3" stroke-opacity="0.4" />

	<!-- Outer guide tick rings -->
	<circle cx="${cx}" cy="${cy}" r="${radius + 15}" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.25" stroke-dasharray="3 7" />
	<circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="#b45309" stroke-width="3.5" stroke-opacity="0.5" />

	<!-- String Art Thread Layers -->
	<g id="thread-layer-1">
		${layer1Lines.join('\n\t\t')}
	</g>
	<g id="thread-layer-2">
		${layer2Lines.join('\n\t\t')}
	</g>
	<g id="thread-layer-3" filter="url(#centerGlow)">
		${layer3Lines.join('\n\t\t')}
	</g>

	<!-- Inner caustic highlight ring -->
	<circle cx="${cx}" cy="${cy}" r="${radius * 0.38}" fill="none" stroke="#fde047" stroke-width="2" stroke-opacity="0.6" />
	<circle cx="${cx}" cy="${cy}" r="${radius * 0.18}" fill="none" stroke="#fbbf24" stroke-width="1.5" stroke-opacity="0.4" />

	<!-- Loom Perimeter Pins -->
	<g id="pins">
		${pinMarkers.join('\n\t\t')}
	</g>

	<!-- Center artisan pin / origin -->
	<circle cx="${cx}" cy="${cy}" r="6" fill="#fde047" />
	<circle cx="${cx}" cy="${cy}" r="12" fill="none" stroke="#f59e0b" stroke-width="2" stroke-opacity="0.8" />
</svg>
	`.trim();
}

export async function generateLogoAssets() {
	console.log('🎨 Creando nuevo logo vectorial y assets...');

	const svgContent = createStringArtLogoSvg(1024);

	// Guardar SVG vectorial puro en public/favicon.svg
	writeFileSync(join(publicDir, 'favicon.svg'), svgContent);
	console.log('  ✅ public/favicon.svg guardado');

	// Generar logo.png de alta resolución (1024x1024)
	await sharp(Buffer.from(svgContent))
		.png({ quality: 100, compressionLevel: 9 })
		.toFile(join(rootDir, 'logo.png'));
	console.log('  ✅ logo.png (1024x1024) generado en la raíz');

	return svgContent;
}

generateLogoAssets().catch(console.error);
