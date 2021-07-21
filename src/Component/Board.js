import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import * as _ from "lodash";
import Block from "./Block";
import Score from "./Score";
import ActionBtn from "./ActionBtn";
import Modal from "./Modal";
import GameOver from "./GameOver";
import Winner from "./Winner";

import { useEvent } from "../Hooks/useEvent";
import {
  addTwoOrFourNum,
  swipeLeftFun,
  swipeRightFun,
  swipeDownFun,
  swipeUpFun,
  checkGameOver,
  checkWinningScore,
} from "../utils/utils";

import {
  GAME_MODES,
  UP_ARROW,
  DOWN_ARROW,
  LEFT_ARROW,
  RIGHT_ARROW,
  WIN_SCORE,
  REPLAY_TIME,
} from "../const";

const Board = () => {
  const {
    container,
    blockContainer,
    innerContainer,
    bgColor,
    modalYesNoContainer,
  } = styles;

  const getInfoFromLocal = JSON.parse(localStorage.getItem("info")) || {
    bestScore: 0,
    position: [],
    history: [],
    moves: 0,
    scores: 0,
  };

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
  const [history, setHistory] = useState([]);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [winnerModal, setShowWinnerModal] = useState(false);
  const [mode, setMode] = useState(GAME_MODES.play); // replay or play
  const [replayData, setReplayData] = useState(null);
  const [timerId, setTimerId] = useState(null);
  // [1,2,3]

  //set In local Storage function
  function setLocalStorageFun() {
    const lastHistoryDataIndex = history.length - 1;
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
        history: history,
      })
    );
  }

  //initialize Fun on first mount
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
    setHistory([...getInfoFromLocal?.history]);
  }

  //handle arrow key(up , down, left, right) function
  function handleKeyDown(e) {
    if (mode === GAME_MODES.replay) return;
    if (showGameOverModal) return;

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

  //undo function
  function undoFun() {
    const historyLen = history.length;
    if (historyLen === 1) return;
    if (mode === GAME_MODES.play && historyLen > 1 && !undoedState) {
      const undoedElem = history[historyLen - 1];
      setundoedState(undoedElem);
      const newHistory = _.cloneDeep(history);
      newHistory.splice(historyLen - 1);
      setHistory(newHistory);
      setData([...newHistory[newHistory.length - 1].position]);
    }
  }

  //redo function
  function redoFun() {
    const historyLen = history.length;

    if (mode === GAME_MODES.play && historyLen >= 1 && undoedState) {
      const copyHistory = _.cloneDeep(history);

      const newHistory = [
        ...copyHistory,
        {
          position: undoedState?.position,
          moves: undoedState?.moves,
          scores: undoedState?.scores,
        },
      ];

      setHistory(newHistory);
      setData([...newHistory[newHistory.length - 1].position]);
      setundoedState(null);
    }
  }

  function startReplay(index, history) {
    if (index === history.length - 1) {
      setMode(GAME_MODES.play);
      return;
    }

    setMode(GAME_MODES.replay);
    setReplayData({
      position: history[index].position,
      moves: history[index].moves,
      scores: history[index].scores,
    });

    const timerNew = setTimeout(() => {
      startReplay(index + 1, history);
    }, REPLAY_TIME);
    setTimerId(timerNew);
  }

  ///replay function
  function replayFun(index = 0) {
    if (mode === GAME_MODES.replay) {
      setTimerId(null);
      setMode(GAME_MODES.play);
    } else {
      setMode(GAME_MODES.replay);
      startReplay(index, history);
    }
  }

  //reset Game
  function resetGameFun() {
    setShowModal(false);
    setShowGameOverModal(false);
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

    const lastHistoryDataIndex = history.length - 1;
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

  //useEffect for gameover or winner
  useEffect(() => {
    let checkWinner = checkWinningScore(data, WIN_SCORE);
    if (checkWinner) {
      setShowWinnerModal(true);
    }

    const isGameOver = checkGameOver({ data });
    if (isGameOver) {
      setShowGameOverModal(true);
    }
  }, [data]);

  useEffect(() => {
    return () => {
      clearTimeout(timerId);
    };
  }, [timerId]);

  useEffect(() => {
    initializeFun();
  }, []);

  useEffect(() => {
    if (history.length) {
      setLocalStorageFun();
    }
  }, [history]);

  useEvent("keydown", handleKeyDown);

  function finalDataFun() {
    if (mode === GAME_MODES.replay) {
      return replayData?.position;
    }
    return data;
  }
  const finalDataToRender = React.useMemo(
    () => finalDataFun(),
    [mode, data, replayData]
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
      {showGameOverModal && (
        <GameOver
          showGameOverModal={true}
          setShowGameOverModal={setShowGameOverModal}
          resetGameFun={resetGameFun}
        />
      )}
      {winnerModal && (
        <Winner
          winnerModal={true}
          setShowWinnerModal={setShowWinnerModal}
          resetGameFun={resetGameFun}
        />
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
          {mode === GAME_MODES.replay
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
