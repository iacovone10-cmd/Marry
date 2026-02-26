(()=>{
  const o=document.getElementById('open');
  const c=document.getElementById('close');
  const pager=document.getElementById('pager');
  const up=document.getElementById('up');
  const down=document.getElementById('down');
  const dotsWrap=document.getElementById('dots');

  let index=0;
  const pages=()=>Array.from(pager.querySelectorAll('.page'));

  function renderDots(){
    dotsWrap.innerHTML='';
    pages().forEach((_,i)=>{
      const d=document.createElement('div');
      d.className='dot'+(i===index?' active':'');
      dotsWrap.appendChild(d);
    });
  }

  function go(to){
    const max=pages().length-1;
    index=Math.max(0,Math.min(max,to));
    pager.style.transform=`translateY(${-index*100}%)`;
    renderDots();
  }

  o.onclick=()=>{document.body.classList.add('open');go(0)};
  c.onclick=()=>{document.body.classList.remove('open')};
  up.onclick=()=>go(index-1);
  down.onclick=()=>go(index+1);

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

  // Fix app opening on mobile: prefer deep-links with safe fallbacks.
  function isMobile(){
    const ua=navigator.userAgent||'';
    return /android|iphone|ipad|ipod/i.test(ua);
  }

  function openWithFallback(primaryUrl, fallbackUrl){
    // Must be called from a user gesture. Chrome won't launch external app without user gesture.
    // (See Android intents guidance: user gesture required, fallback URL allowed.)
    const t0=Date.now();
    window.location.href=primaryUrl;
    // fallback after short delay
    setTimeout(()=>{
      if(Date.now()-t0<1400){
        window.location.href=fallbackUrl;
      }
    },700);
  }

  // WhatsApp
  document.querySelectorAll('a[data-wa-text]').forEach(a=>{
    a.addEventListener('click',(e)=>{
      if(!isMobile()) return; // desktop uses normal link
      e.preventDefault();
      const text=a.getAttribute('data-wa-text')||'';
      const enc=encodeURIComponent(text);
      const fallback=a.href; // api.whatsapp.com
      const primary=`whatsapp://send?text=${enc}`;
      openWithFallback(primary, fallback);
    });
  });

  // Maps
  document.querySelectorAll('a[data-map-query]').forEach(a=>{
    a.addEventListener('click',(e)=>{
      if(!isMobile()) return;
      e.preventDefault();
      const q=a.getAttribute('data-map-query')||'';
      const enc=encodeURIComponent(q);
      const geo=`geo:0,0?q=${enc}`;
      // fallback: existing https short link
      openWithFallback(geo, a.href);
    });
  });

  renderDots();
})();