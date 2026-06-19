(() => {
  const {
    FRAMES,
    animated,
    animation,
    bootstrapIconAsset,
    closedPath,
    fill,
    group,
    imageLayer,
    layer,
    path,
    rect,
    registerAnimations,
    stroke,
    svgAsset,
    svgColor,
  } = window.GuideDocs.startPanelLottieEngine;

  const BOOTSTRAP_INTERSECT_PATH =
    "M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2zm5 10v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2v5a2 2 0 0 1-2 2zm6-8V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2V6a2 2 0 0 1 2-2z";
  const BOOTSTRAP_BOXES_PATH =
    "M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434zM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567zM7.5 9.933l-2.75 1.571v3.134l2.75-1.571zm1 3.134 2.75 1.571v-3.134L8.5 9.933zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567zm2.242-2.433V3.504L8.5 5.076V8.21zM7.5 8.21V5.076L4.75 3.504v3.134zM5.258 2.643 8 4.21l2.742-1.567L8 1.076zM15 9.933l-2.75 1.571v3.134L15 13.067zM3.75 14.638v-3.134L1 9.933v3.134z";
  const BOOTSTRAP_BOX_FILL_PATH =
    "M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.004-.001.274-.11a.75.75 0 0 1 .558 0l.274.11.004.001zm-1.374.527L8 5.962 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339Z";
  const BOOTSTRAP_TOOLS_PATH =
    "M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z";

  function buildStartAnimation(colors) {
    return animation("start-signpost", [
      layer("signpost", [
        group("pole", [
          path([
            [32, 23],
            [32, 49],
          ]),
          stroke(colors.muted, 5.6),
        ]),
        group(
          "left-sign",
          [
            path([
              [31, 25],
              [16, 25],
              [21, 20],
              [16, 25],
              [21, 30],
            ]),
            stroke(colors.primary, 3),
          ],
          {
            p: animated([
              [0, [0, 0]],
              [36, [-5, -1]],
              [FRAMES, [0, 0]],
            ]),
          },
        ),
        group(
          "right-sign",
          [
            path([
              [33, 35],
              [48, 35],
              [43, 30],
              [48, 35],
              [43, 40],
            ]),
            stroke(colors.primary, 3),
          ],
          {
            p: animated([
              [0, [0, 0]],
              [36, [5, 1]],
              [FRAMES, [0, 0]],
            ]),
          },
        ),
      ]),
    ]);
  }

  function buildFoundationsAnimation(colors) {
    const slab = (y) =>
      closedPath([
        [19, y],
        [32, y - 6],
        [45, y],
        [32, y + 6],
      ]);

    return animation("foundation-layers", [
      layer("layers", [
        group(
          "top-layer",
          [slab(23), fill(colors.primarySoft, 26), stroke(colors.primary, 2)],
          {
            p: animated([
              [0, [0, 0]],
              [36, [0, -4]],
              [FRAMES, [0, 0]],
            ]),
          },
        ),
        group(
          "middle-layer",
          [slab(32), fill(colors.primaryDeep, 18), stroke(colors.primary, 2)],
          {
            p: animated([
              [0, [0, 0]],
              [36, [0, 2]],
              [FRAMES, [0, 0]],
            ]),
          },
        ),
        group(
          "bottom-layer",
          [slab(41), fill(colors.primaryDeep, 14), stroke(colors.muted, 2)],
          {
            p: animated([
              [0, [0, 0]],
              [36, [0, 4]],
              [FRAMES, [0, 0]],
            ]),
          },
        ),
      ]),
    ]);
  }

  function buildGatewayAnimation(colors) {
    return animation(
      "gateway-bootstrap-boxes",
      [
        imageLayer("bi-boxes", "bootstrap-boxes", {
          a: [32, 32, 0],
          p: animated([
            [0, [32, 32, 0]],
            [18, [32, 32, 0]],
            [32, [27, 36, 0]],
            [52, [27, 36, 0]],
            [FRAMES, [32, 32, 0]],
          ]),
          s: [56, 56, 100],
        }),
        imageLayer("new-box", "bootstrap-box-fill", {
          a: [32, 32, 0],
          p: animated([
            [0, [47, 4, 0]],
            [18, [47, 4, 0]],
            [38, [44, 20, 0]],
            [52, [44, 20, 0]],
            [FRAMES, [47, 4, 0]],
          ]),
          o: animated([
            [0, 0],
            [16, 0],
            [22, 100],
            [54, 100],
            [62, 0],
            [FRAMES, 0],
          ]),
          r: animated([
            [0, -12],
            [18, -12],
            [38, 0],
            [FRAMES, 0],
          ]),
          s: animated([
            [0, [22, 22, 100]],
            [30, [30, 30, 100]],
            [42, [27, 27, 100]],
            [FRAMES, [22, 22, 100]],
          ]),
        }),
      ],
      [
        bootstrapIconAsset(
          "bootstrap-boxes",
          BOOTSTRAP_BOXES_PATH,
          colors.primary,
        ),
        bootstrapIconAsset(
          "bootstrap-box-fill",
          BOOTSTRAP_BOX_FILL_PATH,
          colors.primarySoft,
        ),
      ],
    );
  }

  function buildSurfaceAnimation(colors) {
    return animation("surface-layout", [
      layer("surface", [
        group("window", [
          rect(14, 16, 36, 31, 4),
          fill(colors.primaryDeep, 14),
          stroke(colors.primarySoft, 2.6),
          path([
            [18, 23],
            [46, 23],
          ]),
          stroke(colors.muted, 1.8, 78),
        ]),
        group(
          "left-panel",
          [
            rect(18, 27, 12, 15, 2),
            fill(colors.primarySoft, 34),
            stroke(colors.primary, 1.8),
          ],
          {
            p: animated([
              [0, [0, 0]],
              [36, [-4, 3]],
              [FRAMES, [0, 0]],
            ]),
          },
        ),
        group(
          "right-panel",
          [
            rect(35, 27, 10, 7, 2),
            fill(colors.primary, 44),
            stroke(colors.primarySoft, 1.6),
          ],
          {
            p: animated([
              [0, [0, 0]],
              [36, [4, -3]],
              [FRAMES, [0, 0]],
            ]),
          },
        ),
        group(
          "bottom-panel",
          [
            rect(35, 38, 10, 7, 2),
            fill(colors.muted, 38),
            stroke(colors.primarySoft, 1.6),
          ],
          {
            p: animated([
              [0, [0, 0]],
              [36, [3, 4]],
              [FRAMES, [0, 0]],
            ]),
          },
        ),
      ]),
    ]);
  }

  function buildBridgeAnimation(colors) {
    return animation(
      "bridge-bootstrap-intersect",
      [
        imageLayer("bi-intersect", "bootstrap-intersect", {
          a: [32, 32, 0],
          p: [32, 32, 0],
          o: animated([
            [0, 100],
            [7, 100],
            [9, 0],
            [53, 0],
            [57, 100],
            [FRAMES, 100],
          ]),
          s: animated([
            [0, [56, 56, 100]],
            [53, [56, 56, 100]],
            [59, [62, 62, 100]],
            [65, [56, 56, 100]],
            [FRAMES, [56, 56, 100]],
          ]),
        }),
        imageLayer("gateway-plane", "bootstrap-intersect-gateway", {
          a: [32, 32, 0],
          p: animated([
            [0, [32, 32, 0]],
            [9, [32, 32, 0]],
            [25, [25, 25, 0]],
            [33, [25, 25, 0]],
            [53, [32, 32, 0]],
            [FRAMES, [32, 32, 0]],
          ]),
          o: animated([
            [0, 0],
            [7, 0],
            [9, 100],
            [53, 100],
            [57, 0],
            [FRAMES, 0],
          ]),
          s: [56, 56, 100],
        }),
        imageLayer("surface-plane", "bootstrap-intersect-surface", {
          a: [32, 32, 0],
          p: animated([
            [0, [32, 32, 0]],
            [9, [32, 32, 0]],
            [25, [39, 39, 0]],
            [33, [39, 39, 0]],
            [53, [32, 32, 0]],
            [FRAMES, [32, 32, 0]],
          ]),
          o: animated([
            [0, 0],
            [7, 0],
            [9, 100],
            [53, 100],
            [57, 0],
            [FRAMES, 0],
          ]),
          s: [56, 56, 100],
        }),
      ],
      [
        bootstrapIconAsset(
          "bootstrap-intersect",
          BOOTSTRAP_INTERSECT_PATH,
          colors.primary,
        ),
        intersectPartAsset(
          "bootstrap-intersect-gateway",
          0.5,
          0.5,
          colors.primary,
        ),
        intersectPartAsset(
          "bootstrap-intersect-surface",
          4.5,
          4.5,
          colors.primarySoft,
        ),
      ],
    );
  }

  function buildToolsAnimation(colors) {
    return animation(
      "tools-bootstrap-icon",
      [
        imageLayer("bi-tools", "bootstrap-tools", {
          a: [32, 32, 0],
          p: [32, 32, 0],
          r: animated([
            [0, 0],
            [24, -7],
            [48, 7],
            [FRAMES, 0],
          ]),
          s: animated([
            [0, [52, 52, 100]],
            [24, [60, 60, 100]],
            [48, [56, 56, 100]],
            [FRAMES, [52, 52, 100]],
          ]),
        }),
      ],
      [
        bootstrapIconAsset(
          "bootstrap-tools",
          BOOTSTRAP_TOOLS_PATH,
          colors.primary,
        ),
      ],
    );
  }

  function intersectPartAsset(id, x, y, color) {
    const strokeColor = svgColor(color);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 16 16"><rect x="${x}" y="${y}" width="11" height="11" rx="1.5" fill="none" stroke="${strokeColor}" stroke-width="1"/></svg>`;

    return svgAsset(id, svg);
  }

  registerAnimations([
    { factory: buildStartAnimation, renderer: "svg" },
    { factory: buildFoundationsAnimation, renderer: "svg" },
    { factory: buildGatewayAnimation, renderer: "svg" },
    { factory: buildSurfaceAnimation, renderer: "svg" },
    { factory: buildBridgeAnimation, renderer: "svg" },
    { factory: buildToolsAnimation, renderer: "svg" },
  ]);
})();
