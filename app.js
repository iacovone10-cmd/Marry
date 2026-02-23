(() => {
  const stage = document.getElementById("stage");
  const envelope = document.getElementById("envelope");
  const pages = document.getElementById("pages");
  const scrollCta = document.getElementById("scrollCta");

  // Safety: if not found, stop silently
  if (!stage || !envelope || !pages) return;

  let opened = false;

  const openEnvelope = () => {
    if (opened) return;
    opened = true;

    stage.classList.add("is-open");

    // reveal pages after short delay to let animation play
    window.setTimeout(() => {
      pages.hidden = false;

      // smooth scroll to details section
      const target = document.getElementById("pageDetails");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // fallback
        window.scrollTo({ top: stage.offsetHeight, behavior: "smooth" });
      }
    }, 900);
  };

  // Click/tap
  envelope.addEventListener("click", openEnvelope, { passive: true });

  // Keyboard
  envelope.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openEnvelope();
    }
  });

  // CTA button also scrolls to details (useful on mobile)
  if (scrollCta) {
    scrollCta.addEventListener("click", (e) => {
      e.preventDefault();
      // open if not opened
      if (!opened) openEnvelope();
      // if already opened, scroll now
      const target = document.getElementById("pageDetails");
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // Fix: if user tries to scroll before open, keep them on stage
  // (Some mobiles allow slight scroll; we gently snap back unless opened)
  let lockTimer = null;
  window.addEventListener("scroll", () => {
    if (opened) return;
    // ignore if already at top
    if (window.scrollY > 5) {
      clearTimeout(lockTimer);
      lockTimer = setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
    }
  }, { passive: true });

})();

  // Countdown matrimonio (31 Luglio 2026 - 10:30)
  const countdownEls = document.querySelectorAll('[data-countdown]');
  const targetDate = new Date('2026-07-31T10:30:00+02:00');

  function updateCountdown(){
    const now = new Date();
    let diff = targetDate - now;
    if(diff < 0) diff = 0;

    const d = Math.floor(diff / (1000*60*60*24));
    const h = Math.floor((diff / (1000*60*60)) % 24);
    const m = Math.floor((diff / (1000*60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    countdownEls.forEach(el => {
      el.innerHTML = `${d} giorni ${h} ore ${m} min ${s} sec`;
    });
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

// Fix RSVP WhatsApp link
document.querySelectorAll('#rsvpBtn,#rsvpBtn2,#rsvpFinal').forEach(b=>{ if(b) b.href='https://api.whatsapp.com/send?text=Ciao%20Vincenzo%20e%20Maria%20Giovanna%21%20Confermo%20la%20mia%20presenza%20al%20matrimonio%20del%2031/07/2026%20%F0%9F%92%8D'; });
