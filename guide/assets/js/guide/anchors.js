(() => {
  window.GuideDocs = window.GuideDocs || {};
  let guideAnchorHighlightRunId = 0;
  let pendingGuideAnchorHighlightTimeout = 0;
  let activeGuideAnchorHighlightSurface = null;
  let activeGuideAnchorHighlightTimeout = 0;
  let activeGuideScrollAnimationFrame = 0;
  let lockedGuideNavActiveHref = "";

  function bootGuideNavDragScroll() {
    document.querySelectorAll(".guide-sidebar .guide-nav").forEach((nav) => {
      if (nav.dataset.guideDragReady === "true") return;

      nav.dataset.guideDragReady = "true";

      let startX = 0;
      let startY = 0;
      let startScrollLeft = 0;
      let dragged = false;
      let activePointerId = null;

      nav.addEventListener("pointerdown", (event) => {
        if (!isGuideMobileNavDragReady(nav, event)) return;

        activePointerId = event.pointerId;
        startX = event.clientX;
        startY = event.clientY;
        startScrollLeft = nav.scrollLeft;
        dragged = false;
      });

      nav.addEventListener("pointermove", (event) => {
        if (activePointerId !== event.pointerId) return;

        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;
        const isHorizontalDrag =
          Math.abs(deltaX) > 14 && Math.abs(deltaX) > Math.abs(deltaY) + 6;

        if (isHorizontalDrag && !dragged) {
          dragged = true;
          nav.classList.add("is-dragging");
          nav.setPointerCapture?.(event.pointerId);
        }

        if (dragged) {
          nav.scrollLeft = startScrollLeft - deltaX;
          event.preventDefault();
        }
      });

      ["pointerup", "pointercancel", "lostpointercapture"].forEach(
        (eventName) => {
          nav.addEventListener(eventName, (event) => {
            if (activePointerId !== null && event.pointerId !== activePointerId)
              return;

            if (dragged) {
              nav.dataset.guideSuppressClick = "true";
              window.setTimeout(() => {
                delete nav.dataset.guideSuppressClick;
              }, 180);
            }

            activePointerId = null;
            dragged = false;
            nav.classList.remove("is-dragging");
          });
        },
      );

      nav.addEventListener(
        "click",
        (event) => {
          if (nav.dataset.guideSuppressClick !== "true") return;

          event.preventDefault();
          event.stopPropagation();
        },
        true,
      );
    });
  }

  function isGuideMobileNavDragReady(nav, event) {
    if (!window.matchMedia("(max-width: 991.98px)").matches) return false;
    if (event.pointerType === "mouse" && event.button !== 0) return false;
    if (event.target?.closest?.(".guide-nav-mobile-menu")) return false;

    return nav.scrollWidth > nav.clientWidth + 1;
  }

  function syncGuideNavOverflow() {
    const nav = document.querySelector("#guide-nav");
    if (!nav) return;
    const sidebar = nav.closest(".guide-sidebar");

    const sync = () => {
      const isOverflowing = nav.scrollWidth > nav.clientWidth + 1;
      nav.classList.toggle("is-overflowing", isOverflowing);
      sidebar?.classList.toggle("is-overflowing", isOverflowing);
    };

    sync();
    window.addEventListener("resize", sync, { passive: true });

    if (window.ResizeObserver) {
      new ResizeObserver(sync).observe(nav);
    }
  }

  function bootGuideNavMobileDropdowns() {
    const nav = document.querySelector("#guide-nav");
    if (!nav || nav.dataset.guideMobileDropdownsReady === "true") return;

    nav.dataset.guideMobileDropdownsReady = "true";

    const links = guideNavDirectItems(nav);
    let dropdownIndex = 0;

    for (let index = 0; index < links.length; index++) {
      const parent = links[index];
      if (parent.classList.contains("guide-nav-link--subsection")) continue;

      const children = [];
      let nextIndex = index + 1;

      while (
        nextIndex < links.length &&
        links[nextIndex].classList.contains("guide-nav-link--subsection")
      ) {
        children.push(links[nextIndex]);
        nextIndex++;
      }

      if (!children.length) continue;

      dropdownIndex++;
      parent.classList.add("guide-nav-link--has-mobile-dropdown");
      children.forEach((child) =>
        child.classList.add("guide-nav-link--mobile-child"),
      );
      nav.insertBefore(
        renderGuideNavMobileDropdown(parent, children, dropdownIndex),
        parent,
      );
      index = nextIndex - 1;
    }

    if (dropdownIndex > 0) {
      window.addEventListener("resize", positionOpenGuideNavMobileDropdowns, {
        passive: true,
      });
      window.addEventListener("scroll", positionOpenGuideNavMobileDropdowns, {
        passive: true,
      });
      nav.addEventListener("scroll", positionOpenGuideNavMobileDropdowns, {
        passive: true,
      });
    }
  }

  function renderGuideNavMobileDropdown(parent, children, index) {
    const dropdown = document.createElement("div");
    const toggle = document.createElement("button");
    const label = document.createElement("span");
    const menu = document.createElement("ul");
    const toggleId = `guide-nav-mobile-toggle-${index}`;

    dropdown.className = "guide-nav-mobile-dropdown dropdown";
    dropdown.dataset.guideNavMobileDropdown = "true";

    toggle.className = "nav-link guide-nav-mobile-toggle dropdown-toggle";
    toggle.type = "button";
    toggle.id = toggleId;
    toggle.setAttribute("data-bs-toggle", "dropdown");
    toggle.setAttribute("data-bs-auto-close", "true");
    toggle.setAttribute("data-bs-boundary", "viewport");
    toggle.setAttribute("data-bs-display", "static");
    toggle.setAttribute("data-bs-offset", "0,8");
    toggle.setAttribute("aria-expanded", "false");

    label.className = "guide-nav-mobile-toggle__label";
    label.textContent = parent.textContent.trim();
    toggle.append(label);

    menu.className = "dropdown-menu guide-nav-mobile-menu";
    menu.setAttribute("aria-labelledby", toggleId);
    children.forEach((child) => menu.append(renderGuideNavMobileItem(child)));

    dropdown.append(toggle, menu);
    dropdown.addEventListener("shown.bs.dropdown", () => {
      positionGuideNavMobileDropdown(dropdown);
    });
    dropdown.addEventListener("hidden.bs.dropdown", () => {
      resetGuideNavMobileDropdown(dropdown);
    });

    return dropdown;
  }

  function renderGuideNavMobileItem(sourceLink, isParent = false) {
    const item = document.createElement("li");
    const isDocumentButton = sourceLink.matches?.(
      "button.nav-link[data-doc-source]",
    );
    const link = document.createElement(isDocumentButton ? "button" : "a");

    link.className = isParent
      ? "dropdown-item guide-nav-mobile-item guide-nav-mobile-item--parent"
      : "dropdown-item guide-nav-mobile-item";
    if (isDocumentButton) {
      link.type = "button";
      link.dataset.docSource = sourceLink.dataset.docSource;
    } else {
      link.href = sourceLink.getAttribute("href") ?? "#";
    }
    link.textContent = sourceLink.textContent.trim();
    link.dataset.guideNavMobileItem = "true";
    link.classList.toggle("active", sourceLink.classList.contains("active"));
    item.append(link);

    return item;
  }

  function bootGuideNavTree() {
    const nav = document.querySelector("#guide-nav");
    if (!nav || nav.dataset.guideTreeReady === "true") return;

    const groups = guideNavTreeGroups(nav);
    if (!groups.length) return;

    nav.dataset.guideTreeReady = "true";
    nav.classList.add("guide-nav--tree");
    bootGuideNavTreeControls(nav);

    groups.forEach(({ parent, children }, index) => {
      const groupId = `guide-nav-tree-${index + 1}`;

      parent.classList.add("guide-nav-link--has-children");
      parent.dataset.guideNavTreeGroup = groupId;
      parent.setAttribute("aria-expanded", "false");
      parent.addEventListener(
        "click",
        (event) => {
          if (!isGuideNavTreeDesktop()) return;

          event.preventDefault();
          event.stopImmediatePropagation();
          toggleGuideNavTreeGroup(nav, parent);
        },
        { capture: true },
      );

      children.forEach((child) => {
        child.dataset.guideNavTreeChild = groupId;
        child.hidden = true;
      });
    });

    syncGuideNavTreeActive(nav, window.location.hash);
  }

  function guideNavTreeGroups(nav) {
    const links = guideNavDirectItems(nav);
    const groups = [];

    for (let index = 0; index < links.length; index++) {
      const parent = links[index];
      if (parent.classList.contains("guide-nav-link--subsection")) continue;

      const children = [];
      let nextIndex = index + 1;

      while (
        nextIndex < links.length &&
        links[nextIndex].classList.contains("guide-nav-link--subsection")
      ) {
        children.push(links[nextIndex]);
        nextIndex++;
      }

      if (children.length) groups.push({ parent, children });
      index = nextIndex - 1;
    }

    return groups;
  }

  function toggleGuideNavTreeGroup(nav, parent) {
    const isExpanded = parent.getAttribute("aria-expanded") === "true";
    setGuideNavTreeGroupExpanded(nav, parent, !isExpanded);
  }

  function setGuideNavTreeGroupExpanded(nav, parent, isExpanded) {
    if (!nav?.classList.contains("guide-nav--tree")) return;
    if (!isGuideNavTreeDesktop()) return;

    const groupId = parent?.dataset.guideNavTreeGroup ?? "";
    if (!groupId) return;

    parent.classList.toggle("is-expanded", isExpanded);
    parent.setAttribute("aria-expanded", isExpanded ? "true" : "false");

    nav
      .querySelectorAll(
        ".guide-nav-link--subsection[data-guide-nav-tree-child]",
      )
      .forEach((child) => {
        if (child.dataset.guideNavTreeChild !== groupId) return;

        child.hidden = !isExpanded;
        child.classList.toggle("is-tree-visible", isExpanded);
      });
    syncGuideNavTreeControlState(nav);
  }

  function collapseGuideNavTreeGroups(nav) {
    if (!nav?.classList.contains("guide-nav--tree")) return;
    if (!isGuideNavTreeDesktop()) return;

    nav.querySelectorAll(".guide-nav-link--has-children").forEach((parent) => {
      parent.classList.remove("is-expanded");
      parent.setAttribute("aria-expanded", "false");
    });

    nav
      .querySelectorAll(
        ".guide-nav-link--subsection[data-guide-nav-tree-child]",
      )
      .forEach((child) => {
        child.hidden = true;
        child.classList.remove("is-tree-visible");
      });
    syncGuideNavTreeControlState(nav);
  }

  function bootGuideNavTreeControls(nav) {
    if (nav.dataset.guideTreeControlsReady === "true") return;

    const body = nav.closest(".card-body");
    if (!body) return;

    nav.dataset.guideTreeControlsReady = "true";
    body.classList.add("guide-sidebar__body--tree-tools");

    const button = document.createElement("button");
    const icon = document.createElement("i");

    button.type = "button";
    button.className = "guide-sidebar__tree-collapse";
    button.title = "Colapsar menús padres";
    button.setAttribute("aria-label", "Colapsar menús padres");

    icon.className = "bi bi-chevron-bar-contract";
    icon.setAttribute("aria-hidden", "true");
    button.append(icon);

    button.addEventListener("click", () => collapseGuideNavTreeGroups(nav));
    body.insertBefore(button, nav);
    syncGuideNavTreeControlState(nav);
  }

  function syncGuideNavTreeControlState(nav) {
    const button = nav
      ?.closest(".card-body")
      ?.querySelector(".guide-sidebar__tree-collapse");
    if (!button) return;

    button.disabled = ![
      ...nav.querySelectorAll(".guide-nav-link--has-children"),
    ].some((parent) => parent.getAttribute("aria-expanded") === "true");
  }

  function syncGuideNavTreeActive(nav, href) {
    if (!href || !nav?.classList.contains("guide-nav--tree")) return;
    if (!isGuideNavTreeDesktop()) return;

    const activeLink = guideNavDirectLinkForHref(nav, href);
    if (!activeLink) return;

    const parent = activeLink.classList.contains("guide-nav-link--subsection")
      ? guideNavTreeParentForChild(nav, activeLink)
      : activeLink.classList.contains("guide-nav-link--has-children")
        ? activeLink
        : null;
    if (!parent) return;

    setGuideNavTreeGroupExpanded(nav, parent, true);
  }

  function isGuideNavTreeDesktop() {
    return window.matchMedia("(min-width: 992px)").matches;
  }

  function guideNavTreeParentForChild(nav, child) {
    const groupId = child?.dataset.guideNavTreeChild;
    if (!groupId) return null;

    return (
      [...nav.querySelectorAll(".guide-nav-link--has-children")].find(
        (parent) => parent.dataset.guideNavTreeGroup === groupId,
      ) ?? null
    );
  }

  function guideNavDirectLinkForHref(nav, href) {
    if (!href) return null;

    return (
      guideNavDirectLinks(nav).find(
        (link) => link.getAttribute("href") === href,
      ) ?? null
    );
  }

  function guideNavDirectLinks(nav) {
    return [...nav.children].filter((item) =>
      item.matches?.("a.nav-link[href^='#']"),
    );
  }

  function guideNavDirectItems(nav) {
    return [...nav.children].filter((item) =>
      item.matches?.(
        "a.nav-link[href^='#'], button.nav-link:not(.guide-nav-mobile-toggle)",
      ),
    );
  }

  function bootGuideResponsiveScrollCues() {
    if (
      document.documentElement.dataset.guideResponsiveScrollCuesReady === "true"
    )
      return;

    document.documentElement.dataset.guideResponsiveScrollCuesReady = "true";

    document.addEventListener(
      "click",
      (event) => {
        const link = event.target?.closest?.(
          "a[data-guide-scroll-target-stacked]",
        );
        if (!link) return;
        if (!window.matchMedia("(max-width: 1199.98px)").matches) return;

        const target = guideElementFromSelector(
          link.getAttribute("data-guide-scroll-target-stacked"),
        );
        if (!target) return;

        event.preventDefault();
        event.stopImmediatePropagation();
        scrollToGuideStackedTarget(target);
      },
      { capture: true },
    );
  }

  function guideElementFromSelector(selector) {
    if (!selector) return null;

    try {
      return document.querySelector(selector);
    } catch {
      return null;
    }
  }

  function scrollToGuideStackedTarget(target) {
    const navbar = document.querySelector(".navbar.sticky-top");
    const navbarHeight = navbar?.getBoundingClientRect().height ?? 0;
    const gap = window.matchMedia("(max-width: 575.98px)").matches ? 14 : 18;
    const top = Math.max(
      0,
      target.getBoundingClientRect().top + window.scrollY - navbarHeight - gap,
    );

    scrollGuideWindowTo(top);
  }

  function bootGuideAnchorHighlights() {
    const highlightedPendingAnchor = consumePendingGuideAnchorHighlight();
    if (!highlightedPendingAnchor && window.location.hash) {
      scheduleGuideAnchorHighlight(window.location.hash, 160);
    }

    document.addEventListener(
      "click",
      (event) => {
        const link = event.target?.closest?.("a[href]");
        if (!link) return;
        if (isGuideNavTreeParentLink(link)) return;

        const url = localGuideAnchorUrl(link);
        if (!url) return;

        if (isSameDocumentAnchor(url)) {
          scheduleGuideAnchorHighlight(url.hash);
          return;
        }

        rememberGuideAnchorHighlight(url);
      },
      { capture: true },
    );

    window.addEventListener("hashchange", () => {
      if (consumePendingGuideAnchorHighlight()) return;

      if (window.location.hash)
        scheduleGuideAnchorHighlight(window.location.hash);
    });
  }

  function localGuideAnchorUrl(link) {
    const href = link.getAttribute("href");
    if (!href || href === "#") return null;

    let url;
    try {
      url = new URL(href, window.location.href);
    } catch {
      return null;
    }

    if (url.origin !== window.location.origin || !url.hash) return null;
    if (
      !url.pathname.endsWith(".html") &&
      url.pathname !== window.location.pathname
    ) {
      return null;
    }

    return url;
  }

  function isSameDocumentAnchor(url) {
    return (
      url.pathname === window.location.pathname &&
      url.search === window.location.search
    );
  }

  function rememberGuideAnchorHighlight(url) {
    try {
      window.sessionStorage.setItem(
        "guide:pending-anchor-highlight",
        JSON.stringify({
          pathname: url.pathname,
          search: url.search,
          hash: url.hash,
          createdAt: Date.now(),
        }),
      );
    } catch {
      // El énfasis es una mejora visual; la navegación debe funcionar sin storage.
    }
  }

  function consumePendingGuideAnchorHighlight() {
    let pending = null;

    try {
      const raw = window.sessionStorage.getItem(
        "guide:pending-anchor-highlight",
      );
      pending = raw ? JSON.parse(raw) : null;
    } catch {
      pending = null;
    }

    if (!pending) return false;

    const isStale = Date.now() - Number(pending.createdAt ?? 0) > 30000;
    const matches =
      pending.pathname === window.location.pathname &&
      pending.search === window.location.search &&
      pending.hash === window.location.hash;

    if (isStale || matches) {
      try {
        window.sessionStorage.removeItem("guide:pending-anchor-highlight");
      } catch {
        // No requiere acción: el storage no es parte del contrato de navegación.
      }
    }

    if (!matches) return false;

    scheduleGuideAnchorHighlight(pending.hash, 160);
    return true;
  }

  function scheduleGuideAnchorHighlight(hash, delay = 220) {
    const runId = ++guideAnchorHighlightRunId;
    clearGuideAnchorHighlightState();

    pendingGuideAnchorHighlightTimeout = window.setTimeout(
      () => {
        pendingGuideAnchorHighlightTimeout = 0;
        if (runId !== guideAnchorHighlightRunId) return;

        highlightGuideAnchorTarget(hash, runId);
      },
      guidePrefersReducedMotion() ? 40 : delay,
    );
  }

  function highlightGuideAnchorTarget(hash, runId = guideAnchorHighlightRunId) {
    const id = guideAnchorIdFromHash(hash);
    const target = id ? document.getElementById(id) : null;
    if (!target) return;

    const surface = guideAnchorHighlightSurface(target);
    surface.classList.remove("guide-anchor-highlight");
    activeGuideAnchorHighlightSurface = surface;

    window.requestAnimationFrame(() => {
      if (runId !== guideAnchorHighlightRunId) return;

      void surface.offsetWidth;
      surface.classList.add("guide-anchor-highlight");

      activeGuideAnchorHighlightTimeout = window.setTimeout(
        () => {
          if (runId !== guideAnchorHighlightRunId) return;

          surface.classList.remove("guide-anchor-highlight");
          if (activeGuideAnchorHighlightSurface === surface) {
            activeGuideAnchorHighlightSurface = null;
          }
          activeGuideAnchorHighlightTimeout = 0;
        },
        guidePrefersReducedMotion() ? 1600 : 3200,
      );
    });
  }

  function clearGuideAnchorHighlightState() {
    if (pendingGuideAnchorHighlightTimeout) {
      window.clearTimeout(pendingGuideAnchorHighlightTimeout);
      pendingGuideAnchorHighlightTimeout = 0;
    }

    if (activeGuideAnchorHighlightTimeout) {
      window.clearTimeout(activeGuideAnchorHighlightTimeout);
      activeGuideAnchorHighlightTimeout = 0;
    }

    if (activeGuideAnchorHighlightSurface) {
      activeGuideAnchorHighlightSurface.classList.remove(
        "guide-anchor-highlight",
      );
      activeGuideAnchorHighlightSurface = null;
    }
  }

  function guideAnchorIdFromHash(hash) {
    if (!hash || !hash.startsWith("#")) return "";

    try {
      return decodeURIComponent(hash.slice(1));
    } catch {
      return hash.slice(1);
    }
  }

  function guideAnchorHighlightSurface(target) {
    if (target.classList.contains("guide-subsection-anchor")) {
      return target;
    }

    if (
      target.classList.contains("guide-section") ||
      target.classList.contains("card") ||
      target.classList.contains("guide-callout") ||
      target.classList.contains("code-card")
    ) {
      return target;
    }

    return (
      target.closest(
        ".card, .guide-callout, .process-stage, .file-flow__item, .guided-step, .ownership-pane, .code-card",
      ) ?? target
    );
  }

  function bootGuideNavAnchors() {
    const nav = document.querySelector("#guide-nav");
    if (!nav) return;

    nav.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener(
        "click",
        (event) => {
          const hash = link.getAttribute("href");
          const targetId = hash ? decodeURIComponent(hash.slice(1)) : "";
          const target = targetId ? document.getElementById(targetId) : null;

          if (!hash || !target) return;
          if (isGuideNavTreeParentLink(link)) {
            event.preventDefault();
            event.stopImmediatePropagation();
            return;
          }

          event.preventDefault();
          event.stopImmediatePropagation();
          setGuideNavActive(guidePrimaryNavLink(nav, link), {
            syncTree: isGuideNavTreeDesktop(),
          });
          closeGuideNavMobileDropdown(link);
          scrollToGuideTarget(target, hash);
          history.pushState(null, "", hash);
        },
        { capture: true },
      );
    });
  }

  function isGuideNavTreeParentLink(link) {
    return (
      link?.closest?.("#guide-nav") &&
      link.classList.contains("guide-nav-link--has-children") &&
      !link.classList.contains("guide-nav-mobile-item")
    );
  }

  function bootGuideNavActiveState() {
    const nav = document.querySelector("#guide-nav");
    if (!nav) return;

    const entries = guideNavEntries(nav);
    if (!entries.length) return;

    document.body.removeAttribute("data-bs-spy");
    document.body.removeAttribute("data-bs-target");
    document.body.removeAttribute("data-bs-smooth-scroll");

    const disposeBootstrapScrollSpy = () => {
      window.bootstrap?.ScrollSpy?.getInstance(document.body)?.dispose();
    };

    let ticking = false;
    const sync = () => {
      ticking = false;
      const lockedLink = lockedGuideNavActiveHref
        ? guideNavDirectLinkForHref(nav, lockedGuideNavActiveHref)
        : null;

      setGuideNavActive(
        lockedLink ?? resolveGuideNavActiveEntry(entries)?.link,
        {
          syncTree: false,
        },
      );
    };
    const schedule = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(sync);
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", disposeBootstrapScrollSpy, {
        once: true,
      });
    } else {
      disposeBootstrapScrollSpy();
    }

    sync();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
  }

  function guideNavEntries(nav) {
    return [...nav.children]
      .filter((item) => item.matches?.("a.nav-link[href^='#']"))
      .map((link) => {
        const hash = link.getAttribute("href");
        const targetId = hash ? decodeURIComponent(hash.slice(1)) : "";
        const section = targetId ? document.getElementById(targetId) : null;

        return section ? { link, section } : null;
      })
      .filter(Boolean);
  }

  function resolveGuideNavActiveEntry(entries) {
    const topEdge = guideAnchorOffset() + 4;
    const bottomEdge = window.innerHeight;
    const visibleEntries = entries.filter(({ section }) => {
      const rect = section.getBoundingClientRect();

      return rect.bottom > topEdge && rect.top < bottomEdge;
    });
    const visibleAtTop = [...visibleEntries].reverse().find(({ section }) => {
      const rect = section.getBoundingClientRect();

      return rect.top <= topEdge && rect.bottom > topEdge;
    });

    if (visibleAtTop) {
      return resolveGuideNavTreeContinuityEntry(entries, visibleAtTop, topEdge);
    }
    if (visibleEntries.length) return visibleEntries[0];

    return (
      [...entries]
        .reverse()
        .find(
          ({ section }) => section.getBoundingClientRect().top <= topEdge,
        ) ?? entries[0]
    );
  }

  function resolveGuideNavTreeContinuityEntry(entries, activeEntry, topEdge) {
    const parent = activeEntry.link.classList.contains(
      "guide-nav-link--has-children",
    )
      ? activeEntry.link
      : null;
    const groupId = parent?.dataset.guideNavTreeGroup ?? "";
    if (!groupId) return activeEntry;

    return (
      [...entries]
        .reverse()
        .find(
          ({ link, section }) =>
            link.dataset.guideNavTreeChild === groupId &&
            section.getBoundingClientRect().top <= topEdge,
        ) ?? activeEntry
    );
  }

  function setGuideNavActive(activeLink, options = {}) {
    if (!activeLink) return;

    const nav = activeLink.closest("#guide-nav");
    if (!nav) return;

    const href = activeLink.getAttribute("href");
    if (!href) return;

    nav
      .querySelectorAll(".nav-link.active, .dropdown-item.active")
      .forEach((link) => {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      });
    nav
      .querySelectorAll(".guide-nav-link--has-children.is-child-active")
      .forEach((link) => link.classList.remove("is-child-active"));
    nav
      .querySelectorAll(".guide-nav-mobile-dropdown.is-active")
      .forEach((dropdown) => dropdown.classList.remove("is-active"));

    guideNavLinksForHref(nav, href).forEach((link) => {
      link.classList.add("active");
      link.setAttribute("aria-current", "location");
    });
    syncGuideNavMobileDropdownActive(nav, href);
    if (options.syncTree !== false) {
      syncGuideNavTreeActive(nav, href);
    }
    syncGuideNavTreeParentActive(nav, activeLink);
    scrollActiveMenuItemIntoView(
      guideNavMobileScrollTarget(nav, activeLink, href),
    );
  }

  function syncGuideNavTreeParentActive(nav, activeLink) {
    const link = guidePrimaryNavLink(nav, activeLink);
    if (!link.classList.contains("guide-nav-link--subsection")) return;

    const parent = guideNavTreeParentForChild(nav, link);
    parent?.classList.add("is-child-active");
  }

  function guidePrimaryNavLink(nav, link) {
    if (!link.classList.contains("guide-nav-mobile-item")) return link;

    const href = link.getAttribute("href");
    if (!href) return link;

    return (
      [...nav.children].find(
        (item) =>
          item.matches?.("a.nav-link[href^='#']") &&
          item.getAttribute("href") === href,
      ) ?? link
    );
  }

  function guideNavLinksForHref(nav, href) {
    return [...nav.querySelectorAll("a[href]")].filter(
      (link) => link.getAttribute("href") === href,
    );
  }

  function syncGuideNavMobileDropdownActive(nav, href) {
    nav.querySelectorAll(".guide-nav-mobile-dropdown").forEach((dropdown) => {
      const hasActiveItem = [...dropdown.querySelectorAll("a[href]")].some(
        (link) => link.getAttribute("href") === href,
      );
      const toggle = dropdown.querySelector(".guide-nav-mobile-toggle");

      dropdown.classList.toggle("is-active", hasActiveItem);
      toggle?.classList.toggle("active", hasActiveItem);
    });
  }

  function guideNavMobileScrollTarget(nav, activeLink, href) {
    if (!window.matchMedia("(max-width: 991.98px)").matches) return activeLink;

    const activeDropdown = [
      ...nav.querySelectorAll(".guide-nav-mobile-dropdown"),
    ].find((dropdown) =>
      [...dropdown.querySelectorAll("a[href]")].some(
        (link) => link.getAttribute("href") === href,
      ),
    );

    return (
      activeDropdown?.querySelector(".guide-nav-mobile-toggle") ?? activeLink
    );
  }

  function closeGuideNavMobileDropdown(link) {
    const dropdown = link.closest(".guide-nav-mobile-dropdown");
    const toggle = dropdown?.querySelector(".guide-nav-mobile-toggle");
    if (!toggle) return;

    window.bootstrap?.Dropdown?.getOrCreateInstance(toggle)?.hide();
  }

  function positionOpenGuideNavMobileDropdowns() {
    document
      .querySelectorAll(".guide-nav-mobile-dropdown .dropdown-menu.show")
      .forEach((menu) =>
        positionGuideNavMobileDropdown(
          menu.closest(".guide-nav-mobile-dropdown"),
        ),
      );
  }

  function positionGuideNavMobileDropdown(dropdown) {
    if (!dropdown || !window.matchMedia("(max-width: 991.98px)").matches)
      return;

    const toggle = dropdown.querySelector(".guide-nav-mobile-toggle");
    const menu = dropdown.querySelector(".guide-nav-mobile-menu");
    if (!toggle || !menu) return;

    const viewportPadding = 12;
    const toggleRect = toggle.getBoundingClientRect();
    const menuWidth = Math.min(
      Math.max(menu.offsetWidth, 220),
      window.innerWidth - viewportPadding * 2,
    );
    const left = Math.min(
      Math.max(toggleRect.left, viewportPadding),
      window.innerWidth - menuWidth - viewportPadding,
    );

    menu.style.position = "fixed";
    menu.style.inset = "auto";
    menu.style.left = `${left}px`;
    menu.style.top = `${toggleRect.bottom + 8}px`;
    menu.style.width = `${menuWidth}px`;
    menu.style.transform = "none";
  }

  function resetGuideNavMobileDropdown(dropdown) {
    const menu = dropdown?.querySelector(".guide-nav-mobile-menu");
    if (!menu) return;

    menu.style.position = "";
    menu.style.inset = "";
    menu.style.left = "";
    menu.style.top = "";
    menu.style.width = "";
    menu.style.transform = "";
  }

  function scrollActiveMenuItemIntoView(item) {
    if (!window.matchMedia("(max-width: 991.98px)").matches) return;

    const scroller = item.closest(".guide-nav");
    if (!scroller || scroller.scrollWidth <= scroller.clientWidth + 1) return;

    const itemRect = item.getBoundingClientRect();
    const scrollerRect = scroller.getBoundingClientRect();
    const targetLeft =
      scroller.scrollLeft +
      itemRect.left -
      scrollerRect.left -
      (scroller.clientWidth - itemRect.width) / 2;
    const behavior = guidePrefersReducedMotion() ? "auto" : "smooth";

    scroller.scrollTo({
      left: Math.max(0, targetLeft),
      behavior,
    });
  }

  function scrollToGuideTarget(target, lockedHref = "") {
    const top = Math.max(
      0,
      target.getBoundingClientRect().top + window.scrollY - guideAnchorOffset(),
    );

    scrollGuideWindowTo(top, lockedHref);
  }

  function scrollGuideWindowTo(top, lockedHref = "") {
    if (activeGuideScrollAnimationFrame) {
      window.cancelAnimationFrame(activeGuideScrollAnimationFrame);
      activeGuideScrollAnimationFrame = 0;
    }
    lockedGuideNavActiveHref = lockedHref;

    if (guidePrefersReducedMotion()) {
      window.scrollTo({ top, behavior: "auto" });
      releaseGuideNavScrollLock(lockedHref);
      return;
    }

    const start = window.scrollY;
    const distance = top - start;

    if (Math.abs(distance) < 2) {
      window.scrollTo({ top, behavior: "auto" });
      releaseGuideNavScrollLock(lockedHref);
      return;
    }

    const duration = Math.min(210, Math.max(80, Math.abs(distance) / 20));
    const startedAt = performance.now();

    const step = (now) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);

      window.scrollTo(0, start + distance * eased);

      if (progress < 1) {
        activeGuideScrollAnimationFrame = window.requestAnimationFrame(step);
        return;
      }

      activeGuideScrollAnimationFrame = 0;
      window.scrollTo({ top, behavior: "auto" });
      releaseGuideNavScrollLock(lockedHref);
    };

    activeGuideScrollAnimationFrame = window.requestAnimationFrame(step);
  }

  function releaseGuideNavScrollLock(lockedHref) {
    if (!lockedHref || lockedGuideNavActiveHref !== lockedHref) return;

    const nav = document.querySelector("#guide-nav");
    const finalLink = nav ? guideNavDirectLinkForHref(nav, lockedHref) : null;

    lockedGuideNavActiveHref = "";
    if (!finalLink) return;

    setGuideNavActive(finalLink, { syncTree: false });
  }

  function guideAnchorOffset() {
    if (!window.matchMedia("(max-width: 991.98px)").matches) {
      const padding = window.getComputedStyle(
        document.documentElement,
      ).scrollPaddingTop;

      return Number.parseFloat(padding) || 88;
    }

    const aside = document.querySelector(".guide-shell .row > aside");
    const card = document.querySelector(".guide-sidebar .card");
    const stickyTop = aside
      ? Number.parseFloat(window.getComputedStyle(aside).top) || 0
      : 0;
    const cardHeight = card?.getBoundingClientRect().height ?? 0;

    return stickyTop + cardHeight + 16;
  }

  function guidePrefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  window.GuideDocs.anchors = {
    bootGuideNavDragScroll,
    syncGuideNavOverflow,
    bootGuideNavMobileDropdowns,
    bootGuideNavTree,
    bootGuideResponsiveScrollCues,
    bootGuideAnchorHighlights,
    bootGuideNavAnchors,
    bootGuideNavActiveState,
    scrollActiveMenuItemIntoView,
    scrollToGuideTarget,
    guideAnchorIdFromHash,
    guidePrefersReducedMotion,
  };
})();
