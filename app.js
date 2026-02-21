const CONFIG = {
  weddingISO: "2026-07-31T10:30:00+02:00",

  // ✅ TUOI LINK GOOGLE MAPS
  mapsChiesa: "https://maps.app.goo.gl/AxMDmZrY5AV3fbye6",
  mapsLocation: "https://maps.app.goo.gl/tg9SrnP2t5sffd3w5",

  // (se vuoi, qui metti via/città precise; altrimenti lascia così)
  chiesaDetails: "Apri su Maps per indicazioni e dettagli",
  venueDetails: "Apri su Maps per indicazioni e dettagli",

  // WhatsApp in formato internazionale senza + (es: 393331112233)
  whatsappNumber: "39INSERISCI_NUMERO",

  giftLink: "https://INSERISCI-QUI-IL-TUO-LINK",
  photoLink: "https://INSERISCI-QUI-LINK-UPLOAD",

  coupleNames: "Vincenzo e Maria Giovanna",
};

function pad2(n){ return String(n).padStart(2, "0"); }

// scroll
document.querySelectorAll("[data-scroll]").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const target = document.querySelector(btn.getAttribute("data-scroll"));
    if(target) target.scrollIntoView({behavior:"smooth", block:"start"});
  });
});

// reveal
const els = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      en.target.classList.add("is-visible");
      io.unobserve(en.target);
    }
  });
},{threshold:0.12});
els.forEach(el=>io.observe(el));

// maps + details + links
const aChiesa = document.getElementById("mapsChiesa");
const aLoc = document.getElementById("mapsLocation");
if(aChiesa) aChiesa.href = CONFIG.mapsChiesa;
if(aLoc) aLoc.href = CONFIG.mapsLocation;

const chiesaDet = document.getElementById("chiesaDetails");
const venueDet = document.getElementById("venueDetails");
if(chiesaDet) chiesaDet.textContent = CONFIG.chiesaDetails;
if(venueDet) venueDet.textContent = CONFIG.venueDetails;

const giftInput = document.getElementById("giftLink");
const photoInput = document.getElementById("photoLink");
if(giftInput) giftInput.value = CONFIG.giftLink;
if(photoInput) photoInput.value = CONFIG.photoLink;

// copy
document.querySelectorAll("[data-copy]").forEach(btn=>{
  btn.addEventListener("click", async ()=>{
    const input = document.querySelector(btn.getAttribute("data-copy"));
    if(!input) return;
    try{
      await navigator.clipboard.writeText(input.value);
      const old = btn.textContent;
      btn.textContent = "Copiato ✓";
      setTimeout(()=>btn.textContent=old, 1100);
    }catch{
      input.select();
      document.execCommand("copy");
    }
  });
});

// countdown
const target = new Date(CONFIG.weddingISO);
function tick(){
  const now = new Date();
  let diff = Math.max(0, target - now);
  const sec = Math.floor(diff/1000);
  const days = Math.floor(sec/86400);
  const hours = Math.floor((sec%86400)/3600);
  const mins = Math.floor((sec%3600)/60);
  const secs = sec%60;

  const set = (k,v)=>{
    const el = document.querySelector(`[data-cd="${k}"]`);
    if(el) el.textContent = v;
  };

  set("days", days);
  set("hours", pad2(hours));
  set("mins", pad2(mins));
  set("secs", pad2(secs));
}
tick();
setInterval(tick, 1000);

// RSVP WhatsApp
document.querySelectorAll("[data-rsvp]").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const ans = btn.getAttribute("data-rsvp");
    const msg = `Ciao! Confermo: ${ans}. Matrimonio ${CONFIG.coupleNames} — 31/07/2026.`;
    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener");
  });
});

// calendar (ics)
const icalBtn = document.querySelector("[data-ical]");
if(icalBtn){
  icalBtn.addEventListener("click", ()=>{
    const start = new Date(CONFIG.weddingISO);
    const end = new Date(start.getTime() + 60*60*1000);

    const toICS = (d)=>{
      const yyyy = d.getUTCFullYear();
      const mm = pad2(d.getUTCMonth()+1);
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

    const blob = new Blob([ics], {type:"text/calendar;charset=utf-8"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "matrimonio.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
  });
}
