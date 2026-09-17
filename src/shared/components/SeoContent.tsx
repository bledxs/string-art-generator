import type * as React from 'react';
import { SeoContentEn } from './SeoContentEn';
import { SeoContentEs } from './SeoContentEs';

interface SeoContentProps {
	locale?: 'es' | 'en';
}

export function SeoContent({
	locale = 'es',
}: SeoContentProps): React.ReactElement {
	if (locale === 'en') {
		return <SeoContentEn />;
	}
	return <SeoContentEs />;
}
