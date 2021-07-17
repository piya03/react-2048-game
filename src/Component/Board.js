import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import * as _ from "lodash";
import Block from "./Block";
import Score from "./Score";
import ActionBtn from "./ActionBtn";
import { useEvent } from "../Hooks/useEvent";

const Board = () => {
  const { container, blockContainer, innerContainer, bgColor } = styles;
  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  const UP_ARROW = 38;
  const DOWN_ARROW = 40;
  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;

  console.log("🚀 ~ file: Board.js ~ line 9 ~ Board ~ data", data);

  function initializeFun() {
    let copyData = _.cloneDeep(data);
    addTwoOrFourNum(copyData);
    console.log(copyData, "ooooooone");
    addTwoOrFourNum(copyData);
    console.log(copyData, "twoooo");

    setData(copyData);
  }
  function addTwoOrFourNum(newGrid) {
    let added = false;
    let gridFull = false;
    while (!added) {
      if (gridFull) {
        break;
      }

      let randomNum1 = Math.floor(Math.random() * 3);
      let randomNum2 = Math.floor(Math.random() * 3);
      if (newGrid[randomNum1][randomNum2] === 0) {
        newGrid[randomNum1][randomNum2] = Math.random() > 0.5 ? 2 : 4;
        added = true;
      }
    }
  }

  /////swipeLeft fun
  function swipeLeftFun() {
    console.log("left");
    let oldGrid = data;
    console.log(
      "🚀 ~ file: Board.js ~ line 55 ~ swipeLeftFun ~ oldGrid",
      oldGrid
    );
    let newArray = _.cloneDeep(data);

    console.log(
      "🚀 ~ file: Board.js ~ line 57 ~ swipeLeftFun ~ newArray",
      newArray
    );
    for (let i = 0; i < 4; i++) {
      let elem = newArray[i];
      let slow = 0;
      let fast = 1;

      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }

        if (elem[slow] === 0 && elem[fast] === 0) {
          fast++;
        } else if (elem[slow] === 0 && elem[fast] !== 0) {
          elem[slow] = elem[fast];
          elem[fast] = 0;
          fast++;
        } else if (elem[slow] !== 0 && elem[fast] === 0) {
          fast++;
        } else if (elem[slow] !== 0 && elem[fast] !== 0) {
          if (elem[slow] === elem[fast]) {
            elem[slow] += elem[fast];
            elem[fast] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }

    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
      addTwoOrFourNum(newArray);
    }
    setData(newArray);
  }

  //swipe right
  function swipeRightFun() {
    console.log("right");
    let oldData = data;
    let newArray = _.cloneDeep(data);
    for (let i = 3; i >= 0; i--) {
      let elem = newArray[i];
      let slow = elem.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }

        if (elem[slow] === 0 && elem[fast] === 0) {
          fast--;
        } else if (elem[slow] === 0 && elem[fast] !== 0) {
          elem[slow] = elem[fast];
          elem[fast] = 0;
          fast--;
        } else if (elem[slow] !== 0 && elem[fast] === 0) {
          fast--;
        } else if (elem[slow] !== 0 && elem[fast] !== 0) {
          if (elem[slow] === elem[fast]) {
            elem[slow] += elem[fast];
            elem[fast] = 0;
            fast = slow - 1;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }

    if (JSON.stringify(newArray) !== JSON.stringify(oldData)) {
      addTwoOrFourNum(newArray);
    }

    setData(newArray);
  }

  ///swipe Down

  function swipeDownFun() {
    console.log("downdddddddddd");
    let oldData = data;
    let newArray = _.cloneDeep(data);

    for (let i = 3; i >= 0; i--) {
      let slow = newArray.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }

        if (newArray[slow][i] === 0 && newArray[fast][i] === 0) {
          fast--;
        } else if (newArray[slow][i] === 0 && newArray[fast][i] !== 0) {
          newArray[slow][i] = newArray[fast][i];
          newArray[fast][i] = 0;
          fast--;
        } else if (newArray[slow][i] !== 0 && newArray[fast][i] === 0) {
          fast--;
        } else if (newArray[slow][i] !== 0 && newArray[fast][i] !== 0) {
          if (newArray[slow][i] === newArray[fast][i]) {
            newArray[slow][i] += newArray[fast][i];
            newArray[fast][i] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }

    if (JSON.stringify(oldData) !== JSON.stringify(newArray)) {
      addTwoOrFourNum(newArray);
    }
    setData(newArray);
  }

  ///swipe up

  function swipeUpFun() {
    console.log("upppp");
    let oldData = data;
    let newArray = _.cloneDeep(data);
    for (let i = 0; i < 4; i++) {
      let elem = newArray[i];
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }

        if (newArray[slow][i] === 0 && newArray[fast][i] === 0) {
          fast++;
        } else if (newArray[slow][i] === 0 && newArray[fast][i] !== 0) {
          newArray[slow][i] = newArray[fast][i];
          newArray[fast][i] = 0;
          fast++;
        } else if (newArray[slow][i] !== 0 && newArray[fast][i] === 0) {
          fast++;
        } else if (newArray[slow][i] !== 0 && newArray[fast][i] !== 0) {
          if (newArray[slow][i] === newArray[fast][i]) {
            newArray[slow][i] += newArray[fast][i];
            newArray[fast][i] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }

    if (JSON.stringify(oldData) !== JSON.stringify(newArray)) {
      addTwoOrFourNum(newArray);
    }
    setData(newArray);
  }

  //handleKey down
  function handleKeyDown(e) {
    console.log(
      "🚀 ~ file: Board.js ~ line 220 ~ handleKeyDown ~ e",
      e.keyCode
    );
    switch (e.keyCode) {
      case UP_ARROW:
        console.log("up", data);
        swipeUpFun();
        break;
      case DOWN_ARROW:
        console.log("down", data);
        swipeDownFun();
        break;
      case LEFT_ARROW:
        console.log("left", data);
        swipeLeftFun();
        break;
      case RIGHT_ARROW:
        console.log("rigth", data);
        swipeRightFun();
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    initializeFun();
  }, []);

  useEvent("keydown", handleKeyDown);
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
