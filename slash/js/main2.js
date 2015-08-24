$(document).ready(function(){
  initGame();
})

function initGame(){
  var accuracy = 25; //the error margin that counts as a successful strike
  var timeRange = [2000, 3500]; //determines how long it takes for the flying objects to traverse the screen
  var maxDistance = $(window).width()/3; //determines how fast the objects fly
  var scoreBoard = [0,3];


  var slashLines = {
    red: {
      line: null,
      upperEnd: {top:225,left:350},
      lowerEnd: {top:525,left:1000}
    },
    green: {
      line: null,
      upperEnd: {top:225,left:800},
      lowerEnd: {top:525,left:500}
    },  
    blue: {
      line: null,
      upperEnd: {top:225,left:550},
      lowerEnd: {top:525,left:700}
    },  
    black: {
      line: null,
      upperEnd: {top:225,left:950},
      lowerEnd: {top:525,left:900}
    }
  };

  $("<canvas id='canvas' height='300' width='1440'></canvas>").appendTo(".game-space");
  slashLines = setupSlashLines(slashLines);
  scoreBoard = playGame(slashLines, timeRange, maxDistance, accuracy, scoreBoard);
}

function setupSlashLines(slashLines){
  $.each(slashLines, function(key, value){
    value.line = Object.create(SlashLine);
    value.line.id = key;
    value.line.upperEnd = value.upperEnd;
    value.line.lowerEnd = value.lowerEnd;
    value.line.gradient = (value.lowerEnd.top - value.upperEnd.top) / (value.lowerEnd.left - value.upperEnd.left);
    value.line.intercept = value.line.gradient * value.lowerEnd.left - value.lowerEnd.top;
    value.line.placeEndPoints();
  })
  return slashLines;
}


function pickLines(slashLines){
  lineIndex = Math.ceil(Math.random()*4);
  switch (lineIndex){
    case 1:
      return slashLines.red.line;
    case 2:
      return slashLines.green.line;
    case 3:
      return slashLines.blue.line;
    case 4:
      return slashLines.black.line;
  }
}

function findLine(e, slashLines){
  console.log(slashLines);
  console.log(e.keyCode);
  switch(e.keyCode){
    case 114:
      $("#canvas")[0].getContext("2d").strokeStyle="red";
      return slashLines.red.line;
    case 103:
      $("#canvas")[0].getContext("2d").strokeStyle="green";
      return slashLines.green.line;
    case 98:
      $("#canvas")[0].getContext("2d").strokeStyle="blue";
      return slashLines.blue.line;
    case 121:
      $("#canvas")[0].getContext("2d").strokeStyle="black";
      return slashLines.black.line;
    default:
      console.log("wrong button!")
  }
}

function playGame(slashLines, timeRange, maxDistance, accuracy, scoreBoard){
  var results = null;
  var slashLine = pickLines(slashLines);
  var flyingObjects = slashLine.generateObjects(timeRange, maxDistance);
  var destroyedObjects = [];


  $("body").on("keypress", function(e){
    e.preventDefault();
    console.log(e);
    var strikeLine = findLine(e, slashLines);
    results = strikeLine.strike(flyingObjects, accuracy, scoreBoard);
    flyingObjects = results[1];
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
        $('.flying-object').remove();
        scoreBoard = checkResults(results, scoreBoard, slashLines, timeRange, maxDistance, accuracy);
      }
    }
      else {
        clearInterval(safeWord);
        $('.flying-object').remove();
        scoreBoard = checkResults(results, scoreBoard, slashLines, timeRange, maxDistance, accuracy);
      }
    },5)

  return scoreBoard;
}

function checkResults(results, scoreBoard, slashLines, timeRange, maxDistance, accuracy){
  if (results === null){
    scoreBoard[1]--;
  }
  displayOutcome(scoreBoard);
  $("body").off();
  return (scoreBoard[1] <= 0) ? endGame(scoreBoard) : playGame(slashLines, timeRange, maxDistance, accuracy, scoreBoard);
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

function endGame(scoreBoard){
  $(".game-space").text("GAME OVER");
  var anotherRound = $("<div>").addClass("option").text("Another Round!");
  anotherRound.appendTo(".game-space");
  anotherRound.on("click", function(){
    anotherRound.remove();
    $(".game-space").text("");
    window.location.reload();
    // initGame();
  });
  console.log("Game Over!");
}



