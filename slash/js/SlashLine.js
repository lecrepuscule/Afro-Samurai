var SlashLine = SlashLine || {};

SlashLine = {

  id: null,
  upperEnd: null,
  lowerEnd: null,
  gradient: null,
  intercept: null,
  
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

  strike: function(flyingObjects, accuracy){
    var lineIntercept = this.intercept;
    var lineGradient = this.gradient;
    this.drawLine();
    $.each(flyingObjects, function(index, flyingObject){
      var x = flyingObject.physicalBody.offset().left;
      var y = flyingObject.physicalBody.offset().top;
      var striked = (y + lineIntercept) / lineGradient;
      (Math.abs(striked - x) < accuracy) ? console.log("Dead cat!") : console.log("miss! " + (striked-x));
    })
  },

  drawLine: function() {
    var c = $("#canvas")[0];
    var ctx = c.getContext("2d");
    ctx.moveTo(this.upperEnd.left + 15,0);
    ctx.lineTo(this.lowerEnd.left + 15,300);
    ctx.lineWidth = 10;
    // ctx.strokeStyle = 'red';
    ctx.stroke();
  }
}