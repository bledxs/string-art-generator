export interface CropArea {
	x: number;
	y: number;
	width: number;
	height: number;
}

function createLoadedImage(url: string): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.addEventListener('load', () => resolve(img));
		img.addEventListener('error', (err) => reject(err));
		img.setAttribute('crossOrigin', 'anonymous');
		img.src = url;
	});
}

export async function getCroppedImageDataUrl(
	imageSrc: string,
	pixelCrop: CropArea,
	outputSize = 700,
): Promise<string> {
	const image = await createLoadedImage(imageSrc);
	const canvas = document.createElement('canvas');
	canvas.width = outputSize;
	canvas.height = outputSize;
	const ctx = canvas.getContext('2d');
	if (!ctx) throw new Error('No se pudo obtener el contexto 2D del canvas');

	ctx.drawImage(
		image,
		pixelCrop.x,
		pixelCrop.y,
		pixelCrop.width,
		pixelCrop.height,
		0,
		0,
		outputSize,
		outputSize,
	);

	return canvas.toDataURL('image/jpeg', 0.95);
}
