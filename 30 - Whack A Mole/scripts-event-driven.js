
; (function () {

  const holes = document.querySelectorAll('.hole');
  const scoreBoard = document.querySelector('.score');
  const moles = document.querySelectorAll('.mole');
  let lastHole = null, timeUp = true, score = null;

  const button = document.querySelector('button');
  button.addEventListener('click', () => timeUp && startGame());
  function startGame() {
    timeUp = false;
    score = 0;
    scoreBoard.textContent = score;
    peep();
    setTimeout(() => timeUp = true, 10000);
  }
  function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
      hole.classList.remove('up');
      (!timeUp) ? peep() : alert('遊戲時間結束，感謝參與。');
    }, time);
  }

  function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    hole === lastHole && randomHole(holes);
    console.log('Ah nah thats the same one bud');
    lastHole = hole;
    return hole;
  }
  moles.forEach(mole => mole.addEventListener('click', (e) => e.isTrusted && bonk(e)));
  function bonk(e) {
    score++;
    e.target.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
  }

})();
