(() => {
  window.GuideDocs = window.GuideDocs || {};

  const { ANIMATION_SPEED, FRAMES, getAnimations, iconPalette } =
    window.GuideDocs.startPanelLottieEngine;
  const activeAnimations = [];

  function bootStartPanelLotties() {
    if (document.documentElement.dataset.guideStartPanelLottiesReady === "true")
      return;

    document.documentElement.dataset.guideStartPanelLottiesReady = "true";

    const routeLinks = document.querySelectorAll(
      ".guide-start-panel__route li a",
    );

    if (!window.lottie?.loadAnimation) {
      showStartPanelLottieFallbacks(routeLinks);
      return;
    }

    clearStartPanelLottieFallbacks(routeLinks);

    const animations = getAnimations();
    routeLinks.forEach((link, index) => {
      const definition = animations[index];
      const icon = link.querySelector(".guide-start-panel__icon");
      if (!definition || !icon || icon.dataset.guideLottieReady === "true")
        return;

      icon.dataset.guideLottieReady = "true";

      const mount = document.createElement("span");
      mount.className = "guide-start-panel__lottie";
      icon.appendChild(mount);

      if (definition.renderer === "html") {
        mount.style.perspective = "180px";
        mount.style.perspectiveOrigin = "50% 50%";
        mount.style.transformStyle = "preserve-3d";
      }

      let animation;
      try {
        animation = window.lottie.loadAnimation({
          container: mount,
          renderer: definition.renderer,
          loop: true,
          autoplay: false,
          animationData: definition.factory(iconPalette(icon)),
          rendererSettings: {
            preserveAspectRatio: "xMidYMid meet",
          },
        });
      } catch (error) {
        mount.remove();
        delete icon.dataset.guideLottieReady;
        showStartPanelLottieFallback(icon);
        return;
      }

      animation.addEventListener("DOMLoaded", () => {
        icon.classList.add("is-lottie-ready");
        animation.goToAndStop(0, true);
      });

      activeAnimations.push({ animation, icon, mount });

      link.addEventListener("mouseenter", () => playGuideIcon(animation));
      link.addEventListener("focus", () => playGuideIcon(animation));
      link.addEventListener("mouseleave", () => resetGuideIcon(animation));
      link.addEventListener("blur", () => resetGuideIcon(animation));
      link.addEventListener(
        "touchstart",
        () => {
          if (prefersReducedMotion()) return;

          animation.loop = true;
          animation.setSpeed(ANIMATION_SPEED);
          animation.playSegments([0, FRAMES], true);
        },
        { passive: true },
      );
    });

    bootStartPanelLottieThemeRefresh();
  }

  function showStartPanelLottieFallbacks(routeLinks) {
    routeLinks.forEach((link) => {
      const icon = link.querySelector(".guide-start-panel__icon");
      if (icon) showStartPanelLottieFallback(icon);
    });
  }

  function showStartPanelLottieFallback(icon) {
    icon.classList.remove("is-lottie-ready");
    icon.classList.add("is-lottie-fallback");
  }

  function clearStartPanelLottieFallbacks(routeLinks) {
    routeLinks.forEach((link) =>
      link
        .querySelector(".guide-start-panel__icon")
        ?.classList.remove("is-lottie-fallback"),
    );
  }

  function bootStartPanelLottieThemeRefresh() {
    if (
      document.documentElement.dataset.guideStartPanelLottieThemeReady ===
      "true"
    )
      return;

    document.documentElement.dataset.guideStartPanelLottieThemeReady = "true";

    document.addEventListener("guide:themechange", () => {
      resetStartPanelLotties();
      bootStartPanelLotties();
    });
  }

  function resetStartPanelLotties() {
    document.documentElement.dataset.guideStartPanelLottiesReady = "false";

    while (activeAnimations.length) {
      const { animation, icon, mount } = activeAnimations.pop();

      animation.destroy();
      mount.remove();
      icon.classList.remove("is-lottie-ready");
      icon.classList.remove("is-lottie-fallback");
      delete icon.dataset.guideLottieReady;
    }
  }

  function playGuideIcon(animation) {
    if (prefersReducedMotion()) return;

    animation.loop = true;
    animation.setSpeed(ANIMATION_SPEED);
    animation.goToAndPlay(0, true);
  }

  function resetGuideIcon(animation) {
    animation.loop = false;
    animation.goToAndStop(0, true);
  }

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  window.GuideDocs.startPanelLottie = {
    bootStartPanelLotties,
  };
})();
