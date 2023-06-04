function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
stopBtn.disabled = true;
let timerId = null

startBtn.addEventListener('click', onChangeBgColorBtn);
stopBtn.addEventListener('click', onStopChangeBgColorBtn);

function onChangeBgColorBtn() {
    timerId = setInterval(() => {
        let currentColor = getRandomHexColor();
        document.body.style.background = currentColor;
    }, 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
}

function onStopChangeBgColorBtn() {
    clearInterval(timerId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
} 

startBtn.style.padding = '10px 15px';
stopBtn.style.padding = '10px 15px';