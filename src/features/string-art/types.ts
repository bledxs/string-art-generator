export interface Pin {
	id: number;
	x: number;
	y: number;
	angle: number;
	edge?: 'top' | 'right' | 'bottom' | 'left' | 'circle';
}

export interface LoomConfig {
	shape: 'circle' | 'rectangle';
	pinCount: number;
	physicalDiameterCm: number;
	pinOffsetRatio: number;
	aspectRatio?: '1:1' | '3:4' | '4:3' | '16:9';
}

export interface ColorLayer {
	id: string;
	name: string;
	color: string;
	linesCount: number;
	opacityStep?: number;
	dmcCode?: string;
	gutermannCode?: string;
}

export interface ColorRun {
	layerId: string;
	name: string;
	color: string;
	startIndex: number;
	endIndex: number;
	lineCount?: number;
	dmcCode?: string;
	gutermannCode?: string;
}

export type GCodeKinematics = 'polar' | 'cartesian';

export interface GCodeOptions {
	kinematics?: GCodeKinematics;
	feedrate?: number;
	zClearance?: number;
	zWork?: number;
	originAtCenter?: boolean;
	axisLetter?: string;
	includeComments?: boolean;
}

export interface AlgorithmConfig {
	maxLines: number;
	lineWeight: number;
	opacityStep: number;
	minDistance: number;
	contrast: number;
	brightness: number;
	edgeWeight?: number;
	whitePenalty?: number;
	autoStop?: boolean;
	colorMode?: 'dark-on-light' | 'light-on-dark';
	lengthPenalty?: number;
	reboundPenalty?: number;
	colorPaletteType?: 'monochrome' | 'cmyk' | 'rgbw' | 'warm-sepia';
	colorLayers?: ColorLayer[];
}

export type EngineStatus = 'idle' | 'running' | 'paused' | 'completed';

export interface GenerationProgress {
	status: EngineStatus;
	currentStep: number;
	totalSteps: number;
	currentPin: number;
	lineSequence: number[];
	timeElapsedMs: number;
	converged?: boolean;
	colorRuns?: ColorRun[];
	currentLayerIndex?: number;
	currentLayerName?: string;
	currentColor?: string;
}

export interface PresetImage {
	id: string;
	title: string;
	subtitle: string;
	url: string;
	recommendedLines: number;
	recommendedPins: number;
}

export type WorkerInMessage =
	| {
			type: 'START';
			payload: {
				pixelBuffer: Uint8ClampedArray;
				rgbaBuffer?: Uint8ClampedArray;
				canvasSize: number;
				loomConfig: LoomConfig;
				algoConfig: AlgorithmConfig;
			};
	  }
	| { type: 'PAUSE' }
	| { type: 'RESUME' }
	| { type: 'STOP' };

export type WorkerOutMessage =
	| {
			type: 'PROGRESS_BATCH';
			payload: {
				currentStep: number;
				totalSteps: number;
				currentPin: number;
				newLines: number[];
				currentLayerIndex?: number;
				currentLayerName?: string;
				currentColor?: string;
				colorRuns?: ColorRun[];
			};
	  }
	| {
			type: 'COMPLETED';
			payload: {
				totalLines: number;
				lineSequence: number[];
				timeElapsedMs: number;
				converged?: boolean;
				colorRuns?: ColorRun[];
			};
	  }
	| {
			type: 'ERROR';
			payload: {
				message: string;
			};
	  };
