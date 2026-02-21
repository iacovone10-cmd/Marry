// ====== CONFIG (personalizza qui) ======
const CONFIG = {
  // Data/ora matrimonio (Europe/Rome)
  weddingISO: "2026-07-31T10:30:00+02:00",

  // Link Google Maps (sostituisci con i tuoi)
  mapsChiesa: "https://www.google.com/maps?q=Chiesa+Maria+SS.+Immacolata",
  mapsLocation: "https://www.google.com/maps?q=Il+Gabbiano",

  // WhatsApp (metti il tuo numero in formato internazionale, senza + e spazi)
  whatsappNumber: "39INSERISCI_NUMERO",

  // Link regalo / upload (metti i link reali anche negli input in pagina)
  giftLink: "https://INSERISCI-QUI-IL-TUO-LINK",
  photoLink: "https://INSERISCI-QUI-LINK-UPLOAD",

  coupleNames: "Vincenzo e Maria Giovanna",
};

function pad2(n){ return String(n).padStart(2, "0"); }

// ====== Smooth scroll from hero hint ======
function setupScrollHint(){
  const hint = document.querySelector("[data-scroll]");
  if(!hint) return;

  const go = () => {
    const targetSel = hint.getAttribute("data-scroll");
    const el = document.querySelector(targetSel);
    if(el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  hint.addEventListener("click", go);
  hint.addEventListener("keydown", (e) => {
    if(e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
  });
}

// ====== Reveal on scroll ======
function setupReveal(){
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if(en.isIntersecting){
        en.target.classList.add("is-visible");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
}

// ====== Countdown ======
function setupCountdown(){
  const nodes = {
    days: document.querySelector('[data-cd="days"]'),
    hours: document.querySelector('[data-cd="hours"]'),
    mins: document.querySelector('[data-cd="mins"]'),
    secs: document.querySelector('[data-cd="secs"]'),
  };

  const target = new Date(CONFIG.weddingISO);

  function tick(){
    const now = new Date();
    let diff = Math.max(0, target - now);

    const sec = Math.floor(diff / 1000);
    const days = Math.floor(sec / 86400);
    const hours = Math.floor((sec % 86400) / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;

    if(nodes.days) nodes.days.textContent = days;
    if(nodes.hours) nodes.hours.textContent = pad2(hours);
    if(nodes.mins) nodes.mins.textContent = pad2(mins);
    if(nodes.secs) nodes.secs.textContent = pad2(secs);
  }

  tick();
  setInterval(tick, 1000);
}

// ====== Maps links + inputs ======
function setupLinks(){
  const aChiesa = document.getElementById("mapsChiesa");
  const aLoc = document.getElementById("mapsLocation");
  if(aChiesa) aChiesa.href = CONFIG.mapsChiesa;
  if(aLoc) aLoc.href = CONFIG.mapsLocation;

  const giftInput = document.getElementById("giftLink");
  const photoInput = document.getElementById("photoLink");
  const photoBtn = document.getElementById("photoBtn");

  if(giftInput) giftInput.value = CONFIG.giftLink;
  if(photoInput) photoInput.value = CONFIG.photoLink;
  if(photoBtn) photoBtn.href = CONFIG.photoLink;

  const giftBtn = document.getElementById("giftBtn");
  if(giftBtn){
    giftBtn.addEventListener("click", () => window.open(CONFIG.giftLink, "_blank", "noopener"));
  }
}

// ====== Copy buttons ======
function setupCopy(){
  document.querySelectorAll("[data-copy]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const sel = btn.getAttribute("data-copy");
      const input = document.querySelector(sel);
      if(!input) return;

      try{
        await navigator.clipboard.writeText(input.value);
        const old = btn.textContent;
        btn.textContent = "Copiato ✓";
        setTimeout(() => (btn.textContent = old), 1100);
      }catch{
        // fallback
        input.select();
        document.execCommand("copy");
      }
    });
  });
}

// ====== RSVP WhatsApp ======
function setupRSVP(){
  document.querySelectorAll("[data-rsvp]").forEach(btn => {
    btn.addEventListener("click", () => {
      const ans = btn.getAttribute("data-rsvp"); // SI / NO
      const msg = `Ciao! Confermo: ${ans}. Matrimonio ${CONFIG.coupleNames} — 31/07/2026.`;
      const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
      window.open(url, "_blank", "noopener");
    });
  });
}

// ====== Add to Calendar (.ics) ======
function setupICS(){
  const btn = document.querySelector("[data-ical]");
  if(!btn) return;

  btn.addEventListener("click", () => {
    const start = new Date(CONFIG.weddingISO);
    const end = new Date(start.getTime() + 60 * 60 * 1000); // 1h (modifica se vuoi)

    const toICS = (d) => {
      const yyyy = d.getUTCFullYear();
      const mm = pad2(d.getUTCMonth() + 1);
      const dd = pad2(d.getUTCDate());
      const hh = pad2(d.getUTCHours());
      const mi = pad2(d.getUTCMinutes());
      const ss = pad2(d.getUTCSeconds());
      return `${yyyy}${mm}${dd}T${hh}${mi}${ss}Z`;
    };

    const ics =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Invito Digitale//IT
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${Date.now()}@invito
DTSTAMP:${toICS(new Date())}
DTSTART:${toICS(start)}
DTEND:${toICS(end)}
SUMMARY:Matrimonio ${CONFIG.coupleNames}
LOCATION:${CONFIG.mapsChiesa}
DESCRIPTION:Inizio cerimonia. Link Maps: ${CONFIG.mapsChiesa}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "matrimonio.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
  });
}

// ====== Init ======
setupScrollHint();
setupReveal();
setupCountdown();
setupLinks();
setupCopy();
setupRSVP();
setupICS();
