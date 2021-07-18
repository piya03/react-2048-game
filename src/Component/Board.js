import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import * as _ from "lodash";
import Block from "./Block";
import Score from "./Score";
import ActionBtn from "./ActionBtn";
import { useEvent } from "../Hooks/useEvent";
import {
  addTwoOrFourNum,
  swipeLeftFun,
  swipeRightFun,
  swipeDownFun,
  swipeUpFun,
} from "../utils/utils";
const Board = () => {
  const { container, blockContainer, innerContainer, bgColor } = styles;
  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  const [gameOver, setGameOver] = useState(false);

  const [move, setMove] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  let getBestScoreFromLocal = JSON.parse(localStorage.getItem("info")) || "";

  function setLocalStorage(currentScore) {
    localStorage.setItem(
      "info",
      JSON.stringify({
        bestScore:
          currentScore > getBestScoreFromLocal?.bestScore
            ? currentScore
            : getBestScoreFromLocal?.bestScore,
      })
    );
  }

  const UP_ARROW = 38;
  const DOWN_ARROW = 40;
  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;

  function initializeFun() {
    let copyData = _.cloneDeep(data);
    addTwoOrFourNum(copyData);
    addTwoOrFourNum(copyData);
    setData(copyData);
  }

  function handleKeyDown(e) {
    switch (e.keyCode) {
      case UP_ARROW:
        console.log("up", data);
        swipeUpFun({ data, setData, setCurrentScore, setMove });
        break;
      case DOWN_ARROW:
        console.log("down", data);
        swipeDownFun({ data, setData, setCurrentScore, setMove });
        break;
      case LEFT_ARROW:
        console.log("left", data);
        swipeLeftFun({ data, setData, setCurrentScore, setMove });
        break;
      case RIGHT_ARROW:
        console.log("rigth", data);
        swipeRightFun({ data, setData, setCurrentScore, setMove });
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    initializeFun();
  }, []);

  useEffect(() => {
    setLocalStorage(currentScore);
  }, [currentScore]);

  useEvent("keydown", handleKeyDown);

  return (
    <div className={`${container}`}>
      <div className={`${innerContainer}`}>
        <Score currentScore={currentScore} />
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
