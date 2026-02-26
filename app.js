(()=>{
  const o=document.getElementById('open');
  const c=document.getElementById('close');
  const pager=document.getElementById('pager');
  const bmUp=document.getElementById('bmUp');
  const bmDown=document.getElementById('bmDown');
  const bmLabel=document.getElementById('bmLabel');
  let index=0;
  const pages=()=>Array.from(pager.querySelectorAll('.page'));
  function pageTitle(i){const p=pages()[i];return (p&&p.getAttribute('data-title'))||''}
  function updateBookmark(){if(bmLabel) bmLabel.textContent=pageTitle(index)||'Invito'}
  function go(to){const max=pages().length-1;index=Math.max(0,Math.min(max,to));pager.style.transform=`translateY(${-index*100}%)`;updateBookmark()}
  o.onclick=()=>{document.body.classList.add('open');go(0)};
  c.onclick=()=>{document.body.classList.remove('open')};
  bmUp.onclick=()=>go(index-1);
  bmDown.onclick=()=>go(index+1);
  let sy=null;
  pager.addEventListener('touchstart',e=>{sy=e.touches[0].clientY},{passive:true});
  pager.addEventListener('touchend',e=>{if(sy===null)return;const ey=e.changedTouches?.[0]?.clientY??sy;const dy=ey-sy;if(Math.abs(dy)>50){dy<0?go(index+1):go(index-1)}sy=null});
  window.addEventListener('keydown',e=>{if(!document.body.classList.contains('open'))return;if(e.key==='ArrowDown')go(index+1);if(e.key==='ArrowUp')go(index-1);if(e.key==='Escape')document.body.classList.remove('open')});
  updateBookmark();
})();