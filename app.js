(() => {
  const openBtn = document.getElementById('open');
  const closeBtn = document.getElementById('close');
  const paper = document.getElementById('paper');

  function open(){
    document.body.classList.add('open');
    paper.setAttribute('aria-hidden','false');
  }
  function close(){
    document.body.classList.remove('open');
    paper.setAttribute('aria-hidden','true');
  }

  openBtn?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);

  // chiudi tap fuori carta
  paper?.addEventListener('click', (e) => {
    if(e.target === paper) close();
  });

  // esc
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') close();
  });
})();
