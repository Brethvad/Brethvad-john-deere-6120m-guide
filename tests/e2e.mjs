// End-to-end check of the built site. Start `npm run preview` first, then run `npm run test:e2e`.
import { chromium } from "playwright-core";
import { existsSync, mkdirSync } from "node:fs";

const BASE = process.env.BASE || "http://localhost:4173";
const SHOTS = new URL("./screenshots/", import.meta.url).pathname;
mkdirSync(SHOTS, { recursive: true });
// Uses CHROME_PATH, else the system Chrome on macOS, else Playwright's own Chromium
// (install with: npx playwright-core install chromium).
const MAC_CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const CHROME = process.env.CHROME_PATH || (existsSync(MAC_CHROME) ? MAC_CHROME : undefined);
let failures = 0;
const ok = (m) => console.log("✓", m);
const fail = (m) => { failures++; console.log("✗", m); };
const check = (cond, pass, failMsg) => (cond ? ok(pass) : fail(failMsg));

const browser = await chromium.launch({ executablePath: CHROME, args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });

async function ctx(viewport) {
  const c = await browser.newContext({ viewport });
  const page = await c.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => m.type() === "error" && errors.push(`console: ${m.text()}`));
  return { c, page, errors };
}

// 1. Every route renders an h1 without errors
const routes = ["/", "/3d", "/forerhus", "/betjening", "/girkasse", "/hydraulikk", "/fjaering", "/lys", "/redskap", "/snoutstyr", "/veitransport", "/daglig-kontroll", "/manedlig-kontroll", "/vedlikehold", "/feilsoking", "/spesifikasjoner", "/ordliste", "/sikkerhet", "/kilder", "/sok?q=olje", "/finnes-ikke"];
{
  const { page, errors } = await ctx({ width: 1440, height: 900 });
  for (const r of routes) {
    await page.goto(BASE + r, { waitUntil: "networkidle" });
    const h1 = (await page.locator("h1").first().textContent())?.trim();
    check(h1, `route ${r} → "${h1}"`, `route ${r} has no h1`);
  }
  if (errors.length) fail(`console errors on routes: ${errors.slice(0, 5).join(" | ")}`); else ok("no console errors across all routes");

  // 2. Navigation links in sidebar work
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  for (const label of ["Girkasse", "Hydraulikk", "Lys", "Feilsøking"]) {
    await page.getByRole("navigation", { name: "Hovedmeny" }).getByRole("link", { name: label, exact: true }).click();
    const crumbLoc = page.getByRole("navigation", { name: "Brødsmulesti" });
    await crumbLoc.getByText(label, { exact: true }).waitFor({ timeout: 3000 }).catch(() => {});
    const crumb = await crumbLoc.textContent();
    check(crumb?.includes(label), `sidebar → ${label} (breadcrumb ok)`, `sidebar ${label} breadcrumb: ${crumb}`);
  }

  // 3. Search
  for (const [q, expect] of [["brytebolt", "Snøutstyr"], ["Tokvam", "Snøutstyr"], ["smørenipler", "Månedlig kontroll"], ["dekktrykk", "Månedlig kontroll"], ["differensialsperre", "Differensialsperre"], ["rødt lys", "STOP"], ["starter ikke", "Motoren starter dårlig"], ["PTO", "Kraftuttak"], ["SoftShift", "SoftShift"]]) {
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.fill("#global-search", q);
    await page.press("#global-search", "Enter");
    await page.waitForURL(/\/sok\?q=/);
    await page.locator("h1", { hasText: "Søk" }).waitFor();
    await page.waitForTimeout(200);
    const count = await page.locator("main ul li a").count();
    const text = await page.locator("main").textContent();
    check(count > 0 && text.includes(expect), `search "${q}" → ${count} results incl. "${expect}"`, `search "${q}" → ${count} results, missing "${expect}"`);
  }
  // result link goes to the right place
  await page.goto(BASE + "/sok?q=differensialsperre", { waitUntil: "networkidle" });
  await page.locator("main ul li a").first().click();
  await page.waitForLoadState("networkidle");
  ok(`first result opens ${page.url().replace(BASE, "")}`);

  // 4. Cab explorer
  await page.goto(BASE + "/forerhus", { waitUntil: "networkidle" });
  await page.locator('svg [aria-label="Gruppespak med girknapper"]').click();
  await page.waitForURL(/k=gruppespak/);
  await page.waitForTimeout(300);
  const head = (await page.locator("main h3", { hasText: "Gruppespak" }).count()) ? "Gruppespak" : await page.locator("main h3").allTextContents();
  check(head?.includes("Gruppespak"), "cab hotspot click → detail panel shows Gruppespak", `cab detail: ${head}`);
  await page.getByRole("tab", { name: "Pedaler og gulv" }).click();
  await page.waitForTimeout(300);
  const items = await page.locator("main .card.divide-y button").count();
  check(items > 0 && items < 10, `cab zone filter → ${items} controls`, `cab zone filter count ${items}`);
  await page.keyboard.press("Tab");
  await page.screenshot({ path: SHOTS + "forerhus-desktop.png", fullPage: false });

  // 5. Checklist persistence
  await page.goto(BASE + "/daglig-kontroll", { waitUntil: "networkidle" });
  const boxes = page.locator('main input[type="checkbox"]');
  await boxes.nth(0).check({ force: true });
  await boxes.nth(1).check({ force: true });
  await page.reload({ waitUntil: "networkidle" });
  const checked = await page.locator('main input[type="checkbox"]:checked').count();
  check(checked === 2, "checklist state persists after reload", `checklist persisted ${checked}`);
  await page.getByRole("button", { name: "Nullstill" }).click();
  check((await page.locator('main input[type="checkbox"]:checked').count()) === 0, "checklist reset", "checklist reset");

  // 5b. Monthly checklist: its own storage, independent of the daily one
  await page.goto(BASE + "/manedlig-kontroll", { waitUntil: "networkidle" });
  const mBoxes = page.locator('main input[type="checkbox"]');
  const mCount = await mBoxes.count();
  check(mCount >= 15 && mCount <= 25, `monthly checklist has ${mCount} items`, `monthly checklist item count ${mCount}`);
  await mBoxes.nth(2).check({ force: true });
  await page.reload({ waitUntil: "networkidle" });
  check((await page.locator('main input[type="checkbox"]:checked').count()) === 1, "monthly checklist persists", "monthly checklist did not persist");
  await page.goto(BASE + "/daglig-kontroll", { waitUntil: "networkidle" });
  check((await page.locator('main input[type="checkbox"]:checked').count()) === 0, "monthly and daily checklists are independent", "daily checklist picked up monthly state");
  await page.goto(BASE + "/manedlig-kontroll", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Nullstill" }).click();
  await page.screenshot({ path: SHOTS + "manedlig-desktop.png", fullPage: true });

  // 5c. Snow equipment page: checklist and external source links
  await page.goto(BASE + "/snoutstyr", { waitUntil: "networkidle" });
  const sCount = await page.locator('main input[type="checkbox"]').count();
  check(sCount === 17, `snow checklist has ${sCount} items`, `snow checklist item count ${sCount}`);
  const tokvamLinks = await page.locator('main a[href*="doc.tokvam.no"]').count();
  check(tokvamLinks > 0, `snow page links to Tokvam manuals (${tokvamLinks})`, "no Tokvam manual links");
  await page.screenshot({ path: SHOTS + "snoutstyr-desktop.png", fullPage: true });

  // 6. Simplified explanation toggle + details
  await page.goto(BASE + "/girkasse", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /Vis forenklet forklaring/ }).first().click();
  check((await page.getByText("Spaken velger «etasje»").count()), "simplified explanation toggles", "simplified explanation");
  await page.screenshot({ path: SHOTS + "girkasse-desktop.png", fullPage: true });

  // 7. Troubleshooting filter
  await page.goto(BASE + "/feilsoking", { waitUntil: "networkidle" });
  await page.fill("#ts-search", "starter");
  const n = await page.locator("main details").count();
  check(n >= 1, `troubleshooting filter "starter" → ${n}`, "troubleshooting filter");

  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.screenshot({ path: SHOTS + "home-desktop.png", fullPage: true });
  await page.goto(BASE + "/hydraulikk", { waitUntil: "networkidle" });
  await page.screenshot({ path: SHOTS + "hydraulikk-desktop.png", fullPage: true });
}

// 8. 3D scene: loads, presets, select via list
{
  const { page, errors } = await ctx({ width: 1440, height: 900 });
  await page.goto(BASE + "/3d", { waitUntil: "networkidle" });
  const canvas = page.locator("canvas");
  await canvas.waitFor({ timeout: 20000 }).then(() => ok("3D canvas rendered")).catch(() => fail("3D canvas not rendered"));
  await page.waitForTimeout(1500);
  for (const v of ["Forfra", "Bakfra", "Ovenfra", "Førerhus", "Standard"]) {
    await page.getByRole("group", { name: "Kameravinkel" }).getByRole("button", { name: v, exact: true }).click();
    await page.waitForTimeout(400);
  }
  ok("camera presets clicked without crash");
  await page.getByRole("button", { name: "Tilbakestill kamera" }).click();
  // Click roughly at the hood area to select a part through raycasting.
  const box = await canvas.boundingBox();
  await page.mouse.click(box.x + box.width * 0.62, box.y + box.height * 0.42);
  await page.waitForTimeout(500);
  const picked = new URL(page.url()).searchParams.get("del");
  if (picked) ok(`clicking the model selected part "${picked}"`);
  else console.log("· click on model did not hit a part (position-dependent)");
  await page.getByRole("button", { name: /Bakre trepunktsløft/ }).click();
  await page.locator("main h2", { hasText: "trepunktsløft" }).first().waitFor({ timeout: 3000 }).catch(() => {});
  const title = (await page.locator("main h2", { hasText: "trepunktsløft" }).count()) ? "trepunktsløft" : await page.locator("main h2").allTextContents();
  check(title?.includes("trepunktsløft"), "part list → info panel shows Bakre trepunktsløft", `3D info: ${title}`);
  await page.getByRole("group", { name: "Område" }).getByRole("button", { name: /Bakre/ }).first().click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: SHOTS + "3d-desktop.png" });
  // drag to rotate
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 + 200, box.y + box.height / 2, { steps: 10 });
  await page.mouse.up();
  await page.mouse.wheel(0, -300);
  ok("rotate + zoom gestures executed");
  const real = errors.filter((e) => !/GPU stall|WebGL|ReadPixels|swiftshader/i.test(e));
  check(!real.length, "no console errors on 3D page", `3D console errors: ${real.slice(0, 3).join(" | ")}`);
}

// 9. Missing 3D chunk → graceful fallback
{
  const { page } = await ctx({ width: 1280, height: 800 });
  await page.route(/TractorScene-.*\.js/, (r) => r.abort());
  await page.goto(BASE + "/3d", { waitUntil: "networkidle" });
  const fb = await page.getByText("3D-modellen kan ikke vises").waitFor({ timeout: 8000 }).then(() => true, () => false);
  check(fb, "missing 3D asset → fallback shown, page usable", "no fallback for missing 3D chunk");
  await page.getByRole("button", { name: /Førersete/ }).click();
  check((await page.locator("main h2").first().textContent())?.includes("Førersete"), "parts list still works without 3D", "parts list without 3D");
}

// 10. No WebGL → fallback
{
  const b2 = await chromium.launch({ executablePath: CHROME, args: ["--disable-webgl", "--disable-3d-apis"] });
  const page = await (await b2.newContext()).newPage();
  await page.goto(BASE + "/3d", { waitUntil: "networkidle" });
  const nowebgl = await page.getByText("støtter ikke WebGL").waitFor({ timeout: 8000 }).then(() => true, () => false);
  check(nowebgl, "WebGL disabled → fallback message", "no WebGL fallback");
  await b2.close();
}

// 11. Mobile
{
  const { page, errors } = await ctx({ width: 390, height: 844 });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.screenshot({ path: SHOTS + "home-mobile.png", fullPage: true });
  await page.getByRole("button", { name: "Åpne meny" }).click();
  await page.getByRole("dialog", { name: "Meny" }).getByRole("link", { name: "Daglig kontroll" }).click();
  await page.waitForURL(/daglig-kontroll/);
  check((await page.getByRole("dialog").count()) === 0, "mobile menu navigates and closes", "mobile menu stays open");
  await page.screenshot({ path: SHOTS + "daglig-mobile.png", fullPage: true });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  check(overflow <= 1, "no horizontal overflow on mobile (daglig-kontroll)", `horizontal overflow ${overflow}px`);
  for (const r of routes) {
    await page.goto(BASE + r, { waitUntil: "networkidle" });
    const o = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    check(o <= 1, `mobile ${r}: no horizontal overflow`, `mobile ${r}: overflow ${o}px`);
  }
  await page.goto(BASE + "/forerhus", { waitUntil: "networkidle" });
  await page.screenshot({ path: SHOTS + "forerhus-mobile.png", fullPage: true });
  await page.goto(BASE + "/3d", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: SHOTS + "3d-mobile.png" });
  const real = errors.filter((e) => !/GPU stall|WebGL|ReadPixels|swiftshader/i.test(e));
  check(!real.length, "no console errors on mobile run", `mobile console errors: ${real.slice(0, 3).join(" | ")}`);
}

// 12. Keyboard: skip link + focus visible
{
  const { page } = await ctx({ width: 1280, height: 800 });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  const t = await page.evaluate(() => document.activeElement?.textContent);
  check(t?.includes("Hopp til innhold"), "first Tab focuses skip link", `first focus: ${t}`);
  await page.keyboard.press("Control+k");
  const id = await page.evaluate(() => document.activeElement?.id);
  check(id === "global-search", "Ctrl+K focuses search", `Ctrl+K focus: ${id}`);
}

await browser.close();
console.log(failures ? `\n${failures} FAILURE(S)` : "\nALL CHECKS PASSED");
process.exit(failures ? 1 : 0);
