/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
function togglePlay() {
  // console.dir(this.constructor.name);
  console.dir(this);
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
function updateButton() {
  const playorPauseIcon = this.paused ? '<i class="fas fa-play-circle"></i>' : '<i class="fas fa-pause-circle"></i>';
  toggle.innerHTML = playorPauseIcon;
}

skipButtons.forEach(button => button.addEventListener('click', skip));
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
function handleRangeUpdate() {
  video[this.name] = this.value;
}

video.addEventListener('timeupdate', handleProgress);
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

progress.addEventListener('click', scrub);
function scrub(e) {
  console.dir(e);
  console.dir(this);
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// let mousedown = false;
// progress.addEventListener('mousedown', () => mousedown = true);
// progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
// progress.addEventListener('mouseup', () => mousedown = false);
