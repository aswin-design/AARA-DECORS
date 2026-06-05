(function () {
  // Avoid duplicate init
  if (window.__aaraScrollRevealInit) return;
  window.__aaraScrollRevealInit = true;

  const root = null;
  const options = {
    root,
    rootMargin: "0px 0px -10% 0px",
    threshold: 0.1
  };

  function isProbablyLayoutControl(el) {
    if (!el) return true;
    const tag = (el.tagName || "").toLowerCase();
    if (tag === "nav" || tag === "header" || tag === "footer") return false;
    // Avoid animating the auto-scrolling track itself
    if (el.classList && (el.classList.contains("image-track") || el.classList.contains("slider") || el.classList.contains("slide"))) {
      return true;
    }
    return false;
  }

  function collectTargets() {
    // Animate common visible containers + direct content in sections.
    // We keep the selector broad but then skip some known “layout/slider” nodes.
    const containers = document.querySelectorAll(
      "header, section, footer, nav, main, .hero-content, .about-container, .about-text, .about-images, .hybrid-container, .minimal-container, .counter-content, .footer-wrapper, .decorations-container"
    );

    const directChildren = document.querySelectorAll(
      "main > *, section > *, footer > *, header > *, .container > *"
    );

    const media = document.querySelectorAll(
      "section img, header img"
    );

    const all = new Set();
    [...containers].forEach((el) => {
      if (!isProbablyLayoutControl(el)) all.add(el);
    });
    [...directChildren].forEach((el) => {
      if (!isProbablyLayoutControl(el)) all.add(el);
    });
    [...media].forEach((el) => {
      // Images can be animated; avoid huge gallery tracks by skipping if inside slider track
      const parent = el.parentElement;
      if (parent && parent.classList && parent.classList.contains("image-track")) return;
      all.add(el);
    });

    // Apply reveal class.
    all.forEach((el) => el.classList.add("reveal"));
    return [...all];
  }

  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  const targets = collectTargets();
  if (!targets.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        obs.unobserve(entry.target);
      }
    });
  }, options);

  targets.forEach((t) => obs.observe(t));
})();

