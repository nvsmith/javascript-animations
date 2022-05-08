window.onload = function() {
  //get the canvas and context, store in vars
  var canvas = document.getElementById("sky");
  var ctx = canvas.getContext("2d");

  //set canvas dimensions to window size
  var W = window.innerWidth;
  var H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  //generate snow and apply attributes
  var mf = 100; //maximum # of flakes
  var flakes = []; //array for flakes

  //loop through the empty flakes array and apply attributes
  for (var i = 0; i < mf; i++) {
    flakes.push({
      x: Math.random() * W, //x-coordinate
      y: Math.random() * H, //y-coordinate
      r: Math.random() * 5 + 3, //min of 2px, max 7px
      d: Math.random() + 1 // density (speed of fall)
    }) //end push into array
  } //end for loop to apply attributes

  //draw flakes
  function drawFlakes() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "white";
    ctx.beginPath();

    for (var i = 0; i < mf; i++) {
      var f = flakes[i];
      ctx.moveTo(f.x, f.y);
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true) //start at (x,y), radius r, degrees, full circle, true = clockwise;
    } //end for loop

    ctx.fill(); //fill white
    moveFlakes(); //animate the flakes
  } //end drawFlakes function

  //animate the flakes movement left and right
  var angle = 0;

  function moveFlakes() {
    angle += 0.01;

    for (var i = 0; i < mf; i++) {
      var f = flakes[i]; //store current flake
      f.y += Math.pow(f.d, 2) + 1; // update y coordinate to fall down
      f.x += Math.sin(angle) * 2; // update x coordinate to sway left and right

      //if snowflake reaches the bottom, send new one to the top
      if (f.y > H) {
        flakes[i] = {
          x: Math.random() * W,
          y: 0,
          r: f.r,
          d: f.d
        };
      } //end if statement

    } //end for loop to move flakes
  } // end moveFlakes function

  setInterval(drawFlakes, 25);

} //end window.onload