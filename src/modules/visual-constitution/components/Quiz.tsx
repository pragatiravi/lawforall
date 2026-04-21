import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import quizData from '../data/quiz.json';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export default function Quiz({ theme }: { theme: 'light' | 'dark' }) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = quizData[currentQuestionIdx] as Question;

  const handleAnswerSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);

    if (option === currentQuestion.answer) {
      setScore(prev => prev + 10);
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);

    if (currentQuestionIdx < quizData.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className={`p-8 rounded-3xl border ${
      theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl'
    } max-w-3xl mx-auto space-y-8`}>
      <h3 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} text-center`}>
         Constitutional Mini Quiz
      </h3>

      {!isFinished ? (
         <div className="space-y-6">
            <div className="flex justify-between items-center text-sm font-bold text-indigo-400">
               <span>Question {currentQuestionIdx + 1} of {quizData.length}</span>
               <span>Score: {score}</span>
            </div>

            <p className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
               {currentQuestion.question}
            </p>

            <div className="grid grid-cols-1 gap-3">
               {currentQuestion.options.map((option, index) => {
                  let buttonClass = theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800';

                  if (isAnswered) {
                     if (option === currentQuestion.answer) {
                        buttonClass = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400';
                     } else if (option === selectedAnswer) {
                        buttonClass = 'bg-red-500/20 border-red-500/50 text-red-400';
                     }
                  }

                  return (
                     <button 
                        key={index}
                        disabled={isAnswered}
                        onClick={() => handleAnswerSelect(option)}
                        className={`p-4 rounded-xl border text-left font-medium transition-all ${buttonClass}`}
                     >
                        {option}
                     </button>
                  );
               })}
            </div>

            <AnimatePresence>
               {isAnswered && (
                  <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     className={`p-4 rounded-xl text-sm ${
                        selectedAnswer === currentQuestion.answer 
                           ? 'bg-emerald-500/10 text-emerald-400' 
                           : 'bg-red-500/10 text-red-400'
                     }`}
                  >
                     <p className="font-bold mb-1">{selectedAnswer === currentQuestion.answer ? "Correct!" : "Incorrect Answer."}</p>
                     <p className={theme === 'dark' ? 'text-white/80' : 'text-slate-700'}>{currentQuestion.explanation}</p>
                     
                     <div className="text-right mt-4">
                        <button 
                           onClick={handleNext}
                           className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg font-bold text-xs"
                        >
                           {currentQuestionIdx === quizData.length - 1 ? "Finish" : "Next Question"}
                        </button>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      ) : (
         <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-6 py-12"
         >
            <p className="text-5xl font-black text-indigo-400">{score} / {quizData.length * 10}</p>
            <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Quiz Completed!</p>
            <p className={theme === 'dark' ? 'text-indigo-200/50' : 'text-slate-500'}>You answered correctly to the questions setup.</p>
            <button 
               onClick={resetQuiz}
               className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold"
            >
               Try Again
            </button>
         </motion.div>
      )}
    </div>
  );
}
