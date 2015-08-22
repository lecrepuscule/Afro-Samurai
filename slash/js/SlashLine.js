var SlashLine = SlashLine || {};

SlashLine = {

  id: null,
  definition : {
      upperEnd: null,
      lowerEnd: null,
      gradient: null,
      intercept: null
  },

  pickTime: function(timeRange){
    var time = (Number((Math.random()*(timeRange[1]-timeRange[0])).toFixed(0)) + timeRange[0]) / 5;
    console.log("time is: " + this.time);
    return this.time;
  },

  generateObjects: function(timeRange){
    var flyingObjects = [];
    var time = this.pickTime(timeRange);
    var numOfObjects = Math.ceil(Math.random()*4);
    for (i=1; i<= numOfObjects; i++){
      flyingObject = Object.creat(FlyingObject);
      flyingObject.id = i;
      flyingObject.time = time;
      flyingObject.pickDisplacement();
      flyingObject.pickSpeed();
      flyingObject.materialise;
      flyingObjects.push(flyingObject);
    }
  }


}