import test from "node:test";
import assert from "node:assert/strict";
import { commands, resolveCommand, completeCommand } from "../commands.js";

test("every documented command resolves", () => {
  for (const command of Object.keys(commands))
    assert.equal(resolveCommand(command), command);
});
test("normalizes case, accents, whitespace and legacy aliases", () => {
  for (const [input, expected] of [
    ["  FORMACIÓN  ", "education"],
    ["educación", "education"],
    ["about   me", "about"],
    ["stack_skills", "skills"],
    ["cv_resume", "cv"],
    ["experiencia", "experience"],
    ["whoami", "about"],
    ["./about", "about"],
    ["./welcome", "welcome"],
    ["ls", "help"],
    ["limpiar", "clear"],
    ["contacto", "contact"],
  ])
    assert.equal(resolveCommand(input), expected);
});
test("rejects unknown commands, prototype names and HTML", () => {
  for (const value of [
    "",
    "constructor",
    "__proto__",
    "toString",
    "<img src=x onerror=alert(1)>",
    "cv extra",
  ]) {
    assert.equal(resolveCommand(value), null);
  }
});
test("completion suggests English commands and aliases", () => {
  assert.deepEqual(completeCommand(""), []);
  assert.ok(completeCommand("ex").includes("experience"));
  assert.ok(completeCommand("res").includes("resume"));
  assert.deepEqual(completeCommand("FORMA"), []);
  assert.ok(completeCommand("c").includes("cv"));
  assert.deepEqual(completeCommand("not-a-command"), []);
});
