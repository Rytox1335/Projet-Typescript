import random
from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import Base, SessionLocal, engine, get_db
from models import Answer, Category, Question
from schemas import (
    AnswerCheckIn,
    AnswerCheckOut,
    AnswerOut,
    CategoryOut,
    QuestionOut,
)
from seed import seed_database

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()
    yield

app = FastAPI(
    title="Culture Quiz API",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def make_question(question: Question) -> QuestionOut:
    correct_answers = [a for a in question.answers if a.is_correct]
    wrong_answers = [a for a in question.answers if not a.is_correct]

    if len(correct_answers) != 1 or len(wrong_answers) < 3:
        raise HTTPException(
            status_code=500,
            detail="Question mal configurée dans la base de données"
        )

    selected = [correct_answers[0]] + random.sample(wrong_answers, 3)
    random.shuffle(selected)

    return QuestionOut(
        id=question.id,
        text=question.text,
        answers=[AnswerOut(id=a.id, text=a.text) for a in selected]
    )

@app.get("/")
def home():
    return {"message": "Culture Quiz API fonctionne"}

@app.get("/categories", response_model=list[CategoryOut])
def get_categories(db: Session = Depends(get_db)):
    return db.query(Category).order_by(Category.id).all()

@app.get(
    "/categories/{category_id}/questions",
    response_model=list[QuestionOut]
)
def get_questions(category_id: int, db: Session = Depends(get_db)):
    category = db.get(Category, category_id)

    if category is None:
        raise HTTPException(status_code=404, detail="Catégorie introuvable")

    questions = list(category.questions)

    if len(questions) < 10:
        raise HTTPException(
            status_code=500,
            detail="Cette catégorie contient moins de 10 questions"
        )

    selected_questions = random.sample(questions, 10)
    return [make_question(question) for question in selected_questions]

@app.get("/questions/{question_id}", response_model=QuestionOut)
def get_question(question_id: int, db: Session = Depends(get_db)):
    question = db.get(Question, question_id)

    if question is None:
        raise HTTPException(status_code=404, detail="Question introuvable")

    return make_question(question)

@app.post("/answers/check", response_model=AnswerCheckOut)
def check_answer(data: AnswerCheckIn, db: Session = Depends(get_db)):
    question = db.get(Question, data.question_id)

    if question is None:
        raise HTTPException(status_code=404, detail="Question introuvable")

    answer = db.get(Answer, data.answer_id)

    if answer is None or answer.question_id != data.question_id:
        raise HTTPException(
            status_code=404,
            detail="Réponse introuvable pour cette question"
        )

    correct_answer = next(
        (a for a in question.answers if a.is_correct),
        None
    )

    if correct_answer is None:
        raise HTTPException(
            status_code=500,
            detail="Aucune bonne réponse configurée"
        )

    return AnswerCheckOut(
        correct=answer.is_correct,
        correct_answer_id=correct_answer.id
    )
