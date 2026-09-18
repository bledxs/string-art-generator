'use client';

import { Download, FileCode, FileImage, FileText, Heart } from 'lucide-react';
import { siteConfig } from '@/shared/config/site';
import { useTranslation } from '@/shared/i18n';
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
		triggerDownload(txt, 'string-art-instructions.txt', 'text/plain');
	};

	const handleDownloadJson = () => {
		const json = generateProjectJson(lines, loom, algo, colorRuns);
		triggerDownload(json, 'string-art-project.json', 'application/json');
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent
				className='sm:max-w-md'
				onOpenAutoFocus={(e) => e.preventDefault()}
			>
				<DialogHeader>
					<div className='flex items-center gap-2'>
						<Download className='size-4 text-primary' />
						<DialogTitle>{t.exportModal.title}</DialogTitle>
					</div>
					<DialogDescription>{t.exportModal.description}</DialogDescription>
				</DialogHeader>

				<div className='grid grid-cols-1 gap-2.5 py-2'>
					{/* SVG Card */}
					<button
						type='button'
						onClick={handleDownloadSvg}
						className='group relative flex w-full cursor-pointer items-center justify-between rounded-xl border border-border/70 bg-card/60 p-3.5 text-left shadow-xs transition-all duration-200 hover:border-amber-500/40 hover:bg-amber-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 active:opacity-90'
					>
						<div className='flex items-center gap-3.5'>
							<div className='flex size-10 shrink-0 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10 text-amber-600 transition-all group-hover:scale-105 group-hover:bg-amber-500/20 dark:text-amber-400'>
								<FileImage className='size-5' />
							</div>
							<div className='flex flex-col'>
								<div className='flex items-center gap-2'>
									<span className='font-semibold text-foreground text-xs sm:text-sm'>
										{t.exportModal.svgTitle}
									</span>
									<span className='rounded border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 font-medium font-mono text-amber-600 text-xs dark:text-amber-400'>
										.SVG
									</span>
								</div>
								<span className='mt-0.5 text-muted-foreground text-xs leading-relaxed'>
									{t.exportModal.svgDesc}
								</span>
							</div>
						</div>
						<Download className='size-4 shrink-0 text-muted-foreground/40 transition-all group-hover:scale-110 group-hover:text-foreground' />
					</button>

					{/* TXT Card */}
					<button
						type='button'
						onClick={handleDownloadTxt}
						className='group relative flex w-full cursor-pointer items-center justify-between rounded-xl border border-border/70 bg-card/60 p-3.5 text-left shadow-xs transition-all duration-200 hover:border-emerald-500/40 hover:bg-emerald-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 active:opacity-90'
					>
						<div className='flex items-center gap-3.5'>
							<div className='flex size-10 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 transition-all group-hover:scale-105 group-hover:bg-emerald-500/20 dark:text-emerald-400'>
								<FileText className='size-5' />
							</div>
							<div className='flex flex-col'>
								<div className='flex items-center gap-2'>
									<span className='font-semibold text-foreground text-xs sm:text-sm'>
										{t.exportModal.txtTitle}
									</span>
									<span className='rounded border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 font-medium font-mono text-emerald-600 text-xs dark:text-emerald-400'>
										.TXT
									</span>
								</div>
								<span className='mt-0.5 text-muted-foreground text-xs leading-relaxed'>
									{t.exportModal.txtDesc}
								</span>
							</div>
						</div>
						<Download className='size-4 shrink-0 text-muted-foreground/40 transition-all group-hover:scale-110 group-hover:text-foreground' />
					</button>

					{/* JSON Card */}
					<button
						type='button'
						onClick={handleDownloadJson}
						className='group relative flex w-full cursor-pointer items-center justify-between rounded-xl border border-border/70 bg-card/60 p-3.5 text-left shadow-xs transition-all duration-200 hover:border-blue-500/40 hover:bg-blue-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 active:opacity-90'
					>
						<div className='flex items-center gap-3.5'>
							<div className='flex size-10 shrink-0 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-600 transition-all group-hover:scale-105 group-hover:bg-blue-500/20 dark:text-blue-400'>
								<FileCode className='size-5' />
							</div>
							<div className='flex flex-col'>
								<div className='flex items-center gap-2'>
									<span className='font-semibold text-foreground text-xs sm:text-sm'>
										{t.exportModal.jsonTitle}
									</span>
									<span className='rounded border border-blue-500/30 bg-blue-500/10 px-1.5 py-0.5 font-medium font-mono text-blue-600 text-xs dark:text-blue-400'>
										.JSON
									</span>
								</div>
								<span className='mt-0.5 text-muted-foreground text-xs leading-relaxed'>
									{t.exportModal.jsonDesc}
								</span>
							</div>
						</div>
						<Download className='size-4 shrink-0 text-muted-foreground/40 transition-all group-hover:scale-110 group-hover:text-foreground' />
					</button>

					{/* GitHub Sponsors Callout */}
					<div className='mt-1 flex items-center justify-between gap-3 rounded-xl border border-rose-500/20 bg-rose-500/5 p-3 text-xs'>
						<div className='flex min-w-0 items-center gap-2.5'>
							<Heart className='size-4 shrink-0 fill-rose-500/20 text-rose-500 dark:text-rose-400' />
							<span className='truncate text-muted-foreground'>
								{t.exportModal.sponsorDesc}
							</span>
						</div>
						<a
							href={siteConfig.links.sponsor}
							target='_blank'
							rel='noreferrer'
							className='shrink-0 rounded-lg bg-rose-500/10 px-2.5 py-1 font-medium text-rose-600 transition-colors hover:bg-rose-500 hover:text-white dark:text-rose-400 dark:hover:bg-rose-500 dark:hover:text-white'
						>
							{t.exportModal.sponsorBtn}
						</a>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
