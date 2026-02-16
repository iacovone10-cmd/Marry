(() => {
  const main = document.getElementById("main");
  const openInvite = document.getElementById("openInvite");
  const floatOpen = document.getElementById("floatOpen");
  const scrollRSVP = document.getElementById("scrollRSVP");

  // Mode toggle
  const modeToggle = document.getElementById("modeToggle");
  const modeText = document.getElementById("modeText");
  const modeIcon = document.querySelector(".modeIcon");

  // Countdown
  const cdDays = document.getElementById("cdDays");
  const cdHours = document.getElementById("cdHours");
  const cdMins = document.getElementById("cdMins");
  const cdSecs = document.getElementById("cdSecs");

  // Wedding date (local): 31/07/2026 10:30
  const weddingDate = new Date(2026, 6, 31, 10, 30, 0);
  const pad = (n) => String(n).padStart(2, "0");

  // -----------------------------
  // Restore preferred mode
  // -----------------------------
  const savedMode = localStorage.getItem("inviteMode");
  if (savedMode === "night") setMode("night");
  else setMode("day");

  function setMode(mode){
    document.body.setAttribute("data-mode", mode);
    localStorage.setItem("inviteMode", mode);

    if (modeText) modeText.textContent = (mode === "night") ? "Notte" : "Giorno";
    if (modeIcon) modeIcon.textContent = (mode === "night") ? "🌙" : "☀️";
  }

  if (modeToggle) {
    modeToggle.addEventListener("click", () => {
      const current = document.body.getAttribute("data-mode") || "day";
      setMode(current === "day" ? "night" : "day");
    });
  }

  // -----------------------------
  // Countdown
  // -----------------------------
  function updateCountdown() {
    const now = new Date();
    const diff = weddingDate.getTime() - now.getTime();

    if (diff <= 0) {
      if (cdDays) cdDays.textContent = "0";
      if (cdHours) cdHours.textContent = "00";
      if (cdMins) cdMins.textContent = "00";
      if (cdSecs) cdSecs.textContent = "00";
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (cdDays) cdDays.textContent = String(days);
    if (cdHours) cdHours.textContent = pad(hours);
    if (cdMins) cdMins.textContent = pad(mins);
    if (cdSecs) cdSecs.textContent = pad(secs);
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // -----------------------------
  // Open main
  // -----------------------------
  function openNow() {
    if (main) main.classList.add("is-visible");
    setTimeout(() => {
      const invite = document.getElementById("invite");
      if (invite) invite.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  }

  if (openInvite) openInvite.addEventListener("click", openNow);
  if (floatOpen) floatOpen.addEventListener("click", openNow);

  if (scrollRSVP) {
    scrollRSVP.addEventListener("click", () => {
      openNow();
      setTimeout(() => {
        const rsvp = document.getElementById("rsvp");
        if (rsvp) rsvp.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 220);
    });
  }

  // -----------------------------
  // RSVP mini-form -> opens external form with prefilled info
  // -----------------------------
  const rsvpForm = document.getElementById("rsvpForm");

  function buildPrefillQuery(data){
    // Generic query string; external platforms may differ.
    // Works well if your external form supports query params like ?name=... etc.
    const params = new URLSearchParams();
    params.set("name", data.name || "");
    params.set("people", data.people || "1");
    params.set("answer", data.answer || "");
    params.set("notes", data.notes || "");
    return params.toString();
  }

  if (rsvpForm) {
    rsvpForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("rsvpName")?.value?.trim() || "";
      const people = document.getElementById("rsvpPeople")?.value || "1";
      const answer = document.getElementById("rsvpAnswer")?.value || "";
      const notes = document.getElementById("rsvpNotes")?.value?.trim() || "";

      if (!name) {
        alert("Inserisci nome e cognome 😊");
        return;
      }

      const base = (window.RSVP_EXTERNAL_URL || "").trim();

      // If you haven't replaced the placeholder, we show a helpful message
      if (!base || base === "RSVP_EXTERNAL_URL") {
        alert("Devi inserire il link del tuo modulo RSVP esterno (Tally/Google Form) in RSVP_EXTERNAL_URL.");
        return;
      }

      const qs = buildPrefillQuery({ name, people, answer, notes });

      // Open external RSVP page with prefilled query (best effort)
      const url = base.includes("?") ? `${base}&${qs}` : `${base}?${qs}`;
      window.open(url, "_blank", "noopener");
    });
  }

  // -----------------------------
  // Add to calendar (.ics)
  // -----------------------------
  const addToCalendarBtn = document.getElementById("addToCalendar");

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
    // Evento: 10:30 -> 18:30 (modificabile)
    const startLocal = new Date(2026, 6, 31, 10, 30, 0);
    const endLocal   = new Date(2026, 6, 31, 18, 30, 0);

    const dtStart = toICSDateUTC(startLocal);
    const dtEnd   = toICSDateUTC(endLocal);

    const title = "Matrimonio Vincenzo & Maria Giovanna";
    const location = "Chiesa Maria SS. Immacolata (Marano di Napoli) · Il Gabbiano (Bacoli)";
    const description = "Cerimonia ore 10:30. Ricevimento ore 14:00. RSVP tramite modulo.";

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

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
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
