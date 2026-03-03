(()=>{
  const seal=document.getElementById('sealBtn');
  const cover=document.getElementById('cover');
  const overlay=document.getElementById('overlay');
  const close=document.getElementById('closeBtn');

  seal.addEventListener('click',()=>{
    document.body.classList.add('opening');
    setTimeout(()=>{
      document.body.classList.remove('opening');
      document.body.classList.add('open');
      cover.style.display='none'; // ✅ sigillo sparisce definitivamente
    },400);
  });

  close.addEventListener('click',()=>{
    document.body.classList.remove('open');
    cover.style.display='block';
  });
})();