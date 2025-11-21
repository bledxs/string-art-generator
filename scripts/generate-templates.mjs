/**
 * String Art Template Generator
 * Generates PDF templates with numbered pin positions in a circle
 */
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Brand colors (from globals.css)
const COLORS = {
  primary: '#6d28d9', // oklch(0.4815 0.1178 263.3758) - Purple/Violet
  secondary: '#fbbf24', // oklch(0.8567 0.1164 81.0092) - Amber
  muted: '#9ca3af', // Gray for subtle elements
  text: '#1f2937', // Dark gray for text
};

// Template configurations
// PDF points: 1 point = 1/72 inch = 0.3528 mm
// To convert mm to points: mm * 2.83465
const MM_TO_POINTS = 2.83465;

const templates = [
  {
    name: '100-pins-template',
    title: '100 Pins String Art Template',
    pins: 100,
    // A4: 210x297mm - Max circle ~180mm (with margins + label space)
    pageWidth: 210 * MM_TO_POINTS, // 595.28 points
    pageHeight: 297 * MM_TO_POINTS, // 841.89 points
    circleDiameterMM: 180, // 18cm = 180mm (fits in A4 with label space)
    circleDiameter: 180 * MM_TO_POINTS, // 510.24 points
    level: 'Beginner',
    pageSize: 'A4',
  },
  {
    name: '200-pins-template',
    title: '200 Pins String Art Template',
    pins: 200,
    // A3: 297x420mm - Max circle ~260mm (with margins + label space)
    pageWidth: 297 * MM_TO_POINTS, // 841.89 points
    pageHeight: 420 * MM_TO_POINTS, // 1190.55 points
    circleDiameterMM: 260, // 26cm = 260mm (fits in A3 with label space)
    circleDiameter: 260 * MM_TO_POINTS, // 737.01 points
    level: 'Intermediate',
    pageSize: 'A3',
  },
  {
    name: '300-pins-template',
    title: '300 Pins String Art Template',
    pins: 300,
    // A2: 420x594mm - Max circle ~390mm (with margins + label space)
    pageWidth: 420 * MM_TO_POINTS, // 1190.55 points
    pageHeight: 594 * MM_TO_POINTS, // 1683.78 points
    circleDiameterMM: 390, // 39cm = 390mm (fits in A2 with label space)
    circleDiameter: 390 * MM_TO_POINTS, // 1105.51 points
    level: 'Advanced',
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
  const badgeWidth = 120;
  const badgeX = centerX - badgeWidth / 2;

  doc
    .save()
    .roundedRect(badgeX, badgeY, badgeWidth, 20, 10)
    .fillAndStroke(COLORS.secondary, COLORS.secondary);

  doc
    .fontSize(10)
    .font('Helvetica-Bold')
    .fillColor(COLORS.text)
    .text(config.level, badgeX, badgeY + 5, {
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
      `${config.pins} Pins | Circle: ${config.circleDiameterMM}mm (${
        config.circleDiameterMM / 10
      }cm)`,
      50,
      85,
      {
        align: 'center',
        width: config.pageWidth - 100,
        lineBreak: false,
      },
    );

  // Instructions box
  const instructionsY = 105;
  const instructionsBoxWidth = config.pageWidth - 100;

  // Dynamic font sizes based on page size
  const instructionTitleSize =
    config.pageSize === 'A4' ? 8 : config.pageSize === 'A3' ? 9 : 10;
  const instructionTextSize =
    config.pageSize === 'A4' ? 7 : config.pageSize === 'A3' ? 8 : 9;
  const footerTitleSize =
    config.pageSize === 'A4' ? 8 : config.pageSize === 'A3' ? 9 : 10;
  const footerTextSize =
    config.pageSize === 'A4' ? 7 : config.pageSize === 'A3' ? 8 : 9;

  doc
    .save()
    .roundedRect(50, instructionsY, instructionsBoxWidth, 26, 5)
    .fillAndStroke('#f3f4f6', '#e5e7eb');

  doc
    .fontSize(instructionTitleSize)
    .font('Helvetica-Bold')
    .fillColor(COLORS.primary)
    .text('Instructions:', 60, instructionsY + 5, { lineBreak: false });

  doc
    .fontSize(instructionTextSize)
    .font('Helvetica')
    .fillColor(COLORS.text)
    .text(
      '1. Print at 100% scale  2. Attach to board  3. Mark holes  4. Insert nails  5. Start threading!',
      60,
      instructionsY + 15,
      {
        width: instructionsBoxWidth - 20,
        align: 'left',
        lineBreak: false,
      },
    );
  doc.restore();

  // Draw outer circle with primary color
  doc
    .save()
    .circle(centerX, centerY, radius)
    .lineWidth(2.5)
    .strokeColor(COLORS.primary)
    .stroke();
  doc.restore();

  // Draw center crosshair with primary color
  const crosshairSize = 10;
  doc
    .save()
    .moveTo(centerX - crosshairSize, centerY)
    .lineTo(centerX + crosshairSize, centerY)
    .moveTo(centerX, centerY - crosshairSize)
    .lineTo(centerX, centerY + crosshairSize)
    .lineWidth(1.5)
    .strokeColor(COLORS.primary)
    .stroke();
  doc.restore();

  // Draw pin positions
  const angleStep = (2 * Math.PI) / config.pins;

  for (let i = 0; i < config.pins; i++) {
    const angle = i * angleStep - Math.PI / 2; // Start from top (12 o'clock)
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    // Draw small circle for pin position
    doc.save();
    doc.circle(x, y, 2.5).fillAndStroke(COLORS.primary, COLORS.primary);
    doc.restore();

    // Calculate label position (slightly outside the circle)
    const labelDistance = radius + 18; // Increased from 15 to 18 for more space
    const labelX = centerX + labelDistance * Math.cos(angle);
    const labelY = centerY + labelDistance * Math.sin(angle);

    // Pin number (1-indexed)
    const pinNumber = i + 1;

    // Only show every Nth label to avoid crowding
    const labelInterval = config.pins <= 100 ? 5 : config.pins <= 200 ? 10 : 15;

    if (pinNumber % labelInterval === 0 || pinNumber === 1) {
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

  // Footer (positioned below circle + labels with more spacing)
  const footerY = centerY + radius + 50;

  doc
    .fontSize(footerTitleSize)
    .font('Helvetica-Bold')
    .fillColor(COLORS.primary)
    .text('String Art Generator', 50, footerY, {
      align: 'center',
      width: config.pageWidth - 100,
      lineBreak: false,
    });

  doc
    .fontSize(footerTextSize)
    .font('Helvetica')
    .fillColor(COLORS.muted)
    .text(
      `Generated on ${new Date().toLocaleDateString()} | string-art-generator.vercel.app`,
      50,
      footerY + 12,
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
