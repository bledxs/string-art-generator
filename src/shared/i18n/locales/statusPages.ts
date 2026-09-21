import type { TranslationDictionary } from '../types';

type StatusPagesDictionary = TranslationDictionary['statusPages'];

export const statusPagesEn: StatusPagesDictionary = {
	notFound: {
		badge: '404 · Coordinate Not Found',
		title: 'Pattern not found on the loom',
		description:
			'The pin coordinate or pattern path you are looking for does not exist in this workshop. The link might have moved or expired.',
		homeBtn: 'Back to Studio',
	},
	error: {
		badge: 'Rendering Error',
		title: 'A thread got tangled on the loom',
		description:
			'An unexpected issue occurred while calculating or rendering the string art pattern. Your previous work is safe.',
		retryBtn: 'Untangle and Retry',
		homeBtn: 'Reset Studio',
		detailsSummary: 'Technical error details',
	},
	forbidden: {
		badge: '403 · Restricted Access',
		title: 'Protected Loom or Missing Permissions',
		description:
			'You do not have the required artisan clearance to access this workshop area or design.',
		homeBtn: 'Back to Studio',
	},
	unauthorized: {
		badge: '401 · Authentication Required',
		title: 'Workshop Session Required',
		description:
			'Please identify yourself or log in to access this project or string art workspace.',
		homeBtn: 'Back to Studio',
	},
	loading: {
		title: 'Preparing loom and tensioning threads...',
		description:
			'Setting up circular canvas and calculating geometric coordinates.',
	},
};

export const statusPagesEs: StatusPagesDictionary = {
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
};
