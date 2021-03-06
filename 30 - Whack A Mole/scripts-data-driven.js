
const moles = [...document.querySelectorAll(".mole")];
const status = { ...moles.map((moles, index) => moles[index] = false) };
let score = 0, timeUp = true;

const statusProxy = new Proxy(status, {
  get(target, key) {
    return target[key];
  },
  set(target, key, value) {
    target[key] = value;
    moles[key].removeEventListener("click", handleClick);
    if (value) {
      moles[key].addEventListener("click", handleClick);
      moles[key].parentNode.classList.add("up");
    } else {
      moles[key].parentNode.classList.remove("up");
    }
  }
});

function handleClick() {
  if (statusProxy[moles.indexOf(this)]) {
    setScore(++score);
    statusProxy[moles.indexOf(this)] = false;
  }
};

const button = document.querySelector("button");
button.addEventListener("click", () => timeUp && startGame());
function startGame() {
  setScore(0);
  timeUp = false;
  showRandomMole();
  setTimeout(() => (timeUp = true, alert("Time's Up!!!")), 10000);
};

const scoreBoard = document.querySelector(".score");
function setScore(returnToZero) {
  score = returnToZero;
  scoreBoard.textContent = score;
};
function showRandomMole() {
  const mole = Math.floor(Math.random() * moles.length);
  const time = Math.random() * (1500 - 1000) + 1000; // 1000~1500
  if (statusProxy[mole]) return showRandomMole();
  setMole(mole, time);
};
function setMole(mole, time) {
  statusProxy[mole] = true;
  setTimeout(() => (!timeUp) && showRandomMole(), 500);
  setTimeout(() => statusProxy[mole] = false, time);
};