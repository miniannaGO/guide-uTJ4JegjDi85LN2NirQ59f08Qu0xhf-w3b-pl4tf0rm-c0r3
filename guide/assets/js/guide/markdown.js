(() => {
  window.GuideDocs = window.GuideDocs || {};
  const {
    guideAnchorIdFromHash,
    scrollActiveMenuItemIntoView,
    scrollToGuideTarget,
  } = window.GuideDocs.anchors;
  const { bootShikiCodeBlocks, syncCodeBlockLanguages } =
    window.GuideDocs.content;

  function bootMarkdownViewer() {
    const viewer = document.querySelector("[data-markdown-viewer]");
    if (!viewer || !window.marked) return;

    const title = document.querySelector("[data-markdown-title]");
    const sourceLink = document.querySelector("[data-markdown-source-link]");
    const buttons = document.querySelectorAll("[data-doc-source]");
    const diagramList = document.querySelector("#guide-nav");

    buttons.forEach((button) => {
      button.addEventListener("click", () => loadMarkdown(button));
    });

    const initialFromHash = markdownButtonFromHash();
    const initial =
      initialFromHash ||
      document.querySelector("[data-doc-source].active") ||
      buttons[0];
    if (initial) {
      loadMarkdown(initial, {
        scrollToButton: initial === initialFromHash,
      });
    }

    window.addEventListener("hashchange", () => {
      const button = markdownButtonFromHash();
      if (!button) return;

      loadMarkdown(button, { scrollToButton: true });
    });

    document.addEventListener("guide:themechange", () => {
      const active = document.querySelector("[data-doc-source].active");
      if (active) loadMarkdown(active);
    });

    async function loadMarkdown(button, options = {}) {
      const source = button.getAttribute("data-doc-source");
      const label = button.textContent.trim();
      if (!source) return;

      buttons.forEach((item) => {
        item.classList.toggle(
          "active",
          item.getAttribute("data-doc-source") === source,
        );
      });
      syncDiagramNavigation(diagramList, source);
      if (options.scrollToButton) {
        const primaryButton = diagramButtonForSource(diagramList, source);
        window.setTimeout(
          () => scrollToGuideTarget(primaryButton ?? button),
          0,
        );
      }
      if (title) title.textContent = label;
      if (sourceLink) sourceLink.setAttribute("href", source);
      viewer.innerHTML =
        '<div class="guide-callout">Cargando diagrama...</div>';

      try {
        const response = await fetch(source);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const markdown = await response.text();
        viewer.innerHTML = window.marked.parse(markdown);
        syncCodeBlockLanguages(viewer);
        rewriteMarkdownLinks(viewer, source);
        await renderMermaid(viewer);
        await bootShikiCodeBlocks(viewer);
      } catch {
        viewer.innerHTML = `<div class="guide-callout">No se pudo cargar el Markdown. El archivo fuente se puede abrir desde el enlace superior.</div>`;
      }
    }

    function markdownButtonFromHash() {
      const id = guideAnchorIdFromHash(window.location.hash);
      const target = id ? document.getElementById(id) : null;

      return target?.matches?.("[data-doc-source]") ? target : null;
    }

    function syncDiagramNavigation(nav, source) {
      if (!nav || !source) return;

      const primaryButton = diagramButtonForSource(nav, source);
      const groupId = primaryButton?.dataset.guideNavTreeChild;
      let activeMobileToggle = null;

      nav
        .querySelectorAll(".guide-nav-link--has-children.is-child-active")
        .forEach((parent) => parent.classList.remove("is-child-active"));

      if (groupId) {
        const parent = [...nav.children].find(
          (item) => item.dataset?.guideNavTreeGroup === groupId,
        );

        parent?.classList.add("is-child-active", "is-expanded");
        parent?.setAttribute("aria-expanded", "true");
        [...nav.children]
          .filter((item) => item.dataset?.guideNavTreeChild === groupId)
          .forEach((child) => {
            child.hidden = false;
            child.classList.add("is-tree-visible");
          });
      }

      nav.querySelectorAll(".guide-nav-mobile-dropdown").forEach((dropdown) => {
        const hasActiveItem = [
          ...dropdown.querySelectorAll("[data-doc-source]"),
        ].some((item) => item.dataset.docSource === source);
        const toggle = dropdown.querySelector(".guide-nav-mobile-toggle");

        dropdown.classList.toggle("is-active", hasActiveItem);
        toggle?.classList.toggle("active", hasActiveItem);
        if (hasActiveItem) activeMobileToggle = toggle;
      });

      if (activeMobileToggle || primaryButton) {
        scrollActiveMenuItemIntoView(activeMobileToggle ?? primaryButton);
      }
    }

    function diagramButtonForSource(nav, source) {
      return (
        [...(nav?.children ?? [])].find(
          (item) =>
            item.matches?.("button.nav-link[data-doc-source]") &&
            item.dataset.docSource === source,
        ) ?? null
      );
    }
  }

  function rewriteMarkdownLinks(root, source) {
    const base = new URL(source, window.location.href);

    root.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || /^[a-z]+:/i.test(href)) return;

      link.setAttribute("href", new URL(href, base).href);
    });
  }

  async function renderMermaid(root) {
    if (!window.mermaid) return;

    root.querySelectorAll("pre code.language-mermaid").forEach((code) => {
      const diagram = document.createElement("div");
      diagram.className = "mermaid";
      diagram.textContent = code.textContent;
      code.parentElement.replaceWith(diagram);
    });

    const isLight = window.GuideTheme?.current?.() === "light";
    const themeVariables = isLight
      ? {
          background: "#eef3f8",
          primaryColor: "#ffffff",
          primaryTextColor: "#172033",
          primaryBorderColor: "#08788e",
          lineColor: "#475467",
          clusterBkg: "#dde8f0",
          clusterBorder: "#8aa3b2",
          fontFamily: "Inter, Segoe UI, Arial",
        }
      : {
          background: "#19181a",
          primaryColor: "#2d2a2e",
          primaryTextColor: "#fcfcfa",
          primaryBorderColor: "#78dce8",
          lineColor: "#939293",
          clusterBkg: "#221f22",
          clusterBorder: "#5b595c",
          fontFamily: "Inter, Segoe UI, Arial",
        };

    window.mermaid.initialize({
      startOnLoad: false,
      theme: isLight ? "base" : "dark",
      securityLevel: "strict",
      themeVariables,
    });

    await window.mermaid.run({ nodes: root.querySelectorAll(".mermaid") });
    enhanceMermaidZoom(root);
  }

  function enhanceMermaidZoom(root) {
    root.querySelectorAll(".mermaid").forEach((diagram) => {
      if (diagram.closest(".mermaid-zoom")) return;

      const svg = diagram.querySelector("svg");
      if (!svg) return;

      const viewBox = svg.viewBox?.baseVal;
      const baseWidth =
        viewBox?.width || svg.getBoundingClientRect().width || 900;
      const baseHeight =
        viewBox?.height || svg.getBoundingClientRect().height || 600;

      let scale = 1;
      let initialScale = 1;

      const viewportPadding = 32;
      const minViewportHeight = 220;

      const maxViewportHeight = () => Math.round(window.innerHeight * 0.75);

      const wrapper = document.createElement("div");
      wrapper.className = "mermaid-zoom";

      const toolbar = document.createElement("div");
      toolbar.className = "mermaid-zoom__toolbar";

      const zoomOut = document.createElement("button");
      zoomOut.type = "button";
      zoomOut.textContent = "−";

      const zoomReset = document.createElement("button");
      zoomReset.type = "button";
      zoomReset.textContent = "Ajustar";

      const zoomIn = document.createElement("button");
      zoomIn.type = "button";
      zoomIn.textContent = "+";

      toolbar.append(zoomOut, zoomReset, zoomIn);

      const viewport = document.createElement("div");
      viewport.className = "mermaid-zoom__viewport";

      const stage = document.createElement("div");
      stage.className = "mermaid-zoom__stage";

      const content = document.createElement("div");
      content.className = "mermaid-zoom__content";

      diagram.replaceWith(wrapper);

      content.appendChild(diagram);
      stage.appendChild(content);
      viewport.appendChild(stage);
      wrapper.append(toolbar, viewport);

      svg.removeAttribute("width");
      svg.removeAttribute("height");

      svg.style.width = `${baseWidth}px`;
      svg.style.height = `${baseHeight}px`;
      svg.style.maxWidth = "none";

      content.style.transformOrigin = "top left";

      const applyZoom = () => {
        content.style.transform = `scale(${scale})`;

        const scaledWidth = baseWidth * scale;
        const scaledHeight = baseHeight * scale;

        stage.style.width = `${scaledWidth}px`;
        stage.style.height = `${scaledHeight}px`;

        const nextViewportHeight = Math.min(
          Math.max(scaledHeight + viewportPadding, minViewportHeight),
          maxViewportHeight(),
        );

        viewport.style.height = `${nextViewportHeight}px`;
      };

      const fitToViewport = () => {
        const availableWidth = Math.max(
          viewport.clientWidth - viewportPadding,
          320,
        );

        const availableHeight = Math.max(
          maxViewportHeight() - viewportPadding,
          minViewportHeight,
        );

        const widthScale = availableWidth / baseWidth;
        const heightScale = availableHeight / baseHeight;

        initialScale = Math.min(1, widthScale, heightScale);
        scale = initialScale;

        applyZoom();
        viewport.scrollTo({ top: 0, left: 0 });
      };

      zoomIn.addEventListener("click", () => {
        scale = Math.min(scale + 0.15, 3);
        applyZoom();
      });

      zoomOut.addEventListener("click", () => {
        scale = Math.max(scale - 0.15, 0.35);
        applyZoom();
      });

      zoomReset.addEventListener("click", () => {
        fitToViewport();
      });

      viewport.addEventListener(
        "wheel",
        (event) => {
          if (!event.ctrlKey) return;

          event.preventDefault();

          scale += event.deltaY < 0 ? 0.1 : -0.1;
          scale = Math.max(0.35, Math.min(scale, 3));

          applyZoom();
        },
        { passive: false },
      );

      let isDragging = false;
      let startX = 0;
      let startY = 0;
      let scrollLeft = 0;
      let scrollTop = 0;

      viewport.addEventListener("mousedown", (event) => {
        isDragging = true;
        viewport.classList.add("is-dragging");

        startX = event.pageX;
        startY = event.pageY;
        scrollLeft = viewport.scrollLeft;
        scrollTop = viewport.scrollTop;
      });

      window.addEventListener("mouseup", () => {
        isDragging = false;
        viewport.classList.remove("is-dragging");
      });

      viewport.addEventListener("mousemove", (event) => {
        if (!isDragging) return;

        event.preventDefault();

        const deltaX = event.pageX - startX;
        const deltaY = event.pageY - startY;

        viewport.scrollLeft = scrollLeft - deltaX;
        viewport.scrollTop = scrollTop - deltaY;
      });

      requestAnimationFrame(fitToViewport);
    });
  }

  window.GuideDocs.markdown = {
    bootMarkdownViewer,
  };
})();
