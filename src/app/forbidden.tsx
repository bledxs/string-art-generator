'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type * as React from 'react';
import { StatusCard } from '@/shared/components/status';
import { useTranslation } from '@/shared/i18n';
import { Button } from '@/shared/ui/button';

export default function Forbidden(): React.ReactElement {
	const { t } = useTranslation();
	const strings = t.statusPages.forbidden;

	return (
		<StatusCard
			variant='forbidden'
			badge={strings.badge}
			title={strings.title}
			description={strings.description}
			actions={
				<Button asChild size='lg' className='gap-2 shadow-md'>
					<Link href='/'>
						<ArrowLeft className='size-4' />
						{strings.homeBtn}
					</Link>
				</Button>
			}
		/>
	);
}
