# Afro Samurai
the game that is like guitar heroes but not quite...
(current version was developed and tested in Chrome browser only)

Rules
The game randomly generates objects flying across the screen at various speed, and the aim is to strike through them when they align with one of the four slashing lines fixed onto the screen.

1. four slash lines are fixed onto the screen, with their end points marked with matching colours and trigger keys
2. when a trigger key is pressed on the keyboard, a strike will be made along the corresponding slash line and objects fall onto the line at the time will be destroyed
3. there is an optimal line which can strike through all objects on screen during any given turn, the more objects a strike slashes through, the more bonus points the player gets
4. a strike that does not hit any object will result in a loss of life, so will the lack of attempt to make a strike during a turn; three losses will result in game over


Technologies

Javascript, jQuery, HTML5, CSS, AnimateCss


Design

to model the flying objects which will align with the slashing line, use one of the slashing lines as an origin, then displace it following below rules:
  1.use the lower end of the slashing line as the centre
  2.it should take within a set interval of time for the displacement to realign with the slashing line, e.g. 0.5 < t < 3 seconds, i.e. choose a time from the interval randomly, which should determine the "speed" of the flying object(s)
  3.randomly choose a "y" coordinate from within the displaced line as the fixed "height" of the object, display the flying object image at this height, and it should move along the displaced line as it moves across the screen
  4.when the player press a key, the corresponding slashing line is highlighted, the coordinate of the flying objects are checked against the slashing line, if it lies one the slashing line, it is slashed and points won, objects slashed all in one go gains bonus, complete misses gets punished
  5.the displayed flying object will therefore has a randomly chosen fixed height (y), lies on a line that has a changing gradient according to angularSpeed * t, and hence an x coordinate at a given time of y/gradient
