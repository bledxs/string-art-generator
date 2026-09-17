import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { generateLogoAssets } from './generate-logo.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const publicDir = join(rootDir, 'public');
const appDir = join(rootDir, 'src', 'app');
const logoPath = join(rootDir, 'logo.png');

/**
 * Builds a valid multi-size Windows/Browser .ico file from an array of PNG buffers
 */
function createIco(images) {
	const count = images.length;
	const headerSize = 6;
	const entrySize = 16;
	let currentOffset = headerSize + entrySize * count;

	const entries = [];
	for (const img of images) {
		const entry = Buffer.alloc(entrySize);
		entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
		entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
		entry.writeUInt8(0, 2); // color count
		entry.writeUInt8(0, 3); // reserved
		entry.writeUInt16LE(1, 4); // color planes
		entry.writeUInt16LE(32, 6); // bit depth
		entry.writeUInt32LE(img.buffer.length, 8); // image byte size
		entry.writeUInt32LE(currentOffset, 12); // image data offset

		entries.push(entry);
		currentOffset += img.buffer.length;
	}

	const header = Buffer.alloc(headerSize);
	header.writeUInt16LE(0, 0); // reserved
	header.writeUInt16LE(1, 2); // icon type (1 = ICO)
	header.writeUInt16LE(count, 4); // number of images

	return Buffer.concat([header, ...entries, ...images.map((i) => i.buffer)]);
}

async function generateFavicons() {
	console.log('\n🔷 Generando favicons e iconos de aplicación...');

	const sizes = [16, 32, 48];
	const icoPngs = [];

	for (const size of sizes) {
		const buffer = await sharp(logoPath)
			.resize(size, size, {
				fit: 'contain',
				background: { r: 0, g: 0, b: 0, alpha: 0 },
			})
			.png()
			.toBuffer();
		icoPngs.push({ width: size, height: size, buffer });
	}

	const icoBuffer = createIco(icoPngs);
	writeFileSync(join(publicDir, 'favicon.ico'), icoBuffer);
	writeFileSync(join(appDir, 'favicon.ico'), icoBuffer);
	console.log(
		'  ✅ favicon.ico (16x16, 32x32, 48x48) generado en public/ y src/app/',
	);

	// favicon.png & favicon-96x96.png
	await sharp(logoPath)
		.resize(32, 32, {
			fit: 'contain',
			background: { r: 0, g: 0, b: 0, alpha: 0 },
		})
		.png()
		.toFile(join(publicDir, 'favicon.png'));

	await sharp(logoPath)
		.resize(96, 96, {
			fit: 'contain',
			background: { r: 0, g: 0, b: 0, alpha: 0 },
		})
		.png()
		.toFile(join(publicDir, 'favicon-96x96.png'));
	console.log('  ✅ favicon.png y favicon-96x96.png generados');

	// apple-icon.png (180x180)
	await sharp(logoPath)
		.resize(180, 180, {
			fit: 'contain',
			background: { r: 12, g: 10, b: 9, alpha: 1 },
		})
		.png()
		.toFile(join(publicDir, 'apple-icon.png'));
	console.log('  ✅ apple-icon.png (180x180) generado');
}

async function generatePwaIcons() {
	console.log('\n📱 Generando iconos PWA y Web Manifest...');

	const pwaSizes = [
		{ name: 'icon-192.png', size: 192 },
		{ name: 'icon-512.png', size: 512 },
		{ name: 'web-app-manifest-192x192.png', size: 192 },
		{ name: 'web-app-manifest-512x512.png', size: 512 },
	];

	for (const { name, size } of pwaSizes) {
		await sharp(logoPath)
			.resize(size, size, {
				fit: 'contain',
				background: { r: 12, g: 10, b: 9, alpha: 1 },
			})
			.png()
			.toFile(join(publicDir, name));
		console.log(`  ✅ ${name} (${size}x${size})`);
	}
}

async function generateSocialCard(filename, platformName) {
	const width = 1200;
	const height = 630;
	const logoSize = 300;

	const logoBuffer = await sharp(logoPath)
		.resize(logoSize, logoSize, {
			fit: 'contain',
			background: { r: 0, g: 0, b: 0, alpha: 0 },
		})
		.png()
		.toBuffer();

	const svgBanner = `
	<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<radialGradient id="bgGlow" cx="50%" cy="38%" r="65%">
				<stop offset="0%" stop-color="#291809" stop-opacity="0.95" />
				<stop offset="45%" stop-color="#140e09" stop-opacity="1" />
				<stop offset="100%" stop-color="#080706" stop-opacity="1" />
			</radialGradient>
			<linearGradient id="amberAccent" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stop-color="#fbbf24" />
				<stop offset="50%" stop-color="#f59e0b" />
				<stop offset="100%" stop-color="#d97706" />
			</linearGradient>
			<filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
				<feGaussianBlur stdDeviation="25" result="blur" />
				<feComposite in="SourceGraphic" in2="blur" operator="over" />
			</filter>
		</defs>

		<!-- Background -->
		<rect width="${width}" height="${height}" fill="url(#bgGlow)" />

		<!-- Geometric string art decorative rings -->
		<circle cx="600" cy="210" r="195" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.25" stroke-dasharray="4 8" />
		<circle cx="600" cy="210" r="230" fill="none" stroke="#f59e0b" stroke-width="1" stroke-opacity="0.15" />
		<circle cx="600" cy="210" r="265" fill="none" stroke="#fbbf24" stroke-width="0.75" stroke-opacity="0.1" stroke-dasharray="2 6" />

		<!-- Badge -->
		<g transform="translate(385, 395)">
			<rect width="430" height="34" rx="17" fill="#1c1917" stroke="#78350f" stroke-width="1.5" />
			<text x="215" y="21.5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#fbbf24" text-anchor="middle" letter-spacing="1.2">ALGORITMO ARTESANAL DE ALTA PRECISIÓN</text>
		</g>

		<!-- Title -->
		<text x="600" y="475" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="52" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="-1">
			String Art Studio
		</text>

		<!-- Subtitle -->
		<text x="600" y="525" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="400" fill="#d6d3d1" text-anchor="middle">
			Convierte cualquier imagen en patrones profesionales de hilorama
		</text>

		<!-- Feature Badges -->
		<text x="600" y="575" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="500" fill="#fed7aa" text-anchor="middle">
			Simulación interactiva • Capas de color policromáticas • Exportación PDF gratuita
		</text>
	</svg>
	`;

	const baseImage = sharp(Buffer.from(svgBanner));
	await baseImage
		.composite([
			{
				input: logoBuffer,
				top: 60,
				left: Math.round((width - logoSize) / 2),
			},
		])
		.png({ quality: 95 })
		.toFile(join(publicDir, filename));

	console.log(`  ✅ ${filename} (${width}x${height}) para ${platformName}`);
}

async function generateScreenshots() {
	console.log('\n📸 Generando screenshots de demostración...');

	// screenshot-wide.png (1280x720)
	const wideSvg = `
	<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
		<rect width="1280" height="720" fill="#0c0a09" />
		<circle cx="640" cy="290" r="195" fill="none" stroke="#d97706" stroke-width="1.5" stroke-opacity="0.3" stroke-dasharray="4 8" />
		<text x="640" y="535" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="46" font-weight="800" fill="#ffffff" text-anchor="middle">String Art Studio</text>
		<text x="640" y="580" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="21" font-weight="400" fill="#a8a29e" text-anchor="middle">Estudio interactivo de hilorama de alta precisión</text>
	</svg>
	`;

	const logoWide = await sharp(logoPath)
		.resize(270, 270, {
			fit: 'contain',
			background: { r: 0, g: 0, b: 0, alpha: 0 },
		})
		.png()
		.toBuffer();

	await sharp(Buffer.from(wideSvg))
		.composite([{ input: logoWide, top: 155, left: 505 }])
		.png()
		.toFile(join(publicDir, 'screenshot-wide.png'));
	console.log('  ✅ screenshot-wide.png (1280x720)');

	// screenshot-narrow.png (750x1334)
	const narrowSvg = `
	<svg width="750" height="1334" viewBox="0 0 750 1334" xmlns="http://www.w3.org/2000/svg">
		<rect width="750" height="1334" fill="#0c0a09" />
		<circle cx="375" cy="490" r="185" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-opacity="0.3" stroke-dasharray="4 8" />
		<text x="375" y="750" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="40" font-weight="800" fill="#ffffff" text-anchor="middle">String Art Studio</text>
		<text x="375" y="800" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="400" fill="#a8a29e" text-anchor="middle">Arte de hilos y clavos interactivo</text>
	</svg>
	`;

	const logoNarrow = await sharp(logoPath)
		.resize(250, 250, {
			fit: 'contain',
			background: { r: 0, g: 0, b: 0, alpha: 0 },
		})
		.png()
		.toBuffer();

	await sharp(Buffer.from(narrowSvg))
		.composite([{ input: logoNarrow, top: 365, left: 250 }])
		.png()
		.toFile(join(publicDir, 'screenshot-narrow.png'));
	console.log('  ✅ screenshot-narrow.png (750x1334)');
}

async function main() {
	console.log(
		'🚀 Generador Integral de Recursos Gráficos y SEO para String Art Studio\n',
	);

	if (!existsSync(publicDir)) {
		mkdirSync(publicDir, { recursive: true });
	}

	// 1. Generar nuevo logo si no existe o regenerarlo
	await generateLogoAssets();

	// 2. Generar favicons e iconos de apps
	await generateFavicons();
	await generatePwaIcons();

	// 3. Generar tarjetas OpenGraph y Twitter
	console.log('\n🌐 Generando OpenGraph y Twitter Cards...');
	await generateSocialCard(
		'opengraph-image.png',
		'OpenGraph / Facebook / LinkedIn',
	);
	await generateSocialCard('twitter-image.png', 'Twitter / X Cards');

	// 4. Generar capturas PWA
	await generateScreenshots();

	console.log(
		'\n🎉 ¡Todas las imágenes y favicons fueron generados con éxito!',
	);
}

main().catch((err) => {
	console.error('Error generando imágenes:', err);
	process.exit(1);
});
