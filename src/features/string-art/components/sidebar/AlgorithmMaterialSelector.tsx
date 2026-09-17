'use client';

import { useTranslation } from '@/shared/i18n';
import { Button } from '@/shared/ui/button';
import {
	THREAD_MATERIALS,
	type ThreadMaterial,
} from '../../utils/threadMaterials';

interface AlgorithmMaterialSelectorProps {
	currentMaterialId: string;
	disabled?: boolean;
	onSelectMaterial: (material: ThreadMaterial) => void;
}

export function AlgorithmMaterialSelector({
	currentMaterialId,
	disabled = false,
	onSelectMaterial,
}: Readonly<AlgorithmMaterialSelectorProps>) {
	const { t } = useTranslation();

	const getLocalizedName = (id: string, defaultName: string) => {
		switch (id) {
			case 'silk-extra-fine':
				return t.engine.materials.silk;
			case 'cotton-standard':
				return t.engine.materials.cotton;
			case 'embroidery-heavy':
				return t.engine.materials.embroidery;
			case 'rustic-cord':
				return t.engine.materials.rustic;
			default:
				return defaultName;
		}
	};

	return (
		<div className='flex flex-col gap-1.5'>
			<span className='font-medium text-foreground text-xs'>
				{t.engine.materialTitle}
			</span>
			<div className='grid grid-cols-2 gap-1.5'>
				{THREAD_MATERIALS.map((mat) => {
					const isSelected = currentMaterialId === mat.id;
					const localizedName = getLocalizedName(mat.id, mat.name);

					return (
						<Button
							key={mat.id}
							type='button'
							variant={isSelected ? 'default' : 'outline'}
							size='sm'
							disabled={disabled}
							onClick={() => onSelectMaterial(mat)}
							className='h-auto w-full min-w-0 flex-col items-start whitespace-normal p-2 text-left'
						>
							<span className='w-full break-words font-semibold text-xs leading-snug'>
								{localizedName}
							</span>
							<span
								className={`mt-0.5 font-mono text-xs ${
									isSelected
										? 'font-normal text-primary-foreground/90'
										: 'text-muted-foreground opacity-80'
								}`}
							>
								{mat.thicknessMm}mm
							</span>
						</Button>
					);
				})}
			</div>
		</div>
	);
}
