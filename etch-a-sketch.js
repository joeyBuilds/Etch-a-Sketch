// Select the elements on the page - eg Canvas, Shake
const canvas = document.querySelector("#etch-a-sketch");
const ctx = canvas.getContext("2d");
const shakeButton = document.querySelector(".shake");
const MOVE_AMOUNT = 10;
let hue = 0;
ctx.strokeStyle = `hsl(${hue},100%,50%)`;

// Setup our canvas for drawing

// make W & H variables from the same canvas properties
const { width, height } = canvas; // equivalent to width = canvas.width, etc.

// create random X and Y starting points on the canvas
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = MOVE_AMOUNT;

// Start the drawing
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// Write a draw function
function draw({ key }) {
  // increment the hue
  hue += 2;
  ctx.strokeStyle = `hsl(${hue},100%,50%)`;

  console.log(key);
  ctx.beginPath();
  ctx.moveTo(x, y);
  // move x & y based on user input
  switch (key) {
    case "ArrowUp":
      y -= MOVE_AMOUNT;
      break;
    case "ArrowLeft":
      x -= MOVE_AMOUNT;
      break;
    case "ArrowDown":
      y += MOVE_AMOUNT;
      break;
    case "ArrowRight":
      x += MOVE_AMOUNT;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

// Write a a handler for keys
function handleKey(e) {
  if (e.key.includes("Arrow")) {
    e.preventDefault();
    draw({ key: e.key });
  }
}

// Shake / Clear function
function clearCanvas() {
  canvas.classList.add("shake");
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener(
    "animationend",
    function() {
      canvas.classList.remove("shake");
    },
    { once: true }
  );
}

// Listen for arrow keys
window.addEventListener("keydown", handleKey);
shakeButton.addEventListener("click", clearCanvas);
