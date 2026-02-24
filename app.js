const btn=document.getElementById('open');
const details=document.getElementById('details');
btn.addEventListener('click',()=>{
  document.body.classList.add('open');
  details.setAttribute('aria-hidden','false');
  details.scrollIntoView({behavior:'smooth'});
});