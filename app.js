(() => {
  const envelope = document.getElementById("envelope");
  const openHint = document.getElementById("openHint");
  const goDown = document.getElementById("goDown");
  const scrollTip = document.getElementById("scrollTip");

  function openEnvelope() {
    if (!envelope) return;
    envelope.classList.add("is-open");

    // Nascondi hint iniziale
    if (openHint) openHint.style.display = "none";

    // Mostra "Scorri" solo dopo apertura
    if (scrollTip) {
      scrollTip.classList.add("is-visible");
      scrollTip.setAttribute("aria-hidden", "false");
    }
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
      if (e.target.closest("a")) return; // se clicchi il bottone, lascia fare al link
      const href = card.getAttribute("data-href");
      if (href) window.open(href, "_blank", "noopener");
    });
  });

  // Add to calendar (.ics)
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
    // Evento: 10:30 -> 18:30
    const startLocal = new Date(2026, 6, 31, 10, 30, 0);
    const endLocal   = new Date(2026, 6, 31, 18, 30, 0);

    const dtStart = toICSDateUTC(startLocal);
    const dtEnd   = toICSDateUTC(endLocal);

    const title = "Matrimonio Vincenzo & Maria Giovanna";
    const location = "Chiesa Maria SS. Immacolata (Marano di Napoli) · Il Gabbiano (Bacoli)";
    const description = "Cerimonia ore 10:30. Ricevimento ore 14:00. RSVP su WhatsApp.";

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
})();
