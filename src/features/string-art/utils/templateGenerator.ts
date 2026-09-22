export * from './templateMetrics';
export * from './templatePdf';
export * from './templateSvg';
export * from './templateTiledPdf';
export * from './templateTiler';

export function triggerBlobDownload(blob: Blob, filename: string): void {
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}
