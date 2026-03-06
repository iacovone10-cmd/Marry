const pages = Array.from(document.querySelectorAll('.page'));
let currentIndex = 0;
let isTransitioning = false;

function showPage(index){
  if (isTransitioning || index < 0 || index >= pages.length) return;

  isTransitioning = true;

  const currentPage = pages[currentIndex];
  const nextPage = pages[index];

  if (currentPage) {
    currentPage.classList.add('fade-out');
  }

  setTimeout(() => {
    pages.forEach(p => {
      p.classList.remove('active', 'fade-out');
    });

    nextPage.classList.add('active');
    currentIndex = index;

    isTransitioning = false;
  }, 320);
}

function goNext(){
  if(currentIndex < pages.length - 1){
    showPage(currentIndex + 1);
  }
}

function goPrev(){
  if(currentIndex > 0){
    showPage(currentIndex - 1);
  }
}

/* tap navigation */
document.querySelectorAll('.nav-tap').forEach(container => {
  container.addEventListener('click', (e) => {
    const target = e.target;

    /* se clicco su link o bottone non cambio pagina */
    if (target.closest('a') || target.closest('button')) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isRight = x > rect.width / 2;

    if (isRight) goNext();
    else goPrev();
  }, { passive:true });
});

/* swipe mobile */
let touchStartX = 0;
let touchEndX = 0;

document.querySelectorAll('.nav-tap').forEach(container => {
  container.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive:true });

  container.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe(e);
  }, { passive:true });
});

function handleSwipe(e){
  const target = e.target;
  if (target.closest('a') || target.closest('button')) return;

  const delta = touchEndX - touchStartX;

  if (Math.abs(delta) < 50) return;

  if (delta < 0) {
    goNext();
  } else {
    goPrev();
  }
}