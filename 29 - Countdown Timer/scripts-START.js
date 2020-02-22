
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
let countdown = null;

const buttons = document.querySelectorAll('[data-time]');
buttons.forEach(button => button.addEventListener('click', startTimer));
function startTimer(e) {
  const seconds = parseInt(e.target.dataset.time);
  timer(seconds);
}

const customForm = document.getElementById('custom');
customForm.addEventListener('submit', handleSubmit);
function handleSubmit(e) {
  e.preventDefault();
  const sixtySeconds = 60;
  const totalSeconds = (e.target.minutes.value) * sixtySeconds;
  timer(totalSeconds);
  e.target.reset();
}
function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 16);
}
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}
function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  // const adjustedHour = hour > 12 ? hour - 12 : hour;
  endTime.textContent = `Be Back At ${hour < 10 ? '0' : ''}${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}
