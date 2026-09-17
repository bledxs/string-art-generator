export function calculateFitScale(
	viewportWidth: number,
	viewportHeight: number,
	contentSize = 700,
	padding = 32,
): number {
	if (viewportWidth <= 0 || viewportHeight <= 0) return 1;
	const availableW = viewportWidth - padding;
	const availableH = viewportHeight - padding;
	const fitScale = Math.min(availableW / contentSize, availableH / contentSize);
	return Math.max(0.2, Math.min(fitScale, 1));
}

export function calculateZoom(
	currentScale: number,
	direction: 'in' | 'out',
): number {
	const factor = direction === 'in' ? 1.25 : 0.8;
	return Math.max(0.2, Math.min(currentScale * factor, 5));
}
