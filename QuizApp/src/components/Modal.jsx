import React from 'react';
import '../App.css';

const Modal = ({ closeModal, startQuiz }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
      <h2 className="modal-title">Welcome to the Quiz!</h2>
        <p className="modal-text">Are you ready to start the quiz?</p>
        <button className="start-button" onClick={startQuiz}>
          Start Quiz
        </button>
      </div>
    </div>
  );  
};

export default Modal;
