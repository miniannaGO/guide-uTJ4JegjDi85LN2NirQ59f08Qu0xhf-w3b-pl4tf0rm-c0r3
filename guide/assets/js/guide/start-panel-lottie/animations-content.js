(() => {
  const {
    FRAMES,
    animated,
    animation,
    bootstrapIconAsset,
    closedPath,
    ellipse,
    fill,
    group,
    imageLayer,
    layer,
    path,
    registerAnimations,
    stroke,
    svgAsset,
    svgColor,
  } = window.GuideDocs.startPanelLottieEngine;

  const BOOTSTRAP_JOURNAL_CODE_PATHS = [
    {
      d: "M8.646 5.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 8 8.646 6.354a.5.5 0 0 1 0-.708m-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 8l1.647-1.646a.5.5 0 0 0 0-.708",
      attrs: 'fill-rule="evenodd"',
    },
    {
      d: "M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2",
    },
    {
      d: "M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z",
    },
  ];
  const BOOTSTRAP_JOURNAL_FRONT_COVER_PATHS = BOOTSTRAP_JOURNAL_CODE_PATHS;
  const BOOTSTRAP_JOURNAL_BACK_COVER_PATHS = BOOTSTRAP_JOURNAL_CODE_PATHS.slice(
    1,
    2,
  );
  const BOOTSTRAP_JOURNAL_BODY_PATHS = BOOTSTRAP_JOURNAL_CODE_PATHS.slice(1, 2);
  const BOOTSTRAP_JOURNAL_COVER_MASK_PATH =
    "M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z";
  const BOOTSTRAP_MAP_PATH =
    "M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.5.5 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103M10 1.91l-4-.8v12.98l4 .8zm1 12.98 4-.8V1.11l-4 .8zm-6-.8V1.11l-4 .8v12.98z";
  const BOOTSTRAP_BOOK_RIGHT_PAGE_PATH =
    "M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492z";
  const BOOTSTRAP_BOOK_PATH =
    "M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783";

  function buildRecipesAnimation(colors) {
    const pageText = [
      [27, 44, 21],
      [31, 41, 23],
      [35, 45, 25],
      [39, 39, 27],
    ].map(([y, endX, appearAt], index) =>
      group(
        `page-text-line-${index + 1}`,
        [
          path([
            [30, y],
            [endX, y],
          ]),
          stroke(colors.primarySoft, 1.35, 82),
        ],
        {
          o: animated([
            [0, 0],
            [appearAt, 0],
            [appearAt + 3, 100],
            [54, 100],
            [58, 0],
            [FRAMES, 0],
          ]),
        },
      ),
    );

    return animation(
      "recipes-bootstrap-journal-code",
      [
        imageLayer("bi-journal-cover-front", "bootstrap-journal-cover-front", {
          a: [12, 32, 0],
          p: [26.4, 32, 0],
          ddd: true,
          o: animated([
            [0, 100],
            [17, 100],
            [19, 0],
            [57, 0],
            [59, 100],
            [FRAMES, 100],
          ]),
          ry: animated([
            [0, 0],
            [18, 90],
            [58, 90],
            [FRAMES, 0],
          ]),
          s: [48, 48, 100],
        }),
        imageLayer(
          "bi-journal-cover-front-mask",
          "bootstrap-journal-cover-mask",
          {
            a: [12, 32, 0],
            p: [26.4, 32, 0],
            ddd: true,
            o: animated([
              [0, 100],
              [17, 100],
              [19, 0],
              [57, 0],
              [59, 100],
              [FRAMES, 100],
            ]),
            ry: animated([
              [0, 0],
              [18, 90],
              [58, 90],
              [FRAMES, 0],
            ]),
            s: [48, 48, 100],
          },
        ),
        imageLayer("bi-journal-cover-back", "bootstrap-journal-cover-back", {
          a: [12, 32, 0],
          p: [26.4, 32, 0],
          ddd: true,
          o: animated([
            [0, 0],
            [17, 0],
            [19, 100],
            [57, 100],
            [59, 0],
            [FRAMES, 0],
          ]),
          ry: animated([
            [0, 90],
            [18, 90],
            [32, 165],
            [44, 165],
            [58, 90],
            [FRAMES, 90],
          ]),
          s: [48, 48, 100],
        }),
        imageLayer(
          "bi-journal-cover-back-mask",
          "bootstrap-journal-cover-mask",
          {
            a: [12, 32, 0],
            p: [26.4, 32, 0],
            ddd: true,
            o: animated([
              [0, 0],
              [17, 0],
              [19, 100],
              [57, 100],
              [59, 0],
              [FRAMES, 0],
            ]),
            ry: animated([
              [0, 90],
              [18, 90],
              [32, 165],
              [44, 165],
              [58, 90],
              [FRAMES, 90],
            ]),
            s: [48, 48, 100],
          },
        ),
        layer("bi-journal-page-text", pageText),
        imageLayer("bi-journal-body", "bootstrap-journal-body", {
          a: [32, 32, 0],
          p: [36, 32, 0],
          s: [48, 48, 100],
        }),
      ],
      [
        bootstrapIconAsset(
          "bootstrap-journal-cover-front",
          BOOTSTRAP_JOURNAL_FRONT_COVER_PATHS,
          colors.primary,
        ),
        bootstrapIconAsset(
          "bootstrap-journal-cover-back",
          BOOTSTRAP_JOURNAL_BACK_COVER_PATHS,
          colors.primary,
        ),
        bootstrapIconAsset(
          "bootstrap-journal-cover-mask",
          BOOTSTRAP_JOURNAL_COVER_MASK_PATH,
          colors.cover,
        ),
        bootstrapIconAsset(
          "bootstrap-journal-body",
          BOOTSTRAP_JOURNAL_BODY_PATHS,
          colors.primary,
        ),
      ],
      { threeDimensional: true },
    );
  }

  function buildDiagramsAnimation(colors) {
    const mapSymbols = [
      group(
        "map-symbols-frame",
        [
          group("secondary-roads", [
            path([
              [9, 17],
              [15, 22],
              [11, 30],
              [17, 38],
              [13, 48],
            ]),
            path([
              [27, 13],
              [31, 20],
              [27, 28],
              [34, 35],
              [30, 48],
            ]),
            path([
              [44, 16],
              [51, 21],
              [46, 29],
              [53, 37],
              [49, 48],
            ]),
            stroke(colors.muted, 1.35, 72),
          ]),
          group("main-route", [
            path([
              [10, 42],
              [18, 34],
              [26, 38],
              [34, 27],
              [43, 31],
              [54, 20],
            ]),
            stroke(colors.primarySoft, 2.1, 92),
          ]),
          group("route-stops", [
            group("route-stop-start", [
              ellipse(10, 42, 4.2, 4.2),
              fill(colors.primarySoft, 100),
              stroke(colors.primary, 1.25),
            ]),
            group("route-stop-middle", [
              ellipse(34, 27, 4.2, 4.2),
              fill(colors.primarySoft, 100),
              stroke(colors.primary, 1.25),
            ]),
            group("route-stop-end", [
              ellipse(54, 20, 4.2, 4.2),
              fill(colors.primarySoft, 100),
              stroke(colors.primary, 1.25),
            ]),
          ]),
          group("landmarks", [
            closedPath([
              [19, 18],
              [22, 13],
              [25, 18],
            ]),
            closedPath([
              [42, 45],
              [46, 39],
              [50, 45],
            ]),
            fill(colors.primarySoft, 24),
            stroke(colors.primary, 1.25, 88),
          ]),
          group("water-reference", [
            path([
              [8, 52],
              [12, 50],
              [16, 52],
              [20, 50],
            ]),
            path([
              [8, 56],
              [12, 54],
              [16, 56],
              [20, 54],
            ]),
            stroke(colors.primarySoft, 1.2, 76),
          ]),
        ],
        {
          a: [32, 32],
          p: [32, 32],
          s: [56, 56],
        },
      ),
    ];
    const magnifier = [
      group(
        "top-magnifier",
        [
          ellipse(0, 0, 19, 19),
          stroke(colors.primary, 3.3),
          ellipse(0, 0, 11, 11),
          stroke(colors.primarySoft, 1.7, 92),
          path([
            [6, 6],
            [16, 16],
          ]),
          stroke(colors.primary, 3.6),
        ],
        {
          p: animated([
            [0, [42, 30]],
            [36, [29, 29]],
            [FRAMES, [42, 30]],
          ]),
          s: [75, 75],
        },
      ),
    ];

    return animation(
      "diagrams-bootstrap-map",
      [
        layer("map-magnifier-upper", magnifier),
        layer("map-symbols", mapSymbols),
        imageLayer("bi-map", "bootstrap-map", {
          a: [32, 32, 0],
          p: [32, 32, 0],
          s: [56, 56, 100],
        }),
      ],
      [bootstrapIconAsset("bootstrap-map", BOOTSTRAP_MAP_PATH, colors.primary)],
    );
  }

  function buildReferenceAnimation(colors) {
    const baseText = [
      [27, 18, 28],
      [31, 18, 26],
      [35, 18, 29],
      [39, 18, 25],
      [27, 36, 46],
      [31, 36, 44],
      [35, 36, 47],
      [39, 36, 43],
    ].map(([y, startX, endX], index) =>
      group(`book-page-text-${index + 1}`, [
        path([
          [startX, y],
          [endX, y],
        ]),
        stroke(colors.pageText, 1.1, 76),
      ]),
    );

    return animation(
      "reference-bootstrap-book",
      [
        imageLayer("bi-book-page-front", "bootstrap-book-page-front", {
          a: [32, 32, 0],
          p: [32, 32, 0],
          ddd: true,
          o: animated([
            [0, 0],
            [6, 0],
            [8, 100],
            [28, 100],
            [30, 0],
            [FRAMES, 0],
          ]),
          ry: animated([
            [0, 0],
            [8, 0],
            [29, 90],
            [FRAMES, 90],
          ]),
          s: [58, 58, 100],
        }),
        imageLayer("bi-book-page-back", "bootstrap-book-page-back", {
          a: [32, 32, 0],
          p: [32, 32, 0],
          ddd: true,
          o: animated([
            [0, 0],
            [28, 0],
            [30, 100],
            [58, 100],
            [64, 0],
            [FRAMES, 0],
          ]),
          ry: animated([
            [0, 90],
            [29, 90],
            [52, 180],
            [FRAMES, 180],
          ]),
          s: [58, 58, 100],
        }),
        layer("bi-book-page-text", baseText),
        imageLayer("bi-book", "bootstrap-book", {
          a: [32, 32, 0],
          p: [32, 32, 0],
          s: [58, 58, 100],
        }),
      ],
      [
        bookPageAsset(
          "bootstrap-book-page-front",
          colors.page,
          colors.primary,
          colors.pageText,
          [
            [9.6, 5.2, 13.9],
            [9.6, 7.1, 13.2],
            [9.6, 9, 14.1],
            [9.6, 10.9, 12.8],
          ],
        ),
        bookPageAsset(
          "bootstrap-book-page-back",
          colors.pageBack,
          colors.primary,
          colors.pageText,
          [
            [9.5, 5.4, 13.5],
            [9.5, 7.3, 14],
            [9.5, 9.2, 12.9],
            [9.5, 11.1, 13.7],
          ],
        ),
        bootstrapIconAsset(
          "bootstrap-book",
          BOOTSTRAP_BOOK_PATH,
          colors.primary,
        ),
      ],
      { threeDimensional: true },
    );
  }

  function bookPageAsset(id, fillColor, outlineColor, textColor, lines) {
    const pageFill = svgColor(fillColor);
    const pageOutline = svgColor(outlineColor);
    const textStroke = svgColor(textColor);
    const textPaths = lines
      .map(
        ([startX, y, endX]) =>
          `<path d="M${startX} ${y}H${endX}" fill="none" stroke="${textStroke}" stroke-width=".42" stroke-linecap="round"/>`,
      )
      .join("");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 16 16"><path d="${BOOTSTRAP_BOOK_RIGHT_PAGE_PATH}" fill="${pageFill}" stroke="${pageOutline}" stroke-width=".3" stroke-linejoin="round"/>${textPaths}</svg>`;

    return svgAsset(id, svg);
  }

  registerAnimations([
    { factory: buildRecipesAnimation, renderer: "html" },
    { factory: buildDiagramsAnimation, renderer: "svg" },
    { factory: buildReferenceAnimation, renderer: "html" },
  ]);
})();
