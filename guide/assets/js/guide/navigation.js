(() => {
  window.GuideDocs = window.GuideDocs || {};
  const { guideNavigationItems, guideNavigationAccentClasses } =
    window.GuideDocs.config;

  function renderGlobalNavigation() {
    const nav = document.querySelector("#guide-navbar .navbar-nav");
    if (!nav) return;

    const current = currentPage();
    const currentTheme = window.GuideTheme?.current?.() ?? "dark";
    const currentThemeLabel =
      window.GuideTheme?.labels?.[currentTheme] ?? "Dark mode";
    const ecosystemItem = guideNavigationItems.find(
      ([href]) => href === "bondades.html",
    );
    const regularItems = guideNavigationItems.filter(
      ([href]) => href !== "bondades.html",
    );

    nav.innerHTML =
      regularItems
        .map(([href, label]) => renderGuideNavItem(href, label, current))
        .join("") +
      `<li class="nav-item guide-search-nav">
        <button
          class="nav-link guide-search-toggle"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#guide-search-modal"
          data-guide-search-open
          aria-label="Buscar en la guía"
        >
          <span class="guide-search-toggle__icon" aria-hidden="true"></span>
        </button>
      </li>` +
      (ecosystemItem
        ? renderGuideNavItem(ecosystemItem[0], ecosystemItem[1], current)
        : "") +
      `<li class="nav-item dropdown guide-theme-nav" data-guide-theme-selector>
        <button
          class="nav-link guide-theme-toggle"
          type="button"
          data-bs-toggle="dropdown"
          data-guide-theme-toggle
          aria-expanded="false"
        >
          <span class="guide-theme-toggle__icon" aria-hidden="true"></span>
          <span class="visually-hidden" data-guide-theme-current>${currentThemeLabel}</span>
        </button>
        <ul class="dropdown-menu dropdown-menu-end guide-theme-menu">
          <li>
            <button class="dropdown-item" type="button" data-guide-theme-value="dark">Dark mode</button>
          </li>
          <li>
            <button class="dropdown-item" type="button" data-guide-theme-value="light">Light mode</button>
          </li>
        </ul>
      </li>`;

    const mobileTheme = renderMobileHeaderActions(currentThemeLabel);

    window.GuideTheme?.boot?.(nav);
    if (mobileTheme) window.GuideTheme?.boot?.(mobileTheme);
  }

  function renderGuideNavItem(href, label, current) {
    const active = href === current ? " active" : "";
    const aria = href === current ? ' aria-current="page"' : "";
    const isEcosystem = href === "bondades.html";
    const target = isEcosystem ? ' target="_blank" rel="noopener"' : "";
    const accentClass = guideNavigationAccentClasses[href]
      ? ` ${guideNavigationAccentClasses[href]}`
      : "";

    return `<li class="nav-item"><a class="nav-link${accentClass}${active}" href="${href}"${aria}${target}>${label}</a></li>`;
  }

  function renderMobileHeaderActions(currentThemeLabel) {
    const container = document.querySelector(".navbar .container-fluid");
    const toggler = container?.querySelector(".navbar-toggler");
    if (!container || !toggler) return null;

    container.querySelector(".guide-mobile-actions")?.remove();
    container.querySelector(".guide-search-mobile")?.remove();
    container.querySelector(".guide-theme-mobile")?.remove();

    toggler.insertAdjacentHTML(
      "beforebegin",
      `<div class="guide-mobile-actions d-xl-none">
        <button
          class="guide-search-toggle guide-search-mobile"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#guide-search-modal"
          data-guide-search-open
          aria-label="Buscar en la guía"
        >
          <span class="guide-search-toggle__icon" aria-hidden="true"></span>
        </button>
        <div class="dropdown guide-theme-mobile" data-guide-theme-selector>
          <button
            class="guide-theme-toggle guide-theme-mobile__toggle"
            type="button"
            data-bs-toggle="dropdown"
            data-guide-theme-toggle
            aria-expanded="false"
          >
            <span class="guide-theme-toggle__icon" aria-hidden="true"></span>
            <span class="visually-hidden" data-guide-theme-current>${currentThemeLabel}</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end guide-theme-menu" data-guide-theme-menu>
            <li>
              <button class="dropdown-item" type="button" data-guide-theme-value="dark">Dark mode</button>
            </li>
            <li>
              <button class="dropdown-item" type="button" data-guide-theme-value="light">Light mode</button>
            </li>
          </ul>
        </div>
      </div>`,
    );

    return container.querySelector(".guide-theme-mobile");
  }

  function currentPage() {
    const page = window.location.pathname.split("/").pop();

    return page && page.endsWith(".html") ? page : "index.html";
  }

  window.GuideDocs.navigation = {
    renderGlobalNavigation,
    currentPage,
  };
})();
