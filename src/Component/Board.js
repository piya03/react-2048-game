import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import * as _ from "lodash";
import Block from "./Block";
import Score from "./Score";
import ActionBtn from "./ActionBtn";
import Modal from "./Modal";
import { useEvent } from "../Hooks/useEvent";
import {
  addTwoOrFourNum,
  swipeLeftFun,
  swipeRightFun,
  swipeDownFun,
  swipeUpFun,
} from "../utils/utils";

const Board = () => {
  const {
    container,
    blockContainer,
    innerContainer,
    bgColor,
    modalYesNoContainer,
  } = styles;
  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  const [undoedState, setundoedState] = useState(null);
  console.log("🚀 ~uuuuuuuuuuuuuuuundo", undoedState);
  console.log("dddddddddddata", data);

  const [history, setHistory] = useState([]);
  console.log("🚀 hhhhhhhhhhhistory", history);

  const [gameOver, setGameOver] = useState(false);

  const [move, setMove] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  console.log(
    "🚀 ~ file: Board.js ~ line 45 ~ Board ~ activeIndex",
    activeIndex
  );

  const [play, setPlay] = useState(false);
  console.log("🚀 ~ file: Board.js ~ line 51 ~ Board ~ play", play);

  let getBestScoreFromLocal = JSON.parse(localStorage.getItem("info")) || {
    bestScore: 0,
  };
  console.log(
    "🚀 ~ file: Board.js ~ line 51 ~ Board ~ getBestScoreFromLocal",
    getBestScoreFromLocal
  );

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
    let copyData = _.cloneDeep([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    addTwoOrFourNum(copyData);
    addTwoOrFourNum(copyData);
    setData(copyData);
    // setHistory((prev) => [...prev, [...copyData]]);
    setHistory((prev) => [
      {
        position: [...copyData],
        moves: 0,
        scores: 0,
      },
    ]);
    setMove(0);
  }

  function handleKeyDown(e) {
    switch (e.keyCode) {
      case UP_ARROW:
        swipeUpFun({ data, setData, setHistory, setCurrentScore, setMove });
        break;
      case DOWN_ARROW:
        swipeDownFun({ data, setData, setHistory, setCurrentScore, setMove });
        break;
      case LEFT_ARROW:
        swipeLeftFun({ data, setData, setHistory, setCurrentScore, setMove });
        break;
      case RIGHT_ARROW:
        swipeRightFun({ data, setData, setHistory, setCurrentScore, setMove });
        break;
      default:
        break;
    }
  }

  function checkGameOver(data) {
    // check if all the cells are filled afte the update
  }
  ///function undoFun

  function undoFun() {
    let historyLen = history.length;

    if (historyLen === 1) return;
    // if (activeIndex === -1 && historyLen > 1) {
    if (historyLen > 1 && !undoedState) {
      const undoedElem = history[historyLen - 1];

      setundoedState(undoedElem);
      const newHistory = _.cloneDeep(history);

      //  const newHistory = [...history];
      newHistory.splice(historyLen - 1);

      // setHistory(newHistory);

      setHistory(newHistory);

      setData([...newHistory[newHistory.length - 1].position]);
    }
  }

  function redoFun() {
    let historyLen = history.length;

    if (historyLen >= 1 && undoedState) {
      let copyHistory = _.cloneDeep(history);

      const newHistory = [
        ...copyHistory,
        {
          position: undoedState?.position,
          moves: undoedState?.moves,
          scores: undoedState?.scores,
        },
      ];

      // const newHistory = [...history.position, undoedState];

      //setHistory(newHistory);

      setHistory(newHistory);

      setData([...newHistory[newHistory.length - 1].position]);
      setundoedState(null);
      // setActiveIndex(-1);
    }
  }

  function replayFun(params) {
    console.log("replay");
    // setInterval(() => {
    //   handleKeyDown();
    // }, 2000);
  }

  function resetGameFun() {
    setShowModal(false);
    setGameOver(false);
    const emptyData = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    addTwoOrFourNum(emptyData);
    addTwoOrFourNum(emptyData);
    setData(emptyData);
    setMove(0);
    setHistory([]);
    setundoedState([]);
    setCurrentScore(0);
  }

  useEffect(() => {
    initializeFun();
  }, []);

  useEffect(() => {
    console.log("currentScore", currentScore);
    setLocalStorage(currentScore);
  }, [currentScore]);

  useEvent("keydown", handleKeyDown);

  return (
    <>
      {showModal && (
        <Modal show={showModal} setShow={setShowModal} title="New Game">
          <div>Are you sure you want to start a new game? </div>
          <div className={`${modalYesNoContainer}`}>
            <span onClick={() => setShowModal(false)}>NO</span>
            <span
              onClick={() => {
                resetGameFun();
              }}
            >
              YES
            </span>
          </div>
        </Modal>
      )}
      <div className={`${container}`}>
        <div className={`${innerContainer}`}>
          <Score history={history} setShowModal={setShowModal} />
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
        <div>moves {history[history?.length - 1]?.moves}</div>
        <ActionBtn
          undoFun={undoFun}
          redoFun={redoFun}
          replayFun={replayFun}
          history={history}
          isActiveUndo={history.length > 1 && !undoedState}
          isActiveRedo={undoedState}
          play={play}
          setPlay={setPlay}
        />
      </div>
    </>
  );
};

export default Board;
