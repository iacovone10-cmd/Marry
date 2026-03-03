(()=>{
  const openBtn=document.getElementById('open');
  const closeBtn=document.getElementById('close');
  const overlay=document.getElementById('overlay');
  const pager=document.getElementById('pager');
  openBtn.onclick=()=>{document.body.classList.add('open');pager.scrollTop=0;overlay.setAttribute('aria-hidden','false')}
  closeBtn.onclick=()=>{document.body.classList.remove('open');overlay.setAttribute('aria-hidden','true')}
})();