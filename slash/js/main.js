$(document).ready(function(){
  initGame();
})

function initGame(){
  $("#red-dot-1").offset({top:206,left:450});
  $("#red-dot-2").offset({top:506,left:850});
  var slashingLine1 = {
      upperEnd: [206, 450],
      lowerEnd: [506, 850],
      gradient: (506-206)/(850-450)
    };
  $("body").on("keypress", keypressHandler);
}

function keypressHandler(e){
  console.log(e);
}

function playGame(){
  pickHeight();
  pickSpeed();
  moveObject();
}

function pickHeight(){

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
