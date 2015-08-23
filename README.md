# homework_project1
the game that is like guitar heroes but not quite...


to model the flying objects which will align with the slashing line, use one of the slashing lines as an origin, then displace it following below rules:
  1.use the lower end of the slashing line as the centre
  2.it should take within a set interval of time for the displacement to realign with the slashing line, e.g. 0.5 < t < 3 seconds, i.e. choose a time from the interval randomly, which should determine the "speed" of the flying object(s)
  3.randomly choose a "y" coordinate from within the displaced line as the fixed "height" of the object, display the flying object image at this height, and it should move along the displaced line as it moves across the screen
  4.when the player press a key, the corresponding slashing line is highlighted, the coordinate of the flying objects are checked against the slashing line, if it lies one the slashing line, it is slashed and points won, objects slashed all in one go gains bonus, complete misses gets punished
  5.extra feature: add in an angular velocity during the displacement, angularSpeed = originalGradient / t; the chosen height for the objects to be displayed must have an initial x that is outside of the gaming tunnel; 
  the displayed flying object will therefore has a randomly chosen fixed height (y), lies on a line that has a changing gradient according to angularSpeed * t, and hence an x coordinate at a given time of y/gradient
