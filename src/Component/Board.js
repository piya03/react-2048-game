import React, { useState } from "react";
import styles from "./style.module.css";
import Block from "./Block";
import Score from "./Score";
import ActionBtn from "./ActionBtn";
const Board = () => {
  const { container, blockContainer, innerContainer, bgColor } = styles;
  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  return (
    <div className={`${container}`}>
      <div className={`${innerContainer}`}>
        <Score />
        <div className={`${bgColor}`}>
          {data &&
            data?.map((eachRow, index) => {
              return (
                <div key={index} className={`${blockContainer}`}>
                  {eachRow?.map((digit, index) => {
                    return <Block key={index} digit={digit} />;
                  })}
                </div>
              );
            })}{" "}
        </div>
      </div>
      <ActionBtn />
    </div>
  );
};

export default Board;
