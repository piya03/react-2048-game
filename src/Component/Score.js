import React from "react";
import styles from "./style.module.css";

const Score = () => {
  const { scoreBox, score_align, info, heading, score } = styles;
  return (
    <div>
      <div className={`${scoreBox}`}>
        <div className={`${heading}`}>2048</div>
        <div className={`${score_align}`}>
          <div>
            <span>Score</span>
            <span className={`${score}`}>4444</span>
          </div>
          <div>
            <span>Best</span>
            <span className={`${score}`}>43333</span>{" "}
          </div>
        </div>
      </div>
      <div className={`${info}`}> join the number and get to 2048 tile</div>
    </div>
  );
};

export default Score;
