(() => {
  const stage = document.getElementById("stage");
  const envelope = document.getElementById("envelope");
  const pages = document.getElementById("pages");
  const scrollCta = document.getElementById("scrollCta");
  const sealTap = document.getElementById("sealTap");
  const waxEl = document.getElementById("wax");
  const sparkles = document.getElementById("sparkles");
  const rsvpBtn = document.getElementById("rsvpBtn");
  const rsvpBtn2 = document.getElementById("rsvpBtn2");
  const rsvpFinal = document.getElementById("rsvpFinal");

  if(!stage || !envelope || !pages) return;

  const WA_LINK = "https://api.whatsapp.com/send?text=Ciao%20Vincenzo%20e%20Maria%20Giovanna%21%20Confermo%20la%20mia%20presenza%20al%20matrimonio%20del%2031/07/2026.%20%E2%9C%A8";
  [rsvpBtn, rsvpBtn2, rsvpFinal].forEach((b) => { if(b) b.setAttribute('href', WA_LINK); });

  let opened = false;

  function makeSparkles() {
    if(!sparkles) return;
    sparkles.innerHTML = "";
    for(let i=0;i<14;i++){
      const s = document.createElement('span');
      s.className = 'sparkle';
      s.style.left = '50%';
      s.style.top  = '52%';
      s.style.setProperty('--dx', (Math.random()*240-120).toFixed(0)+'px');
      s.style.setProperty('--dy', (Math.random()*200-100).toFixed(0)+'px');
      sparkles.appendChild(s);
    }
    setTimeout(() => { sparkles.innerHTML = ""; }, 1100);
  }

  function spinSeal() {
    if(!waxEl) return;
    waxEl.classList.remove('spin3d');
    void waxEl.offsetWidth;
    waxEl.classList.add('spin3d');
    const mono = waxEl.querySelector('.wax__mono');
    if(mono) {
      mono.classList.add('press');
      setTimeout(() => mono.classList.remove('press'), 380);
    }
  }

  function openEnvelope() {
    if(opened) return;
    opened = true;
    stage.classList.add('opening');
    stage.classList.add('is-open');
    makeSparkles();
    try { navigator.vibrate && navigator.vibrate([18,30,18]); } catch(_){}
    setTimeout(() => stage.classList.remove('opening'), 1100);

    window.setTimeout(() => {
      pages.hidden = false;
      const target = document.getElementById('pageDetails');
      if(target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollTo({ top: stage.offsetHeight, behavior: 'smooth' });
    }, 900);
  }

  function openFromSeal(e) {
    e && e.preventDefault && e.preventDefault();
    spinSeal();
    setTimeout(openEnvelope, 140);
  }

  envelope.addEventListener('click', openEnvelope, { passive: true });
  envelope.addEventListener('keydown', (e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openEnvelope(); } });

  if(sealTap) {
    sealTap.addEventListener('click', openFromSeal);
    sealTap.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openFromSeal(e); }
    });
  }

  if(scrollCta) {
    scrollCta.addEventListener('click', (e) => {
      e.preventDefault();
      if(!opened) openEnvelope();
      const target = document.getElementById('pageDetails');
      if(target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Prevent scroll before open
  let lockTimer = null;
  window.addEventListener('scroll', () => {
    if(opened) return;
    if(window.scrollY > 5) {
      clearTimeout(lockTimer);
      lockTimer = setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
    }
  }, { passive: true });
})();
