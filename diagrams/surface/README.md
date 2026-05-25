# Diagramas de App Surface

`app-surface` es el frontend TypeScript progresivo sobre SSR. Sus diagramas explican cómo arranca, cómo monta pages/fragments, cómo llama al gateway y dónde viven los adapters técnicos.

## Índice

1. [Startup y layouts](01-startup-layouts.md)
2. [Runtime, pages, fragments y bindings](02-runtime-pages-fragments-bindings.md)
3. [HTTP, sesión y errores UI](03-http-session-errors.md)
4. [Workspace, toolkit y adapters](04-workspace-toolkit-adapters.md)
5. [Vite, styles y assets](05-vite-styles-assets.md)

## Regla mental

```txt
platform arranca.
runtime monta.
workspace define integraciones UI.
toolkit ofrece adapters técnicos.
gateway conserva negocio, datos y estado.
```

Volver al [índice de diagramas](../README.md).
