(() => {
  const envelope = document.getElementById("envelope");
  const openHint = document.getElementById("openHint");
  const goDown = document.getElementById("goDown");
  const scrollTip = document.getElementById("scrollTip");
  const sparkles = document.getElementById("sparkles");

  function makeSparkles() {
    if (!sparkles) return;
    sparkles.innerHTML = "";
    sparkles.classList.add("on");

    // 14 particelle
    for (let i = 0; i < 14; i++) {
      const s = document.createElement("span");
      s.className = "spark";

      // attorno al sigillo (centro)
      const baseX = 50;
      const baseY = 48;

      // dx/dy random
      const dx = (Math.random() * 260 - 130).toFixed(0) + "px";
      const dy = (Math.random() * 220 - 110).toFixed(0) + "px";

      s.style.left = baseX + "%";
      s.style.top = baseY + "%";
      s.style.setProperty("--dx", dx);
      s.style.setProperty("--dy", dy);

      sparkles.appendChild(s);
    }

    // spegni dopo 1s
    setTimeout(() => {
      sparkles.classList.remove("on");
      sparkles.innerHTML = "";
    }, 1100);
  }

  function openEnvelope() {
    if (!envelope) return;
    envelope.classList.add("is-open");

    // mostra il resto: niente “tutto insieme” prima
    document.body.classList.add("opened");

    // nascondi hint iniziale
    if (openHint) openHint.style.display = "none";

    // “Scorri” solo dopo apertura
    if (scrollTip) {
      scrollTip.classList.add("is-visible");
      scrollTip.setAttribute("aria-hidden", "false");
    }

    // WOW: sparkles
    makeSparkles();
  }

  if (openHint) openHint.addEventListener("click", (e) => {
    e.preventDefault();
    openEnvelope();
  });

  if (envelope) {
    envelope.addEventListener("click", openEnvelope);
    envelope.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") openEnvelope();
    });
  }

  // Scroll to invite section
  if (goDown) {
    goDown.addEventListener("click", () => {
      const invite = document.getElementById("invite");
      if (invite) invite.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // Click su tutta la card (Maps)
  document.querySelectorAll(".eventLink").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      const href = card.getAttribute("data-href");
      if (href) window.open(href, "_blank", "noopener");
    });
  });

  // Add to calendar (.ics) – opzionale (lo lasciamo)
  const addToCalendarBtn = document.getElementById("addToCalendar");
  const pad = (n) => String(n).padStart(2, "0");

  function toICSDateUTC(d) {
    const dt = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return (
      dt.getUTCFullYear() +
      pad(dt.getUTCMonth() + 1) +
      pad(dt.getUTCDate()) + "T" +
      pad(dt.getUTCHours()) +
      pad(dt.getUTCMinutes()) +
      pad(dt.getUTCSeconds()) + "Z"
    );
  }

  function downloadICS() {
    const startLocal = new Date(2026, 6, 31, 10, 30, 0);
    const endLocal   = new Date(2026, 6, 31, 18, 30, 0);

    const dtStart = toICSDateUTC(startLocal);
    const dtEnd   = toICSDateUTC(endLocal);

    const title = "Matrimonio Vincenzo & Maria Giovanna";
    const location = "Chiesa Maria SS. Immacolata (Marano di Napoli) · Il Gabbiano (Bacoli)";
    const description = "Cerimonia ore 10:30. Ricevimento ore 14:00. Conferma entro 31 maggio.";

    const uid = `marry-${Date.now()}@githubpages`;

    const ics =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Marry Invite//IT
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${toICSDateUTC(new Date())}
DTSTART:${dtStart}
DTEND:${dtEnd}
SUMMARY:${title}
LOCATION:${location}
DESCRIPTION:${description}
END:VEVENT
END:VCALENDAR`;

    const icsFixed = ics.replace(/\n/g, "\r\n");
    const blob = new Blob([icsFixed], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "matrimonio_vincenzo_maria_giovanna.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();

    setTimeout(() => URL.revokeObjectURL(url), 500);
  }

  if (addToCalendarBtn) {
    addToCalendarBtn.addEventListener("click", (e) => {
      e.preventDefault();
      downloadICS();
    });
  }

  // Animazioni “WOW” quando entri in ogni pagina
  const io = new IntersectionObserver((entries) => {
    for (const ent of entries) {
      if (ent.isIntersecting) ent.target.classList.add("in-view");
    }
  }, { threshold: 0.18 });

  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
})();
