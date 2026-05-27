(() => {
  const root = document.querySelector("[data-presentation]");

  if (!root) {
    return;
  }

  const slides = [...root.querySelectorAll("[data-slide]")];
  const previousButton = root.querySelector("[data-prev]");
  const nextButton = root.querySelector("[data-next]");
  const progress = root.querySelector("[data-progress]");
  const counter = root.querySelector("[data-slide-counter]");
  const kicker = root.querySelector("[data-slide-kicker]");
  const themeToggle = root.querySelector("[data-theme-toggle]");
  const themeToggleLabel = root.querySelector("[data-theme-toggle-label]");
  const moduleStages = [...root.querySelectorAll(".module-stage")];
  const GUIDE_THEME_STORAGE_KEY = "guide:theme";

  let current = 0;
  let touchStartX = 0;

  const formatCounter = (index) =>
    `${String(index + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;

  const readAccent = (slide) =>
    slide.style.getPropertyValue("--accent").trim() || "#78dce8";

  const normalizeTheme = (theme) =>
    window.GuideThemeState?.normalizeTheme?.(theme) ||
    (theme === "light" ? "light" : "dark");

  const readSharedTheme = () => {
    const currentTheme =
      window.GuideTheme?.current?.() ||
      window.GuideThemeState?.readStoredTheme?.() ||
      document.documentElement.getAttribute("data-bs-theme");

    if (currentTheme) {
      return normalizeTheme(currentTheme);
    }

    try {
      return normalizeTheme(localStorage.getItem(GUIDE_THEME_STORAGE_KEY));
    } catch {
      return "dark";
    }
  };

  const writeSharedTheme = (theme) => {
    try {
      localStorage.setItem(GUIDE_THEME_STORAGE_KEY, normalizeTheme(theme));
    } catch {
      // The toggle still works when storage is unavailable.
    }
  };

  const syncPresentationTheme = (theme) => {
    const nextTheme = normalizeTheme(theme);
    const isLight = nextTheme === "light";
    const label = isLight ? "Cambiar a modo oscuro" : "Cambiar a modo claro";

    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.setAttribute("data-bs-theme", nextTheme);
    document.documentElement.style.colorScheme = nextTheme;
    themeToggle?.setAttribute("aria-pressed", String(isLight));
    themeToggle?.setAttribute("aria-label", label);
    themeToggle?.setAttribute("title", label);
    themeToggleLabel?.replaceChildren(label);
  };

  const setTheme = (theme, shouldPersist = true) => {
    const nextTheme = normalizeTheme(theme);

    if (window.GuideThemeState?.applyTheme) {
      window.GuideThemeState.applyTheme(nextTheme, {
        persist: shouldPersist,
      });
    } else {
      syncPresentationTheme(nextTheme);

      if (shouldPersist) {
        writeSharedTheme(nextTheme);
      }
    }

    syncPresentationTheme(nextTheme);
  };

  const setModuleOpen = (stage, isOpen) => {
    const button = stage.querySelector("[data-module-toggle]");
    const payloadId = button?.getAttribute("aria-controls");
    const payload = payloadId
      ? document.getElementById(payloadId)
      : stage.querySelector(".module-box__payload");
    const label = isOpen
      ? button?.dataset.closeLabel || "Cerrar caja"
      : button?.dataset.openLabel || "Abrir caja";

    stage.classList.toggle("is-open", isOpen);
    button?.setAttribute("aria-expanded", String(isOpen));
    button?.setAttribute("aria-label", label);
    button?.setAttribute("title", label);
    payload?.setAttribute("aria-hidden", String(!isOpen));

    button?.querySelector(".visually-hidden")?.replaceChildren(label);
  };

  const closeModules = (scope = root) => {
    scope
      .querySelectorAll?.(".module-stage.is-open")
      .forEach((stage) => setModuleOpen(stage, false));
  };

  const restartAnimations = (slide) => {
    slide.classList.remove("is-active");
    void slide.offsetWidth;
    slide.classList.add("is-active");
  };

  const render = (nextIndex, shouldReplay = false) => {
    current = Math.max(0, Math.min(nextIndex, slides.length - 1));

    slides.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === current);
      slide.classList.toggle("is-before", index < current);
      slide.setAttribute("aria-hidden", String(index !== current));

      if (index !== current || shouldReplay) {
        closeModules(slide);
      }
    });

    const activeSlide = slides[current];
    const accent = readAccent(activeSlide);

    root.style.setProperty("--accent", accent);
    document.body.style.setProperty("--accent", accent);

    if (progress) {
      progress.style.width = `${((current + 1) / slides.length) * 100}%`;
    }

    if (counter) {
      counter.textContent = formatCounter(current);
    }

    if (kicker) {
      kicker.textContent = activeSlide.dataset.kicker || "WPC";
    }

    if (previousButton) {
      previousButton.disabled = current === 0;
    }

    if (nextButton) {
      nextButton.disabled = current === slides.length - 1;
    }

    history.replaceState(null, "", `#slide-${current + 1}`);

    if (shouldReplay) {
      restartAnimations(activeSlide);
    }
  };

  const move = (direction) => {
    render(current + direction, true);
  };

  setTheme(readSharedTheme(), false);
  window.lucide?.createIcons();

  previousButton?.addEventListener("click", () => move(-1));
  nextButton?.addEventListener("click", () => move(1));
  themeToggle?.addEventListener("click", () => {
    const currentTheme = readSharedTheme();
    setTheme(currentTheme === "light" ? "dark" : "light");
  });

  document.addEventListener("guide:themechange", (event) => {
    syncPresentationTheme(event.detail?.theme);
  });

  moduleStages.forEach((stage) => setModuleOpen(stage, false));

  root.addEventListener("click", (event) => {
    const button = event.target.closest?.("[data-module-toggle]");

    if (!button) {
      return;
    }

    const stage = button.closest(".module-stage");

    if (!stage) {
      return;
    }

    setModuleOpen(stage, !stage.classList.contains("is-open"));
  });

  document.addEventListener("keydown", (event) => {
    const isInteractiveTarget = event.target.closest?.(
      "button, a, input, textarea, select",
    );

    if (isInteractiveTarget && event.key === " ") {
      return;
    }

    const keyActions = {
      ArrowLeft: () => move(-1),
      ArrowRight: () => move(1),
      Home: () => render(0, true),
      End: () => render(slides.length - 1, true),
      " ": () => move(1),
    };

    const action = keyActions[event.key];

    if (!action) {
      return;
    }

    event.preventDefault();
    action();
  });

  root.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.touches[0]?.clientX || 0;
    },
    { passive: true },
  );

  root.addEventListener(
    "touchend",
    (event) => {
      const touchEndX = event.changedTouches[0]?.clientX || 0;
      const delta = touchEndX - touchStartX;

      if (Math.abs(delta) < 44) {
        return;
      }

      move(delta < 0 ? 1 : -1);
    },
    { passive: true },
  );

  const hashIndex = Number(window.location.hash.replace("#slide-", "")) - 1;

  render(Number.isFinite(hashIndex) ? hashIndex : 0, true);
})();
