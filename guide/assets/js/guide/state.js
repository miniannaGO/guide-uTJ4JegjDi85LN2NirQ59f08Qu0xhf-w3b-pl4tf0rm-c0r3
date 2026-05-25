(() => {
  window.GuideDocs = window.GuideDocs || {};
  const guideNavigationItems = [
    ["getting-started.html", "Empezar"],
    ["fundamentals.html", "Bases"],
    ["app-gateway.html", "Gateway"],
    ["app-surface.html", "Surface"],
    ["bridge.html", "Bridge"],
    ["tools.html", "Tools"],
    ["recipes.html", "Guías"],
    ["diagrams.html", "Diagramas"],
    ["reference.html", "Referencia"],
    ["troubleshooting.html", "Ayuda"],
    ["bondades.html", "Ecosistema"],
  ];

  const guideNavigationAccentClasses = {
    "bridge.html": "guide-nav-link--bridge",
    "tools.html": "guide-nav-link--tools",
    "recipes.html": "guide-nav-link--recipes",
    "bondades.html": "guide-nav-link--ecosystem",
  };

  const guideSearchPages = [
    ["index.html", "Inicio"],
    ...guideNavigationItems.filter(([href]) => href !== "bondades.html"),
  ];

  const guideSearchAliases = {
    backend: ["gateway", "app gateway"],
    bridge: ["html", "json", "session", "csrf", "assets"],
    composer: ["robo", "make", "http contract", "scaffolder"],
    controller: ["controllers", "gateway", "request", "response"],
    css: ["styles", "estilos", "assets", "surface"],
    di: ["container", "provider", "providers", "inyeccion"],
    env: ["environment", "variables", "configuracion"],
    error: ["errores", "fallos", "diagnostico", "troubleshooting"],
    errores: ["error", "fallos", "diagnostico", "troubleshooting"],
    fragment: ["fragments", "html", "surface", "gateway"],
    gateway: [
      "backend",
      "controller",
      "controllers",
      "routing",
      "usecase",
      "connector",
    ],
    json: ["envelope", "api", "response", "bridge"],
    make: ["robo", "scaffold", "extension", "componentes"],
    route: ["routes", "routing", "rutas", "gateway"],
    robo: ["composer", "make", "tools", "scaffolder", "contratos"],
    rutas: ["route", "routes", "routing", "gateway"],
    scaffolder: ["extension", "make", "componentes", "robo"],
    surface: ["frontend", "runtime", "fragment", "fragments", "typescript"],
    tools: ["robo", "scaffolder", "http contract", "make"],
    vite: ["assets", "manifest", "surface", "build"],
  };

  window.GuideDocs.config = {
    guideNavigationItems,
    guideNavigationAccentClasses,
    guideSearchPages,
    guideSearchAliases,
  };
})();
