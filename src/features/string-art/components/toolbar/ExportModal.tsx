'use client';

import {
	Cpu,
	Download,
	FileCode,
	FileImage,
	FileText,
	Printer,
} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '@/shared/i18n';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/shared/ui/dialog';
import type {
	AlgorithmConfig,
	ColorRun,
	GCodeKinematics,
	LoomConfig,
	Pin,
} from '../../types';
import {
	generatePinSequenceText,
	generateProjectJson,
	generateSvgString,
	triggerDownload,
} from '../../utils/exportGenerators';
import { generateGCode } from '../../utils/gcodeGenerator';
import {
	calculateLoomTilingGrid,
	calculatePhysicalLoomMetrics,
	generateLoomTemplatePdf,
	generateLoomTemplateSvg,
	generateTiledLoomTemplatePdf,
	type PaperSize,
	triggerBlobDownload,
} from '../../utils/templateGenerator';
import { ExportGCodeAction } from './ExportGCodeAction';
import { ExportOptionCard } from './ExportOptionCard';
import { ExportSponsorCallout } from './ExportSponsorCallout';
import {
	ExportTemplateAction,
	type TemplateFormat,
} from './ExportTemplateAction';

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
	const [kinematics, setKinematics] = useState<GCodeKinematics>('polar');
	const [templateFormat, setTemplateFormat] = useState<TemplateFormat>('pdf');
	const [templatePaper, setTemplatePaper] = useState<PaperSize>('a4');

	const templateGrid = calculateLoomTilingGrid(loom, templatePaper);

	const handleDownloadTemplate = () => {
		const metrics = calculatePhysicalLoomMetrics(loom);
		const prefix = `loom-template-${loom.shape}-${metrics.pinCount}p-${loom.physicalDiameterCm}cm`;
		if (templateFormat === 'pdf') {
			const blob = generateLoomTemplatePdf(loom);
			triggerBlobDownload(blob, `${prefix}.pdf`);
		} else if (templateFormat === 'poster') {
			const blob = generateTiledLoomTemplatePdf(loom, templatePaper);
			const filename = `loom-poster-${templateGrid.cols}x${templateGrid.rows}-${templatePaper}-${loom.shape}-${metrics.pinCount}p-${loom.physicalDiameterCm}cm.pdf`;
			triggerBlobDownload(blob, filename);
		} else {
			const svg = generateLoomTemplateSvg(loom);
			const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
			triggerBlobDownload(blob, `${prefix}.svg`);
		}
	};

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

	const handleDownloadGCode = () => {
		const gcode = generateGCode(pins, lines, loom, { kinematics }, colorRuns);
		triggerDownload(gcode, `string-art-${kinematics}.gcode`, 'text/plain');
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
					<ExportOptionCard
						title={t.exportModal.gcodeTitle}
						description={t.exportModal.gcodeDesc}
						extension='.GCODE'
						icon={<Cpu className='size-5' />}
						theme='purple'
						onClick={handleDownloadGCode}
						actionSlot={
							<ExportGCodeAction
								kinematics={kinematics}
								onSelectKinematics={setKinematics}
							/>
						}
					/>

					<ExportOptionCard
						title={t.exportModal.svgTitle}
						description={t.exportModal.svgDesc}
						extension='.SVG'
						icon={<FileImage className='size-5' />}
						theme='amber'
						onClick={handleDownloadSvg}
					/>

					<ExportOptionCard
						title={t.exportModal.txtTitle}
						description={t.exportModal.txtDesc}
						extension='.TXT'
						icon={<FileText className='size-5' />}
						theme='emerald'
						onClick={handleDownloadTxt}
					/>

					<ExportOptionCard
						title={t.exportModal.jsonTitle}
						description={t.exportModal.jsonDesc}
						extension='.JSON'
						icon={<FileCode className='size-5' />}
						theme='blue'
						onClick={handleDownloadJson}
					/>

					<ExportOptionCard
						title={t.exportModal.templateTitle}
						description={
							templateFormat === 'poster'
								? t.exportModal.templatePosterDesc
										.replace('{sheets}', String(templateGrid.totalSheets))
										.replace('{cols}', String(templateGrid.cols))
										.replace('{rows}', String(templateGrid.rows))
								: t.exportModal.templateDesc
						}
						extension={
							templateFormat === 'poster'
								? `.PDF (${templateGrid.totalSheets}p)`
								: `.${templateFormat.toUpperCase()}`
						}
						icon={<Printer className='size-5' />}
						theme='rose'
						onClick={handleDownloadTemplate}
						actionSlot={
							<ExportTemplateAction
								format={templateFormat}
								onSelectFormat={setTemplateFormat}
								paper={templatePaper}
								onSelectPaper={setTemplatePaper}
								sheetsCount={templateGrid.totalSheets}
							/>
						}
					/>

					<ExportSponsorCallout />
				</div>
			</DialogContent>
		</Dialog>
	);
}
