import type { TranslationDictionary } from '@/shared/i18n/types';
import type { AlgorithmConfig } from '../types';

type CandidatesKey = keyof TranslationDictionary['candidatesModal'];

export interface CandidateProfile {
	id: string;
	titleKey: CandidatesKey;
	descKey: CandidatesKey;
	badgeKey: CandidatesKey;
	algoConfig: Partial<AlgorithmConfig>;
}

export const CANDIDATE_PROFILES: CandidateProfile[] = [
	{
		id: 'high-fidelity',
		titleKey: 'highFidelityTitle',
		descKey: 'highFidelityDesc',
		badgeKey: 'highFidelityBadge',
		algoConfig: {
			maxLines: 2800,
			opacityStep: 15,
			lineWeight: 0.75,
			contrast: 15,
			brightness: 0,
			edgeWeight: 0.15,
			whitePenalty: 1.4,
			reboundPenalty: 0.85,
			colorMode: 'dark-on-light',
		},
	},
	{
		id: 'dramatic-contrast',
		titleKey: 'dramaticTitle',
		descKey: 'dramaticDesc',
		badgeKey: 'dramaticBadge',
		algoConfig: {
			maxLines: 2200,
			opacityStep: 26,
			lineWeight: 0.95,
			contrast: 32,
			brightness: -5,
			edgeWeight: 0.35,
			whitePenalty: 1.5,
			reboundPenalty: 0.7,
			colorMode: 'dark-on-light',
		},
	},
	{
		id: 'minimalist-sketch',
		titleKey: 'sketchTitle',
		descKey: 'sketchDesc',
		badgeKey: 'sketchBadge',
		algoConfig: {
			maxLines: 1400,
			opacityStep: 34,
			lineWeight: 1.15,
			contrast: 22,
			brightness: 5,
			edgeWeight: 0.4,
			whitePenalty: 1.2,
			reboundPenalty: 0.6,
			colorMode: 'dark-on-light',
		},
	},
	{
		id: 'light-on-dark',
		titleKey: 'invertedTitle',
		descKey: 'invertedDesc',
		badgeKey: 'invertedBadge',
		algoConfig: {
			maxLines: 2400,
			opacityStep: 20,
			lineWeight: 0.8,
			contrast: 20,
			brightness: 0,
			edgeWeight: 0.2,
			whitePenalty: 1.3,
			reboundPenalty: 0.8,
			colorMode: 'light-on-dark',
		},
	},
];
