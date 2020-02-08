const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
let functionCode = 1;

getVideo();
video.addEventListener('canplay', paintToCanvas);

function switchType(type) {
  functionCode = type;
}

function getVideo() {
  // console.dir(video);
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(error => {
      console.error(`OH NO!!!`, error);
    });
}

function paintToCanvas() {
  const { videoWidth, videoHeight } = video;
  canvas.width = videoWidth;
  canvas.height = videoHeight;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);

    let pixels = ctx.getImageData(0, 0, videoWidth, videoHeight);
    console.dir(pixels);
    console.log(`Aera: ${videoWidth * videoHeight}, Pixels: ${pixels.data.length}`);

    switch (functionCode) {
      case 1:
        pixels = redEffect(pixels);
        break;
      case 2:
        pixels = rgbSplit(pixels);
        ctx.globalAlpha = 0.2;
        break;
      case 3:
        pixels = greenScreen(pixels);
        break;
    }

    ctx.clearRect(0, 0, videoWidth, videoHeight);
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i += 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    (red >= levels.rmin && red <= levels.rmax && green >= levels.gmin && green <= levels.gmax && blue >= levels.bmin && blue <= levels.bmax) && (pixels.data[i + 3] = 0);
  }
  return pixels;
}
