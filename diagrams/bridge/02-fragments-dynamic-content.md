# 02. Fragments y contenido dinámico

Este diagrama muestra cómo se inserta HTML remoto y cómo `FragmentRuntime` lo activa sin montaje manual desde la feature.

```mermaid
%%{init: {"theme": "Redux Dark", "themeVariables": {"background": "#0B1020", "primaryColor": "#172033", "primaryTextColor": "#F8FAFC", "primaryBorderColor": "#38BDF8", "lineColor": "#94A3B8", "clusterBkg": "#111827", "clusterBorder": "#475569", "fontFamily": "Inter, Segoe UI, Arial"}}}%%
flowchart TB
  PageBinding["DashboardPageBinding"] --> Click["click: cargar panel"]
  Click --> Api["fetchPanelHtml()<br/>serverClient.html(... expect dashboard-panel)"]
  Api --> GatewayRoute["app-gateway<br/>GET /auth/dashboard-panel"]
  GatewayRoute --> FragmentController["FragmentController@dashboardPanel"]
  FragmentController --> FragmentResponse["renderFragmentView(...)"]
  FragmentResponse --> FragmentLayout["layouts/fragment.php"]
  FragmentLayout --> PanelHtml["dashboard/panel.fragment.php<br/>HTML SSR"]
  PanelHtml --> PanelAttr["data-surface-fragment=\"dashboard-panel\""]
  PanelAttr --> HtmlString["HTML string"]
  HtmlString --> Insert["container.innerHTML = html"]

  Insert --> Observer["FragmentRuntime MutationObserver"]
  Observer --> Resolve["context.fragmentRegistry['dashboard-panel']"]
  Resolve --> Loader["import fragments/panel.ts"]
  Loader --> PanelBinding["DashboardPanelFragmentBinding"]
  PanelBinding --> Controls["mountControls<br/>Select2 + DataTable"]

  PanelBinding --> ClickDetail["click: cargar detalle"]
  ClickDetail --> DetailApi["serverClient.html(... expect dashboard-detail)"]
  DetailApi --> DetailHtml["detail.fragment.php<br/>data-surface-fragment=\"dashboard-detail\""]
  DetailHtml --> DetailInsert["innerHTML detalle"]
  DetailInsert --> Observer

  Insert -. "reemplazo/remoción" .-> Removed["fragment removido"]
  Removed --> Unmount["unmount deepest-first"]
  Unmount --> Destroy["destroy adapters<br/>Select2/DataTable/DateRangePicker"]

  ModalToast["modal/toast HTML remoto"] --> ContentMount["withContentMount(this.contentMount)"]
  ContentMount --> Observer

  classDef surface fill:#2A223A,stroke:#C084FC,stroke-width:2px,color:#F3E8FF;
  classDef http fill:#082F49,stroke:#38BDF8,stroke-width:2px,color:#E0F2FE;
  classDef gateway fill:#132E24,stroke:#4ADE80,stroke-width:2px,color:#DCFCE7;
  classDef runtime fill:#1E1B4B,stroke:#A78BFA,stroke-width:2px,color:#F5F3FF;
  classDef adapter fill:#3B2F13,stroke:#F59E0B,stroke-width:2px,color:#FEF3C7;
  classDef lifecycle fill:#3F1D2B,stroke:#FB7185,stroke-width:2px,color:#FFE4E6;

  class PageBinding,Click,Insert,PanelBinding,ClickDetail,DetailInsert,ModalToast,ContentMount surface;
  class Api,DetailApi http;
  class GatewayRoute,FragmentController,FragmentResponse,FragmentLayout,PanelHtml,PanelAttr,HtmlString,DetailHtml gateway;
  class Observer,Resolve,Loader runtime;
  class Controls,Destroy adapter;
  class Removed,Unmount lifecycle;
```

## Puntos de control

- La integración inserta HTML; el runtime monta fragments por observer.
- La carga progresiva valida HTML embebible y el `data-surface-fragment` esperado antes de insertar.
- El fragment debe estar registrado dentro de la integración propietaria.
- Los adapters se destruyen cuando el fragment sale del DOM.
- Modal y toast necesitan `contentMount` si su HTML remoto trae fragments.

## Navegación

Anterior: [01. SSR y Progressive Enhancement](01-ssr-progressive-enhancement.md)

Siguiente: [03. JSON, sesión y assets compartidos](03-json-session-assets-contracts.md)

Volver al [índice bridge](README.md).
