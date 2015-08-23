$(document).ready(function(){
  initGame();
})

function initGame(){
  var accuracy = 0.1; //the margin in radian that counts as a successful strike
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

  var redLine = Object.create(SlashLine);
  redLine.upperEnd = redTop.offset();
  redLine.lowerEnd = redBottom.offset();
  redLine.gradient = (redBottom.offset().top - redTop.offset().top) / (redBottom.offset().left - redTop.offset().left);
  redLine.intercept = (redBottom.offset().top - redTop.offset().top) / (redBottom.offset().left - redTop.offset().left) * redBottom.offset().left - redBottom.offset().top;
      // (506-206)/(850-450)
  console.log(redLine);

  var timeRange = [1000, 2000];
  var maxDistance = $(window).width()/3;
  var flyingObjects = redLine.generateObjects(timeRange, maxDistance);
  console.log(flyingObjects);

  $("body").on("keypress", function(e){
    e.preventDefault();
    console.log(e);
    // var startTime = Date.now();
    redLine.strike(flyingObjects, accuracy);
  });

  var safeWord = setInterval(function(){
    $.each(flyingObjects, function(index, flyingObject){
      flyingObject.fly(safeWord);
      // if (Math.abs(flyingObject.distance - flyingObject.origin[1]) < 2) {
      //   clearInterval(safeWord);
      // }
    })
  },5);
}

function setupSlashLines(slashLines){
  $each(slashLines, function(key, value){
    slashLines.key = Object.create(SlashLine);
  })
  return slashLines;
}

