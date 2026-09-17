export const commands = Object.freeze({
  welcome: "Return to the welcome screen",
  about: "Who I am and what I build",
  experience: "Professional experience",
  skills: "Technologies and tools",
  projects: "Selected work and results",
  education: "Education, credentials and languages",
  cv: "Read and download my resume",
  contact: "Email, LinkedIn and phone",
  blog: "Notes and writing",
  help: "Commands and keyboard shortcuts",
  history: "Commands from this session",
  clear: "Clear the terminal transcript",
});

const aliases = new Map(
  Object.entries({
    whoami: "about",
    about_me: "about",
    "about me": "about",
    sobre: "about",
    inicio: "about",
    experiencia: "experience",
    trayectoria: "experience",
    stack: "skills",
    stack_skills: "skills",
    "stack skills": "skills",
    habilidades: "skills",
    proyectos: "projects",
    educacion: "education",
    formacion: "education",
    resume: "cv",
    cv_resume: "cv",
    "cv / resume": "cv",
    descargar: "cv",
    contacto: "contact",
    ayuda: "help",
    "?": "help",
    ls: "help",
    historial: "history",
    limpiar: "clear",
    cls: "clear",
  }),
);

export function normalize(value) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

export function resolveCommand(value) {
  const key = normalize(value).replace(/^\.\//, "");
  return Object.hasOwn(commands, key) ? key : (aliases.get(key) ?? null);
}

export function completeCommand(value) {
  const prefix = normalize(value);
  if (!prefix) return [];
  const canonical = Object.keys(commands).filter((command) =>
    command.startsWith(prefix),
  );
  const matches = [
    "whoami",
    "resume",
    "stack",
    "ls",
    "cls",
    "about_me",
    "stack_skills",
    "cv_resume",
  ].filter((alias) => alias.startsWith(prefix));
  return [...canonical, ...matches];
}
