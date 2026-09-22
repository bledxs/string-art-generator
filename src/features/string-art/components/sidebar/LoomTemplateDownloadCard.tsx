'use client';

import { FileCode, FileDown, Layers, Printer } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '@/shared/i18n';
import { Button } from '@/shared/ui/button';
import type { LoomConfig } from '../../types';
import {
	calculateLoomTilingGrid,
	calculatePhysicalLoomMetrics,
	generateLoomTemplatePdf,
	generateLoomTemplateSvg,
	generateTiledLoomTemplatePdf,
	type PaperSize,
	triggerBlobDownload,
} from '../../utils/templateGenerator';

interface LoomTemplateDownloadCardProps {
	loom: LoomConfig;
	disabled?: boolean;
}

export function LoomTemplateDownloadCard({
	loom,
	disabled = false,
}: Readonly<LoomTemplateDownloadCardProps>) {
	const { t } = useTranslation();
	const [mode, setMode] = useState<'single' | 'tiled'>('single');
	const [paper, setPaper] = useState<PaperSize>('a4');

	const metrics = calculatePhysicalLoomMetrics(loom);
	const grid = calculateLoomTilingGrid(loom, paper);

	const handleDownloadSinglePdf = () => {
		const blob = generateLoomTemplatePdf(loom);
		const filename = `loom-template-${loom.shape}-${metrics.pinCount}p-${loom.physicalDiameterCm}cm.pdf`;
		triggerBlobDownload(blob, filename);
	};

	const handleDownloadTiledPdf = () => {
		const blob = generateTiledLoomTemplatePdf(loom, paper);
		const filename = `loom-poster-${grid.cols}x${grid.rows}-${paper}-${loom.shape}-${metrics.pinCount}p-${loom.physicalDiameterCm}cm.pdf`;
		triggerBlobDownload(blob, filename);
	};

	const handleDownloadSvg = () => {
		const svg = generateLoomTemplateSvg(loom);
		const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
		const filename = `loom-template-${loom.shape}-${metrics.pinCount}p-${loom.physicalDiameterCm}cm.svg`;
		triggerBlobDownload(blob, filename);
	};

	const dimLabel =
		metrics.shape === 'circle'
			? `Ø ${(metrics.widthMm / 10).toFixed(1)} cm`
			: `${(metrics.widthMm / 10).toFixed(1)} × ${(metrics.heightMm / 10).toFixed(1)} cm`;

	return (
		<div className='flex flex-col gap-2 rounded-lg border border-border/60 bg-muted/30 p-3'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-1.5 font-medium text-foreground text-xs'>
					<Printer className='size-3.5 text-primary' />
					<span>{t.loom.templateTitle}</span>
				</div>
				<span className='font-mono text-muted-foreground text-xs'>
					{dimLabel}
				</span>
			</div>

			{/* Mode Selector: 1 Hoja vs Dividida */}
			<div className='grid grid-cols-2 gap-1 rounded-md bg-background/60 p-0.5 text-xs'>
				<button
					type='button'
					disabled={disabled}
					onClick={() => setMode('single')}
					className={`rounded py-1 font-medium transition-all ${
						mode === 'single'
							? 'bg-primary text-primary-foreground shadow-xs'
							: 'text-muted-foreground hover:text-foreground'
					}`}
				>
					{t.loom.tilingSingle}
				</button>
				<button
					type='button'
					disabled={disabled}
					onClick={() => setMode('tiled')}
					className={`rounded py-1 font-medium transition-all ${
						mode === 'tiled'
							? 'bg-primary text-primary-foreground shadow-xs'
							: 'text-muted-foreground hover:text-foreground'
					}`}
				>
					{t.loom.tilingPoster}
				</button>
			</div>

			{/* When Tiled: Paper selector & auto-computed even grid */}
			{mode === 'tiled' && (
				<div className='flex flex-col gap-1.5 rounded-md border border-amber-500/20 bg-amber-500/5 p-2'>
					<div className='flex items-center justify-between text-xs'>
						<span className='text-muted-foreground'>{t.loom.paperTitle}:</span>
						<div className='flex gap-1'>
							{(['a4', 'letter', 'legal'] as const).map((p) => (
								<button
									key={p}
									type='button'
									disabled={disabled}
									onClick={() => setPaper(p)}
									className={`rounded px-1.5 py-0.5 font-mono text-xs uppercase transition-all ${
										paper === p
											? 'bg-amber-500 font-semibold text-white'
											: 'text-muted-foreground hover:text-foreground'
									}`}
								>
									{p}
								</button>
							))}
						</div>
					</div>

					<div className='flex items-center justify-between font-mono text-muted-foreground text-xs'>
						<span>División par / Grid:</span>
						<span className='font-semibold text-amber-600 dark:text-amber-400'>
							{grid.totalSheets} {t.loom.sheetsCount} ({grid.cols}×{grid.rows})
						</span>
					</div>
				</div>
			)}

			<div className='flex items-center justify-between rounded bg-background/50 px-2 py-1 font-mono text-muted-foreground text-xs'>
				<span>{t.loom.pinSpacing}:</span>
				<span className='font-semibold text-foreground'>
					{metrics.pinSpacingMm.toFixed(2)} mm
				</span>
			</div>

			{/* Action Buttons */}
			<div className='grid grid-cols-2 gap-1.5 pt-0.5'>
				{mode === 'single' ? (
					<Button
						type='button'
						variant='outline'
						size='sm'
						disabled={disabled}
						onClick={handleDownloadSinglePdf}
						className='h-8 w-full gap-1.5 px-2 text-xs'
						title='PDF'
					>
						<FileDown className='size-3.5 shrink-0 text-rose-500' />
						<span>PDF 1:1</span>
					</Button>
				) : (
					<Button
						type='button'
						variant='default'
						size='sm'
						disabled={disabled}
						onClick={handleDownloadTiledPdf}
						className='h-8 w-full gap-1.5 px-2 font-semibold text-xs'
						title='PDF Dividido'
					>
						<Layers className='size-3.5 shrink-0' />
						<span>PDF ({grid.totalSheets}p)</span>
					</Button>
				)}

				<Button
					type='button'
					variant='outline'
					size='sm'
					disabled={disabled}
					onClick={handleDownloadSvg}
					className='h-8 w-full gap-1.5 px-2 text-xs'
					title='SVG'
				>
					<FileCode className='size-3.5 shrink-0 text-amber-500' />
					<span>SVG Láser</span>
				</Button>
			</div>

			<span className='text-muted-foreground/80 text-xs leading-tight'>
				{mode === 'tiled'
					? `Auto-ajuste par para ${loom.physicalDiameterCm} cm. Une las ${grid.totalSheets} hojas con las marcas (+).`
					: t.loom.scaleNotice}
			</span>
		</div>
	);
}
