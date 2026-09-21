'use client';

import { Cpu, Download, FileCode, FileImage, FileText } from 'lucide-react';
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
import { ExportGCodeAction } from './ExportGCodeAction';
import { ExportOptionCard } from './ExportOptionCard';
import { ExportSponsorCallout } from './ExportSponsorCallout';

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

					<ExportSponsorCallout />
				</div>
			</DialogContent>
		</Dialog>
	);
}
