'use client';

import { ArrowLeft, Compass } from 'lucide-react';
import Link from 'next/link';
import type * as React from 'react';
import { StatusCard } from '@/shared/components/status';
import { useTranslation } from '@/shared/i18n';
import { Button } from '@/shared/ui/button';

export default function NotFound(): React.ReactElement {
	const { t } = useTranslation();
	const strings = t.statusPages.notFound;

	return (
		<StatusCard
			variant='not-found'
			badge={strings.badge}
			title={strings.title}
			description={strings.description}
			actions={
				<>
					<Button asChild size='lg' className='gap-2 shadow-md'>
						<Link href='/'>
							<ArrowLeft className='size-4' />
							{strings.homeBtn}
						</Link>
					</Button>
					<Button asChild variant='outline' size='lg' className='gap-2'>
						<Link href='/'>
							<Compass className='size-4' />
							<span>Studio</span>
						</Link>
					</Button>
				</>
			}
		/>
	);
}
