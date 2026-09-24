"""Génère les données Laravel et un export SQL complet à partir des questions ci-dessous."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GROUPS = {
    'Histoire': [
        ('En quelle année a eu lieu la prise de la Bastille ?', '1789'),
        ('En quelle année Christophe Colomb arrive-t-il en Amérique ?', '1492'),
        ('En quelle année Napoléon Ier a-t-il été sacré empereur ?', '1804'),
        ('En quelle année la Première Guerre mondiale a-t-elle commencé ?', '1914'),
        ('En quelle année la Seconde Guerre mondiale s’est-elle terminée ?', '1945'),
        ('En quelle année le mur de Berlin est-il tombé ?', '1989'),
        ('En quelle année les premiers humains ont-ils marché sur la Lune ?', '1969'),
        ('En quelle année la Ve République française a-t-elle été instaurée ?', '1958'),
        ('En quelle année a eu lieu la bataille de Marignan ?', '1515'),
        ('En quelle année a eu lieu la bataille de Waterloo ?', '1815'),
    ],
    'Géographie': [
        ('Quelle est la capitale du Japon ?', 'Tokyo'),
        ('Quelle est la capitale du Canada ?', 'Ottawa'),
        ('Quelle est la capitale de l’Australie ?', 'Canberra'),
        ('Quelle est la capitale du Brésil ?', 'Brasilia'),
        ('Quelle est la capitale de l’Égypte ?', 'Le Caire'),
        ('Quelle est la capitale de l’Italie ?', 'Rome'),
        ('Quelle est la capitale de l’Argentine ?', 'Buenos Aires'),
        ('Quelle est la capitale de la Norvège ?', 'Oslo'),
        ('Quelle est la capitale du Portugal ?', 'Lisbonne'),
        ('Quelle est la capitale du Sénégal ?', 'Dakar'),
    ],
    'Cinéma': [
        ('Qui a réalisé Titanic, sorti en 1997 ?', 'James Cameron'),
        ('Qui a réalisé Jurassic Park, sorti en 1993 ?', 'Steven Spielberg'),
        ('Qui a réalisé Inception ?', 'Christopher Nolan'),
        ('Qui a réalisé Pulp Fiction ?', 'Quentin Tarantino'),
        ('Qui a réalisé Le Fabuleux Destin d’Amélie Poulain ?', 'Jean-Pierre Jeunet'),
        ('Qui a réalisé Le Voyage de Chihiro ?', 'Hayao Miyazaki'),
        ('Qui a réalisé la trilogie du Seigneur des anneaux ?', 'Peter Jackson'),
        ('Qui a réalisé Le Parrain, sorti en 1972 ?', 'Francis Ford Coppola'),
        ('Qui a réalisé Les Temps modernes ?', 'Charlie Chaplin'),
        ('Qui a réalisé Psychose, sorti en 1960 ?', 'Alfred Hitchcock'),
    ],
}

questions = []
for category, pairs in GROUPS.items():
    for title, correct in pairs:
        answers = [correct] + [answer for _, answer in pairs if answer != correct]
        questions.append({'categorie': category, 'question': title, **{f'reponse{i}': answer for i, answer in enumerate(answers, 1)}})

data_dir = ROOT / 'back/database/data'
data_dir.mkdir(parents=True, exist_ok=True)
(data_dir / 'questions.json').write_text(json.dumps(questions, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

def quote(value):
    return "'" + value.replace("'", "''") + "'"

schema = (ROOT / 'back/culturequizz.sql').read_text(encoding='utf-8')
sql = schema + '\n\n-- Données pédagogiques Culture Quiz : reponse1 est toujours correcte.\nSET NAMES utf8mb4;\nSTART TRANSACTION;\n'
sql += 'INSERT INTO categories (categorie) VALUES\n' + ',\n'.join('(' + quote(c) + ')' for c in GROUPS) + ';\n'
columns = list(questions[0])
sql += 'INSERT INTO questions (' + ', '.join(columns) + ') VALUES\n'
sql += ',\n'.join('(' + ', '.join(quote(q[c]) for c in columns) + ')' for q in questions) + ';\nCOMMIT;\n'
(ROOT / 'back/culturequizz-complet.sql').write_text(sql, encoding='utf-8')
print(f'{len(questions)} questions, {len(GROUPS)} catégories ; données JSON et export SQL générés.')
