# Portafolio de Isaac Santiago

Sitio estático publicado en GitHub Pages: <https://sanlegas.github.io>. HTML, CSS y JavaScript nativos, sin paso de build ni dependencias que instalar.

## Verlo en local

```sh
python3 -m http.server 4173
```

Abrir <http://localhost:4173>.

## Estructura

| Ruta | Contenido |
| --- | --- |
| `index.html` | Inicio: perfil, qué resuelvo, proyectos, IA, experiencia, stack y contacto |
| `proyectos/` | Una página por proyecto: Publicador con IA, TeselARte, QR Menú y English For You |
| `css/styles.css` | Estilos base, tema claro y oscuro |
| `css/project.css` | Estilos de las páginas de proyecto |
| `js/main.js` | Cambio de tema, menú móvil y aparición al hacer scroll |
| `js/viewer.js` | Visor 3D bajo demanda de la página de QR Menú |
| `js/lang-boot.js`, `js/i18n.js`, `js/i18n.en.js` | Idiomas español e inglés |
| `assets/` | Imágenes, modelo 3D y CV |

## Idiomas

El español vive en el HTML y es la fuente. El inglés es un diccionario en `js/i18n.en.js` cuya llave es el texto en español tal como aparece en la página.

- El idioma inicial sale del navegador del visitante: español si lo prefiere, inglés en cualquier otro caso. El botón del encabezado lo cambia y guarda la elección.
- Para enlazar directo a una versión: `?lang=en` o `?lang=es`.
- Al editar un texto en español hay que actualizar su llave en `js/i18n.en.js`; si no, ese texto se queda en español en la versión en inglés. Para revisar, abrir la página con `?lang=en` y ejecutar `i18n.missing()` en la consola: solo deben aparecer nombres propios y tecnologías.

## Versiones anteriores

- `terminal/`: portafolio anterior con interfaz de terminal.
- `oldPortafolio/` y `juegos/`: contenido previo, sin cambios.
