'use client';

import { Download, FileCode, FileImage, FileText } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/shared/ui/dialog';
import type { AlgorithmConfig, LoomConfig, Pin } from '../../types';
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
}

export function ExportModal({
	isOpen,
	onClose,
	pins,
	lines,
	loom,
	algo,
}: Readonly<ExportModalProps>) {
	const handleDownloadSvg = () => {
		const svg = generateSvgString(
			pins,
			lines,
			700,
			algo.opacityStep / 100,
			algo.lineWeight,
			algo.colorMode ?? 'dark-on-light',
		);
		triggerDownload(svg, 'string-art-vector.svg', 'image/svg+xml');
	};

	const handleDownloadTxt = () => {
		const txt = generatePinSequenceText(lines);
		triggerDownload(txt, 'secuencia-clavos.txt', 'text/plain');
	};

	const handleDownloadJson = () => {
		const json = generateProjectJson(lines, loom, algo);
		triggerDownload(json, 'proyecto-string-art.json', 'application/json');
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<div className='flex items-center gap-2'>
						<Download className='size-4 text-primary' />
						<DialogTitle>Exportar Proyecto para Armado</DialogTitle>
					</div>
					<DialogDescription>
						Elige el formato de salida para fabricación digital o montaje físico
						paso a paso.
					</DialogDescription>
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
								SVG Vectorial (Corte Láser / Gráficos)
							</span>
							<span className='text-muted-foreground text-xs'>
								Trazo limpio con coordenadas exactas de hilo y marco.
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
								Secuencia de Clavos (TXT)
							</span>
							<span className='text-muted-foreground text-xs'>
								Lista secuencial de numeración para tejer a mano.
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
								Receta Completa del Proyecto (JSON)
							</span>
							<span className='text-muted-foreground text-xs'>
								Configuración de bastidor, parámetros y matriz completa.
							</span>
						</div>
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
