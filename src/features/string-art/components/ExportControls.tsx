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
  const { result, parameters, exportFormat, setExportFormat } =
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

    // TODO: Add physical size configuration (cm/inches) for real-world builds
    // This would require additional UI controls for:
    // - Circle diameter (e.g., 50cm, 100cm)
    // - Pin spacing calculation
    // - String length estimation

    const totalPins = result.metadata.parameters.pins;
    const totalLines = result.paths.length;

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

MATERIALS NEEDED:
- Circular board or backing material
- ${totalPins} pins/nails (evenly spaced around circle)
- Dark string/thread (black recommended)
- Hammer and ruler for precise pin placement
- Protractor or angle guide

${'='.repeat(50)}

SETUP INSTRUCTIONS:

1. PREPARE THE BOARD:
   - Choose a circular board (recommended size: 50-100cm diameter)
   - Mark the center point
   - Draw a circle slightly smaller than the board edge

2. PLACE THE PINS:
   - Divide the circle into ${totalPins} equal segments
   - Angle between pins: ${(360 / totalPins).toFixed(2)}°
   - Number each pin from 0 to ${totalPins - 1} clockwise
   - Ensure pins are at equal height (about 1cm above board)

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

TIPS:
- Maintain consistent tension on the string
- Don't pull too tight - pins may bend
- Work in good lighting
- Take breaks every 500-1000 lines
- You can adjust opacity by varying string passes

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
