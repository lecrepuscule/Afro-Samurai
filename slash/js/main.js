$(document).ready(function(){
  initGame();
})

function initGame(){
  var redTop = $("#red-top").offset({top:206,left:450});
  var redBottom = $("#red-bottom").offset({top:506,left:850});
  var redLine = {
      upperEnd: redTop.offset(),
      lowerEnd: redBottom.offset(),
      gradient: (redBottom.offset().top - redTop.offset().top) / (redBottom.offset().left - redTop.offset().left),
      intercept: (redBottom.offset().top - redTop.offset().top) / (redBottom.offset().left - redTop.offset().left) * redBottom.offset().left - redBottom.offset().top
      // (506-206)/(850-450)
    };
  var timeRange = [1000, 4000]
  console.log(redLine);
  //start the game 
  var point = pickPoint(redLine);
  $("body").on("keypress", function(e){
    e.preventDefault();
    console.log(e);
    playGame(point, timeRange);
  });
}

// function keypressHandler(e){
//   console.log(e);
//   playGame();
// }

function playGame(point, timeRange){
  var time = pickTime(timeRange);
  var speed = pickSpeed(point, time, 1.44);
  var distance = pickDistance(point, time, speed);
  moveObject(point, time, speed, distance);
}

// may be add in some "margining" value to avoid near the end points
function pickPoint(line){
  // var margin = 30;
  var dtop = Math.round(Math.random()*(line.lowerEnd.top - line.upperEnd.top));
  var point = {
    top: line.upperEnd.top + dtop,
    left: ((line.upperEnd.top + dtop) + line.intercept) / line.gradient
  }
  console.log(point);
  $(".test").offset(point);
  return point;
}

// to not let the flying object go past too fast or slow through the screen, an range is given to the time and speed, e.g. 1000 < time < 4000, 1430 > speed > 1430 /4 per 1000 ms
function pickTime (timeRange){
  var time = Math.round(Math.random()*timeRange[1]) + timeRange[0];
  console.log("time is: " + time);
  return time;
}

function pickSpeed (point, time, maxSpeed){
  var minSpeed = ($(window).width() - point.left)/time;
  var speed = Number((Math.random()*maxSpeed).toFixed(3)) + minSpeed;
  console.log("speed is: " + speed);
  return speed;
}

function pickDistance(point, time, speed){
  var distance = speed * time + point.left;
  console.log("distance: "+ distance);
  return distance;
}

function moveObject(point, time, speed, distance){
  $(".test").offset({left:distance});

  var moveObject = setInterval(function(){
    distance -= speed;
    $(".test").offset({left:distance});
  }, 1);

  if (distance < 0) {
    clearInterval(moveObject);
    console.log("clear!");
  }
}


  /*define height and width of the tunnel*/


  // $('.background').on("keypress", function(e){
  //   console.log(e.offsetX);
  //   console.log(e.offsetY);
  // })



  /*define height and width of the tunnel*/

  /*define slashing line
    slashingLine = {
      upperEnd: []
      lowerEnd: []
      gradient: 
    }
  */


