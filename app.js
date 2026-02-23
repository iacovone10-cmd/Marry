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

// WhatsApp fallback: open explicitly (desktop friendly)
(() => {
  const msg = 'Ciao Vincenzo e Maria Giovanna! Confermo con gioia la mia presenza al matrimonio del 31/07/2026.';
  const wa = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(msg);
  document.querySelectorAll('#rsvpBtn,#rsvpBtn2,#rsvpFinal').forEach((b) => {
    if(!b) return;
    b.href = wa;
    b.target = '_blank';
    b.rel = 'noopener';
    b.addEventListener('click', () => {
      setTimeout(() => { try{ window.open(wa, '_blank', 'noopener'); }catch(_){ } }, 50);
    });
  });
})();
