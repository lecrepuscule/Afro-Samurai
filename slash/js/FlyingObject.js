var FlyingObject = FlyingObject || {};

FlyingObject = {

  id: null,
  origin: ["top", "left"],
  time: null,
  speed: null,
  direction: null,
  distance: null,
  body: null,

  materialise: function(){
    this.body = $("<div class='flying-object'></div>").attr("id",this.id);
    this.body.offset({top : this.origin[0], left : this.distance});
  },

  // pickTime: function(timeRange){
  //   this.time = (Number((Math.random()*(timeRange[1]-timeRange[0])).toFixed(0)) + timeRange[0]) / 5;
  //   console.log("time is: " + this.time);
  //   return this.time;
  // },

  pickSpeed: function(){
    this.speed = this.distance / this.time;
    console.log("speed is: " + this.speed);
    return this.speed;
  },

  pickDisplacement: function(maxDistance){
    this.direction = Math.floor(Math.random()*2);
    var randomDistance = (Number((Math.random()*maxDistance).toFixed(0));
    this.distance = direction ? randomDistance + ($(window).width - this.origin[1]) : -randomDistance - this.origin[1];
    return this.distance;
  },

  fly: function(){
    console.log("distance is " + this.distance);
    this.distance += (this.direction ? -this.speed : this.speed);
    this.body.offset({left : this.distance});
  } 
}