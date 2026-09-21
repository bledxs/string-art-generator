'use client';

import { useTranslation } from '@/shared/i18n';
import type { GCodeKinematics } from '../../types';

export interface ExportGCodeActionProps {
	kinematics: GCodeKinematics;
	onSelectKinematics: (mode: GCodeKinematics) => void;
}

export function ExportGCodeAction({
	kinematics,
	onSelectKinematics,
}: Readonly<ExportGCodeActionProps>) {
	const { t } = useTranslation();

	return (
		<div className='flex items-center justify-between rounded-lg border border-purple-500/20 bg-purple-500/5 px-2.5 py-1.5 text-xs'>
			<span className='font-medium text-muted-foreground'>
				{t.loom.shapeTitle}:
			</span>
			<div className='flex gap-1'>
				<button
					type='button'
					onClick={() => onSelectKinematics('polar')}
					className={`rounded px-2 py-0.5 font-medium transition-all ${
						kinematics === 'polar'
							? 'bg-purple-500 text-white shadow-xs'
							: 'text-muted-foreground hover:text-foreground'
					}`}
				>
					{t.exportModal.gcodePolar}
				</button>
				<button
					type='button'
					onClick={() => onSelectKinematics('cartesian')}
					className={`rounded px-2 py-0.5 font-medium transition-all ${
						kinematics === 'cartesian'
							? 'bg-purple-500 text-white shadow-xs'
							: 'text-muted-foreground hover:text-foreground'
					}`}
				>
					{t.exportModal.gcodeCartesian}
				</button>
			</div>
		</div>
	);
}
