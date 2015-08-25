var FlyingObject = FlyingObject || {};

FlyingObject = {

  id: null,
  origin: ["top", "left"],
  time: null,
  speed: null,
  direction: null,
  distance: null,
  physicalBody: null,

  morph: function(){
    return "object-"+ Math.ceil(Math.random()*9);
  },

  materialise: function(){
    var position = {top: this.origin[0], left: this.origin[1]}
    this.physicalBody = $("<div class='flying-object invisible "+this.morph()+"'></div>").attr("id","object-"+this.id);
    this.physicalBody.appendTo(".game-space");
    this.physicalBody.offset(position);
  },

  pickSpeed: function(){
    this.speed = (this.distance - this.origin[1]) / this.time;
    console.log("the speed is: " + this.speed);
    return this.speed;
  },

  pickDisplacement: function(maxDistance){
    this.direction = Math.floor(Math.random()*2);
    var randomDistance = Math.ceil(Math.random()*maxDistance);
    this.distance = this.direction ? (randomDistance + $(window).width()) : -randomDistance;
    console.log("the distance is: "+ this.distance);
    return this.distance;
  },

  fly: function(safeWord){
    this.distance -= this.speed;
    this.physicalBody.offset({left : this.distance});
    this.physicalBody.removeClass("invisible");
  } 
}