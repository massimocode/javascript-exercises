# Mars Rover Exercise
A new Mars Rover is to be landed by NASA on Mars.
You are responsible for developing an API that will allow the Rover to move around the planet.

To simplify navigation, the planet has been divided up into a grid.

The rover's position and location is represented by a combination of x and y co-ordinates
and a letter representing one of the four cardinal compass points.

An example position might be "0, 0, N", which means the rover is in the bottom left corner and facing North.
Assume that the square directly North from (x, y) is (x, y+1).

In order to control a rover, NASA sends a simple string of letters.
The only commands you can give the rover are 'F', 'B', 'L' and 'R'.

You must:
- Implement commands that move the rover forward/backward ('F', 'B'). The rover may only move forward/backward by one grid point, and must maintain the same heading.
- Implement commands that turn the rover left/right ('L', 'R'). These commands make the rover spin 90 degrees left or right respectively, without moving from its current spot.
- Implement wrapping from one edge of the grid to another. (Mars is a sphere after all).
- Implement obstacle detection before each move to a new square. If a given sequence of commands encounters an obstacle, the rover moves up to the last possible point and reports the obstacle.

Here is an example:
- Let's say that the rover is located at 0,0 facing North on a 100x100 grid.
- Given the command "FFRFF" would put the rover at 2,2 facing East.