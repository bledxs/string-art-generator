#!/bin/bash

# Script para generar todos los iconos necesarios desde un SVG base
# Requiere ImageMagick: brew install imagemagick (macOS) o apt-get install imagemagick (Ubuntu)

# Crear directorio public si no existe
mkdir -p public

# Generar favicons desde tu logo.svg
convert logo.png -resize 16x16 public/favicon-16x16.png
convert logo.png -resize 32x32 public/favicon-32x32.png
convert logo.png -resize 180x180 public/apple-touch-icon.png
convert logo.png -resize 192x192 public/android-chrome-192x192.png
convert logo.png -resize 512x512 public/android-chrome-512x512.png

# Generar imágenes para redes sociales
convert logo.png -resize 1200x630 -gravity center -background white -extent 1200x630 public/og-image.jpg
convert logo.png -resize 1200x600 -gravity center -background white -extent 1200x600 public/twitter-image.jpg

echo "Iconos generados exitosamente!"