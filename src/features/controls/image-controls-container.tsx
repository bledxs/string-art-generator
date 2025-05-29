interface ImageControlsContainerProps {
  children?: React.ReactNode;
}

export function ImageControlsContainer({
  children,
}: ImageControlsContainerProps) {
  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-xl font-semibold mb-3 text-card-foreground'>
          1. Cargar Imagen
        </h2>
        {children}
      </div>
    </div>
  );
}
