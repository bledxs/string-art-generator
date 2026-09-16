import type { Metadata } from 'next';
import type * as React from 'react';
import { Toaster } from 'sonner';
import './globals.css';
import { ThemeProvider } from './providers.tsx';

export const metadata: Metadata = {
	title: 'String Art Studio — Generador de Arte de Hilos de Alta Precisión',
	description:
		'Estudio interactivo profesional para generar patrones de string art, visualización de tejido en tiempo real y exportación de instrucciones físicas.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='es' suppressHydrationWarning>
			<body className='min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/20 selection:text-primary'>
				<ThemeProvider>
					{children}
					<Toaster richColors closeButton position='bottom-right' />
				</ThemeProvider>
			</body>
		</html>
	);
}
