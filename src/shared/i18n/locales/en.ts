import type { TranslationDictionary } from '../types';

export const en: TranslationDictionary = {
	header: {
		title: 'String Art Studio',
		subtitle: 'High-resolution geometric thread generator',
		openSettingsAria: 'Open configuration',
		toggleThemeAria: 'Toggle theme',
		exportAria: 'Export project',
		exportBtn: 'Export',
		languageAria: 'Select language',
		sponsorAria: 'Sponsor on GitHub',
		sponsorBtn: 'Sponsor',
		status: {
			idle: 'Idle',
			running: 'Calculating...',
			paused: 'Paused',
			completed: 'Completed',
		},
		stats: {
			lines: 'Lines',
			pins: 'Pins',
			diameter: 'Diameter',
			time: 'Time',
		},
	},
	sidebar: {
		panelTitle: 'Art Configuration',
		closeAria: 'Close panel',
		tabs: {
			presets: 'Samples',
			loom: 'Loom',
			color: 'Color',
			engine: 'Engine',
		},
	},
	presets: {
		selectedImage: 'Selected Image',
		customBadge: 'Custom',
		presetBadge: 'Sample',
		customSubtitle: 'Cropped photo',
		presetSubtitle: 'Optimized preset',
		cropBtn: 'Crop',
		changeBtn: 'Change',
		curatedTitle: 'High-definition samples',
		defaultSampleTitle: 'Selected sample',
		customSampleTitle: 'Uploaded image',
		autoCalibrate: {
			title: 'Smart Auto-Calibration',
			badge: 'Recommended',
			pins: 'Pins:',
			lines: 'Lines:',
			thread: 'Thread:',
			contrast: 'Contrast:',
			applyBtn: 'Apply recommendation',
		},
	},
	presetsData: {
		mandala: {
			title: 'Cosmic Mandala',
			subtitle: 'High-density circular geometry',
		},
		portrait: {
			title: 'Minimalist Portrait',
			subtitle: 'Facial contrast for string portraits',
		},
		cube: {
			title: "Metatron's Cube",
			subtitle: 'Precision isometric lines',
		},
	},
	loom: {
		shapeTitle: 'Loom Shape',
		circular: 'Circular',
		circularDesc: 'Classic radial hoop',
		rectangular: 'Rectangular',
		rectangularDesc: 'Orthogonal frame (Perspicere)',
		ratioTitle: 'Frame Aspect Ratio',
		ratios: {
			square: 'Square',
			portrait: 'Portrait',
			landscape: 'Landscape',
			widescreen: 'Wide',
		},
		pinsTitle: 'Number of pins',
		pinsRectDesc: 'Proportional distribution across 4 frame borders.',
		pinsCircleDesc: 'Angular resolution around circular hoop.',
		diameterTitle: 'Physical diameter',
		diameterRectTitle: 'Physical width',
		diameterDesc:
			'Accurately estimates required thread meters and real physical scale.',
	},
	color: {
		title: 'Color Palette & Spools',
		layersTitle: 'Sequential Layers',
		totalLines: 'Total:',
		linesUnit: 'lines',
		productionBannerTitle: 'Physical Layered Production:',
		productionBannerDesc:
			'The algorithm weaves spool by spool sequentially. This prevents muddy entanglement and enables smooth spool changing in the workshop.',
		layerAria: 'Lines for layer',
		palettes: {
			monochrome: {
				name: 'Classic Monochrome',
				description: '1 spool. Traditional high contrast on wood or ebony.',
			},
			cmyk: {
				name: 'CMYK Quad-Color',
				description:
					'4 spools (Black, Cyan, Magenta, Yellow). Subtractive on white background.',
			},
			rgbw: {
				name: 'Luminous RGBW (Additive)',
				description:
					'4 spools (Blue, Carmine, Gold, Pure White). Additive on ebony background.',
			},
			'warm-sepia': {
				name: 'Workshop Sepia & Terracotta',
				description:
					'3 spools of warm earth tones. Ideal for Renaissance portraits.',
			},
		},
		layers: {
			'mono-base': 'Main Thread',
			'cmyk-k': 'Carbon Black (K)',
			'cmyk-c': 'Intense Cyan (C)',
			'cmyk-m': 'Carmine Magenta (M)',
			'cmyk-y': 'Chrome Yellow (Y)',
			'rgbw-b': 'Cobalt Blue (Shadows)',
			'rgbw-r': 'Carmine Red (Midtones)',
			'rgbw-y': 'Warm Gold (Nuances)',
			'rgbw-w': 'Titanium White (Highlights)',
			'sepia-dark': 'Dark Espresso (Shadows)',
			'sepia-terracotta': 'Tuscan Terracotta (Volume)',
			'sepia-cream': 'Ivory Cream (Light)',
		},
	},
	engine: {
		colorModeTitle: 'Rendering Mode',
		subtractive: 'Subtractive',
		subtractiveDesc: 'Dark thread · Light background',
		additive: 'Additive (Light)',
		additiveDesc: 'Light thread · Ebony background',
		materialTitle: 'Thread Type & Thickness',
		materials: {
			silk: 'Ultra-fine Silk #50',
			cotton: 'Mercerized Cotton #40',
			embroidery: 'Heavy Embroidery #20',
			rustic: 'Craft Cord / Linen',
		},
		lineWeight: 'Stroke weight',
		maxLines: 'Max line limit',
		edgeWeight: 'Edge emphasis',
		whitePenaltySubtractive: 'White protection',
		whitePenaltyAdditive: 'Shadow protection (Black)',
		lengthPenalty: 'Length normalization',
		lengthPenaltyDesc:
			'Dampens long central chords and prioritizes fine local detail',
		reboundPenalty: 'Anti-rebound filter',
		reboundPenaltyDesc:
			'Suppresses ping-pong oscillation to guide threads along contour paths',
		opacityStep: 'Thread opacity',
		minDistance: 'Min cord distance',
		minDistanceUnit: 'pins',
		contrast: 'Input contrast',
	},
	spool: {
		title: 'Artisan Spool',
		spoolsCount: 'spools',
		spoolCount: 'spool',
	},
	actions: {
		generate: 'Generate String Art',
		pause: 'Pause',
		resume: 'Resume',
		stop: 'Stop',
		regenerate: 'Regenerate',
		stopAria: 'Stop calculation',
	},
	timeline: {
		play: 'Play',
		pause: 'Pause',
		pinLabel: 'Pin:',
		emptyPrompt: 'Start generation to explore thread paths on the timeline',
		guideBtn: 'Weaving Guide',
		guideAria: 'Open weaving guide',
	},
	zoom: {
		zoomIn: 'Zoom in',
		zoomOut: 'Zoom out',
		reset: 'Reset view',
		viewGuide: 'Guide & info',
		viewGuideAria: 'Scroll to guide and frequently asked questions',
	},
	assistant: {
		title: 'Weaving Assistant',
		description: 'Interactive step-by-step guide for the physical loom.',
		spoolChangeTitle: 'Spool Change!',
		spoolChangePrompt: 'Cut, tie, and switch to',
		activeSpool: 'Active spool:',
		progress: 'Progress',
		from: 'From',
		to: 'To',
		prevStep: 'Previous step',
		nextStep: 'Next step',
		jumpBackward: 'Jump back',
		jumpForward: 'Jump forward',
		startPin: 'First pin:',
		lastPin: 'Last pin:',
	},
	exportModal: {
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
		pdfTitle: 'Workshop Assembly PDF (A4)',
		pdfDesc:
			'Printable schematic with numbered rim template and sequential steps.',
		downloadBtn: 'Download',
		generatingPdf: 'Generating PDF...',
		sponsorTitle: 'Enjoying String Art Studio?',
		sponsorDesc: 'Support ongoing development on GitHub Sponsors.',
		sponsorBtn: 'Sponsor',
	},
	cropper: {
		title: 'Adjust & Crop Image',
		description: 'Adjust crop area and orientation for optimal loom fitting.',
		rotateBtn: 'Rotate 90°',
		cancelBtn: 'Cancel',
		applyBtn: 'Apply Crop',
	},
	analyzer: {
		highDetailReasoning:
			'High edge density and micro-details. Recommending fine thread with extra pins and edge enhancement for maximum sharpness.',
		smoothReasoning:
			'Broad strokes and fluid geometry. Recommending medium-weight thread with white protection to prevent excessive density.',
	},
	statusPages: {
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
	},
};
