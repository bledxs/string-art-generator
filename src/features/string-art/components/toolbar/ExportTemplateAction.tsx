'use client';

import { useTranslation } from '@/shared/i18n';
import type { PaperSize } from '../../utils/templateGenerator';

export type TemplateFormat = 'pdf' | 'poster' | 'svg';

export interface ExportTemplateActionProps {
	format: TemplateFormat;
	onSelectFormat: (format: TemplateFormat) => void;
	paper: PaperSize;
	onSelectPaper: (paper: PaperSize) => void;
	sheetsCount?: number;
}

export function ExportTemplateAction({
	format,
	onSelectFormat,
	paper,
	onSelectPaper,
	sheetsCount,
}: Readonly<ExportTemplateActionProps>) {
	const { t } = useTranslation();

	return (
		<div className='flex flex-col gap-1.5 rounded-lg border border-rose-500/20 bg-rose-500/5 px-2.5 py-1.5 text-xs'>
			<div className='flex items-center justify-between'>
				<span className='font-medium text-muted-foreground'>
					{t.exportModal.formatLabel}
				</span>
				<div className='flex gap-1'>
					<button
						type='button'
						onClick={() => onSelectFormat('pdf')}
						className={`rounded px-1.5 py-0.5 font-medium transition-all ${
							format === 'pdf'
								? 'bg-rose-500 text-white shadow-xs'
								: 'text-muted-foreground hover:text-foreground'
						}`}
					>
						PDF 1:1
					</button>
					<button
						type='button'
						onClick={() => onSelectFormat('poster')}
						className={`rounded px-1.5 py-0.5 font-medium transition-all ${
							format === 'poster'
								? 'bg-rose-500 text-white shadow-xs'
								: 'text-muted-foreground hover:text-foreground'
						}`}
					>
						{t.exportModal.posterLabel} {sheetsCount ? `(${sheetsCount}p)` : ''}
					</button>
					<button
						type='button'
						onClick={() => onSelectFormat('svg')}
						className={`rounded px-1.5 py-0.5 font-medium transition-all ${
							format === 'svg'
								? 'bg-rose-500 text-white shadow-xs'
								: 'text-muted-foreground hover:text-foreground'
						}`}
					>
						SVG
					</button>
				</div>
			</div>
			{format === 'poster' && (
				<div className='flex items-center justify-between border-rose-500/10 border-t pt-1'>
					<span className='text-muted-foreground text-xs'>
						{t.exportModal.paperLabel}
					</span>
					<div className='flex gap-1'>
						{(['a4', 'letter', 'legal'] as const).map((p) => (
							<button
								key={p}
								type='button'
								onClick={() => onSelectPaper(p)}
								className={`rounded px-1.5 py-0.5 font-mono text-xs uppercase transition-all ${
									paper === p
										? 'bg-rose-600 font-semibold text-white'
										: 'text-muted-foreground hover:text-foreground'
								}`}
							>
								{p}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
