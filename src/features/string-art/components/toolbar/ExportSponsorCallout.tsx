'use client';

import { Heart } from 'lucide-react';
import { siteConfig } from '@/shared/config/site';
import { useTranslation } from '@/shared/i18n';

export function ExportSponsorCallout() {
	const { t } = useTranslation();

	return (
		<div className='mt-1 flex items-center justify-between gap-3 rounded-xl border border-rose-500/20 bg-rose-500/5 p-3 text-xs'>
			<div className='flex min-w-0 items-center gap-2.5'>
				<Heart className='size-4 shrink-0 fill-rose-500/20 text-rose-500 dark:text-rose-400' />
				<span className='truncate text-muted-foreground'>
					{t.exportModal.sponsorDesc}
				</span>
			</div>
			<a
				href={siteConfig.links.sponsor}
				target='_blank'
				rel='noreferrer'
				className='shrink-0 rounded-lg bg-rose-500/10 px-2.5 py-1 font-medium text-rose-600 transition-colors hover:bg-rose-500 hover:text-white dark:text-rose-400 dark:hover:bg-rose-500 dark:hover:text-white'
			>
				{t.exportModal.sponsorBtn}
			</a>
		</div>
	);
}
