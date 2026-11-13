/* Visor 3D bajo demanda: el modelo pesa varios MB, así que solo se descarga
   cuando la persona lo pide. Usa <model-viewer> de Google. */
(() => {
  const MODEL_VIEWER_URL =
    "https://cdn.jsdelivr.net/npm/@google/model-viewer@4.0.0/dist/model-viewer.min.js";

  // Traduce los mensajes que escribe este script (ver js/i18n.js).
  const t = (text) => (window.i18n ? window.i18n.t(text) : text);

  const NOTES = {
    idle: "Descarga de 7 MB al cargar.",
    viewerLoading: "Cargando visor 3D…",
    modelLoading: "Descargando modelo…",
    ready: "Arrastra para girar. En celular, toca el ícono de AR para verlo en tu mesa.",
    modelError: "No se pudo cargar el modelo. Intenta de nuevo más tarde.",
    viewerError: "No se pudo cargar el visor 3D. Revisa tu conexión e intenta de nuevo.",
  };

  document.querySelectorAll("[data-viewer]").forEach((viewer) => {
    const stage = viewer.querySelector(".viewer-stage");
    const button = viewer.querySelector("[data-viewer-load]");
    const note = viewer.querySelector(".viewer-note");
    const poster = stage?.querySelector("img");
    if (!stage || !button || !note) return;

    let state = "idle";
    const setState = (next) => {
      state = next;
      note.dataset.state = next;
      note.textContent = t(NOTES[next]);
    };
    setState("idle");
    document.addEventListener("langchange", () => setState(state));

    const allowRetry = () => {
      button.disabled = false;
      button.removeAttribute("aria-busy");
    };

    button.addEventListener("click", async () => {
      button.disabled = true;
      button.setAttribute("aria-busy", "true");
      setState("viewerLoading");

      try {
        await import(MODEL_VIEWER_URL);

        const model = document.createElement("model-viewer");
        model.setAttribute("src", viewer.dataset.src);
        if (viewer.dataset.iosSrc) model.setAttribute("ios-src", viewer.dataset.iosSrc);
        if (poster) model.setAttribute("poster", poster.currentSrc || poster.src);
        model.setAttribute("alt", t(viewer.dataset.alt || "Modelo 3D"));
        model.setAttribute("camera-controls", "");
        model.setAttribute("auto-rotate", "");
        model.setAttribute("ar", "");
        model.setAttribute("ar-modes", "scene-viewer quick-look webxr");
        model.setAttribute("ar-scale", "fixed");
        model.setAttribute("shadow-intensity", "1");
        model.setAttribute("touch-action", "pan-y");
        model.setAttribute("loading", "eager");

        model.addEventListener("load", () => {
          setState("ready");
          button.hidden = true;
        });

        model.addEventListener("error", () => {
          setState("modelError");
          allowRetry();
        });

        setState("modelLoading");
        stage.replaceChildren(model);
      } catch {
        setState("viewerError");
        allowRetry();
        if (!stage.firstElementChild && poster) stage.append(poster);
      }
    });
  });
})();
