'use client';

import { Check, Crop, RotateCcw, ZoomIn } from 'lucide-react';
import { useCallback, useState } from 'react';
import Cropper, { type Area } from 'react-easy-crop';
import { Button } from '@/shared/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/shared/ui/dialog';
import { Slider } from '@/shared/ui/slider';
import { getCroppedImageDataUrl } from '../../utils/cropImage';

interface ImageCropperModalProps {
	isOpen: boolean;
	imageSrc: string | null;
	onClose: () => void;
	onCropComplete: (croppedDataUrl: string) => void;
}

export function ImageCropperModal({
	isOpen,
	imageSrc,
	onClose,
	onCropComplete,
}: Readonly<ImageCropperModalProps>) {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
	const [isProcessing, setIsProcessing] = useState(false);

	const handleCropComplete = useCallback((_: Area, croppedPixels: Area) => {
		setCroppedAreaPixels(croppedPixels);
	}, []);

	const handleApplyCrop = async () => {
		if (!(imageSrc && croppedAreaPixels)) return;
		try {
			setIsProcessing(true);
			const croppedUrl = await getCroppedImageDataUrl(
				imageSrc,
				croppedAreaPixels,
			);
			onCropComplete(croppedUrl);
			onClose();
		} finally {
			setIsProcessing(false);
		}
	};

	if (!imageSrc) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='max-w-md p-4 sm:p-6'>
				<DialogHeader>
					<div className='flex items-center gap-2'>
						<Crop className='size-4 text-primary' />
						<DialogTitle>Recortar Imagen para el Bastidor</DialogTitle>
					</div>
					<DialogDescription>
						Ajusta la posición y escala dentro del círculo guía para centrar tu
						diseño.
					</DialogDescription>
				</DialogHeader>

				<div className='relative mt-2 h-72 w-full overflow-hidden rounded-lg bg-black'>
					<Cropper
						image={imageSrc}
						crop={crop}
						zoom={zoom}
						aspect={1}
						cropShape='round'
						showGrid={true}
						onCropChange={setCrop}
						onZoomChange={setZoom}
						onCropComplete={handleCropComplete}
					/>
				</div>

				<div className='mt-4 flex flex-col gap-2'>
					<div className='flex items-center justify-between text-xs'>
						<span className='flex items-center gap-1.5 font-medium text-foreground'>
							<ZoomIn className='size-3.5 text-primary' />
							Zoom de recorte
						</span>
						<span className='font-mono text-muted-foreground'>
							{Math.round(zoom * 100)}%
						</span>
					</div>
					<Slider
						value={[zoom]}
						min={1}
						max={3}
						step={0.05}
						onValueChange={(val) => setZoom(val[0])}
					/>
				</div>

				<div className='mt-4 flex items-center justify-between gap-2'>
					<Button
						variant='ghost'
						size='sm'
						onClick={() => {
							setCrop({ x: 0, y: 0 });
							setZoom(1);
						}}
						className='gap-1.5 text-muted-foreground text-xs'
					>
						<RotateCcw className='size-3.5' />
						Restablecer
					</Button>

					<div className='flex items-center gap-2'>
						<Button variant='outline' size='sm' onClick={onClose}>
							Cancelar
						</Button>
						<Button
							variant='default'
							size='sm'
							disabled={isProcessing}
							onClick={handleApplyCrop}
							className='gap-1.5'
						>
							<Check className='size-3.5' />
							Aplicar Recorte
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
