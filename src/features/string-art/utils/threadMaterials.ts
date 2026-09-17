export interface ThreadMaterial {
	id: string;
	name: string;
	subtitle: string;
	thicknessMm: number;
	lineWeight: number;
	recommendedOpacity: number;
	typicalLines: number;
}

export const THREAD_MATERIALS: ThreadMaterial[] = [
	{
		id: 'silk-extra-fine',
		name: 'Seda Ultrafina #50',
		subtitle: '0.12 mm · Máximo detalle para retratos hiperrealistas',
		thicknessMm: 0.12,
		lineWeight: 0.55,
		recommendedOpacity: 14,
		typicalLines: 3200,
	},
	{
		id: 'cotton-standard',
		name: 'Algodón Mercerizado #40',
		subtitle: '0.20 mm · El estándar universal Gütermann para cuadros',
		thicknessMm: 0.2,
		lineWeight: 0.85,
		recommendedOpacity: 18,
		typicalLines: 2400,
	},
	{
		id: 'embroidery-heavy',
		name: 'Bordado Grueso #20',
		subtitle: '0.35 mm · Trazos intensos de alto contraste y mandalas',
		thicknessMm: 0.35,
		lineWeight: 1.4,
		recommendedOpacity: 26,
		typicalLines: 1600,
	},
	{
		id: 'rustic-cord',
		name: 'Cordel Artesanal / Lino',
		subtitle: '0.60 mm · Estilo rústico escultural de bajo conteo de hilos',
		thicknessMm: 0.6,
		lineWeight: 2.2,
		recommendedOpacity: 34,
		typicalLines: 1000,
	},
];

export function findMaterialByWeight(weight: number): ThreadMaterial {
	const sorted = [...THREAD_MATERIALS].sort(
		(a, b) => Math.abs(a.lineWeight - weight) - Math.abs(b.lineWeight - weight),
	);
	return sorted[0] ?? THREAD_MATERIALS[1];
}
