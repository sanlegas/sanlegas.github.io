import { commands, resolveCommand, completeCommand } from "./commands.js";
import { experience, skills, projects, resumeUrl } from "./portfolio.js";

const output = document.querySelector("#output");
const scroller = document.querySelector("#output-scroll");
const input = document.querySelector("#command");
const suggestions = document.querySelector("#suggestions");
const announcement = document.querySelector("#announcement");
const aboutTemplate = document
  .querySelector("#about-template")
  .content.querySelector("article");
const welcomeTemplate = output.querySelector(".welcome").cloneNode(true);
const history = [];
let historyIndex = 0;
let draft = "";
let resultId = 0;
let completion = null;

// All content, including user input, is written as text rather than interpreted as HTML.
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function commandButton(command) {
  const button = element("button", "inline-command", command);
  button.type = "button";
  button.dataset.command = command;
  return button;
}

function tags(values) {
  const list = element("div", "tags");
  values.forEach((value) => list.append(element("span", "", value)));
  return list;
}

function link(text, href, className = "") {
  const anchor = element("a", className, text);
  anchor.href = href;
  if (href.startsWith("https://")) {
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
  }
  return anchor;
}

function heading(article, label, title, description) {
  const titleNode = element("h2", "", title);
  titleNode.id = `result-${++resultId}`;
  article.setAttribute("aria-labelledby", titleNode.id);
  article.append(element("p", "section-label", label), titleNode);
  if (description) article.append(element("p", "body-copy", description));
}

function render(command, article) {
  switch (command) {
    case "experience":
      heading(
        article,
        "PROFESSIONAL EXPERIENCE",
        "Career history",
        "9+ years across insurance, financial services and government systems.",
      );
      experience.forEach((job) => {
        const entry = element("section", "entry");
        entry.append(
          element("p", "entry-meta", job.dates),
          element("h3", "", job.company),
          element("p", "entry-subtitle", job.role),
        );
        const list = element("ul");
        job.details.forEach((detail) => list.append(element("li", "", detail)));
        entry.append(list, tags(job.stack));
        article.append(entry);
      });
      break;
    case "skills":
      heading(
        article,
        "STACK SKILLS",
        "Tools of the trade",
        "From frontend to deployment, with a focus on maintainability, testing and security.",
      );
      skills.forEach(([name, description]) => {
        const group = element("section", "skill-group");
        group.append(element("h3", "", name), element("p", "", description));
        article.append(group);
      });
      break;
    case "projects":
      heading(
        article,
        "SELECTED PROJECTS",
        "Software with measurable impact",
        "Work delivered within enterprise teams. Metrics reflect the results in my resume compared with previous workflows.",
      );
      projects.forEach((project) => {
        const entry = element("section", "entry");
        entry.append(
          element("p", "entry-meta", project.client),
          element("h3", "", project.name),
          element("p", "lead", project.result),
          element("p", "body-copy", project.description),
          tags(project.stack),
        );
        article.append(entry);
      });
      break;
    case "education":
      heading(article, "EDUCATION", "Always learning");
      [
        [
          "2016",
          "Bachelor’s Degree in Computer Systems Engineering",
          "Instituto Tecnológico de Oaxaca.",
        ],
        ["June 2026", "Claude 101", "Certificate of Completion · Anthropic."],
        [
          "LANGUAGES",
          "Spanish and English",
          "Native Spanish · English B2 (upper-intermediate).",
        ],
      ].forEach(([date, title, description]) => {
        const entry = element("section", "entry");
        entry.append(
          element("p", "entry-meta", date),
          element("h3", "", title),
          element("p", "body-copy", description),
        );
        article.append(entry);
      });
      break;
    case "cv": {
      heading(
        article,
        "CV / RESUME",
        "My career, in one file",
        "Download my complete resume with professional experience, technologies, results and education.",
      );
      article.append(
        element("p", "lead", "Isaac David Santiago Legaspi"),
        element(
          "p",
          "body-copy",
          "Senior Full Stack Developer · Java · Spring Boot · React · TypeScript",
        ),
      );
      const download = link("Download resume ↓", resumeUrl, "action-link");
      download.download =
        "Isaac_Santiago_Senior_Full_Stack_Developer_Resume.docx";
      article.append(
        download,
        element(
          "p",
          "result-note",
          "Original document · Word (.docx) · English",
        ),
      );
      break;
    }
    case "contact": {
      heading(
        article,
        "CONTACT",
        "Let’s connect",
        "Get in touch about a project, a professional opportunity or software development.",
      );
      const list = element("div", "contact-list");
      [
        ["EMAIL", "isaacsanlegas@gmail.com", "mailto:isaacsanlegas@gmail.com"],
        [
          "LINKEDIN",
          "linkedin.com/in/isaac-sanlegas ↗",
          "https://www.linkedin.com/in/isaac-sanlegas",
        ],
        ["PHONE", "(+52) 951 272 1779", "tel:+529512721779"],
      ].forEach(([label, text, url]) => {
        const row = element("div");
        row.append(element("span", "", label), link(text, url));
        list.append(row);
      });
      article.append(
        list,
        element(
          "p",
          "body-copy",
          "Oaxaca, Mexico · Native Spanish / English B2",
        ),
      );
      break;
    }
    case "blog":
      heading(
        article,
        "BLOG",
        "No posts yet",
        "Future notes and articles will appear here. In the meantime, explore the projects I have worked on.",
      );
      article.append(commandButton("projects"));
      break;
    case "help": {
      heading(
        article,
        "TERMINAL MANUAL",
        "Available commands",
        "Type a command and press Enter, or click any command to run it.",
      );
      const list = element("dl", "help-list");
      Object.entries(commands).forEach(([name, description]) => {
        const term = element("dt");
        term.append(commandButton(name));
        list.append(term, element("dd", "", description));
      });
      article.append(
        list,
        element(
          "p",
          "body-copy",
          "Aliases: whoami → about, stack → skills, resume → cv, ls → help, cls → clear.",
        ),
        element(
          "p",
          "body-copy",
          "Tab completes a command; press again to cycle matches. ↑ and ↓ browse history. Escape resets the input. Ctrl+L clears the terminal while typing. Press / outside the input to focus it.",
        ),
        element(
          "p",
          "result-note",
          "This terminal explores my portfolio and does not execute system commands. History stays in this tab and resets when you reload.",
        ),
      );
      break;
    }
    case "history": {
      heading(article, "LOCAL SESSION", "Command history");
      const list = element("ol", "history-list");
      history.forEach((item) => list.append(element("li", "", item)));
      article.append(list);
      break;
    }
  }
}

function setActive(command) {
  document.querySelectorAll("#navigation button").forEach((button) => {
    if (button.dataset.command === command)
      button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
}

function resetInput() {
  input.value = "";
  suggestions.textContent = "";
  completion = null;
  draft = "";
  historyIndex = history.length;
}

function execute(value) {
  const raw = value.trim().slice(0, 200);
  if (!raw) return;
  history.push(raw);
  const counter = document.querySelector("#command-count");
  const count = Number(counter.dataset.count || 0) + 1;
  counter.dataset.count = count;
  counter.textContent = `${count} command${count === 1 ? "" : "s"}`;
  if (history.length > 100) history.shift();
  resetInput();
  const command = resolveCommand(raw);
  setActive(command);
  if (command === "welcome") {
    output.replaceChildren(welcomeTemplate.cloneNode(true));
    scroller.scrollTop = 0;
    announcement.textContent =
      "Welcome screen restored. Select a command or type one below.";
    return;
  }
  if (command === "clear") {
    output.replaceChildren(
      element(
        "p",
        "no-results",
        "Terminal cleared. Type help for commands, or welcome to return to the start.",
      ),
    );
    announcement.textContent = "Terminal cleared.";
    return;
  }
  const article =
    command === "about"
      ? aboutTemplate.cloneNode(true)
      : element("article", "result");
  if (command === "about") {
    article.querySelector(".executed-command")?.remove();
    const title = article.querySelector("h2");
    title.id = `result-${++resultId}`;
    article.setAttribute("aria-labelledby", title.id);
  }
  const prompt = element("p", "executed-command");
  prompt.append(
    element("span", "", "guest@sanlegas"),
    document.createTextNode(" :~$ "),
    document.createTextNode(raw),
  );
  article.prepend(prompt);
  if (command && command !== "about") render(command, article);
  if (!command) {
    heading(article, "COMMAND NOT FOUND", "Let’s try again");
    article.append(
      element("p", "error-message", `“${raw}” is not an available command.`),
    );
    const hint = element("p", "body-copy", "List available commands with ");
    hint.append(commandButton("help"));
    article.append(hint);
  }
  if (output.querySelector(".no-results")) output.replaceChildren(article);
  else output.append(article);
  // Bound the DOM and history to avoid growing indefinitely during a long session.
  while (output.childElementCount > 20) output.firstElementChild.remove();
  scroller.scrollTop = Math.max(0, article.offsetTop - 24);
  announcement.textContent = command
    ? `${commands[command]}. Output added to the terminal.`
    : "Command not found. Type help to see available commands.";
}

document.querySelector("#command-form").addEventListener("submit", (event) => {
  event.preventDefault();
  stopTyping();
  execute(input.value);
});

// Clicks use the same prompt and transcript as typed commands.
let typingToken = 0;
function stopTyping() {
  typingToken++;
  document.querySelector(".command-area").classList.remove("typing");
  document.querySelector("#session-state").textContent =
    "Ready for your next command";
}
async function typeAndRun(command) {
  stopTyping();
  const token = typingToken;
  resetInput();
  document.querySelector(".command-area").classList.add("typing");
  document.querySelector("#session-state").textContent = "Typing command…";
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reducedMotion) {
    for (const character of command) {
      await new Promise((resolve) => setTimeout(resolve, 35));
      if (token !== typingToken) return;
      input.value += character;
    }
  } else input.value = command;
  if (token !== typingToken) return;
  stopTyping();
  execute(command);
  if (matchMedia("(pointer: fine)").matches)
    input.focus({ preventScroll: true });
}
document.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-command]");
  if (button) typeAndRun(button.dataset.command);
});
document.addEventListener("keydown", (event) => {
  const editing = event.target.closest(
    "input, textarea, [contenteditable=true]",
  );
  if (
    event.key === "/" &&
    !editing &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.altKey
  ) {
    event.preventDefault();
    input.focus({ preventScroll: true });
  }
});
if (matchMedia("(pointer: fine)").matches) input.focus({ preventScroll: true });

input.addEventListener("input", () => {
  stopTyping();
  completion = null;
  historyIndex = history.length;
  draft = input.value;
  const matches = completeCommand(input.value);
  suggestions.textContent =
    input.value.trim() && matches.length
      ? `Suggestions: ${matches.slice(0, 5).join(" · ")}`
      : "";
});

input.addEventListener("keydown", (event) => {
  if (event.isComposing) return;
  stopTyping();
  if (event.key === "Tab" && !event.shiftKey && input.value.trim()) {
    const matches = completion?.matches ?? completeCommand(input.value);
    if (!matches.length) return;
    // A single exact match lets Tab move focus normally.
    if (matches.length === 1 && input.value === matches[0]) return;
    event.preventDefault();
    completion = {
      matches,
      index: completion ? (completion.index + 1) % matches.length : 0,
    };
    input.value = matches[completion.index];
    suggestions.textContent =
      matches.length > 1
        ? `Tab: ${matches.join(" · ")}`
        : "Command completed. Press Enter to run.";
  } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    event.preventDefault();
    if (historyIndex === history.length) draft = input.value;
    historyIndex = Math.max(
      0,
      Math.min(
        history.length,
        historyIndex + (event.key === "ArrowUp" ? -1 : 1),
      ),
    );
    input.value =
      historyIndex === history.length ? draft : history[historyIndex];
    input.setSelectionRange(input.value.length, input.value.length);
    completion = null;
    suggestions.textContent = "";
  } else if (event.key === "Escape") {
    resetInput();
  } else if (event.ctrlKey && event.key.toLowerCase() === "l") {
    event.preventDefault();
    execute("clear");
  }
});
