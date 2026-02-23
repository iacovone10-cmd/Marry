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

  function startCountdown(){
    const d = document.getElementById('cdDays');
    const h = document.getElementById('cdHours');
    const m = document.getElementById('cdMins');
    const s = document.getElementById('cdSecs');
    if(!d||!h||!m||!s) return;

    // 31/07/2026 (Italia) — consideriamo mezzogiorno per evitare edge di timezone
    const target = new Date(2026, 6, 31, 12, 0, 0);

    const tick = () => {
      const now = new Date();
      let diff = target.getTime() - now.getTime();
      if(diff < 0) diff = 0;
      const days = Math.floor(diff / (1000*60*60*24));
      const hours = Math.floor((diff / (1000*60*60)) % 24);
      const mins = Math.floor((diff / (1000*60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);
      d.textContent = String(days);
      h.textContent = String(hours).padStart(2,'0');
      m.textContent = String(mins).padStart(2,'0');
      s.textContent = String(secs).padStart(2,'0');
      if(diff === 0){
        // opzionale: micro-celebrazione se la pagina è aperta nel giorno
        try{ makeSparkles && makeSparkles(); }catch(_){}
      }
    };
    tick();
    setInterval(tick, 1000);
  }

  startCountdown();
})();
