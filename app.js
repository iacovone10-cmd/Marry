(() => {
  const envelope = document.getElementById("envelope");
  const openHint = document.getElementById("openHint");
  const startScroll = document.getElementById("startScroll");

  function openEnvelope(e) {
    e?.preventDefault?.();
    if (!envelope) return;

    envelope.classList.add("is-open");
    document.body.classList.add("opened");

    if (openHint) openHint.style.display = "none";
  }

  // Bottone: click + touch
  if (openHint) {
    openHint.addEventListener("click", openEnvelope, { passive: false });
    openHint.addEventListener("touchstart", openEnvelope, { passive: false });
  }

  // Busta: click + touch + tastiera
  if (envelope) {
    envelope.addEventListener("click", openEnvelope, { passive: false });
    envelope.addEventListener("touchstart", openEnvelope, { passive: false });
    envelope.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") openEnvelope(e);
    });
  }

  // Scorri al contenuto
  if (startScroll) {
    startScroll.addEventListener("click", () => {
      document.getElementById("invite")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    startScroll.addEventListener("touchstart", (e) => {
      e.preventDefault();
      document.getElementById("invite")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, { passive: false });
  }

  // Card click -> maps
  document.querySelectorAll(".eventLink").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      const href = card.getAttribute("data-href");
      if (href) window.open(href, "_blank", "noopener");
    });
  });
})();
