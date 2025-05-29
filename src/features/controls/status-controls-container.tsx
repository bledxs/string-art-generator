import { ReactNode } from 'react';

interface StatusControlsContainerProps {
  children: ReactNode;
}

export function StatusControlsContainer({
  children,
}: StatusControlsContainerProps) {
  return <section className='status-controls'>{children}</section>;
}
