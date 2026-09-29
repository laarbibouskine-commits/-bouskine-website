// ===== Configuration =====
// Numéro WhatsApp au format international sans "+" ni espaces (ex : "212600000000").
// Laisser vide pour masquer le bouton WhatsApp.
const WHATSAPP_NUMBER = "";
// URL d'un webhook n8n qui reçoit les messages du formulaire (POST JSON).
// Laisser vide pour ouvrir l'application email du visiteur à la place.
const N8N_WEBHOOK_URL = "";
const CONTACT_EMAIL = "laarbi.bouskine@gmail.com";

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

// ===== WhatsApp =====
const waItem = document.querySelector("[data-whatsapp]");
if (WHATSAPP_NUMBER) {
  const text = encodeURIComponent("Bonjour, je viens de votre site Bouskine Digital Solutions.");
  document.getElementById("wa-link").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
} else {
  waItem.remove();
}

// ===== Formulaire de contact =====
const form = document.getElementById("contact-form");
const status = form.querySelector(".form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));

  if (!N8N_WEBHOOK_URL) {
    const subject = encodeURIComponent(`[Site] ${data.service} — ${data.name}`);
    const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
    location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    return;
  }

  const btn = form.querySelector("button");
  btn.disabled = true;
  status.className = "form-status";
  status.textContent = "Envoi en cours…";
  try {
    const res = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, source: location.href, date: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(res.status);
    form.reset();
    status.classList.add("ok");
    status.textContent = "Merci ! Votre message a bien été envoyé. Je vous réponds très vite.";
  } catch {
    status.classList.add("err");
    status.textContent = `Oups, une erreur est survenue. Écrivez-moi directement à ${CONTACT_EMAIL}.`;
  } finally {
    btn.disabled = false;
  }
});
