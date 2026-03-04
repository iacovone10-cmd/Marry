const pages = Array.from(document.querySelectorAll('.page'));
let currentIndex = 0;

function showPage(index) {
  pages.forEach(p => p.classList.remove('active'));
  pages[index].classList.add('active');
  currentIndex = index;
}

function goNext() {
  if (currentIndex < pages.length - 1) showPage(currentIndex + 1);
}

function goPrev() {
  if (currentIndex > 0) showPage(currentIndex - 1);
}

/* Tap navigation:
   - click a destra: avanti
   - click a sinistra: indietro
   - se clicchi un link (hotspot) NON deve cambiare pagina
*/
document.querySelectorAll('.nav-tap').forEach(container => {
  container.addEventListener('click', (e) => {
    // se ho cliccato un link/hotspot o bottone, non navigare
    if (e.target.closest('a') || e.target.closest('button')) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isRight = x > rect.width / 2;

    if (isRight) goNext();
    else goPrev();
  });
});
