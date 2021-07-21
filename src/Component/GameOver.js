import React from "react";
import Modal from "./Modal";
import styles from "./style.module.css";

const GameOver = ({
  showGameOverModal,
  setShowGameOverModal,
  resetGameFun,
}) => {
  const { tryAgainBtn } = styles;
  const getInfoFromLocal = JSON.parse(localStorage.getItem("info")) || {
    bestScore: 0,
    position: [],
    history: [],
    moves: 0,
    scores: 0,
  };

  return (
    <div>
      <Modal
        show={showGameOverModal}
        setShow={setShowGameOverModal}
        title="Game Over"
      >
        <div>
          {`You earned ${getInfoFromLocal?.scores} points with
          ${getInfoFromLocal?.moves} moves.`}
        </div>
        <div className={`${tryAgainBtn}`}>
          <button
            onClick={() => {
              setShowGameOverModal(false);
              resetGameFun();
            }}
          >
            Play Again
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default GameOver;
