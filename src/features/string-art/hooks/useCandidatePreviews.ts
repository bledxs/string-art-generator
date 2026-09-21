'use client';

import { useEffect, useState } from 'react';
import { CANDIDATE_PROFILES } from '../utils/candidateProfiles';
import { generateMiniCandidatePreview } from '../utils/miniCandidateSolver';

export function useCandidatePreviews(imageSrc: string | null, isOpen: boolean) {
	const [previews, setPreviews] = useState<Record<string, string>>({});
	const [isGenerating, setIsGenerating] = useState(false);

	useEffect(() => {
		if (!(isOpen && imageSrc)) return;
		let isMounted = true;
		setIsGenerating(true);

		const img = new Image();
		if (!imageSrc.startsWith('data:')) {
			img.crossOrigin = 'anonymous';
		}
		img.src = imageSrc;

		img.onload = () => {
			if (!isMounted) return;

			let index = 0;
			const processNext = () => {
				if (!isMounted || index >= CANDIDATE_PROFILES.length) {
					if (isMounted) setIsGenerating(false);
					return;
				}

				const profile = CANDIDATE_PROFILES[index];
				const url = generateMiniCandidatePreview(img, profile.algoConfig);

				if (isMounted) {
					setPreviews((prev) => ({ ...prev, [profile.id]: url }));
					index++;
					setTimeout(processNext, 0);
				}
			};

			setTimeout(processNext, 0);
		};

		return () => {
			isMounted = false;
		};
	}, [imageSrc, isOpen]);

	return { previews, isGenerating, profiles: CANDIDATE_PROFILES };
}
