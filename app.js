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



  // WOW add-ons: toast, share, calendar, countdown, sparkles
  const addToCal = document.getElementById('addToCal');
  const shareBtn = document.getElementById('shareBtn');
  const toast = document.getElementById('toast');
  const sparkles = document.getElementById('sparkles');

  function showToast(msg){
    if(!toast) return;
    toast.textContent = msg;
    toast.classList.add('on');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('on'), 2200);
  }

  function makeSparkles(){
    if(!sparkles) return;
    sparkles.innerHTML = '';
    for(let i=0;i<14;i++){
      const s = document.createElement('span');
      s.className = 'sparkle';
      s.style.left = '50%';
      s.style.top  = '52%';
      s.style.setProperty('--dx', (Math.random()*240-120).toFixed(0)+'px');
      s.style.setProperty('--dy', (Math.random()*200-100).toFixed(0)+'px');
      sparkles.appendChild(s);
    }
    setTimeout(() => { sparkles.innerHTML = ''; }, 1100);
  }

  function openWow(){
    try{ navigator.vibrate && navigator.vibrate([18,30,18]); }catch(_){}
    makeSparkles();
    openEnvelope();
  }

  // Capture listeners to ensure WOW is used (also overrides existing handlers)
  envelope.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    openWow();
  }, true);
  envelope.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopImmediatePropagation();
      openWow();
    }
  }, true);
  scrollCta && scrollCta.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    openWow();
    const target = document.getElementById('pageDetails');
    target && target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, true);

  function downloadICS(){
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Invito Digitale//IT',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:' + Date.now() + '@invito',
      'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g,'').split('.')[0] + 'Z',
      'DTSTART:20260731T103000',
      'DTEND:20260731T113000',
      'SUMMARY:Matrimonio di Vincenzo & Maria Giovanna',
      'LOCATION:Chiesa Maria SS. Immacolata, Marano di Napoli',
      'DESCRIPTION:Dettagli invito: ' + location.href,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Matrimonio_Vincenzo_MariaGiovanna.ics';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1200);
    showToast('Calendario scaricato ✨');
  }

  async function shareInvite(){
    const shareData = {
      title: document.title,
      text: 'Invito al matrimonio di Vincenzo & Maria Giovanna ✨',
      url: location.href
    };
    try{
      if(navigator.share){
        await navigator.share(shareData);
        showToast('Invito condiviso 🤍');
      }else{
        await navigator.clipboard.writeText(location.href);
        showToast('Link copiato negli appunti');
      }
    }catch(_){
      try{
        await navigator.clipboard.writeText(location.href);
        showToast('Link copiato negli appunti');
      }catch(__){
        showToast('Copia il link dalla barra del browser');
      }
    }
  }

  addToCal && addToCal.addEventListener('click', downloadICS);
  shareBtn && shareBtn.addEventListener('click', shareInvite);

  function startCountdown(){
    const d = document.getElementById('cdDays');
    const h = document.getElementById('cdHours');
    const m = document.getElementById('cdMins');
    const s = document.getElementById('cdSecs');
    if(!d||!h||!m||!s) return;

    const tiles = { d: d.closest('.cd'), h: h.closest('.cd'), m: m.closest('.cd'), s: s.closest('.cd') };
    let prevVals = { days: null, hours: null, mins: null, secs: null };

    function pulse(tile, solemn){
      if(!tile) return;
      tile.classList.remove('tick');
      tile.classList.remove('solemn');
      void tile.offsetWidth;
      if(solemn) tile.classList.add('solemn');
      tile.classList.add('tick');
    }

    // 31/07/2026 — mezzogiorno per evitare edge di timezone
    const target = new Date(2026, 6, 31, 12, 0, 0);

    const tick = () => {
      const now = new Date();
      let diff = target.getTime() - now.getTime();
      if(diff < 0) diff = 0;

      const days = Math.floor(diff / (1000*60*60*24));
      const hours = Math.floor((diff / (1000*60*60)) % 24);
      const mins = Math.floor((diff / (1000*60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      const dd = String(days);
      const hh = String(hours).padStart(2,'0');
      const mm = String(mins).padStart(2,'0');
      const ss = String(secs).padStart(2,'0');

      if(prevVals.days !== null && prevVals.days !== dd) pulse(tiles.d, true);
      if(prevVals.hours !== null && prevVals.hours !== hh) pulse(tiles.h, true);
      if(prevVals.mins !== null && prevVals.mins !== mm) pulse(tiles.m, false);
      if(prevVals.secs !== null && prevVals.secs !== ss) pulse(tiles.s, false);

      d.textContent = dd;
      h.textContent = hh;
      m.textContent = mm;
      s.textContent = ss;

      prevVals = { days: dd, hours: hh, mins: mm, secs: ss };

      if(diff === 0){
        makeSparkles();
      }
    };

    tick();
    setInterval(tick, 1000);
  }

  startCountdown();
})();