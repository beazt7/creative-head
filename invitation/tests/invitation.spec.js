import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const screenshotDirectory = fileURLToPath(
  new URL("../.preview/", import.meta.url),
);

test("all ten chapters, indexing preferences, and local assets render", async ({
  page,
}) => {
  const failures = [];
  const externalRequests = [];
  page.on("pageerror", (error) => failures.push(error.message));
  page.on("request", (request) => {
    if (!request.url().startsWith("http://127.0.0.1:5174"))
      externalRequests.push(request.url());
  });
  await page.goto("/");
  await expect(page.locator("main > section, main > footer")).toHaveCount(10);
  await expect(page).toHaveTitle(/For Aamu/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Every Great Project",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
  await expect(
    page.getByRole("button", { name: /Music unavailable/ }),
  ).toBeDisabled();
  await expect(page.locator(".offer-details")).toContainText(
    "Endless Appreciation",
  );
  await expect(page.locator(".letter-copy")).toContainText(
    "your creativity matters to me",
  );
  await page.evaluate(() => document.fonts.ready);
  expect(externalRequests).toEqual([]);
  expect(failures).toEqual([]);
});

test("story chapters respond to click and accessible keyboard navigation", async ({
  page,
}) => {
  await page.goto("/#story");
  const tabs = page.getByRole("tab");
  await tabs.nth(2).click();
  await expect(page.getByRole("tabpanel")).toContainText(
    "Your perspective became the difference.",
  );
  await tabs.nth(2).press("ArrowDown");
  await expect(tabs.nth(3)).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText(
    "The next chapter should have your name on it.",
  );
  await tabs.nth(3).press("Home");
  await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
});

test("all 22 photos load in the keyboard-accessible lightbox", async ({
  page,
}) => {
  await page.goto("/#story");
  const firstPhoto = page.getByRole("button", { name: /^Open photo 1:/ });
  await firstPhoto.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  for (let index = 0; index < 22; index += 1) {
    await expect(dialog.locator(".lightbox-footer p span")).toHaveText(
      `${index + 1} / 22`,
    );
    await expect
      .poll(() =>
        dialog
          .locator("img")
          .evaluate((image) => image.complete && image.naturalWidth > 0),
      )
      .toBe(true);
    if (index < 21)
      await dialog
        .getByRole("button", { name: "Next photo", exact: true })
        .click();
  }
  await page.keyboard.press("ArrowRight");
  await expect(dialog.locator(".lightbox-footer p span")).toHaveText("1 / 22");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(firstPhoto).toBeFocused();
  await page.getByRole("button", { name: "Next photos", exact: true }).click();
  await expect(
    page.getByRole("button", { name: /^Open photo 6:/ }),
  ).toBeVisible();
});

for (const name of ["Accept Position", "Accept Position Enthusiastically"]) {
  test(`${name} succeeds and refresh resets acceptance`, async ({ page }) => {
    await page.goto("/#acceptance");
    await page.getByRole("button", { name, exact: true }).click();
    await expect(page.getByRole("status")).toHaveText(
      "You are now officially the Creative Head of all current and future adventures.",
    );
    await expect(page.locator("#acceptance-title")).toBeFocused();
    await expect(page.locator(".celebration-hearts")).toHaveCount(0);
    await expect(page.locator(".ambient")).toHaveCount(0);
    await page.reload();
    await expect(page.getByRole("button", { name, exact: true })).toBeVisible();
  });
}

test("normal-motion acceptance paints real confetti and replay works", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/#acceptance");
  await page
    .getByRole("button", {
      name: "Accept Position Enthusiastically",
      exact: true,
    })
    .click();
  await expect(page.locator(".celebration-hearts")).toBeVisible();
  await expect(page.locator("canvas")).toBeVisible();
  await expect
    .poll(async () => {
      const { data, info } = await sharp(
        await page.locator("canvas").screenshot(),
      )
        .raw()
        .toBuffer({ resolveWithObject: true });
      let coloredPixels = 0;
      for (let index = 0; index < data.length; index += info.channels) {
        if (
          Math.abs(data[index] - 190) < 20 &&
          Math.abs(data[index + 1] - 100) < 20 &&
          Math.abs(data[index + 2] - 131) < 20
        )
          coloredPixels += 1;
      }
      return coloredPixels > 15;
    })
    .toBe(true);
  await expect(
    page.getByRole("heading", { name: /Congratulations/ }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Celebrate again/ }).click();
  await expect(page.locator(".celebration-hearts")).toBeVisible();
});

for (const [width, height] of [
  [320, 740],
  [390, 844],
  [768, 1024],
  [1024, 768],
  [1440, 900],
  [1920, 1080],
]) {
  test(`layout fits ${width} by ${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await expect
      .poll(() =>
        page
          .locator(".hero-photo img")
          .evaluateAll((images) =>
            images.every((image) => image.complete && image.naturalWidth > 0),
          ),
      )
      .toBe(true);
    const overflow = await page
      .locator("h1, h2, h3, .button, .offer-details dd")
      .evaluateAll((elements) =>
        elements
          .filter((element) => element.scrollWidth > element.clientWidth + 2)
          .map((element) => element.textContent),
      );
    expect(overflow).toEqual([]);
    const storyHint = await page
      .locator("#story .section-heading .eyebrow")
      .boundingBox();
    expect(storyHint.y).toBeLessThan(height - 10);
    if (width <= 600) {
      const action = await page.locator(".hero .button").boundingBox();
      const photoBoxes = await page
        .locator(".hero-photo")
        .evaluateAll((elements) =>
          elements.map((element) => ({
            top: element.getBoundingClientRect().top,
          })),
        );
      expect(
        photoBoxes.every((box) => box.top > action.y + action.height),
      ).toBe(true);
    }
    await page.screenshot({ path: `${screenshotDirectory}/hero-${width}.png` });
    if (width === 390 || width === 1440)
      await page.screenshot({
        path: `${screenshotDirectory}/full-${width}.png`,
        fullPage: true,
      });
    await page.locator("#offer").scrollIntoViewIfNeeded();
    await page.screenshot({
      path: `${screenshotDirectory}/offer-${width}.png`,
    });
  });
}

test("WCAG AA automated checks pass before and after acceptance", async ({
  page,
}) => {
  await page.goto("/");
  const initial = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    initial.violations.map(({ id, nodes }) => ({
      id,
      targets: nodes.map((node) => node.target),
    })),
  ).toEqual([]);
  await page
    .getByRole("button", { name: "Accept Position", exact: true })
    .click();
  await expect(page.getByRole("status")).toBeVisible();
  const accepted = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    accepted.violations.map(({ id, nodes }) => ({
      id,
      targets: nodes.map((node) => node.target),
    })),
  ).toEqual([]);
});
