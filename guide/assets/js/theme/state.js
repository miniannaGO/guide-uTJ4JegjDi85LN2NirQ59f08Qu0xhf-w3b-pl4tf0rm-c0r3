(() => {
  const storageKey = "guide:theme";
  const defaultTheme = "dark";
  const themeLabels = {
    dark: "Dark mode",
    light: "Light mode",
  };
  const validThemes = new Set(Object.keys(themeLabels));
  let lastAppliedTheme = null;

  function normalizeTheme(theme) {
    return validThemes.has(theme) ? theme : defaultTheme;
  }

  function readStoredTheme() {
    try {
      return normalizeTheme(window.localStorage.getItem(storageKey));
    } catch {
      return defaultTheme;
    }
  }

  function writeStoredTheme(theme) {
    try {
      window.localStorage.setItem(storageKey, normalizeTheme(theme));
    } catch {
      // El tema visual es una mejora: la guía debe seguir funcionando sin storage.
    }
  }

  function currentTheme() {
    return normalizeTheme(
      document.documentElement.getAttribute("data-bs-theme") ||
        readStoredTheme(),
    );
  }

  function applyTheme(theme, options = {}) {
    const nextTheme = normalizeTheme(theme);
    const previousTheme = lastAppliedTheme;

    document.documentElement.setAttribute("data-bs-theme", nextTheme);
    document.documentElement.style.colorScheme = nextTheme;

    if (options.persist) writeStoredTheme(nextTheme);

    window.GuideTheme?.update?.(nextTheme);
    lastAppliedTheme = nextTheme;

    if (!options.silent && previousTheme !== nextTheme) {
      document.dispatchEvent(
        new CustomEvent("guide:themechange", {
          detail: { theme: nextTheme },
        }),
      );
    }

    return nextTheme;
  }

  window.GuideThemeState = {
    applyTheme,
    currentTheme,
    normalizeTheme,
    readStoredTheme,
    themeLabels,
  };

  applyTheme(readStoredTheme(), { silent: true });
})();
