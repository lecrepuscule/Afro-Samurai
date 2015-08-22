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
  console.log(redLine);
  pickPoint(redLine);
  $("body").on("keypress", keypressHandler);
}

function keypressHandler(e){
  console.log(e);
}

function playGame(){
  pickPoint();
  pickSpeed();
  moveObject();
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



function displacement(){
}
