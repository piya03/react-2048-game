import React, { useState } from "react";
import styles from "./style.module.css";
import { WIN_SCORE, GAME_MODES } from "../const";

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

  return (
    <div>
      <div className={`${scoreBox}`}>
        <div className={`${heading}`}>{WIN_SCORE}</div>

        <div className={`${scoreContainer}`}>
          <div className={`${score_align}`}>
            <div>
              <span>Score</span>
              <span className={`${score}`}>
                {replayData?.scores ||
                  getBestScoreAndScore?.scores ||
                  currentScore ||
                  0}
              </span>
            </div>
            <div>
              <span>Best</span>
              <span className={`${score}`}>
                {getBestScoreAndScore?.bestScore}
              </span>{" "}
            </div>
          </div>
          <div
            style={{
              cursor: mode == GAME_MODES?.play ? "pointer" : "not-allowed",
            }}
            onClick={() => {
              if (mode === GAME_MODES?.play) {
                setShowModal(true);
              }
            }}
            className={`${reset}`}
          >
            Reset
          </div>
        </div>
      </div>
      <div className={`${info}`}> Join the number and get to 2048 tile</div>
    </div>
  );
};

export default Score;
