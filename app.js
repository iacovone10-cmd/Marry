(()=>{
  const openBtn=document.getElementById('open');
  const closeBtn=document.getElementById('close');
  const pager=document.getElementById('pager');
  const bmUp=document.getElementById('bmUp');
  const bmDown=document.getElementById('bmDown');

  function open(){ document.body.classList.add('open'); pager.scrollTop = 0; }
  function close(){ document.body.classList.remove('open'); }

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);

  // page-by-page scroll using viewport height
  bmUp.addEventListener('click', ()=> pager.scrollBy({ top: -pager.clientHeight, behavior: 'smooth' }));
  bmDown.addEventListener('click', ()=> pager.scrollBy({ top: pager.clientHeight, behavior: 'smooth' }));

  // wheel support (desktop) while preserving mobile scroll
  pager.addEventListener('wheel', (e)=>{
    // only intercept if wheel is used
    if(Math.abs(e.deltaY) < 10) return;
  }, {passive:true});
})();