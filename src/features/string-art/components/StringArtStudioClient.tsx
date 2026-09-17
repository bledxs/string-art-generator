'use client';

import dynamic from 'next/dynamic';
import { StudioSkeleton } from './StudioSkeleton';

export const StringArtStudioClient = dynamic(
	() => import('../StringArtStudio').then((mod) => mod.StringArtStudio),
	{
		ssr: false,
		loading: () => <StudioSkeleton />,
	},
);
