'use client';

export type TemplateFormat = 'pdf' | 'svg';

export interface ExportTemplateActionProps {
	format: TemplateFormat;
	onSelectFormat: (format: TemplateFormat) => void;
}

export function ExportTemplateAction({
	format,
	onSelectFormat,
}: Readonly<ExportTemplateActionProps>) {
	return (
		<div className='flex items-center justify-between rounded-lg border border-rose-500/20 bg-rose-500/5 px-2.5 py-1.5 text-xs'>
			<span className='font-medium text-muted-foreground'>
				Formato / Format:
			</span>
			<div className='flex gap-1'>
				<button
					type='button'
					onClick={() => onSelectFormat('pdf')}
					className={`rounded px-2 py-0.5 font-medium transition-all ${
						format === 'pdf'
							? 'bg-rose-500 text-white shadow-xs'
							: 'text-muted-foreground hover:text-foreground'
					}`}
				>
					PDF (1:1)
				</button>
				<button
					type='button'
					onClick={() => onSelectFormat('svg')}
					className={`rounded px-2 py-0.5 font-medium transition-all ${
						format === 'svg'
							? 'bg-rose-500 text-white shadow-xs'
							: 'text-muted-foreground hover:text-foreground'
					}`}
				>
					SVG (Láser / CNC)
				</button>
			</div>
		</div>
	);
}
