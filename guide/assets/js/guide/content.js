(() => {
  window.GuideDocs = window.GuideDocs || {};
  const currentScript = document.currentScript;
  const shikiModuleUrl = currentScript?.src
    ? new URL("../../lib/js/shiki-guide.bundle.js", currentScript.src).href
    : new URL("assets/lib/js/shiki-guide.bundle.js", window.location.href).href;
  const defaultDarkTheme = "dracula";
  const defaultLightTheme = "snazzy-light";

  function bootCopyCodeButtons() {
    document.querySelectorAll("[data-copy-code]").forEach((button) => {
      button.addEventListener("click", async () => {
        const targetId = button.getAttribute("data-copy-code");
        const target = targetId ? document.getElementById(targetId) : null;
        const text = target?.textContent?.trim() ?? "";

        if (!text) return;

        try {
          if (navigator.clipboard) {
            await navigator.clipboard.writeText(text);
          } else {
            copyWithFallback(text);
          }

          setButtonState(button, "Copiado");
        } catch {
          setButtonState(button, "No copiado");
        }
      });
    });
  }

  function bootNavbarCollapseOnAnchorClick() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", () => {
        const navbar = document.querySelector(".navbar-collapse.show");
        if (!navbar || !window.bootstrap) return;

        window.bootstrap.Collapse.getOrCreateInstance(navbar).hide();
      });
    });
  }

  function setButtonState(button, label) {
    const previous = button.textContent;
    button.textContent = label;
    button.classList.add("btn-success");
    button.classList.remove("btn-outline-light");

    window.setTimeout(() => {
      button.textContent = previous;
      button.classList.remove("btn-success");
      button.classList.add("btn-outline-light");
    }, 1400);
  }

  function copyWithFallback(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }

  function enhanceInlineTerms(root = document.body) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.includes("`")) {
          return NodeFilter.FILTER_REJECT;
        }

        const parent = node.parentElement;
        if (!parent || parent.closest("pre, code, script, style, textarea")) {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      },
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      const fragment = document.createDocumentFragment();
      const pieces = node.nodeValue.split(/(`[^`]+`)/g);

      pieces.forEach((piece) => {
        if (piece.startsWith("`") && piece.endsWith("`") && piece.length > 2) {
          const span = document.createElement("span");
          span.className = "guide-term";
          span.textContent = piece.slice(1, -1);
          fragment.appendChild(span);
          return;
        }

        fragment.appendChild(document.createTextNode(piece));
      });

      node.replaceWith(fragment);
    });
  }

  function syncCodeBlockLanguages(root = document) {
    root.querySelectorAll("pre > code[class*='language-']").forEach((code) => {
      const languageClass = Array.from(code.classList).find((name) =>
        name.startsWith("language-"),
      );

      if (languageClass) code.parentElement?.classList.add(languageClass);
    });
  }

  function codeLanguage(code) {
    const languageClass = Array.from(code.classList).find((name) =>
      name.startsWith("language-"),
    );

    return languageClass?.replace("language-", "") ?? "";
  }

  async function bootShikiCodeBlocks(root = document) {
    const blocks = Array.from(
      root.querySelectorAll("pre > code[class*='language-']"),
    ).filter((code) => codeLanguage(code) !== "mermaid");

    if (!blocks.length) return;

    try {
      const highlighter = await shikiHighlighter();
      blocks.forEach((code) => {
        try {
          renderShikiCodeBlock(code, highlighter);
        } catch {
          code.closest(".code-card")?.classList.add("code-card--plain");
        }
      });
    } catch {
      root
        .querySelectorAll(".code-card")
        .forEach((card) => card.classList.add("code-card--plain"));
    }
  }

  async function shikiHighlighter() {
    if (!window.__guideShikiHighlighter) {
      window.__guideShikiHighlighter =
        import(shikiModuleUrl).then(({ createHighlighter }) =>
          createHighlighter({
            themes: [defaultDarkTheme, defaultLightTheme],
            langs: [
              "html",
              "php",
              "typescript",
              "javascript",
              "bash",
              "json",
              "text",
            ],
          }),
        );
    }

    return window.__guideShikiHighlighter;
  }

  function renderShikiCodeBlock(code, highlighter) {
    const nextTheme = currentShikiTheme();
    if (
      code.closest("pre")?.dataset.shikiHighlighted === "true" &&
      code.closest("pre")?.dataset.shikiTheme === nextTheme
    ) {
      return;
    }

    const originalPre = code.closest("pre");
    const language = normalizeShikiLanguage(codeLanguage(code));
    const rawCode = code.dataset.rawCode ?? code.textContent ?? "";
    const html = highlighter.codeToHtml(rawCode, {
      lang: language,
      theme: nextTheme,
    });

    const template = document.createElement("template");
    template.innerHTML = html.trim();

    const highlightedPre = template.content.querySelector("pre");
    const highlightedCode = highlightedPre?.querySelector("code");
    if (!highlightedPre || !highlightedCode || !originalPre) return;

    highlightedPre.dataset.shikiHighlighted = "true";
    highlightedPre.dataset.shikiTheme = nextTheme;
    highlightedPre.classList.add(`language-${language}`);

    if (code.id) highlightedCode.id = code.id;
    highlightedCode.classList.add(`language-${language}`);
    highlightedCode.dataset.rawCode = rawCode;

    originalPre.replaceWith(highlightedPre);
  }

  function currentShikiTheme() {
    return window.GuideTheme?.current?.() === "light"
      ? defaultLightTheme
      : defaultDarkTheme;
  }

  function normalizeShikiLanguage(language) {
    const languages = {
      markup: "html",
      html: "html",
      xml: "html",
      php: "php",
      typescript: "typescript",
      ts: "typescript",
      javascript: "javascript",
      js: "javascript",
      bash: "bash",
      shell: "bash",
      json: "json",
      txt: "text",
      text: "text",
    };

    return languages[language] ?? "text";
  }

  window.GuideDocs.content = {
    bootCopyCodeButtons,
    bootNavbarCollapseOnAnchorClick,
    enhanceInlineTerms,
    syncCodeBlockLanguages,
    bootShikiCodeBlocks,
  };
})();
