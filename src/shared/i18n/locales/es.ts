import type { TranslationDictionary } from '../types';

export const es: TranslationDictionary = {
	header: {
		title: 'String Art Studio',
		subtitle: 'Generador de tejido geométrico de alta resolución',
		openSettingsAria: 'Abrir configuración',
		toggleThemeAria: 'Alternar tema',
		exportAria: 'Exportar proyecto',
		exportBtn: 'Exportar',
		languageAria: 'Seleccionar idioma',
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
	exportModal: {
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
		pdfTitle: 'PDF Taller de Armado (A4)',
		pdfDesc:
			'Plano técnico con plantilla numerada de clavos e instrucciones secuenciales.',
		downloadBtn: 'Descargar',
		generatingPdf: 'Generando PDF...',
	},
	cropper: {
		title: 'Ajustar y Recortar Imagen',
		description: 'Ajusta el encuadre y rota la imagen para el bastidor.',
		rotateBtn: 'Rotar 90°',
		cancelBtn: 'Cancelar',
		applyBtn: 'Aplicar Recorte',
	},
	analyzer: {
		highDetailReasoning:
			'Alta frecuencia de bordes y micro-detalles. Se recomiendan más clavos con hilo fino y realce de bordes para máxima nitidez sin exceso de hilo.',
		smoothReasoning:
			'Trazos amplios y geometría fluida. Se recomienda hilo de cuerpo medio con protección de blancos para evitar sobre-densidad.',
	},
	statusPages: {
		notFound: {
			badge: '404 · Coordenada no encontrada',
			title: 'Patrón no encontrado en el bastidor',
			description:
				'El clavo o la coordenada que buscas no forma parte del diseño actual. Es posible que el enlace haya expirado o la dirección sea incorrecta.',
			homeBtn: 'Volver al Estudio',
		},
		error: {
			badge: 'Error de Renderizado',
			title: 'Se ha enredado un hilo en el bastidor',
			description:
				'Ocurrió un error inesperado al calcular o renderizar el patrón. No te preocupes, el estado del estudio se puede recuperar.',
			retryBtn: 'Desenredar y reintentar',
			homeBtn: 'Reiniciar Estudio',
			detailsSummary: 'Detalles técnicos del error',
		},
		forbidden: {
			badge: '403 · Acceso Restringido',
			title: 'Bastidor protegido o sin permisos',
			description:
				'No dispones de las credenciales o permisos requeridos para acceder a esta área o diseño de taller.',
			homeBtn: 'Volver al Estudio',
		},
		unauthorized: {
			badge: '401 · Autenticación Requerida',
			title: 'Sesión de taller requerida',
			description:
				'Debes identificarte o iniciar sesión para acceder a este proyecto o recurso de hilorama.',
			homeBtn: 'Volver al Estudio',
		},
		loading: {
			title: 'Preparando bastidor y tensando hilos...',
			description:
				'Configurando el lienzo circular y calculando las coordenadas geométricas.',
		},
	},
};
