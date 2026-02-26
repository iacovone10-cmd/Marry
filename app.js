(()=>{
  const o=document.getElementById('open');
  const c=document.getElementById('close');
  const pager=document.getElementById('pager');
  const bmUp=document.getElementById('bmUp');
  const bmDown=document.getElementById('bmDown');
  const bmLabel=document.getElementById('bmLabel');
  let index=0;
  const pages=()=>Array.from(pager.querySelectorAll('.page'));
  function pageTitle(i){return pages()[i]?.getAttribute('data-title')||''}
  function updateBookmark(){bmLabel.textContent=pageTitle(index)||'Invito'}
  function go(to){index=Math.max(0,Math.min(pages().length-1,to));pager.style.transform=`translateY(${-index*100}%)`;updateBookmark()}
  o.onclick=()=>{document.body.classList.add('open');go(0)};
  c.onclick=()=>{document.body.classList.remove('open')};
  bmUp.onclick=()=>go(index-1);
  bmDown.onclick=()=>go(index+1);
  updateBookmark();
})();