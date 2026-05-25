(() => {
  const currentScript = document.currentScript;
  const baseUrl = currentScript?.src
    ? new URL("guide/", currentScript.src)
    : new URL("./guide/", window.location.href);
  const modules = [
    "state.js",
    "navigation.js",
    "search.js",
    "anchors.js",
    "content.js",
    "markdown.js",
    "boot.js",
  ];

  function moduleUrl(module) {
    return new URL(module, baseUrl).href;
  }

  function loadModule(module) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = moduleUrl(module);
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  if (document.readyState === "loading") {
    document.write(
      modules
        .map((module) => `<script src="${moduleUrl(module)}"><\/script>`)
        .join(""),
    );
    return;
  }

  modules.reduce(
    (promise, module) => promise.then(() => loadModule(module)),
    Promise.resolve(),
  );
})();
