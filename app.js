(()=>{
  const openBtn=document.getElementById('open');
  const closeBtn=document.getElementById('close');
  const pager=document.getElementById('pager');
  const bmUp=document.getElementById('bmUp');
  const bmDown=document.getElementById('bmDown');
  let index=0;
  const pages=()=>Array.from(pager.querySelectorAll('.page'));
  const clamp=i=>Math.max(0,Math.min(pages().length-1,i));
  function go(i){index=clamp(i);pager.style.transform=`translateY(${-index*100}%)`}
  openBtn.onclick=()=>{document.body.classList.add('open');go(0)};
  closeBtn.onclick=()=>{document.body.classList.remove('open')};
  bmUp.onclick=()=>go(index-1);
  bmDown.onclick=()=>go(index+1);
})();