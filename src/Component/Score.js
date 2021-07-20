import React, { useState } from "react";
import styles from "./style.module.css";

const Score = ({ setShowModal, history, replayData, mode }) => {
  const { scoreBox, score_align, info, heading, score, scoreContainer, reset } =
    styles;

  const currentScore = history[history.length - 1]?.scores;

  let getBestScoreAndScore = JSON.parse(localStorage.getItem("info")) || {
    bestScore: 0,
    position: [],
    moves: 0,
    scores: 0,
  };
  console.log(" ~ getBestScoreAndScore", getBestScoreAndScore);

  return (
    <div>
      <div className={`${scoreBox}`}>
        <div className={`${heading}`}>2048</div>

        <div className={`${scoreContainer}`}>
          <div className={`${score_align}`}>
            <div>
              <span>Score</span>
              <span className={`${score}`}>
                {mode === "replay"
                  ? replayData?.scores
                  : getBestScoreAndScore?.scores || currentScore}
              </span>
            </div>
            <div>
              <span>Best</span>
              <span className={`${score}`}>
                {getBestScoreAndScore?.bestScore}
              </span>{" "}
            </div>
          </div>
          <div onClick={() => setShowModal(true)} className={`${reset}`}>
            Reset
          </div>
        </div>
      </div>
      <div className={`${info}`}> Join the number and get to 2048 tile</div>
    </div>
  );
};

export default Score;
