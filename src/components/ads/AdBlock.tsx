// src/components/ads/AdBlock.tsx
import React, { useEffect } from 'react';

interface AdBlockProps {
  adClient: string; // Tu ID de publicador, ej. "ca-pub-XXXXXXXXXXXXXXXX"
  adSlot: string; // El ID de tu bloque de anuncios específico
  adFormat?: string; // 'auto', 'rectangle', 'vertical', etc. (opcional, AdSense suele manejarlo)
  responsive?: boolean; // 'true' o 'false' como string para el tag
  className?: string; // Para estilizar el contenedor del anuncio
  style?: React.CSSProperties; // Estilos en línea para el contenedor
  minHeight?: string; // Para evitar CLS (Cumulative Layout Shift)
}

export const AdBlock: React.FC<AdBlockProps> = ({
  adClient,
  adSlot,
  adFormat = 'auto',
  responsive = true, // AdSense recomienda true para adaptable
  className,
  style,
  minHeight = '90px', // Un alto mínimo común para banners pequeños
}) => {
  useEffect(() => {
    try {
      // @ts-expect-error // TypeScript puede no conocer adsbygoogle globalmente
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error(
        `Error al cargar AdSense para el slot:`,
        (e as Error).message,
      );
    }
  }, [adSlot]); // Vuelve a ejecutar si el slot cambia (aunque usualmente no lo hará para un bloque fijo)

  // Es importante que el contenedor del anuncio sea visible y tenga dimensiones
  // para que AdSense pueda renderizar el anuncio.
  // Usar overflow:hidden es una buena práctica para contenedores de anuncios.
  return (
    <div
      className={className}
      style={{
        ...style,
        minHeight: minHeight,
        textAlign: 'center',
        overflow: 'hidden',
      }}
      aria-label='Anuncio publicitario' // Para accesibilidad
    >
      <ins
        className='adsbygoogle'
        style={{ display: 'block' }} // AdSense requiere display:block o inline-block
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={responsive.toString()} // Debe ser un string 'true' o 'false'
      />
    </div>
  );
};
