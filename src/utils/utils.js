import * as _ from "lodash";

//add random 2 or 4
export function addTwoOrFourNum(newGrid) {
  let added = false;
  let gridFull = false;
  while (!added) {
    if (gridFull) {
      break;
    }

    let randomNum1 = Math.floor(Math.random() * 4);
    let randomNum2 = Math.floor(Math.random() * 4);

    if (newGrid[randomNum1][randomNum2] === 0) {
      newGrid[randomNum1][randomNum2] = Math.random() > 0.5 ? 2 : 4;
      added = true;
    }
  }
}
/////swipeLeft fun
export function swipeLeftFun({
  data,
  setData,
  IsGridFull = false,
  setCurrentScore,
  setMove,
}) {
  console.log("left");
  let oldGrid = data;
  let newArray = _.cloneDeep(data);
  let score = 0;
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
      //  setMove((prev) => prev + 1);
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
          score += elem[slow];
          //setCurrentScore((prev) => prev + elem[slow]);
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
  setCurrentScore((prev) => prev + score);

  if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
    addTwoOrFourNum(newArray);
  }
  if (IsGridFull) {
    return newArray;
  } else {
    setData(newArray);
  }
}

//swipe right
export function swipeRightFun({
  data,
  setData,
  IsGridFull = false,
  setCurrentScore,
  setMove,
}) {
  console.log("right");
  let oldData = data;
  let newArray = _.cloneDeep(data);

  let score = 0;
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
      // setMove((prev) => prev + 1);
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
          score += elem[slow];
          //setCurrentScore((prev) => prev + elem[slow]);

          elem[fast] = 0;
          fast = slow - 1;
        } else {
          slow--;
          fast = slow - 1;
        }
      }
    }
  }
  setCurrentScore((prev) => prev + score);

  if (JSON.stringify(newArray) !== JSON.stringify(oldData)) {
    addTwoOrFourNum(newArray);
  }

  if (IsGridFull) {
    return newArray;
  } else {
    setData(newArray);
  }
}

///swipe Down

export function swipeDownFun({
  data,
  setData,
  IsGridFull = false,
  setCurrentScore,
  setMove,
}) {
  console.log("downdddddddddd");
  let oldData = data;
  let newArray = _.cloneDeep(data);
  let score = 0;
  for (let i = 3; i >= 0; i--) {
    let slow = newArray.length - 1;
    let fast = slow - 1;
    while (slow > 0) {
      if (fast === -1) {
        fast = slow - 1;
        slow--;
        continue;
      }
      //setMove((prev) => prev + 1);
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
          score += newArray[slow][i];
          // setCurrentScore((prev) => prev + newArray[slow][i]);

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
  setCurrentScore((prev) => prev + score);

  if (JSON.stringify(oldData) !== JSON.stringify(newArray)) {
    addTwoOrFourNum(newArray);
  }
  if (IsGridFull) {
    return newArray;
  } else {
    setData(newArray);
  }
}

///swipe up

export function swipeUpFun({
  data,
  setData,
  IsGridFull = false,
  setCurrentScore,
  setMove,
}) {
  console.log("upppp");
  let oldData = data;
  let newArray = _.cloneDeep(data);
  let score = 0;

  for (let i = 0; i < 4; i++) {
    let slow = 0;
    let fast = 1;
    while (slow < 4) {
      if (fast === 4) {
        fast = slow + 1;
        slow++;
        continue;
      }
      //   setMove((prev) => prev + 1);
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
          score += newArray[slow][i];
          // setCurrentScore((prev) => prev + newArray[slow][i]);

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
  setCurrentScore((prev) => prev + score);

  if (JSON.stringify(oldData) !== JSON.stringify(newArray)) {
    addTwoOrFourNum(newArray);
  }
  if (IsGridFull) {
    return newArray;
  } else {
    setData(newArray);
  }
}

//color fun

export function getColorFun(num) {
  switch (num) {
    case 2:
      return "#EBDCD0";
    case 4:
      return "#E9DBBA";
    case 8:
      return "#E9A067";
    case 16:
      return "#F08151";
    case 32:
      return "#F2654F";
    case 64:
      return "#F1462C";
    case 128:
      return "#E7C65E";
    case 256:
      return "#E8C350";
    case 512:
      return "#E8BE40";
    case 1024:
      return "#E8BB31";
    case 2048:
      return "#E7B723";
    default:
      return "#C2B3A3";
  }
}

//check game over fun
