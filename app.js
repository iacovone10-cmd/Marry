(()=>{
  const openBtn=document.getElementById('open');
  const closeBtn=document.getElementById('close');
  const pager=document.getElementById('pager');
  const bmUp=document.getElementById('bmUp');
  const bmDown=document.getElementById('bmDown');
  const bmLabel=document.getElementById('bmLabel');

  let index=0;
  const pages=()=>Array.from(pager.querySelectorAll('.page'));
  const title=i=>pages()[i]?.getAttribute('data-title')||'';
  const update=()=>{ if(bmLabel) bmLabel.textContent = title(index) || 'Invito'; };

  const clamp=i=>Math.max(0,Math.min(pages().length-1,i));

  let lock=false;
  function go(i){
    index=clamp(i);
    pager.style.transform=`translateY(${-index*100}%)`;
    update();
    lock=true;
    setTimeout(()=>lock=false,260);
  }

  function next(){ if(lock) return; go(index+1); }
  function prev(){ if(lock) return; go(index-1); }

  // Auto-open on mobile
  if(window.matchMedia && window.matchMedia('(max-width:767px)').matches){
    document.body.classList.add('open');
  }

  if(openBtn) openBtn.onclick=()=>{document.body.classList.add('open');go(0)};
  if(closeBtn) closeBtn.onclick=()=>{document.body.classList.remove('open')};

  bmUp.onclick=prev;
  bmDown.onclick=next;

  // Wheel: must prevent default to avoid browser bounce blocking upward navigation
  pager.addEventListener('wheel',e=>{
    if(Math.abs(e.deltaY)<18) return;
    e.preventDefault();
    e.deltaY>0 ? next() : prev();
  },{passive:false});

  // Touch swipe
  let sy=null;
  pager.addEventListener('touchstart',e=>{sy=e.touches[0].clientY},{passive:true});
  pager.addEventListener('touchend',e=>{
    if(sy===null) return;
    const ey=e.changedTouches?.[0]?.clientY ?? sy;
    const dy=ey-sy;
    if(Math.abs(dy)>50){ dy<0 ? next() : prev(); }
    sy=null;
  },{passive:true});

  // Keyboard
  window.addEventListener('keydown',e=>{
    if(!document.body.classList.contains('open')) return;
    if(e.key==='ArrowDown') next();
    if(e.key==='ArrowUp') prev();
    if(e.key==='Escape') document.body.classList.remove('open');
  });

  // Init
  update();
})();