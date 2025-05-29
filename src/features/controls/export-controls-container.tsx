import { ReactNode } from 'react';

interface ExportControlsContainerProps {
  children: ReactNode;
}

export function ExportControlsContainer({
  children,
}: ExportControlsContainerProps) {
  return <section className='export-controls'>{children}</section>;
}
