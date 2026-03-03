(()=>{
  const openBtn=document.getElementById('open');
  const closeBtn=document.getElementById('close');
  const overlay=document.getElementById('overlay');
  const pager=document.getElementById('pager');

  function open(){
    document.body.classList.add('opening');
    // after the flash, open overlay
    setTimeout(()=>{
      document.body.classList.remove('opening');
      document.body.classList.add('open');
      pager.scrollTop=0;
      overlay.setAttribute('aria-hidden','false');
    }, 260);
  }
  function close(){
    document.body.classList.remove('open');
    overlay.setAttribute('aria-hidden','true');
  }

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
})();