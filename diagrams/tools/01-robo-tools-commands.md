# Robo, scaffolding y contratos

```mermaid
%%{init: {"theme": "Redux Dark", "themeVariables": {"background": "#0B1020", "primaryColor": "#172033", "primaryTextColor": "#F8FAFC", "primaryBorderColor": "#38BDF8", "lineColor": "#94A3B8", "clusterBkg": "#111827", "clusterBorder": "#475569", "fontFamily": "Inter, Segoe UI, Arial"}}}%%
flowchart LR
  Dev["Dev<br/>composer robo"] --> Robo["app-gateway/RoboFile.php"]
  Robo --> Config["robo-configurations.json"]

  Robo --> Make["12 comandos make:*"]
  Robo --> Http["http:contract"]
  Robo --> SurfaceContract["surface:contract"]

  Make --> Scaffolder["tools/ExtensionScaffolder"]
  Http --> GatewayGenerator["tools/HttpContractGenerator/Gateway"]
  SurfaceContract --> SurfaceGenerator["tools/HttpContractGenerator/Surface"]
  GatewayGenerator --> Shared["tools/HttpContractGenerator/Shared"]
  SurfaceGenerator --> Shared

  Scaffolder --> Routing["ExtensionRouteRegister.php"]
  Scaffolder --> Controllers["Extension/Presentation/Http/Controller"]
  Scaffolder --> UseCases["Extension/Application/UseCase"]
  Scaffolder --> Services["Extension/Application/Service"]
  Scaffolder --> Ports["Extension/Application/Port"]
  Scaffolder --> Connectors["Extension/Infrastructure/Outbound/Connector"]
  Scaffolder --> Clients["Extension/Infrastructure/Outbound/Client"]
  Scaffolder --> Middleware["Extension/Presentation/Http/Middleware"]
  Scaffolder --> Views["resources/views"]
  Scaffolder --> SurfaceIntegrations["app-surface/workspace/integrations"]
  Scaffolder --> Menu["MainMenuItems.php"]

  GatewayGenerator --> PhpRequest["Outbound Client Request PHP"]
  GatewayGenerator --> PhpResponse["Contract/Outbound Response PHP"]
  SurfaceGenerator --> TsContracts["workspace/integrations/&lt;feature&gt;/contracts.ts"]

  subgraph RouteCommands["Rutas y aplicación"]
    RC["make:route-controller"]
    RUC["make:route-use-case"]
    UC["make:use-case"]
    SVC["make:service"]
    MW["make:middleware"]
  end

  subgraph OutboundCommands["Outbound"]
    CON["make:connector"]
    SC["make:service-client"]
  end

  subgraph SurfaceCommands["Puente Surface"]
    PAGE["make:integration-page"]
    FRAG["make:fragment"]
    DATA["make:integration-api-data"]
    JSON["make:integration-api-json"]
    HTML["make:integration-api-html"]
  end

  Make --> RouteCommands
  Make --> OutboundCommands
  Make --> SurfaceCommands

  PAGE --> Views
  PAGE --> SurfaceIntegrations
  PAGE --> Routing
  PAGE --> Controllers
  PAGE --> Menu
  FRAG --> SurfaceIntegrations
  DATA --> SurfaceIntegrations
  DATA --> Routing
  DATA --> Controllers
  JSON --> SurfaceIntegrations
  JSON --> Routing
  JSON --> Controllers
  HTML --> SurfaceIntegrations
  HTML --> Routing
  HTML --> Controllers
  HTML --> Views

  classDef dev fill:#172554,stroke:#60A5FA,stroke-width:2px,color:#DBEAFE;
  classDef tool fill:#312E81,stroke:#A78BFA,stroke-width:2px,color:#EDE9FE;
  classDef gateway fill:#064E3B,stroke:#34D399,stroke-width:2px,color:#D1FAE5;
  classDef surface fill:#7C2D12,stroke:#FDBA74,stroke-width:2px,color:#FFEDD5;
  classDef config fill:#3F3F46,stroke:#A1A1AA,stroke-width:2px,color:#F4F4F5;

  class Dev,Robo dev;
  class Scaffolder,GatewayGenerator,SurfaceGenerator,Shared tool;
  class Routing,Controllers,UseCases,Services,Ports,Connectors,Clients,Middleware,Views,Menu,PhpRequest,PhpResponse gateway;
  class SurfaceIntegrations,TsContracts surface;
  class Config config;
```

## Reglas del mapa

- `RoboFile.php` expone dos comandos de contratos (`http:contract`, `surface:contract`) y doce comandos `make:*`.
- `tools/ExtensionScaffolder` crea artefactos base y ediciones pequeñas; no decide arquitectura de negocio.
- Los comandos que registran rutas escriben en `ExtensionRouteRegister.php` y abortan si el path ya existe en el árbol de rutas.
- `make:integration-page` crea page SSR + integración Surface y aborta si ya existe `page.ts`, `integration.ts`, registro global del feature o ruta base.
- `make:fragment` solo toca una integración Surface existente y registra el fragment dentro de su `integration.ts`.
- `make:integration-api-data`, `make:integration-api-json` y `make:integration-api-html` exigen que exista la carpeta de feature Surface; crean `api.ts` si falta, agregan función, ruta y action; `html` además crea un fragment SSR base.
- `http:contract` genera PHP outbound para Gateway; no crea clients ni connectors.
- `surface:contract` genera clases TypeScript en `contracts.ts`; no crea `api.ts`, `actions.ts`, routes ni bindings UI.
