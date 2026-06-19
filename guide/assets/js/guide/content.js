(() => {
  window.GuideDocs = window.GuideDocs || {};
  const currentScript = document.currentScript;
  const shikiModuleUrl = currentScript?.src
    ? new URL("../../lib/js/shiki-guide.bundle.js", currentScript.src).href
    : new URL("assets/lib/js/shiki-guide.bundle.js", window.location.href).href;
  const defaultDarkTheme = "dracula";
  const defaultLightTheme = "snazzy-light";
  const guideTreeLanguageName = "guide-tree";
  const guideTreeDarkThemeName = "guide-tree-dark";
  const guideTreeLightThemeName = "guide-tree-light";
  const guideTreeLanguage = {
    name: guideTreeLanguageName,
    scopeName: "source.guide-tree",
    aliases: ["filesystem", "tree"],
    patterns: [
      { include: "#placeholderFile" },
      { include: "#placeholderDirectory" },
      { include: "#placeholder" },
      { include: "#directory" },
      { include: "#file" },
    ],
    repository: {
      placeholderFile: {
        match: "(<)([^>]+)(>)(\\.[A-Za-z0-9]+)",
        captures: {
          1: {
            name: "punctuation.definition.variable.begin.guide-tree",
          },
          2: { name: "variable.other.placeholder.guide-tree" },
          3: {
            name: "punctuation.definition.variable.end.guide-tree",
          },
          4: { name: "support.type.file-extension.guide-tree" },
        },
      },
      placeholderDirectory: {
        match: "(<)([^>]+)(>)(/)",
        captures: {
          1: {
            name: "punctuation.definition.variable.begin.guide-tree",
          },
          2: { name: "variable.other.placeholder.guide-tree" },
          3: {
            name: "punctuation.definition.variable.end.guide-tree",
          },
          4: { name: "punctuation.separator.path.guide-tree" },
        },
      },
      placeholder: {
        match: "(<)([^>]+)(>)",
        captures: {
          1: {
            name: "punctuation.definition.variable.begin.guide-tree",
          },
          2: { name: "variable.other.placeholder.guide-tree" },
          3: {
            name: "punctuation.definition.variable.end.guide-tree",
          },
        },
      },
      directory: {
        match: "([^\\s/]+)(/)",
        captures: {
          1: { name: "entity.name.namespace.guide-tree" },
          2: { name: "punctuation.separator.path.guide-tree" },
        },
      },
      file: {
        match: "([^\\s/]+?)(\\.[A-Za-z0-9]+)$",
        captures: {
          1: { name: "string.unquoted.filename.guide-tree" },
          2: { name: "support.type.file-extension.guide-tree" },
        },
      },
    },
  };
  const guideTreeDarkTheme = {
    name: guideTreeDarkThemeName,
    type: "dark",
    colors: {
      "editor.background": "#282A36",
      "editor.foreground": "#F8F8F2",
    },
    settings: [
      {
        settings: {
          foreground: "#F8F8F2",
          background: "#282A36",
        },
      },
      {
        scope: ["entity.name.namespace.guide-tree"],
        settings: {
          foreground: "#F1FA8C",
          fontStyle: "bold",
        },
      },
      {
        scope: ["punctuation.separator.path.guide-tree"],
        settings: { foreground: "#6272A4" },
      },
      {
        scope: ["string.unquoted.filename.guide-tree"],
        settings: { foreground: "#8BE9FD" },
      },
      {
        scope: ["support.type.file-extension.guide-tree"],
        settings: { foreground: "#BD93F9" },
      },
      {
        scope: ["variable.other.placeholder.guide-tree"],
        settings: {
          foreground: "#50FA7B",
          fontStyle: "italic",
        },
      },
      {
        scope: [
          "punctuation.definition.variable.begin.guide-tree",
          "punctuation.definition.variable.end.guide-tree",
        ],
        settings: { foreground: "#FF79C6" },
      },
    ],
  };
  const guideTreeLightTheme = {
    name: guideTreeLightThemeName,
    type: "light",
    colors: {
      "editor.background": "#FAFBFC",
      "editor.foreground": "#565869",
    },
    settings: [
      {
        settings: {
          foreground: "#565869",
          background: "#FAFBFC",
        },
      },
      {
        scope: ["entity.name.namespace.guide-tree"],
        settings: {
          foreground: "#CF9C00",
          fontStyle: "bold",
        },
      },
      {
        scope: ["punctuation.separator.path.guide-tree"],
        settings: { foreground: "#ADB1C2" },
      },
      {
        scope: ["string.unquoted.filename.guide-tree"],
        settings: { foreground: "#09A1ED" },
      },
      {
        scope: ["support.type.file-extension.guide-tree"],
        settings: { foreground: "#11658F" },
      },
      {
        scope: ["variable.other.placeholder.guide-tree"],
        settings: {
          foreground: "#2DAE58",
          fontStyle: "italic",
        },
      },
      {
        scope: [
          "punctuation.definition.variable.begin.guide-tree",
          "punctuation.definition.variable.end.guide-tree",
        ],
        settings: { foreground: "#F767BB" },
      },
    ],
  };

  function bootCopyCodeButtons() {
    document.querySelectorAll("[data-copy-code]").forEach((button) => {
      button.addEventListener("click", async () => {
        const targetId = button.getAttribute("data-copy-code");
        const target = targetId ? document.getElementById(targetId) : null;
        const text = copyableCodeText(target);

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

  function copyableCodeText(target) {
    const text = target?.textContent?.trim() ?? "";
    if (!target?.classList.contains("language-bash")) return text;

    return text
      .split(/\r?\n/)
      .map((line) =>
        line.replace(
          /^(?:<[^>\r\n]+>(?:\/[^>\r\n]+>)?|\/(?:ruta|cualquier)\/[^>\r\n]*>)\s*/,
          "",
        ),
      )
      .join("\n")
      .trim();
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

  function bootVocabularyTabs() {
    document.querySelectorAll("[data-vocabulary-tabs]").forEach((tablist) => {
      if (tablist.dataset.vocabularyTabsReady === "true") return;

      const section = tablist.closest(".guide-section") ?? document;
      const panels = section.querySelector("[data-vocabulary-panels]");
      const tabs = Array.from(
        tablist.querySelectorAll("[data-vocabulary-tab]"),
      );

      if (!panels || tabs.length === 0) return;

      tablist.dataset.vocabularyTabsReady = "true";

      const stagePanels = Array.from(
        panels.querySelectorAll("[data-vocabulary-stage]"),
      );
      const stages = new Set(
        stagePanels.map((panel) => panel.dataset.vocabularyStage),
      );

      const defaultStage =
        stageFromCurrentHash(stages) ||
        normalizedVocabularyStage(tablist.dataset.vocabularyDefault, stages) ||
        stagePanels[0]?.dataset.vocabularyStage ||
        "";

      tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          activateVocabularyStage(tab.dataset.vocabularyTab);
        });
      });

      tablist.addEventListener("keydown", (event) => {
        const currentIndex = tabs.indexOf(document.activeElement);
        if (currentIndex === -1) return;

        const nextIndex = nextVocabularyTabIndex(
          event.key,
          currentIndex,
          tabs.length,
        );

        if (nextIndex === currentIndex) return;

        event.preventDefault();
        tabs[nextIndex].focus();
        activateVocabularyStage(tabs[nextIndex].dataset.vocabularyTab);
      });

      activateVocabularyStage(defaultStage);

      function activateVocabularyStage(nextStage) {
        const stage =
          normalizedVocabularyStage(nextStage, stages) ||
          normalizedVocabularyStage(tablist.dataset.vocabularyDefault, stages) ||
          stagePanels[0]?.dataset.vocabularyStage ||
          "";

        stagePanels.forEach((panel) => {
          panel.hidden = panel.dataset.vocabularyStage !== stage;
        });

        tabs.forEach((tab) => {
          const isActive = tab.dataset.vocabularyTab === stage;

          tab.classList.toggle("is-active", isActive);
          tab.setAttribute("aria-selected", isActive ? "true" : "false");
          tab.tabIndex = isActive ? 0 : -1;
        });

        tablist.dataset.vocabularyActive = stage;
        panels.dataset.vocabularyActive = stage;
      }
    });
  }

  function stageFromCurrentHash(stages) {
    const id = window.location.hash?.slice(1) ?? "";
    if (!id.startsWith("vocabulary-stage-")) return "";

    return normalizedVocabularyStage(
      id.slice("vocabulary-stage-".length),
      stages,
    );
  }

  function normalizedVocabularyStage(stage, stages) {
    return stage && stages.has(stage) ? stage : "";
  }

  function nextVocabularyTabIndex(key, currentIndex, total) {
    if (key === "ArrowRight") return (currentIndex + 1) % total;
    if (key === "ArrowLeft") return (currentIndex - 1 + total) % total;
    if (key === "Home") return 0;
    if (key === "End") return total - 1;

    return currentIndex;
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
      window.__guideShikiHighlighter = import(shikiModuleUrl).then(
        async ({ createHighlighter }) => {
          const highlighter = await createHighlighter({
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
          });

          await highlighter.loadLanguage(guideTreeLanguage);
          await highlighter.loadTheme(guideTreeDarkTheme);
          await highlighter.loadTheme(guideTreeLightTheme);

          return highlighter;
        },
      );
    }

    return window.__guideShikiHighlighter;
  }

  function renderShikiCodeBlock(code, highlighter) {
    const language = normalizeShikiLanguage(codeLanguage(code));
    const nextTheme = currentShikiTheme(language);
    if (
      code.closest("pre")?.dataset.shikiHighlighted === "true" &&
      code.closest("pre")?.dataset.shikiTheme === nextTheme
    ) {
      return;
    }

    const originalPre = code.closest("pre");
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

  function currentShikiTheme(language = "") {
    const isLight = window.GuideTheme?.current?.() === "light";

    if (language === guideTreeLanguageName) {
      return isLight ? guideTreeLightThemeName : guideTreeDarkThemeName;
    }

    return isLight ? defaultLightTheme : defaultDarkTheme;
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
      filesystem: guideTreeLanguageName,
      tree: guideTreeLanguageName,
      "guide-tree": guideTreeLanguageName,
    };

    return languages[language] ?? "text";
  }

  window.GuideDocs.content = {
    bootCopyCodeButtons,
    bootNavbarCollapseOnAnchorClick,
    syncCodeBlockLanguages,
    bootShikiCodeBlocks,
    bootVocabularyTabs,
  };
})();
