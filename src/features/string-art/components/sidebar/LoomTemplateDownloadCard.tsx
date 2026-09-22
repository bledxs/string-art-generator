'use client';

import { FileCode, FileDown, Printer } from 'lucide-react';
import { useTranslation } from '@/shared/i18n';
import { Button } from '@/shared/ui/button';
import type { LoomConfig } from '../../types';
import {
	calculatePhysicalLoomMetrics,
	generateLoomTemplatePdf,
	generateLoomTemplateSvg,
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
	const metrics = calculatePhysicalLoomMetrics(loom);

	const handleDownloadPdf = () => {
		const blob = generateLoomTemplatePdf(loom);
		const filename = `loom-template-${loom.shape}-${metrics.pinCount}p-${loom.physicalDiameterCm}cm.pdf`;
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

			<p className='text-muted-foreground text-xs leading-relaxed'>
				{t.loom.templateDesc}
			</p>

			<div className='flex items-center justify-between rounded bg-background/50 px-2 py-1 font-mono text-muted-foreground text-xs'>
				<span>{t.loom.pinSpacing}:</span>
				<span className='font-semibold text-foreground'>
					{metrics.pinSpacingMm.toFixed(2)} mm
				</span>
			</div>

			<div className='grid grid-cols-2 gap-1.5 pt-1'>
				<Button
					type='button'
					variant='outline'
					size='sm'
					disabled={disabled}
					onClick={handleDownloadPdf}
					className='h-8 w-full gap-1.5 px-2 text-xs'
					title='PDF'
				>
					<FileDown className='size-3.5 shrink-0 text-rose-500' />
					<span>PDF 1:1</span>
				</Button>

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
				{t.loom.scaleNotice}
			</span>
		</div>
	);
}
