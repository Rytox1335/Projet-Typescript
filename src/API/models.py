from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)

    questions = relationship(
        "Question",
        back_populates="category",
        cascade="all, delete-orphan"
    )

class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)

    category = relationship("Category", back_populates="questions")
    answers = relationship(
        "Answer",
        back_populates="question",
        cascade="all, delete-orphan"
    )

class Answer(Base):
    __tablename__ = "answers"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, nullable=False)
    is_correct = Column(Boolean, default=False, nullable=False)
    question_id = Column(Integer, ForeignKey("questions.id"), nullable=False)

    question = relationship("Question", back_populates="answers")
