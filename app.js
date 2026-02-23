(() => {
  const stage = document.getElementById("stage");
  const envelope = document.getElementById("envelope");
  const scrollHint = document.getElementById("scrollHint");
  const scrollBtn = document.getElementById("scrollBtn");
  const nextBtn = document.getElementById("nextBtn");
  const backTop = document.getElementById("backTop");

  const screenDetails = document.getElementById("screen-details");
  const screenEnvelope = document.getElementById("screen-envelope");

  let opened = false;

  function smoothTo(el){
    if(!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function openEnvelope(){
    if(opened) return;
    opened = true;

    try { navigator.vibrate && navigator.vibrate(18); } catch(e){}

    envelope.classList.add("is-open");
    scrollHint.hidden = false;

    // Auto scroll after animation
    window.setTimeout(() => {
      smoothTo(screenDetails);
    }, 1050);
  }

  envelope.addEventListener("click", (e) => {
    e.preventDefault();
    openEnvelope();
  }, { passive: false });

  envelope.addEventListener("keydown", (e) => {
    if(e.key === "Enter" || e.key === " "){
      e.preventDefault();
      openEnvelope();
    }
  });

  scrollBtn?.addEventListener("click", () => smoothTo(screenDetails));

  nextBtn?.addEventListener("click", () => {
    const thanks = document.getElementById("screen-thanks");
    smoothTo(thanks);
  });

  backTop?.addEventListener("click", () => smoothTo(screenEnvelope));

  // prevent accidental scroll before opening (some Android browsers)
  stage.addEventListener("scroll", () => {
    if(!opened && stage.scrollTop > 8){
      stage.scrollTop = 0;
    }
  }, { passive: true });

  // If user reloads while down the page, keep state coherent
  window.addEventListener("load", () => {
    if(stage.scrollTop > 20){
      envelope.classList.add("is-open");
      scrollHint.hidden = false;
      opened = true;
    }
  });
})();
