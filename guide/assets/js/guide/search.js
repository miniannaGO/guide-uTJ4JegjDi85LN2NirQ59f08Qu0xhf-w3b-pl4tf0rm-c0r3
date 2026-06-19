(() => {
  window.GuideDocs = window.GuideDocs || {};
  const { guideSearchPages, guideSearchAliases } = window.GuideDocs.config;
  const { currentPage } = window.GuideDocs.navigation;
  let guideSearchIndexPromise = null;
  let guideSearchInputTimeout = 0;

  function bootGuideSearch() {
    const searchButton = document.querySelector("[data-guide-search-open]");

    ensureGuideSearchModal();

    const modal = document.getElementById("guide-search-modal");
    if (!modal) return;

    const input = modal.querySelector("[data-guide-search-input]");
    const results = modal.querySelector("[data-guide-search-results]");
    const status = modal.querySelector("[data-guide-search-status]");
    if (!input || !results || !status) return;

    const runSearch = () => {
      window.clearTimeout(guideSearchInputTimeout);
      guideSearchInputTimeout = window.setTimeout(async () => {
        const query = input.value.trim();
        const tokens = tokenizeGuideSearch(query);

        if (!query) {
          status.textContent = "";
          results.innerHTML = "";
          return;
        }

        status.textContent = "Buscando...";

        try {
          const groups = await searchGuide(query);
          if (input.value.trim() !== query) return;

          renderGuideSearchResults(groups, results, status, tokens);
        } catch {
          status.textContent = "No se pudo cargar el índice de búsqueda.";
          results.innerHTML = "";
        }
      }, 120);
    };

    input.addEventListener("input", runSearch);
    input.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        focusGuideSearchResult(results, 0);
      }
    });

    modal.addEventListener("shown.bs.modal", () => {
      guideSearchIndexPromise ??= buildGuideSearchIndex();
      input.focus();
      input.select();
      runSearch();
    });

    modal.addEventListener("hidden.bs.modal", () => {
      window.clearTimeout(guideSearchInputTimeout);
    });

    results.addEventListener("click", (event) => {
      const link = event.target?.closest?.("a[href]");
      if (!link || !window.bootstrap) return;

      window.bootstrap.Modal.getInstance(modal)?.hide();
    });

    results.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

      event.preventDefault();

      const links = Array.from(results.querySelectorAll("a[href]"));
      const currentIndex = links.indexOf(document.activeElement);
      const direction = event.key === "ArrowDown" ? 1 : -1;
      const nextIndex =
        currentIndex === -1
          ? 0
          : (currentIndex + direction + links.length) % links.length;

      focusGuideSearchResult(results, nextIndex);
    });

    searchButton?.addEventListener("click", () => {
      guideSearchIndexPromise ??= buildGuideSearchIndex();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "/" || isGuideTypingTarget(event.target)) return;
      if (!window.bootstrap) return;

      event.preventDefault();
      window.bootstrap.Modal.getOrCreateInstance(modal).show();
    });
  }

  function ensureGuideSearchModal() {
    if (document.getElementById("guide-search-modal")) return;

    document.body.insertAdjacentHTML(
      "beforeend",
      `<div
        class="modal fade guide-search-modal"
        id="guide-search-modal"
        tabindex="-1"
        aria-labelledby="guide-search-title"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
          <div class="modal-content guide-search-modal__content">
            <div class="modal-header">
              <h2 class="modal-title fs-5" id="guide-search-title">Buscar en la guía</h2>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>
            <div class="modal-body">
              <label class="visually-hidden" for="guide-search-input">Buscar tema</label>
              <div class="guide-search-box">
                <span class="guide-search-box__icon" aria-hidden="true"></span>
                <input
                  class="form-control guide-search-input"
                  id="guide-search-input"
                  type="search"
                  autocomplete="off"
                  placeholder="Buscar temas, secciones o conceptos"
                  data-guide-search-input
                />
              </div>
              <p class="guide-search-status" data-guide-search-status></p>
              <div class="guide-search-results" data-guide-search-results></div>
            </div>
          </div>
        </div>
      </div>`,
    );
  }

  async function searchGuide(query) {
    const index = await getGuideSearchIndex();
    const primaryTokens = tokenizeGuideSearch(query);
    const tokens = expandGuideSearchTokens(primaryTokens);

    if (!primaryTokens.length) return [];

    return index
      .map((group) => {
        const groupScore = scoreGuideSearchText(
          group.searchText,
          primaryTokens,
          tokens,
        );
        const entries = group.entries
          .map((entry) => {
            const score =
              scoreGuideSearchEntry(entry, primaryTokens, tokens) +
              (groupScore > 0 && (entry.kind === "nav" || entry.kind === "page")
                ? 12
                : 0);

            return score > 0
              ? {
                  ...entry,
                  score,
                  snippet: buildGuideSearchSnippet(entry, primaryTokens),
                }
              : null;
          })
          .filter(Boolean)
          .sort((a, b) => b.score - a.score || a.order - b.order);

        return entries.length
          ? {
              ...group,
              entries,
              score:
                groupScore * 3 +
                entries
                  .slice(0, 8)
                  .reduce((sum, entry) => sum + entry.score, 0),
            }
          : null;
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score || a.order - b.order);
  }

  function renderGuideSearchResults(groups, results, status, tokens) {
    const total = groups.reduce(
      (count, group) => count + group.entries.length,
      0,
    );

    if (!total) {
      status.textContent = "Sin resultados";
      results.innerHTML = "";
      return;
    }

    status.textContent =
      total === 1
        ? "1 resultado agrupado por página"
        : `${total} resultados agrupados por página`;
    results.innerHTML = groups
      .map(
        (group) => `<section class="guide-search-group">
          <h3 class="guide-search-group__title">
            <a href="${escapeGuideAttribute(group.href)}">${highlightGuideSearchText(group.title, tokens)}</a>
            <small>${group.entries.length}</small>
          </h3>
          ${renderGuideSearchSections(group.entries, tokens)}
        </section>`,
      )
      .join("");
  }

  function renderGuideSearchSections(entries, tokens) {
    const sections = groupGuideSearchEntriesBySection(entries);

    return sections
      .map(
        ([section, sectionEntries]) => `<div class="guide-search-section">
          <h4>${highlightGuideSearchText(section, tokens)}</h4>
          <ul class="guide-search-list">
            ${sectionEntries.map((entry) => renderGuideSearchEntry(entry, tokens)).join("")}
          </ul>
        </div>`,
      )
      .join("");
  }

  function renderGuideSearchEntry(entry, tokens) {
    const label =
      entry.kind === "nav"
        ? "Menú"
        : entry.kind === "page"
          ? "Página"
          : "Sección";
    const snippet = entry.snippet
      ? `<p>${highlightGuideSearchText(entry.snippet, tokens)}</p>`
      : "";

    return `<li>
      <a href="${escapeGuideAttribute(entry.href)}">
        <span>
          <strong>${highlightGuideSearchText(entry.title, tokens)}</strong>
          ${snippet}
        </span>
        <small>${label}</small>
      </a>
    </li>`;
  }

  function groupGuideSearchEntriesBySection(entries) {
    const sections = new Map();

    entries.forEach((entry) => {
      const section =
        entry.kind === "nav"
          ? "Menú izquierdo"
          : entry.sectionTitle || "Contenido";

      if (!sections.has(section)) sections.set(section, []);
      sections.get(section).push(entry);
    });

    return Array.from(sections.entries());
  }

  function focusGuideSearchResult(results, index) {
    const links = Array.from(results.querySelectorAll("a[href]"));
    if (!links.length) return;

    links[Math.max(0, Math.min(index, links.length - 1))].focus();
  }

  function isGuideTypingTarget(target) {
    return Boolean(
      target?.closest?.(
        "input, textarea, select, button, [contenteditable='true'], [contenteditable='']",
      ),
    );
  }

  function getGuideSearchIndex() {
    guideSearchIndexPromise ??= buildGuideSearchIndex();

    return guideSearchIndexPromise;
  }

  async function buildGuideSearchIndex() {
    const parser = new DOMParser();
    const current = currentPage();
    const groups = await Promise.all(
      guideSearchPages.map(async ([href, title], order) => {
        try {
          const doc =
            href === current
              ? document
              : parser.parseFromString(await fetchGuidePage(href), "text/html");

          return {
            href,
            title,
            order,
            searchText: normalizeGuideSearchText(`${title} ${href}`),
            entries: collectGuideSearchEntries(doc, href, title),
          };
        } catch {
          return {
            href,
            title,
            order,
            searchText: normalizeGuideSearchText(`${title} ${href}`),
            entries: [],
          };
        }
      }),
    );

    return groups.filter((group) => group.entries.length);
  }

  async function fetchGuidePage(href) {
    const response = await fetch(new URL(href, window.location.href), {
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`No se pudo cargar ${href}`);
    }

    return response.text();
  }

  function collectGuideSearchEntries(doc, pageHref, pageTitle) {
    const entries = [];
    const seen = new Set();

    addGuideSearchEntry(entries, seen, {
      title: pageTitle,
      href: pageHref,
      kind: "page",
      pageTitle,
      sectionTitle: "Página",
      excerpt: `Vista principal de ${pageTitle}.`,
      order: entries.length,
    });

    doc
      .querySelectorAll(
        "#guide-nav .nav-link[href], .guide-sidebar .nav-link[href]",
      )
      .forEach((link) => {
        addGuideSearchEntry(entries, seen, {
          title: textOfGuideNode(link),
          href: normalizeGuideSearchHref(link.getAttribute("href"), pageHref),
          kind: "nav",
          pageTitle,
          sectionTitle: "Menú izquierdo",
          excerpt: nearestGuideLinkContext(link),
          order: entries.length,
        });
      });

    doc
      .querySelectorAll(
        "header h1, header h2, header h3, header h4, main h1, main h2, main h3, main h4",
      )
      .forEach((heading) => {
        const sectionTitle = nearestGuideSectionTitle(heading);
        const excerpt = guideSectionExcerpt(heading);

        addGuideSearchEntry(entries, seen, {
          title: textOfGuideNode(heading),
          href: guideHeadingHref(heading, pageHref),
          kind: "heading",
          pageTitle,
          sectionTitle,
          excerpt,
          order: entries.length,
        });
      });

    return entries;
  }

  function addGuideSearchEntry(entries, seen, entry) {
    const title = entry.title.trim();
    if (!title) return;

    const href = entry.href || entry.pageHref;
    if (isExcludedGuideSearchEntry(title, href)) return;

    const key = `${href}::${normalizeGuideSearchText(title)}`;
    if (seen.has(key)) return;

    seen.add(key);
    entries.push({
      ...entry,
      title,
      href,
      searchText: normalizeGuideSearchText(
        `${entry.pageTitle} ${entry.sectionTitle || ""} ${title} ${
          entry.excerpt || ""
        } ${href}`,
      ),
    });
  }

  function isExcludedGuideSearchEntry(title, href) {
    return (
      String(href).includes("bondades.html") ||
      String(href).includes("pillars-capabilities.html") ||
      normalizeGuideSearchText(title).includes("ecosistema")
    );
  }

  function nearestGuideSectionTitle(node) {
    const section = node.closest("section, article");
    const heading =
      section?.querySelector("h1, h2, h3, h4") ||
      node.closest("main, header")?.querySelector("h1, h2");

    return textOfGuideNode(heading || node);
  }

  function nearestGuideLinkContext(link) {
    const item = link.closest("li, .guide-sidebar");
    const context = item?.querySelector("h3, h2");

    return textOfGuideNode(context || link);
  }

  function guideSectionExcerpt(heading) {
    const section =
      heading.closest("section, article") || heading.parentElement;
    const pieces = [];

    collectGuideTextAfterHeading(heading, pieces);

    if (pieces.join(" ").length < 120 && section) {
      section
        .querySelectorAll("p, li, td, th, dd, dt")
        .forEach((node) => pieces.push(textOfGuideNode(node)));
    }

    return compactGuideSearchText(pieces.join(" ")).slice(0, 520);
  }

  function collectGuideTextAfterHeading(heading, pieces) {
    const rank = guideHeadingRank(heading);
    let sibling = heading.nextElementSibling;

    while (sibling && pieces.join(" ").length < 520) {
      if (isGuideHeading(sibling) && guideHeadingRank(sibling) <= rank) break;

      if (!sibling.matches?.("nav, aside, script, style")) {
        pieces.push(textOfGuideNode(sibling));
      }

      sibling = sibling.nextElementSibling;
    }
  }

  function isGuideHeading(node) {
    return /^H[1-4]$/.test(node?.tagName || "");
  }

  function guideHeadingRank(node) {
    return Number((node?.tagName || "H4").slice(1)) || 4;
  }

  function guideHeadingHref(heading, pageHref) {
    if (heading.id) return `${pageHref}#${heading.id}`;

    const parent = heading.closest("section[id], article[id], div[id]");

    return parent?.id ? `${pageHref}#${parent.id}` : pageHref;
  }

  function normalizeGuideSearchHref(href, pageHref) {
    if (!href) return pageHref;
    if (href.startsWith("#")) return `${pageHref}${href}`;
    if (/^https?:\/\//i.test(href)) return href;

    return href;
  }

  function textOfGuideNode(node) {
    return (node.textContent || "").replace(/\s+/g, " ").trim();
  }

  function tokenizeGuideSearch(query) {
    return normalizeGuideSearchText(query).split(" ").filter(Boolean);
  }

  function expandGuideSearchTokens(tokens) {
    const expanded = new Set(tokens);

    tokens.forEach((token) => {
      (guideSearchAliases[token] || []).forEach((alias) => {
        tokenizeGuideSearch(alias).forEach((aliasToken) =>
          expanded.add(aliasToken),
        );
      });
    });

    return Array.from(expanded);
  }

  function scoreGuideSearchEntry(entry, primaryTokens, tokens) {
    const title = normalizeGuideSearchText(entry.title);
    const section = normalizeGuideSearchText(entry.sectionTitle || "");
    const excerpt = normalizeGuideSearchText(entry.excerpt || "");
    let score = 0;

    primaryTokens.forEach((token) => {
      if (title.includes(token)) score += 30;
      if (section.includes(token)) score += 16;
      if (excerpt.includes(token)) score += 8;
      if (entry.searchText.includes(token)) score += 4;
    });

    tokens
      .filter((token) => !primaryTokens.includes(token))
      .forEach((token) => {
        if (entry.searchText.includes(token)) score += 2;
      });

    if (score && entry.kind === "page") score += 16;
    if (score && entry.kind === "nav") score += 10;
    if (score && entry.kind === "heading") score += 6;

    return score;
  }

  function scoreGuideSearchText(text, primaryTokens, tokens) {
    let score = 0;

    primaryTokens.forEach((token) => {
      if (text.includes(token)) score += 16;
    });

    tokens
      .filter((token) => !primaryTokens.includes(token))
      .forEach((token) => {
        if (text.includes(token)) score += 2;
      });

    return score;
  }

  function buildGuideSearchSnippet(entry, tokens) {
    const source = compactGuideSearchText(entry.excerpt || "");
    if (!source) return "";

    const lowerSource = source.toLowerCase();
    const matchIndex = tokens.reduce((best, token) => {
      const index = lowerSource.indexOf(token);

      return index === -1 ? best : Math.min(best, index);
    }, Number.POSITIVE_INFINITY);
    const anchor = Number.isFinite(matchIndex) ? matchIndex : 0;
    const start = Math.max(0, anchor - 72);
    const end = Math.min(source.length, anchor + 168);
    const prefix = start > 0 ? "... " : "";
    const suffix = end < source.length ? " ..." : "";

    return `${prefix}${source.slice(start, end)}${suffix}`;
  }

  function highlightGuideSearchText(value, tokens) {
    const escaped = escapeGuideHtml(value);
    const usefulTokens = [
      ...new Set(tokens.filter((token) => token.length > 1)),
    ]
      .sort((a, b) => b.length - a.length)
      .map(escapeGuideRegExp);

    if (!usefulTokens.length) return escaped;

    return escaped.replace(
      new RegExp(`(${usefulTokens.join("|")})`, "gi"),
      "<mark>$1</mark>",
    );
  }

  function normalizeGuideSearchText(text) {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function compactGuideSearchText(text) {
    return String(text).replace(/\s+/g, " ").trim();
  }

  function escapeGuideRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function escapeGuideHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };

      return entities[char];
    });
  }

  function escapeGuideAttribute(value) {
    return escapeGuideHtml(value);
  }

  window.GuideDocs.search = {
    bootGuideSearch,
  };
})();
