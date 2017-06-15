# Escape Room
[Live website](https://srekhi.github.io/escape_room/)

Browser-based echolocation game built with HTML/CSS & Javascript.

## Story
The user is trapped in a dark room and must use echolocation to escape. Hitting the space bar allows the user to generate sound waves which bounce off of nearby obstacles and guide the user to the exit.

There's just one catch. Monsters are sleeping all across the map. If the user makes too much sound, the monster will wake up..hungry.



## Implementation
### Overview

  #### Game
  The Game object encapsulates all game logic, including keeping count of user's level and redrawing the board depending on the user's status (still in game play, eaten, or escaped):
  ```javascript
    //game.js
    step(){
      this.context.fillStyle = "black";
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.analyzeKeyMap();
      this.moveMonsters();
      this.board.draw();
      if (this.point.hasEscaped() || this.point.eaten) {
        this.point.hasEscaped() ? this.levelPassed(this.levelCount) : this.playerEaten(this.levelCount);
        this.resetKeyStatus();
        this.levelCount += 1;
        this.point = new Point(this.context, this.canvas, this.pointStartPos());
        this.board = new Board(this.context, this.canvas, this.point, this.walls());
        this.board.monsters = this.createMonsters();
      }
      requestAnimationFrame(this.step);
  }
  ```
  On average, requestAnimationFrame will be run 60 times per second. The game class runs the object initialization code and delegates rendering responsibilities to the Board class.

 #### Responsive Design
 In order to reach a broader audience, Escape Room was designed to resize for the user's browser. The startGame() function is run when the user loads escape room in the browser--> the HTML canvas width and height are then set accordingly to the body and height dimensions respectively.
 ```javascript
   //main.js
   const startGame = () =>{
    const body = document.getElementsByTagName('body')[0];
    const canvas = document.getElementById('canvas');
    canvas.width = body.offsetWidth;
    canvas.height = body.offsetHeight;
    const ctx = canvas.getContext("2d");
    const game = new Game(ctx, canvas, levelPassed, playerEaten);
    document.addEventListener("keydown", hideSplashText);
  };
 ```
 ```css
  /* main.css */
  body {
    height: 95vh;
    max-width: 800px;
    margin: 0 auto;
  }
 ```
  Additionally, all levels are constructed in scalar values and rendered by multiplying with the canvas width and height attributes.
  ```javascript
    //levels_structure.js
    const LEVELS = {
      1: {
        walls:
        [
            [0, 0, 0.55, 0.25],
            [0, 0.3, 0.7, 0.25],
            [0.25, 0, 0.4, 0.25],
            [0, 0, 0.02, 1],
            [0.8, 0, 0.01, 1]
        ],
        pointStartPos: [.1, .27],
        monsterPositions: [
          [0.61, 0.6],
          [0.9, 0.27]
        ]
      },
      2: {
        walls: [
          [0.0, 0.01, 1, 0.05],
          [0.0, 0.01, 0.01, 1],
          [0, 0.25, 0.8, 0.2],
          [0.6, 0.6, 0.4, 0.2],
          [0, 0.45, 0.4, 0.55],
          [0.4, 0.9, 0.2, 0.1],
          [0.9, 0, 0.2, 1]

        ],
        pointStartPos: [0.1, 0.1],
        monsterPositions: [
          [0.55, 0.55],
          [0.2, 0.1],
          [0.8, 0.92]
        ]
      }, ...
  ```

  ```javascript
 //board.js
   this.wallDimensions = scalarWallDimensions
        .map(row => {
          return row.map((dim, index) => {
            if (index % 2 === 0) {
              return dim * canvas.width;
            } else {
              return dim * canvas.height;
            }
          });
        });
   ```
  #### Sound
  When a user hits the space bar, their point emits sound rays (add video here). Sound ray logic is encompassed by the Ray class. The circular emission pattern was based off of unit circle calculations:

  ```javascript
      // ray.js
      const root3over2 = Math.sqrt(3)/2;
      const root2over2 = Math.sqrt(2)/2;

      Ray.DIRECTIONS = [
        [0, 1],
        [0.5, root3over2],
        [root2over2, root2over2],
        [root3over2, 0.5],
        [1, 0],
        [root3over2, -0.5],
        [root2over2, -root2over2],
        [0.5, -root3over2],
        [0, -1],
        [-0.5, -root3over2],
        [-root2over2, -root2over2],
        [-root3over2, -0.5],
        [-1, 0],
        [-root3over2, 0.5],
        [-root2over2, root2over2],
        [-0.5, root3over2],
      ];
  ```
  Escape room rays, like real-life sound rays, have two things in common: both reflect off of obstacles, and both fade away.

  #### Reflections
  If a sound ray's next position is going to result in a collision with one of the many walls on the level, they're reversed depending on three categories: whether the X, Y, or Z coordinates resulted in a collision:

  ```javascript
      //ray.js
      if (xCollision || yCollision || zCollision){
          if (xCollision){
            newXDir = -1 * this.xDir;
          }else if (yCollision){
            newYDir = -1 * this.yDir;
          }else {
            newXDir = -1 * this.xDir;
            newYDir = -1 * this.yDir;
          }
        const reflection = new Ray(this.c, this.lifespan - 1, this.head, newXDir, newYDir, this.board, this.fromMonster);
        this.xDir = 0;
        this.yDir = 0;
        return true;
      }
  ```
  Each ray has a max length & a body property. The body array contains each position along the ray's axis. To grow the ray, new positions are pushed onto the body array. Similarly, when a ray must be faded out, the first positions in the array are shifted off:

  ```javascript
     //ray.js
      fadeOut(){
        this.body.shift();
        this.tail = this.body[0];
      }
  ```

  To provide the ray's fading out visualization, HTML Canvas's createLinearGradient()  method was used.

  ```javascript
    //ray.js
    draw(){
      let gradient;
      if (this.grow()){
        this.c.beginPath();
        this.c.moveTo(this.tail[0], this.tail[1]);
        gradient = this.c.createLinearGradient(this.tail[0], this.tail[1], this.head[0], this.head[1]);
        if (this.fromMonster){
          gradient.addColorStop(0, '#3d0101');
          gradient.addColorStop(1, 'red');
        }else{
          gradient.addColorStop(0, '#808080');
          gradient.addColorStop(1, 'white');
        }
        this.c.strokeStyle = gradient;
        this.c.lineTo(this.head[0], this.head[1]);
        this.c.closePath();
        this.c.stroke();
      }
    }
  ```
  ### Monster AI
  Monster's are awakened if a user sound wave overlaps with their locations. Upon awakening, they generate deadly waves to capture the player. The monster moves toward the user based upon the unit vector delta between their respective positions:

  ```javascript
    //monster.js
    move(){
      let delta;
        if (this.awake){
         delta = [
           Math.ceil((this.board.point.pos[0] - this.pos[0])),
            Math.ceil((this.board.point.pos[1] - this.pos[1]))
          ];
          let deltaMagnitude = Math.sqrt(Math.pow(delta[0], 2) + Math.pow(delta[1], 2));
          let unitVector = delta.map(dir => dir/deltaMagnitude);
          let nextPos = this.pos.map((posDir, index) => posDir + unitVector[index]);
      }
  ```
### Future Directions
#### Collision-Check Efficiency
  Collision detection is an expensive operation. If there are just 100 objects that need to be checked for collisions, this results in 10,000 operations. A potential improvement on this front is the use of a [quadtreee algorithm](https://en.wikipedia.org/wiki/Quadtree) to pare down unnecessary collision checks.

#### Monster AI
  A real-life monster (not referring to the way I look in the morning) would traverse the obstacles in a more intelligent way. Currently, the monsters grab the differential between the player's position and their own, and move in the direction of the corresponding unit vector. A better approach would be to use a shortest-path finding algorithm, such as A\* search algorithm. Given that the entire HTML Canvas is displayed on a grid, this would be a feasible approach.
