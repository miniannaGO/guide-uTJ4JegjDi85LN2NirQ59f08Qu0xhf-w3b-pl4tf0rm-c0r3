(function () {
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: { value: 45, density: { enable: true, value_area: 900 } },
        color: {
          value: ["#d4a574", "#e8c97a", "#c4876e", "#4a9fd8", "#5ec4b0"],
        },
        shape: { type: "circle" },
        opacity: {
          value: 0.35,
          random: true,
          anim: {
            enable: true,
            speed: 0.3,
            opacity_min: 0.08,
            sync: false,
          },
        },
        size: {
          value: 2.5,
          random: true,
          anim: { enable: true, speed: 0.6, size_min: 0.4, sync: false },
        },
        line_linked: {
          enable: true,
          distance: 160,
          color: "#d4a574",
          opacity: 0.1,
          width: 0.8,
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: { enable: true, rotateX: 600, rotateY: 1200 },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: false },
          resize: true,
        },
        modes: { grab: { distance: 160, line_linked: { opacity: 0.3 } } },
      },
      retina_detect: true,
    });
  }

  const spotlight = document.getElementById("spotlight");
  document.addEventListener("mousemove", function (e) {
    if (spotlight) {
      spotlight.style.left = e.clientX + "px";
      spotlight.style.top = e.clientY + "px";
    }
  });

  const slides = Array.from(document.querySelectorAll(".slide"));
  const totalSlides = slides.length;
  let currentIndex = 0;
  let cleanupTimer = null;
  let fastModeTimer = null;
  let lastInputAt = 0;
  let wheelAccumulator = 0;
  let wheelResetTimer = null;

  const NORMAL_DURATION = 700;
  const FAST_DURATION = 180;
  const RAPID_INPUT_WINDOW = 400;
  const WHEEL_THRESHOLD = 65;

  const progressBar = document.getElementById("progressBar");
  const navDotsContainer = document.getElementById("navDots");
  const navCounter = document.getElementById("navCounter");

  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("span");
    dot.className = "nav-dot";
    dot.setAttribute("data-index", i);
    dot.addEventListener("click", () => requestIndex(i));
    navDotsContainer.appendChild(dot);
  }
  const dots = Array.from(document.querySelectorAll(".nav-dot"));

  function clampIndex(index) {
    return Math.max(0, Math.min(index, totalSlides - 1));
  }

  function updateUI() {
    dots.forEach((dot, i) =>
      dot.classList.toggle("active", i === currentIndex),
    );
    navCounter.textContent = `${currentIndex + 1} / ${totalSlides}`;
    progressBar.style.width = `${((currentIndex + 1) / totalSlides) * 100}%`;
  }

  function shouldUseFastMode() {
    const now = performance.now();
    const isRapid = now - lastInputAt < RAPID_INPUT_WINDOW;
    lastInputAt = now;
    return isRapid;
  }

  function setFastMode(enabled, duration) {
    document.body.classList.toggle("fast-nav", enabled);
    clearTimeout(fastModeTimer);
    if (enabled) {
      fastModeTimer = setTimeout(
        () => document.body.classList.remove("fast-nav"),
        duration + 80,
      );
    }
  }

  function cleanSlideState(duration) {
    slides.forEach((slide) => {
      slide.style.transitionDuration = `${duration}ms`;
    });
  }

  function goToSlide(index, fast = false) {
    index = clampIndex(index);
    if (index === currentIndex) return;

    const duration = fast ? FAST_DURATION : NORMAL_DURATION;
    clearTimeout(cleanupTimer);
    cleanSlideState(duration);
    setFastMode(fast, duration);

    const previousIndex = currentIndex;
    const currentSlide = slides[previousIndex];
    const nextSlide = slides[index];
    const direction = index > previousIndex ? "right" : "left";

    slides.forEach((slide) => {
      if (slide !== currentSlide && slide !== nextSlide) {
        slide.classList.remove("active", "exit-left", "exit-right");
        slide.style.transform = "";
        slide.style.opacity = "";
        slide.style.filter = "";
      }
    });

    currentSlide.classList.remove("active", "exit-left", "exit-right");
    currentSlide.classList.add(
      direction === "right" ? "exit-left" : "exit-right",
    );

    nextSlide.classList.remove("active", "exit-left", "exit-right");
    nextSlide.style.transform =
      direction === "right"
        ? "scale(0.94) translateX(60px) translateY(20px)"
        : "scale(0.94) translateX(-60px) translateY(20px)";
    nextSlide.style.opacity = "0";
    nextSlide.style.filter = "blur(8px)";

    void nextSlide.offsetWidth;

    nextSlide.classList.add("active");
    nextSlide.style.transform = "";
    nextSlide.style.opacity = "";
    nextSlide.style.filter = "";

    currentIndex = index;
    updateUI();

    cleanupTimer = setTimeout(() => {
      slides.forEach((slide, i) => {
        slide.classList.remove("exit-left", "exit-right");
        if (i !== currentIndex) slide.classList.remove("active");
        slide.style.transform = "";
        slide.style.opacity = "";
        slide.style.filter = "";
        slide.style.transitionDuration = "";
      });
    }, duration + 80);
  }

  function requestMove(direction) {
    const fast = shouldUseFastMode();
    goToSlide(currentIndex + direction, fast);
  }

  function requestIndex(index) {
    const fast = shouldUseFastMode();
    goToSlide(index, fast);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      requestMove(1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      requestMove(-1);
    } else if (e.key === "f" || e.key === "F") {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    }
  });

  document.addEventListener(
    "wheel",
    (e) => {
      if (e.ctrlKey) return;
      e.preventDefault();
      const delta =
        Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      wheelAccumulator += delta;
      clearTimeout(wheelResetTimer);
      wheelResetTimer = setTimeout(() => {
        wheelAccumulator = 0;
      }, 140);
      if (Math.abs(wheelAccumulator) < WHEEL_THRESHOLD) return;
      const direction = wheelAccumulator > 0 ? 1 : -1;
      const steps = Math.min(
        3,
        Math.max(1, Math.round(Math.abs(wheelAccumulator) / 120)),
      );
      wheelAccumulator = 0;
      const fast = shouldUseFastMode();
      goToSlide(currentIndex + direction * steps, fast);
    },
    { passive: false },
  );

  document
    .getElementById("nextBtn")
    .addEventListener("click", () => requestMove(1));
  document
    .getElementById("prevBtn")
    .addEventListener("click", () => requestMove(-1));

  let touchStartX = 0;
  document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  document.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) requestMove(1);
      else requestMove(-1);
    }
  });

  updateUI();
  slides[0].classList.add("active");
  slides[0].style.transform = "";
  slides[0].style.opacity = "1";
  slides[0].style.filter = "blur(0)";
})();
