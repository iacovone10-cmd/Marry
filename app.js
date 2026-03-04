const pages = Array.from(document.querySelectorAll('.page'));
let currentIndex = 0;

function showPage(index){
  pages.forEach(p => p.classList.remove('active'));
  pages[index].classList.add('active');
  currentIndex = index;
}

function goNext(){
  if(currentIndex < pages.length - 1) showPage(currentIndex + 1);
}

function goPrev(){
  if(currentIndex > 0) showPage(currentIndex - 1);
}

/* Tap navigation:
   - tap/click a destra: avanti
   - tap/click a sinistra: indietro
   - se tocchi un link/bottone: NON cambiare pagina
*/
document.querySelectorAll('.nav-tap').forEach(container => {
  container.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('a') || target.closest('button')) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isRight = x > rect.width / 2;

    if (isRight) goNext();
    else goPrev();
  }, { passive: true });
});

// opzionale: swipe su mobile (se vuoi lo aggiungiamo dopo)
