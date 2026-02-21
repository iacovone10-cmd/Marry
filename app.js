<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
  <title>Marry • Invito</title>
  <meta name="theme-color" content="#0E7EA6" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Allura&family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Manrope:wght@500;600;700;800&display=swap" rel="stylesheet">

  <!-- ✅ CSS CRITICO INLINE (ANTI-BUG MOBILE): garantisce che la busta si veda SEMPRE -->
  <style>
    :root{
      --teal:#0E7EA6;
      --powder:#1A87B5;
      --shadow: 0 22px 70px rgba(10,20,36,.18);
      --r: 26px;
    }
    *{ box-sizing:border-box; }
    html,body{ height:100%; }
    body{
      margin:0;
      font-family: Manrope, system-ui, -apple-system, Segoe UI, Roboto, Arial;
      color: var(--powder);
      background:#EAF6FF;
      overflow:hidden; /* lo scroll lo gestisce #snap quando sblocchiamo */
    }

    .bg{
      position:fixed; inset:0; z-index:-3;
      background:
        radial-gradient(900px 520px at 20% 10%, rgba(127,189,235,.98), rgba(127,189,235,.10) 60%),
        radial-gradient(800px 520px at 82% 20%, rgba(207,239,255,.98), rgba(207,239,255,.08) 62%),
        radial-gradient(1000px 700px at 40% 92%, rgba(74,163,224,.50), rgba(74,163,224,0) 60%),
        linear-gradient(180deg, #EAF6FF, #D8F0FF 55%, #EAF6FF);
    }
    .grain{
      position:fixed; inset:0; z-index:-2; pointer-events:none;
      background-image: radial-gradient(rgba(0,0,0,.10) 1px, transparent 1px);
      background-size: 3px 3px;
      opacity:.10;
      mix-blend-mode: overlay;
    }

    .screen{
      min-height:100svh;
      display:grid;
      place-items:center;
      padding: 18px 14px;
    }

    .openHint{
      position:absolute;
      top: 12px;
      z-index:50;
      border:0;
      cursor:pointer;
      font-weight: 900;
      letter-spacing:.02em;
      padding: 10px 14px;
      border-radius: 999px;
      background: rgba(255,255,255,.75);
      border: 1px solid rgba(255,255,255,.92);
      box-shadow: 0 16px 40px rgba(10,20,36,.10);
      color: var(--powder);
    }

    /* ✅ Stage stack con altezza reale: NON COLLASSA */
    .stageStack{
      width: min(92vw, 520px);
      height: min(70vh, 560px);
      position: relative;
    }

    /* Envelope */
    .envelopeRef{
      position:absolute;
      inset:0;
      border-radius: 18px;
      background: var(--teal);
      box-shadow: var(--shadow);
      overflow:hidden;
      border: 3px solid rgba(255,255,255,.40);
      transform: translateZ(0);
    }
    .envTextTop{
      position:absolute;
      top: 18%;
      left:0; right:0;
      text-align:center;
      font-weight: 900;
      color: rgba(255,255,255,.92);
      text-shadow: 0 10px 22px rgba(0,0,0,.18);
      z-index: 5;
    }
    .envSeam{
      position:absolute;
      top:0; bottom:0;
      left:50%;
      width: 3px;
      transform: translateX(-50%);
      background: rgba(0,0,0,.28);
      box-shadow: 0 0 0 1px rgba(255,255,255,.08);
      z-index: 2;
    }
    .envSeal{
      position:absolute;
      left:50%;
      top: 45%;
      transform: translate(-50%,-50%);
      z-index: 6;
      transition: transform .5s ease, opacity .5s ease;
    }
    .sealDisk{
      width: 86px;
      height: 86px;
      border-radius: 999px;
      background: rgba(255,255,255,.92);
      border: 1px solid rgba(255,255,255,.95);
      box-shadow: 0 18px 38px rgba(10,20,36,.20);
      display:grid;
      place-items:center;
    }
    .sealMono{
      font-family: "Pristina","Allura",cursive;
      font-size: 34px;
      color: var(--powder);
    }
    .heart{ color:#2a8fca; }

    .envFlap{
      position:absolute;
      left:0; right:0; top:0;
      height: 56%;
      background: linear-gradient(180deg, rgba(255,255,255,.18), rgba(255,255,255,.05));
      clip-path: polygon(0 0, 100% 0, 50% 72%);
      transform-origin: top center;
      transform: rotateX(0deg);
      transition: transform .9s cubic-bezier(.2,.9,.2,1);
      z-index: 4;
    }

    .envDoor{
      position:absolute;
      top:0; bottom:0;
      width:50%;
      background: rgba(255,255,255,.06);
      transition: transform .85s cubic-bezier(.2,.9,.2,1);
      z-index: 3;
    }
    .envDoorL{ left:0; border-right:1px solid rgba(0,0,0,.20); }
    .envDoorR{ right:0; border-left:1px solid rgba(0,0,0,.20); }

    /* OPEN animation */
    .envelopeRef.is-open .envFlap{ transform: rotateX(165deg); }
    .envelopeRef.is-open .envDoorL{ transform: translateX(-12%); }
    .envelopeRef.is-open .envDoorR{ transform: translateX(12%); }
    .envelopeRef.is-open .envSeal{ opacity:.15; transform: translate(-50%,-50%) scale(.90); }

    /* Letter */
    .paperCard{
      position:absolute;
      inset:0;
      border-radius: 18px;
      background: rgba(255,255,255,.94);
      box-shadow: var(--shadow);
      overflow:hidden;
      border: 3px solid rgba(255,255,255,.40);
      opacity:0;
      transform: translateY(18px) scale(.98);
      pointer-events:none;
      transition: opacity .55s ease, transform .55s ease;
    }
    body.opened .paperCard{
      opacity:1;
      transform: translateY(0) scale(1);
      pointer-events:auto;
    }

    .floral{ position:absolute; width:54%; height:54%; opacity:.9; }
    .floralTL{ left:-12%; top:-12%; transform: rotate(-8deg); }
    .floralBR{ right:-12%; bottom:-12%; transform: rotate(-8deg); }

    .paperInner{
      position:absolute; inset:0;
      display:grid;
      place-items:center;
      padding: 18px;
      text-align:center;
    }
    .scriptName{
      font-family: "Pristina","Allura",cursive;
      font-size: 54px;
      line-height: 1.05;
      color: var(--powder);
    }
    .scriptAnd{
      font-family: "Pristina","Allura",cursive;
      font-size: 40px;
      color: rgba(26,135,181,.85);
      margin: 6px 0;
    }

    /* Snap locked until opened */
    .snap{
      height:100svh;
      overflow-y:hidden;
      scroll-snap-type: y mandatory;
    }
    body.opened .snap{ overflow-y:auto; }
    .snap .screen{ scroll-snap-align:start; }

    /* Minimal fallback for cards */
    .card{
      width:min(980px, 94vw);
      border-radius: calc(var(--r) + 12px);
      background: rgba(255,255,255,.72);
      border: 1px solid rgba(255,255,255,.92);
      box-shadow: var(--shadow);
      padding: 18px;
    }
  </style>

  <!-- ✅ Cache-busting -->
  <link rel="stylesheet" href="./styles.css?v=20260221-3" />
</head>

<body>
  <div class="bg" aria-hidden="true"></div>
  <div class="grain" aria-hidden="true"></div>

  <!-- STAGE: busta -> lettera -->
  <section class="screen" id="stage" aria-label="Busta e lettera">
    <button class="openHint" id="openHint" type="button">Tocca la busta per aprire ✨</button>

    <div class="stageStack">
      <!-- BUSTA -->
      <div class="envelopeRef" id="envelope" role="button" tabindex="0" aria-label="Apri busta">
        <div class="envTextTop" id="envTopText">Scorri verso il basso</div>
        <div class="envSeam" aria-hidden="true"></div>

        <div class="envSeal" aria-hidden="true">
          <div class="sealDisk">
            <div class="sealMono">V<span class="heart">♥</span>M</div>
          </div>
        </div>

        <div class="envFlap" aria-hidden="true"></div>
        <div class="envDoor envDoorL" aria-hidden="true"></div>
        <div class="envDoor envDoorR" aria-hidden="true"></div>
      </div>

      <!-- LETTERA -->
      <div class="paperCard" id="paper" aria-label="Lettera">
        <svg class="floral floralTL" viewBox="0 0 240 240" aria-hidden="true">
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0" stop-color="#1A87B5" stop-opacity=".55"/>
              <stop offset="1" stop-color="#1A87B5" stop-opacity=".10"/>
            </linearGradient>
          </defs>
          <path d="M54 96c18-28 44-34 66-16 11 9 14 23 4 33-10 10-26 8-36-3 8 18 5 34-9 43-17 10-37 2-42-17-6-21 5-33 17-40z" fill="url(#g1)"/>
          <circle cx="62" cy="88" r="10" fill="#1A87B5" opacity=".25"/>
          <circle cx="90" cy="70" r="14" fill="#1A87B5" opacity=".18"/>
          <path d="M30 150c30-18 58-10 76 16" fill="none" stroke="#1A87B5" stroke-opacity=".25" stroke-width="6" stroke-linecap="round"/>
        </svg>

        <svg class="floral floralBR" viewBox="0 0 240 240" aria-hidden="true">
          <defs>
            <linearGradient id="g2" x1="0" x2="1">
              <stop offset="0" stop-color="#1A87B5" stop-opacity=".10"/>
              <stop offset="1" stop-color="#1A87B5" stop-opacity=".55"/>
            </linearGradient>
          </defs>
          <path d="M184 146c-18 28-44 34-66 16-11-9-14-23-4-33 10-10 26-8 36 3-8-18-5-34 9-43 17-10 37-2 42 17 6 21-5 33-17 40z" fill="url(#g2)"/>
          <circle cx="178" cy="154" r="10" fill="#1A87B5" opacity=".25"/>
          <circle cx="150" cy="172" r="14" fill="#1A87B5" opacity=".18"/>
          <path d="M210 92c-30 18-58 10-76-16" fill="none" stroke="#1A87B5" stroke-opacity=".25" stroke-width="6" stroke-linecap="round"/>
        </svg>

        <div class="paperInner">
          <div>
            <div class="scriptName">Vincenzo</div>
            <div class="scriptAnd">&amp;</div>
            <div class="scriptName">Maria Giovanna</div>
          </div>

          <div style="margin-top:12px;">
            <button class="openHint" id="startScroll" type="button" style="position:static;">
              Scorri ↓
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CONTENUTO: schermate dopo apertura -->
  <main class="snap" id="snap" tabindex="-1">
    <!-- INVITO -->
    <section class="screen" id="invite">
      <div class="card inviteCard">
        <div class="heroHeader">
          <div class="badge">INVITO</div>
          <div class="heroDate">31 Luglio 2026</div>
        </div>

        <h2 class="heroTitle">Vincenzo <span class="amp2">&amp;</span> Maria Giovanna</h2>
        <p class="heroLead">Una giornata speciale da vivere insieme.</p>

        <div class="eventGrid">
          <article class="eventCard eventLink" data-href="https://maps.app.goo.gl/67K9Auu479Jeb2qx6">
            <div class="eventTop">
              <div class="iconBox" aria-hidden="true">⛪</div>
              <div>
                <div class="eventLabel">Cerimonia</div>
                <div class="eventMeta">Marano di Napoli</div>
              </div>
            </div>
            <div class="eventName">Chiesa Maria SS. Immacolata</div>
            <div class="eventTime">⏰ 10:30</div>
            <a class="mapBtn" href="https://maps.app.goo.gl/67K9Auu479Jeb2qx6" target="_blank" rel="noopener">📍 Apri su Google Maps</a>
          </article>

          <article class="eventCard eventLink" data-href="https://maps.app.goo.gl/G45W9W41TLqeAtuK6">
            <div class="eventTop">
              <div class="iconBox" aria-hidden="true">🍽️</div>
              <div>
                <div class="eventLabel">Ricevimento</div>
                <div class="eventMeta">Bacoli</div>
              </div>
            </div>
            <div class="eventName">Il Gabbiano</div>
            <div class="eventTime">⏰ 14:00</div>
            <a class="mapBtn" href="https://maps.app.goo.gl/G45W9W41TLqeAtuK6" target="_blank" rel="noopener">📍 Apri su Google Maps</a>
          </article>
        </div>

        <div class="actionsRow">
          <a class="btn btnPrimary"
             href="https://wa.me/?text=Ciao%20Vincenzo%20e%20Maria%20Giovanna!%20Confermo%20la%20mia%20presenza%20al%20matrimonio%20del%2031%2F07%2F2026."
             target="_blank" rel="noopener">
            RSVP su WhatsApp <span class="btnIco">✓</span>
          </a>
        </div>
      </div>
    </section>

    <!-- REGALO -->
    <section class="screen" id="gift">
      <div class="card pageShell">
        <div class="pageTitle">🎁</div>
        <h3 class="pageHeading">Il regalo più bello</h3>
        <p class="pageText">
          Celebrare insieme questo giorno sarà<br>
          per noi il dono più bello.<br><br>
          Ma se desiderate contribuire alla realizzazione dei nostri sogni e progetti futuri,
          potrete farlo cliccando sull’icona di seguito.
        </p>

        <a class="bigIconLink" href="PASTE_GIFT_LINK_HERE" target="_blank" rel="noopener">
          <span class="bigIconEmoji">🎁</span>
          <span class="iconLabel">Apri il link</span>
        </a>
      </div>
    </section>

    <!-- FOTO -->
    <section class="screen" id="photos">
      <div class="card pageShell">
        <div class="pageTitle">📸</div>
        <h3 class="pageHeading">Condividi le foto</h3>
        <p class="pageText">
          Cliccando sull’icona qui sotto, potrete caricare i vostri scatti:<br>
          ogni foto sarà per noi un prezioso ricordo da custodire.
        </p>

        <a class="bigIconLink" href="PASTE_PHOTO_LINK_HERE" target="_blank" rel="noopener">
          <span class="bigIconEmoji">📸</span>
          <span class="iconLabel">Carica le foto</span>
        </a>
      </div>
    </section>

    <!-- THANKS -->
    <section class="screen" id="thanks">
      <div class="card pageShell">
        <div class="pageTitle">🤍</div>
        <h3 class="pageHeading">Grazie</h3>
        <p class="pageText">
          Grazie di cuore per l’affetto e la vicinanza.<br><br>
          Per organizzare al meglio, vi chiediamo gentilmente di darci conferma della presenza
          <strong>entro il 31 maggio</strong>.
        </p>

        <a class="btn btnPrimary"
           href="https://wa.me/?text=Ciao%20Vincenzo%20e%20Maria%20Giovanna!%20Confermo%20la%20mia%20presenza%20(entro%2031%20maggio)."
           target="_blank" rel="noopener">
          Conferma su WhatsApp <span class="btnIco">✓</span>
        </a>
      </div>
    </section>
  </main>

  <script src="./app.js?v=20260221-3"></script>
</body>
</html>
