# 01. SSR y Progressive Enhancement

Este diagrama muestra el camino completo de una página SSR con comportamiento UI.

```mermaid
%%{init: {"theme": "Redux Dark", "themeVariables": {"background": "#0B1020", "primaryColor": "#172033", "primaryTextColor": "#F8FAFC", "primaryBorderColor": "#38BDF8", "lineColor": "#94A3B8", "clusterBkg": "#111827", "clusterBorder": "#475569", "fontFamily": "Inter, Segoe UI, Arial"}}}%%
flowchart TB
  Browser["Browser<br/>GET /dashboard"] --> Route["app-gateway routing<br/>AuthenticatedRoutes"]
  Route --> Middleware["RequireAuthentication<br/>RefreshAuthTabSession"]
  Middleware --> Controller["DashboardController@index"]
  Controller --> Response["renderControlView(...)"]
  Response --> Layout["layouts/control.page.php"]
  Layout --> Page["dashboard/index.page.php<br/>HTML SSR"]
  Page --> SurfaceAttr["data-surface-page=\"dashboard-general\""]
  Layout --> Assets["vite_styles()<br/>vite_script()"]
  Layout --> BaseUrl["window.__BASE_URL__"]
  Assets --> Html["HTML final"]
  SurfaceAttr --> Html
  BaseUrl --> Html
  Html --> Browser

  Browser --> MainTs["app-surface/main.ts"]
  MainTs --> Startup["startApplication"]
  Startup --> ResolveLayout["resolveLayout<br/>body#main-body-control"]
  ResolveLayout --> MountControl["mountControlLayout"]
  MountControl --> Registry["uiIntegrationRegistry"]
  Registry --> Integration["dashboardIntegration"]
  Integration --> PageBinding["DashboardPageBinding"]
  PageBinding --> Enhanced["UI mejorada<br/>listeners, adapters, fragments"]

  Controller -. "decide estado y datos" .-> OwnershipGateway["Ownership gateway"]
  PageBinding -. "coordina interacción UI" .-> OwnershipSurface["Ownership surface"]

  classDef browser fill:#1E1B4B,stroke:#A78BFA,stroke-width:2px,color:#F5F3FF;
  classDef gateway fill:#082F49,stroke:#38BDF8,stroke-width:2px,color:#E0F2FE;
  classDef view fill:#132E24,stroke:#4ADE80,stroke-width:2px,color:#DCFCE7;
  classDef surface fill:#2A223A,stroke:#C084FC,stroke-width:2px,color:#F3E8FF;
  classDef asset fill:#3B2F13,stroke:#F59E0B,stroke-width:2px,color:#FEF3C7;
  classDef owner fill:#3F1D2B,stroke:#FB7185,stroke-width:2px,color:#FFE4E6;

  class Browser browser;
  class Route,Middleware,Controller,Response gateway;
  class Layout,Page,SurfaceAttr,Html view;
  class MainTs,Startup,ResolveLayout,MountControl,Registry,Integration,PageBinding,Enhanced surface;
  class Assets,BaseUrl asset;
  class OwnershipGateway,OwnershipSurface owner;
```

## Lectura recomendada

El servidor entrega la página ya armada. Surface encuentra `data-surface-page` y conecta comportamiento encima; eso quiere decir que, el contrato de montaje es declarativo. El backend no importa módulos frontend y el frontend no decide qué página debe existir.

## Navegación

Siguiente: [02. Fragments y contenido dinámico](02-fragments-dynamic-content.md)

Volver al [índice bridge](README.md).
