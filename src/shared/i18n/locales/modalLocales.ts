import type { TranslationDictionary } from '../types';

export const exportModalEn: TranslationDictionary['exportModal'] = {
	title: 'Export Project for Assembly',
	description:
		'Download vector blueprints, pin number sequences, and workshop files.',
	svgTitle: 'High-Precision SVG Vector',
	svgDesc:
		'Scalable vector threads with exact coordinates ready for web or plotter.',
	txtTitle: 'Numeric Pin Sequence (TXT)',
	txtDesc:
		'Ordered list of numbered pin indices for step-by-step manual assembly.',
	jsonTitle: 'Full Project (JSON)',
	jsonDesc:
		'Complete studio state snapshot including loom, engine, and sequence.',
	gcodeTitle: 'CNC Machine Code (G-Code)',
	gcodeDesc:
		'Direct motion instructions for automated string art machines (Cartesian X/Y and Aline Deco-style Polar Rotary).',
	gcodePolar: 'Polar Rotary',
	gcodeCartesian: 'Cartesian X/Y',
	pdfTitle: 'Workshop Assembly PDF (A4)',
	pdfDesc:
		'Printable schematic with numbered rim template and sequential steps.',
	templateTitle: 'Loom Blueprint (PDF / SVG)',
	templateDesc:
		'1:1 scale drilling template based on your active dimensions and pin count.',
	downloadBtn: 'Download',
	generatingPdf: 'Generating PDF...',
	sponsorTitle: 'Enjoying String Art Studio?',
	sponsorDesc: 'Support ongoing development on GitHub Sponsors.',
	sponsorBtn: 'Sponsor',
};

export const exportModalEs: TranslationDictionary['exportModal'] = {
	title: 'Exportar Proyecto para Armado',
	description:
		'Descarga archivos vectoriales, secuencias numéricas y formatos de intercambio.',
	svgTitle: 'Vector SVG de Alta Precisión',
	svgDesc:
		'Trazos vectoriales exactos con coordenadas escalables listos para plotter o web.',
	txtTitle: 'Secuencia Numérica de Clavos (TXT)',
	txtDesc:
		'Lista ordenada de índices de clavos para guiar el tejido manual paso a paso.',
	jsonTitle: 'Proyecto Completo (JSON)',
	jsonDesc:
		'Estado integral del estudio con configuraciones del bastidor, motor y secuencia.',
	gcodeTitle: 'Código de Máquina CNC (G-Code)',
	gcodeDesc:
		'Instrucciones para máquinas automáticas de tejer (Cartesiana X/Y y Rotativa Polar tipo Aline Deco).',
	gcodePolar: 'Rotativa Polar',
	gcodeCartesian: 'Cartesiana X/Y',
	pdfTitle: 'PDF Taller de Armado (A4)',
	pdfDesc:
		'Plano técnico con plantilla numerada de clavos e instrucciones secuenciales.',
	templateTitle: 'Plantilla de Bastidor (PDF / SVG)',
	templateDesc:
		'Plano a escala 1:1 según tus dimensiones y número de clavos para taladrar o cortar.',
	downloadBtn: 'Descargar',
	generatingPdf: 'Generando PDF...',
	sponsorTitle: '¿Te ha sido útil este proyecto?',
	sponsorDesc: 'Apoya el desarrollo de String Art Studio en GitHub Sponsors.',
	sponsorBtn: 'Patrocinar',
};
