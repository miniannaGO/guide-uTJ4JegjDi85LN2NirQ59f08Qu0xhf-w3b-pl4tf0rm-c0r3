# 04. Workspace, toolkit y adapters

Este diagrama muestra dónde viven las integraciones UI concretas y cómo usan adapters técnicos sin convertir surface en dominio.

```mermaid
%%{init: {"theme": "Redux Dark", "themeVariables": {"background": "#0B1020", "primaryColor": "#172033", "primaryTextColor": "#F8FAFC", "primaryBorderColor": "#38BDF8", "lineColor": "#94A3B8", "clusterBkg": "#111827", "clusterBorder": "#475569", "fontFamily": "Inter, Segoe UI, Arial"}}}%%
flowchart TB
  Registry["workspace/integrations/registry.ts"] --> Integration["dashboard/integration.ts<br/>id: dashboard-general"]

  subgraph Workspace["workspace/integrations/dashboard"]
    Integration --> Page["page.ts<br/>DashboardPageBinding"]
    Integration --> Fragments["fragments/<br/>panel, detail, test-modal"]
    Contracts["contracts.ts<br/>firmas Gateway visibles"]
    Contracts --> Api["api.ts<br/>serverClient.html/json/data"]
    Contracts --> Actions["actions.ts<br/>arma request tipado"]
    Page --> Actions
    Page --> Controls["controls.ts<br/>mount/unmount adapters"]
    Fragments --> Controls
  end

  subgraph Runtime["platform/runtime"]
    RuntimeBinding["UiBinding"] --> Page
    RuntimeBinding --> Fragments
    DomBinding["DomBinding<br/>find, require, onClick, setHtml"] --> RuntimeBinding
    Guard["guardUiAction<br/>showUiError"] --> DomBinding
  end

  subgraph Toolkit["toolkit"]
    Controls --> Select2["select2Adapter"]
    Controls --> DateRange["dateRangePickerAdapter"]
    Guard --> Swal["swalAdapter"]
    DataTable["toolkit dataTableAdapter"]
    Modal["toolkit simpleModal<br/>HTML recibido"]
    Toast["toolkit toastAdapter<br/>HTML recibido"]
    Select2 --> LegacyGuards["legacy-globals<br/>ensureJQueryPlugin"]
    DateRange --> LegacyGuards
  end

  subgraph PlatformFacades["platform/infrastructure"]
    Controls --> DataTableFacade["adapters/datatable<br/>inyecta languageUrl"]
    Actions --> FeedbackFacade["feedback<br/>showRemote + showUiError"]
    Controls --> DevConsoleFacade["shared/dev-console<br/>AppConfig.isProduction"]
    ServerClient["serverClient.html/json/data"]
  end

  DataTableFacade --> DataTable
  FeedbackFacade --> Modal
  FeedbackFacade --> Toast
  FeedbackFacade --> ServerClient
  DataTable --> LegacyGuards
  Modal --> Bootstrap["Bootstrap globals"]
  Toast --> Bootstrap

  Actions --> Api
  Api --> Gateway["app-gateway<br/>HTML fragments / JSON"]
  ServerClient --> Gateway
  Modal --> ContentMount["context.mountContent<br/>monta fragments en contenido remoto"]
  Toast --> ContentMount

  Forbidden["No negocio<br/>No permisos<br/>No policies<br/>No mini-framework"] -. "límite" .-> Workspace

  classDef workspace fill:#132E24,stroke:#4ADE80,stroke-width:2px,color:#DCFCE7;
  classDef runtime fill:#082F49,stroke:#38BDF8,stroke-width:2px,color:#E0F2FE;
  classDef platform fill:#164E63,stroke:#22D3EE,stroke-width:2px,color:#ECFEFF;
  classDef toolkit fill:#2A223A,stroke:#C084FC,stroke-width:2px,color:#F3E8FF;
  classDef external fill:#3B2F13,stroke:#F59E0B,stroke-width:2px,color:#FEF3C7;
  classDef limit fill:#3F1D2B,stroke:#FB7185,stroke-width:2px,color:#FFE4E6;

  class Registry,Integration,Page,Fragments,Contracts,Api,Actions,Controls,ContentMount workspace;
  class RuntimeBinding,DomBinding,Guard runtime;
  class DataTableFacade,FeedbackFacade,DevConsoleFacade,ServerClient platform;
  class Select2,DataTable,DateRange,Modal,Toast,Swal,LegacyGuards,Bootstrap toolkit;
  class Gateway external;
  class Forbidden limit;
```

## Puntos de control

- `workspace` expresa UI concreta, no dominio.
- `contracts.ts` declara firmas TS del contrato Gateway visible para la integración; si el shape coincide con un DTO externo por passthrough, Surface igual no consume el proveedor directo.
- `actions.ts` recibe valores de `page.ts` o fragments, arma requests tipados y coordina `api.ts` con feedback.
- `platform/infrastructure` adapta config, HTTP y error UI antes de llamar a `toolkit`.
- `toolkit` envuelve librerías y helpers técnicos sin importar `platform`.
- Helpers nuevos viven según su responsabilidad: DOM en `toolkit/dom`, utilidades puras en `toolkit/shared`, plugins visuales en `toolkit/adapters` y feedback técnico en `toolkit/feedback`.
- Los adapters son opt-in y se importan donde se usan.
- Los adapters que dependen de plugins jQuery validan globals con `legacy-globals` y luego usan `$()` directamente.
- Si un adapter crea estado externo, debe destruirse en `unmount`.
- `withContentMount(this.contentMount)` activa fragments dentro de modales y toasts.

## Navegación

Anterior: [03. HTTP, sesión y errores UI](03-http-session-errors.md)

Siguiente: [05. Vite, styles y assets](05-vite-styles-assets.md)

Volver al [índice de surface](README.md).
