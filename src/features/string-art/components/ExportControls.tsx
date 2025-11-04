'use client';

import { useRef } from 'react';
import { saveAs } from 'file-saver';
import {
  Download,
  FileImage,
  FileJson,
  FileCode,
  FileText,
} from 'lucide-react';
import { useStringArtStore } from '../store/stringArtStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { ExportFormat } from '../types';

export function ExportControls() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { result, parameters, exportFormat, setExportFormat, physicalConfig } =
    useStringArtStore();

  const canExport = !!result;

  const handleExport = async () => {
    if (!result) return;

    switch (exportFormat) {
      case 'png':
        exportPNG();
        break;
      case 'svg':
        exportSVG();
        break;
      case 'json':
        exportJSON();
        break;
      case 'txt':
        exportTXT();
        break;
    }
  };

  const exportPNG = () => {
    if (!result) return;

    // Create temporary canvas
    const canvas = document.createElement('canvas');
    const size = 2000; // High resolution
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw background
    ctx.fillStyle = parameters.backgroundColor;
    ctx.fillRect(0, 0, size, size);

    // Draw string art
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 20;
    const totalPins = result.metadata.parameters.pins;

    // Calculate pin positions
    const pinPositions = Array.from({ length: totalPins }, (_, i) => {
      const angle = (i * 2 * Math.PI) / totalPins;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    });

    // Draw lines
    ctx.strokeStyle = `rgba(0, 0, 0, ${parameters.lineOpacity})`;
    ctx.lineWidth = parameters.lineWeight * 2; // Scale for high res
    ctx.lineCap = 'round';

    result.paths.forEach((path) => {
      const from = pinPositions[path.from];
      const to = pinPositions[path.to];

      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    });

    // Convert to blob and download
    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, `string-art-${Date.now()}.png`);
      }
    });
  };

  const exportSVG = () => {
    if (!result) return;

    const size = 1000;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 20;
    const totalPins = result.metadata.parameters.pins;

    // Calculate pin positions
    const pinPositions = Array.from({ length: totalPins }, (_, i) => {
      const angle = (i * 2 * Math.PI) / totalPins;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    });

    // Build SVG
    let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="${parameters.backgroundColor}"/>
  <g stroke="black" stroke-opacity="${parameters.lineOpacity}" stroke-width="${parameters.lineWeight}" stroke-linecap="round">
`;

    result.paths.forEach((path) => {
      const from = pinPositions[path.from];
      const to = pinPositions[path.to];
      svg += `    <line x1="${from.x.toFixed(2)}" y1="${from.y.toFixed(
        2,
      )}" x2="${to.x.toFixed(2)}" y2="${to.y.toFixed(2)}"/>\n`;
    });

    svg += `  </g>
</svg>`;

    // Download SVG
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    saveAs(blob, `string-art-${Date.now()}.svg`);
  };

  const exportJSON = () => {
    if (!result) return;

    const data = {
      metadata: result.metadata,
      parameters,
      paths: result.paths,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    saveAs(blob, `string-art-${Date.now()}.json`);
  };

  const exportTXT = () => {
    if (!result) return;

    const totalPins = result.metadata.parameters.pins;
    const totalLines = result.paths.length;

    // Calculate physical dimensions
    const diameter = physicalConfig.diameter;
    const unit = physicalConfig.unit;
    const circumference =
      physicalConfig.unit === 'cm'
        ? Math.PI * diameter
        : Math.PI * diameter * 2.54; // Convert to cm for calculation
    const pinSpacing = circumference / totalPins;

    // Estimate string length
    // Each line is approximately the diameter (simplified)
    const avgLineLength = diameter * 0.7; // Average chord length
    const totalStringLength = avgLineLength * totalLines;
    const totalStringLengthMeters = Number(
      (totalStringLength / 100).toFixed(2),
    ); // Convert cm to meters
    const totalStringLengthYards = Number(
      (totalStringLength / 91.44).toFixed(2),
    ); // Convert cm to yards

    let instructions = `STRING ART INSTRUCTIONS
${'='.repeat(50)}

PROJECT INFORMATION:
- Total Pins: ${totalPins}
- Total Lines: ${totalLines}
- Line Opacity: ${parameters.lineOpacity}
- Line Weight: ${parameters.lineWeight}
- Background Color: ${parameters.backgroundColor}
- Processing Time: ${(result.metadata.processingTime / 1000).toFixed(2)}s
- Generated: ${new Date().toLocaleString()}

${'='.repeat(50)}

PHYSICAL DIMENSIONS:
- Circle Diameter: ${diameter} ${unit}
- Circumference: ${(physicalConfig.unit === 'cm'
      ? circumference
      : circumference / 2.54
    ).toFixed(2)} ${unit}
- Pin Spacing: ${(physicalConfig.unit === 'cm'
      ? pinSpacing
      : pinSpacing / 2.54
    ).toFixed(2)} ${unit}
- Angle Between Pins: ${(360 / totalPins).toFixed(2)}°
- Pin Height: ${physicalConfig.pinHeight} ${unit}

ESTIMATED MATERIALS:
- String Length Required: ~${totalStringLengthMeters}m (~${totalStringLengthYards} yards)
  (Recommend ordering 2x for safety: ${(totalStringLengthMeters * 2).toFixed(
    0,
  )}m or ${(totalStringLengthYards * 2).toFixed(0)} yards)
- Board Size: Minimum ${(diameter * 1.1).toFixed(1)} ${unit} square
- ${totalPins} pins/nails (evenly spaced)

${'='.repeat(50)}

MATERIALS NEEDED:
- Circular board or backing material (${(diameter * 1.1).toFixed(
      1,
    )} ${unit} square minimum)
- ${totalPins} pins/nails (evenly spaced around circle)
- Dark string/thread: ${(totalStringLengthMeters * 2).toFixed(0)}m (~${(
      totalStringLengthYards * 2
    ).toFixed(0)} yards)
- Hammer and ruler for precise pin placement
- Protractor or angle guide
- Pencil for marking

${'='.repeat(50)}

SETUP INSTRUCTIONS:

1. PREPARE THE BOARD:
   - Choose a circular board (${diameter} ${unit} diameter)
   - Mark the center point
   - Draw a circle with radius ${(diameter / 2).toFixed(1)} ${unit}

2. PLACE THE PINS:
   - Divide the circle into ${totalPins} equal segments
   - Angle between pins: ${(360 / totalPins).toFixed(2)}°
   - Pin spacing: ${(physicalConfig.unit === 'cm'
     ? pinSpacing
     : pinSpacing / 2.54
   ).toFixed(2)} ${unit}
   - Number each pin from 0 to ${totalPins - 1} clockwise
   - Ensure pins are ${physicalConfig.pinHeight} ${unit} above board
   - Tip: Create a paper template with marked positions

3. STRINGING SEQUENCE:
   Follow this exact order for best results:

`;

    // Add first 100 connections as example (to avoid huge files)
    const maxInstructions = Math.min(100, totalLines);
    result.paths.slice(0, maxInstructions).forEach((path, index) => {
      instructions += `   ${(index + 1)
        .toString()
        .padStart(4, ' ')}. Pin ${path.from
        .toString()
        .padStart(3, ' ')} → Pin ${path.to.toString().padStart(3, ' ')}\n`;
    });

    if (totalLines > maxInstructions) {
      instructions += `\n   ... (${
        totalLines - maxInstructions
      } more connections)\n`;
      instructions += `   [Full sequence available in JSON export]\n`;
    }

    instructions += `
${'='.repeat(50)}

CONSTRUCTION TIPS:
- Maintain consistent tension on the string
- Don't pull too tight - pins may bend
- Work in good lighting
- Take breaks every 500-1000 lines
- You can adjust opacity by varying string passes
- Mark every 50th pin with a colored sticker for reference
- Use a continuous string without cutting (tie new thread when needed)

ESTIMATED TIME:
- Pin placement: ~${Math.ceil(totalPins / 20)} hours (at ~20 pins/hour)
- Stringing: ~${Math.ceil(totalLines / 500)} hours (at ~500 lines/hour)
- Total: ~${Math.ceil(totalPins / 20 + totalLines / 500)} hours

${'='.repeat(50)}

Need the complete sequence? Export as JSON format.
Generated by String Art Generator
`;

    const blob = new Blob([instructions], { type: 'text/plain' });
    saveAs(blob, `string-art-instructions-${Date.now()}.txt`);
  };

  return (
    <Card className='p-4'>
      <h3 className='font-semibold mb-3'>Export</h3>

      <div className='space-y-3'>
        {/* Format selector */}
        <Select
          value={exportFormat}
          onValueChange={(value) => setExportFormat(value as ExportFormat)}>
          <SelectTrigger>
            <SelectValue placeholder='Select format' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='png'>
              <div className='flex items-center gap-2'>
                <FileImage className='h-4 w-4' />
                <span>PNG (High Resolution)</span>
              </div>
            </SelectItem>
            <SelectItem value='svg'>
              <div className='flex items-center gap-2'>
                <FileCode className='h-4 w-4' />
                <span>SVG (Vector)</span>
              </div>
            </SelectItem>
            <SelectItem value='txt'>
              <div className='flex items-center gap-2'>
                <FileText className='h-4 w-4' />
                <span>TXT (Instructions)</span>
              </div>
            </SelectItem>
            <SelectItem value='json'>
              <div className='flex items-center gap-2'>
                <FileJson className='h-4 w-4' />
                <span>JSON (Data)</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Export button */}
        <Button
          onClick={handleExport}
          disabled={!canExport}
          className='w-full'
          size='lg'>
          <Download className='h-5 w-5 mr-2' />
          Download {exportFormat.toUpperCase()}
        </Button>

        {!canExport && (
          <p className='text-xs text-muted-foreground text-center'>
            Generate string art first
          </p>
        )}
      </div>
    </Card>
  );
}
