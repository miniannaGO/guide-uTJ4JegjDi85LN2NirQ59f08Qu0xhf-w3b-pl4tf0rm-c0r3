# 01. Runtime, bootstrap y ciclo HTTP

Este diagrama sigue la entrada de un request hasta que el kernel entrega una response.

```mermaid
%%{init: {"theme": "Redux Dark", "themeVariables": {"background": "#0B1020", "primaryColor": "#172033", "primaryTextColor": "#F8FAFC", "primaryBorderColor": "#38BDF8", "lineColor": "#94A3B8", "clusterBkg": "#111827", "clusterBorder": "#475569", "fontFamily": "Inter, Segoe UI, Arial"}}}%%
flowchart TB
  Request["HTTP request"] --> PublicIndex["public/index.php"]
  PublicIndex --> BootstrapRunner["BootstrapRunner<br/>.env + timezone"]
  BootstrapRunner --> ContainerFactory["ContainerFactory<br/>build/load Symfony container"]

  ContainerFactory --> RootProvider["Core RootProvider"]
  RootProvider --> CoreProviders["Core providers<br/>HTTP, routing, outbound, view, error"]
  ContainerFactory --> AppProvider["Extension AppProvider"]
  AppProvider --> ExtensionProviders["Extension providers<br/>controllers, routes, session, runtime"]

  ExtensionProviders --> Kernel["Kernel"]
  Kernel --> RequestFactory["HttpRequestFactory"]
  RequestFactory --> HttpRequest["HttpRequest"]
  Kernel --> LifecycleStart["RequestLifecycle.begin"]
  LifecycleStart --> BootstrapPipeline["RequestBootstrapPipeline"]
  BootstrapPipeline --> Bootstrappers["app.request_bootstrapper"]
  Bootstrappers --> Dispatcher["RouteDispatcher"]
  Dispatcher --> Response["HttpResponseInterface"]
  Response --> ResponseEmitter["ResponseEmitter"]
  ResponseEmitter --> Output["ResponseOutputInterface"]
  Output --> Client["Cliente"]

  ContainerFactory -. "fallo temprano" .-> BootstrapFailure["BootstrapFailureLogger<br/>BootstrapErrorResponder"]
  BootstrapFailure --> Output
  Kernel -. "error runtime" .-> ErrorHandler["ErrorHandler<br/>ThrowableMapper"]
  ErrorHandler --> Output

  classDef entry fill:#1E1B4B,stroke:#A78BFA,stroke-width:2px,color:#F5F3FF;
  classDef boot fill:#3B2F13,stroke:#F59E0B,stroke-width:2px,color:#FEF3C7;
  classDef provider fill:#082F49,stroke:#38BDF8,stroke-width:2px,color:#E0F2FE;
  classDef runtime fill:#132E24,stroke:#4ADE80,stroke-width:2px,color:#DCFCE7;
  classDef response fill:#2A223A,stroke:#C084FC,stroke-width:2px,color:#F3E8FF;
  classDef error fill:#3F1D2B,stroke:#FB7185,stroke-width:2px,color:#FFE4E6;

  class Request,PublicIndex,Client entry;
  class BootstrapRunner,ContainerFactory boot;
  class RootProvider,CoreProviders,AppProvider,ExtensionProviders provider;
  class Kernel,RequestFactory,HttpRequest,LifecycleStart,BootstrapPipeline,Bootstrappers,Dispatcher runtime;
  class Response,ResponseEmitter,Output response;
  class BootstrapFailure,ErrorHandler error;
```

## Puntos de control

- `Core` registra mecanismos transversales.
- `Extension` registra aplicación concreta.
- Los fallos de bootstrap y los errores runtime tienen carriles separados.
- El kernel no debería saber de features concretas más allá de lo que le entrega el contenedor.

## Navegación

Siguiente: [02. Routing, middleware y controller](02-routing-middleware-controller.md)

Volver al [índice de gateway](README.md).
