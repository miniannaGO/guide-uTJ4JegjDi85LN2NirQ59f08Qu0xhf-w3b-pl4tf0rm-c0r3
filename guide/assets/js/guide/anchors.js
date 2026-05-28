(() => {
  window.GuideDocs = window.GuideDocs || {};
  let guideAnchorHighlightRunId = 0;
  let pendingGuideAnchorHighlightTimeout = 0;
  let activeGuideAnchorHighlightSurface = null;
  let activeGuideAnchorHighlightTimeout = 0;

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

          event.preventDefault();
          event.stopImmediatePropagation();
          setGuideNavActive(link);
          scrollToGuideTarget(target);
          history.pushState(null, "", hash);
        },
        { capture: true },
      );
    });
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
      setGuideNavActive(resolveGuideNavActiveEntry(entries)?.link);
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
    return [...nav.querySelectorAll('a[href^="#"]')]
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

    if (visibleAtTop) return visibleAtTop;
    if (visibleEntries.length) return visibleEntries[0];

    return (
      [...entries]
        .reverse()
        .find(
          ({ section }) => section.getBoundingClientRect().top <= topEdge,
        ) ?? entries[0]
    );
  }

  function setGuideNavActive(activeLink) {
    if (!activeLink) return;

    const nav = activeLink.closest("#guide-nav");
    const previous = nav?.querySelector(".nav-link.active");
    if (previous === activeLink) {
      scrollActiveMenuItemIntoView(activeLink);
      return;
    }

    nav?.querySelectorAll(".nav-link.active").forEach((link) => {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    });

    activeLink.classList.add("active");
    activeLink.setAttribute("aria-current", "location");
    scrollActiveMenuItemIntoView(activeLink);
  }

  function scrollActiveMenuItemIntoView(item) {
    if (!window.matchMedia("(max-width: 991.98px)").matches) return;

    const scroller = item.closest(".guide-nav, .diagram-list__tabs");
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

  function scrollToGuideTarget(target) {
    const top = Math.max(
      0,
      target.getBoundingClientRect().top + window.scrollY - guideAnchorOffset(),
    );
    const behavior = guidePrefersReducedMotion() ? "auto" : "smooth";

    window.scrollTo({ top, behavior });
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
    bootGuideAnchorHighlights,
    bootGuideNavAnchors,
    bootGuideNavActiveState,
    scrollActiveMenuItemIntoView,
    scrollToGuideTarget,
    guideAnchorIdFromHash,
    guidePrefersReducedMotion,
  };
})();
