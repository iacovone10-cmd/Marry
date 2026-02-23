(() => {
  const envelope = document.getElementById("envelope");
  const sealWrap = document.getElementById("sealWrap");
  const hintTop = document.getElementById("hintTop");
  const goDown = document.getElementById("goDown");
  const sparkles = document.getElementById("sparkles");
  const snap = document.getElementById("snap");

  let opened = false;

  function makeSparkles(){
    if(!sparkles) return;
    sparkles.innerHTML = "";
    sparkles.classList.add("on");

    for(let i=0;i<14;i++){
      const s=document.createElement("span");
      s.className="spark";
      s.style.left="50%";
      s.style.top="54%";
      s.style.setProperty("--dx", (Math.random()*220-110).toFixed(0)+"px");
      s.style.setProperty("--dy", (Math.random()*190-95).toFixed(0)+"px");
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

    envelope.classList.add("focusSeal");
    try { navigator.vibrate && navigator.vibrate([18, 30, 18]); } catch(_){}

    setTimeout(()=>{
      envelope.classList.add("opening");
      makeSparkles();
    }, 240);

    setTimeout(()=>{
      envelope.classList.remove("opening");
      envelope.classList.add("opened");

      if(hintTop){
        hintTop.style.opacity = "0";
        hintTop.style.pointerEvents = "none";
      }
    }, 720);
  }

  function showPages(){
    document.body.classList.add("showPages");
    requestAnimationFrame(() => {
      if(snap) snap.scrollTo({ top: 0, behavior: "auto" });
    });
  }

  sealWrap.addEventListener("click", openSeal);
  envelope.addEventListener("click", openSeal);

  envelope.addEventListener("keydown", (e) => {
    if(e.key === "Enter" || e.key === " "){
      e.preventDefault();
      openSeal(e);
    }
  });

  goDown.addEventListener("click", () => {
    showPages();
  });
})();
