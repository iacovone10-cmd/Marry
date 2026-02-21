(() => {
  const envelope = document.getElementById("envelope");
  const openHint = document.getElementById("openHint");
  const startScroll = document.getElementById("startScroll");
  const snap = document.getElementById("snap");

  function openEnvelope() {
    if (!envelope) return;

    envelope.classList.add("is-open");
    document.body.classList.add("opened");

    if (openHint) openHint.style.display = "none";

    // dopo apertura: scrolla dolcemente al foglio (resta nella stage)
    document.getElementById("stage").scrollIntoView({ behavior: "smooth" });
  }

  if (openHint) openHint.addEventListener("click", (e) => {
    e.preventDefault();
    openEnvelope();
  });

  if (envelope) {
    envelope.addEventListener("click", openEnvelope);
    envelope.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") openEnvelope();
    });
  }

  // bottone "Scorri" sulla lettera: porta alla prima schermata del contenuto
  if (startScroll) {
    startScroll.addEventListener("click", () => {
      const invite = document.getElementById("invite");
      if (invite) invite.scrollIntoView({ behavior: "smooth", block: "start" });
      // assicura focus sul container snap
      if (snap) snap.focus?.();
    });
  }

  // Maps: click su tutta la card
  document.querySelectorAll(".eventLink").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      const href = card.getAttribute("data-href");
      if (href) window.open(href, "_blank", "noopener");
    });
  });

  // Reveal animations for sections
  const io = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      if (ent.isIntersecting) ent.target.classList.add("in-view");
    });
  }, { threshold: 0.18 });

  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
})();
