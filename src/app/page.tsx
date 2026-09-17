'use client';

import dynamic from 'next/dynamic';

const StringArtStudio = dynamic(
	() => import('@/features/string-art').then((mod) => mod.StringArtStudio),
	{ ssr: false },
);

export default function HomePage() {
	return <StringArtStudio />;
}
