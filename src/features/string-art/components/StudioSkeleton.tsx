import type * as React from 'react';

export function StudioSkeleton(): React.ReactElement {
	return (
		<div className='flex h-screen w-screen flex-col overflow-hidden bg-background'>
			{/* Top toolbar / header skeleton */}
			<header className='flex h-14 w-full shrink-0 items-center justify-between border-b bg-card/60 px-2 backdrop-blur-md sm:px-4'>
				<div className='flex items-center gap-2 sm:gap-3'>
					<div className='flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 p-1'>
						<div className='size-6 animate-pulse rounded bg-muted/60' />
					</div>
					<div className='flex flex-col gap-1'>
						<div className='h-4 w-32 animate-pulse rounded bg-muted/70' />
						<div className='hidden h-2.5 w-20 animate-pulse rounded bg-muted/40 sm:block' />
					</div>
				</div>

				<div className='flex items-center gap-2'>
					<div className='hidden h-8 w-24 animate-pulse rounded-md bg-muted/30 sm:block' />
					<div className='h-8 w-16 animate-pulse rounded-md bg-muted/40' />
					<div className='size-8 animate-pulse rounded-md bg-muted/40' />
				</div>
			</header>

			{/* Main studio area: sidebar + stage */}
			<div className='flex flex-1 overflow-hidden'>
				{/* Desktop sidebar placeholder */}
				<aside className='hidden w-80 shrink-0 flex-col border-r bg-card/40 p-4 md:flex'>
					<div className='space-y-4'>
						<div className='h-5 w-28 animate-pulse rounded bg-muted/60' />
						<div className='flex h-32 w-full flex-col items-center justify-center gap-2 rounded-lg border border-border/70 border-dashed bg-muted/20 p-4'>
							<div className='size-8 animate-pulse rounded-full bg-muted/50' />
							<div className='h-3 w-36 animate-pulse rounded bg-muted/40' />
						</div>
						<div className='space-y-2 pt-2'>
							<div className='h-3.5 w-24 animate-pulse rounded bg-muted/50' />
							<div className='h-9 w-full animate-pulse rounded-md bg-muted/30' />
						</div>
						<div className='space-y-2'>
							<div className='h-3.5 w-28 animate-pulse rounded bg-muted/50' />
							<div className='h-9 w-full animate-pulse rounded-md bg-muted/30' />
						</div>
					</div>
				</aside>

				{/* Center workspace canvas stage */}
				<main className='flex flex-1 items-center justify-center bg-muted/5 p-4 sm:p-8'>
					<div className='relative flex aspect-square w-full max-w-lg items-center justify-center rounded-full border border-border/60 bg-background/50 shadow-inner'>
						<div className='flex flex-col items-center gap-3'>
							<div className='size-10 animate-spin rounded-full border-2 border-primary/25 border-t-primary' />
							<span className='font-mono text-muted-foreground text-xs'>
								Iniciando lienzo...
							</span>
						</div>
					</div>
				</main>
			</div>

			{/* Bottom timeline player skeleton */}
			<footer className='flex h-14 w-full shrink-0 items-center justify-between gap-2 border-t bg-card/85 px-2 backdrop-blur-md sm:gap-4 sm:px-4'>
				<div className='flex items-center gap-2'>
					<div className='size-8 animate-pulse rounded-md bg-muted/50' />
					<div className='h-3.5 w-24 animate-pulse rounded bg-muted/40' />
				</div>
				<div className='mx-4 hidden max-w-md flex-1 md:block'>
					<div className='h-2 w-full animate-pulse rounded-full bg-muted/40' />
				</div>
				<div className='flex items-center gap-2'>
					<div className='h-8 w-20 animate-pulse rounded-md bg-muted/40' />
				</div>
			</footer>
		</div>
	);
}
