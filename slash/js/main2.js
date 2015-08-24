$(document).ready(function(){
  initGame();
})

function initGame(){
  var accuracy = 40; //the error margin that counts as a successful strike
  var timeRange = [1000, 2000]; //determines how long it takes for the flying objects to traverse the screen
  var maxDistance = $(window).width()/3; //determines how fast the objects fly
  var score = 0;
  var life = 3;
  var results = null;

  var slashLines = {
    redLine: {
      line: null,
      upperEnd: {top:206,left:350},
      lowerEnd: {top:506,left:1000}
    },
    greenLine: {
      line: null,
      upperEnd: {top:206,left:800},
      lowerEnd: {top:506,left:500}
    },  
    blueLine: {
      line: null,
      upperEnd: {top:206,left:550},
      lowerEnd: {top:506,left:700}
    },  
    yellowLine: {
      line: null,
      upperEnd: {top:206,left:950},
      lowerEnd: {top:506,left:900}
    }
  };

  var redTop = $("#red-top").offset({top:206,left:350});
  var redBottom = $("#red-bottom").offset({top:506,left:1000});
  var greenTop = $("#green-top").offset({top:206,left:800});
  var greenBottom = $("#green-bottom").offset({top:506,left:500});
  var blueTop = $("#blue-top").offset({top:206,left:550});
  var blueBottom = $("#blue-bottom").offset({top:506,left:700});
  var yellowTop = $("#yellow-top").offset({top:206,left:950});
  var yellowBottom = $("#yellow-bottom").offset({top:506,left:900});

  slashLines = setupSlashLines(slashLines);

  var slashLine = pickLines(slashLines);
  console.log("the line is: " + slashLine.id);
  var flyingObjects = slashLine.generateObjects(timeRange, maxDistance);
  console.log(flyingObjects);

  $("body").on("keypress", function(e){
    e.preventDefault();
    console.log(e);
    // var startTime = Date.now();
    var strikeLine = findLine(e, slashLines);
    results = strikeLine.strike(flyingObjects, accuracy, score, life);
    console.log(results);
    flyingObjects = results[0];
    score = results[1];
    life = results[2];
  });

  var safeWord = setInterval(function(){
    $.each(flyingObjects, function(index, flyingObject){
      flyingObject.fly(safeWord);
    })
  },5);
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

// function checkResults(results, score, life){
//   if (results === null){
//     life--;
//   }
//   else {
    
//   }
// }

