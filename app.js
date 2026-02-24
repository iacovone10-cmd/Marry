(()=>{
 const o=document.getElementById('open');
 const c=document.getElementById('close');
 const ov=document.getElementById('overlay');
 o.onclick=()=>{document.body.classList.add('open');ov.setAttribute('aria-hidden','false')};
 c.onclick=()=>{document.body.classList.remove('open');ov.setAttribute('aria-hidden','true')};
})();