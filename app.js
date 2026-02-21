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

  if (startScroll) {
    startScroll.addEventListener("click", () => {
      const invite = document.getElementById("invite");
      if (invite) invite.scrollIntoView({ behavior: "smooth", block: "start" });
      snap?.focus?.();
    });
  }

  document.querySelectorAll(".eventLink").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      const href = card.getAttribute("data-href");
      if (href) window.open(href, "_blank", "noopener");
    });
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      if (ent.isIntersecting) ent.target.classList.add("in-view");
    });
  }, { threshold: 0.18 });

  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
})();
