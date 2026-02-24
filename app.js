(()=>{
 const o=document.getElementById('open');
 const c=document.getElementById('close');
 const ov=document.getElementById('overlay');
 o.onclick=()=>{document.body.classList.add('open')};
 c.onclick=()=>{document.body.classList.remove('open')};
})();