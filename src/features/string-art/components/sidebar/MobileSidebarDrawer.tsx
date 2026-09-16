'use client';

import { StudioSidebar, type StudioSidebarProps } from './StudioSidebar';

interface MobileSidebarDrawerProps {
	isOpen: boolean;
	onClose: () => void;
	sidebarProps: StudioSidebarProps;
}

export function MobileSidebarDrawer({
	isOpen,
	onClose,
	sidebarProps,
}: Readonly<MobileSidebarDrawerProps>) {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 z-50 flex md:hidden'>
			<button
				type='button'
				aria-label='Cerrar fondo'
				className='fixed inset-0 cursor-pointer bg-black/70 backdrop-blur-xs transition-opacity'
				onClick={onClose}
			/>
			<div className='slide-in-from-left relative z-10 flex h-full w-11/12 max-w-xs animate-in flex-col border-r bg-background shadow-2xl duration-200'>
				<StudioSidebar {...sidebarProps} onCloseMobile={onClose} />
			</div>
		</div>
	);
}
