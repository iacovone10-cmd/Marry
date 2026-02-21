(() => {
  const envelope = document.getElementById("envelope");
  const openHint = document.getElementById("openHint");
  const startScroll = document.getElementById("startScroll");

  function openEnvelope() {
    if (!envelope) return;
    envelope.classList.add("is-open");
    document.body.classList.add("opened");
    if (openHint) openHint.style.display = "none";
  }

  openHint?.addEventListener("click", (e) => {
    e.preventDefault();
    openEnvelope();
  });

  envelope?.addEventListener("click", openEnvelope);
  envelope?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") openEnvelope();
  });

  startScroll?.addEventListener("click", () => {
    document.getElementById("invite")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // card click -> maps
  document.querySelectorAll(".eventLink").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      const href = card.getAttribute("data-href");
      if (href) window.open(href, "_blank", "noopener");
    });
  });
})();
