import { ReactNode } from 'react';

interface GenerationControlsContainerProps {
  children: ReactNode;
}

export function GenerationControlsContainer({
  children,
}: GenerationControlsContainerProps) {
  return <section className='generation-controls'>{children}</section>;
}
