(function () {
  const envelope = document.getElementById("envelope");
  const intro = document.getElementById("intro");
  const main = document.getElementById("main");
  const openBtn = document.getElementById("openBtn");
  const goInvite = document.getElementById("goInvite");

  const cdDays = document.getElementById("cdDays");
  const cdHours = document.getElementById("cdHours");
  const cdMins = document.getElementById("cdMins");
  const cdSecs = document.getElementById("cdSecs");

  // Data matrimonio: 31 Luglio 2026 (ora locale)
  const weddingDate = new Date(2026, 6, 31, 0, 0, 0); // month is 0-based (6 = luglio)

  let opened = false;

  function pad2(n) {
    return String(n).padStart(2, "0");
  }

  function updateCountdown() {
    const now = new Date();
    let diff = weddingDate - now;

    if (diff < 0) diff = 0;

    const totalSec = Math.floor(diff / 1000);
    const days = Math.floor(totalSec / (3600 * 24));
    const hours = Math.floor((totalSec % (3600 * 24)) / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;

    cdDays.textContent = days;
    cdHours.textContent = pad2(hours);
    cdMins.textContent = pad2(mins);
    cdSecs.textContent = pad2(secs);
  }

  function openEnvelope() {
    if (opened) return;
    opened = true;
    envelope.classList.add("is-open");
  }

  function showMain() {
    // mostra la pagina principale e scrolla all’hero
    main.classList.add("is-visible");
    intro.style.display = "none";
    location.hash = "#invito";
  }

  // Click/tap envelope
  envelope.addEventListener("click", openEnvelope);
  envelope.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") openEnvelope();
  });

  // Pulsante “Apri” (mobile)
  openBtn.addEventListener("click", () => {
    if (!opened) openEnvelope();
    // aspetta un attimo per far vedere l’apertura
    setTimeout(showMain, 650);
  });

  // Link “Apri l’invito” nella lettera
  goInvite.addEventListener("click", (e) => {
    e.preventDefault();
    setTimeout(showMain, 200);
  });

  // Countdown
  updateCountdown();
  setInterval(updateCountdown, 1000);
})();
