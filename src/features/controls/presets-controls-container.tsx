import { ReactNode } from 'react';

interface PresetsControlsContainerProps {
  children: ReactNode;
}

export function PresetsControlsContainer({
  children,
}: PresetsControlsContainerProps) {
  return <section className='presets-controls'>{children}</section>;
}
