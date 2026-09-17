export interface Pin {
	id: number;
	x: number;
	y: number;
	angle: number;
}

export interface LoomConfig {
	shape: 'circle';
	pinCount: number;
	physicalDiameterCm: number;
	pinOffsetRatio: number;
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
			};
	  }
	| {
			type: 'COMPLETED';
			payload: {
				totalLines: number;
				lineSequence: number[];
				timeElapsedMs: number;
				converged?: boolean;
			};
	  }
	| {
			type: 'ERROR';
			payload: {
				message: string;
			};
	  };
