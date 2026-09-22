/**
 * String Art Template Generator
 * Generates PDF templates with numbered pin positions in a circle
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import PDFDocument from 'pdfkit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Brand colors (harmonized with String Art Studio warm amber and obsidian theme)
const COLORS = {
	primary: '#1c1917', // Stone 900 - High-contrast charcoal for precise printed marks
	accent: '#b45309', // Amber 700 - Warm copper artisan accent
	secondary: '#fef3c7', // Amber 100 - Soft warm badge background
	badgeText: '#92400e', // Amber 800
	muted: '#78716c', // Stone 500 - Neutral guide marks
	text: '#292524', // Stone 800 - Body and labels
};

// Template configurations
// PDF points: 1 point = 1/72 inch = 0.3528 mm
// To convert mm to points: mm * 2.83465
const MM_TO_POINTS = 2.83465;

const templates = [
	{
		name: '100-pins-template',
		title: 'String Art Studio — 100 Pins Loom Template',
		pins: 100,
		// A4: 210x297mm - Max circle ~180mm (with margins + label space)
		pageWidth: 210 * MM_TO_POINTS, // 595.28 points
		pageHeight: 297 * MM_TO_POINTS, // 841.89 points
		circleDiameterMM: 180, // 18cm = 180mm (fits in A4 with label space)
		circleDiameter: 180 * MM_TO_POINTS, // 510.24 points
		level: 'Principiante / Beginner (100 Pins)',
		pageSize: 'A4',
	},
	{
		name: '200-pins-template',
		title: 'String Art Studio — 200 Pins Loom Template',
		pins: 200,
		// A3: 297x420mm - Max circle ~260mm (with margins + label space)
		pageWidth: 297 * MM_TO_POINTS, // 841.89 points
		pageHeight: 420 * MM_TO_POINTS, // 1190.55 points
		circleDiameterMM: 260, // 26cm = 260mm (fits in A3 with label space)
		circleDiameter: 260 * MM_TO_POINTS, // 737.01 points
		level: 'Intermedio / Intermediate (200 Pins)',
		pageSize: 'A3',
	},
	{
		name: '300-pins-template',
		title: 'String Art Studio — 300 Pins Loom Template',
		pins: 300,
		// A2: 420x594mm - Max circle ~390mm (with margins + label space)
		pageWidth: 420 * MM_TO_POINTS, // 1190.55 points
		pageHeight: 594 * MM_TO_POINTS, // 1683.78 points
		circleDiameterMM: 390, // 39cm = 390mm (fits in A2 with label space)
		circleDiameter: 390 * MM_TO_POINTS, // 1105.51 points
		level: 'Avanzado / Master Artisan (300 Pins)',
		pageSize: 'A2',
	},
];

/**
 * Generate a single template PDF
 */
function generateTemplate(config) {
	const outputPath = path.join(
		__dirname,
		'..',
		'public',
		'templates',
		`${config.name}.pdf`,
	);

	// Create templates directory if it doesn't exist
	const templatesDir = path.dirname(outputPath);
	if (!fs.existsSync(templatesDir)) {
		fs.mkdirSync(templatesDir, { recursive: true });
	}

	const doc = new PDFDocument({
		size: [config.pageWidth, config.pageHeight],
		margins: { top: 30, bottom: 30, left: 30, right: 30 },
		autoFirstPage: true,
	});

	const stream = fs.createWriteStream(outputPath);
	doc.pipe(stream);

	// Logo path
	const logoPath = path.join(__dirname, '..', 'logo.png');
	const hasLogo = fs.existsSync(logoPath);

	// Center coordinates
	const centerX = config.pageWidth / 2;
	const centerY = config.pageHeight / 2;
	const radius = config.circleDiameter / 2;

	// Add watermark logo in corner (subtle)
	if (hasLogo) {
		const logoSize = 40;
		doc.save();
		doc.opacity(0.15);
		doc.image(logoPath, config.pageWidth - logoSize - 20, 20, {
			width: logoSize,
			height: logoSize,
			fit: [logoSize, logoSize],
		});
		doc.restore();
	}

	// Header with title (no decorative bar)
	doc
		.fontSize(22)
		.font('Helvetica-Bold')
		.fillColor(COLORS.primary)
		.text(config.title, 50, 30, {
			align: 'center',
			width: config.pageWidth - 100,
			lineBreak: false,
		});

	// Badge with level
	const badgeY = 60;
	const badgeWidth = Math.max(200, config.level.length * 6.5);
	const badgeX = centerX - badgeWidth / 2;

	doc
		.save()
		.roundedRect(badgeX, badgeY, badgeWidth, 22, 11)
		.fillAndStroke(COLORS.secondary, COLORS.accent);

	doc
		.fontSize(9.5)
		.font('Helvetica-Bold')
		.fillColor(COLORS.badgeText)
		.text(config.level, badgeX, badgeY + 6, {
			width: badgeWidth,
			align: 'center',
			lineBreak: false,
		});
	doc.restore();

	// Subtitle
	doc
		.fontSize(10)
		.font('Helvetica')
		.fillColor(COLORS.text)
		.text(
			`${config.pins} Pins (0 to ${config.pins - 1}) | Circle: ${config.circleDiameterMM}mm (${
				config.circleDiameterMM / 10
			}cm) | Clockwise`,
			50,
			87,
			{
				align: 'center',
				width: config.pageWidth - 100,
				lineBreak: false,
			},
		);

	// Dynamic font sizes based on page size
	const footerTitleSize =
		config.pageSize === 'A4' ? 9 : config.pageSize === 'A3' ? 10 : 11;
	const footerTextSize =
		config.pageSize === 'A4' ? 7.5 : config.pageSize === 'A3' ? 8.5 : 9.5;

	// Draw outer circle with primary color
	doc
		.save()
		.circle(centerX, centerY, radius)
		.lineWidth(2)
		.strokeColor(COLORS.primary)
		.stroke();
	doc.restore();

	// Draw center crosshair
	const crosshairSize = 12;
	doc
		.save()
		.moveTo(centerX - crosshairSize, centerY)
		.lineTo(centerX + crosshairSize, centerY)
		.moveTo(centerX, centerY - crosshairSize)
		.lineTo(centerX, centerY + crosshairSize)
		.lineWidth(1.5)
		.strokeColor(COLORS.accent)
		.stroke();
	doc.restore();

	// Draw pin positions (0-indexed, starting from 12 o'clock top center)
	const angleStep = (2 * Math.PI) / config.pins;

	for (let i = 0; i < config.pins; i++) {
		const angle = i * angleStep - Math.PI / 2; // Start from top (12 o'clock)
		const x = centerX + radius * Math.cos(angle);
		const y = centerY + radius * Math.sin(angle);

		const isZero = i === 0;

		// Draw pin mark
		doc.save();
		if (isZero) {
			doc.circle(x, y, 4).fillAndStroke(COLORS.accent, COLORS.primary);
		} else {
			doc.circle(x, y, 2.2).fillAndStroke(COLORS.primary, COLORS.primary);
		}
		doc.restore();

		// Calculate label position (slightly outside the circle)
		const labelDistance = radius + (isZero ? 22 : 18);
		const labelX = centerX + labelDistance * Math.cos(angle);
		const labelY = centerY + labelDistance * Math.sin(angle);

		// Pin number (0-indexed)
		const pinNumber = i;

		// Only show every Nth label to avoid crowding
		const labelInterval = config.pins <= 100 ? 5 : config.pins <= 200 ? 10 : 15;

		if (isZero) {
			doc
				.fontSize(7.5)
				.font('Helvetica-Bold')
				.fillColor(COLORS.accent)
				.text('0 (TOP)', labelX - 16, labelY - 5, {
					width: 32,
					align: 'center',
					lineBreak: false,
				});
		} else if (pinNumber % labelInterval === 0) {
			doc
				.fontSize(7)
				.font('Helvetica-Bold')
				.fillColor(COLORS.text)
				.text(pinNumber.toString(), labelX - 10, labelY - 5, {
					width: 20,
					align: 'center',
					lineBreak: false,
				});
		}
	}

	// Workshop Zone (Instructions box + 50 mm Calibration Scale Bar + Footer)
	const instructionTitleSize =
		config.pageSize === 'A4' ? 8.5 : config.pageSize === 'A3' ? 9.5 : 10.5;
	const instructionTextSize =
		config.pageSize === 'A4' ? 7.5 : config.pageSize === 'A3' ? 8.5 : 9.5;

	const instructionsY = centerY + radius + 24;
	const instructionsBoxWidth = Math.min(config.pageWidth - 100, 540);
	const instructionsX = centerX - instructionsBoxWidth / 2;

	doc
		.save()
		.roundedRect(instructionsX, instructionsY, instructionsBoxWidth, 28, 5)
		.fillAndStroke('#fefce8', '#fef08a');

	doc
		.fontSize(instructionTitleSize)
		.font('Helvetica-Bold')
		.fillColor(COLORS.accent)
		.text('Instructions:', instructionsX + 10, instructionsY + 7, {
			lineBreak: false,
		});

	doc
		.fontSize(instructionTextSize)
		.font('Helvetica')
		.fillColor(COLORS.text)
		.text(
			'1. Print at 100% scale (no fit-to-page). 2. Fix to wooden board. 3. Align Pin 0 at 12:00. 4. Hammer pins. 5. Follow Studio guide!',
			instructionsX + 70,
			instructionsY + 7,
			{
				width: instructionsBoxWidth - 80,
				align: 'left',
				lineBreak: false,
			},
		);
	doc.restore();

	// 50 mm Calibration Scale Bar
	const calY = instructionsY + 44;
	const calWidth = 50 * MM_TO_POINTS;
	const calX0 = centerX - calWidth / 2;

	doc.save();
	doc.lineWidth(1.2).strokeColor(COLORS.primary);
	doc
		.moveTo(calX0, calY)
		.lineTo(calX0 + calWidth, calY)
		.stroke();

	for (const mm of [0, 10, 20, 30, 40, 50]) {
		const tx = calX0 + mm * MM_TO_POINTS;
		const tickH = mm % 25 === 0 ? 5 : 3;
		doc
			.moveTo(tx, calY)
			.lineTo(tx, calY - tickH)
			.stroke();
	}

	doc
		.fontSize(7)
		.font('Helvetica-Bold')
		.fillColor(COLORS.primary)
		.text(
			'50 mm CALIBRATION SCALE BAR / REGLA DE CALIBRACIÓN',
			centerX - 150,
			calY + 9,
			{
				width: 300,
				align: 'center',
				lineBreak: false,
			},
		);

	doc
		.fontSize(6.5)
		.font('Helvetica')
		.fillColor(COLORS.muted)
		.text(
			'Measure with physical ruler. Ensure print scaling is 100% (Do NOT scale to fit page).',
			centerX - 200,
			calY + 18,
			{
				width: 400,
				align: 'center',
				lineBreak: false,
			},
		);
	doc.restore();

	// Footer (positioned below calibration bar)
	const footerY = calY + 36;

	doc
		.fontSize(footerTitleSize)
		.font('Helvetica-Bold')
		.fillColor(COLORS.primary)
		.text('String Art Studio — Printable Artisan Loom Template', 50, footerY, {
			align: 'center',
			width: config.pageWidth - 100,
			lineBreak: false,
		});

	doc
		.fontSize(footerTextSize)
		.font('Helvetica')
		.fillColor(COLORS.muted)
		.text(
			`Generated on ${new Date().toLocaleDateString()} | String Art Studio (www.stringartgenerator.app)`,
			50,
			footerY + 14,
			{
				align: 'center',
				width: config.pageWidth - 100,
				lineBreak: false,
			},
		);

	doc.end();
	return new Promise((resolve, reject) => {
		stream.on('finish', () => {
			const diameterCM = config.circleDiameterMM / 10;
			console.log(
				`✅ Generated: ${config.name}.pdf (Circle: ${diameterCM}cm / ${config.circleDiameterMM}mm)`,
			);
			resolve();
		});
		stream.on('error', reject);
	});
}

/**
 * Generate all templates
 */
async function generateAllTemplates() {
	console.log('🎨 String Art Template Generator\n');
	console.log(`Generating ${templates.length} templates...\n`);

	try {
		for (const config of templates) {
			await generateTemplate(config);
		}
		console.log('\n✨ All templates generated successfully!');
		console.log('📁 Location: public/templates/');
	} catch (error) {
		console.error('❌ Error generating templates:', error);
		process.exit(1);
	}
}

// Run generator
generateAllTemplates();
