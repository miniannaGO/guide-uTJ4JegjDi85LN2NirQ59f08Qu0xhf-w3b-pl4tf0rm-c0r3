# 03. JSON, sesión y assets compartidos

Este diagrama resume los contratos que cruzan `app-gateway` y `app-surface`.

```mermaid
%%{init: {"theme": "Redux Dark", "themeVariables": {"background": "#0B1020", "primaryColor": "#172033", "primaryTextColor": "#F8FAFC", "primaryBorderColor": "#38BDF8", "lineColor": "#94A3B8", "clusterBkg": "#111827", "clusterBorder": "#475569", "fontFamily": "Inter, Segoe UI, Arial"}}}%%
flowchart LR
  subgraph JsonContract["Contrato JSON"]
    UseCaseResult["UseCaseResult"] --> ApiResponse["ApiResponse<br/>JsonEnvelopeCodec"]
    ApiResponse --> Envelope["success, data, message,<br/>errors, code, errorMeta"]
    Envelope --> SurfaceParser["serverClient.json/data<br/>parseEnvelope"]
    LocalContracts["workspace/integrations/&lt;feature&gt;/contracts.ts<br/>firma de data/body/params"]
    LocalContracts --> SurfaceParser
    SurfaceParser --> Partial["success=true + errors<br/>partialReporter"]
    SurfaceParser --> Failure["success=false<br/>mediateHttpError"]
  end

  subgraph HtmlContract["Contrato HTML"]
    ViewResponse["ViewResponse<br/>LayoutViewResponse"] --> Html["HTML SSR"]
    Html --> PageAttr["data-surface-page"]
    Html --> FragmentAttr["data-surface-fragment"]
    HtmlClient["serverClient.html<br/>HTML embebible"] --> FragmentAttr
    HtmlClient --> HtmlGuard["bloquea redirects<br/>layouts completos / pages"]
    PageAttr --> SurfaceRuntime["mountPages"]
    FragmentAttr --> FragmentRuntime["FragmentRuntime"]
  end

  subgraph SessionContract["Contrato sesión"]
    EnsureTab["ensureTabSession"] --> HeaderTab["X-TAB-SESSION"]
    HeaderTab --> TabResolver["TabSessionRequestResolver"]
    TabResolver --> TabStore["TabSessionStore"]
    TabStore --> FlashMessages["TabFlashMessages<br/>_flash.<tabId>"]
    FlashMessages --> Html
    RemainingEmitter["RemainingSessionHeaderEmitter"] --> HeaderRemaining["X-REMAINING"]
    HeaderRemaining --> Countdown["sessionCountdown.sync"]
  end

  subgraph AssetContract["Contrato assets"]
    ViteBuild["app-surface vite build"] --> UiAssets["app-gateway/{PUBLIC_PATH}/ui-assets"]
    UiAssets --> Manifest[".vite/manifest.json"]
    Manifest --> ViteAssets["Core View ViteAssets"]
    ViteAssets --> Helpers["vite_styles()<br/>vite_script()"]
    Helpers --> Browser["Browser"]
  end

  Failure --> ShowUiError["showUiError"]
  Partial --> ShowUiError
  SurfaceRuntime --> UiBinding["UiBinding"]
  FragmentRuntime --> UiBinding

  classDef json fill:#082F49,stroke:#38BDF8,stroke-width:2px,color:#E0F2FE;
  classDef html fill:#132E24,stroke:#4ADE80,stroke-width:2px,color:#DCFCE7;
  classDef session fill:#3B2F13,stroke:#F59E0B,stroke-width:2px,color:#FEF3C7;
  classDef asset fill:#2A223A,stroke:#C084FC,stroke-width:2px,color:#F3E8FF;
  classDef surface fill:#1E1B4B,stroke:#A78BFA,stroke-width:2px,color:#F5F3FF;
  classDef error fill:#3F1D2B,stroke:#FB7185,stroke-width:2px,color:#FFE4E6;

  class UseCaseResult,ApiResponse,Envelope,LocalContracts,SurfaceParser,Partial json;
  class ViewResponse,Html,HtmlClient,HtmlGuard,PageAttr,FragmentAttr html;
  class EnsureTab,HeaderTab,TabResolver,TabStore,FlashMessages,RemainingEmitter,HeaderRemaining,Countdown session;
  class ViteBuild,UiAssets,Manifest,ViteAssets,Helpers,Browser asset;
  class SurfaceRuntime,FragmentRuntime,UiBinding surface;
  class Failure,ShowUiError error;
```

## Tabla rápida de ownership

| Contrato                | Dueño principal                                                     | Consumidor                                      |
| ----------------------- | ------------------------------------------------------------------- | ----------------------------------------------- |
| Envelope JSON           | `app-gateway/Core\Http\Response` y `Extension\Response\ApiResponse` | `app-surface/platform/infrastructure/http`      |
| Firma TS de `data/body` | ruta Gateway visible para Surface                                   | `workspace/integrations/<feature>/contracts.ts` |
| HTML SSR                | `app-gateway/resources/views`                                       | `app-surface/platform/runtime`                  |
| HTML progresivo         | `serverClient.html(...)`                                            | valida HTML embebible antes de insertar         |
| `data-surface-page`     | vista SSR + integración UI acordada                                 | `mountPages(...)`                               |
| `data-surface-fragment` | fragment SSR + integración propietaria                              | `FragmentRuntime`                               |
| `X-TAB-SESSION`         | `app-surface` lo envía, gateway lo valida                           | sesión backend por pestaña                      |
| `_flash.<tabId>`        | `app-gateway` lo escribe y consume                                  | HTML SSR del siguiente request                  |
| `X-REMAINING`           | gateway lo emite                                                    | contador frontend                               |
| Manifest Vite           | `app-surface` lo genera                                             | `Core\View\ViteAssets` lo resuelve              |

## Navegación

Anterior: [02. Fragments y contenido dinámico](02-fragments-dynamic-content.md)

Volver al [índice bridge](README.md).
