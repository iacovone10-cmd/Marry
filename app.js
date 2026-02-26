(()=>{
  const o=document.getElementById('open');
  const c=document.getElementById('close');
  const pager=document.getElementById('pager');
  const bmUp=document.getElementById('bmUp');
  const bmDown=document.getElementById('bmDown');
  const bmLabel=document.getElementById('bmLabel');

  let index=0;
  const pages=()=>Array.from(pager.querySelectorAll('.page'));

  function pageTitle(i){
    const p=pages()[i];
    return (p && p.getAttribute('data-title')) || '';
  }
  function updateBookmark(){
    if(bmLabel) bmLabel.textContent = pageTitle(index) || 'Invito';
  }

  function go(to){
    const max=pages().length-1;
    index=Math.max(0,Math.min(max,to));
    pager.style.transform=`translateY(${-index*100}%)`;
    updateBookmark();
  }

  o.onclick=()=>{document.body.classList.add('open');go(0)};
  c.onclick=()=>{document.body.classList.remove('open')};
  bmUp.onclick=()=>go(index-1);
  bmDown.onclick=()=>go(index+1);

  // Swipe up/down
  let sy=null;
  pager.addEventListener('touchstart',e=>{sy=e.touches[0].clientY},{passive:true});
  pager.addEventListener('touchend',e=>{
    if(sy===null) return;
    const ey=(e.changedTouches && e.changedTouches[0])?e.changedTouches[0].clientY:sy;
    const dy=ey-sy;
    if(Math.abs(dy)>50){
      if(dy<0) go(index+1); else go(index-1);
    }
    sy=null;
  });

  // Keyboard (desktop)
  window.addEventListener('keydown',(e)=>{
    if(!document.body.classList.contains('open')) return;
    if(e.key==='ArrowDown') go(index+1);
    if(e.key==='ArrowUp') go(index-1);
    if(e.key==='Escape') document.body.classList.remove('open');
  });

  // Mobile app opening helpers
  function isMobile(){
    const ua=navigator.userAgent||'';
    return /android|iphone|ipad|ipod/i.test(ua);
  }
  function openWithFallback(primaryUrl, fallbackUrl){
    const t0=Date.now();
    window.location.href=primaryUrl;
    setTimeout(()=>{
      if(Date.now()-t0<1400){
        window.location.href=fallbackUrl;
      }
    },700);
  }

  // WhatsApp deep link + fallback
  document.querySelectorAll('a[data-wa-text]').forEach(a=>{
    a.addEventListener('click',(e)=>{
      if(!isMobile()) return;
      e.preventDefault();
      const text=a.getAttribute('data-wa-text')||'';
      const enc=encodeURIComponent(text);
      const fallback=a.href;
      const primary=`whatsapp://send?text=${enc}`;
      openWithFallback(primary, fallback);
    });
  });

  // Maps deep link + fallback (geo scheme)
  document.querySelectorAll('a[data-map-query]').forEach(a=>{
    a.addEventListener('click',(e)=>{
      if(!isMobile()) return;
      e.preventDefault();
      const q=a.getAttribute('data-map-query')||'';
      const enc=encodeURIComponent(q);
      const geo=`geo:0,0?q=${enc}`;
      openWithFallback(geo, a.href);
    });
  });

  updateBookmark();
})();