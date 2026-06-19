(() => {
  window.GuideDocs = window.GuideDocs || {};

  const FRAMES = 72;
  const ANIMATION_SPEED = 2;
  const WHITE = [252, 252, 250];
  const DARK = [25, 24, 26];
  const animations = [];

  function registerAnimations(entries) {
    animations.push(...entries);
  }

  function getAnimations() {
    return animations.slice();
  }

  function iconPalette(icon) {
    const primary = parseColor(window.getComputedStyle(icon).color);
    const isLight = document.documentElement.dataset.bsTheme === "light";
    const cover = isLight
      ? mix(primary, WHITE, 0.86)
      : mix(primary, DARK, 0.72);
    const page = isLight ? mix(primary, WHITE, 0.9) : mix(primary, DARK, 0.46);
    const pageBack = isLight
      ? mix(primary, WHITE, 0.76)
      : mix(primary, DARK, 0.58);
    const pageText = isLight
      ? mix(primary, DARK, 0.26)
      : mix(primary, WHITE, 0.5);

    return {
      primary: lottieColor(primary),
      primarySoft: lottieColor(mix(primary, WHITE, 0.38)),
      primaryDeep: lottieColor(mix(primary, DARK, 0.28)),
      cover: lottieColor(cover),
      page: lottieColor(page),
      pageBack: lottieColor(pageBack),
      pageText: lottieColor(pageText),
      neutral: lottieColor(WHITE),
      muted: lottieColor(mix(primary, WHITE, 0.62)),
    };
  }

  function animation(name, layers, assets = [], options = {}) {
    return {
      v: "5.7.4",
      fr: 30,
      ip: 0,
      op: FRAMES,
      w: 64,
      h: 64,
      nm: name,
      ddd: options.threeDimensional ? 1 : 0,
      assets,
      layers,
    };
  }

  function bootstrapIconAsset(id, pathData, color) {
    const iconColor = svgColor(color);
    const paths = Array.isArray(pathData)
      ? pathData
          .map(
            (item) =>
              `<path fill="${iconColor}" ${item.attrs ?? ""} d="${item.d}"/>`,
          )
          .join("")
      : `<path fill="${iconColor}" d="${pathData}"/>`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 16 16">${paths}</svg>`;

    return svgAsset(id, svg);
  }

  function svgAsset(id, svg) {
    return {
      id,
      w: 64,
      h: 64,
      u: "",
      p: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`,
      e: 1,
    };
  }

  function imageLayer(name, refId, transform = {}) {
    const isThreeDimensional = transform.ddd === true;
    const layerTransform = {
      o: prop(transform.o ?? 100),
      p: prop(transform.p ?? [0, 0, 0]),
      a: prop(transform.a ?? [0, 0, 0]),
      s: prop(transform.s ?? [100, 100, 100]),
    };

    if (isThreeDimensional) {
      layerTransform.rx = prop(transform.rx ?? 0);
      layerTransform.ry = prop(transform.ry ?? 0);
      layerTransform.rz = prop(transform.rz ?? 0);
      layerTransform.or = prop(transform.or ?? [0, 0, 0]);
    } else {
      layerTransform.r = prop(transform.r ?? 0);
    }

    return {
      ddd: isThreeDimensional ? 1 : 0,
      ind: 1,
      ty: 2,
      nm: name,
      refId,
      sr: 1,
      ks: layerTransform,
      ao: 0,
      ip: 0,
      op: FRAMES,
      st: 0,
      bm: 0,
    };
  }

  function layer(name, shapes) {
    return {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: name,
      sr: 1,
      ks: {
        o: prop(100),
        r: prop(0),
        p: prop([0, 0, 0]),
        a: prop([0, 0, 0]),
        s: prop([100, 100, 100]),
      },
      ao: 0,
      shapes,
      ip: 0,
      op: FRAMES,
      st: 0,
      bm: 0,
    };
  }

  function group(name, items, transform = {}) {
    return {
      ty: "gr",
      nm: name,
      it: [...items, groupTransform(transform)],
    };
  }

  function groupTransform(options) {
    return {
      ty: "tr",
      p: prop(options.p ?? [0, 0]),
      a: prop(options.a ?? [0, 0]),
      s: prop(options.s ?? [100, 100]),
      r: prop(options.r ?? 0),
      o: prop(options.o ?? 100),
      sk: prop(0),
      sa: prop(0),
    };
  }

  function rect(x, y, width, height, radius = 0) {
    return {
      ty: "rc",
      p: prop([x + width / 2, y + height / 2]),
      s: prop([width, height]),
      r: prop(radius),
      nm: "rect",
    };
  }

  function ellipse(x, y, width, height) {
    return {
      ty: "el",
      p: prop([x, y]),
      s: prop([width, height]),
      nm: "ellipse",
    };
  }

  function path(points) {
    return pathShape(points, false);
  }

  function closedPath(points) {
    return pathShape(points, true);
  }

  function pathShape(points, closed) {
    return {
      ty: "sh",
      ks: prop({
        i: points.map(() => [0, 0]),
        o: points.map(() => [0, 0]),
        v: points,
        c: closed,
      }),
      nm: "path",
    };
  }

  function stroke(color, width, opacity = 100) {
    return {
      ty: "st",
      c: prop(color),
      o: prop(opacity),
      w: prop(width),
      lc: 2,
      lj: 2,
      ml: 4,
      bm: 0,
      nm: "stroke",
    };
  }

  function fill(color, opacity = 100) {
    return {
      ty: "fl",
      c: prop(color),
      o: prop(opacity),
      r: 1,
      bm: 0,
      nm: "fill",
    };
  }

  function prop(value) {
    return value?.a === 1 || value?.a === 0 ? value : { a: 0, k: value };
  }

  function animated(points) {
    return {
      a: 1,
      k: points.map(([time, value], index) => {
        const current = toKeyframeArray(value);
        const next = points[index + 1]
          ? toKeyframeArray(points[index + 1][1])
          : null;

        if (!next) return { t: time, s: current };

        return {
          t: time,
          s: current,
          e: next,
          i: { x: [0.667], y: [1] },
          o: { x: [0.333], y: [0] },
        };
      }),
    };
  }

  function toKeyframeArray(value) {
    return Array.isArray(value) ? value : [value];
  }

  function parseColor(value) {
    const srgb = value.match(/color\(srgb\s+([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)/);
    if (srgb) {
      return srgb
        .slice(1, 4)
        .map((channel) => Number.parseFloat(channel) * 255);
    }

    const match = value.match(/rgba?\(([^)]+)\)/);
    if (!match) return [69, 214, 200];

    return match[1]
      .split(/[,\s/]+/)
      .filter(Boolean)
      .slice(0, 3)
      .map((channel) => Number.parseFloat(channel))
      .map((channel) => (Number.isFinite(channel) ? channel : 0));
  }

  function mix(color, target, amount) {
    return color.map((channel, index) =>
      Math.round(channel + (target[index] - channel) * amount),
    );
  }

  function lottieColor(color) {
    return [
      Math.max(0, Math.min(1, color[0] / 255)),
      Math.max(0, Math.min(1, color[1] / 255)),
      Math.max(0, Math.min(1, color[2] / 255)),
      1,
    ];
  }

  function svgColor(color) {
    return `#${color
      .slice(0, 3)
      .map((channel) =>
        Math.round(Math.max(0, Math.min(1, channel)) * 255)
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")}`;
  }

  window.GuideDocs.startPanelLottieEngine = {
    ANIMATION_SPEED,
    FRAMES,
    animated,
    animation,
    bootstrapIconAsset,
    closedPath,
    ellipse,
    fill,
    getAnimations,
    group,
    iconPalette,
    imageLayer,
    layer,
    path,
    rect,
    registerAnimations,
    stroke,
    svgAsset,
    svgColor,
  };
})();
