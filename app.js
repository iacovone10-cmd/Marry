(() => {
  const sealBtn = document.getElementById("sealBtn");
  const napoliCard = document.getElementById("napoliCard");
  const details = document.getElementById("details");
  const dust = document.getElementById("dust");
  const helper = document.getElementById("helper");
  const backTop = document.getElementById("backTop");

  let opened = false;

  // particelle leggere
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

  // forza top (evita che si “posizioni” a metà su alcuni Android)
  window.addEventListener("load", () => {
    window.scrollTo(0,0);
  });

  function unlockAndOpen(){
    if(opened) return;
    opened = true;

    // animazione foil
    napoliCard?.classList.add("opening");

    // haptic se disponibile
    try { navigator.vibrate && navigator.vibrate([18, 30, 18]); } catch(_){}

    // sblocca scroll + mostra dettagli
    setTimeout(() => {
      document.body.classList.remove("locked");
      document.body.classList.add("opened");
      if(helper){
        helper.style.opacity = "0";
        helper.style.transform = "translateY(-6px)";
      }
    }, 450);

    // scroll ai dettagli in modo cinematografico
    setTimeout(() => {
      details?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 900);

    setTimeout(() => napoliCard?.classList.remove("opening"), 1200);
  }

  sealBtn?.addEventListener("click", unlockAndOpen);

  // Torna su
  backTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
