'use client';

import { useCallback, useState } from 'react';

import type { ColorRun } from '../types';

export function useWeavingAssistant(
	lineSequence: number[],
	colorRuns?: ColorRun[],
) {
	const [currentStep, setCurrentStep] = useState(0);
	const totalSteps = Math.max(0, lineSequence.length - 1);

	const nextStep = useCallback(() => {
		setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
	}, [totalSteps]);

	const prevStep = useCallback(() => {
		setCurrentStep((prev) => Math.max(prev - 1, 0));
	}, []);

	const jumpSteps = useCallback(
		(delta: number) => {
			setCurrentStep((prev) => Math.max(0, Math.min(prev + delta, totalSteps)));
		},
		[totalSteps],
	);

	const goToStep = useCallback(
		(step: number) => {
			setCurrentStep(Math.max(0, Math.min(step, totalSteps)));
		},
		[totalSteps],
	);

	const resetAssistant = useCallback(() => {
		setCurrentStep(0);
	}, []);

	const fromPin = lineSequence[currentStep] ?? 0;
	const toPin = lineSequence[currentStep + 1] ?? 0;
	const progressPercent =
		totalSteps > 0 ? Math.round((currentStep / totalSteps) * 100) : 0;

	const activeRun =
		colorRuns && colorRuns.length > 0
			? (colorRuns.find(
					(r) => currentStep >= r.startIndex && currentStep <= r.endIndex,
				) ?? colorRuns[colorRuns.length - 1])
			: undefined;

	const isSpoolTransition =
		activeRun !== undefined &&
		activeRun.startIndex === currentStep &&
		activeRun.startIndex > 0;

	return {
		currentStep,
		totalSteps,
		fromPin,
		toPin,
		progressPercent,
		activeRun,
		isSpoolTransition,
		nextStep,
		prevStep,
		jumpSteps,
		goToStep,
		resetAssistant,
	};
}
