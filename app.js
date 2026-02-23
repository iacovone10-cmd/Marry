(() => {
  const envelope = document.getElementById("envelope");
  const sealWrap = document.getElementById("sealWrap");
  const hintTop = document.getElementById("hintTop");
  const goDown = document.getElementById("goDown");
  const sparkles = document.getElementById("sparkles");

  let opened = false;

  function makeSparkles(){
    if(!sparkles) return;
    sparkles.innerHTML = "";
    sparkles.classList.add("on");

    for(let i=0;i<16;i++){
      const s=document.createElement("span");
      s.className="spark";
      s.style.left="50%";
      s.style.top="54%";
      s.style.setProperty("--dx", (Math.random()*260-130).toFixed(0)+"px");
      s.style.setProperty("--dy", (Math.random()*220-110).toFixed(0)+"px");
      sparkles.appendChild(s);
    }

    setTimeout(()=>{
      sparkles.classList.remove("on");
      sparkles.innerHTML = "";
    }, 1100);
  }

  function openSeal(e){
    e?.preventDefault?.();
    if(opened) return;
    opened = true;

    // “focus” sul sigillo: shine foil
    envelope.classList.add("focusSeal");

    // vibrazione
    try { navigator.vibrate && navigator.vibrate([18, 30, 18]); } catch(_){}

    // micro shake + scintille
    setTimeout(()=>{
      envelope.classList.add("opening");
      makeSparkles();
    }, 260);

    // apertura flap + lettera
    setTimeout(()=>{
      envelope.classList.remove("opening");
      envelope.classList.add("opened");
      hintTop.style.opacity = "0";
      hintTop.style.pointerEvents = "none";
    }, 720);
  }

  // tap sul sigillo o su busta
  sealWrap.addEventListener("click", openSeal);
  envelope.addEventListener("click", openSeal);

  // accessibilità
  envelope.addEventListener("keydown", (e) => {
    if(e.key === "Enter" || e.key === " "){
      e.preventDefault();
      openSeal(e);
    }
  });

  // “Scorri” per ora dà una micro animazione (quando aggiungiamo pagine lo useremo per scroll)
  goDown.addEventListener("click", () => {
    // piccolo “pulse” della lettera
    const letter = document.getElementById("letter");
    if(!letter) return;
    letter.animate(
      [{ transform: "translateY(-18%) scale(1)" }, { transform: "translateY(-18%) scale(1.02)" }, { transform: "translateY(-18%) scale(1)" }],
      { duration: 520, easing: "cubic-bezier(.2,.9,.2,1)" }
    );
  });
})();
