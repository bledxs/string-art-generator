'use client';

import dynamic from 'next/dynamic';

export const StringArtStudioClient = dynamic(
	() => import('../StringArtStudio').then((mod) => mod.StringArtStudio),
	{ ssr: false },
);
