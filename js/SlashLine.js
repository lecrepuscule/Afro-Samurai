var SlashLine = SlashLine || {};

SlashLine = {

  id: null,
  letter: {},
  upperEnd: null,
  lowerEnd: null,
  gradient: null,
  intercept: null,

  placeEndPoints: function(){
    var gameSpace = $(".game-space");
    var top = $("<div class='"+this.id+"-dots dots' id='"+this.id+"-top'>"+this.letter.name+"</div>").appendTo(gameSpace);
    var bottom = top.clone().attr("id",this.id+"-bottom").text("").appendTo(gameSpace);
    top.offset(this.upperEnd);
    bottom.offset(this.lowerEnd);
  },
  
  pickTime: function(timeRange){
    var time = (Number((Math.random()*(timeRange[1]-timeRange[0])).toFixed(0)) + timeRange[0]) / 5; // using 5ms as the unit to accommodate minimum delay in setInterval in js
    // console.log("time is: " + time);
    return time;
  },

  generateObjects: function(timeRange, maxDistance, numOfObjects){
    var flyingObjects = [];
    var time = this.pickTime(timeRange);
    var numOfObjects = Math.ceil(Math.random()*numOfObjects);
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
    var margin = 30;  //so that they won't appear at end points of the line
    var dtop = Math.round(Math.random()*(this.lowerEnd.top - this.upperEnd.top - margin*2));
    var origin = [this.upperEnd.top + dtop + margin, ((this.upperEnd.top + dtop + margin) + this.intercept) / this.gradient];
    // console.log(origin);
    return origin;
  },

  strike: function(flyingObjects, accuracy){
    var lineIntercept = this.intercept;
    var lineGradient = this.gradient;
    this.drawLine(accuracy);
    var strikeCount = 0;
    for (i=0; i< flyingObjects.length; i++){
      var x = flyingObjects[i].physicalBody.offset().left;
      var y = flyingObjects[i].physicalBody.offset().top;
      var striked = (y + lineIntercept) / lineGradient;
      if (Math.abs(striked - x) < accuracy) {
        // setTimeout(function(){
          flyingObjects[i].physicalBody.addClass('animated zoomOutDown');
        // }, 10);
        flyingObjects.splice(i,1);
        i--;
        strikeCount++;
        console.log("Dead cat!");
      } 
      else {
        console.log("miss! " + (striked-x));
      }
    }
    console.log("inside strike function: "+ strikeCount);
    return [strikeCount, flyingObjects];
  },

  drawLine: function(accuracy) {
    var c = $("#canvas");
    var ctx = c[0].getContext("2d");
    ctx.moveTo(this.upperEnd.left + 15,0);
    ctx.lineTo(this.lowerEnd.left + 15,300);
    ctx.lineWidth = accuracy/4;
    ctx.stroke();
    setTimeout(function(){
      c.replaceWith("<canvas id='canvas' height='300' width='1440'></canvas>");
    }, 500);
  }

}