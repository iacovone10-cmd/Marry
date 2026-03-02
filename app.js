(()=>{
  const openBtn = document.getElementById('open');
  const closeBtn = document.getElementById('close');
  const pager = document.getElementById('pager');

  function open(){
    document.body.classList.add('open');
    pager.scrollTop = 0;
    document.getElementById('overlay').setAttribute('aria-hidden','false');
  }
  function close(){
    document.body.classList.remove('open');
    document.getElementById('overlay').setAttribute('aria-hidden','true');
  }

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);

  // ESC to close (desktop)
  window.addEventListener('keydown', (e)=>{
    if(e.key==='Escape') close();
  });
})();