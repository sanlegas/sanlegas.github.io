(() => {
  const root = document.documentElement;
  // Traduce textos que este script escribe (ver js/i18n.js). Sin i18n devuelve el original.
  const t = (text) => (window.i18n ? window.i18n.t(text) : text);

  /* ---------- Tema claro / oscuro ---------- */
  const themeBtn = document.querySelector("[data-theme-toggle]");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = () => root.dataset.theme || (prefersDark.matches ? "dark" : "light");

  const paintThemeBtn = () => {
    if (!themeBtn) return;
    const dark = currentTheme() === "dark";
    themeBtn.setAttribute("aria-label", t(dark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"));
    themeBtn.querySelector("i").className = dark ? "ph ph-sun" : "ph ph-moon";
  };

  themeBtn?.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* almacenamiento no disponible: el tema solo dura esta visita */
    }
    paintThemeBtn();
  });
  prefersDark.addEventListener("change", paintThemeBtn);
  paintThemeBtn();

  /* ---------- Menú móvil ---------- */
  const header = document.querySelector(".site-header");
  const menuBtn = document.querySelector("[data-menu-toggle]");
  const nav = document.getElementById("menu");

  const setMenu = (open) => {
    header.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", t(open ? "Cerrar menú" : "Abrir menú"));
    menuBtn.querySelector("i").className = open ? "ph ph-x" : "ph ph-list";
  };

  if (header && menuBtn && nav) {
    menuBtn.addEventListener("click", () => setMenu(!header.classList.contains("is-open")));
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && header.classList.contains("is-open")) {
        setMenu(false);
        menuBtn.focus();
      }
    });
  }

  /* ---------- Cambio de idioma: actualiza las etiquetas que escribe este script ---------- */
  document.addEventListener("langchange", () => {
    paintThemeBtn();
    if (header && menuBtn) setMenu(header.classList.contains("is-open"));
  });
  if (header && menuBtn) setMenu(false);

  /* ---------- Aparición al hacer scroll ---------- */
  const revealEls = [...document.querySelectorAll("[data-reveal]")];

  // Escalona hermanos que aparecen juntos (máx. 5 pasos)
  revealEls.forEach((el) => {
    const siblings = [...el.parentElement.children].filter((c) => c.hasAttribute("data-reveal"));
    el.style.setProperty("--i", Math.min(siblings.indexOf(el), 5));
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    revealEls.forEach((el) => revealObserver.observe(el));

    /* ---------- Enlace activo en la navegación ---------- */
    const links = new Map(
      [...document.querySelectorAll('.nav a[href^="#"]')].map((a) => [a.hash.slice(1), a]),
    );
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((a) => a.removeAttribute("aria-current"));
          links.get(entry.target.id)?.setAttribute("aria-current", "true");
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    document.querySelectorAll("main section[id]").forEach((s) => sectionObserver.observe(s));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }
})();
