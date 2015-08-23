$(document).ready(function(){
  initGame();
})

function initGame(){
  var redTop = $("#red-top").offset({top:206,left:450});
  var redBottom = $("#red-bottom").offset({top:506,left:850});
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
  // $.each(flyingObjects, function(index, flyingObject){
  //   flyingObject.fly();
  //   console.log(flyingObject);
  // })
  // $("body").on("keypress", function(e){
  //   e.preventDefault();
  //   console.log(e);
  //   // var startTime = Date.now();
  //   redLine.strike(flyingObjects);
  // });
  var safeWord = setInterval(function(){
    $.each(flyingObjects, function(index, flyingObject){
      flyingObject.fly(safeWord);
      // if (Math.abs(flyingObject.distance - flyingObject.origin[1]) < 2) {
      //   clearInterval(safeWord);
      // }
    })
  },5);
}