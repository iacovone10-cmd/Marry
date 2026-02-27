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
  const clamp=i=>Math.max(0, Math.min(pages().length-1, i));
  let lock=false;

  function update(){ if(bmLabel) bmLabel.textContent = title(index) || 'Invito'; }
  function apply(){ pager.style.transform = `translate3d(0,${-index*100}%,0)`; }

  function go(i){
    index = clamp(i);
    apply();
    update();
    lock = true;
    setTimeout(()=> lock=false, 260);
  }
  function next(){ if(lock) return; go(index+1); }
  function prev(){ if(lock) return; go(index-1); }

  if(openBtn){
    openBtn.addEventListener('click', ()=>{
      openBtn.classList.add('tap');
      setTimeout(()=>openBtn.classList.remove('tap'), 220);
      document.body.classList.add('open');
      go(0);
    });
  }
  if(closeBtn){
    closeBtn.addEventListener('click', ()=>{ document.body.classList.remove('open'); });
  }

  bmUp.addEventListener('click', prev);
  bmDown.addEventListener('click', next);

  pager.addEventListener('wheel', (e)=>{
    if(Math.abs(e.deltaY) < 18) return;
    e.preventDefault();
    e.deltaY > 0 ? next() : prev();
  }, {passive:false});

  let sy=null;
  pager.addEventListener('touchstart', e=>{ sy = e.touches[0].clientY; }, {passive:true});
  pager.addEventListener('touchend', e=>{
    if(sy===null) return;
    const ey = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientY : sy;
    const dy = ey - sy;
    if(Math.abs(dy) > 50){ dy < 0 ? next() : prev(); }
    sy = null;
  }, {passive:true});

  window.addEventListener('keydown', e=>{
    if(!document.body.classList.contains('open')) return;
    if(e.key === 'ArrowDown') next();
    if(e.key === 'ArrowUp') prev();
    if(e.key === 'Escape') document.body.classList.remove('open');
  });

  update();
})();