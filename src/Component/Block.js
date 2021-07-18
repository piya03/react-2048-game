import React from "react";
import styles from "./style.module.css";
import { getColorFun } from "../utils/utils";

const Block = ({ digit }) => {
  const { block } = styles;
  return (
    <div
      style={{
        background: getColorFun(digit),
        color: digit === 2 || digit === 4 ? "#746c61" : "",
      }}
      className={`${block}`}
    >
      {digit !== 0 ? digit : ""}
    </div>
  );
};

export default Block;
