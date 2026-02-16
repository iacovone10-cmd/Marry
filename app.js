(() => {
  const envelope = document.getElementById("envelope");
  const main = document.getElementById("main");
  const openBtn = document.getElementById("openBtn");
  const goInvite = document.getElementById("goInvite");

  // Countdown elements
  const cdDays = document.getElementById("cdDays");
  const cdHours = document.getElementById("cdHours");
  const cdMins = document.getElementById("cdMins");
  const cdSecs = document.getElementById("cdSecs");

  // Wedding date/time (local)
  const weddingDate = new Date(2026, 6, 31, 10, 30, 0); // 31/07/2026 10:30

  function pad(n){ return String(n).padStart(2,"0"); }

  function updateCountdown(){
    const now = new Date();
    const diff = weddingDate.getTime() - now.getTime();

    if (diff <= 0) {
      if (cdDays) cdDays.textContent = "0";
      if (cdHours) cdHours.textContent = "0";
      if (cdMins) cdMins.textContent = "0";
      if (cdSecs) cdSecs.textContent = "0";
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

  function openInvite(){
    if (envelope) envelope.classList.add("is-open");
    if (main) main.classList.add("is-visible");
    // scroll to invite after a tiny delay for smoothness
    setTimeout(() => {
      const invite = document.getElementById("invito");
      if (invite) invite.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 350);
  }

  if (envelope) {
    envelope.addEventListener("click", openInvite);
    envelope.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openInvite();
      }
    });
  }

  if (openBtn) openBtn.addEventListener("click", openInvite);

  if (goInvite) {
    goInvite.addEventListener("click", (e) => {
      // ensure open state first (if user taps before opening)
      if (envelope && !envelope.classList.contains("is-open")) {
        e.preventDefault();
        openInvite();
      }
    });
  }

  // -----------------------------
  // ADD TO CALENDAR (.ics)
  // -----------------------------
  const addToCalendarBtn = document.getElementById("addToCalendar");

  // Converts local date to UTC ICS format (YYYYMMDDTHHMMSSZ)
  function toICSDateUTC(d){
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

  function downloadICS(){
    // ✅ Orari impostati:
    // Cerimonia 10:30 — evento complessivo fino alle 18:30 (puoi cambiare)
    const startLocal = new Date(2026, 6, 31, 10, 30, 0);
    const endLocal   = new Date(2026, 6, 31, 18, 30, 0);

    const dtStart = toICSDateUTC(startLocal);
    const dtEnd   = toICSDateUTC(endLocal);

    const title = "Matrimonio Vincenzo & Maria Giovanna";
    const location = "Chiesa Maria SS. Immacolata (Marano di Napoli) · Il Gabbiano (Bacoli)";
    const description =
      "Cerimonia ore 10:30. Ricevimento ore 14:00. " +
      "RSVP via WhatsApp.";

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
