import React, { useState } from "react";
import styles from "./style.module.css";

const Score = ({ currentScore, setShowModal }) => {
  const { scoreBox, score_align, info, heading, score, scoreContainer, reset } =
    styles;

  let getBestScoreFromLocal = JSON.parse(localStorage.getItem("info")) || "";

  return (
    <div>
      <div className={`${scoreBox}`}>
        <div className={`${heading}`}>2048</div>

        <div className={`${scoreContainer}`}>
          <div className={`${score_align}`}>
            <div>
              <span>Score</span>
              <span className={`${score}`}>{currentScore}</span>
            </div>
            <div>
              <span>Best</span>
              <span className={`${score}`}>
                {getBestScoreFromLocal?.bestScore}
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
