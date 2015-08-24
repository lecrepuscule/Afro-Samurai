$(document).ready(function(){
  initGame();
})

function initGame(){
  var accuracy = 40; //the error margin that counts as a successful strike
  var timeRange = [2500, 4000]; //determines how long it takes for the flying objects to traverse the screen
  var maxDistance = $(window).width()/3; //determines how fast the objects fly
  var scoreBoard = [0,3];


  var slashLines = {
    redLine: {
      line: null,
      upperEnd: {top:228,left:350},
      lowerEnd: {top:528,left:1000}
    },
    greenLine: {
      line: null,
      upperEnd: {top:228,left:800},
      lowerEnd: {top:528,left:500}
    },  
    blueLine: {
      line: null,
      upperEnd: {top:228,left:550},
      lowerEnd: {top:528,left:700}
    },  
    yellowLine: {
      line: null,
      upperEnd: {top:228,left:950},
      lowerEnd: {top:528,left:900}
    }
  };

  var redTop = $("#red-top").offset({top:228,left:350});
  var redBottom = $("#red-bottom").offset({top:528,left:1000});
  var greenTop = $("#green-top").offset({top:228,left:800});
  var greenBottom = $("#green-bottom").offset({top:528,left:500});
  var blueTop = $("#blue-top").offset({top:228,left:550});
  var blueBottom = $("#blue-bottom").offset({top:528,left:700});
  var yellowTop = $("#yellow-top").offset({top:228,left:950});
  var yellowBottom = $("#yellow-bottom").offset({top:528,left:900});

  slashLines = setupSlashLines(slashLines);
  scoreBoard = playGame(slashLines, timeRange, maxDistance, accuracy, scoreBoard);
  // var slashLine = pickLines(slashLines);
  // console.log("the line is: " + slashLine.id);
  // var flyingObjects = slashLine.generateObjects(timeRange, maxDistance);
  // console.log(flyingObjects);

  // $("body").on("keypress", function(e){
  //   e.preventDefault();
  //   console.log(e);
  //   // var startTime = Date.now();
  //   var strikeLine = findLine(e, slashLines);
  //   results = strikeLine.strike(flyingObjects, accuracy, score, life);
  //   console.log(results);
  //   flyingObjects = results[0];
  //   score = results[1];
  //   life = results[2];
  // });

  // var safeWord = setInterval(function(){
  //   $.each(flyingObjects, function(index, flyingObject){
  //     flyingObject.fly(safeWord);
  //   })
  // },5);
}

function setupSlashLines(slashLines){
  $.each(slashLines, function(key, value){
    value.line = Object.create(SlashLine);
    value.line.id = key;
    value.line.upperEnd = value.upperEnd;
    value.line.lowerEnd = value.lowerEnd;
    value.line.gradient = (value.lowerEnd.top - value.upperEnd.top) / (value.lowerEnd.left - value.upperEnd.left);
    value.line.intercept = value.line.gradient * value.lowerEnd.left - value.lowerEnd.top;
  })
  return slashLines;
}

function pickLines(slashLines){
  lineIndex = Math.ceil(Math.random()*4);
  switch (lineIndex){
    case 1:
      return slashLines.redLine.line;
    case 2:
      return slashLines.greenLine.line;
    case 3:
      return slashLines.blueLine.line;
    case 4:
      return slashLines.yellowLine.line;
  }
}

function findLine(e, slashLines){
  console.log(slashLines);
  console.log(e.keyCode);
  switch(e.keyCode){
    case 114:
      // $("#canvas")[0].getContext("2d").strokeStyle="red";
      return slashLines.redLine.line;
    case 103:
      // $("#canvas")[0].getContext("2d").strokeStyle="green";
      return slashLines.greenLine.line;
    case 98:
      // $("#canvas")[0].getContext("2d").strokeStyle="blue";
      return slashLines.blueLine.line;
    case 121:
      // $("#canvas")[0].getContext("2d").strokeStyle="yellow";
      return slashLines.yellowLine.line;
    default:
      console.log("wrong button!")
  }
}

function playGame(slashLines, timeRange, maxDistance, accuracy, scoreBoard){
  var results = null;
  var slashLine = pickLines(slashLines);
  console.log("the line is: " + slashLine.id);
  var flyingObjects = slashLine.generateObjects(timeRange, maxDistance);
  console.log(flyingObjects);
  console.log("the scoreBoard is: " + scoreBoard);

  $("body").on("keypress", function(e){
    e.preventDefault();
    console.log(e);
    var strikeLine = findLine(e, slashLines);
    console.log("before the strik, life is: "+ scoreBoard[1]);
    results = strikeLine.strike(flyingObjects, accuracy, scoreBoard);
    console.log(results);
    flyingObjects = results[1];
    console.log("this before the display, the life is: "+ results[0][1]);
    scoreBoard = displayOutcome(results[0]);
  });

  var safeWord = setInterval(function(){
    var currentTurn = 0;
    if (flyingObjects.length) {
      $.each(flyingObjects, function(index, flyingObject){
        flyingObject.fly(safeWord);
        currentTurn += isOnScreen(flyingObject);
      })
      if (!currentTurn){
        clearInterval(safeWord);
        scoreBoard = checkResults(results, scoreBoard, slashLines, timeRange, maxDistance, accuracy);
      }
    }
      else {
        clearInterval(safeWord);
        scoreBoard = checkResults(results, scoreBoard, slashLines, timeRange, maxDistance, accuracy);
      }
    },5)
  //   {
  //     clearInterval(safeWord);
  //     scoreBoard = checkResults(results, scoreBoard, slashLines, timeRange, maxDistance, accuracy);
  //   } 
  //   $.each(flyingObjects, function(index, flyingObject){
  //     flyingObject.fly(safeWord);
  //     currentTurn += isOnScreen(flyingObject);
  //   })
  //   if (!currentTurn){
  //     clearInterval(safeWord);
  //     scoreBoard = checkResults(results, scoreBoard, slashLines, timeRange, maxDistance, accuracy);
  //   }
  // },5);
  return scoreBoard;
}

function checkResults(results, scoreBoard, slashLines, timeRange, maxDistance, accuracy){
  if (results === null){
    scoreBoard[1]--;
  }
  displayOutcome(scoreBoard);
  $("body").off();
  return (scoreBoard[1] <= 0) ? endGame() : playGame(slashLines, timeRange, maxDistance, accuracy, scoreBoard);
}

function displayOutcome(scoreBoard){
  for (i=3-scoreBoard[1]; i>0; i--){
    if ($(".life-icon").length > scoreBoard[1]){
      $($(".life-icon")[0]).remove();
    }
  }
  $(".score").text(scoreBoard[0]);
  return scoreBoard;
}

function isOnScreen(flyingObject){
  var position = flyingObject.physicalBody.offset().left;
  if (flyingObject.direction) {
    return position < -50 ? 0 : 1;
  }
  else {
    return (position > ($(window).width()+50)) ? 0 : 1;
  } 
}

function endGame(){
  console.log("Game Over!");
}



