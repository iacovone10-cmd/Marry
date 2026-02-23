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

  const addToCal = document.getElementById('addToCal');
  const shareBtn = document.getElementById('shareBtn');
  const toast = document.getElementById('toast');

  function showToast(msg){
    if(!toast) return;
    toast.textContent = msg;
    toast.classList.add('on');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('on'), 2200);
  }

  function downloadICS(){
    // ICS minimale (orari indicativi).
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Invito Digitale//IT',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:' + Date.now() + '@invito',
      'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g,'').split('.')[0] + 'Z',
      'DTSTART:20260731T103000',
      'DTEND:20260731T113000',
      'SUMMARY:Matrimonio di Vincenzo & Maria Giovanna',
      'LOCATION:Chiesa Maria SS. Immacolata, Marano di Napoli',
      'DESCRIPTION:Cerimonia ore 10:30 (orario indicativo). Dettagli invito: ' + location.href,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Matrimonio_Vincenzo_MariaGiovanna.ics';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1200);
    showToast('Calendario scaricato ✨');
  }

  async function shareInvite(){
    const shareData = {
      title: document.title,
      text: 'Invito al matrimonio di Vincenzo & Maria Giovanna ✨',
      url: location.href
    };
    try{
      if(navigator.share){
        await navigator.share(shareData);
        showToast('Invito condiviso 🤍');
      }else{
        await navigator.clipboard.writeText(location.href);
        showToast('Link copiato negli appunti');
      }
    }catch(_){
      try{
        await navigator.clipboard.writeText(location.href);
        showToast('Link copiato negli appunti');
      }catch(__){
        showToast('Copia il link dalla barra del browser');
      }
    }
  }

  addToCal && addToCal.addEventListener('click', downloadICS);
  shareBtn && shareBtn.addEventListener('click', shareInvite);
})();
