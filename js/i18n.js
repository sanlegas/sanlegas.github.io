/* Traducción en el navegador, estilo gettext: el texto en español del HTML es la
   llave y js/i18n.en.js trae su equivalente en inglés. Si falta una traducción se
   muestra el texto original, así que nada queda vacío.

   Para revisar faltantes: en inglés, ejecutar i18n.missing() en la consola. */
(() => {
  const root = document.documentElement;
  const SUPPORTED = ["es", "en"];
  const DICTS = { en: window.I18N_EN || {} };
  const ATTRS = ["alt", "aria-label", "title", "placeholder"];
  const META = [
    'meta[name="description"]',
    'meta[property="og:title"]',
    'meta[property="og:description"]',
  ];
  // Elementos cuyo texto o etiquetas cambia otro script; ese script los traduce con i18n.t().
  const SKIP = "script, style, [data-no-i18n], [data-lang-toggle]";
  const SKIP_ATTRS = "[data-theme-toggle], [data-menu-toggle], [data-lang-toggle], [data-no-i18n]";

  const norm = (s) => s.replace(/\s+/g, " ").trim();
  const texts = [];
  const attrs = [];
  const waLinks = [];
  const titleRaw = document.title;
  let lang = SUPPORTED.includes(root.dataset.lang) ? root.dataset.lang : "es";

  const lookup = (key) => {
    if (lang === "es") return null;
    const value = DICTS[lang]?.[key];
    return typeof value === "string" ? value : null;
  };

  const t = (es) => lookup(norm(es)) ?? es;

  function collect() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || parent.closest(SKIP)) return NodeFilter.FILTER_REJECT;
        return norm(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    });
    while (walker.nextNode()) {
      const node = walker.currentNode;
      texts.push({ node, raw: node.nodeValue, key: norm(node.nodeValue) });
    }

    document.querySelectorAll(ATTRS.map((a) => `[${a}]`).join(",")).forEach((el) => {
      if (el.matches(SKIP_ATTRS)) return;
      ATTRS.forEach((name) => {
        if (!el.hasAttribute(name)) return;
        const raw = el.getAttribute(name);
        attrs.push({ el, name, raw, key: norm(raw) });
      });
    });

    META.forEach((selector) => {
      const el = document.querySelector(selector);
      if (el) attrs.push({ el, name: "content", raw: el.getAttribute("content"), key: norm(el.getAttribute("content")) });
    });

    // Mensaje prellenado de WhatsApp
    document.querySelectorAll('a[href*="wa.me/"]').forEach((el) => {
      try {
        const url = new URL(el.href);
        const message = url.searchParams.get("text");
        if (message) waLinks.push({ el, raw: el.getAttribute("href"), key: norm(message) });
      } catch {
        /* enlace mal formado: se deja como está */
      }
    });
  }

  function apply() {
    texts.forEach(({ node, raw, key }) => {
      const translated = lookup(key);
      if (translated === null) {
        node.nodeValue = raw;
        return;
      }
      // Conserva el espacio que separa este texto de un elemento vecino en línea.
      const lead = /^\s/.test(raw) ? " " : "";
      const trail = /\s$/.test(raw) ? " " : "";
      node.nodeValue = lead + translated + trail;
    });

    attrs.forEach(({ el, name, raw, key }) => {
      el.setAttribute(name, lookup(key) ?? raw);
    });

    waLinks.forEach(({ el, raw, key }) => {
      const translated = lookup(key);
      if (translated === null) {
        el.setAttribute("href", raw);
        return;
      }
      const url = new URL(raw);
      url.searchParams.set("text", translated);
      el.setAttribute("href", url.toString());
    });

    document.title = lookup(norm(titleRaw)) ?? titleRaw;
    root.lang = lang;
    root.dataset.lang = lang;

    document.querySelectorAll("[data-lang-toggle]").forEach((button) => {
      // El botón muestra el idioma al que se cambia.
      const target = lang === "es" ? "en" : "es";
      button.textContent = target.toUpperCase();
      button.setAttribute("aria-label", target === "en" ? "Switch to English" : "Cambiar a español");
    });
  }

  function set(next) {
    if (!SUPPORTED.includes(next) || next === lang) return;
    lang = next;
    try {
      localStorage.setItem("lang", lang);
    } catch {
      /* sin almacenamiento: el idioma solo dura esta visita */
    }
    // Si la página llegó con ?lang=, se quita para que no pise la elección al recargar.
    const url = new URL(window.location.href);
    if (url.searchParams.has("lang")) {
      url.searchParams.delete("lang");
      window.history.replaceState(null, "", url);
    }
    apply();
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  }

  // Textos sin traducción en el idioma activo (ayuda de desarrollo).
  function missing() {
    if (lang === "es") return [];
    const keys = [...texts, ...attrs, ...waLinks].map((entry) => entry.key);
    return [...new Set(keys)].filter((key) => lookup(key) === null);
  }

  window.i18n = {
    t,
    set,
    missing,
    get lang() {
      return lang;
    },
  };

  collect();
  apply();
  root.classList.remove("i18n-pending");

  document.querySelectorAll("[data-lang-toggle]").forEach((button) => {
    button.addEventListener("click", () => set(lang === "es" ? "en" : "es"));
  });
})();
