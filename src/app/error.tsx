'use client';

import { Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import { StatusCard } from '@/shared/components/status';
import { useTranslation } from '@/shared/i18n';
import { Button } from '@/shared/ui/button';

interface ErrorPageProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function ErrorPage({
	error,
	reset,
}: Readonly<ErrorPageProps>): React.ReactElement {
	const { t } = useTranslation();
	const strings = t.statusPages.error;

	React.useEffect(() => {
		// Log the error to console in dev for traceability
		if (process.env.NODE_ENV !== 'production') {
			// biome-ignore lint/suspicious/noConsole: trace error in dev
			console.error('Captured studio error:', error);
		}
	}, [error]);

	return (
		<StatusCard
			variant='error'
			badge={strings.badge}
			title={strings.title}
			description={strings.description}
			details={
				error.digest ? (
					<div className='rounded-lg border border-destructive/30 bg-destructive/10 p-3 font-mono text-destructive text-xs'>
						<p className='font-semibold'>{strings.detailsSummary}:</p>
						<p className='mt-1 select-all break-all'>Digest: {error.digest}</p>
					</div>
				) : undefined
			}
			actions={
				<>
					<Button
						type='button'
						size='lg'
						onClick={reset}
						className='gap-2 shadow-md'
					>
						<RefreshCw className='size-4' />
						{strings.retryBtn}
					</Button>
					<Button asChild variant='outline' size='lg' className='gap-2'>
						<Link href='/'>
							<Home className='size-4' />
							{strings.homeBtn}
						</Link>
					</Button>
				</>
			}
		/>
	);
}
