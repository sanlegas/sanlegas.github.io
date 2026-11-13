/* Decide el idioma antes de pintar la página.
   Orden: ?lang= en la URL, preferencia guardada, idioma/región del navegador.
   Se carga sin "defer" en <head> para evitar que el texto cambie a la vista. */
(function () {
  var root = document.documentElement;
  var supported = ["es", "en"];
  var lang = null;

  try {
    var fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (supported.indexOf(fromUrl) !== -1) {
      lang = fromUrl;
      localStorage.setItem("lang", lang);
    } else {
      var saved = localStorage.getItem("lang");
      if (supported.indexOf(saved) !== -1) lang = saved;
    }
  } catch (e) {
    /* sin almacenamiento: se usa el idioma del navegador */
  }

  if (!lang) {
    var prefs =
      navigator.languages && navigator.languages.length
        ? navigator.languages
        : [navigator.language || "es"];
    for (var i = 0; i < prefs.length && !lang; i++) {
      var code = String(prefs[i]).toLowerCase().split("-")[0];
      if (supported.indexOf(code) !== -1) lang = code;
    }
    // Visitante con otro idioma (francés, alemán...): inglés como idioma internacional.
    lang = lang || "en";
  }

  root.dataset.lang = lang;
  root.lang = lang;

  if (lang !== "es") {
    // El HTML está en español: se oculta un instante hasta aplicar la traducción.
    root.classList.add("i18n-pending");
    setTimeout(function () {
      root.classList.remove("i18n-pending");
    }, 2000);
  }
})();
