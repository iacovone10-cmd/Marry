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



  // Seal tap: elegant 3D rotation + micro emboss + open
  const sealTap = document.getElementById('sealTap');
  const waxEl = document.getElementById('wax');
  const waxMono = waxEl ? waxEl.querySelector('.wax__mono') : null;
  function spinSeal(){
    if(!waxEl) return;
    waxEl.classList.remove('spin3d');
    void waxEl.offsetWidth;
    waxEl.classList.add('spin3d');
  }
  function pressMono(){
    if(!waxMono) return;
    waxMono.classList.add('press');
    clearTimeout(pressMono._t);
    pressMono._t = setTimeout(() => waxMono.classList.remove('press'), 380);
  }
  function openFromSeal(e){
    e && e.preventDefault && e.preventDefault();
    spinSeal();
    pressMono();
    setTimeout(() => {
      try{ openWow ? openWow() : openEnvelope(); }catch(_){ try{ openEnvelope(); }catch(__){} }
    }, 140);
  }
  if(sealTap){
    sealTap.addEventListener('click', openFromSeal);
    sealTap.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        openFromSeal(e);
      }
    });
  }
})();