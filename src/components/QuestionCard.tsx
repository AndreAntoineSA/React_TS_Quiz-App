import React from 'react'
import { AnswerObject } from '../App';
type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({ question, answers, callback, userAnswer, questionNr, totalQuestions }) =>
(<div className="flex flex-col items-center">
    <p className="italic text-sm">Question: {questionNr}/{totalQuestions}</p>
    <p className="mt-5 bold text-lg" dangerouslySetInnerHTML={{ __html: question }} />
    <div className="mt-5 grid grid-flow-col grid-cols-2 grid-rows-2 gap-4">
        {answers.map(answer => (<div key={answer}>
            <button className="text-md border m-1 p-2 w-full bg-white hover:bg-gray-100 focus:outline-none rounded" disabled={!!userAnswer} value={answer} onClick={callback}><span dangerouslySetInnerHTML={{ __html: answer }} /></button>
        </div>))}
    </div>
</div>)


export default QuestionCard
