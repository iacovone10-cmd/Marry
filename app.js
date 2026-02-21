<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
  <title>Invito • Vincenzo & Maria Giovanna</title>
  <meta name="theme-color" content="#0E7EA6" />

  <!-- Pristina (Windows) + fallback Allura -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Allura&family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Manrope:wght@500;600;700;800&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="./styles.css" />
</head>

<body>
  <div class="bg" aria-hidden="true"></div>
  <div class="grain" aria-hidden="true"></div>

  <!-- Wrapper snap -->
  <main class="snap">

    <!-- PAGINA 1: BUSTA (come reference) -->
    <section class="screen" id="p1" aria-label="Busta">
      <div class="envelopeFrame">
        <div class="envelopeRef" id="envelopeRef" role="button" tabindex="0" aria-label="Busta">
          <div class="envTextTop">Scorri verso il basso</div>

          <div class="envSeam" aria-hidden="true"></div>

          <div class="envSeal" aria-hidden="true">
            <div class="sealDisk">
              <div class="sealMono">V<span class="heart">♥</span>M</div>
            </div>
          </div>
        </div>
      </div>
      <div class="hintSmall">⬇︎ Scorri per leggere l’invito</div>
    </section>

    <!-- PAGINA 2: FOGLIO FLOREALE (come reference) -->
    <section class="screen" id="p2" aria-label="Nomi">
      <div class="paperWrap">
        <div class="paperCard">
          <!-- Ornamenti floreali SVG (leggeri) -->
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
            <path d="M40 168c18-8 36-6 50 6" fill="none" stroke="#1A87B5" stroke-opacity=".18" stroke-width="5" stroke-linecap="round"/>
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
            <path d="M200 74c-18 8-36 6-50-6" fill="none" stroke="#1A87B5" stroke-opacity=".18" stroke-width="5" stroke-linecap="round"/>
          </svg>

          <div class="paperInner">
            <div class="paperNames">
              <div class="scriptName">Vincenzo</div>
              <div class="scriptAnd">&amp;</div>
              <div class="scriptName">Maria Giovanna</div>
            </div>
          </div>
        </div>
      </div>
      <div class="hintSmall">⬇︎ Scorri per i dettagli</div>
    </section>

    <!-- PAGINA 3: INVITO (chiesa/ristorante) -->
    <section class="screen" id="invite" aria-label="Invito">
      <div class="card heroShell">
        <div class="heroHeader">
          <div class="badge">INVITO</div>
          <div class="heroDate">31 Luglio 2026</div>
        </div>

        <h2 class="heroTitle">Vincenzo <span class="amp2">&amp;</span> Maria Giovanna</h2>
        <p class="heroLead">Una giornata speciale da vivere insieme.</p>

        <div class="eventGrid">
          <article class="eventCard eventLink" data-href="https://maps.app.goo.gl/67K9Auu479Jeb2qx6" aria-label="Apri mappa Chiesa">
            <div class="eventTop">
              <div class="iconBox" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 2v5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>
                  <path d="M10 4h4" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>
                  <path d="M4 10l8-5 8 5" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/>
                  <path d="M6 10v10h12V10" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/>
                  <path d="M10 20v-5a2 2 0 0 1 4 0v5" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/>
                </svg>
              </div>
              <div>
                <div class="eventLabel">Cerimonia</div>
                <div class="eventMeta">Marano di Napoli</div>
              </div>
            </div>
            <div class="eventName">Chiesa Maria SS. Immacolata</div>
            <div class="eventTime">⏰ 10:30</div>
            <a class="mapBtn" href="https://maps.app.goo.gl/67K9Auu479Jeb2qx6" target="_blank" rel="noopener">📍 Apri su Google Maps</a>
          </article>

          <article class="eventCard eventLink" data-href="https://maps.app.goo.gl/G45W9W41TLqeAtuK6" aria-label="Apri mappa Ristorante">
            <div class="eventTop">
              <div class="iconBox" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M6 2v8" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>
                  <path d="M4 2v8" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>
                  <path d="M8 2v8" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>
                  <path d="M5 10v12" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>
                  <path d="M14 2v8c0 1.5 1.2 2.7 2.7 2.7H18V22" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14 6h4" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>
                </svg>
              </div>
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

          <button class="btn btnGhost" id="addToCalendar" type="button">
            📅 Aggiungi al calendario
          </button>
        </div>
      </div>
    </section>

    <!-- PAGINA 4: REGALO -->
    <section class="screen" id="gift" aria-label="Regalo">
      <div class="card pageShell">
        <div class="pageTitle">🎁</div>
        <h3 class="pageHeading">Il regalo più bello</h3>

        <p class="pageText">
          Celebrare insieme questo giorno sarà<br>
          per noi il dono più bello.<br><br>
          Ma se desiderate contribuire alla<br>
          realizzazione dei nostri sogni e progetti<br>
          futuri potrete farlo cliccando sull’icona<br>
          di seguito
        </p>

        <a class="bigIconLink" href="PASTE_GIFT_LINK_HERE" target="_blank" rel="noopener" aria-label="Apri link regalo">
          <svg viewBox="0 0 24 24" fill="none" class="bigIcon">
            <path d="M3 10h18v11H3V10Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
            <path d="M3 10h18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            <path d="M12 10v11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            <path d="M7.5 10c-1.6 0-2.7-1.4-2-2.8.7-1.4 2.7-1.4 4.2-.4L12 8.2l2.3-1.4c1.5-1 3.5-1 4.2.4.7 1.4-.4 2.8-2 2.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="iconLabel">Apri il link</span>
        </a>
      </div>
    </section>

    <!-- PAGINA 5: FOTO -->
    <section class="screen" id="photos" aria-label="Foto">
      <div class="card pageShell">
        <div class="pageTitle">📸</div>
        <h3 class="pageHeading">Condividi le foto</h3>

        <p class="pageText">
          Il giorno del nostro matrimonio sarà<br>
          ancora più speciale grazie alla vostra<br>
          presenza...<br><br>
          Se scatterete delle foto durante la giornata,<br>
          ci farebbe davvero piacere rivivere quei<br>
          momenti anche attraverso i vostri occhi.<br><br>
          Cliccando sull’icona qui sotto, potrete<br>
          caricare i vostri scatti:<br>
          ogni foto sarà per noi un prezioso ricordo<br>
          da custodire
        </p>

        <a class="bigIconLink" href="PASTE_PHOTO_LINK_HERE" target="_blank" rel="noopener" aria-label="Carica le foto">
          <svg viewBox="0 0 24 24" fill="none" class="bigIcon">
            <path d="M7 7h3l1-2h2l1 2h3a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
            <path d="M12 18a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" stroke-width="1.8"/>
            <path d="M17.6 10.3h.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
          </svg>
          <span class="iconLabel">Carica le foto</span>
        </a>
      </div>
    </section>

    <!-- PAGINA 6: RINGRAZIAMENTI -->
    <section class="screen" id="thanks" aria-label="Ringraziamenti">
      <div class="card pageShell">
        <div class="pageTitle">🤍</div>
        <h3 class="pageHeading">Grazie</h3>

        <p class="pageText">
          Grazie di cuore per l’affetto e la vicinanza.<br>
          La vostra presenza renderà questa giornata<br>
          ancora più speciale.<br><br>
          Per organizzare al meglio, vi chiediamo<br>
          gentilmente di darci conferma della presenza<br>
          <strong>entro il 31 maggio</strong>.
        </p>

        <a class="btn btnPrimary"
           href="https://wa.me/?text=Ciao%20Vincenzo%20e%20Maria%20Giovanna!%20Confermo%20la%20mia%20presenza%20al%20matrimonio%20del%2031%2F07%2F2026.%20(Conferma%20entro%2031%20maggio)"
           target="_blank" rel="noopener">
          Conferma su WhatsApp <span class="btnIco">✓</span>
        </a>

        <div class="footer">
          <div class="footerInner">
            <div class="footerSmall">Con amore,</div>
            <div class="footerNames">Vincenzo &amp; Maria Giovanna</div>
          </div>
        </div>
      </div>
    </section>

  </main>

  <script src="./app.js"></script>
</body>
</html>
