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

  const [mode, setMode] = useState("play"); // replay or play
  console.log("🚀 ~ file: Board.js ~ line 223 ~ Board ~ mode", mode);

  const [replayData, setReplayData] = useState(null);
  console.log(
    "🚀 ~ file: Board.js ~ line 226 ~ Board ~ replayData",
    replayData
  );

  const [timerId, setTimerId] = useState(null);
  // [1,2,3]
  function setLocalStorageFun() {
    let lastHistoryDataIndex = history.length - 1;
    localStorage.setItem(
      "info",
      JSON.stringify({
        bestScore:
          history[lastHistoryDataIndex]?.scores > getInfoFromLocal?.bestScore
            ? history[lastHistoryDataIndex]?.scores
            : getInfoFromLocal?.bestScore,

        position: history[lastHistoryDataIndex]?.position,
        scores: history[lastHistoryDataIndex]?.scores,
        moves: history[lastHistoryDataIndex]?.moves,
      })
    );
  }

  const UP_ARROW = 38;
  const DOWN_ARROW = 40;
  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;

  function initializeFun() {
    let copyData = getInfoFromLocal?.position;

    if (!copyData || !copyData?.length) {
      copyData = _.cloneDeep([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ]);
    }

    if (
      getInfoFromLocal?.position?.length === 0 ||
      !getInfoFromLocal?.position
    ) {
      addTwoOrFourNum(copyData);
      addTwoOrFourNum(copyData);
    }

    setData(copyData);

    setHistory([
      {
        position: [...copyData],
        moves: getInfoFromLocal?.moves || 0,
        scores: getInfoFromLocal?.scores || 0,
      },
    ]);
  }

  function handleKeyDown(e) {
    if (mode === "replay") return;
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
    if (mode === "play" && historyLen > 1 && !undoedState) {
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

    if (mode === "play" && historyLen >= 1 && undoedState) {
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

  function startReplay(index, history) {
    // setReplayData(history[index].position);

    setReplayData({
      position: history[index].position,
      moves: history[index].moves,
      scores: history[index].scores,
    });
    if (index === history.length - 1) {
      setMode("play");
      return;
    }

    const timerNew = setTimeout(() => {
      startReplay(index + 1, history);
    }, 2000);
    setTimerId(timerNew);
  }

  function replayFun(index = 0) {
    setMode("replay");
    startReplay(index, history);
  }

  function resetGameFun() {
    setShowModal(false);
    setGameOver(false);
    setReplayData(null);
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
        moves: 0,
        scores: 0,
      },
    ]);
    setundoedState(null);

    let lastHistoryDataIndex = history.length - 1;
    localStorage.setItem(
      "info",
      JSON.stringify({
        bestScore:
          history[lastHistoryDataIndex]?.scores > getInfoFromLocal?.bestScore
            ? history[lastHistoryDataIndex]?.scores
            : getInfoFromLocal?.bestScore,

        position: [],
        moves: 0,
        scores: 0,
      })
    );
  }

  useEffect(() => {
    return () => {
      clearTimeout(timerId);
    };
  }, [timerId]);

  useEffect(() => {
    initializeFun();
  }, []);

  useEffect(() => {
    console.log("okkkkkkkkkkkkkkkkkkkk");
    setLocalStorageFun();
  }, [history]);

  useEvent("keydown", handleKeyDown);

  function finalDataFun() {
    if (mode === "replay") {
      return replayData?.position;
    }
    return data;
  }
  const finalDataToRender = React.useMemo(
    () => finalDataFun(),
    [mode, data, replayData]
  );
  console.log(
    "🚀 ~ file: Board.js ~ line 308 ~ Board ~ finalDataToRender",
    finalDataToRender
  );

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
          <Score
            history={history}
            setShowModal={setShowModal}
            replayData={replayData}
            mode={mode}
          />
          <div className={`${bgColor}`}>
            {finalDataToRender &&
              finalDataToRender?.map((eachRow, index) => {
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
        <div>
          moves{" "}
          {mode === "replay"
            ? replayData?.moves
            : history[history?.length - 1]?.moves}
        </div>
        <ActionBtn
          undoFun={undoFun}
          redoFun={redoFun}
          replayFun={replayFun}
          history={history}
          isActiveUndo={history.length > 1 && !undoedState}
          isActiveRedo={undoedState}
          mode={mode}
        />
      </div>
    </>
  );
};

export default Board;
