from pydantic import BaseModel

class CategoryOut(BaseModel):
    id: int
    name: str

    model_config = {"from_attributes": True}

class AnswerOut(BaseModel):
    id: int
    text: str

class QuestionOut(BaseModel):
    id: int
    text: str
    answers: list[AnswerOut]

class AnswerCheckIn(BaseModel):
    question_id: int
    answer_id: int

class AnswerCheckOut(BaseModel):
    correct: bool
    correct_answer_id: int
