// ===== Configuration =====
// URL d'un webhook n8n qui reçoit les messages du formulaire (POST JSON).
// Laisser vide pour ouvrir l'application email du visiteur à la place.
const N8N_WEBHOOK_URL = "";
const CONTACT_EMAIL = "contact@bouskine.com";

// ===== Année du footer =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Menu mobile =====
const menuBtn = document.querySelector(".menu-btn");
const links = document.querySelector(".links");
menuBtn.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  })
);

// ===== Bordure de la nav au scroll =====
const nav = document.querySelector(".nav");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 10), { passive: true });

// ===== Animations d'apparition =====
// fx.js (Motion) handles this when it is active; otherwise fall back to the CSS reveal.
if (!window.__fx) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      }),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

// ===== Formulaire de contact (page d'accueil uniquement) =====
const form = document.getElementById("contact-form");
const status = form?.querySelector(".form-status");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));

  const t = window.t || ((k) => k);
  if (!N8N_WEBHOOK_URL) {
    const subject = encodeURIComponent(`[Site] ${data.service} — ${data.name}`);
    const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
    location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    return;
  }

  const btn = form.querySelector("button");
  btn.disabled = true;
  status.className = "form-status";
  status.textContent = t("form.sending");
  try {
    const res = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, lang: window.getLang?.(), source: location.href, date: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(res.status);
    form.reset();
    status.classList.add("ok");
    status.textContent = t("form.ok");
  } catch {
    status.classList.add("err");
    status.textContent = t("form.err").replace("{email}", CONTACT_EMAIL);
  } finally {
    btn.disabled = false;
  }
});

// ===== Slider de démos =====
(() => {
  const slides = document.getElementById("slides");
  if (!slides) return;
  const items = [...slides.children];
  const dots = document.getElementById("dots");
  items.forEach((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", `${i + 1} / ${items.length}`);
    b.addEventListener("click", () => go(i));
    dots.appendChild(b);
  });
  let cur = 0;
  const mark = () => [...dots.children].forEach((b, i) => b.setAttribute("aria-current", String(i === cur)));
  const go = (i) => {
    cur = (i + items.length) % items.length;
    slides.scrollTo({ left: items[cur].offsetLeft - slides.offsetLeft, behavior: "smooth" });
    mark();
  };
  document.getElementById("prev").addEventListener("click", () => go(cur - 1));
  document.getElementById("next").addEventListener("click", () => go(cur + 1));
  // keep the dots in sync when the visitor swipes
  let tick;
  slides.addEventListener("scroll", () => {
    clearTimeout(tick);
    tick = setTimeout(() => {
      const w = items[0].getBoundingClientRect().width + 20;
      cur = Math.min(items.length - 1, Math.round(Math.abs(slides.scrollLeft) / w));
      mark();
    }, 80);
  }, { passive: true });
  slides.tabIndex = 0;
  slides.addEventListener("keydown", (e) => {
    const rtl = document.documentElement.dir === "rtl" ? -1 : 1;
    if (e.key === "ArrowRight") go(cur + rtl);
    if (e.key === "ArrowLeft") go(cur - rtl);
  });

  // scale each 1280px-wide iframe to the width of its frame
  const fit = () => document.querySelectorAll(".frame").forEach((f) => {
    f.firstElementChild.style.transform = `scale(${f.clientWidth / 1280})`;
  });
  fit();
  addEventListener("resize", fit);
  if ("ResizeObserver" in window) items.forEach((it) => new ResizeObserver(fit).observe(it));
  mark();
})();

// ===== Mega menu des démos (clic / clavier / tactile) =====
(() => {
  const box = document.querySelector(".has-mega");
  if (!box) return;
  const btn = box.querySelector(".mega-btn");
  const set = (open) => { box.classList.toggle("open", open); btn.setAttribute("aria-expanded", String(open)); };
  btn.addEventListener("click", (e) => { e.stopPropagation(); set(!box.classList.contains("open")); });
  document.addEventListener("click", (e) => { if (!box.contains(e.target)) set(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { set(false); btn.focus(); } });
})();
