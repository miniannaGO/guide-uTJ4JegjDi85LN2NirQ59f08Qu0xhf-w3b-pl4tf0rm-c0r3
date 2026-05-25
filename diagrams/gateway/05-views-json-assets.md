# 05. Views, JSON y assets

Este diagrama muestra cómo `app-gateway` adapta resultados a salidas HTML, JSON, redirect y assets Vite.

```mermaid
%%{init: {"theme": "Redux Dark", "themeVariables": {"background": "#0B1020", "primaryColor": "#172033", "primaryTextColor": "#F8FAFC", "primaryBorderColor": "#38BDF8", "lineColor": "#94A3B8", "clusterBkg": "#111827", "clusterBorder": "#475569", "fontFamily": "Inter, Segoe UI, Arial"}}}%%
flowchart TB
  Controller["AppController"] --> Choice{"Tipo de salida"}

  Choice --> JsonPath["respondJson(...)<br/>ApiResponse"]
  JsonPath --> UseCaseResult["UseCaseResult"]
  UseCaseResult --> JsonEnvelope["JsonEnvelopeCodec<br/>success, data, message, errors, code"]
  JsonEnvelope --> JsonResponse["Core Http JsonResponse"]

  Choice --> AccessPath["renderAccessView(...)<br/>AccessPageResponse"]
  Choice --> ControlPath["renderControlView(...)<br/>ControlPageResponse"]
  Choice --> FragmentPath["renderFragmentView(...)<br/>FragmentResponse"]
  Choice --> RedirectPath["redirectTo(...)<br/>RedirectResponse"]
  Choice --> FlashPath["flashMessage(...)<br/>TabFlashMessages"]

  AccessPath --> ViewData["ViewData<br/>success, data, errors"]
  ControlPath --> ViewData
  FragmentPath --> ViewData
  FlashPath --> SessionFlash["_flash.<tabId><br/>mensaje temporal"]
  SessionFlash --> ViewData

  ViewData --> Layouts["resources/views/layouts<br/>access.page / control.page / fragment"]
  Layouts --> Partials["shared partials<br/>css, js, menu, error-box"]
  Partials --> Helpers["view(), url(), e()<br/>vite_styles(), vite_script()"]

  Helpers --> ViteAssets["Core View ViteAssets"]
  ViteAssets --> Manifest{"manifest disponible"}
  Manifest -->|"producción: obligatorio"| ManifestFile["ui-assets/.vite/manifest.json"]
  Manifest -->|"desarrollo: fallback"| Fallback["app.js / app.css + assetVersion"]
  ManifestFile --> Html["HTML final"]
  Fallback --> Html
  JsonResponse --> ResponseEmitter["ResponseEmitter"]
  Html --> ResponseEmitter
  RedirectPath --> ResponseEmitter
  ResponseEmitter --> Browser["Browser"]

  Layouts --> SurfaceAttrs["data-surface-page<br/>data-surface-fragment"]
  SurfaceAttrs --> Browser

  classDef controller fill:#132E24,stroke:#4ADE80,stroke-width:2px,color:#DCFCE7;
  classDef json fill:#082F49,stroke:#38BDF8,stroke-width:2px,color:#E0F2FE;
  classDef html fill:#2A223A,stroke:#C084FC,stroke-width:2px,color:#F3E8FF;
  classDef asset fill:#3B2F13,stroke:#F59E0B,stroke-width:2px,color:#FEF3C7;
  classDef bridge fill:#1E1B4B,stroke:#A78BFA,stroke-width:2px,color:#F5F3FF;
  classDef response fill:#064E3B,stroke:#34D399,stroke-width:2px,color:#ECFDF5;
  classDef session fill:#3B2F13,stroke:#F59E0B,stroke-width:2px,color:#FEF3C7;

  class Controller,Choice controller;
  class JsonPath,UseCaseResult,JsonEnvelope,JsonResponse json;
  class AccessPath,ControlPath,FragmentPath,ViewData,Layouts,Partials,Helpers,Html html;
  class ViteAssets,Manifest,ManifestFile,Fallback asset;
  class SurfaceAttrs,Browser bridge;
  class RedirectPath,ResponseEmitter response;
  class FlashPath,SessionFlash session;
```

## Puntos de control

- HTML lo renderiza `app-gateway`; `app-surface` solo lo activa.
- JSON debe respetar el envelope de `UseCaseResult`.
- Los mensajes flash son estado temporal por pestaña: se escriben antes de redirect y se consumen al renderizar la siguiente vista.
- `data-surface-*` es contrato declarativo para surface.
- La resolución de assets Vite pertenece a `Core\View\ViteAssets`, no a integraciones UI.

## Navegación

Anterior: [04. Outbound, services y connectors](04-outbound-services-connectors.md)

Siguiente: [06. DI, observabilidad y headers](06-di-observability-headers.md)

Volver al [índice de gateway](README.md).
