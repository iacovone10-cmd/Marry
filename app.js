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

  function update(){ if(bmLabel) bmLabel.textContent = title(index) || 'Invito'; }
  function go(i){ index=Math.max(0,Math.min(pages().length-1,i)); pager.style.transform=`translateY(${-index*100}%)`; update(); }

  if(openBtn) openBtn.onclick=()=>{document.body.classList.add('open');go(0)};
  if(closeBtn) closeBtn.onclick=()=>{document.body.classList.remove('open')};

  bmUp.onclick=()=>go(index-1);
  bmDown.onclick=()=>go(index+1);

  pager.addEventListener('wheel',e=>{ e.preventDefault(); e.deltaY>0?go(index+1):go(index-1); },{passive:false});

  let sy=null;
  pager.addEventListener('touchstart',e=>{sy=e.touches[0].clientY});
  pager.addEventListener('touchend',e=>{const dy=(e.changedTouches[0].clientY-sy); if(Math.abs(dy)>40){dy<0?go(index+1):go(index-1)} sy=null});

  update();
})();