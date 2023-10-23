import React, { useState, useEffect } from 'react';
import { QuizData } from '../Data/QuizData';
import QuizResult from './QuizResult';
import Modal from './Modal';
import '../App.css';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedOption, setClickedOption] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [time, setTime] = useState(120); // 120 seconds or 2 minutes

  useEffect(() => {
    const timer =
      time > 0 &&
      setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    if (time === 0) {
      clearInterval(timer);
      setShowResult(true);
    }
    return () => clearInterval(timer);
  }, [time]);

  const changeQuestion = () => {
    updateScore();
    if (currentQuestion < QuizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setClickedOption(0);
    } else {
      setShowResult(true);
    }
  };

  const updateScore = () => {
    if (clickedOption === QuizData[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const resetAll = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setClickedOption(0);
    setScore(0);
    setTime(120);
  };

  const startQuiz = () => {
    setShowModal(false);
  };

  const checkAnswer = (optionIndex) => {
    if (clickedOption === 0) return; // If no option is selected, do nothing

    const correctAnswer = QuizData[currentQuestion].answer;
    return optionIndex === correctAnswer ? 'correct' : 'incorrect';
  };

  const progress = ((currentQuestion + 1) / QuizData.length) * 100;

  return (
    <div className="quiz-container">
      {showModal && <Modal closeModal={() => setShowModal(false)} startQuiz={startQuiz} />}
      {!showModal && (
        <div className="container">
          {showResult ? (
            <QuizResult score={score} totalScore={QuizData.length} tryAgain={resetAll} />
          ) : (
            <>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="question">
                <span id="question-number">{currentQuestion + 1}. </span>
                <span id="question-txt">{QuizData[currentQuestion].question}</span>
              </div>
              <div className="option-container">
                {QuizData[currentQuestion].options.map((option, i) => (
                  <button
                    className={`option-btn ${
                      clickedOption === i + 1 ? checkAnswer(i + 1) + ' active' : null
                    }`}
                    key={i}
                    onClick={() => setClickedOption(i + 1)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button className="next-button" onClick={changeQuestion}>
                Next
              </button>
              <div className="timer">Time Left: {Math.floor(time / 60)}:{(time % 60).toLocaleString('en-US', { minimumIntegerDigits: 2 })}</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Quiz;
