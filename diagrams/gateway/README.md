# Diagramas de App Gateway

`app-gateway` es el backend PHP y el mini-framework interno del producto. Sus diagramas están agrupados por flujo operativo.

## Índice

1. [Runtime, bootstrap y ciclo HTTP](01-runtime-bootstrap-http.md)
2. [Routing, middleware y controller](02-routing-middleware-controller.md)
3. [Use cases, resultados y errores](03-usecases-results-errors.md)
4. [Outbound, services y connectors](04-outbound-services-connectors.md)
5. [Views, JSON y assets](05-views-json-assets.md)
6. [DI, observabilidad y headers](06-di-observability-headers.md)

## Regla mental

```txt
Core arma el motor.
Extension declara la feature.
UseCase decide intención.
Response adapta salida.
Surface mejora el HTML después.
```

Volver al [índice de diagramas](../README.md).
