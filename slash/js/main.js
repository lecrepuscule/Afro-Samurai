$(document).ready(function(){
  setDifficulty();
})

function setDifficulty(){
  $(".setting").on("click", function(e){
    switch (this.value){
      case "easy": 
        initGame([[3000,4000], 35, $(window).width()/3]);
        break;
      case "normal":
        initGame([[2000,3500], 25, $(window).width()/3]);
        break;
      case "hard":
        initGame([[1000,3000], 20, $(window).width()/3]);
        break
    }
  })
}

function initGame(settings){
  var timeRange = settings[0]; //determines how long it takes for the flying objects to traverse the screen
  var accuracy = settings[1]; //the error margin that counts as a successful strike
  var maxDistance = settings[2]; //determines how fast the objects fly
  var scoreBoard = [0,3];


  var slashLines = {
    red: {
      line: null,
      letter: {name:"D", code:100},
      upperEnd: {top:225,left:350},
      lowerEnd: {top:525,left:1000}
    },
    green: {
      line: null,
      letter: {name:"J", code:106},
      upperEnd: {top:225,left:800},
      lowerEnd: {top:525,left:500}
    },  
    blue: {
      line: null,
      letter: {name:"F", code:102},
      upperEnd: {top:225,left:550},
      lowerEnd: {top:525,left:700}
    },  
    black: {
      line: null,
      letter: {name:"K", code:107},
      upperEnd: {top:225,left:950},
      lowerEnd: {top:525,left:900}
    }
  };

  $(".game-space").empty();
  $("<canvas id='canvas' height='300' width='1440'></canvas>").appendTo(".game-space");
  $("<img src='images/all-clear.png' class='flash-pic' id='all-clear'>").appendTo(".game-space");
  slashLines = setupSlashLines(slashLines);
  scoreBoard = playGame(slashLines, timeRange, maxDistance, accuracy, scoreBoard);
}

function setupSlashLines(slashLines){
  $.each(slashLines, function(key, value){
    value.line = Object.create(SlashLine);
    value.line.id = key;
    value.line.letter = value.letter;
    value.line.upperEnd = value.upperEnd;
    value.line.lowerEnd = value.lowerEnd;
    value.line.gradient = (value.lowerEnd.top - value.upperEnd.top) / (value.lowerEnd.left - value.upperEnd.left);
    value.line.intercept = value.line.gradient * value.lowerEnd.left - value.lowerEnd.top;
    value.line.placeEndPoints();
  })
  return slashLines;
}


function pickLines(slashLines){
  var lineIndex = Math.ceil(Math.random()*4);
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
  console.log(e.keyCode);
  var slashLine;
  $.each(slashLines, function(key, value){
    console.log("the line code is: "+value.letter.code)
    if (value.letter.code === e.keyCode) {
      slashLine = value.line;
      $("#canvas")[0].getContext("2d").strokeStyle=key;
    }
  })
  return slashLine;
}

function playGame(slashLines, timeRange, maxDistance, accuracy, scoreBoard){
  var results = null;
  var currentTurn = 1;
  var slashLine = pickLines(slashLines);
  var flyingObjects = slashLine.generateObjects(timeRange, maxDistance);


  $("body").on("keypress", function(e){
    e.preventDefault();
    console.log(e);
    var strikeLine = findLine(e, slashLines);
    results = strikeLine.strike(flyingObjects, accuracy);
    console.log(results);
    flyingObjects = results[1];
    scoreBoard = checkResults(results, scoreBoard, slashLines, timeRange, maxDistance, accuracy, currentTurn);

    // scoreBoard = displayOutcome(results[0]);
  });

  var safeWord = setInterval(function(){
    // if (flyingObjects.length) {
      var numOnScreen = 0;
      $.each(flyingObjects, function(index, flyingObject){
        flyingObject.fly(safeWord);
        numOnScreen += isOnScreen(flyingObject);
      })
      currentTurn = numOnScreen;
      if (!currentTurn){
        clearInterval(safeWord);
        // $('.flying-object').remove();
        scoreBoard = checkResults(results, scoreBoard, slashLines, timeRange, maxDistance, accuracy, currentTurn);
      }
    // }
    // else {
    //   clearInterval(safeWord);
    //   $('.flying-object').remove();
    //   scoreBoard = checkResults(results, scoreBoard, slashLines, timeRange, maxDistance, accuracy);
    // }
  },5)
  return scoreBoard;
}

// function checkResults(results, scoreBoard, slashLines, timeRange, maxDistance, accuracy){
//   if (results === null){
//     scoreBoard[1]--;
//   }
//   displayOutcome(scoreBoard);
//   $("body").off();
//   return (scoreBoard[1] <= 0) ? endGame(scoreBoard) : playGame(slashLines, timeRange, maxDistance, accuracy, scoreBoard);
// }

function checkResults(results, scoreBoard, slashLines, timeRange, maxDistance, accuracy, currentTurn){
  // debugger;
  if (currentTurn){
    results[0] ? (scoreBoard[0] += 10*Math.pow(results[0],2)) : scoreBoard[1]--;
    showFlash(results[0]);
  }
  else if (results === null){
      scoreBoard[1]--;
  }
  displayOutcome(scoreBoard);

  if (scoreBoard[1] <= 0){
    $("body").off();
    setTimeout(function(){
      endGame(scoreBoard);
    },800);
  }
  else if ((!currentTurn) || results[1].length === 0){
    $('.flying-object').remove();
    $("body").off();
    playGame(slashLines, timeRange, maxDistance, accuracy, scoreBoard);
  }
  return scoreBoard;
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

function showFlash(bonus){
  var allClear = $("#all-clear");
  if (bonus >= 2){
    allClear.addClass("animated bounceInRight");
    setTimeout(function(){
      allClear.addClass("animated bounceOutLeft");
    },500)
  }
  allClear.removeClass("animated bounceInRight bounceOutLeft");
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
  var gameSpace = $(".game-space");
  gameSpace.empty();
  $("<h1 class='game-over'>Game Over</h1>").appendTo(gameSpace);
  $("<div class='final-score'>Score: "+scoreBoard[0]+"</div>").appendTo(gameSpace);
  $(".score-board").addClass("invisible");
  var playAgain = $("<button id='replay-button'>Click to Replay</button>").appendTo(gameSpace);
  playAgain.on("click", function(){
    window.location.reload();
    // initGame();
  });
}



