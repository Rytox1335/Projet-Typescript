import { test, expect } from "@playwright/test";
import questions from "../../back/database/data/questions.json" with { type: "json" };

test("mise en page mobile et ordinateur", async ({ page }, testInfo) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(
      page.getByRole("link", { name: "À vous de jouer" }),
    ).toBeInViewport();
    await page.screenshot({
      path: testInfo.outputPath(`accueil-${width}.png`),
      fullPage: true, animations: "disabled",
    });
    await page.goto("/quiz/Histoire");
    await expect(page.locator(".choice")).toHaveCount(4);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: testInfo.outputPath(`quiz-${width}.png`),
      fullPage: true, animations: "disabled",
    });
  }
});

test.beforeEach(async ({ page }) => {
  await page.route("https://fonts.googleapis.com/**", (route) => route.abort());
  await page.route("**/api/categories", (route) =>
    route.fulfill({ json: [{ id: 1, categorie: "Histoire" }] }),
  );
  await page.route("**/api/questions", (route) =>
    route.fulfill({ json: questions.map((q, i) => ({ id: i + 1, ...q })) }),
  );
});

test("parcours mobile : dix bonnes réponses et bilan", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /Culture\s*Quiz\./ }),
  ).toBeVisible();
  await page.getByRole("link", { name: "À vous de jouer" }).click();
  await page.getByRole("link", { name: /Histoire/ }).click();
  for (let i = 0; i < 10; i++) {
    await expect(
      page.getByText(`QUESTION ${String(i + 1).padStart(2, "0")}`, {
        exact: false,
      }),
    ).toBeVisible();
    const title = await page.getByRole("heading", { level: 1 }).innerText();
    const question = questions.find((q) => q.question === title)!;
    await expect(page.locator(".choice")).toHaveCount(4);
    await page
      .getByRole("button", { name: new RegExp(question.reponse1) })
      .click();
    await expect(page.locator(".choice.correct")).toContainText(
      question.reponse1,
    );
  }
  await expect(page).toHaveURL(/resultats/);
  await expect(page.locator(".score strong")).toHaveText("10");
  await page.getByText("Revoir mes réponses").click();
  await expect(page.locator(".review li")).toHaveCount(10);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("link", { name: "Rejouer" }).click();
  await expect(page.getByText("QUESTION 01", { exact: false })).toBeVisible();
});

test("expiration, mauvaise réponse et verrouillage des choix", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("/quiz/Histoire");
  await expect(page.locator(".choice")).toHaveCount(4);
  await page.clock.fastForward(30_100);
  await expect(page.getByRole("status")).toContainText("Temps écoulé");
  await page.clock.fastForward(1_500);
  await expect(page.getByText("QUESTION 02", { exact: false })).toBeVisible();
  const title = await page.getByRole("heading", { level: 1 }).innerText();
  const correct = questions.find((q) => q.question === title)!.reponse1;
  await page.locator(".choice").filter({ hasNotText: correct }).first().click();
  await expect(page.locator(".choice.wrong")).toHaveCount(1);
  for (const button of await page.locator(".choice").all())
    await expect(button).toBeDisabled();
  await page.clock.fastForward(1_500);
  await expect(page.getByText("QUESTION 03", { exact: false })).toBeVisible();
  await expect(page.getByText("0 point", { exact: true })).toBeVisible();
});

test("erreur réseau, nouvel essai et catégorie insuffisante", async ({
  page,
}) => {
  await page.route("**/api/categories", (route) =>
    route.fulfill({ status: 500, body: "{}" }),
  );
  await page.goto("/categories");
  await expect(page.getByRole("alert")).toContainText("500");
  await page.route("**/api/categories", (route) =>
    route.fulfill({ json: [{ id: 1, categorie: "Histoire" }] }),
  );
  await page.getByRole("button", { name: "Réessayer" }).click();
  await page.route("**/api/questions", (route) => route.fulfill({ json: [] }));
  await page.getByRole("link", { name: /Histoire/ }).click();
  await expect(page.getByRole("alert")).toContainText("au moins 10");
});

