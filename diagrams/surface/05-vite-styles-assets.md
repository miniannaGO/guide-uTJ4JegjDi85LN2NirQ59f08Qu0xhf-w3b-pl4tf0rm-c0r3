# 05. Vite, styles y assets

Este diagrama explica cómo se compila `app-surface` y cómo `app-gateway` consume esos assets.

```mermaid
%%{init: {"theme": "Redux Dark", "themeVariables": {"background": "#0B1020", "primaryColor": "#172033", "primaryTextColor": "#F8FAFC", "primaryBorderColor": "#38BDF8", "lineColor": "#94A3B8", "clusterBkg": "#111827", "clusterBorder": "#475569", "fontFamily": "Inter, Segoe UI, Arial"}}}%%
flowchart LR
  Package["package.json<br/>npm run build"] --> Tsc["tsc"]
  Package --> LiteBuild["npm run lite:build<br/>vite build --watch"]
  Tsc --> Vite["vite build<br/>vite.config.ts"]
  LiteBuild --> Vite

  subgraph Config["Vite config"]
    IndexHtml["index.html<br/>Vite dev harness"] -. "serve local" .-> Vite
    Vite --> Env["loadEnv raíz<br/>BASE_URI, PUBLIC_PATH, MENU_LAYOUT,<br/>IS_PRODUCTION, SESSION_EXPIRY_ALERT,<br/>SPEED_UP_BUILD"]
    Env --> AppEnv["define __APP_ENV__"]
    Env --> SpeedUp["SPEED_UP_BUILD<br/>heavyBuild=false"]
    Vite --> Input["input: main.ts"]
    Vite --> External["external: jquery"]
    Vite --> Chunks["manualChunks por paquete"]
  end

  subgraph SurfaceStyles["app-surface styles"]
    Input --> MainCss["workspace/styles/base/main.css"]
    MainCss --> Base["base/style.css"]
    MainCss --> Vendors["vendors/select2.css<br/>vendors/daterangepicker.css"]
    MainCss --> Tokens["tokens/color-primary.css"]
    Startup["loadLayoutAssets(layout)"] --> AccessCss["layouts/access.css<br/>access.theme.css"]
    Startup --> ControlCss["layouts/control.css<br/>control.theme.css"]
  end

  Vite --> Output["app-gateway/{PUBLIC_PATH}/ui-assets"]
  Output --> Manifest[".vite/manifest.json"]
  Output --> JsCss["JS/CSS chunks"]

  subgraph GatewayViews["app-gateway views"]
    ControlPartial["shared/control/css+js.partial.php"]
    AccessPartial["shared/access/css+js.partial.php"]
    ViteHelpers["vite_styles()<br/>vite_script()"]
    ViteAssets["Core View ViteAssets"]
  end

  ControlPartial --> ViteHelpers
  AccessPartial --> ViteHelpers
  ViteHelpers --> ViteAssets
  ViteAssets --> Manifest
  ViteAssets --> BrowserTags["link/script/modulepreload"]
  BrowserTags --> Browser["Browser"]
  JsCss --> Browser
  AppEnv --> AppConfig["AppConfig<br/>isProduction, menuLayout,<br/>sessionExpiryAlert"]
  SpeedUp --> Vite

  MissingManifest{"Producción<br/>sin manifest"} -->|"fallar claro"| Error["FrameworkException"]
  Manifest --> MissingManifest

  classDef build fill:#1E1B4B,stroke:#A78BFA,stroke-width:2px,color:#F5F3FF;
  classDef config fill:#082F49,stroke:#38BDF8,stroke-width:2px,color:#E0F2FE;
  classDef styles fill:#132E24,stroke:#4ADE80,stroke-width:2px,color:#DCFCE7;
  classDef output fill:#3B2F13,stroke:#F59E0B,stroke-width:2px,color:#FEF3C7;
  classDef gateway fill:#2A223A,stroke:#C084FC,stroke-width:2px,color:#F3E8FF;
  classDef error fill:#3F1D2B,stroke:#FB7185,stroke-width:2px,color:#FFE4E6;

  class Package,Tsc,LiteBuild,Vite build;
  class Env,AppEnv,SpeedUp,Input,External,Chunks,AppConfig,IndexHtml config;
  class MainCss,Base,Vendors,Tokens,Startup,AccessCss,ControlCss styles;
  class Output,Manifest,JsCss,BrowserTags,Browser output;
  class ControlPartial,AccessPartial,ViteHelpers,ViteAssets gateway;
  class MissingManifest,Error error;
```

## Puntos de control

- El build de surface publica en `app-gateway/{PUBLIC_PATH}/ui-assets`.
- `npm run lite:build` ejecuta `vite build --watch`; no ejecuta `tsc` antes de cada build. Para validación completa usa `npm run build`.
- `ViteAssets` resuelve manifest y tags desde el gateway.
- `index.html` es un harness local de Vite; la UI real de producción la renderiza `app-gateway`.
- En producción, manifest faltante debe fallar claro.
- `jquery` es external porque lo cargan los parciales legacy del gateway.
- Los estilos de layout se cargan dinámicamente desde startup.
- `SPEED_UP_BUILD` solo ajusta el build de Vite; no se inyecta en `__APP_ENV__`.

## Navegación

Anterior: [04. Workspace, toolkit y adapters](04-workspace-toolkit-adapters.md)

Volver al [índice de surface](README.md).
