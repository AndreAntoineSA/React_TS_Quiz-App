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
    <div className="container-flex bg-gray-50 h-screen mx-auto">
      <div className="flex flex-col items-center">

        <h6 className="text-4xl text-blue-500 m-5">React Quiz</h6>
        {quizOver || userAnswers.length === TOTAL_QUESTIONS ? <button className="border focus:outline-none p-2 px-4 bg-white rounded m-5" onClick={startQuiz}>Start</button>
          : ''}
        {!quizOver && <p className="text-blue-800 text-lg">Score&nbsp;:&nbsp;{score}</p>}
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
        {!quizOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (<button className="mt-10 border p-2 px-4 focus:outline-none rounded bg-blue-100" onClick={nextQuestion}>Next Question</button>
        ) : ''}
      </div>

    </div>
  );
}
// https://opentdb.com/api.php?amount=10&difficulty=hard&type=multiple
export default App;
