
const FOCUS_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;

let secondsLeft = FOCUS_SECONDS;
let intervalId = null;  
let isFocus = true;     

const timeEl = document.getElementById('time');
const modeEl = document.getElementById('mode');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');


function formatTime(totalSeconds) {
  // TODO
  const minutes = String(Math.floor( totalSeconds / 60)).padStart(2 , '0');
  const seconds = String(totalSeconds % 60 ).padStart(2 , '0');
 
  return  `${minutes}:${seconds}`  ;
}

function render() {
  timeEl.textContent = formatTime(secondsLeft);
  document.title = formatTime(secondsLeft);


}

function tick() {
  secondsLeft--; 
  if(secondsLeft === 0){
    alert('finished');
    isFocus = !isFocus; 
    secondsLeft = isFocus ? FOCUS_SECONDS: BREAK_SECONDS;
    modeEl.textContent = isFocus ? 'Focus':'Break';
  }
  render();

}
function start() {
  if(intervalId){
    return;
  }
    intervalId = setInterval(tick , 1000)
}

function pause() {
  clearInterval(intervalId);
  intervalId = null;

}

function reset() {
  pause();
  isFocus = true;
  modeEl.textContent = 'Focus'
  secondsLeft = FOCUS_SECONDS;
  render();
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);

render();
