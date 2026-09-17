'use client';

import { Download, FileCode, FileImage, FileText } from 'lucide-react';
import { useTranslation } from '@/shared/i18n';
import { Button } from '@/shared/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/shared/ui/dialog';
import type { AlgorithmConfig, ColorRun, LoomConfig, Pin } from '../../types';
import {
	generatePinSequenceText,
	generateProjectJson,
	generateSvgString,
	triggerDownload,
} from '../../utils/exportGenerators';

export interface ExportModalProps {
	isOpen: boolean;
	onClose: () => void;
	pins: Pin[];
	lines: number[];
	loom: LoomConfig;
	algo: AlgorithmConfig;
	colorRuns?: ColorRun[];
	timeElapsedMs?: number;
}

export function ExportModal({
	isOpen,
	onClose,
	pins,
	lines,
	loom,
	algo,
	colorRuns,
	timeElapsedMs,
}: Readonly<ExportModalProps>) {
	const { t } = useTranslation();

	const handleDownloadSvg = () => {
		const svg = generateSvgString(
			pins,
			lines,
			700,
			algo.opacityStep / 100,
			algo.lineWeight,
			algo.colorMode ?? 'dark-on-light',
			loom,
			colorRuns,
		);
		triggerDownload(svg, 'string-art-vector.svg', 'image/svg+xml');
	};

	const handleDownloadTxt = () => {
		const txt = generatePinSequenceText(
			lines,
			loom,
			algo,
			colorRuns,
			timeElapsedMs,
		);
		triggerDownload(txt, 'secuencia-clavos.txt', 'text/plain');
	};

	const handleDownloadJson = () => {
		const json = generateProjectJson(lines, loom, algo, colorRuns);
		triggerDownload(json, 'proyecto-string-art.json', 'application/json');
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<div className='flex items-center gap-2'>
						<Download className='size-4 text-primary' />
						<DialogTitle>{t.exportModal.title}</DialogTitle>
					</div>
					<DialogDescription>{t.exportModal.description}</DialogDescription>
				</DialogHeader>

				<div className='grid grid-cols-1 gap-3 py-2'>
					<Button
						variant='outline'
						size='lg'
						onClick={handleDownloadSvg}
						className='h-auto justify-start gap-3 p-3.5 text-left'
					>
						<div className='flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary'>
							<FileImage className='size-5' />
						</div>
						<div className='flex flex-col'>
							<span className='font-semibold text-foreground text-xs'>
								{t.exportModal.svgTitle}
							</span>
							<span className='text-muted-foreground text-xs'>
								{t.exportModal.svgDesc}
							</span>
						</div>
					</Button>

					<Button
						variant='outline'
						size='lg'
						onClick={handleDownloadTxt}
						className='h-auto justify-start gap-3 p-3.5 text-left'
					>
						<div className='flex size-9 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'>
							<FileText className='size-5' />
						</div>
						<div className='flex flex-col'>
							<span className='font-semibold text-foreground text-xs'>
								{t.exportModal.txtTitle}
							</span>
							<span className='text-muted-foreground text-xs'>
								{t.exportModal.txtDesc}
							</span>
						</div>
					</Button>

					<Button
						variant='outline'
						size='lg'
						onClick={handleDownloadJson}
						className='h-auto justify-start gap-3 p-3.5 text-left'
					>
						<div className='flex size-9 shrink-0 items-center justify-center rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400'>
							<FileCode className='size-5' />
						</div>
						<div className='flex flex-col'>
							<span className='font-semibold text-foreground text-xs'>
								{t.exportModal.jsonTitle}
							</span>
							<span className='text-muted-foreground text-xs'>
								{t.exportModal.jsonDesc}
							</span>
						</div>
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
