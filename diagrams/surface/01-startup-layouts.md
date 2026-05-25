# 01. Startup y layouts

Este diagrama muestra cómo `main.ts` arranca `app-surface` y especializa el montaje por layout.

```mermaid
%%{init: {"theme": "Redux Dark", "themeVariables": {"background": "#0B1020", "primaryColor": "#172033", "primaryTextColor": "#F8FAFC", "primaryBorderColor": "#38BDF8", "lineColor": "#94A3B8", "clusterBkg": "#111827", "clusterBorder": "#475569", "fontFamily": "Inter, Segoe UI, Arial"}}}%%
flowchart TB
  Main["main.ts<br/>import base CSS"] --> Start["startApplication()"]

  subgraph Startup["platform/startup/app.ts"]
    Start --> ErrorReporter["configureUiErrorReporter"]
    Start --> PartialReporter["setPartialReporter"]
    Start --> Dropdown["dropdownAdapter.init"]
    Start --> Ready["onReady(...)"]
    Ready --> Resolve["resolveLayout()"]
    Resolve --> BodyId{"document.body.id"}
    BodyId -->|"main-body-access"| Access["layout access"]
    BodyId -->|"main-body-control"| Control["layout control"]
    Resolve --> Assets["loadLayoutAssets(layout)"]
    Assets --> Visible["html visibility = visible"]
  end

  subgraph AccessLayout["access-layout.ts"]
    Access --> AccessTab["ensureTabSession"]
    AccessTab --> AccessMount["mountPages(registry, access)"]
  end

  subgraph ControlLayout["control/layout.ts + session.ts"]
    Control --> Assert["assertControlLayoutReady"]
    Assert --> BootSession["bootControlSession"]
    BootSession --> ExpiryUx["bindSessionExpiry<br/>warning / expired"]
    BootSession --> LogoutStay["bind logout / stay buttons"]
    Assert --> Prepare["prepareControlLayout"]
    Prepare --> EnsureTab["ensureTabSession"]
    Prepare --> FetchContext["fetchSessionContext<br/>/auth/context"]
    FetchContext --> Hydrate["sessionContext.hydrate"]
    Hydrate --> Menu["syncMenuLayout<br/>box / wide"]
    Menu --> ControlMount["mountPages(registry, control)"]
  end

  Start --> Bfcache["pageshow persisted"]
  Bfcache --> Restore["restoreLayout(layout)"]
  Restore --> AccessTab
  Restore --> Prepare

  classDef entry fill:#1E1B4B,stroke:#A78BFA,stroke-width:2px,color:#F5F3FF;
  classDef startup fill:#082F49,stroke:#38BDF8,stroke-width:2px,color:#E0F2FE;
  classDef access fill:#132E24,stroke:#4ADE80,stroke-width:2px,color:#DCFCE7;
  classDef control fill:#2A223A,stroke:#C084FC,stroke-width:2px,color:#F3E8FF;
  classDef session fill:#3B2F13,stroke:#F59E0B,stroke-width:2px,color:#FEF3C7;

  class Main,Start entry;
  class ErrorReporter,PartialReporter,Dropdown,Ready,Resolve,BodyId,Assets,Visible,Bfcache,Restore startup;
  class Access,AccessTab,AccessMount access;
  class Control,Assert,BootSession,Prepare,FetchContext,Hydrate,Menu,ControlMount control;
  class EnsureTab,ExpiryUx,LogoutStay session;
```

## Puntos de control

- El layout depende de `body.id`, emitido por `app-gateway`.
- `access` solo asegura tab session y monta pages de acceso.
- `control` separa la UX de sesión en `bootControlSession()` y la hidratación/menú en `prepareControlLayout()`.
- La infraestructura de sesión solo emite eventos; el layout `control` decide modal, logout y redirect.
- BFCache restaura lo mínimo sensible, especialmente la sesión de pestaña.

## Navegación

Siguiente: [02. Runtime, pages, fragments y bindings](02-runtime-pages-fragments-bindings.md)

Volver al [índice de surface](README.md).
