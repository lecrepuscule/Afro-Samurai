var SoundEffect = SoundEffect || {};

SoundEffect = {

  currentSound: null,

  getSound: function(hit){
    var src = "sounds/"+hit+".mp3";
    console.log("sound src is " + src);
    this.currentSound = soundManager.createSound({
      id: hit,
      url: src
    })
    return this.currentSound;
  },

  play: function(hit){
    soundManager.stopAll();
    soundManager.destroySound(hit);
    var sound = this.getSound(hit);
    this.currentSound.play();
  }
}

