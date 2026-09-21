import type { ColorRun, GCodeOptions, LoomConfig, Pin } from '../types';

export interface PinPhysicalCoord {
	x: number;
	y: number;
}

export function calculatePinPhysicalCoord(
	pin: Pin,
	loom: LoomConfig,
	originAtCenter = true,
): PinPhysicalCoord {
	const radiusMm = (loom.physicalDiameterCm * 10) / 2;
	const angleStep = (2 * Math.PI) / loom.pinCount;
	const angleRad = pin.id * angleStep;

	const xCentered = radiusMm * Math.sin(angleRad);
	const yCentered = radiusMm * Math.cos(angleRad);

	if (originAtCenter) {
		return {
			x: Number(xCentered.toFixed(2)),
			y: Number(yCentered.toFixed(2)),
		};
	}

	return {
		x: Number((xCentered + radiusMm).toFixed(2)),
		y: Number((yCentered + radiusMm).toFixed(2)),
	};
}

export function calculateShortestAngularTarget(
	targetAngle: number,
	currentAccumulatedAngle: number,
): number {
	const currentNormalized = ((currentAccumulatedAngle % 360) + 360) % 360;
	let diff = targetAngle - currentNormalized;
	if (diff > 180) diff -= 360;
	if (diff < -180) diff += 360;
	return Number((currentAccumulatedAngle + diff).toFixed(2));
}

function generateHeaderComments(
	loom: LoomConfig,
	totalLines: number,
	options: Required<GCodeOptions>,
): string[] {
	return [
		'; ==================================================',
		'; STRING ART STUDIO - G-CODE CNC WEAVING PROGRAM',
		`; Generated: ${new Date().toISOString()}`,
		`; Total Pins: ${loom.pinCount} | Total Lines: ${totalLines}`,
		`; Diameter: ${loom.physicalDiameterCm} cm (${loom.physicalDiameterCm * 10} mm)`,
		`; Kinematics: ${options.kinematics.toUpperCase()}`,
		`; Feedrate: ${options.feedrate} mm/min`,
		'; ==================================================',
		'G21 ; Set units to millimeters',
		'G90 ; Absolute positioning mode',
	];
}

function generateCartesianBlock(
	lines: number[],
	pins: Pin[],
	loom: LoomConfig,
	options: Required<GCodeOptions>,
): string[] {
	const gcode: string[] = [];
	const { feedrate, zClearance, zWork, originAtCenter } = options;

	const startCoord = calculatePinPhysicalCoord(
		pins[lines[0]],
		loom,
		originAtCenter,
	);
	gcode.push(`G0 Z${zClearance.toFixed(2)} ; Move to clearance height`);
	gcode.push(`G0 X${startCoord.x} Y${startCoord.y} ; Rapid to initial pin`);
	gcode.push(`G1 Z${zWork.toFixed(2)} F${feedrate} ; Lower to winding height`);

	for (let i = 1; i < lines.length; i++) {
		const pinIndex = lines[i];
		const coord = calculatePinPhysicalCoord(
			pins[pinIndex],
			loom,
			originAtCenter,
		);
		gcode.push(
			`G1 X${coord.x} Y${coord.y} F${feedrate} ; Line ${i} -> Pin ${pinIndex}`,
		);
	}

	return gcode;
}

function generatePolarBlock(
	lines: number[],
	loom: LoomConfig,
	options: Required<GCodeOptions>,
): string[] {
	const gcode: string[] = [];
	const { feedrate, axisLetter } = options;
	const anglePerPin = 360 / loom.pinCount;
	let accumulatedAngle = 0;

	for (let i = 0; i < lines.length; i++) {
		const pinIndex = lines[i];
		const targetAngle = (pinIndex * anglePerPin) % 360;
		accumulatedAngle = calculateShortestAngularTarget(
			targetAngle,
			accumulatedAngle,
		);
		const comment =
			i === 0 ? '; Initial Pin' : `; Step ${i} -> Pin ${pinIndex}`;
		gcode.push(`G1 ${axisLetter}${accumulatedAngle} F${feedrate} ${comment}`);
	}

	return gcode;
}

function generateSpoolChangeComment(
	run: ColorRun,
	runIndex: number,
	totalRuns: number,
): string {
	return [
		`; --------------------------------------------------`,
		`; SPOOL CHANGE (${runIndex + 1}/${totalRuns}): ${run.name.toUpperCase()} (${run.color})`,
		`; Lines: ${run.startIndex} to ${run.endIndex}`,
		`; --------------------------------------------------`,
		`M0 (MSG, Load thread ${run.name} - ${run.color})`,
	].join('\n');
}

export function generateGCode(
	pins: Pin[],
	lines: number[],
	loom: LoomConfig,
	userOptions?: GCodeOptions,
	colorRuns?: ColorRun[],
): string {
	if (lines.length === 0 || pins.length === 0)
		return '; No lines generated yet.\n';

	const options: Required<GCodeOptions> = {
		kinematics: userOptions?.kinematics ?? 'cartesian',
		feedrate: userOptions?.feedrate ?? 1800,
		zClearance: userOptions?.zClearance ?? 5,
		zWork: userOptions?.zWork ?? 0,
		originAtCenter: userOptions?.originAtCenter ?? true,
		axisLetter: userOptions?.axisLetter ?? 'A',
		includeComments: userOptions?.includeComments ?? true,
	};

	const header = generateHeaderComments(loom, lines.length - 1, options);
	const moves =
		options.kinematics === 'polar'
			? generatePolarBlock(lines, loom, options)
			: generateCartesianBlock(lines, pins, loom, options);

	const footer = [
		`G0 Z${options.zClearance.toFixed(2)} ; Retract to clearance`,
		options.originAtCenter
			? 'G0 X0 Y0 ; Return to center'
			: 'G0 X0 Y0 ; Return to origin',
		'M5 ; Spindle/tool stop',
		'M30 ; End of program',
	];

	if (colorRuns && colorRuns.length > 1) {
		const segmentedMoves = insertSpoolPauses(moves, colorRuns);
		return [...header, ...segmentedMoves, ...footer].join('\n');
	}

	return [...header, ...moves, ...footer].join('\n');
}

function insertSpoolPauses(moves: string[], colorRuns: ColorRun[]): string[] {
	const result: string[] = [];
	let runIdx = 0;

	for (let i = 0; i < moves.length; i++) {
		if (runIdx < colorRuns.length && i === colorRuns[runIdx].startIndex) {
			result.push(
				generateSpoolChangeComment(colorRuns[runIdx], runIdx, colorRuns.length),
			);
			runIdx++;
		}
		result.push(moves[i]);
	}

	return result;
}
