(() => {
  const openBtn = document.getElementById('open');
  const details = document.getElementById('details');

  function open(){
    details.scrollIntoView({behavior:'smooth'});
  }
  openBtn?.addEventListener('click', open);
})();
