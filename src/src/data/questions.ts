import { Question } from "../types/quiz.js";
const makeAnswers = (correct: string, wrong: string[]) => [correct, ...wrong].map((text, i) => ({ id: i + 1, text, isCorrect: i === 0 }));
const history: [string,string,string[]][] = [
["En quelle année débute la Révolution française ?","1789",["1492","1815","1914","1776","1804","1848","1870","1945","1968"]],
["Qui fut le premier empereur des Français ?","Napoléon Ier",["Louis XIV","Charlemagne","Napoléon III","Louis XVI","François Ier","Henri IV","Charles X","Louis-Philippe","Jules César"]],
["Quel mur tombe en 1989 ?","Mur de Berlin",["Mur d'Hadrien","Grande Muraille","Mur des Lamentations","Mur de l'Atlantique","Mur d'Antonin","Mur de Babylone","Mur de Trajan","Mur de Prague","Mur de Rome"]],
["Quelle civilisation a construit Machu Picchu ?","Incas",["Mayas","Aztèques","Romains","Grecs","Égyptiens","Vikings","Perses","Olmèques","Phéniciens"]],
["Qui était surnommé le Roi-Soleil ?","Louis XIV",["Louis XVI","Louis XIII","Napoléon Ier","Henri IV","François Ier","Charles X","Louis XV","Louis XVIII","Philippe II"]],
["En quelle année commence la Première Guerre mondiale ?","1914",["1918","1939","1945","1870","1905","1929","1815","1899","1912"]],
["Quel navigateur atteint l'Amérique en 1492 ?","Christophe Colomb",["Vasco de Gama","Magellan","James Cook","Marco Polo","Amerigo Vespucci","Jacques Cartier","Francis Drake","Bartolomeu Dias","Cabral"]],
["Quelle ville fut ensevelie par le Vésuve en 79 ?","Pompéi",["Rome","Athènes","Sparte","Carthage","Alexandrie","Naples","Byzance","Troie","Corinthe"]],
["Qui a signé l'édit de Nantes ?","Henri IV",["Louis XIV","François Ier","Louis XVI","Charles VII","Napoléon Ier","Louis XIII","Henri II","Charles X","Louis XV"]],
["En quelle année prend fin la Seconde Guerre mondiale en Europe ?","1945",["1939","1940","1942","1944","1946","1918","1950","1936","1941"]]
];
const cinema: [string,string,string[]][] = [
["Qui a réalisé Titanic ?","James Cameron",["Steven Spielberg","Christopher Nolan","Ridley Scott","Martin Scorsese","George Lucas","Peter Jackson","Quentin Tarantino","David Fincher","Tim Burton"]],
["Quel film met en scène un parc peuplé de dinosaures ?","Jurassic Park",["Avatar","Gladiator","Alien","Jaws","King Kong","Matrix","Terminator","Rocky","Interstellar"]],
["Qui a réalisé Pulp Fiction ?","Quentin Tarantino",["Martin Scorsese","Francis Ford Coppola","David Fincher","Tim Burton","Guy Ritchie","Steven Spielberg","Ridley Scott","James Cameron","George Lucas"]],
["Dans quelle saga trouve-t-on Dark Vador ?","Star Wars",["Star Trek","Harry Potter","Matrix","Alien","Rocky","Terminator","Indiana Jones","Avatar","Dune"]],
["Quel film raconte la vie de Forrest Gump ?","Forrest Gump",["Rain Man","Cast Away","Philadelphia","Rocky","Good Will Hunting","Big","The Truman Show","Green Book","Joker"]],
["Qui a réalisé Inception ?","Christopher Nolan",["James Cameron","Steven Spielberg","Denis Villeneuve","David Fincher","Ridley Scott","Peter Jackson","Tim Burton","George Lucas","Sam Mendes"]],
["Quel personnage est un célèbre archéologue aventurier ?","Indiana Jones",["Rocky Balboa","John Wick","Neo","Rambo","James Bond","Jack Sparrow","Terminator","Batman","Forrest Gump"]],
["Quel film d'animation met en scène Woody et Buzz ?","Toy Story",["Cars","Shrek","Ratatouille","Le Roi Lion","Wall-E","Là-haut","Madagascar","Les Indestructibles","Monstres & Cie"]],
["Dans Matrix, quel est le pseudonyme de Thomas Anderson ?","Neo",["Morpheus","Trinity","Smith","Cypher","Oracle","Tank","Mouse","Dozer","Switch"]],
["Quel réalisateur est associé à E.T. ?","Steven Spielberg",["George Lucas","James Cameron","Tim Burton","Ridley Scott","Peter Jackson","Christopher Nolan","David Lynch","Sam Raimi","Robert Zemeckis"]]
];
const sport: [string,string,string[]][] = [
["Combien de joueurs une équipe de football aligne-t-elle au coup d'envoi ?","11",["5","6","7","8","9","10","12","13","15"]],
["Quel sport utilise une raquette et un volant ?","Badminton",["Tennis","Squash","Padel","Ping-pong","Baseball","Golf","Cricket","Hockey","Handball"]],
["Combien de points vaut un essai au rugby à XV ?","5",["1","2","3","4","6","7","8","10","12"]],
["Dans quel sport trouve-t-on un panier ?","Basket-ball",["Football","Rugby","Tennis","Volley-ball","Handball","Golf","Hockey","Baseball","Cricket"]],
["Quelle surface est utilisée à Roland-Garros ?","Terre battue",["Gazon","Béton","Parquet","Sable","Glace","Asphalte","Moquette","Terre noire","Gravier"]],
["Combien d'anneaux comporte le symbole olympique ?","5",["3","4","6","7","8","9","10","12","15"]],
["Dans quel sport réalise-t-on un slam dunk ?","Basket-ball",["Volley-ball","Tennis","Handball","Rugby","Football","Baseball","Golf","Hockey","Boxe"]],
["Quelle distance mesure un marathon ?","42,195 km",["40 km","41 km","42 km","43 km","21,1 km","50 km","35 km","45 km","100 km"]],
["Quel sport se pratique sur un ring avec des gants ?","Boxe",["Escrime","Judo","Tennis","Rugby","Cyclisme","Natation","Golf","Football","Ski"]],
["Combien de sets faut-il généralement gagner dans un match de volley-ball ?","3",["1","2","4","5","6","7","8","9","10"]]
];
const sciences: [string,string,string[]][] = [
["Quelle planète est surnommée la planète rouge ?","Mars",["Vénus","Jupiter","Saturne","Mercure","Terre","Neptune","Uranus","Pluton","Cérès"]],
["Quelle est la formule chimique de l'eau ?","H2O",["CO2","O2","NaCl","H2","N2","CH4","O3","HCl","NH3"]],
["Quel organe pompe le sang ?","Cœur",["Poumon","Foie","Rein","Estomac","Cerveau","Pancréas","Intestin","Rate","Vessie"]],
["Quelle force nous maintient au sol ?","Gravité",["Magnétisme","Friction","Électricité","Pression","Inertie","Tension","Poussée","Radiation","Convection"]],
["Quel gaz est majoritaire dans l'atmosphère terrestre ?","Azote",["Oxygène","CO2","Hydrogène","Hélium","Argon","Méthane","Ozone","Néon","Xénon"]],
["Combien de chromosomes possède normalement une cellule humaine somatique ?","46",["23","44","45","47","48","22","24","92","42"]],
["Quelle étoile est au centre du système solaire ?","Soleil",["Sirius","Véga","Polaris","Bételgeuse","Proxima Centauri","Rigel","Altaïr","Antarès","Arcturus"]],
["Quel est le symbole chimique de l'or ?","Au",["Ag","Fe","O","Or","Gd","Cu","Al","Pt","Pb"]],
["Quelle unité mesure l'intensité électrique ?","Ampère",["Volt","Watt","Ohm","Joule","Pascal","Newton","Tesla","Hertz","Coulomb"]],
["Quel scientifique est associé à la théorie de la relativité ?","Albert Einstein",["Isaac Newton","Galilée","Darwin","Pasteur","Tesla","Curie","Bohr","Faraday","Kepler"]]
];
const groups = [history, cinema, sport, sciences];
export const questions: Question[] = groups.flatMap((group, ci) => group.map(([text, correct, wrong], qi) => ({ id: ci * 10 + qi + 1, categoryId: ci + 1, text, answers: makeAnswers(correct, wrong) })));
