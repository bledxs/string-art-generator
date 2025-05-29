import { ReactNode } from 'react';

interface ParametersControlsContainerProps {
  children: ReactNode;
}

export function ParametersControlsContainer({
  children,
}: ParametersControlsContainerProps) {
  return <section className='parameters-controls'>{children}</section>;
}
