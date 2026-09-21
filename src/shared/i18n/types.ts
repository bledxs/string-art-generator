export type SupportedLocale = 'es' | 'en';

export interface TranslationDictionary {
	header: {
		title: string;
		subtitle: string;
		openSettingsAria: string;
		toggleThemeAria: string;
		exportAria: string;
		exportBtn: string;
		languageAria: string;
		sponsorAria: string;
		sponsorBtn: string;
		status: {
			idle: string;
			running: string;
			paused: string;
			completed: string;
		};
		stats: {
			lines: string;
			pins: string;
			diameter: string;
			time: string;
		};
	};
	sidebar: {
		panelTitle: string;
		closeAria: string;
		tabs: {
			presets: string;
			loom: string;
			color: string;
			engine: string;
		};
	};
	presets: {
		selectedImage: string;
		customBadge: string;
		presetBadge: string;
		customSubtitle: string;
		presetSubtitle: string;
		cropBtn: string;
		changeBtn: string;
		curatedTitle: string;
		defaultSampleTitle: string;
		customSampleTitle: string;
		autoCalibrate: {
			title: string;
			badge: string;
			pins: string;
			lines: string;
			thread: string;
			contrast: string;
			applyBtn: string;
		};
		compareCandidatesBtn: string;
	};
	presetsData: Record<
		string,
		{
			title: string;
			subtitle: string;
		}
	>;
	loom: {
		shapeTitle: string;
		circular: string;
		circularDesc: string;
		rectangular: string;
		rectangularDesc: string;
		ratioTitle: string;
		ratios: {
			square: string;
			portrait: string;
			landscape: string;
			widescreen: string;
		};
		pinsTitle: string;
		pinsRectDesc: string;
		pinsCircleDesc: string;
		diameterTitle: string;
		diameterRectTitle: string;
		diameterDesc: string;
	};
	color: {
		title: string;
		layersTitle: string;
		totalLines: string;
		linesUnit: string;
		productionBannerTitle: string;
		productionBannerDesc: string;
		layerAria: string;
		palettes: {
			monochrome: { name: string; description: string };
			cmyk: { name: string; description: string };
			rgbw: { name: string; description: string };
			'warm-sepia': { name: string; description: string };
		};
		layers: Record<string, string>;
	};
	engine: {
		colorModeTitle: string;
		subtractive: string;
		subtractiveDesc: string;
		additive: string;
		additiveDesc: string;
		materialTitle: string;
		materials: {
			silk: string;
			cotton: string;
			embroidery: string;
			rustic: string;
		};
		lineWeight: string;
		maxLines: string;
		edgeWeight: string;
		whitePenaltySubtractive: string;
		whitePenaltyAdditive: string;
		lengthPenalty: string;
		lengthPenaltyDesc: string;
		reboundPenalty: string;
		reboundPenaltyDesc: string;
		opacityStep: string;
		minDistance: string;
		minDistanceUnit: string;
		contrast: string;
	};
	spool: {
		title: string;
		spoolsCount: string;
		spoolCount: string;
	};
	actions: {
		generate: string;
		pause: string;
		resume: string;
		stop: string;
		regenerate: string;
		stopAria: string;
	};
	timeline: {
		play: string;
		pause: string;
		pinLabel: string;
		emptyPrompt: string;
		guideBtn: string;
		guideAria: string;
	};
	zoom: {
		zoomIn: string;
		zoomOut: string;
		reset: string;
		viewGuide: string;
		viewGuideAria: string;
	};
	assistant: {
		title: string;
		description: string;
		spoolChangeTitle: string;
		spoolChangePrompt: string;
		activeSpool: string;
		progress: string;
		from: string;
		to: string;
		prevStep: string;
		nextStep: string;
		jumpBackward: string;
		jumpForward: string;
		startPin: string;
		lastPin: string;
	};
	exportModal: {
		title: string;
		description: string;
		svgTitle: string;
		svgDesc: string;
		txtTitle: string;
		txtDesc: string;
		jsonTitle: string;
		jsonDesc: string;
		gcodeTitle: string;
		gcodeDesc: string;
		gcodePolar: string;
		gcodeCartesian: string;
		pdfTitle: string;
		pdfDesc: string;
		downloadBtn: string;
		generatingPdf: string;
		sponsorTitle: string;
		sponsorDesc: string;
		sponsorBtn: string;
	};
	cropper: {
		title: string;
		description: string;
		rotateBtn: string;
		cancelBtn: string;
		applyBtn: string;
		cleanBgTitle: string;
		cleanBgDesc: string;
		vignetteTitle: string;
		vignetteDesc: string;
		vignetteStrength: string;
	};
	candidatesModal: {
		title: string;
		description: string;
		generating: string;
		applyBtn: string;
		selectedBadge: string;
		linesLabel: string;
		contrastLabel: string;
		highFidelityTitle: string;
		highFidelityDesc: string;
		highFidelityBadge: string;
		dramaticTitle: string;
		dramaticDesc: string;
		dramaticBadge: string;
		sketchTitle: string;
		sketchDesc: string;
		sketchBadge: string;
		invertedTitle: string;
		invertedDesc: string;
		invertedBadge: string;
	};
	analyzer: {
		highDetailReasoning: string;
		smoothReasoning: string;
	};
	statusPages: {
		notFound: {
			badge: string;
			title: string;
			description: string;
			homeBtn: string;
		};
		error: {
			badge: string;
			title: string;
			description: string;
			retryBtn: string;
			homeBtn: string;
			detailsSummary: string;
		};
		forbidden: {
			badge: string;
			title: string;
			description: string;
			homeBtn: string;
		};
		unauthorized: {
			badge: string;
			title: string;
			description: string;
			homeBtn: string;
		};
		loading: {
			title: string;
			description: string;
		};
	};
}
