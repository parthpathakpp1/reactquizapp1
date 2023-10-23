import React from 'react';

function QuizResult(props) {
  return (
    <div className='result-container'>
      <div className='show-score'>
        Your Score: {props.score} / {props.totalScore}
      </div>
      <button className="try-again-button" onClick={props.tryAgain}>
        Try Again
      </button>
    </div>
  );
}

export default QuizResult;
