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

  let getInfoFromLocal = JSON.parse(localStorage.getItem("info")) || {
    bestScore: 0,
    position: [],
    moves: 0,
    scores: 0,
  };
  console.log(
    "🚀 ~ file: Board.js ~ line 51 ~ Board ~ getInfoFromLocal",
    getInfoFromLocal
  );
  console.log(
    "🚀getInfoFromLocal.positiongetInfoFromLocal.position",
    getInfoFromLocal.position
  );

  const [data, setData] = useState(() => {
    return (
      getInfoFromLocal?.position || [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ]
    );
  });

  const [undoedState, setundoedState] = useState(null);
  console.log("🚀 ~uuuuuuuuuuuuuuuundo", undoedState);
  console.log("dddddddddddata", data);

  const [history, setHistory] = useState([]);
  console.log("🚀 hhhhhhhhhhhistory", history);
  const [isDataFromLocal, setIsDataFromLocal] = useState(
    getInfoFromLocal?.position || false
  );
  console.log(
    "🚀 ~ file: Board.js ~ line 59 ~ Board ~ isDataFromLocal",
    isDataFromLocal
  );
  const [gameOver, setGameOver] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [play, setPlay] = useState(false);

  function setLocalStorage() {
    let lastHistoryData = history.length - 1;
    localStorage.setItem(
      "info",
      JSON.stringify({
        bestScore:
          history[lastHistoryData]?.scores > getInfoFromLocal?.bestScore
            ? history[lastHistoryData]?.scores
            : getInfoFromLocal?.bestScore,

        position: history[lastHistoryData]?.position,
        moves: history[lastHistoryData]?.moves,
        scores: history[lastHistoryData]?.scores,
      })
    );
  }

  const UP_ARROW = 38;
  const DOWN_ARROW = 40;
  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;

  function initializeFun() {
    let copyData =
      getInfoFromLocal?.position ||
      _.cloneDeep([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ]);
    addTwoOrFourNum(copyData);
    addTwoOrFourNum(copyData);
    setData(copyData);
    setHistory((prev) => [
      {
        position: [...copyData],
        moves: getInfoFromLocal?.moves || 0,
        scores: getInfoFromLocal?.scores || 0,
      },
    ]);
  }

  function handleKeyDown(e) {
    switch (e.keyCode) {
      case UP_ARROW:
        swipeUpFun({
          data,
          setData,
          setHistory,
          setundoedState,
        });
        break;
      case DOWN_ARROW:
        swipeDownFun({
          data,
          setData,
          setHistory,

          setundoedState,
        });
        break;
      case LEFT_ARROW:
        swipeLeftFun({
          data,
          setData,
          setHistory,

          setundoedState,
        });
        break;
      case RIGHT_ARROW:
        swipeRightFun({
          data,
          setData,
          setHistory,

          setundoedState,
        });
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
    if (historyLen > 1 && !undoedState) {
      const undoedElem = history[historyLen - 1];

      setundoedState(undoedElem);
      const newHistory = _.cloneDeep(history);

      newHistory.splice(historyLen - 1);

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
    const newHistory = _.cloneDeep(history);
    // for (let i = 0; i < history.length; i++) {
    //   setTimeout(() => {
    //     console.log(i, "let see reply");
    //   }, 2000);
    // }

    for (let i = 1; i < history.length; i++) {
      function callReplay(x) {
        setTimeout(() => {
          setData([...newHistory[newHistory.length - 1].position]);

          setData(history[i - 1]?.position);

          // setHistory((prev) => {
          //   return [
          //     {
          //       position: history[i - 1]?.position,
          //       moves: prev[i - 1]?.moves,
          //       scores: prev[i - 1]?.scores,
          //     },
          //   ];
          // });

          console.log(x, "let s ee reply");
        }, x * 2000);
      }
      callReplay(i);
    }
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
    setHistory([
      {
        position: [...emptyData],
        moves: getInfoFromLocal?.moves || 0,
        scores: getInfoFromLocal?.scores || 0,
      },
    ]);
    setundoedState(null);

    let lastHistoryData = history.length - 1;
    localStorage.setItem(
      "info",
      JSON.stringify({
        bestScore:
          history[lastHistoryData]?.scores > getInfoFromLocal?.bestScore
            ? history[lastHistoryData]?.scores
            : getInfoFromLocal?.bestScore,

        position: 0,
        moves: 0,
        scores: 0,
      })
    );
  }

  useEffect(() => {
    initializeFun();
  }, []);

  useEffect(() => {
    setLocalStorage();
  }, [history]);

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
