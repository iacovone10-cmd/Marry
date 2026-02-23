let current = 1;

function showSlide(n){
  const slides = document.querySelectorAll(".slide");
  slides.forEach(s => s.classList.remove("active"));
  const el = document.getElementById("slide" + n);
  if(el) el.classList.add("active");
  current = n;
}

function nextSlide(){
  if(current < 3) showSlide(current + 1);
}

function prevSlide(){
  if(current > 1) showSlide(current - 1);
}

document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openBtn");
  const toDetailsBtn = document.getElementById("toDetailsBtn");
  const backTo1Btn = document.getElementById("backTo1Btn");
  const backTo2Btn = document.getElementById("backTo2Btn");

  openBtn?.addEventListener("click", () => showSlide(2));
  toDetailsBtn?.addEventListener("click", () => showSlide(3));
  backTo1Btn?.addEventListener("click", () => showSlide(1));
  backTo2Btn?.addEventListener("click", () => showSlide(2));

  document.addEventListener("keydown", (e) => {
    if(e.key === "ArrowRight") nextSlide();
    if(e.key === "ArrowLeft") prevSlide();
  });

  showSlide(1);
});
