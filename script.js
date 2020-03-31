var ctx = document.getElementById('canvas').getContext('2d');
var canvas = document.getElementById('canvas');
var body_width = 20;
var x = (250 - (body_width / 2)) + 10;
var y = 200 - (body_width / 2);
var right = false;
var left = false;
var up = false;
var down = false;
var speed = body_width * 1.1;
var apple_x = 200;
var apple_y = 200;
var length = 0;
var hidden = 0;
var spaces = [];
canvas.addEventListener('keydown', function(event) {
  event.preventDefault();
  console.log(event.key, event.keyCode);
  if (event.keyCode === 40 && up === false) { // DOWN
    down = true;
    up = false;
    right = false;
    left = false;
  } else if (event.keyCode === 38 && down === false) { // UP
    up = true;
    down = false;
    right = false;
    left = false;
  } else if (event.keyCode === 37 && right === false) { // LEFT
    left = true;
    right = false;
    up = false;
    down = false;
  } else if (event.keyCode === 39 && left === false) { // RIGHT
    right = true;
    left = false;
    up = false;
    down = false;
  }
});
// Listen for keyup events
function new_apple() {
  var num = Math.random() - 0.5;
  num = num * 10;
  num = Math.round(num);
  num = num * 22;
  apple_x = num + 250;
  num = Math.random() - 0.5;
  num = num * 8;
  num = Math.round(num);
  num = num * 22;
  apple_y = num + 190;
  if (apple_x == x && apple_y == y) {
      new_apple();
  }
}
function run() {
  if (up === true) {
  	y -= speed;
  }
  if (down === true) {
  	y += speed;
  }
  if (left === true) {
  	x -= speed;
  }
  if (right === true) {
  	x += speed;
  }
  if (x == apple_x && y == apple_y) {
  	new_apple();
    length += 5;
    hidden += 5;
  }
  if (hidden > 0) {
      hidden -= 1;
  }
  spaces.unshift([x, y]);
  while (spaces.length > length + hidden) {
    spaces.pop();
  }
  if (x <= 0 || y <= 0 || x >= 485 || y >= 380) {
      window.location.reload();
  }
  for (var i = 0; i <= spaces.length - hidden; i += 1) {
      if (x == spaces[i][0] && y == spaces[i][1] && i !== 0) {
        if (spaces[i - 1] != spaces[i]) {
            window.location.reload();
            throw new Error();
        }
      }
  }
}
var i;
new_apple();
function update() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(0, 0, 505, 400);
  ctx.fillStyle = 'green';
  ctx.fillRect(x, y, body_width, body_width);
  ctx.fillStyle = 'red';
  ctx.fillRect(apple_x, apple_y, body_width, body_width);
  ctx.fillStyle = 'green';
  i = 0;
  for (i = 0; i < length - hidden; i++) {
      ctx.fillRect(spaces[i][0], spaces[i][1], body_width, body_width);
  }
}
setInterval(run, 150);
setInterval(update, 150);
