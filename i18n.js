// ===== Traductions FR / EN / AR =====
// Le français est la langue source : il est lu directement dans le HTML.
// Les éléments traduits portent data-i18n (contenu), data-i18n-ph (placeholder) ou data-i18n-aria (aria-label).
// Les pages de contenu (à propos, légal) utilisent des blocs <div data-lang="fr|en|ar">.
(function () {
  const SUPPORTED = ["fr", "en", "ar"];
  const WA_NUMBER = "212687184542";

  // Pays → langue (quand le visiteur n'a pas encore choisi)
  const ARAB_COUNTRIES = ["SA", "AE", "QA", "KW", "BH", "OM", "EG", "JO", "LB", "IQ", "SY", "YE", "PS", "LY", "SD", "MR"];
  const FRENCH_COUNTRIES = ["FR", "BE", "CH", "LU", "MC", "MA", "DZ", "TN", "SN", "CI", "CM", "ML", "BF", "NE", "TG", "BJ", "GA", "CD", "CG", "MG", "HT"];

  const T = {
    fr: {
      "wa.msg": "Bonjour, je viens de votre site Bouskine Digital Solutions.",
      "form.sending": "Envoi en cours…",
      "form.ok": "Merci ! Votre message a bien été envoyé. Je vous réponds très vite.",
      "form.err": "Oups, une erreur est survenue. Écrivez-moi directement à {email}.",
      "meta./.title": "Bouskine Digital Solutions — Automatisation n8n & IA",
      "meta./a-propos.title": "À propos — Bouskine Digital Solutions",
      "meta./confidentialite.title": "Politique de confidentialité — Bouskine Digital Solutions",
      "meta./conditions.title": "Conditions d'utilisation — Bouskine Digital Solutions",
    },

    en: {
      "meta./.title": "Bouskine Digital Solutions — n8n & AI Automation",
      "meta./.desc": "Bouskine Digital Solutions: automate your business processes with n8n and AI, websites, digital marketing and business solutions. Automate • Grow • Focus.",
      "meta./a-propos.title": "About — Bouskine Digital Solutions",
      "meta./confidentialite.title": "Privacy Policy — Bouskine Digital Solutions",
      "meta./conditions.title": "Terms of Use — Bouskine Digital Solutions",

      "nav.services": "Services",
      "nav.projects": "Projects",
      "nav.examples": "Examples",
      "nav.process": "Process",
      "nav.about": "About",
      "nav.contact": "Contact",

      "hero.title": 'Automate your business, <span class="grad">focus on what matters.</span>',
      "hero.lead": "I help businesses and entrepreneurs save time by automating their repetitive tasks with <strong>n8n</strong> and <strong>artificial intelligence</strong> — leads, emails, CRM, WhatsApp, social media, invoices and more.",
      "hero.cta1": "Get a free quote",
      "hero.cta2": "See my services",
      "hero.stat1": "Automation expert",
      "hero.stat2k": "AI",
      "hero.stat2": "Agents & chatbots",
      "hero.stat3": "Your workflows never stop",

      "flow.head": "workflow · new lead",
      "flow.n1": "Web form",
      "flow.n2": "AI qualification",
      "flow.foot": "✓ Lead handled automatically — no manual data entry",

      "services.title": "What I can do for you",
      "services.sub": "Tailor-made digital solutions to automate, grow and simplify your business.",
      "s1.t": "Automation & AI",
      "s1.p": "n8n workflows that connect your tools (Gmail, Google Sheets, CRM, WhatsApp, Slack…) and use AI to sort, reply and decide for you.",
      "s1.l": "<li>Custom n8n workflows</li><li>AI agents & chatbots</li><li>API integrations</li>",
      "s2.t": "Marketing & Social Media",
      "s2.p": "Automatic content publishing, AI-generated posts, lead tracking and campaign reporting.",
      "s2.l": "<li>Automatic scheduling</li><li>AI-generated content</li><li>Performance tracking</li>",
      "s3.t": "Websites & Apps",
      "s3.p": "Modern, fast, mobile-friendly websites connected to your automations (forms, bookings, payments).",
      "s3.l": "<li>Showcase sites & landing pages</li><li>Smart forms</li><li>Hosting & domain</li>",
      "s4.t": "Business Solutions",
      "s4.p": "Automation of your internal processes: invoicing, customer follow-ups, order management, onboarding and dashboards.",
      "s4.l": "<li>Invoices & reminders</li><li>Order management</li><li>Dashboards & reports</li>",
      "s5.t": "Ideas to Results",
      "s5.p": "Process audit, consulting and support: together we identify what can be automated and put it in place.",
      "s5.l": "<li>Free audit</li><li>Consulting & strategy</li><li>Training & support</li>",

      "projects.title": "n8n workflows in production",
      "projects.sub": "A few automations I designed that run every single day.",
      "p1.aria": "Video of the automatic posting n8n workflow running",
      "p1.t": "Automatic Facebook & Instagram posting",
      "p1.p": "Every day at a set time, the workflow picks a target audience, analyzes trending Instagram hashtags, generates an image with AI, writes the post, then publishes it automatically to the Facebook Page and Instagram account — and sends a WhatsApp notification when done.",
      "p2.aria": "Video of the lead generation n8n workflow running",
      "p2.tag": "Prospecting & Leads",
      "p2.t": "Automated B2B lead generation",
      "p2.p": "Every Monday, the workflow searches Google Maps for target businesses across several cities, merges and qualifies the results, removes leads already known, then AI writes a personalized outreach message for each one. New leads are saved to the database and a weekly summary is emailed.",
      "p3.aria": "Workflow diagram: a manager agent coordinates 7 AI agents, then the article is written, illustrated, published on WordPress and optimized with Rank Math",
      "p3.n1": "AI agent",
      "p3.n2": "Writing",
      "p3.n3t": "Featured image",
      "p3.n3": "AI generation",
      "p3.n4": "Publishing",
      "p3.agents": "<span>🔎 Keywords</span><span>🕵️ Competitors</span><span>🌐 Perplexity</span><span>🏷️ Titles</span><span>📝 Descriptions</span><span>🔗 Internal links</span><span>🎨 Gemini</span>",
      "p3.t": "AI SEO blogging agent for WordPress",
      "p3.p": "A team of AI agents that researches keywords, analyzes competitor articles, writes the article, creates the featured image, adds internal links, then publishes on WordPress with optimized Rank Math SEO.",
      "p3.stack": "AI agents",

      "ex.title": "Automations I build",
      "ex.sub": "Concrete examples of workflows that save hours every week.",
      "u1.t": "💬 Automatic WhatsApp replies",
      "u1.p": "Every new message gets an instant AI reply, and the lead is saved to your CRM.",
      "u2.t": "📥 Lead capture & qualification",
      "u2.p": "Form → AI qualification → Google Sheets / CRM → notification to your team.",
      "u3.t": "🧾 Automatic invoicing",
      "u3.p": "PDF invoices generated, emailed, and unpaid ones followed up automatically.",
      "u4.t": "📱 Social media publishing",
      "u4.p": "AI-created posts scheduled and published on Facebook, Instagram and LinkedIn.",
      "u5.t": "📧 Smart email sorting",
      "u5.p": "AI reads, sorts and answers simple emails, and only alerts you for what matters.",
      "u6.t": "📊 Automatic reports",
      "u6.p": "A summary of your sales and stats sent every morning by email or WhatsApp.",

      "process.title": "How we work together",
      "st1.t": "Discovery",
      "st1.p": "We talk about your business and the tasks that take up your time.",
      "st2.t": "Proposal",
      "st2.p": "I propose a clear solution with a fixed timeline and price.",
      "st3.t": "Build",
      "st3.p": "I build and test your workflows with your real tools.",
      "st4.t": "Delivery & support",
      "st4.p": "Go-live, training and support after delivery.",

      "about.name": "Laarbi Bouskine",
      "about.role": "Founder of Bouskine Digital Solutions · n8n & AI automation specialist",
      "about.p": "Passionate about automation and artificial intelligence, I help businesses break free from repetitive tasks so they can focus on growth. Every workflow I build is designed to be simple, reliable and profitable.",
      "about.more": "Learn more →",

      "contact.title": "Let's talk about your project",
      "contact.sub": "Tell me what you'd like to automate and I'll get back to you quickly with a proposal.",
      "form.name": "Name",
      "form.service": "Service",
      "form.other": "Other",
      "form.message": "Message",
      "form.ph": "E.g. I want to reply automatically to my customers on WhatsApp…",
      "form.send": "Send message",
      "form.sending": "Sending…",
      "form.ok": "Thank you! Your message has been sent. I'll get back to you very soon.",
      "form.err": "Oops, something went wrong. Email me directly at {email}.",

      "footer.tag": "n8n & AI automation for businesses.",
      "footer.nav": "Navigation",
      "footer.company": "Company",
      "footer.privacy": "Privacy Policy",
      "footer.terms": "Terms of Use",
      "footer.loc": "Morocco · Clients worldwide",
      "footer.rights": "All rights reserved.",
      "footer.privacyShort": "Privacy",
      "footer.termsShort": "Terms",

      "wa.aria": "Chat on WhatsApp",
      "wa.msg": "Hello, I'm reaching out from your Bouskine Digital Solutions website.",
    },

    ar: {
      "meta./.title": "Bouskine Digital Solutions — أتمتة n8n والذكاء الاصطناعي",
      "meta./.desc": "Bouskine Digital Solutions: أتمتة عمليات شركتك باستخدام n8n والذكاء الاصطناعي، مواقع إلكترونية، تسويق رقمي وحلول للأعمال.",
      "meta./a-propos.title": "من نحن — Bouskine Digital Solutions",
      "meta./confidentialite.title": "سياسة الخصوصية — Bouskine Digital Solutions",
      "meta./conditions.title": "شروط الاستخدام — Bouskine Digital Solutions",

      "nav.services": "الخدمات",
      "nav.projects": "أعمالنا",
      "nav.examples": "أمثلة",
      "nav.process": "طريقة العمل",
      "nav.about": "من نحن",
      "nav.contact": "تواصل معنا",

      "hero.title": 'أتمِت أعمالك، <span class="grad">وركّز على ما يهمّ حقًا.</span>',
      "hero.lead": "أساعد الشركات ورواد الأعمال على توفير الوقت عبر أتمتة المهام المتكررة باستخدام <strong>n8n</strong> و<strong>الذكاء الاصطناعي</strong> — العملاء المحتملون، البريد الإلكتروني، CRM، واتساب، وسائل التواصل الاجتماعي، الفواتير والمزيد.",
      "hero.cta1": "اطلب عرض سعر مجاني",
      "hero.cta2": "اكتشف خدماتي",
      "hero.stat1": "خبير أتمتة",
      "hero.stat2k": "AI",
      "hero.stat2": "وكلاء ذكيون وروبوتات محادثة",
      "hero.stat3": "سير عملك لا يتوقف",

      "flow.head": "workflow · عميل جديد",
      "flow.n1": "نموذج الموقع",
      "flow.n2": "تأهيل بالذكاء الاصطناعي",
      "flow.foot": "✓ معالجة العميل تلقائيًا — بدون أي إدخال يدوي",

      "services.title": "ما الذي يمكنني فعله لك",
      "services.sub": "حلول رقمية مصممة خصيصًا لأتمتة نشاطك وتطويره وتبسيطه.",
      "s1.t": "الأتمتة والذكاء الاصطناعي",
      "s1.p": "إنشاء سير عمل n8n يربط أدواتك (Gmail، Google Sheets، CRM، واتساب، Slack…) ويستخدم الذكاء الاصطناعي للفرز والرد واتخاذ القرار بدلًا منك.",
      "s1.l": "<li>سير عمل n8n حسب الطلب</li><li>وكلاء ذكيون وروبوتات محادثة</li><li>تكامل الـ API</li>",
      "s2.t": "التسويق ووسائل التواصل",
      "s2.p": "نشر تلقائي للمحتوى، إنشاء منشورات بالذكاء الاصطناعي، متابعة العملاء المحتملين وتقارير الحملات.",
      "s2.l": "<li>جدولة تلقائية</li><li>محتوى مُنشأ بالذكاء الاصطناعي</li><li>متابعة الأداء</li>",
      "s3.t": "المواقع والتطبيقات",
      "s3.p": "مواقع تعريفية حديثة وسريعة ومتوافقة مع الهاتف، مرتبطة بأتمتتك (نماذج، حجوزات، مدفوعات).",
      "s3.l": "<li>مواقع تعريفية وصفحات هبوط</li><li>نماذج ذكية</li><li>الاستضافة والنطاق</li>",
      "s4.t": "حلول الأعمال",
      "s4.p": "أتمتة عملياتك الداخلية: الفوترة، تذكير العملاء، إدارة الطلبات، استقبال العملاء ولوحات المتابعة.",
      "s4.l": "<li>الفواتير والتذكيرات</li><li>إدارة الطلبات</li><li>لوحات متابعة وتقارير</li>",
      "s5.t": "من الفكرة إلى النتيجة",
      "s5.p": "تدقيق عملياتك، استشارة ومرافقة: نحدد معًا ما يمكن أتمتته ونضعه حيز التنفيذ.",
      "s5.l": "<li>تدقيق مجاني</li><li>استشارة واستراتيجية</li><li>تدريب ودعم</li>",

      "projects.title": "سير عمل n8n قيد التشغيل",
      "projects.sub": "بعض الأتمتة التي صممتها وتعمل كل يوم.",
      "p1.aria": "فيديو لسير عمل n8n للنشر التلقائي أثناء التشغيل",
      "p1.t": "النشر التلقائي على فيسبوك وإنستغرام",
      "p1.p": "كل يوم في وقت محدد، يختار سير العمل جمهورًا مستهدفًا، ويحلل الوسوم الرائجة على إنستغرام، ويُنشئ صورة بالذكاء الاصطناعي، ويكتب المنشور، ثم ينشره تلقائيًا على صفحة فيسبوك وحساب إنستغرام — ويرسل إشعارًا عبر واتساب عند الانتهاء.",
      "p2.aria": "فيديو لسير عمل n8n لجلب العملاء المحتملين أثناء التشغيل",
      "p2.tag": "التنقيب والعملاء المحتملون",
      "p2.t": "جلب عملاء B2B تلقائيًا",
      "p2.p": "كل يوم اثنين، يبحث سير العمل في خرائط Google عن الشركات المستهدفة في عدة مدن، ويدمج النتائج ويؤهلها، ويستبعد العملاء المعروفين مسبقًا، ثم يكتب الذكاء الاصطناعي رسالة تواصل مخصصة لكل عميل. تُحفظ البيانات الجديدة في قاعدة البيانات ويُرسل ملخص أسبوعي بالبريد الإلكتروني.",
      "p3.aria": "مخطط سير العمل: وكيل مدير ينسق 7 وكلاء ذكاء اصطناعي، ثم يُكتب المقال ويُرفق بصورة ويُنشر على ووردبريس ويُحسَّن بـ Rank Math",
      "p3.n1": "وكيل ذكي",
      "p3.n2": "الكتابة",
      "p3.n3t": "الصورة البارزة",
      "p3.n3": "توليد بالذكاء الاصطناعي",
      "p3.n4": "النشر",
      "p3.agents": "<span>🔎 الكلمات المفتاحية</span><span>🕵️ المنافسون</span><span>🌐 Perplexity</span><span>🏷️ العناوين</span><span>📝 الأوصاف</span><span>🔗 الروابط الداخلية</span><span>🎨 Gemini</span>",
      "p3.t": "وكيل ذكاء اصطناعي لتدوين SEO على ووردبريس",
      "p3.p": "فريق من وكلاء الذكاء الاصطناعي يبحث عن الكلمات المفتاحية، ويحلل مقالات المنافسين، ويكتب المقال، ويُنشئ الصورة البارزة، ويضيف الروابط الداخلية، ثم ينشر على ووردبريس مع تحسين SEO عبر Rank Math.",
      "p3.stack": "وكلاء ذكيون",

      "ex.title": "أتمتة أقوم ببنائها",
      "ex.sub": "أمثلة عملية لسير عمل يوفّر ساعات كل أسبوع.",
      "u1.t": "💬 ردود واتساب تلقائية",
      "u1.p": "كل رسالة جديدة تتلقى ردًا فوريًا بالذكاء الاصطناعي، ويُسجَّل العميل في نظام CRM.",
      "u2.t": "📥 جمع العملاء المحتملين وتأهيلهم",
      "u2.p": "نموذج ← تأهيل بالذكاء الاصطناعي ← Google Sheets / CRM ← إشعار لفريقك.",
      "u3.t": "🧾 فوترة تلقائية",
      "u3.p": "إنشاء فواتير PDF وإرسالها بالبريد ومتابعة غير المدفوعة تلقائيًا.",
      "u4.t": "📱 النشر على وسائل التواصل",
      "u4.p": "إنشاء منشورات بالذكاء الاصطناعي ونشرها المجدول على فيسبوك وإنستغرام ولينكدإن.",
      "u5.t": "📧 فرز ذكي للبريد الإلكتروني",
      "u5.p": "يقرأ الذكاء الاصطناعي الرسائل ويصنفها ويرد على البسيطة منها، وينبهك فقط للمهم.",
      "u6.t": "📊 تقارير تلقائية",
      "u6.p": "ملخص لمبيعاتك وإحصائياتك يُرسل كل صباح عبر البريد أو واتساب.",

      "process.title": "كيف نعمل معًا",
      "st1.t": "النقاش",
      "st1.p": "نتحدث عن نشاطك والمهام التي تستهلك وقتك.",
      "st2.t": "العرض",
      "st2.p": "أقترح عليك حلًا واضحًا بمدة وسعر ثابتين.",
      "st3.t": "البناء",
      "st3.p": "أبني سير العمل وأختبره باستخدام أدواتك الحقيقية.",
      "st4.t": "التسليم والمتابعة",
      "st4.p": "التشغيل الفعلي، التدريب والدعم بعد التسليم.",

      "about.name": "العربي بوسكين",
      "about.role": "مؤسس Bouskine Digital Solutions · متخصص في أتمتة n8n والذكاء الاصطناعي",
      "about.p": "شغوف بالأتمتة والذكاء الاصطناعي، أساعد الشركات على التخلص من المهام المتكررة للتركيز على نموها. كل سير عمل أبنيه مصمم ليكون بسيطًا وموثوقًا ومربحًا.",
      "about.more": "اعرف المزيد ←",

      "contact.title": "لنتحدث عن مشروعك",
      "contact.sub": "صِف لي ما تريد أتمتته، وسأرد عليك بسرعة بعرض مناسب.",
      "form.name": "الاسم",
      "form.service": "الخدمة",
      "form.other": "أخرى",
      "form.message": "الرسالة",
      "form.ph": "مثال: أريد الرد تلقائيًا على عملائي في واتساب…",
      "form.send": "إرسال الرسالة",
      "form.sending": "جارٍ الإرسال…",
      "form.ok": "شكرًا! تم إرسال رسالتك بنجاح، وسأرد عليك قريبًا جدًا.",
      "form.err": "عذرًا، حدث خطأ. راسلني مباشرة على {email}.",

      "footer.tag": "أتمتة n8n والذكاء الاصطناعي للشركات.",
      "footer.nav": "روابط",
      "footer.company": "الشركة",
      "footer.privacy": "سياسة الخصوصية",
      "footer.terms": "شروط الاستخدام",
      "footer.loc": "المغرب · عملاء حول العالم",
      "footer.rights": "جميع الحقوق محفوظة.",
      "footer.privacyShort": "الخصوصية",
      "footer.termsShort": "الشروط",

      "wa.aria": "تواصل عبر واتساب",
      "wa.msg": "مرحبًا، أتواصل معكم من موقع Bouskine Digital Solutions.",
    },
  };

  const readSaved = () => { try { return localStorage.getItem("lang"); } catch { return null; } };
  const save = (l) => { try { localStorage.setItem("lang", l); } catch {} };
  const path = () => location.pathname.replace(/\.html$/, "").replace(/\/index$/, "/") || "/";

  let current = "fr";
  const original = new Map();
  const remember = (el, key, value) => { if (!original.has(el)) original.set(el, {}); const o = original.get(el); if (!(key in o)) o[key] = value; return o[key]; };

  window.t = (key) => (T[current] && T[current][key]) ?? T.fr[key] ?? key;
  window.getLang = () => current;

  function apply(lang) {
    if (!SUPPORTED.includes(lang)) lang = "fr";
    current = lang;
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
    const dict = T[lang];

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const fr = remember(el, "html", el.innerHTML);
      el.innerHTML = lang === "fr" ? fr : dict[el.dataset.i18n] ?? fr;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      const fr = remember(el, "ph", el.placeholder);
      el.placeholder = lang === "fr" ? fr : dict[el.dataset.i18nPh] ?? fr;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const fr = remember(el, "aria", el.getAttribute("aria-label"));
      el.setAttribute("aria-label", lang === "fr" ? fr : dict[el.dataset.i18nAria] ?? fr);
    });
    document.querySelectorAll("[data-lang]").forEach((el) => { el.hidden = el.dataset.lang !== lang; });
    document.querySelectorAll("[data-lang-btn]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.langBtn === lang)));

    const text = encodeURIComponent(window.t("wa.msg"));
    document.querySelectorAll(".wa-link").forEach((a) => { a.href = `https://wa.me/${WA_NUMBER}?text=${text}`; });

    const titleEl = document.querySelector("title");
    const descEl = document.querySelector('meta[name="description"]');
    const frTitle = remember(titleEl, "title", titleEl.textContent);
    const frDesc = descEl ? remember(descEl, "desc", descEl.content) : "";
    titleEl.textContent = lang === "fr" ? frTitle : dict[`meta.${path()}.title`] ?? frTitle;
    if (descEl) descEl.content = lang === "fr" ? frDesc : dict[`meta.${path()}.desc`] ?? frDesc;

    document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
  }

  // Les robots (Google, Bing, aperçus LinkedIn…) voient toujours la version française de référence.
  const isBot = /bot|crawl|spider|slurp|lighthouse|facebookexternalhit|linkedin|embedly|preview/i.test(navigator.userAgent);

  async function detect() {
    if (isBot) return "fr";
    const browser = (navigator.languages || [navigator.language || ""]).map((l) => l.slice(0, 2).toLowerCase());
    // Une préférence explicite du navigateur pour l'arabe ou le français l'emporte.
    if (browser[0] === "ar" || browser[0] === "fr") return browser[0];
    let country = null;
    try {
      const res = await fetch("/api/geo", { cache: "no-store" });
      if (res.ok) country = (await res.json()).country;
    } catch {}
    if (country) {
      if (ARAB_COUNTRIES.includes(country)) return "ar";
      if (FRENCH_COUNTRIES.includes(country)) return "fr";
      return "en";
    }
    return SUPPORTED.find((l) => browser.includes(l)) || "en";
  }

  // Applique tôt la langue mémorisée pour éviter un flash de mauvaise direction.
  const saved = readSaved();
  if (saved === "ar") { document.documentElement.lang = "ar"; document.documentElement.dir = "rtl"; }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-lang-btn]").forEach((b) =>
      b.addEventListener("click", () => { save(b.dataset.langBtn); apply(b.dataset.langBtn); })
    );
    if (SUPPORTED.includes(saved)) apply(saved);
    else {
      apply("fr");
      detect().then((l) => { if (l !== current && !readSaved()) apply(l); });
    }
  });
})();
