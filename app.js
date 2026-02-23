(() => {
  const envelope = document.getElementById("envelope");
  const sealWrap = document.getElementById("sealWrap");
  const hintTop = document.getElementById("hintTop");
  const goDown = document.getElementById("goDown");
  const details = document.getElementById("details");
  const scroll = document.getElementById("scroll");
  const dust = document.getElementById("dust");
  const sparkles = document.getElementById("sparkles");
  const backTop = document.getElementById("backTop");

  let opened = false;

  // Particelle leggere in background
  function seedDust(){
    if(!dust) return;
    dust.innerHTML = "";
    const count = 26;
    for(let i=0;i<count;i++){
      const p = document.createElement("i");
      p.style.left = (Math.random()*100) + "%";
      p.style.top  = (Math.random()*100) + "%";
      p.style.setProperty("--dx", (Math.random()*260 - 130).toFixed(0) + "px");
      p.style.setProperty("--dy", (-(Math.random()*260 + 140)).toFixed(0) + "px");
      p.style.animationDelay = (Math.random()*6).toFixed(2) + "s";
      p.style.animationDuration = (7 + Math.random()*6).toFixed(2) + "s";
      dust.appendChild(p);
    }
  }
  seedDust();

  // Evita “peek” su alcuni Android: forza top a load
  window.addEventListener("load", () => {
    try { scroll.scrollTo({ top: 0, left: 0, behavior: "instant" }); } catch(_) { scroll.scrollTop = 0; }
    window.scrollTo(0,0);
  });

  function makeSparkles(){
    if(!sparkles) return;
    sparkles.innerHTML = "";
    sparkles.classList.add("on");

    for(let i=0;i<16;i++){
      const s = document.createElement("span");
      s.className = "spark";
      s.style.left = "50%";
      s.style.top = "50%";
      s.style.setProperty("--dx", (Math.random()*260-130).toFixed(0)+"px");
      s.style.setProperty("--dy", (Math.random()*210-105).toFixed(0)+"px");
      sparkles.appendChild(s);
    }

    setTimeout(() => {
      sparkles.classList.remove("on");
      sparkles.innerHTML = "";
    }, 1100);
  }

  function unlockScroll(){
    document.body.classList.remove("locked");
    try { scroll.scrollTo({ top: 0, behavior: "instant" }); } catch(_) { scroll.scrollTop = 0; }
  }

  function openEnvelope(e){
    e?.preventDefault?.();
    if(opened) return;
    opened = true;

    envelope.classList.add("focusSeal");

    try { navigator.vibrate && navigator.vibrate([18, 30, 18]); } catch(_){}

    // crack + sparkles
    setTimeout(() => {
      envelope.classList.add("crack");
      makeSparkles();
    }, 160);

    setTimeout(() => {
      envelope.classList.remove("crack");
      envelope.classList.add("opening");
    }, 460);

    setTimeout(() => {
      envelope.classList.remove("opening");
      envelope.classList.add("opened");

      if (hintTop){
        hintTop.style.opacity = "0";
        hintTop.style.pointerEvents = "none";
      }

      unlockScroll();
    }, 920);
  }

  sealWrap?.addEventListener("click", openEnvelope);
  envelope?.addEventListener("click", openEnvelope);

  envelope?.addEventListener("keydown", (e) => {
    if(e.key === "Enter" || e.key === " "){
      e.preventDefault();
      openEnvelope(e);
    }
  });

  goDown?.addEventListener("click", () => {
    if(!opened){
      openEnvelope();
      setTimeout(() => details?.scrollIntoView({ behavior: "smooth", block: "start" }), 980);
      return;
    }
    details?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  backTop?.addEventListener("click", () => {
    scroll?.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
