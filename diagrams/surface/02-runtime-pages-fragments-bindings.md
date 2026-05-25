# 02. Runtime, pages, fragments y bindings

Este diagrama muestra cómo el runtime encuentra roots declarados por SSR y carga módulos frontend bajo demanda.

```mermaid
%%{init: {"theme": "Redux Dark", "themeVariables": {"background": "#0B1020", "primaryColor": "#172033", "primaryTextColor": "#F8FAFC", "primaryBorderColor": "#38BDF8", "lineColor": "#94A3B8", "clusterBkg": "#111827", "clusterBorder": "#475569", "fontFamily": "Inter, Segoe UI, Arial"}}}%%
flowchart TB
  Html["HTML SSR<br/>app-gateway"] --> PageRoot["[data-surface-page]"]
  PageRoot --> MountPages["mountPages(uiIntegrationRegistry, layout)"]

  subgraph Registry["workspace/integrations/registry.ts"]
    MountPages --> ResolveIntegration["resolveIntegration(id)"]
    ResolveIntegration --> UiIntegration["UiIntegration<br/>id, layout, page.load, fragments"]
  end

  subgraph PageRuntime["platform/runtime/mounting/pages.ts"]
    UiIntegration --> StatusPage["data-surface-page-status<br/>mounting / mounted"]
    StatusPage --> Context["createMountContext<br/>integrationId + fragmentRegistry"]
    Context --> Watch["fragmentRuntime.watch(root, context)"]
    Context --> LoadPage["loadRequiredMount(page.load)"]
    LoadPage --> MountModule{"export disponible"}
    MountModule -->|"mount(root, context)"| MountFunction["mount function"]
    MountModule -->|"default UiBinding"| BindingClass["mountBinding(UiBinding)"]
    MountFunction --> PageMounted["page mounted"]
    BindingClass --> PageMounted
  end

  subgraph FragmentRuntime["platform/runtime/mounting/fragments.ts"]
    PageMounted --> InitialFragments["mount fragments iniciales"]
    Watch --> MutationObserver["MutationObserver"]
    MutationObserver --> Added["fragment agregado"]
    MutationObserver --> Removed["fragment removido"]
    Added --> FragmentRoot["[data-surface-fragment]"]
    FragmentRoot --> FragmentLoader["context.fragmentRegistry[key].load"]
    FragmentLoader --> FragmentBinding["fragment mount / UiBinding"]
    FragmentBinding --> FragmentStatus["data-surface-fragment-status"]
    Removed --> UnmountFragment["unmount deepest-first"]
  end

  PageMounted --> PageUnmount["unmount page<br/>stop watcher + page unmount"]
  PageUnmount --> UnmountFragment

  classDef html fill:#1E1B4B,stroke:#A78BFA,stroke-width:2px,color:#F5F3FF;
  classDef registry fill:#082F49,stroke:#38BDF8,stroke-width:2px,color:#E0F2FE;
  classDef page fill:#132E24,stroke:#4ADE80,stroke-width:2px,color:#DCFCE7;
  classDef fragment fill:#2A223A,stroke:#C084FC,stroke-width:2px,color:#F3E8FF;
  classDef lifecycle fill:#3B2F13,stroke:#F59E0B,stroke-width:2px,color:#FEF3C7;

  class Html,PageRoot html;
  class MountPages,ResolveIntegration,UiIntegration registry;
  class StatusPage,Context,Watch,LoadPage,MountModule,MountFunction,BindingClass,PageMounted page;
  class InitialFragments,MutationObserver,Added,Removed,FragmentRoot,FragmentLoader,FragmentBinding,FragmentStatus fragment;
  class PageUnmount,UnmountFragment lifecycle;
```

## Puntos de control

- `data-surface-page` debe existir en el registry.
- Los fragments se registran dentro de la integración propietaria.
- El runtime acepta `mount(...)` o una clase `UiBinding` por default.
- El desmontaje deepest-first protege adapters y DOM anidado.

## Navegación

Anterior: [01. Startup y layouts](01-startup-layouts.md)

Siguiente: [03. HTTP, sesión y errores UI](03-http-session-errors.md)

Volver al [índice de surface](README.md).
