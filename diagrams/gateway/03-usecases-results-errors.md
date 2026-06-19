# 03. Use cases, resultados y errores

Este diagrama muestra los dos carriles de use case y cómo se normalizan resultados y fallos controlados.

```mermaid
%%{init: {"theme": "Redux Dark", "themeVariables": {"background": "#0B1020", "primaryColor": "#172033", "primaryTextColor": "#F8FAFC", "primaryBorderColor": "#38BDF8", "lineColor": "#94A3B8", "clusterBkg": "#111827", "clusterBorder": "#475569", "fontFamily": "Inter, Segoe UI, Arial"}}}%%
flowchart TB
  Controller["Controller"] --> UseCase["AppUseCase / PortUseCaseBase<br/>run(...)"]

  UseCase --> Decision{"¿Flujo simple<br/>o robusto?"}

  Decision -->|"simple"| TakeOrAbort["takeOrAbort(connectorResult)<br/>una dependencia obligatoria"]
  TakeOrAbort --> SimpleConnector["ConnectorResult"]
  SimpleConnector --> UseCaseResultA["UseCaseResult"]

  Decision -->|"robusto"| RunFlow["runConnectorFlow(...)"]
  RunFlow --> Flow["ConnectorFlowInterface"]
  Flow --> Required["required(...)<br/>bloquea si falla"]
  Flow --> Optional["optional(..., fallback)<br/>conserva error y permite parcialidad"]
  Required --> Service["Service<br/>compone integraciones"]
  Optional --> Service
  Service --> ConnectorResults["ConnectorResult[]"]
  ConnectorResults --> ManagedFlow["ManagedConnectorFlow<br/>interno de Core"]
  ManagedFlow --> UseCaseResultB["UseCaseResult<br/>success / partial / failure"]

  UseCase -. "intención inválida" .-> AbortUseCase["abortUseCase(...)<br/>UseCaseAbort / UseCaseFailure"]
  AbortUseCase --> UseCaseResultError["UseCaseResult failure"]

  UseCaseResultA --> ResponseAdapter["Response<br/>JSON / HTML / redirect"]
  UseCaseResultB --> ResponseAdapter
  UseCaseResultError --> ResponseAdapter

  classDef controller fill:#132E24,stroke:#4ADE80,stroke-width:2px,color:#DCFCE7;
  classDef usecase fill:#082F49,stroke:#38BDF8,stroke-width:2px,color:#E0F2FE;
  classDef simple fill:#1E1B4B,stroke:#A78BFA,stroke-width:2px,color:#F5F3FF;
  classDef robust fill:#2A223A,stroke:#C084FC,stroke-width:2px,color:#F3E8FF;
  classDef connector fill:#3B2F13,stroke:#F59E0B,stroke-width:2px,color:#FEF3C7;
  classDef result fill:#064E3B,stroke:#34D399,stroke-width:2px,color:#ECFDF5;
  classDef error fill:#3F1D2B,stroke:#FB7185,stroke-width:2px,color:#FFE4E6;

  class Controller,ResponseAdapter controller;
  class UseCase,Decision usecase;
  class TakeOrAbort,SimpleConnector simple;
  class RunFlow,Flow,Required,Optional,ManagedFlow robust;
  class Service,ConnectorResults connector;
  class UseCaseResultA,UseCaseResultB result;
  class AbortUseCase,UseCaseResultError error;
```

## Puntos de control

- `takeOrAbort(...)` es para un connector obligatorio directo.
- `runConnectorFlow(...)` es para composición, opcionales, fallback o parcialidad.
- `Extension` no debe importar `ManagedConnectorFlow` ni factories internas de resultados.
- Los fallos controlados de use case viven en `Application/Failure`; `UseCaseAbort` es el corte manual de `abortUseCase(...)`.
- La parcialidad no se infiere por cantidad de errores, sino por significado del flujo.

## Navegación

Anterior: [02. Routing, middleware y controller](02-routing-middleware-controller.md)

Siguiente: [04. Outbound, services y connectors](04-outbound-services-connectors.md)

Volver al [índice de gateway](README.md).
