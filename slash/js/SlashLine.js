var SlashLine = SlashLine || {};

SlashLine = {

  id: null,
  upperEnd: null,
  lowerEnd: null,
  gradient: null,
  intercept: null,

  placeEndPoints: function(){
    var gameSpace = $(".game-space");
    var top = $("<div class='"+this.id+"-dots dots' id='"+this.id+"-top'></div>").appendTo(gameSpace);
    var bottom = top.clone().attr("id",this.id+"-bottom").appendTo(gameSpace);
    top.offset(this.upperEnd);
    bottom.offset(this.lowerEnd);
  },
  
  pickTime: function(timeRange){
    var time = (Number((Math.random()*(timeRange[1]-timeRange[0])).toFixed(0)) + timeRange[0]) / 5; // using 5ms as the unit to accommodate minimum delay in setInterval in js
    // console.log("time is: " + time);
    return time;
  },

  generateObjects: function(timeRange, maxDistance){
    var flyingObjects = [];
    var time = this.pickTime(timeRange);
    var numOfObjects = Math.ceil(Math.random()*4);
    for (i=1; i<= numOfObjects; i++){
      flyingObject = Object.create(FlyingObject);
      flyingObject.id = i;
      flyingObject.origin = this.generateOrigin();
      flyingObject.time = time;
      flyingObject.pickDisplacement(maxDistance);
      flyingObject.pickSpeed();
      flyingObject.materialise();
      flyingObjects.push(flyingObject);
    }
    return flyingObjects;
  },

  generateOrigin: function(){
    var margin = 30;  //so that they won't appear at ends of the line
    var dtop = Math.round(Math.random()*(this.lowerEnd.top - this.upperEnd.top - margin*2));
    var origin = [this.upperEnd.top + dtop + margin, ((this.upperEnd.top + dtop + margin) + this.intercept) / this.gradient];
    // console.log(origin);
    return origin;
  },

  strike: function(flyingObjects, accuracy, scoreBoard){
    var lineIntercept = this.intercept;
    var lineGradient = this.gradient;
    this.drawLine();
    var bonus = 0;

    for (i=0; i< flyingObjects.length; i++){
      var x = flyingObjects[i].physicalBody.offset().left;
      var y = flyingObjects[i].physicalBody.offset().top;
      var striked = (y + lineIntercept) / lineGradient;

      if (Math.abs(striked - x) < accuracy) {
        // flyingObjects[i].physicalBody.remove();
        flyingObjects[i].physicalBody.addClass('invisible')
        flyingObjects.splice(i,1);
        i--;
        bonus++;
        console.log("Dead cat!");
      } 
      else {
        console.log("miss! " + (striked-x));
      }
    }
    bonus ? (scoreBoard[0] += 10*Math.pow(bonus,2)) : scoreBoard[1]--;
    return [scoreBoard, flyingObjects];
  },

  drawLine: function() {
    var c = $("#canvas");
    var ctx = c[0].getContext("2d");
    ctx.moveTo(this.upperEnd.left + 15,0);
    ctx.lineTo(this.lowerEnd.left + 15,300);
    ctx.lineWidth = 10;
    ctx.stroke();
    setTimeout(function(){
      c.replaceWith("<canvas id='canvas' height='300' width='1440'></canvas>");
    }, 500);
  }

}