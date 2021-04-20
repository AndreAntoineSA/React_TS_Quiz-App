import React, { useState } from 'react';
import QuestionCard from '../src/components/QuestionCard'
import { fetchQuizQuestions, QuestionState } from './API'
import { Difficulty } from './API'

export type AnswerObject = {
  question: string,
  answer: string,
  correct: boolean,
  correctAnswer: string
}
const TOTAL_QUESTIONS = 10

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0)
  const [quizOver, setQuizOver] = useState(true)

  const startQuiz = async () => {
    setLoading(true)
    setQuizOver(false)

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)
    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)


  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!quizOver) {
      const answer = e.currentTarget.value; // user answer
      const correct = questions[number].correct_answer === answer; // validate answer
      // add's score if correct
      if (correct) {
        setScore(prev => prev + 1)
      }
      // save answer's
      const answerObject = {
        question: questions[number].question,
        answer, correct, correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }
  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setQuizOver(true)
    } else {
      setNumber(nextQuestion)
    }

  }
  
  return (
    <div className="App">
      <h1>React Quiz</h1>
      { quizOver || userAnswers.length === TOTAL_QUESTIONS ? <button onClick={startQuiz}>Start</button>
        : ''}
      {!quizOver && <p>Score:{score}</p>}
      {loading && <p>loading questions..</p>}
      {!loading && !quizOver && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!quizOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (<button onClick={nextQuestion}>NextQuestion</button>
      ) : ''}
    </div>
  );
}
// https://opentdb.com/api.php?amount=10&difficulty=hard&type=multiple
export default App;
