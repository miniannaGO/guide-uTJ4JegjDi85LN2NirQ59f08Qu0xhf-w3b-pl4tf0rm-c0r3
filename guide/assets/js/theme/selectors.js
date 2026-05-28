(() => {
  const state = window.GuideThemeState;
  let customMenuDismissReady = false;

  function updateThemeSelectors(theme = state.currentTheme(), root = document) {
    const activeTheme = state.normalizeTheme(theme);

    root.querySelectorAll("[data-guide-theme-current]").forEach((label) => {
      label.textContent = state.themeLabels[activeTheme];
    });

    root.querySelectorAll("[data-guide-theme-value]").forEach((button) => {
      const isActive =
        state.normalizeTheme(button.getAttribute("data-guide-theme-value")) ===
        activeTheme;

      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");

      if (button.getAttribute("role") === "option") {
        button.setAttribute("aria-selected", isActive ? "true" : "false");
      }

      if (isActive) {
        button.setAttribute("aria-current", "true");
      } else {
        button.removeAttribute("aria-current");
      }
    });

    root.querySelectorAll("[data-guide-theme-toggle]").forEach((toggle) => {
      toggle.setAttribute(
        "aria-label",
        `Tema visual actual: ${state.themeLabels[activeTheme]}`,
      );
    });
  }

  function bootThemeSelectors(root = document) {
    root.querySelectorAll("[data-guide-theme-selector]").forEach((selector) => {
      if (selector.dataset.guideThemeReady === "true") return;

      selector.dataset.guideThemeReady = "true";

      const toggle = selector.querySelector("[data-guide-theme-toggle]");
      const menu = selector.querySelector("[data-guide-theme-menu]");

      if (toggle && menu && !toggle.hasAttribute("data-bs-toggle")) {
        toggle.addEventListener("click", () => {
          setCustomMenuOpen(selector, !selector.classList.contains("is-open"));
        });
      }

      selector
        .querySelectorAll("[data-guide-theme-value]")
        .forEach((button) => {
          button.addEventListener("click", () => {
            state.applyTheme(button.getAttribute("data-guide-theme-value"), {
              persist: true,
            });
            setCustomMenuOpen(selector, false);
          });
        });
    });

    updateThemeSelectors(state.currentTheme(), root);
    bootCustomMenuDismiss();
  }

  function setCustomMenuOpen(selector, open) {
    const toggle = selector.querySelector("[data-guide-theme-toggle]");

    selector.classList.toggle("is-open", open);
    toggle?.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function bootCustomMenuDismiss() {
    if (customMenuDismissReady) return;
    customMenuDismissReady = true;

    document.addEventListener("click", (event) => {
      document
        .querySelectorAll("[data-guide-theme-selector].is-open")
        .forEach((selector) => {
          if (!selector.contains(event.target))
            setCustomMenuOpen(selector, false);
        });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;

      document
        .querySelectorAll("[data-guide-theme-selector].is-open")
        .forEach((selector) => setCustomMenuOpen(selector, false));
    });
  }

  window.GuideTheme = {
    apply: state.applyTheme,
    boot: bootThemeSelectors,
    current: state.currentTheme,
    labels: state.themeLabels,
    update: updateThemeSelectors,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => bootThemeSelectors());
  } else {
    bootThemeSelectors();
  }
})();
