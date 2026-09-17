'use client';

import * as React from 'react';

interface GlobalErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function GlobalError({
	error,
	reset,
}: Readonly<GlobalErrorProps>): React.ReactElement {
	React.useEffect(() => {
		if (process.env.NODE_ENV !== 'production') {
			// biome-ignore lint/suspicious/noConsole: trace error in dev
			console.error('Captured global layout error:', error);
		}
	}, [error]);

	return (
		<html lang='es'>
			<head>
				<title>Error en String Art Studio</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
			</head>
			<body
				style={{
					margin: 0,
					minHeight: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: '#171615',
					color: '#f4f3f0',
					fontFamily:
						'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
					padding: '1.5rem',
				}}
			>
				<div
					style={{
						maxWidth: '28rem',
						width: '100%',
						textAlign: 'center',
						backgroundColor: '#23211e',
						borderRadius: '1rem',
						border: '1px solid #3d3935',
						padding: '2rem',
						boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
					}}
				>
					<div
						style={{
							display: 'inline-block',
							padding: '0.25rem 0.75rem',
							marginBottom: '1rem',
							borderRadius: '9999px',
							border: '1px solid rgba(220, 120, 60, 0.4)',
							backgroundColor: 'rgba(220, 120, 60, 0.15)',
							color: '#f09351',
							fontSize: '0.75rem',
							fontWeight: 600,
							letterSpacing: '0.05em',
							textTransform: 'uppercase',
						}}
					>
						Fallo Crítico en el Taller
					</div>

					<h1
						style={{
							fontSize: '1.5rem',
							fontWeight: 700,
							margin: '0 0 0.75rem 0',
						}}
					>
						Se ha detenido el bastidor principal
					</h1>

					<p
						style={{
							fontSize: '0.875rem',
							color: '#b3ada4',
							lineHeight: '1.5',
							margin: '0 0 1.5rem 0',
						}}
					>
						Ocurrió un error en el núcleo de la aplicación. Por favor recarga el
						taller para restaurar el entorno de trabajo.
					</p>

					{error.digest && (
						<div
							style={{
								marginBottom: '1.5rem',
								padding: '0.5rem',
								backgroundColor: '#1a1816',
								border: '1px solid #332f2b',
								borderRadius: '0.5rem',
								fontSize: '0.75rem',
								color: '#9e978e',
								wordBreak: 'break-all',
							}}
						>
							ID de Error: {error.digest}
						</div>
					)}

					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							gap: '0.75rem',
						}}
					>
						<button
							type='button'
							onClick={reset}
							style={{
								cursor: 'pointer',
								backgroundColor: '#d97736',
								color: '#ffffff',
								border: 'none',
								borderRadius: '0.5rem',
								padding: '0.625rem 1.25rem',
								fontSize: '0.875rem',
								fontWeight: 600,
							}}
						>
							Reiniciar Bastidor
						</button>
					</div>
				</div>
			</body>
		</html>
	);
}
