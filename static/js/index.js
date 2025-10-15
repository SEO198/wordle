const answer = "LEMON";

let attempt = 0;
let index = 0;
let timer = 0;

function appStart() {
  const displayGameOver = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display: flex; justify-content: center; align-items: center; color: white;position: absolute; top: 33vh; left: 50%; transform: translateX(-50%); background-color: black";
    document.body.appendChild(div);
  };

  const gameOver = () => {
    window.removeEventListener("keydown", handlKeydown);
    displayGameOver();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempt === 6) return gameOver();
    attempt += 1;
    index = 0;
  };

  const handleEnterKey = () => {
    let correctAnswers = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempt}${i}']`
      );

      const input_text = block.innerText;
      const answer_text = answer[i];

      if (input_text === answer_text) {
        correctAnswers += 1;
        block.style.background = "#6AAA64";
      } else if (answer.includes(input_text))
        block.style.background = "#C9B458";
      else block.style.background = "#787c7e";
    }

    if (correctAnswers === 5) gameOver();
    else nextLine();
  };

  const handleBackspace = (blockToClear) => {
    // 인자로 전달받은 블록의 내용만 지움
    if (blockToClear) {
      blockToClear.innerText = "";
    }
  };

  const handlKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;

    // A. Backspace 처리 (먼저 처리)
    if (event.key === "Backspace") {
      if (index > 0) {
        index -= 1; // 1. 인덱스를 지워야 할 칸으로 먼저 이동

        // 2. 줄어든 index를 이용해 '지워야 할 블록'을 새로 찾음
        const blockToClear = document.querySelector(
          `.board-column[data-index='${attempt}${index}']`
        );

        // 3. 찾은 블록을 handleBackspace 함수에 인자로 전달함
        handleBackspace(blockToClear);
      }
      return;
    }

    // B. Enter 처리
    else if (index === 5 && event.key === "Enter") {
      handleEnterKey();
      return;
    }

    // C. 문자 입력 처리
    if (index < 5 && 65 <= keyCode && keyCode <= 90) {
      // 1. 현재 index는 '글자가 입력될 빈 칸'을 가리킴
      const thisBlock = document.querySelector(
        `.board-column[data-index='${attempt}${index}']`
      );

      thisBlock.innerText = key;
      index += 1; // 2. 다음 칸을 위해 index를 증가시킴
    }
  };

  const startTimer = () => {
    const startTime = new Date();

    function setTime() {
      const currentTime = new Date();
      const elapsedTime = new Date(currentTime - startTime);
      const minute = elapsedTime.getMinutes().toString().padStart(2, "0");
      const second = elapsedTime.getSeconds().toString().padStart(2, "0");
      const timestamp = document.querySelector(".timer");
      timestamp.innerText = `${minute}:${second}`;
    }

    // 주기성
    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handlKeydown);
}

appStart();
