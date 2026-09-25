export function categoryImage(name: string): string {
  const normalized = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();

  switch (normalized) {
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
