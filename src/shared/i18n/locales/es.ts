import type { TranslationDictionary } from '../types';
import { exportModalEs } from './modalLocales';
import { statusPagesEs } from './statusPages';

export const es: TranslationDictionary = {
	header: {
		title: 'String Art Studio',
		subtitle: 'Generador de tejido geométrico de alta resolución',
		openSettingsAria: 'Abrir configuración',
		toggleThemeAria: 'Alternar tema',
		exportAria: 'Exportar proyecto',
		exportBtn: 'Exportar',
		languageAria: 'Seleccionar idioma',
		sponsorAria: 'Patrocinar en GitHub',
		sponsorBtn: 'Patrocinar',
		status: {
			idle: 'Inactivo',
			running: 'Calculando...',
			paused: 'Pausado',
			completed: 'Completado',
		},
		stats: {
			lines: 'Líneas',
			pins: 'Clavos',
			diameter: 'Diámetro',
			time: 'Tiempo',
		},
	},
	sidebar: {
		panelTitle: 'Configuración de Arte',
		closeAria: 'Cerrar panel',
		tabs: {
			presets: 'Muestras',
			loom: 'Bastidor',
			color: 'Color',
			engine: 'Motor',
		},
	},
	presets: {
		selectedImage: 'Imagen Seleccionada',
		customBadge: 'Personalizada',
		presetBadge: 'Muestra',
		customSubtitle: 'Foto recortada',
		presetSubtitle: 'Preset optimizado',
		cropBtn: 'Recortar',
		changeBtn: 'Cambiar',
		curatedTitle: 'Muestras de alta definición',
		defaultSampleTitle: 'Muestra seleccionada',
		customSampleTitle: 'Tu imagen cargada',
		autoCalibrate: {
			title: 'Auto-Calibración Inteligente',
			badge: 'Recomendado',
			pins: 'Clavos:',
			lines: 'Líneas:',
			thread: 'Hilo:',
			contrast: 'Contraste:',
			applyBtn: 'Aplicar recomendación',
		},
		compareCandidatesBtn: 'Comparar Candidatos',
	},
	presetsData: {
		mandala: {
			title: 'Mandala Cósmico',
			subtitle: 'Geometría circular de alta densidad',
		},
		portrait: {
			title: 'Retrato Minimalista',
			subtitle: 'Contraste facial para tejer rostros',
		},
		cube: {
			title: 'Cubo de Metatrón',
			subtitle: 'Líneas isométricas de precisión',
		},
	},
	loom: {
		shapeTitle: 'Forma del Bastidor',
		circular: 'Circular',
		circularDesc: 'Aro radial clásico',
		rectangular: 'Rectangular',
		rectangularDesc: 'Marco ortogonal (Perspicere)',
		ratioTitle: 'Proporción de Marco',
		ratios: {
			square: 'Cuadrado',
			portrait: 'Retrato',
			landscape: 'Apaisado',
			widescreen: 'Panorámico',
		},
		pinsTitle: 'Número de clavos',
		pinsRectDesc: 'Distribución proporcional en los 4 bordes del marco.',
		pinsCircleDesc: 'Resolución angular alrededor del aro circular.',
		diameterTitle: 'Diámetro físico',
		diameterRectTitle: 'Ancho mayor físico',
		diameterDesc:
			'Permite estimar con exactitud los metros de hilo y la escala real.',
		templateTitle: 'Plantilla de Perforado',
		templateDesc:
			'Descarga el plano a escala 1:1 con las marcas exactas de clavos para imprimir o corte láser.',
		downloadPdf: 'Descargar PDF (Escala 1:1)',
		downloadSvg: 'Descargar SVG (Láser / CNC)',
		pinSpacing: 'Separación entre clavos',
		scaleNotice:
			'Imprimir al 100% sin ajustar página. Incluye regla de calibración de 50 mm.',
		templateNotice: 'Plano técnico para clavado',
		tilingModeTitle: 'Formato de Impresión',
		tilingSingle: '1 Hoja (Plotter 1:1)',
		tilingPoster: 'Dividida en Hojas Pares (Póster)',
		paperTitle: 'Tamaño de Papel',
		paperA4: 'A4',
		paperLetter: 'Carta (Letter)',
		paperLegal: 'Oficio (Legal)',
		sheetsCount: 'hojas',
		downloadPosterPdf: 'Descargar PDF Dividido',
		tilingGridLabel: 'División par:',
		tilingPdfTitle: 'PDF Dividido',
		tilingNotice:
			'Auto-ajuste par para {dim} cm. Une las {sheets} hojas con las marcas (+).',
		templateSvgLaser: 'SVG Láser',
	},
	color: {
		title: 'Paleta y Bobinas de Color',
		layersTitle: 'Capas Secuenciales',
		totalLines: 'Total:',
		linesUnit: 'lín',
		productionBannerTitle: 'Producción Real por Capas:',
		productionBannerDesc:
			'El algoritmo teje bobina por bobina en secuencia. Esto previene el enredo sucio («efecto barro») y permite cambiar de hilo fácilmente en el taller.',
		layerAria: 'Líneas para capa',
		palettes: {
			monochrome: {
				name: 'Monocromo Clásico',
				description:
					'1 bobina. Alto contraste tradicional sobre madera o ébano.',
			},
			cmyk: {
				name: 'Cuatricromía CMYK',
				description:
					'4 bobinas (Negro, Cian, Magenta, Amarillo). Sustractivo sobre fondo blanco.',
			},
			rgbw: {
				name: 'Luminoso RGBW (Aditivo)',
				description:
					'4 bobinas (Azul, Carmín, Oro, Blanco Puro). Aditivo sobre fondo negro ébano.',
			},
			'warm-sepia': {
				name: 'Sepia y Terracota de Taller',
				description:
					'3 bobinas de tonos tierra cálidos. Ideal para retratos renacentistas.',
			},
		},
		layers: {
			'mono-base': 'Hilo Principal',
			'cmyk-k': 'Negro Carbón (K)',
			'cmyk-c': 'Cian Intenso (C)',
			'cmyk-m': 'Magenta Carmín (M)',
			'cmyk-y': 'Amarillo Cromo (Y)',
			'rgbw-b': 'Azul Cobalto (Sombras)',
			'rgbw-r': 'Rojo Carmín (Medios Tonos)',
			'rgbw-y': 'Oro Cálido (Matices)',
			'rgbw-w': 'Blanco Titanio (Altas Luces)',
			'sepia-dark': 'Espresso Oscuro (Sombras)',
			'sepia-terracotta': 'Terracota Toscana (Volumen)',
			'sepia-cream': 'Crema Marfil (Luz)',
		},
	},
	engine: {
		colorModeTitle: 'Modo de Representación',
		subtractive: 'Sustractivo',
		subtractiveDesc: 'Hilo oscuro · Fondo claro',
		additive: 'Aditivo (Luz)',
		additiveDesc: 'Hilo claro · Fondo ébano',
		materialTitle: 'Tipo y Grosor de Hilo',
		materials: {
			silk: 'Seda Ultrafina #50',
			cotton: 'Algodón Mercerizado #40',
			embroidery: 'Bordado Grueso #20',
			rustic: 'Cordel Artesanal / Lino',
		},
		lineWeight: 'Grosor de trazo',
		maxLines: 'Límite de líneas',
		edgeWeight: 'Énfasis de bordes',
		whitePenaltySubtractive: 'Protección de blancos',
		whitePenaltyAdditive: 'Protección de sombras (Negro)',
		lengthPenalty: 'Normalización de longitud',
		lengthPenaltyDesc:
			'Atenúa cuerdas largas por el centro y prioriza detalles locales',
		reboundPenalty: 'Filtro anti-rebote',
		reboundPenaltyDesc:
			'Evita oscilaciones opuestas y hace que el trazo camine por el contorno',
		opacityStep: 'Opacidad de hilo',
		minDistance: 'Distancia mín. de cuerda',
		minDistanceUnit: 'clavos',
		contrast: 'Contraste de entrada',
	},
	spool: {
		title: 'Carrete de Artesano',
		spoolsCount: 'bobinas',
		spoolCount: 'bobina',
	},
	actions: {
		generate: 'Generar Arte de Hilo',
		pause: 'Pausar',
		resume: 'Reanudar',
		stop: 'Detener',
		regenerate: 'Regenerar',
		stopAria: 'Detener cálculo',
	},
	timeline: {
		play: 'Reproducir',
		pause: 'Pausar',
		pinLabel: 'Clavo:',
		emptyPrompt:
			'Inicia la generación para explorar trazos en la línea de tiempo',
		guideBtn: 'Guía de Tejido',
		guideAria: 'Abrir guía de tejido',
	},
	zoom: {
		zoomIn: 'Aumentar zoom',
		zoomOut: 'Reducir zoom',
		reset: 'Restablecer vista',
		viewGuide: 'Guía y ayuda',
		viewGuideAria: 'Desplazarse a la guía y preguntas frecuentes',
	},
	assistant: {
		title: 'Asistente de Tejido',
		description: 'Guía interactiva paso a paso para el bastidor físico.',
		spoolChangeTitle: '¡Cambio de Bobina!',
		spoolChangePrompt: 'Cortar, atar y cambiar a',
		activeSpool: 'Bobina en uso:',
		progress: 'Progreso',
		from: 'Desde',
		to: 'Hacia',
		prevStep: 'Paso anterior',
		nextStep: 'Siguiente paso',
		jumpBackward: 'Retroceder',
		jumpForward: 'Avanzar',
		startPin: 'Primer clavo:',
		lastPin: 'Último clavo:',
	},
	exportModal: exportModalEs,
	cropper: {
		title: 'Ajustar y Recortar Imagen',
		description: 'Ajusta el encuadre y rota la imagen para el bastidor.',
		rotateBtn: 'Rotar 90°',
		cancelBtn: 'Cancelar',
		applyBtn: 'Aplicar Recorte',
		cleanBgTitle: 'Aislar Sujeto (Fondo Limpio)',
		cleanBgDesc:
			'Aclara el fondo alrededor del sujeto para evitar líneas innecesarias en los bordes.',
		vignetteTitle: 'Difuminado Radial en Bordes',
		vignetteDesc:
			'Desvanece suavemente la silueta hacia el borde circular para un acabado artesanal.',
		vignetteStrength: 'Fuerza del difuminado',
	},
	candidatesModal: {
		title: 'Comparador de Candidatos Estéticos',
		description:
			'Evalúa 4 variaciones estilísticas generadas a partir de tu imagen y elige la mejor.',
		generating: 'Calculando candidatos en tiempo real...',
		applyBtn: 'Aplicar este candidato',
		selectedBadge: 'Activo',
		linesLabel: 'Líneas',
		contrastLabel: 'Contraste',
		highFidelityTitle: 'Retrato de Alta Fidelidad',
		highFidelityDesc:
			'Trazos suaves y sutiles con alta densidad de líneas para capturar transiciones y sombras realistas.',
		highFidelityBadge: 'Detalle fino',
		dramaticTitle: 'Contraste Expresivo',
		dramaticDesc:
			'Bordes marcados y gradientes intensos con alto impacto visual y sombras profundas.',
		dramaticBadge: 'Impacto visual',
		sketchTitle: 'Boceto Minimalista',
		sketchDesc:
			'Estructura lineal rápida con menos pasadas de hilo, ideal para armados ágiles.',
		sketchBadge: 'Rápido de tejer',
		invertedTitle: 'Luz sobre Ébano',
		invertedDesc:
			'Trazado inverso con hilo blanco sobre bastidor oscuro para retratos nocturnos brillantes.',
		invertedBadge: 'Fondo oscuro',
	},
	analyzer: {
		highDetailReasoning:
			'Alta frecuencia de bordes y micro-detalles. Se recomiendan más clavos con hilo fino y realce de bordes para máxima nitidez sin exceso de hilo.',
		smoothReasoning:
			'Trazos amplios y geometría fluida. Se recomienda hilo de cuerpo medio con protección de blancos para evitar sobre-densidad.',
	},
	statusPages: statusPagesEs,
};
