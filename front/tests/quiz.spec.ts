import { test, expect } from "@playwright/test";
import donneesQuestions from "./fixtures/questions.json" with { type: "json" };

test("mise en page mobile et ordinateur", async ({ page: navigateur }, infosTest) => {
  for (const largeur of [375, 768, 1440]) {
    await navigateur.setViewportSize({ width: largeur, height: 900 });
    await navigateur.goto("/");
    await expect(
      navigateur.getByRole("link", { name: "Commencer le quiz" }),
    ).toBeInViewport();
    await expect(navigateur.locator(".button-icon")).toHaveJSProperty(
      "complete",
      true,
    );
    await expect(navigateur.locator(".rule-icon")).toHaveCount(3);
    for (const icone of await navigateur.locator(".button-icon, .rule-icon").all()) {
      expect(
        await icone.evaluate((imageChargee: HTMLImageElement) => imageChargee.naturalWidth),
      ).toBeGreaterThan(0);
    }
    expect(
      await navigateur
        .locator("body")
        .evaluate((corps) => getComputedStyle(corps).fontFamily),
    ).toContain("Trebuchet MS");
    await navigateur.screenshot({
      path: infosTest.outputPath(`accueil-${largeur}.png`),
      fullPage: true,
      animations: "disabled",
    });
    await navigateur.goto("/categories");
    await expect(navigateur.locator(".category")).toHaveCount(1);
    await navigateur.screenshot({
      path: infosTest.outputPath(`categories-${largeur}.png`),
      fullPage: true,
    });
    await navigateur.goto("/quiz/Histoire");
    await expect(navigateur.locator(".choice")).toHaveCount(4);
    await expect(navigateur.locator(".back-icon")).toHaveJSProperty("complete", true);
    expect(
      await navigateur
        .locator(".back-icon")
        .evaluate((imageChargee: HTMLImageElement) => imageChargee.naturalWidth),
    ).toBeGreaterThan(0);
    expect(
      await navigateur.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await navigateur.screenshot({
      path: infosTest.outputPath(`quiz-${largeur}.png`),
      fullPage: true,
      animations: "disabled",
    });
  }
});

test.beforeEach(async ({ page: navigateur }) => {
  await navigateur.route("https://fonts.googleapis.com/**", (itineraire) => itineraire.abort());
  await navigateur.route("**/api/categories", (itineraire) =>
    itineraire.fulfill({ json: [{ id: 1, categorie: "Histoire" }] }),
  );
  await navigateur.route("**/api/questions", (itineraire) =>
    itineraire.fulfill({ json: donneesQuestions.map((questionDonnee, index) => ({ id: index + 1, ...questionDonnee })) }),
  );
});

test("parcours mobile : dix bonnes réponses et bilan", async ({ page: navigateur }) => {
  await navigateur.goto("/");
  await expect(
    navigateur.getByRole("heading", { name: /Culture\s*Quiz/ }),
  ).toBeVisible();
  await navigateur.getByRole("link", { name: "Commencer le quiz" }).click();
  await navigateur.getByRole("link", { name: /Histoire/ }).click();
  for (let indice = 0; indice < 10; indice++) {
    await expect(
      navigateur.getByText(`Question ${indice + 1} / 10`, {
        exact: false,
      }),
    ).toBeVisible();
    const titreQuestion = await navigateur.getByRole("heading", { level: 1 }).innerText();
    const questionDonnee = donneesQuestions.find((question) => question.question === titreQuestion)!;
    await expect(navigateur.locator(".choice")).toHaveCount(4);
    await navigateur
      .getByRole("button", { name: new RegExp(questionDonnee.reponse1) })
      .click();
    await expect(navigateur.locator(".choice.correct")).toContainText(
      questionDonnee.reponse1,
    );
  }
  await expect(navigateur).toHaveURL(/resultats/);
  await expect(navigateur.locator(".score strong")).toHaveText("10");
  await navigateur.getByText("Revoir mes réponses").click();
  await expect(navigateur.locator(".review li")).toHaveCount(10);
  expect(
    await navigateur.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await navigateur.getByRole("link", { name: "Rejouer" }).click();
  await expect(
    navigateur.getByText("Question 1 / 10", { exact: false }),
  ).toBeVisible();
});

test("expiration, mauvaise réponse et verrouillage des choix", async ({
  page: navigateur,
}) => {
  await navigateur.clock.install();
  await navigateur.goto("/quiz/Histoire");
  await expect(navigateur.locator(".choice")).toHaveCount(4);
  await navigateur.clock.fastForward(30_100);
  await expect(navigateur.getByRole("status")).toContainText("Temps écoulé");
  await navigateur.clock.fastForward(1_500);
  await expect(
    navigateur.getByText("Question 2 / 10", { exact: false }),
  ).toBeVisible();
  const titreQuestion = await navigateur.getByRole("heading", { level: 1 }).innerText();
  const bonneReponse = donneesQuestions.find((question) => question.question === titreQuestion)!.reponse1;
  await navigateur.locator(".choice").filter({ hasNotText: bonneReponse }).first().click();
  await expect(navigateur.locator(".choice.wrong")).toHaveCount(1);
  for (const bouton of await navigateur.locator(".choice").all())
    await expect(bouton).toBeDisabled();
  await navigateur.clock.fastForward(1_500);
  await expect(
    navigateur.getByText("Question 3 / 10", { exact: false }),
  ).toBeVisible();
  await expect(navigateur.getByText("0 point", { exact: true })).toBeVisible();
});

test("erreur réseau, nouvel essai et catégorie insuffisante", async ({
  page: navigateur,
}) => {
  await navigateur.route("**/api/categories", (itineraire) =>
    itineraire.fulfill({ status: 500, body: "{}" }),
  );
  await navigateur.goto("/categories");
  await expect(navigateur.getByRole("alert")).toContainText("500");
  await navigateur.route("**/api/categories", (itineraire) =>
    itineraire.fulfill({ json: [{ id: 1, categorie: "Histoire" }] }),
  );
  await navigateur.getByRole("button", { name: "Réessayer" }).click();
  await navigateur.route("**/api/questions", (itineraire) => itineraire.fulfill({ json: [] }));
  await navigateur.getByRole("link", { name: /Histoire/ }).click();
  await expect(navigateur.getByRole("alert")).toContainText("au moins 10");
});
