(() => {
  const body = document.body;
  const envelope = document.getElementById('envelope');
  const goDown = document.getElementById('goDown');
  const pages = document.getElementById('pages');
  const sparkles = document.getElementById('sparkles');

  // Sparkles (lightweight)
  function burstSparkles(){
    if(!sparkles) return;
    sparkles.innerHTML = '';
    const n = 14;
    for(let i=0;i<n;i++){
      const s = document.createElement('i');
      const a = (Math.PI*2) * (i/n);
      const r = 26 + Math.random()*26;
      const x = 50 + Math.cos(a)*r;
      const y = 50 + Math.sin(a)*r;
      s.style.left = x + '%';
      s.style.top  = y + '%';
      s.style.transition = 'opacity .25s ease, transform .55s cubic-bezier(.2,.9,.2,1)';
      sparkles.appendChild(s);
      requestAnimationFrame(() => {
        s.style.opacity = '1';
        s.style.transform = `translateY(-10px) scale(1)`;
      });
      setTimeout(() => {
        s.style.opacity = '0';
        s.style.transform = `translateY(6px) scale(.6)`;
      }, 420 + i*18);
    }
  }

  function openInvite(){
    if(body.classList.contains('showPages')) return;
    burstSparkles();
    body.classList.add('showPages');
    // after opening, auto scroll to first page
    setTimeout(() => {
      pages.scrollTo({ top: 0, behavior: 'smooth' });
    }, 250);
  }

  envelope?.addEventListener('click', openInvite);
  envelope?.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openInvite(); }
  });

  goDown?.addEventListener('click', () => {
    openInvite();
    setTimeout(() => {
      pages.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' });
    }, 200);
  });

  // Countdown to 31 July 2026 11:00 local time
  const target = new Date(2026, 6, 31, 11, 0, 0); // month is 0-based
  const el = {
    d: document.getElementById('cdDays'),
    h: document.getElementById('cdHours'),
    m: document.getElementById('cdMins'),
    s: document.getElementById('cdSecs'),
  };

  function pad2(n){ return String(n).padStart(2,'0'); }
  function tick(){
    const now = new Date();
    let diff = Math.max(0, target.getTime() - now.getTime());
    const days = Math.floor(diff / (1000*60*60*24));
    diff -= days*(1000*60*60*24);
    const hours = Math.floor(diff / (1000*60*60));
    diff -= hours*(1000*60*60);
    const mins = Math.floor(diff / (1000*60));
    diff -= mins*(1000*60);
    const secs = Math.floor(diff / 1000);

    if(el.d) el.d.textContent = String(days);
    if(el.h) el.h.textContent = pad2(hours);
    if(el.m) el.m.textContent = pad2(mins);
    if(el.s) el.s.textContent = pad2(secs);
  }
  tick();
  setInterval(tick, 1000);
})();
