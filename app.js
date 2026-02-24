(() => {
  const openBtn = document.getElementById('open');
  const closeBtn = document.getElementById('close');
  const overlay = document.getElementById('overlay');

  function open(){
    document.body.classList.add('press');
    setTimeout(() => document.body.classList.remove('press'), 140);

    document.body.classList.add('opening');
    setTimeout(() => {
      document.body.classList.remove('opening');
      document.body.classList.add('open');
      overlay.setAttribute('aria-hidden','false');
    }, 260);
  }

  function close(){
    document.body.classList.remove('open');
    document.body.classList.remove('opening');
    overlay.setAttribute('aria-hidden','true');
  }

  openBtn?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  overlay?.addEventListener('click', (e) => { if(e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') close(); });
})();
