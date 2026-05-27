# Diagramas del sistema

Esta carpeta agrupa diagramas Mermaid del proyecto completo. La intención es que un dev junior pueda seguir el flujo sin perderse y que un dev senior pueda revisar fronteras, ownership y contratos compartidos.

Los diagramas son una guía visual. Si contradicen el código, la configuración o el filesystem real, manda el proyecto real.

## Índice

1. [Contexto completo del sistema](00-system-context.md)
2. [App Gateway](gateway/README.md)
3. [App Surface](surface/README.md)
4. [Puente Gateway / Surface](bridge/README.md)
5. [Herramientas](tools/README.md)

## Lectura recomendada

Para entender una interacción completa:

```txt
00-system-context
-> gateway/01-runtime-bootstrap-http
-> gateway/05-views-json-assets
-> bridge/01-ssr-progressive-enhancement
-> surface/01-startup-layouts
-> surface/02-runtime-pages-fragments-bindings
-> tools/01-robo-tools-commands
```

Para cambiar un contrato compartido, revisa además:

- [Gateway: resultados, errores y use cases](gateway/03-usecases-results-errors.md)
- [Surface: HTTP, sesión y errores UI](surface/03-http-session-errors.md)
- [Bridge: JSON, sesión y assets](bridge/03-json-session-assets-contracts.md)

## Convención visual

Todos los diagramas usan Mermaid con:

```json
{ "theme": "Redux Dark" }
```

Los colores no son decorativos: separan responsabilidades como runtime, presentación, aplicación, integración, UI, sesión, errores y assets.
