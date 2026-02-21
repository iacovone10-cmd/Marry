(() => {
  const envelope = document.getElementById("envelope");
  const openHint = document.getElementById("openHint");
  const startScroll = document.getElementById("startScroll");
  const pages = document.getElementById("pages");
  const snap = document.getElementById("snap");

  function openEnvelope(e) {
    e?.preventDefault?.();
    if (!envelope) return;

    envelope.classList.add("is-open");
    document.body.classList.add("opened");

    if (openHint) openHint.style.display = "none";
  }

  // click/touch su bottone e busta
  if (openHint) {
    openHint.addEventListener("click", openEnvelope, { passive: false });
    openHint.addEventListener("touchstart", openEnvelope, { passive: false });
  }

  if (envelope) {
    envelope.addEventListener("click", openEnvelope, { passive: false });
    envelope.addEventListener("touchstart", openEnvelope, { passive: false });
    envelope.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") openEnvelope(e);
    });
  }

  // 🔥 “Scorri” sulla lettera: mostra pagine e vai all’invito
  if (startScroll) {
    const go = (e) => {
      e?.preventDefault?.();

      // mostra pagine, nasconde stage via CSS
      document.body.classList.add("showPages");

      // porta lo scroll all’inizio delle pagine
      requestAnimationFrame(() => {
        // reset scroll top
        if (snap) snap.scrollTop = 0;

        // vai a invito
        const invite = document.getElementById("invite");
        invite?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };

    startScroll.addEventListener("click", go, { passive: false });
    startScroll.addEventListener("touchstart", go, { passive: false });
  }

  // card click -> maps
  document.querySelectorAll(".eventLink").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      const href = card.getAttribute("data-href");
      if (href) window.open(href, "_blank", "noopener");
    });
  });
})();
