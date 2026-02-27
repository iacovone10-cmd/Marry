(()=>{
  const openBtn=document.getElementById('open');
  const closeBtn=document.getElementById('close');
  const pager=document.getElementById('pager');
  const bmUp=document.getElementById('bmUp');
  const bmDown=document.getElementById('bmDown');
  let index=0;
  const pages=()=>Array.from(pager.querySelectorAll('.page'));
  const clamp=i=>Math.max(0,Math.min(pages().length-1,i));
  let lock=false;
  function go(i){
    index=clamp(i);
    pager.style.transform=`translateY(${-index*100}%)`;
    lock=true; setTimeout(()=>lock=false,260);
  }
  function next(){ if(lock) return; go(index+1); }
  function prev(){ if(lock) return; go(index-1); }
  openBtn.onclick=()=>{document.body.classList.add('open');go(0)};
  closeBtn.onclick=()=>{document.body.classList.remove('open')};
  bmUp.onclick=prev; bmDown.onclick=next;
  pager.addEventListener('wheel',e=>{ e.preventDefault(); e.deltaY>0?next():prev(); },{passive:false});
  let sy=null;
  pager.addEventListener('touchstart',e=>{sy=e.touches[0].clientY});
  pager.addEventListener('touchend',e=>{const dy=e.changedTouches[0].clientY-sy; if(Math.abs(dy)>40){dy<0?next():prev()} sy=null});
})();