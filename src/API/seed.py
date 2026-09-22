from sqlalchemy.orm import Session
from models import Category, Question, Answer

DATA = {
    "Histoire": [
        ("En quelle année a débuté la Révolution française ?", "1789",
         ["1492","1515","1610","1661","1715","1815","1848","1870","1914"]),
        ("Qui fut le premier empereur des Français ?", "Napoléon Ier",
         ["Louis XIV","Charlemagne","Napoléon III","Louis XVI","François Ier","Henri IV","Louis XVIII","Charles X","Philippe Auguste"]),
        ("Quel mur est tombé en 1989 ?", "Le mur de Berlin",
         ["Le mur d'Hadrien","La Grande Muraille","Le mur des Lamentations","Le mur de l'Atlantique","Le mur de Varsovie","Le mur de Rome","Le mur de Prague","Le mur de Vienne","Le mur de Moscou"]),
        ("Quel peuple a construit le Machu Picchu ?", "Les Incas",
         ["Les Mayas","Les Aztèques","Les Romains","Les Vikings","Les Égyptiens","Les Grecs","Les Celtes","Les Perses","Les Phéniciens"]),
        ("Qui a découvert l'Amérique en 1492 selon le récit historique européen traditionnel ?", "Christophe Colomb",
         ["Vasco de Gama","Magellan","James Cook","Marco Polo","Amerigo Vespucci","Hernán Cortés","Francisco Pizarro","Jacques Cartier","Bartolomeu Dias"]),
        ("Quel roi français était surnommé le Roi-Soleil ?", "Louis XIV",
         ["Louis XIII","Louis XV","Louis XVI","Henri IV","François Ier","Charles VII","Louis XI","Philippe IV","Charles X"]),
        ("La Première Guerre mondiale s'est terminée en quelle année ?", "1918",
         ["1914","1915","1916","1917","1919","1920","1939","1944","1945"]),
        ("Quelle civilisation antique avait Athènes pour grande cité ?", "La civilisation grecque",
         ["La civilisation romaine","La civilisation égyptienne","La civilisation perse","La civilisation maya","La civilisation inca","La civilisation viking","La civilisation phénicienne","La civilisation gauloise","La civilisation babylonienne"]),
        ("Jeanne d'Arc est associée à quelle guerre ?", "La guerre de Cent Ans",
         ["La guerre de Trente Ans","Les guerres napoléoniennes","La guerre de Sept Ans","La guerre de Crimée","La guerre des Gaules","La guerre de Succession d'Espagne","La guerre franco-prussienne","Les croisades","La guerre de 1914-1918"]),
        ("Quel empire avait Rome pour capitale ?", "L'Empire romain",
         ["L'Empire ottoman","L'Empire byzantin","L'Empire carolingien","L'Empire perse","L'Empire mongol","L'Empire inca","L'Empire aztèque","L'Empire britannique","L'Empire russe"]),
    ],
    "Cinéma": [
        ("Qui a réalisé Titanic ?", "James Cameron", ["Steven Spielberg","Christopher Nolan","Martin Scorsese","Ridley Scott","George Lucas","Quentin Tarantino","Peter Jackson","David Fincher","Tim Burton"]),
        ("Dans quelle saga trouve-t-on Dark Vador ?", "Star Wars", ["Star Trek","Harry Potter","Le Seigneur des anneaux","Matrix","Alien","Terminator","Dune","Avatar","Jurassic Park"]),
        ("Quel film met en scène un parc rempli de dinosaures ?", "Jurassic Park", ["Jaws","Avatar","Gladiator","Interstellar","Inception","Rocky","Titanic","Alien","King Kong"]),
        ("Quel acteur joue Jack dans Titanic ?", "Leonardo DiCaprio", ["Brad Pitt","Tom Cruise","Matt Damon","Johnny Depp","George Clooney","Christian Bale","Hugh Jackman","Keanu Reeves","Will Smith"]),
        ("Quel studio est à l'origine de Toy Story ?", "Pixar", ["DreamWorks","Studio Ghibli","Warner Bros.","Universal","Paramount","MGM","Lionsgate","A24","Gaumont"]),
        ("Dans Matrix, quelle couleur a la pilule choisie par Neo ?", "Rouge", ["Bleue","Verte","Jaune","Noire","Blanche","Orange","Violette","Rose","Grise"]),
        ("Quel réalisateur a signé Pulp Fiction ?", "Quentin Tarantino", ["David Lynch","James Cameron","Steven Spielberg","Francis Ford Coppola","Martin Scorsese","Stanley Kubrick","Ridley Scott","Guy Ritchie","Wes Anderson"]),
        ("Quel film d'animation met en scène Simba ?", "Le Roi Lion", ["Aladdin","Bambi","Tarzan","Mulan","Hercule","Pocahontas","Dumbo","Ratatouille","Cars"]),
        ("Dans Harry Potter, quelle école fréquente le héros ?", "Poudlard", ["Beauxbâtons","Durmstrang","Narnia","Camelot","Nevermore","Xavier Institute","Gotham Academy","Ilvermorny","Brakebills"]),
        ("Quel film de Christopher Nolan parle de rêves imbriqués ?", "Inception", ["Dunkirk","Tenet","Memento","Interstellar","The Prestige","Insomnia","Oppenheimer","Batman Begins","Following"]),
    ],
    "Sport": [
        ("Combien de joueurs une équipe de football aligne-t-elle sur le terrain au coup d'envoi ?", "11", ["5","6","7","8","9","10","12","13","15"]),
        ("Dans quel sport utilise-t-on un volant ?", "Badminton", ["Tennis","Squash","Padel","Ping-pong","Baseball","Golf","Hockey","Cricket","Handball"]),
        ("Combien de points vaut un essai au rugby à XV ?", "5", ["1","2","3","4","6","7","8","10","15"]),
        ("Quel pays a remporté la Coupe du monde de football 2018 ?", "France", ["Croatie","Brésil","Allemagne","Argentine","Espagne","Italie","Portugal","Belgique","Angleterre"]),
        ("Sur quelle surface se joue traditionnellement Roland-Garros ?", "Terre battue", ["Gazon","Dur","Moquette","Parquet","Sable","Glace","Béton","Asphalte","Synthétique"]),
        ("Quel sport pratique-t-on sur un tatami avec des projections ?", "Judo", ["Boxe","Escrime","Natation","Cyclisme","Aviron","Tennis","Golf","Handball","Volley-ball"]),
        ("Combien de joueurs sont sur le terrain par équipe au basket-ball ?", "5", ["4","6","7","8","9","10","11","12","15"]),
        ("Dans quel sport trouve-t-on le Tour de France ?", "Cyclisme", ["Athlétisme","Rallye","MotoGP","Triathlon","Ski","Natation","Aviron","Football","Tennis"]),
        ("Quelle distance mesure approximativement un marathon ?", "42,195 km", ["10 km","20 km","21,1 km","30 km","35 km","40 km","45 km","50 km","100 km"]),
        ("Quel sport est associé à Wimbledon ?", "Tennis", ["Golf","Cricket","Rugby","Football","Badminton","Squash","Hockey","Polo","Baseball"]),
    ]
}

def seed_database(db: Session):
    if db.query(Category).count() > 0:
        return

    for category_name, questions in DATA.items():
        category = Category(name=category_name)
        db.add(category)
        db.flush()

        for question_text, correct, wrong_answers in questions:
            question = Question(text=question_text, category_id=category.id)
            db.add(question)
            db.flush()

            db.add(Answer(text=correct, is_correct=True, question_id=question.id))
            for answer_text in wrong_answers:
                db.add(Answer(text=answer_text, is_correct=False, question_id=question.id))

    db.commit()
