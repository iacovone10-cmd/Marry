(() => {
  const envelope = document.getElementById("envelope");
  const sealWrap = document.getElementById("sealWrap");
  const hintTop = document.getElementById("hintTop");
  const goDown = document.getElementById("goDown");
  const sparkles = document.getElementById("sparkles");
  const details = document.getElementById("details");
  const scroll = document.getElementById("scroll");
  const backTop = document.getElementById("backTop");

  let opened = false;

  function makeSparkles(){
    if(!sparkles) return;
    sparkles.innerHTML = "";
    sparkles.classList.add("on");

    for(let i=0;i<14;i++){
      const s = document.createElement("span");
      s.className = "spark";
      s.style.left = "50%";
      s.style.top = "50%";
      s.style.setProperty("--dx", (Math.random()*240-120).toFixed(0)+"px");
      s.style.setProperty("--dy", (Math.random()*200-100).toFixed(0)+"px");
      sparkles.appendChild(s);
    }

    setTimeout(() => {
      sparkles.classList.remove("on");
      sparkles.innerHTML = "";
    }, 1100);
  }

  function unlockScroll(){
    // sblocca la pagina: da qui in poi puoi scrollare senza blocchi
    document.body.classList.remove("locked");
  }

  function openSeal(e){
    e?.preventDefault?.();
    if(opened) return;
    opened = true;

    envelope.classList.add("focusSeal");

    try { navigator.vibrate && navigator.vibrate([18, 30, 18]); } catch(_){}

    setTimeout(() => {
      envelope.classList.add("opening");
      makeSparkles();
    }, 220);

    setTimeout(() => {
      envelope.classList.remove("opening");
      envelope.classList.add("opened");
      if (hintTop){
        hintTop.style.opacity = "0";
        hintTop.style.pointerEvents = "none";
      }

      // IMPORTANTISSIMO: sblocco scroll dopo l'apertura
      unlockScroll();
    }, 720);
  }

  // tap sul sigillo o sulla busta
  sealWrap?.addEventListener("click", openSeal);
  envelope?.addEventListener("click", openSeal);

  // accessibilità (Enter / Space)
  envelope?.addEventListener("keydown", (e) => {
    if(e.key === "Enter" || e.key === " "){
      e.preventDefault();
      openSeal(e);
    }
  });

  // scorri alla sezione dettagli (solo dopo apertura, così non “si blocca”)
  goDown?.addEventListener("click", () => {
    if(!opened){
      openSeal();
      // piccolo delay per dare tempo allo sblocco e all'animazione
      setTimeout(() => details?.scrollIntoView({ behavior: "smooth", block: "start" }), 820);
      return;
    }
    details?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  backTop?.addEventListener("click", () => {
    // torna su senza glitch
    scroll?.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
