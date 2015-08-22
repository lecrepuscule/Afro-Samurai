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
  var distance = $(window).width()+50;
  console.log(redLine);
  //start the game 
  var point = pickPoint(redLine);
  $("body").on("keypress", function(e){
    e.preventDefault();
    console.log(e);
    var startTime = Date.now();
    playGame(point, timeRange, distance, startTime);
  });
}

// function keypressHandler(e){
//   console.log(e);
//   playGame();
// }

function playGame(point, timeRange, distance, startTime){
  var time = pickTime(timeRange);
  var speed = pickSpeed(point, time, distance);
  moveObject(point, time, speed, distance, startTime);
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
  var time = (Number((Math.random()*timeRange[1]).toFixed(0)) + timeRange[0]) / 5;
  console.log("time is: " + time);
  return time;
}

function pickSpeed (point, time, distance){
  // var minSpeed = ($(window).width() - point.left)/time;
  // var speed = Number((Math.random()*maxSpeed).toFixed(3)) + minSpeed;
  var speed = (distance - point.left) /time;
  console.log("speed is: " + speed);
  return speed;
}

// function pickDistance(point, time, speed){
//   var distance = speed * time + point.left;
//   console.log("distance: "+ distance);
//   return distance;
// }

function moveObject(point, time, speed, distance, startTime){
  $(".test").offset({left:distance});
  console.log("distance is " + distance)
  var moveObject = setInterval(function(){
    distance -= speed;
    $(".test").offset({left:distance});
    if ( Math.floor(distance - point.left) < 1) {
      clearInterval(moveObject);
      console.log(Date.now() - startTime);
    }
  }, 5);
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


