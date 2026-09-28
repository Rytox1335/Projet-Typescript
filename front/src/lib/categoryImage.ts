export function imageCategorie(nomCategorie: string): string {
  const nomNormalise = nomCategorie
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();

  switch (nomNormalise) {
    case "cinema":
      return "/img/cinema.jpg";
    case "geographie":
      return "/img/geographie.jpg";
    case "histoire":
      return "/img/histoire.jpg";
    default:
      return "/img/quizz.jpg";
  }
}
