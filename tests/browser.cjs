const assert = require("node:assert/strict");
const { readFile } = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: true,
    channel: process.env.BROWSER_CHANNEL || undefined,
  });
  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1080 },
      acceptDownloads: true,
    });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const base = process.env.PORTFOLIO_URL || "http://127.0.0.1:4173";
    await page.goto(base);
    const input = page.locator("#command");
    const last = page.locator("#output article").last();
    const run = async (command) => {
      await input.fill(command);
      await input.press("Enter");
    };
    assert.match(await page.locator("h1").innerText(), /Isaac Santiago/);
    for (const [command, expected] of [
      ["experience", "Hewlett Packard Enterprise"],
      ["skills", "OWASP"],
      ["projects", "Customs Inspection"],
      ["education", "Claude 101"],
      ["cv", "Download resume"],
      ["contact", "isaacsanlegas@gmail.com"],
      ["blog", "No posts yet"],
      ["about", "From the interface"],
    ]) {
      if (command === "blog") await run(command);
      else {
        await page.locator(`#navigation [data-command="${command}"]`).click();
        await page.waitForFunction(
          (command) =>
            document
              .querySelector("#output article:last-child .executed-command")
              ?.textContent.trim()
              .endsWith(command),
          command,
        );
      }
      assert.match(await last.innerText(), new RegExp(expected));
      assert.ok((await page.locator("#output article").count()) >= 1);
    }
    await run("  FORMACIÓN ");
    assert.match(await last.innerText(), /Instituto Tecnológico de Oaxaca/);
    await run("whoami");
    await input.fill("mi borrador");
    await input.press("ArrowUp");
    assert.equal(await input.inputValue(), "whoami");
    await input.press("ArrowUp");
    assert.equal(await input.inputValue(), "FORMACIÓN");
    await input.press("ArrowDown");
    await input.press("ArrowDown");
    assert.equal(await input.inputValue(), "mi borrador");
    await input.press("Escape");
    assert.equal(await input.inputValue(), "");
    await input.fill("proj");
    await input.press("Tab");
    assert.equal(await input.inputValue(), "projects");
    await input.press("Tab");
    assert.equal(
      await page
        .locator(".run-command")
        .evaluate((node) => node === document.activeElement),
      true,
    );
    await input.fill("c");
    await input.press("Tab");
    assert.equal(await input.inputValue(), "cv");
    await input.press("Tab");
    assert.equal(await input.inputValue(), "contact");
    await input.press("Shift+Tab");
    assert.notEqual(
      await page.evaluate(() => document.activeElement.id),
      "command",
    );
    await run("<img src=x onerror=alert(1)>");
    assert.match(await last.innerText(), /is not an available command/);
    assert.equal(await page.locator("#output img").count(), 0);
    await run("constructor");
    assert.match(await last.innerText(), /is not an available command/);
    await run("history");
    assert.match(await last.innerText(), /whoami/);
    await input.press("Control+l");
    assert.equal(await page.locator("#output article").count(), 0);
    await run("./welcome");
    assert.equal(await page.locator("#navigation").count(), 1);
    assert.equal(await page.locator("h1").count(), 1);
    await run("cv");
    const downloadEvent = page.waitForEvent("download");
    await last.getByRole("link", { name: "Download resume" }).click();
    const download = await downloadEvent;
    const downloaded = await readFile(await download.path());
    const source = await readFile(
      path.join(
        __dirname,
        "..",
        "assets/documents",
        download.suggestedFilename(),
      ),
    );
    assert.deepEqual(downloaded, source);
    // Exercise the cap without browser-level click overhead.
    await page.evaluate(() => {
      for (let i = 0; i < 110; i++) {
        document.querySelector("#command").value = "about";
        document.querySelector("#command-form").requestSubmit();
      }
    });
    assert.equal(await page.locator("#output article").count(), 20);
    await run("history");
    assert.equal(await last.locator("li").count(), 100);
    assert.equal(
      await page.evaluate(() => {
        const ids = [...document.querySelectorAll("[id]")].map(
          (node) => node.id,
        );
        return new Set(ids).size === ids.length;
      }),
      true,
    );
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(base);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        true,
        `page overflow at ${width}px`,
      );
      assert.equal(
        await page
          .locator("#output-scroll")
          .evaluate((node) => node.scrollWidth <= node.clientWidth),
        true,
        `console overflow at ${width}px`,
      );
      if (width === 390) {
        await page.evaluate(() => {
          document.activeElement.blur();
          window.scrollTo(0, 0);
        });
        await page.screenshot({
          path: "/tmp/portfolio-mobile.png",
          fullPage: true,
          animations: "disabled",
        });
      }
    }
    await page.emulateMedia({ reducedMotion: "reduce" });
    assert.equal(
      await page
        .locator(".welcome")
        .evaluate((node) => getComputedStyle(node).animationName),
      "none",
    );
    await page.locator('#navigation [data-command="experience"]').click();
    await page.waitForFunction(() =>
      document
        .querySelector("#output article:last-child")
        ?.textContent.includes("Hewlett Packard Enterprise"),
    );
    await page.screenshot({
      path: "/tmp/portfolio-experience.png",
      fullPage: true,
    });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(base);
    await page.locator('#navigation [data-command="experience"]').click();
    await input.fill("skills");
    await input.press("Enter");
    await page.waitForTimeout(500);
    assert.equal(
      await page.locator("#output article").count(),
      1,
      "manual input cancels animated command",
    );
    assert.match(await last.innerText(), /Tools of the trade/);
    await page.locator(".title-help").focus();
    await page.keyboard.press("/");
    assert.equal(
      await input.evaluate((node) => node === document.activeElement),
      true,
    );
    for (const height of [844, 500, 380]) {
      await page.setViewportSize({ width: 390, height });
      const box = await input.boundingBox();
      assert.ok(
        box.y >= 0 && box.y + box.height <= height,
        "prompt stays visible at " + height,
      );
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(base);
    await page.screenshot({
      path: "/tmp/portfolio-terminal-desktop.png",
      animations: "disabled",
    });
    const noJs = await browser.newPage({ javaScriptEnabled: false });
    await noJs.goto(base);
    assert.match(await noJs.locator("#output").innerText(), /9\+ years/);
    assert.equal(await noJs.locator("noscript a[download]").count(), 1);
    assert.equal(
      (
        await noJs.request.get(
          new URL(
            "assets/documents/Isaac_Santiago_Senior_Full_Stack_Developer_Resume.docx",
            base,
          ).href,
        )
      ).status(),
      200,
    );
    assert.deepEqual(errors, []);
    console.log(
      "PASS: sections, aliases, history, completion, focus, untrusted input, CV download, session limits, 5 viewport sizes, reduced motion, no-JS fallback; no JavaScript errors.",
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
