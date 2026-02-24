(() => {
 const open=document.getElementById('open');
 const close=document.getElementById('close');
 const overlay=document.getElementById('overlay');
 open.onclick=()=>{document.body.classList.add('open');overlay?.setAttribute('aria-hidden','false')};
 close.onclick=()=>{document.body.classList.remove('open');overlay?.setAttribute('aria-hidden','true')};
})();