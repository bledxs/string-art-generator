import type { ColorLayer } from '../types';

export interface ColorPalettePreset {
	id: 'monochrome' | 'cmyk' | 'rgbw' | 'warm-sepia';
	name: string;
	description: string;
	recommendedMode: 'dark-on-light' | 'light-on-dark';
	layers: ColorLayer[];
}

export const COLOR_PALETTES: ColorPalettePreset[] = [
	{
		id: 'monochrome',
		name: 'Monocromo Clásico',
		description: '1 bobina. Alto contraste tradicional sobre madera o ébano.',
		recommendedMode: 'dark-on-light',
		layers: [
			{
				id: 'mono-base',
				name: 'Hilo Principal',
				color: '#120e0b',
				dmcCode: 'DMC 310',
				gutermannCode: 'Col. 000',
				linesCount: 2200,
			},
		],
	},
	{
		id: 'cmyk',
		name: 'Cuatricromía CMYK',
		description:
			'4 bobinas (Amarillo, Cian, Magenta, Negro). Orden calibrado sustractivo sobre base clara.',
		recommendedMode: 'dark-on-light',
		layers: [
			{
				id: 'cmyk-y',
				name: 'Amarillo Cromo (Y)',
				color: '#eab308',
				dmcCode: 'DMC 307',
				gutermannCode: 'Col. 412',
				linesCount: 450,
			},
			{
				id: 'cmyk-c',
				name: 'Cian Intenso (C)',
				color: '#0284c7',
				dmcCode: 'DMC 996',
				gutermannCode: 'Col. 143',
				linesCount: 650,
			},
			{
				id: 'cmyk-m',
				name: 'Magenta Carmín (M)',
				color: '#db2777',
				dmcCode: 'DMC 602',
				gutermannCode: 'Col. 724',
				linesCount: 650,
			},
			{
				id: 'cmyk-k',
				name: 'Negro Carbón (K)',
				color: '#09090b',
				dmcCode: 'DMC 310',
				gutermannCode: 'Col. 000',
				linesCount: 950,
			},
		],
	},
	{
		id: 'rgbw',
		name: 'Luminoso RGBW (Aditivo)',
		description:
			'4 bobinas (Azul, Carmín, Oro, Blanco Puro). Aditivo sobre fondo negro ébano.',
		recommendedMode: 'light-on-dark',
		layers: [
			{
				id: 'rgbw-b',
				name: 'Azul Cobalto (Sombras)',
				color: '#2563eb',
				dmcCode: 'DMC 796',
				gutermannCode: 'Col. 315',
				linesCount: 750,
			},
			{
				id: 'rgbw-r',
				name: 'Rojo Carmín (Medios Tonos)',
				color: '#dc2626',
				dmcCode: 'DMC 666',
				gutermannCode: 'Col. 364',
				linesCount: 750,
			},
			{
				id: 'rgbw-y',
				name: 'Oro Cálido (Matices)',
				color: '#f59e0b',
				dmcCode: 'DMC 725',
				gutermannCode: 'Col. 852',
				linesCount: 500,
			},
			{
				id: 'rgbw-w',
				name: 'Blanco Titanio (Altas Luces)',
				color: '#ffffff',
				dmcCode: 'DMC Blanc',
				gutermannCode: 'Col. 800',
				linesCount: 600,
			},
		],
	},
	{
		id: 'warm-sepia',
		name: 'Sepia y Terracota de Taller',
		description:
			'3 bobinas de tonos tierra cálidos. Ideal para retratos renacentistas.',
		recommendedMode: 'dark-on-light',
		layers: [
			{
				id: 'sepia-cream',
				name: 'Crema Marfil (Luz)',
				color: '#fef3c7',
				dmcCode: 'DMC 746',
				gutermannCode: 'Col. 658',
				linesCount: 600,
			},
			{
				id: 'sepia-terracotta',
				name: 'Terracota Toscana (Volumen)',
				color: '#b45309',
				dmcCode: 'DMC 921',
				gutermannCode: 'Col. 660',
				linesCount: 900,
			},
			{
				id: 'sepia-dark',
				name: 'Espresso Oscuro (Sombras)',
				color: '#27150c',
				dmcCode: 'DMC 3371',
				gutermannCode: 'Col. 696',
				linesCount: 1100,
			},
		],
	},
];
