:root{
  --dusty-50: #F3FBFF;
  --dusty-100:#E7F6FF;
  --dusty-200:#CFEAF9;
  --dusty-300:#A9D6F0;
  --dusty-400:#79BCE3;
  --dusty-500:#3D9ACB;

  --ink: #0B2A3A;
  --dustyText: #1E7FB0;

  --card: rgba(255,255,255,.78);
  --card2: rgba(255,255,255,.86);

  --shadow: 0 20px 60px rgba(0,0,0,.18);
  --shadow2: 0 14px 30px rgba(0,0,0,.14);

  --radius: 26px;
  --radius2: 18px;

  --sealRed1: #9B1C1C;
  --sealRed2: #7E1212;
}

*{ box-sizing:border-box; }
html,body{ height:100%; }
body{
  margin:0;
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: var(--ink);

  /* sfondo celeste polvere */
  background:
    radial-gradient(1200px 700px at 50% 18%, rgba(255,255,255,.65), rgba(255,255,255,0) 60%),
    radial-gradient(900px 900px at 20% 80%, rgba(255,255,255,.35), rgba(255,255,255,0) 70%),
    linear-gradient(180deg, var(--dusty-300), var(--dusty-200));
  overflow: hidden; /* sbloccato dopo apertura */
}

/* Stage */
.stage{
  min-height:100%;
}

/* Solo busta al centro */
.envelopeScene{
  height: 100svh;
  display:grid;
  place-items:center;
  padding: 22px 16px 28px;
  position: relative;
}

/* Hint top */
.hintTop{
  position: fixed;
  top: calc(18px + env(safe-area-inset-top));
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;

  font-weight: 600;
  color: rgba(12, 47, 66, .85);
  background: rgba(255,255,255,.72);
  border: 1px solid rgba(255,255,255,.7);
  backdrop-filter: blur(10px);
  padding: 10px 16px;
  border-radius: 999px;
  box-shadow: 0 12px 30px rgba(0,0,0,.12);
}

/* Envelope container */
.envelope{
  width: min(92vw, 420px);
  aspect-ratio: 3 / 4.2;
  border-radius: 28px;
  position: relative;
  box-shadow: var(--shadow);
  overflow: visible;
  transform: translateZ(0);
  cursor: pointer;
  outline: none;
}

/* base panel behind envelope */
.envelope::before{
  content:"";
  position:absolute;
  inset: -10px;
  border-radius: 36px;
  background: rgba(255,255,255,.25);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.25);
  filter: blur(0px);
}

/* Envelope body (celeste polvere più marcato) */
.envBottom{
  position:absolute;
  inset: 12% 6% 6% 6%;
  border-radius: 22px;
  background: linear-gradient(180deg, #3B93BE, #2F7FA7);
  box-shadow:
    inset 0 0 0 4px rgba(255,255,255,.12),
    inset 0 -18px 40px rgba(0,0,0,.20);
}

/* Side flaps */
.envSideLeft,
.envSideRight{
  position:absolute;
  top: 24%;
  bottom: 18%;
  width: 50%;
  opacity:.95;
}
.envSideLeft{
  left: 6%;
  clip-path: polygon(0 50%, 100% 0, 100% 100%);
  background: rgba(255,255,255,.14);
}
.envSideRight{
  right: 6%;
  clip-path: polygon(0 0, 100% 50%, 0 100%);
  background: rgba(0,0,0,.10);
}

/* Top flap (animata) */
.envFlapTop{
  position:absolute;
  left: 6%;
  right: 6%;
  top: 12%;
  height: 44%;
  border-radius: 22px;
  transform-origin: 50% 8%;
  clip-path: polygon(0 0, 100% 0, 50% 92%);
  background: linear-gradient(180deg, rgba(255,255,255,.18), rgba(0,0,0,.14));
  box-shadow: inset 0 2px 0 rgba(255,255,255,.12);
  transition: transform 900ms cubic-bezier(.2,.9,.2,1);
  transform: rotateX(0deg);
}

/* Letter (esce fuori) */
.letter{
  position:absolute;
  left: 10%;
  right: 10%;
  top: 20%;
  height: 62%;
  border-radius: 20px;
  background: rgba(255,255,255,.92);
  box-shadow: var(--shadow2);
  transform: translateY(28%) scale(.98);
  opacity: 0;
  transition:
    transform 950ms cubic-bezier(.2,.9,.2,1),
    opacity 420ms ease;
  pointer-events:none;
  overflow:hidden;
}

.letterInner{
  height:100%;
  padding: 18px 18px 16px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  text-align:center;

  background:
    radial-gradient(700px 300px at 50% 0%, rgba(61,154,203,.10), rgba(0,0,0,0) 70%),
    radial-gradient(420px 420px at 80% 80%, rgba(61,154,203,.08), rgba(0,0,0,0) 65%),
    linear-gradient(180deg, rgba(255,255,255,.96), rgba(255,255,255,.90));
}

.letterTopLine{
  font-family: Cinzel, serif;
  letter-spacing: .18em;
  font-size: 12px;
  text-transform: uppercase;
  color: rgba(30,127,176,.85);
  margin-bottom: 10px;
}

.letterNames{
  margin: 4px 0 10px;
  line-height: 1.05;
}
.letterNames .script{
  font-family: "Pristina", "Allura", cursive;
  font-size: clamp(44px, 7vw, 56px);
  color: var(--dustyText);
  font-weight: 400;
  display:block;
}
.letterNames .amp{
  font-family: Cinzel, serif;
  font-weight: 700;
  color: rgba(30,127,176,.75);
  display:inline-block;
  margin: 6px 0;
  font-size: 20px;
}

.letterSub{
  font-size: 14px;
  color: rgba(30,127,176,.85);
  margin-bottom: 14px;
}

.letterMeta{
  display:flex;
  gap: 10px;
  flex-wrap:wrap;
  justify-content:center;
}
.pill{
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(61,154,203,.10);
  border: 1px solid rgba(61,154,203,.18);
  color: rgba(30,127,176,.95);
  font-weight: 600;
  font-size: 13px;
}

/* --- SIGILLO CERALACCA ROSSO (wow) --- */
.sealWrap{
  position:absolute;
  left:50%; top: 56%;
  transform: translate(-50%,-50%);
  z-index: 20;
  width: 160px; height: 160px;
  display:grid; place-items:center;
  pointer-events:auto;
  transition: transform .55s cubic-bezier(.2,.9,.2,1);
}
.envelope.opening .sealWrap{
  transform: translate(-50%,-50%) scale(1.25);
}
.envelope.opened .sealWrap{
  transform: translate(-50%,-50%) scale(.95);
  opacity: 0;
  transition: opacity .35s ease, transform .55s cubic-bezier(.2,.9,.2,1);
}

.seal{
  width: 132px; height: 132px;
  border-radius: 999px;
  position:relative;
  display:grid; place-items:center;

  background:
    radial-gradient(circle at 30% 25%, rgba(255,255,255,.45), rgba(255,255,255,0) 42%),
    radial-gradient(circle at 70% 75%, rgba(0,0,0,.25), rgba(0,0,0,0) 52%),
    linear-gradient(145deg, var(--sealRed1), var(--sealRed2));

  box-shadow:
    0 26px 60px rgba(0,0,0,.35),
    inset 0 6px 16px rgba(255,255,255,.25),
    inset 0 -12px 24px rgba(0,0,0,.35);

  overflow:hidden;
}

.seal::before{
  content:"";
  position:absolute; inset:-20%;
  background-image: radial-gradient(rgba(0,0,0,.25) 1px, transparent 1px);
  background-size: 4px 4px;
  opacity:.08;
  mix-blend-mode: multiply;
  pointer-events:none;
}

.seal::after{
  content:"";
  position:absolute; inset:0;
  border-radius:999px;
  box-shadow:
    inset 0 0 0 6px rgba(0,0,0,.05),
    0 0 0 2px rgba(0,0,0,.10);
  pointer-events:none;
}

.sealMono{
  font-family: "Pristina","Allura",cursive;
  font-size: 44px;
  letter-spacing:.02em;
  color: #F7EDED;
  text-shadow:
    0 2px 0 rgba(0,0,0,.35),
    0 10px 18px rgba(0,0,0,.24);
  user-select:none;
  position:relative;
  z-index:2;
}

/* "Crack" / vibrazione breve */
@keyframes shake {
  0%{ transform: translate(0,0) rotate(0); }
  15%{ transform: translate(-1px,1px) rotate(-.4deg); }
  30%{ transform: translate(2px,0) rotate(.6deg); }
  45%{ transform: translate(-2px,-1px) rotate(-.6deg); }
  60%{ transform: translate(2px,1px) rotate(.4deg); }
  75%{ transform: translate(-1px,0) rotate(-.3deg); }
  100%{ transform: translate(0,0) rotate(0); }
}
.envelope.opening{
  animation: shake 420ms ease;
}

/* Apertura busta */
.envelope.opened .envFlapTop{
  transform: rotateX(165deg) translateY(-2px);
}
.envelope.opened .letter{
  opacity: 1;
  transform: translateY(-18%) scale(1);
}

/* Go down: compare solo dopo apertura */
.goDown{
  position: absolute;
  left: 50%;
  bottom: calc(16px + env(safe-area-inset-bottom));
  transform: translateX(-50%);
  z-index: 40;

  border: 0;
  background: rgba(255,255,255,.82);
  backdrop-filter: blur(10px);
  padding: 12px 18px;
  border-radius: 999px;
  box-shadow: 0 12px 30px rgba(0,0,0,.14);
  font-weight: 700;
  color: rgba(30,127,176,.95);
  display:none;
}
body.unlocked .goDown{ display:inline-flex; gap:10px; align-items:center; }

/* PAGES wrapper: nascosto fino a apertura */
.pages{
  display:none;
}
body.unlocked .pages{
  display:block;
  height: 100svh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

/* ogni pagina fullscreen */
.page{
  height: 100svh;
  scroll-snap-align: start;
  display:grid;
  place-items:center;
  padding: 24px 16px;
  position: relative;
}

/* decorative subtle corners */
.page::before,
.page::after{
  content:"";
  position:absolute;
  width: 220px; height: 220px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(255,255,255,.35), rgba(255,255,255,0) 70%);
  filter: blur(1px);
  opacity:.65;
}
.page::before{ left:-80px; top:-80px; }
.page::after{ right:-80px; bottom:-80px; }

/* Card */
.card{
  width: min(92vw, 720px);
  border-radius: var(--radius);
  background: var(--card);
  border: 1px solid rgba(255,255,255,.65);
  box-shadow: var(--shadow);
  padding: 22px 18px;
  backdrop-filter: blur(14px);
}

.cardSoft{
  background: var(--card2);
}

.cardFinal{
  background: rgba(255,255,255,.90);
  position: relative;
  overflow:hidden;
}

.kicker{
  font-family: Cinzel, serif;
  letter-spacing: .22em;
  font-size: 12px;
  text-transform: uppercase;
  color: rgba(30,127,176,.90);
}

.title{
  margin: 8px 0 6px;
  font-family: Cinzel, serif;
  font-weight: 700;
  letter-spacing: .01em;
  color: rgba(30,127,176,.98);
  font-size: clamp(26px, 5.4vw, 44px);
}

.muted{ color: rgba(30,127,176,.6); }

.subtitle{
  margin: 0 0 18px;
  color: rgba(30,127,176,.84);
  font-weight: 500;
}

.twoCols{
  display:grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin: 14px 0 16px;
}
@media (min-width: 820px){
  .twoCols{ grid-template-columns: 1fr 1fr; }
}

.miniCard{
  border-radius: var(--radius2);
  background: rgba(255,255,255,.72);
  border: 1px solid rgba(61,154,203,.18);
  padding: 14px 14px 12px;
  box-shadow: 0 10px 24px rgba(0,0,0,.08);
}

.miniTop{
  display:flex;
  gap: 12px;
  align-items:flex-start;
}

.iconCircle{
  width: 38px; height: 38px;
  border-radius: 999px;
  background: rgba(61,154,203,.12);
  border: 1px solid rgba(61,154,203,.22);
  display:grid; place-items:center;
  color: rgba(30,127,176,.95);
}

.miniLabel{
  font-size: 12px;
  color: rgba(30,127,176,.75);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .10em;
}
.miniStrong{
  font-size: 16px;
  font-weight: 800;
  color: rgba(20,86,118,.96);
  margin-top: 2px;
}
.miniSoft{
  font-size: 13px;
  color: rgba(30,127,176,.78);
  margin-top: 2px;
}

.miniBottom{
  display:flex;
  gap: 10px;
  align-items:center;
  justify-content:space-between;
  margin-top: 12px;
  flex-wrap:wrap;
}

.timePill{
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(61,154,203,.10);
  border: 1px solid rgba(61,154,203,.18);
  color: rgba(30,127,176,.95);
  font-weight: 800;
  font-size: 13px;
}

.btn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap: 10px;
  text-decoration:none;
  padding: 10px 12px;
  border-radius: 999px;
  font-weight: 800;
  color: rgba(30,127,176,.95);
  background: rgba(255,255,255,.75);
  border: 1px solid rgba(61,154,203,.22);
  box-shadow: 0 10px 22px rgba(0,0,0,.08);
}

.actions{
  display:flex;
  justify-content:center;
  margin: 10px 0 6px;
}
.btnPrimary{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  text-decoration:none;
  padding: 12px 16px;
  border-radius: 999px;
  font-weight: 900;
  background: linear-gradient(180deg, rgba(61,154,203,.95), rgba(42,122,165,.95));
  color: white;
  box-shadow: 0 16px 34px rgba(0,0,0,.18);
  border: 1px solid rgba(255,255,255,.25);
}

.btnPrimary.big{
  padding: 14px 18px;
  font-size: 16px;
}

.softNote{
  margin-top: 10px;
  text-align:center;
  color: rgba(30,127,176,.72);
  font-weight: 600;
}

/* P2/P3 content */
.h2{
  margin: 10px 0 10px;
  font-family: Cinzel, serif;
  color: rgba(30,127,176,.98);
  font-size: clamp(20px, 4.6vw, 30px);
  line-height: 1.2;
}
.p{
  margin: 0 0 14px;
  color: rgba(20,86,118,.90);
  font-weight: 500;
  line-height: 1.55;
}

.bigIconBtn{
  display:flex;
  align-items:center;
  justify-content:center;
  gap: 14px;
  padding: 16px 16px;
  border-radius: 18px;
  text-decoration:none;
  border: 1px solid rgba(61,154,203,.25);
  background: rgba(61,154,203,.10);
  box-shadow: 0 16px 30px rgba(0,0,0,.10);
  color: rgba(20,86,118,.98);
}

.bigIcon{
  width: 58px; height: 58px;
  border-radius: 999px;
  background: rgba(255,255,255,.85);
  display:grid;
  place-items:center;
  box-shadow: 0 14px 26px rgba(0,0,0,.12);
  color: rgba(30,127,176,.95);
}
.bigIconLabel{
  font-weight: 900;
  color: rgba(20,86,118,.96);
}

/* Final sparkles (wow) */
.finalSparkles{
  position:absolute;
  inset:0;
  pointer-events:none;
  opacity:.9;
}
.spark{
  position:absolute;
  width: 10px; height: 10px;
  border-radius: 999px;
  background: rgba(61,154,203,.55);
  filter: blur(.2px);
  animation: float 3.4s ease-in-out infinite;
}
.spark.s1{ left:12%; top:22%; animation-delay:.0s; }
.spark.s2{ left:78%; top:18%; animation-delay:.6s; }
.spark.s3{ left:22%; top:68%; animation-delay:1.2s; }
.spark.s4{ left:86%; top:72%; animation-delay:1.8s; }
.spark.s5{ left:46%; top:16%; animation-delay:2.4s; }
.spark.s6{ left:54%; top:80%; animation-delay:3.0s; }

@keyframes float{
  0%,100%{ transform: translateY(0) scale(1); opacity:.65; }
  50%{ transform: translateY(-14px) scale(1.15); opacity:1; }
}

/* accessibilità */
.envelope:focus-visible{
  outline: 3px solid rgba(61,154,203,.55);
  outline-offset: 6px;
}

