// Motion (the engine behind Framer Motion): scroll reveals, staggered entrances, spring hovers.
// Loaded before script.js. If Motion fails to load or the visitor prefers reduced motion, script.js falls back to the CSS reveal.
(() => {
  const M = window.Motion;
  if (!M || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const { animate, inView, hover } = M;
  const ease = [0.22, 1, 0.36, 1];
  window.__fx = true;
  document.documentElement.classList.add("fx");

  const nav = document.querySelector(".nav");
  if (nav) animate(nav, { opacity: [0, 1], y: [-16, 0] }, { duration: 0.6, ease });

  // .reveal elements are hidden by CSS; fade + rise when scrolled into view, siblings staggered
  const seen = new Map();
  document.querySelectorAll(".reveal").forEach((el) => {
    const i = seen.get(el.parentElement) || 0;
    seen.set(el.parentElement, i + 1);
    inView(el, () => {
      animate(el, { opacity: [0, 1], y: [28, 0] }, { duration: 0.8, delay: Math.min(i, 4) * 0.09, ease });
    }, { amount: 0.12 });
  });

  // spring hover on buttons and cards
  const spring = { type: "spring", stiffness: 320, damping: 22 };
  hover(".btn", (el) => {
    animate(el, { y: -2, scale: 1.03 }, spring);
    return () => animate(el, { y: 0, scale: 1 }, spring);
  });
  hover(".card, .post-card", (el) => {
    animate(el, { y: -6 }, spring);
    return () => animate(el, { y: 0 }, spring);
  });
})();
