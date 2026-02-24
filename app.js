(() => {
  const openBtn = document.getElementById('open');
  const closeBtn = document.getElementById('close');
  const overlay = document.getElementById('overlay');

  function open(){
    document.body.classList.add('open');
    overlay.setAttribute('aria-hidden','false');
  }
  function close(){
    document.body.classList.remove('open');
    overlay.setAttribute('aria-hidden','true');
  }

  openBtn?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  overlay?.addEventListener('click', (e) => { if(e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') close(); });
})();
