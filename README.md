# Masajes Nülan - Sitio Web Premium Minimalista

Este es el sitio web estático final y optimizado de **Masajes Nülan**, construido a partir de los mockups proporcionados. Cuenta con un diseño "soft minimalism" y una experiencia interactiva para el Hero en la página de inicio.

## Características Principales

1. **Estilo Unificado**: Se reemplazó el framework Tailwind CSS dinámico por un sistema de diseño nativo en Vanilla CSS (`style.css`), que define variables globales de color, tipografía y espaciado para un rendimiento ultra-rápido y una consistencia perfecta.
2. **Multi-página**: Navegación real y fluida entre las 5 secciones requeridas:
   - Inicio (`index.html`)
   - Servicios (`servicios.html`)
   - Beneficios (`beneficios.html`)
   - Gift Cards (`giftcard.html`)
   - Contacto (`contacto.html`)
3. **Hero Scroll-driven**: El hero de la página de inicio utiliza la animación original en un formato de video de alto rendimiento (`assets/1full.mp4`). La posición de reproducción se sincroniza directamente con el nivel de scroll del usuario.
4. **Diseño Adaptativo**: Totalmente responsive (optimizado para visualización en teléfonos móviles, tablets y ordenadores de escritorio).

---

## Cómo Ejecutar Localmente

No se requiere ningún paso de compilación o instalación.

### Opción A (Recomendada para la funcionalidad del video Hero)
Debido a políticas de seguridad de algunos navegadores modernos sobre la carga local de videos (`CORS`), es altamente recomendable abrir la carpeta usando un servidor local rápido.

Ejecuta el siguiente comando en tu terminal dentro de esta carpeta:

```bash
python3 -m http.server 8000
```

Luego abre en tu navegador: [http://localhost:8000](http://localhost:8000)

### Opción B
Simplemente haz doble clic en el archivo `index.html` para abrirlo directamente en tu navegador web habitual.

---

## Modificación de Assets

* **Video del Hero**: Se encuentra en `assets/1full.mp4`.
* **Cómo se generó el Video**: Dado que los navegadores web no permiten controlar con precisión el scroll sobre un WebP animado nativo, extrajimos los 120 fotogramas del archivo `1full.webp` original y los unificamos en un video H.264 MP4 altamente compatible mediante la herramienta `ffmpeg`. El comando exacto utilizado fue:

```bash
ffmpeg -framerate 25 -i frame_%04d.png -c:v libx264 -profile:v high -crf 20 -pix_fmt yuv420p 1full.mp4
```

* **Imágenes de las Galería/Secciones**:
  - `assets/salon1.jpeg`
  - `assets/salon2.jpeg`
  - `assets/salon3.jpeg`
