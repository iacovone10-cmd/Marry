(()=>{
  const openBtn = document.getElementById('open');
  const closeBtn = document.getElementById('close');
  const pager = document.getElementById('pager');
  const overlay = document.getElementById('overlay');

  function open(){ document.body.classList.add('open'); pager.scrollTop = 0; overlay.setAttribute('aria-hidden','false'); }
  function close(){ document.body.classList.remove('open'); overlay.setAttribute('aria-hidden','true'); }

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  window.addEventListener('keydown', (e)=>{ if(e.key==='Escape') close(); });
})();