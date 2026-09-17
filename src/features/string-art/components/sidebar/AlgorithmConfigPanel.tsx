'use client';

import type { AlgorithmConfig } from '../../types';
import {
	findMaterialByWeight,
	type ThreadMaterial,
} from '../../utils/threadMaterials';
import { AlgorithmMaterialSelector } from './AlgorithmMaterialSelector';
import { AlgorithmRepresentationMode } from './AlgorithmRepresentationMode';
import { AlgorithmSliders } from './AlgorithmSliders';

interface AlgorithmConfigPanelProps {
	config: AlgorithmConfig;
	onChange: (updated: AlgorithmConfig) => void;
	disabled?: boolean;
}

export function AlgorithmConfigPanel({
	config,
	onChange,
	disabled = false,
}: Readonly<AlgorithmConfigPanelProps>) {
	const currentMaterial = findMaterialByWeight(config.lineWeight);

	const updateField = (field: keyof AlgorithmConfig, value: number) => {
		onChange({ ...config, [field]: value });
	};

	const handleModeChange = (mode: 'dark-on-light' | 'light-on-dark') => {
		onChange({ ...config, colorMode: mode });
	};

	const handleSelectMaterial = (mat: ThreadMaterial) => {
		onChange({
			...config,
			lineWeight: mat.lineWeight,
			opacityStep: mat.recommendedOpacity,
		});
	};

	return (
		<div className='flex flex-col gap-4'>
			<AlgorithmRepresentationMode
				colorMode={config.colorMode ?? 'dark-on-light'}
				disabled={disabled}
				onModeChange={handleModeChange}
			/>

			<AlgorithmMaterialSelector
				currentMaterialId={currentMaterial.id}
				disabled={disabled}
				onSelectMaterial={handleSelectMaterial}
			/>

			<AlgorithmSliders
				config={config}
				disabled={disabled}
				onUpdateField={updateField}
			/>
		</div>
	);
}
