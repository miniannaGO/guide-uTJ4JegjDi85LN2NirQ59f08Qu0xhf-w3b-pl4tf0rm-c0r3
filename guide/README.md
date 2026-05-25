# Guía Web Platform Core

Guía estática e informativa para explicar cómo instalar, entender y usar `web-platform-core`.

En sitios de frameworks, este apartado suele llamarse `Guía` o `Guías`: aquí
`docs/guide` funciona como guía de uso, onboarding y how-to del proyecto.

No tiene persistencia, build ni backend propio. Las páginas HTML se pueden abrir
directamente desde:

```txt
docs/guide/index.html
```

## Estructura

```txt
docs/guide/
  app-gateway.html
  app-surface.html
  assets/
    css/guide.css
    js/guide.js
  bondades.html
  bridge.html
  diagrams.html
  fundamentals.html
  getting-started.html
  index.html
  recipes.html
  reference.html
  tools.html
  troubleshooting.html
```

## Decisiones

- Bootstrap 5 local en `assets/` para layout y componentes.
- Shiki por CDN para visor de código con tema de sintaxis.
- Tema oscuro inspirado en Monokai Pro Spectrum para lectura prolongada.
- CSS propio para legibilidad, visor de código y visor Markdown/Mermaid.
- JavaScript propio mínimo para copiar snippets y mejorar navegación.
- Menú global renderizado por JavaScript para mantener las páginas alineadas.
- `.htaccess` permite `docs/guide` y `docs/diagrams` para que el visor pueda leer Markdown/Mermaid.
- Contenido estático mantenido manualmente.
- Cada tema grande vive en su propio archivo HTML para evitar una página gigante.
- `tools.html` documenta `ExtensionScaffolder`, `HttpContractGenerator`, comandos Robo y `robo-configurations.json`.
- `bondades.html` funciona como presentación de impacto y valor operativo; no reemplaza las páginas técnicas de aprendizaje.
- Cada tema grande debe abrir con una síntesis o conclusión para orientar, y después bajar a detalle amplio, explícito y conectado con el resto de la guía.

## Mantenimiento

Cuando cambien instalación, `.env`, contratos compartidos, flujo gateway/surface o comandos principales, esta guía debe actualizarse junto con `docs/tutorials/` y `docs/diagrams/` si aplica. El orden pedagógico debe mantenerse: primero vocabulario y lectura guiada, luego flujo completo, matrices, escenarios, diagnóstico y referencia.

Los árboles de filesystem mostrados en la guía deben mantenerse en orden alfabético por nivel, igual que en el explorador de VS Code. Si el árbol usa placeholders como `<feature>` o `<ExternalService>`, también debe respetar ese orden.
