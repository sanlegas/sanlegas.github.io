# Isaac Santiago — Developer Terminal

A terminal-first portfolio built with native HTML, CSS and JavaScript. Everything lives inside one terminal window: welcome screen, command shortcuts, transcript, input and resume download. Compatible with GitHub Pages; no build step or runtime dependencies.

## Run locally

```sh
python3 -m http.server 4173
```

Open http://localhost:4173. Use HTTP rather than `file://` so JavaScript modules load correctly.

## Commands

| Command            | Output                               |
| ------------------ | ------------------------------------ |
| `welcome`          | Restore the starting screen          |
| `about` / `whoami` | Introduction and highlights          |
| `experience`       | Professional career                  |
| `skills` / `stack` | Technologies and tools               |
| `projects`         | Selected projects and results        |
| `education`        | Education, credentials and languages |
| `cv` / `resume`    | Download the original Word resume    |
| `contact`          | Email, LinkedIn and phone            |
| `blog`             | Writing status                       |
| `help` / `ls`      | Commands and keyboard shortcuts      |
| `history`          | Session command history              |
| `clear` / `cls`    | Clear the transcript                 |

Commands also accept a `./` prefix, as shown in the welcome screen. Clicking a command types it into the prompt, then runs it. Typed and clicked commands append output to the same transcript. Typing manually cancels any running typing animation. Reduced-motion preferences disable that animation.

Enter runs a command; Tab completes it; repeated Tab cycles matches; Shift+Tab moves focus backward; ↑/↓ browse history; Escape resets input; Ctrl+L clears the transcript from the input; `/` focuses the prompt when outside a text field.

History is stored only in memory, with a limit of 100 commands and 20 output blocks. Input is rendered as text, never executed as HTML or system commands. The introduction, email and resume download remain accessible without JavaScript.

## Update content

- `index.html`: welcome screen, about template, terminal structure and metadata.
- `portfolio.js`: career, skills, projects and resume path.
- `script.js`: rendering, education, contact and console interaction.
- `commands.js`: command descriptions, aliases and completion.
- `styles.css`: terminal layout, responsive styling and motion preferences.
- `assets/documents/Isaac_Santiago_Senior_Full_Stack_Developer_Resume.docx`: unchanged copy of the supplied English resume.

Public interface and content are in English. Some earlier Spanish command aliases remain accepted for compatibility but are not suggested. Company and institution names retain their official spelling. Legacy directories `oldPortafolio/` and `juegos/` remain unchanged.

## Verify

```sh
node --test tests/commands.test.mjs
# With the local server running and Playwright available:
node tests/browser.cjs
```

For an external Playwright installation, set `NODE_PATH` to its `node_modules` directory. Use `BROWSER_CHANNEL=chrome` to test with installed Google Chrome instead of Playwright's Chromium. Browser coverage includes command output, animation cancellation, keyboard controls, session limits, mobile sizing, reduced motion, download integrity and the no-JavaScript fallback.
