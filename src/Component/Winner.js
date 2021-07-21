import React from "react";
import Modal from "./Modal";
import styles from "./style.module.css";
import congrats from "../Image/congrats.jpeg";
import { WIN_SCORE } from "../const";

const Winner = ({ winnerModal, setShowWinnerModal, resetGameFun }) => {
  const { tryAgainBtn, imgContainer } = styles;
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
        show={winnerModal}
        setShow={setShowWinnerModal}
        title="Won the game"
      >
        <div>
          <div className={`${imgContainer}`}>
            <img src={congrats} alt="CONGRATULATINS" />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "-10px",
          }}
        >
          {" "}
          {`You scored ${WIN_SCORE}  with
          ${getInfoFromLocal?.moves} moves.`}
        </div>
        <div className={`${tryAgainBtn}`}>
          <button
            onClick={() => {
              setShowWinnerModal(false);
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

export default Winner;
