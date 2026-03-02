(()=>{
  const openBtn=document.getElementById('open');
  const closeBtn=document.getElementById('close');
  const pager=document.getElementById('pager');
  const bmUp=document.getElementById('bmUp');
  const bmDown=document.getElementById('bmDown');

  function open(){document.body.classList.add('open');pager.scrollTop=0}
  function close(){document.body.classList.remove('open')}

  openBtn.addEventListener('click',open);
  closeBtn.addEventListener('click',close);

  bmUp.addEventListener('click',()=>pager.scrollBy({top:-pager.clientHeight,behavior:'smooth'}));
  bmDown.addEventListener('click',()=>pager.scrollBy({top:pager.clientHeight,behavior:'smooth'}));
})();