// Génère la page JobProof en 3 langues : /jobproof (FR), /nl/jobproof, /en/jobproof.
// Usage : node build-jobproof.mjs   (puis git add/commit/push)
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

// Version, APK, empreinte et taille sont dans jobproof-release.json (à mettre à jour à chaque nouvelle build).
const R = JSON.parse(readFileSync("jobproof-release.json", "utf8"));
const APK = R.apk;
const SHA = R.sha256;
const WA = "https://wa.me/212687184542";

const PATHS = { fr: "/jobproof", nl: "/nl/jobproof", en: "/en/jobproof" };
const FILES = { fr: "jobproof.html", nl: "nl/jobproof.html", en: "en/jobproof.html" };

const T = {
  fr: {
    lang: "fr", locale: "fr_BE",
    title: "JobProof — Rapports d'intervention pour artisans | Bouskine Digital Solutions",
    desc: "JobProof : l'application Android et iPhone qui permet aux artisans (plombiers, électriciens, chauffagistes…) de créer un rapport d'intervention avec photos, signature du client et PDF, et de l'envoyer par WhatsApp. Version bêta gratuite.",
    ogTitle: "JobProof — Rapports d'intervention pour artisans",
    ogDesc: "Photos avant/après, signature du client, PDF professionnel, TVA belge et envoi par WhatsApp. Version bêta gratuite pour Android et iPhone.",
    nav: ["Services", "Réalisations", "À propos", "Blog", "Contact"], blog: "/blog",
    badge: "Version bêta · Android &amp; iPhone · Gratuit",
    h1: "JobProof — vos rapports d'intervention, sans paperasse",
    lead: "L'application pour plombiers, électriciens, chauffagistes et autres artisans : photos avant/après, signature du client, PDF professionnel à votre nom, et envoi en un geste par WhatsApp.",
    btnDl: "Télécharger pour Android (APK)", btnIos: "Ouvrir sur iPhone (iOS)", btnHow: "Comment l'installer ?",
    meta: `Android : version ${R.version} · ${R.sizeMb} Mo · Android 6 ou plus récent · ${R.date.fr}<br>iPhone : application web (Safari), aucune installation depuis l'App Store`, sha: "Empreinte SHA-256",
    h2Features: "Ce que fait JobProof",
    cards: [
      ["Rapport en 5 étapes", "Client, travail effectué, photos, prix, signature. Un brouillon est sauvegardé automatiquement."],
      ["Photos avant / après", "Prenez les photos depuis l'application ou choisissez-les dans la galerie. Elles figurent dans le PDF."],
      ["Signature du client", "Le client signe du doigt sur votre téléphone : preuve de passage et de réception des travaux."],
      ["PDF professionnel", "Votre nom, votre logo, votre numéro de TVA, le détail des prix, les photos et la signature."],
      ["Prix et TVA belge", "Taux horaire, lignes de matériel, déplacement, forfaits. TVA à 0 %, 6 %, 12 % ou 21 %. Total HTVA, TVA et TTC calculés pour vous."],
      ["Envoi par WhatsApp", "Ouvrez la conversation du client avec un message prêt, puis partagez le PDF par WhatsApp, e-mail ou Drive."],
      ["Fonctionne hors ligne", "Pas besoin d'Internet sur le chantier : tout est enregistré sur votre téléphone."],
      ["Clients et historique", "Fiche client, historique des interventions, recherche, et rappels pour les brouillons ou rapports non envoyés."],
    ],
    h2Trades: "Pour quels métiers ?",
    trades: "Plomberie, électricité, chauffage et climatisation, peinture, menuiserie, carrelage, toiture, jardinage, nettoyage, informatique… Chaque intervention reçoit l'icône de son métier. Toute activité de dépannage ou d'installation chez un particulier ou une entreprise s'y prête.",
    h2Install: "Installer l'application", androidH3: "Sur Android", iosH3: "Sur iPhone (iOS)",
    steps: [
      "<strong>Téléchargez l'APK</strong> avec le bouton ci-dessus, depuis le navigateur de votre téléphone (Chrome).",
      "<strong>Ouvrez le fichier</strong> téléchargé. Si Android demande l'autorisation « Installer des applications inconnues », activez-la pour Chrome.",
      "<strong>Appuyez sur Installer.</strong> Si Google Play Protect affiche un avertissement, choisissez « Installer quand même » : l'application n'est pas encore publiée sur le Play Store.",
      "<strong>Ouvrez JobProof</strong>, puis renseignez votre entreprise, votre logo et votre taux horaire dans l'onglet <em>Profil</em>.",
    ],
    noteB: "Version bêta.", noteT: " JobProof est en test avec des artisans en Belgique. Vous pouvez rencontrer des défauts. Vos retours nous aident à l'améliorer : dites-nous ce qui manque, ce qui bloque et ce que vous aimeriez.",
    iosSteps: [
      "Touchez le bouton <strong>« Ouvrir sur iPhone (iOS) »</strong> ci-dessus (ou allez sur <strong>www.bouskine.com/app</strong>) avec <strong>Safari</strong>.",
      "Touchez le bouton <strong>Partager</strong> (le carré avec une flèche) en bas de l'écran.",
      "Choisissez <strong>Sur l'écran d'accueil</strong>, puis <strong>Ajouter</strong>.",
      "Ouvrez <strong>JobProof</strong> depuis l'écran d'accueil : l'application s'ouvre en plein écran comme une application normale. Autorisez l'appareil photo lorsque l'iPhone le demande.",
    ],
    iosNote: "Sur iPhone, JobProof est installé comme application web : pas de téléchargement sur l'App Store pour l'instant. Après la première ouverture, elle fonctionne aussi sans Internet. Particularités : pas de notifications de rappel, et le PDF s'ouvre via la fenêtre d'impression d'iOS (utilisez ensuite « Partager » pour l'enregistrer ou l'envoyer). Les données sont stockées dans Safari sur votre iPhone : ne supprimez pas les données de site et conservez vos PDF importants.",
    h2Privacy: "Vos données et votre vie privée",
    privacy: [
      "Pas de compte, pas d'inscription. L'application <strong>n'envoie rien à nos serveurs</strong>.",
      "Clients, rapports, photos et signatures restent <strong>uniquement sur votre téléphone</strong>.",
      "La caméra n'est utilisée que lorsque vous touchez « Prendre une photo ». Les notifications (rappels) sont locales et désactivables dans le Profil.",
      "Pensez à <strong>conserver vos PDF</strong> importants : si vous désinstallez l'application, les données locales sont supprimées.",
      'Voir notre <a href="/confidentialite">politique de confidentialité</a>.',
    ],
    h2Know: "À savoir",
    know: [
      "JobProof produit un <strong>rapport d'intervention</strong>, pas une facture légale belge. Pour facturer, utilisez votre outil de facturation habituel avec les montants du rapport.",
      "Sur <strong>Android</strong>, JobProof s'installe avec un fichier APK ; sur <strong>iPhone</strong>, c'est une application web installée depuis Safari. Une publication sur le Play Store et l'App Store est envisagée plus tard.",
      "Gratuit pendant la période de test.",
    ],
    h2Feedback: "Vos retours comptent",
    feedback: "Un problème, une idée, une question ? Écrivez-nous en précisant votre modèle de téléphone et ce que vous faisiez au moment du souci (une capture d'écran aide beaucoup).",
    btnWa: "Envoyer un retour sur WhatsApp", btnMail: "Écrire par e-mail",
    waText: "Bonjour, je teste JobProof et j'ai un retour :", mailSubject: "Retour JobProof",
    h2Faq: "Questions fréquentes",
    faq: [
      ["L'application est-elle gratuite ?", "Oui, pendant la période de test. Si une offre payante est proposée plus tard, vous en serez informé et les testeurs seront prévenus à l'avance."],
      ["Pourquoi l'installer en dehors du Play Store ?", "C'est une version de test distribuée directement. Elle est signée, et l'empreinte SHA-256 ci-dessus permet de vérifier le fichier. Une publication sur le Play Store est envisagée plus tard."],
      ["Puis-je utiliser mon logo ?", "Oui : onglet <em>Profil</em> → « Logo ». Sans logo, l'icône de votre métier est affichée à la place sur le PDF."],
      ["Les photos et signatures sont-elles dans le PDF ?", "Oui, ainsi que le détail des prix, la TVA et le total TTC."],
      ["Comment envoyer le rapport au client ?", "Sur la fiche de l'intervention : « Écrire au client sur WhatsApp » ouvre la conversation avec un message prêt, puis « Partager le PDF » permet de l'envoyer par WhatsApp, e-mail ou autre."],
      ["Et sur iPhone ?", "Oui : JobProof fonctionne sur iPhone comme application web (installation depuis Safari, voir ci-dessus). Une version App Store est envisagée plus tard."],
    ],
    foot: { tag: "Automatisation n8n &amp; IA pour les entreprises.", nav: "Navigation", company: "Entreprise", privacy: "Politique de confidentialité", terms: "Conditions d'utilisation", rights: "Tous droits réservés.", pShort: "Confidentialité", tShort: "Conditions" },
    langLabel: "Langue",
  },

  nl: {
    lang: "nl", locale: "nl_BE",
    title: "JobProof — Interventieverslagen voor vaklui | Bouskine Digital Solutions",
    desc: "JobProof: de Android- en iPhone-app waarmee vaklui (loodgieters, elektriciens, verwarmingstechnici…) een interventieverslag maken met foto's, handtekening van de klant en pdf, en het via WhatsApp doorsturen. Gratis bètaversie.",
    ogTitle: "JobProof — Interventieverslagen voor vaklui",
    ogDesc: "Foto's voor/na, handtekening van de klant, professionele pdf, Belgische btw en versturen via WhatsApp. Gratis bètaversie voor Android en iPhone.",
    nav: ["Diensten", "Realisaties", "Over ons", "Blog", "Contact"], blog: "/blog",
    badge: "Bètaversie · Android &amp; iPhone · Gratis",
    h1: "JobProof — uw interventieverslagen, zonder papierwerk",
    lead: "De app voor loodgieters, elektriciens, verwarmingstechniekers en andere vaklui: foto's voor/na, handtekening van de klant, een professionele pdf op uw naam en met één tik doorsturen via WhatsApp.",
    btnDl: "Downloaden voor Android (APK)", btnIos: "Openen op iPhone (iOS)", btnHow: "Hoe installeren?",
    meta: `Android: versie ${R.version} · ${R.sizeMb} MB · Android 6 of recenter · ${R.date.nl}<br>iPhone: webapp (Safari), geen installatie via de App Store`, sha: "SHA-256-vingerafdruk",
    h2Features: "Wat JobProof doet",
    cards: [
      ["Verslag in 5 stappen", "Klant, uitgevoerd werk, foto's, prijs, handtekening. Een concept wordt automatisch bewaard."],
      ["Foto's voor / na", "Neem de foto's in de app of kies ze uit de galerij. Ze komen in de pdf."],
      ["Handtekening van de klant", "De klant tekent met de vinger op uw telefoon: bewijs van uw bezoek en van de oplevering."],
      ["Professionele pdf", "Uw naam, uw logo, uw btw-nummer, het prijsdetail, de foto's en de handtekening."],
      ["Prijs en Belgische btw", "Uurtarief, lijnen voor materiaal, verplaatsing en forfaits. Btw aan 0 %, 6 %, 12 % of 21 %. Totaal excl. btw, btw en incl. btw worden voor u berekend."],
      ["Versturen via WhatsApp", "Open het gesprek met de klant met een klaar bericht en deel de pdf via WhatsApp, e-mail of Drive."],
      ["Werkt offline", "Geen internet nodig op de werf: alles wordt op uw telefoon bewaard."],
      ["Klanten en geschiedenis", "Klantenfiche, geschiedenis van de interventies, zoeken, en herinneringen voor concepten of verslagen die nog niet verstuurd zijn."],
    ],
    h2Trades: "Voor welke beroepen?",
    trades: "Loodgieterij, elektriciteit, verwarming en airco, schilderwerk, schrijnwerk, tegelwerk, dakwerken, tuinwerk, schoonmaak, informatica… Elke interventie krijgt het pictogram van haar beroep. Elke herstelling of installatie bij een particulier of een bedrijf komt in aanmerking.",
    h2Install: "De app installeren", androidH3: "Op Android", iosH3: "Op iPhone (iOS)",
    steps: [
      "<strong>Download de APK</strong> met de knop hierboven, vanuit de browser van uw telefoon (Chrome).",
      "<strong>Open het gedownloade bestand.</strong> Vraagt Android toestemming om “Onbekende apps te installeren”, schakel dat dan in voor Chrome.",
      "<strong>Tik op Installeren.</strong> Toont Google Play Protect een waarschuwing, kies dan “Toch installeren”: de app staat nog niet in de Play Store.",
      "<strong>Open JobProof</strong> en vul uw bedrijf, uw logo en uw uurtarief in op het tabblad <em>Profiel</em>.",
    ],
    noteB: "Bètaversie.", noteT: " JobProof wordt getest met vaklui in België. U kunt nog fouten tegenkomen. Uw feedback helpt ons de app te verbeteren: laat ons weten wat ontbreekt, wat vastloopt en wat u graag zou willen.",
    iosSteps: [
      "Tik op de knop <strong>“Openen op iPhone (iOS)”</strong> hierboven (of ga naar <strong>www.bouskine.com/app</strong>) met <strong>Safari</strong>.",
      "Tik onderaan het scherm op de knop <strong>Deel</strong> (het vierkant met een pijl).",
      "Kies <strong>Zet op beginscherm</strong> en tik op <strong>Voeg toe</strong>.",
      "Open <strong>JobProof</strong> vanaf het beginscherm: de app opent op volledig scherm, zoals een gewone app. Sta de camera toe wanneer de iPhone erom vraagt.",
    ],
    iosNote: "Op iPhone wordt JobProof geïnstalleerd als webapp: voorlopig geen download via de App Store. Na de eerste keer openen werkt ze ook zonder internet. Bijzonderheden: geen herinneringsmeldingen, en de pdf opent via het afdrukvenster van iOS (gebruik daarna “Deel” om hem op te slaan of te versturen). De gegevens worden in Safari op uw iPhone bewaard: wis geen websitegegevens en bewaar uw belangrijke pdf's.",
    h2Privacy: "Uw gegevens en uw privacy",
    privacy: [
      "Geen account, geen registratie. De app <strong>stuurt niets naar onze servers</strong>.",
      "Klanten, verslagen, foto's en handtekeningen blijven <strong>uitsluitend op uw telefoon</strong>.",
      "De camera wordt alleen gebruikt wanneer u op “Foto nemen” tikt. De meldingen (herinneringen) zijn lokaal en kunnen in het Profiel worden uitgeschakeld.",
      "<strong>Bewaar uw belangrijke pdf's</strong> zelf: als u de app verwijdert, worden de lokale gegevens gewist.",
      'Zie ons <a href="/confidentialite">privacybeleid</a> (in het Frans).',
    ],
    h2Know: "Goed om te weten",
    know: [
      "JobProof maakt een <strong>interventieverslag</strong>, geen geldige Belgische factuur. Om te factureren gebruikt u uw gewone factureringsprogramma met de bedragen uit het verslag.",
      "Op <strong>Android</strong> installeert u JobProof met een APK-bestand; op <strong>iPhone</strong> is het een webapp die u vanuit Safari installeert. Publicatie in de Play Store en de App Store is later gepland.",
      "Gratis tijdens de testperiode.",
    ],
    h2Feedback: "Uw feedback telt",
    feedback: "Een probleem, een idee, een vraag? Schrijf ons, met uw telefoonmodel en wat u deed toen het probleem opdook (een schermafbeelding helpt enorm).",
    btnWa: "Feedback sturen via WhatsApp", btnMail: "Mailen",
    waText: "Goedendag, ik test JobProof en heb feedback:", mailSubject: "Feedback JobProof",
    h2Faq: "Veelgestelde vragen",
    faq: [
      ["Is de app gratis?", "Ja, tijdens de testperiode. Als er later een betalende formule komt, wordt u hiervan vooraf op de hoogte gebracht."],
      ["Waarom buiten de Play Store installeren?", "Het is een testversie die rechtstreeks wordt verspreid. Ze is ondertekend en met de SHA-256-vingerafdruk hierboven kunt u het bestand controleren. Publicatie in de Play Store is later gepland."],
      ["Kan ik mijn eigen logo gebruiken?", "Ja: tabblad <em>Profiel</em> → “Logo”. Zonder logo toont de pdf in de plaats het pictogram van uw beroep."],
      ["Staan de foto's en handtekeningen in de pdf?", "Ja, samen met het prijsdetail, de btw en het totaal incl. btw."],
      ["Hoe stuur ik het verslag naar de klant?", "Op de fiche van de interventie opent “Klant een WhatsApp sturen” het gesprek met een klaar bericht. Met “Pdf delen” stuurt u de pdf daarna via WhatsApp, e-mail of een andere app."],
      ["En op iPhone?", "Ja: JobProof werkt op iPhone als webapp (installeren vanuit Safari, zie hierboven). Een App Store-versie is later gepland."],
    ],
    foot: { tag: "n8n-automatisering &amp; AI voor bedrijven.", nav: "Navigatie", company: "Bedrijf", privacy: "Privacybeleid", terms: "Gebruiksvoorwaarden", rights: "Alle rechten voorbehouden.", pShort: "Privacy", tShort: "Voorwaarden" },
    langLabel: "Taal",
  },

  en: {
    lang: "en", locale: "en_GB",
    title: "JobProof — Job reports for tradespeople | Bouskine Digital Solutions",
    desc: "JobProof: the Android and iPhone app that lets tradespeople (plumbers, electricians, heating engineers…) create a job report with photos, client signature and PDF, and send it via WhatsApp. Free beta.",
    ogTitle: "JobProof — Job reports for tradespeople",
    ogDesc: "Before/after photos, client signature, professional PDF, Belgian VAT and sending via WhatsApp. Free beta for Android and iPhone.",
    nav: ["Services", "Projects", "About", "Blog", "Contact"], blog: "/en/blog",
    badge: "Beta · Android &amp; iPhone · Free",
    h1: "JobProof — your job reports, without the paperwork",
    lead: "The app for plumbers, electricians, heating engineers and other tradespeople: before/after photos, client signature, a professional PDF in your name, and one-tap sending via WhatsApp.",
    btnDl: "Download for Android (APK)", btnIos: "Open on iPhone (iOS)", btnHow: "How to install?",
    meta: `Android: version ${R.version} · ${R.sizeMb} MB · Android 6 or later · ${R.date.en}<br>iPhone: web app (Safari), no App Store install`, sha: "SHA-256 fingerprint",
    h2Features: "What JobProof does",
    cards: [
      ["Report in 5 steps", "Client, work done, photos, price, signature. A draft is saved automatically."],
      ["Before / after photos", "Take photos in the app or pick them from the gallery. They appear in the PDF."],
      ["Client signature", "The client signs with a finger on your phone: proof of your visit and of acceptance of the work."],
      ["Professional PDF", "Your name, your logo, your VAT number, the price breakdown, the photos and the signature."],
      ["Price and Belgian VAT", "Hourly rate, lines for materials, travel and flat fees. VAT at 0%, 6%, 12% or 21%. Totals excl. VAT, VAT and incl. VAT calculated for you."],
      ["Send via WhatsApp", "Open the client's chat with a ready-made message, then share the PDF via WhatsApp, e-mail or Drive."],
      ["Works offline", "No internet needed on site: everything is stored on your phone."],
      ["Clients and history", "Client records, job history, search, and reminders for drafts or reports not yet sent."],
    ],
    h2Trades: "Which trades?",
    trades: "Plumbing, electrical, heating and air conditioning, painting, carpentry, tiling, roofing, gardening, cleaning, IT… Each job gets the icon of its trade. Any repair or installation work for a household or a business fits.",
    h2Install: "Install the app", androidH3: "On Android", iosH3: "On iPhone (iOS)",
    steps: [
      "<strong>Download the APK</strong> with the button above, from your phone's browser (Chrome).",
      "<strong>Open the downloaded file.</strong> If Android asks for permission to “Install unknown apps”, allow it for Chrome.",
      "<strong>Tap Install.</strong> If Google Play Protect shows a warning, choose “Install anyway”: the app is not yet published on the Play Store.",
      "<strong>Open JobProof</strong>, then enter your business details, logo and hourly rate in the <em>Profile</em> tab.",
    ],
    noteB: "Beta version.", noteT: " JobProof is being tested with tradespeople in Belgium. You may run into bugs. Your feedback helps us improve it: tell us what is missing, what gets in the way and what you would like.",
    iosSteps: [
      "Tap the <strong>“Open on iPhone (iOS)”</strong> button above (or go to <strong>www.bouskine.com/app</strong>) using <strong>Safari</strong>.",
      "Tap the <strong>Share</strong> button (the square with an arrow) at the bottom of the screen.",
      "Choose <strong>Add to Home Screen</strong>, then <strong>Add</strong>.",
      "Open <strong>JobProof</strong> from your Home Screen: it opens full screen like a regular app. Allow camera access when the iPhone asks.",
    ],
    iosNote: "On iPhone, JobProof is installed as a web app: no App Store download for now. After the first launch it also works without internet. Differences: no reminder notifications, and the PDF opens through the iOS print dialog (then use “Share” to save or send it). Data is stored in Safari on your iPhone: do not clear website data and keep your important PDFs.",
    h2Privacy: "Your data and your privacy",
    privacy: [
      "No account, no sign-up. The app <strong>sends nothing to our servers</strong>.",
      "Clients, reports, photos and signatures stay <strong>only on your phone</strong>.",
      "The camera is only used when you tap “Take a photo”. Notifications (reminders) are local and can be turned off in the Profile.",
      "Remember to <strong>keep your important PDFs</strong>: if you uninstall the app, local data is deleted.",
      'See our <a href="/confidentialite">privacy policy</a> (in French).',
    ],
    h2Know: "Good to know",
    know: [
      "JobProof produces a <strong>job report</strong>, not a legal Belgian invoice. To invoice, use your usual invoicing tool with the amounts from the report.",
      "On <strong>Android</strong>, JobProof is installed with an APK file; on <strong>iPhone</strong> it is a web app installed from Safari. Play Store and App Store releases are planned for later.",
      "Free during the test period.",
    ],
    h2Feedback: "Your feedback matters",
    feedback: "A problem, an idea, a question? Write to us with your phone model and what you were doing when it happened (a screenshot helps a lot).",
    btnWa: "Send feedback on WhatsApp", btnMail: "Send an e-mail",
    waText: "Hello, I am testing JobProof and have some feedback:", mailSubject: "JobProof feedback",
    h2Faq: "Frequently asked questions",
    faq: [
      ["Is the app free?", "Yes, during the test period. If a paid plan is offered later, you will be told in advance."],
      ["Why install it outside the Play Store?", "This is a test version distributed directly. It is signed, and the SHA-256 fingerprint above lets you verify the file. A Play Store release is planned for later."],
      ["Can I use my own logo?", "Yes: <em>Profile</em> tab → “Logo”. Without a logo, the PDF shows the icon of your trade instead."],
      ["Are photos and signatures included in the PDF?", "Yes, along with the price breakdown, VAT and the total incl. VAT."],
      ["How do I send the report to the client?", "On the job screen, “Message the client on WhatsApp” opens the chat with a ready-made message, then “Share PDF” lets you send it via WhatsApp, e-mail or another app."],
      ["What about iPhone?", "Yes: JobProof works on iPhone as a web app (install from Safari, see above). An App Store version is planned for later."],
    ],
    foot: { tag: "n8n &amp; AI automation for businesses.", nav: "Navigation", company: "Company", privacy: "Privacy policy", terms: "Terms of use", rights: "All rights reserved.", pShort: "Privacy", tShort: "Terms" },
    langLabel: "Language",
  },
};

const hreflang = `  <link rel="alternate" hreflang="fr" href="https://www.bouskine.com/jobproof">
  <link rel="alternate" hreflang="nl" href="https://www.bouskine.com/nl/jobproof">
  <link rel="alternate" hreflang="en" href="https://www.bouskine.com/en/jobproof">
  <link rel="alternate" hreflang="x-default" href="https://www.bouskine.com/jobproof">`;

const css = `
    .jp-hero-cta { display: flex; flex-wrap: wrap; gap: 14px; align-items: center; margin: 26px 0 10px; }
    .jp-hero-cta .btn { text-decoration: none; }
    .jp-hero-cta .btn:not(.btn-ghost) { color: #fff; }
    .jp-hero-cta .jp-ios { background: #0b1a45; box-shadow: 0 8px 20px rgba(11, 26, 69, .25); }
    .jp-meta { font-size: .85rem; color: var(--muted); }
    .jp-meta code { font-size: .78rem; word-break: break-all; }
    .jp-badge { display: inline-block; background: #fef3c7; color: #92400e; font-weight: 600; font-size: .78rem; padding: 4px 12px; border-radius: 999px; margin-bottom: 14px; }
    .jp-lang { display: flex; gap: 8px; align-items: center; font-size: .85rem; margin-bottom: 14px; color: var(--muted); }
    .jp-lang a { text-decoration: none; color: var(--navy); border: 1px solid var(--line); border-radius: 999px; padding: 3px 12px; font-weight: 600; }
    .jp-lang a[aria-current="true"] { background: var(--navy); color: #fff; border-color: var(--navy); }
    .jp-steps { counter-reset: s; list-style: none; padding: 0; display: grid; gap: 14px; margin: 24px 0; }
    .jp-steps li { counter-increment: s; background: #fff; border: 1px solid var(--line); border-radius: var(--radius); padding: 18px 20px 18px 66px; position: relative; }
    .jp-steps li::before { content: counter(s); position: absolute; left: 18px; top: 50%; transform: translateY(-50%); width: 34px; height: 34px; border-radius: 50%; background: var(--grad); color: #fff; font-weight: 700; display: grid; place-items: center; }
    .jp-faq details { background: #fff; border: 1px solid var(--line); border-radius: 14px; padding: 14px 18px; margin-bottom: 10px; }
    .jp-faq summary { cursor: pointer; font-weight: 600; }
    .jp-faq p { margin-top: 10px; color: var(--muted); }
    .jp-note { background: #fff7ed; border-left: 4px solid #f59e0b; padding: 14px 18px; border-radius: 10px; margin: 20px 0; font-size: .95rem; }
  `;

function page(l) {
  const s = T[l];
  const url = `https://www.bouskine.com${PATHS[l]}`;
  const sw = ["fr", "nl", "en"].map((x) => `<a href="${PATHS[x]}" hreflang="${x}" lang="${x}"${x === l ? ' aria-current="true"' : ""}>${x.toUpperCase()}</a>`).join("");
  const wa = `${WA}?text=${encodeURIComponent(s.waText)}`;
  return `<!doctype html>
<html lang="${s.lang}" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${s.title}</title>
  <meta name="description" content="${s.desc}">
  <meta property="og:title" content="${s.ogTitle}">
  <meta property="og:description" content="${s.ogDesc}">
  <link rel="canonical" href="${url}">
${hreflang}
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="https://www.bouskine.com/assets/og-image.png">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Bouskine Digital Solutions">
  <meta property="og:locale" content="${s.locale}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#0b1a45">
  <link rel="icon" type="image/png" href="/favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600&family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles.css">
  <style>${css}</style>
</head>
<body>

<header class="nav" id="top">
  <div class="container nav-inner">
    <a href="/" class="brand">
      <img src="/assets/logo-mark.png" alt="Logo Bouskine" width="40" height="40">
      <span><strong>BOUSKINE</strong><small>Digital Solutions</small></span>
    </a>
    <button class="menu-btn" aria-label="Menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <nav class="links">
      <a href="/#services">${s.nav[0]}</a>
      <a href="/#projets">${s.nav[1]}</a>
      <a href="/a-propos">${s.nav[2]}</a>
      <a href="${s.blog}">${s.nav[3]}</a>
      <a href="/#contact" class="btn btn-sm">${s.nav[4]}</a>
    </nav>
  </div>
</header>

<main>
<section class="page-hero">
  <div class="container">
    <nav class="jp-lang" aria-label="${s.langLabel}">${sw}</nav>
    <span class="jp-badge">${s.badge}</span>
    <h1>${s.h1}</h1>
    <p>${s.lead}</p>
    <div class="jp-hero-cta">
      <a class="btn jp-android" href="${APK}" download>${s.btnDl}</a>
      <a class="btn jp-ios" href="/app/">${s.btnIos}</a>
      <a class="btn btn-ghost" href="#installation" style="text-decoration:none;color:var(--navy)">${s.btnHow}</a>
    </div>
    <p class="jp-meta">${s.meta}<br>
      ${s.sha} (Android) : <code>${SHA}</code></p>
    <script>if(/iPhone|iPad|iPod/.test(navigator.userAgent)){var c=document.querySelector(".jp-hero-cta");c.insertBefore(c.querySelector(".jp-ios"),c.firstChild)}</script>
  </div>
</section>

<div class="container prose">

  <h2>${s.h2Features}</h2>
  <div class="cards" style="margin: 22px 0 10px">
${s.cards.map(([h, p]) => `    <div class="card"><h3>${h}</h3><p>${p}</p></div>`).join("\n")}
  </div>

  <h2>${s.h2Trades}</h2>
  <p>${s.trades}</p>

  <h2 id="installation">${s.h2Install}</h2>
  <h3>${s.androidH3}</h3>
  <ol class="jp-steps">
${s.steps.map((x) => `    <li>${x}</li>`).join("\n")}
  </ol>
  <h3 id="iphone">${s.iosH3}</h3>
  <ol class="jp-steps">
${s.iosSteps.map((x) => `    <li>${x}</li>`).join("\n")}
  </ol>
  <p class="jp-meta">${s.iosNote}</p>

  <div class="jp-note"><strong>${s.noteB}</strong>${s.noteT}</div>

  <h2>${s.h2Privacy}</h2>
  <ul>
${s.privacy.map((x) => `    <li>${x}</li>`).join("\n")}
  </ul>

  <h2>${s.h2Know}</h2>
  <ul>
${s.know.map((x) => `    <li>${x}</li>`).join("\n")}
  </ul>

  <h2>${s.h2Feedback}</h2>
  <p>${s.feedback}</p>
  <p>
    <a href="${wa}" class="btn" target="_blank" rel="noopener" style="text-decoration:none;color:#fff">${s.btnWa}</a>
    &nbsp; <a href="mailto:contact@bouskine.com?subject=${encodeURIComponent(s.mailSubject)}" class="btn btn-ghost" style="text-decoration:none;color:var(--navy)">${s.btnMail}</a>
  </p>

  <h2>${s.h2Faq}</h2>
  <div class="jp-faq">
${s.faq.map(([q, a]) => `    <details><summary>${q}</summary><p>${a}</p></details>`).join("\n")}
  </div>
</div>

</main>

<footer class="footer">
  <div class="container footer-grid">
    <div class="footer-col">
      <a href="/" class="brand">
        <img src="/assets/logo-mark.png" alt="" width="36" height="36">
        <span><strong>BOUSKINE</strong><small>Digital Solutions</small></span>
      </a>
      <p class="footer-tag">${s.foot.tag}<br>Automate • Grow • Focus</p>
    </div>
    <div class="footer-col">
      <h4>${s.foot.nav}</h4>
      <a href="/#services">${s.nav[0]}</a>
      <a href="/#projets">${s.nav[1]}</a>
      <a href="/#contact">${s.nav[4]}</a>
    </div>
    <div class="footer-col">
      <h4>${s.foot.company}</h4>
      <a href="/a-propos">${s.nav[2]}</a>
      <a href="${s.blog}">${s.nav[3]}</a>
      <a href="/confidentialite">${s.foot.privacy}</a>
      <a href="/conditions">${s.foot.terms}</a>
    </div>
    <div class="footer-col">
      <h4>Contact</h4>
      <a href="mailto:contact@bouskine.com">contact@bouskine.com</a>
      <a href="${WA}" target="_blank" rel="noopener" dir="ltr">+212 6 87 18 45 42</a>
    </div>
  </div>
  <div class="container footer-bottom">
    <p>© <span id="year"></span> Bouskine Digital Solutions. ${s.foot.rights}</p>
    <p><a href="/confidentialite">${s.foot.pShort}</a> · <a href="/conditions">${s.foot.tShort}</a></p>
  </div>
</footer>

<script src="/script.js"></script>
</body>
</html>
`;
}

mkdirSync("nl", { recursive: true });
mkdirSync("en", { recursive: true });
for (const l of ["fr", "nl", "en"]) writeFileSync(FILES[l], page(l));
console.log("Pages générées :", Object.values(FILES).join(", "));
