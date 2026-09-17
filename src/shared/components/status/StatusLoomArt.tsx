import type * as React from 'react';

export type StatusArtVariant =
	| 'not-found'
	| 'error'
	| 'forbidden'
	| 'unauthorized'
	| 'loading';

interface StatusLoomArtProps {
	variant: StatusArtVariant;
	className?: string;
}

export function StatusLoomArt({
	variant,
	className = '',
}: Readonly<StatusLoomArtProps>): React.ReactElement {
	const pins = Array.from({ length: 24 }, (_, i) => {
		const angle = (i * 360) / 24;
		const rad = (angle * Math.PI) / 180;
		return {
			id: `pin-${i}`,
			x: Math.round((100 + 80 * Math.cos(rad)) * 10) / 10,
			y: Math.round((100 + 80 * Math.sin(rad)) * 10) / 10,
		};
	});

	return (
		<div
			className={`relative flex items-center justify-center ${className}`}
			aria-hidden='true'
		>
			<div className='absolute inset-0 rounded-full bg-primary/10 blur-2xl dark:bg-primary/5' />
			<svg
				viewBox='0 0 200 200'
				style={variant === 'loading' ? { animationDuration: '20s' } : undefined}
				className={`size-44 transition-transform duration-700 sm:size-52 ${
					variant === 'loading' ? 'animate-spin' : ''
				}`}
			>
				<title>Bastidor de Hilorama</title>
				<circle
					cx='100'
					cy='100'
					r='80'
					strokeWidth={1.5}
					className='fill-none stroke-border/80'
					strokeDasharray={variant === 'not-found' ? '4 4' : undefined}
				/>
				<circle
					cx='100'
					cy='100'
					r='74'
					strokeWidth={0.75}
					className='fill-none stroke-primary/20'
				/>

				{/* Geometric String Chords */}
				{variant === 'not-found' && (
					<g strokeWidth={1} className='stroke-primary/40'>
						<line x1={pins[0].x} y1={pins[0].y} x2={pins[9].x} y2={pins[9].y} />
						<line
							x1={pins[3].x}
							y1={pins[3].y}
							x2={pins[14].x}
							y2={pins[14].y}
						/>
						<line
							x1={pins[7].x}
							y1={pins[7].y}
							x2={pins[18].x}
							y2={pins[18].y}
						/>
						<line
							x1={pins[12].x}
							y1={pins[12].y}
							x2={pins[21].x}
							y2={pins[21].y}
							strokeDasharray='3 3'
							className='stroke-destructive/60'
						/>
						<circle
							cx='100'
							cy='100'
							r='12'
							strokeWidth={1}
							className='fill-none stroke-muted-foreground/40'
							strokeDasharray='2 2'
						/>
					</g>
				)}

				{variant === 'error' && (
					<g strokeWidth={1.25} className='stroke-destructive/50'>
						<line
							x1={pins[2].x}
							y1={pins[2].y}
							x2={pins[15].x}
							y2={pins[15].y}
						/>
						<line
							x1={pins[5].x}
							y1={pins[5].y}
							x2={pins[17].x}
							y2={pins[17].y}
						/>
						<line
							x1={pins[8].x}
							y1={pins[8].y}
							x2={pins[22].x}
							y2={pins[22].y}
						/>
						<line
							x1={pins[11].x}
							y1={pins[11].y}
							x2={pins[1].x}
							y2={pins[1].y}
						/>
						<circle
							cx='100'
							cy='100'
							r='18'
							strokeWidth={1.5}
							className='fill-destructive/10 stroke-destructive/80'
						/>
					</g>
				)}

				{(variant === 'forbidden' || variant === 'unauthorized') && (
					<g strokeWidth={1} className='stroke-primary/50'>
						<polygon
							points={`${pins[0].x},${pins[0].y} ${pins[8].x},${pins[8].y} ${pins[16].x},${pins[16].y}`}
							className='fill-none stroke-primary/40'
						/>
						<polygon
							points={`${pins[4].x},${pins[4].y} ${pins[12].x},${pins[12].y} ${pins[20].x},${pins[20].y}`}
							className='fill-none stroke-amber-500/40'
						/>
						<circle
							cx='100'
							cy='100'
							r='22'
							strokeWidth={1.5}
							className='fill-card/80 stroke-primary/60'
						/>
					</g>
				)}

				{variant === 'loading' && (
					<g strokeWidth={1} className='animate-pulse stroke-primary/60'>
						<line x1={pins[0].x} y1={pins[0].y} x2={pins[7].x} y2={pins[7].y} />
						<line
							x1={pins[4].x}
							y1={pins[4].y}
							x2={pins[11].x}
							y2={pins[11].y}
						/>
						<line
							x1={pins[8].x}
							y1={pins[8].y}
							x2={pins[15].x}
							y2={pins[15].y}
						/>
						<line
							x1={pins[12].x}
							y1={pins[12].y}
							x2={pins[19].x}
							y2={pins[19].y}
						/>
						<line
							x1={pins[16].x}
							y1={pins[16].y}
							x2={pins[23].x}
							y2={pins[23].y}
						/>
						<line
							x1={pins[20].x}
							y1={pins[20].y}
							x2={pins[3].x}
							y2={pins[3].y}
						/>
					</g>
				)}

				{/* Perimeter Nails */}
				{pins.map((pin) => (
					<circle
						key={pin.id}
						cx={pin.x}
						cy={pin.y}
						r='2'
						className={
							pin.id === 'pin-0'
								? 'fill-primary stroke-1 stroke-primary/40'
								: 'fill-muted-foreground/60'
						}
					/>
				))}
			</svg>
		</div>
	);
}
