const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

getVideo();
video.addEventListener('canplay', paintToCanvas);

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
    // take the pixels out
    let pixels = ctx.getImageData(0, 0, videoWidth, videoHeight);
    console.log(`Aera: ${videoWidth * videoHeight}, Pixels: ${pixels.data.length}`);
    debugger;

    // mess with them
    // pixels = redEffect(pixels);

    // pixels = rgbSplit(pixels);
    // ctx.globalAlpha = 0.8;

    // pixels = greenScreen(pixels);
    // put them back
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

// function takePhoto() {
//   // played the sound
//   snap.currentTime = 0;
//   snap.play();

//   // take the data out of the canvas
//   const data = canvas.toDataURL('image/jpeg');
//   const link = document.createElement('a');
//   link.href = data;
//   link.setAttribute('download', 'handsome');
//   link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
//   strip.insertBefore(link, strip.firstChild);
// }

// function redEffect(pixels) {
//   for (let i = 0; i < pixels.data.length; i += 4) {
//     pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
//     pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
//     pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
//   }
//   return pixels;
// }

// function rgbSplit(pixels) {
//   for (let i = 0; i < pixels.data.length; i += 4) {
//     pixels.data[i - 150] = pixels.data[i + 0]; // RED
//     pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
//     pixels.data[i - 550] = pixels.data[i + 2]; // Blue
//   }
//   return pixels;
// }

// function greenScreen(pixels) {
//   const levels = {};

//   document.querySelectorAll('.rgb input').forEach((input) => {
//     levels[input.name] = input.value;
//   });

//   for (i = 0; i < pixels.data.length; i = i + 4) {
//     red = pixels.data[i + 0];
//     green = pixels.data[i + 1];
//     blue = pixels.data[i + 2];
//     alpha = pixels.data[i + 3];

//     if (red >= levels.rmin
//       && green >= levels.gmin
//       && blue >= levels.bmin
//       && red <= levels.rmax
//       && green <= levels.gmax
//       && blue <= levels.bmax) {
//       // take it out!
//       pixels.data[i + 3] = 0;
//     }
//   }

//   return pixels;
// }
