'use strict';
var noOfGamesWon = 0;
var noOfGamesLost = 0;

// Enemies setup
var Enemy = function(x, y) {
   // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.random()*150 + 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
     // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.   
    this.x = this.x + (this.speed * dt);
    if (this.x > 400) {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
var Player = function(x, y) {
  
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

// This class requires an update(), render().
Player.prototype.update = function() {
   
    this.collisionOccurred();
    this.distanceCheck();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// a handleInput() method.
Player.prototype.handleInput = function(direction) {

    switch (direction) {
        case "left":
            this.x -= 100;
            break;
        case "right":
            this.x += 100;
            break;
        case "up":
            this.y -= 100;
            break;
        case "down":
            this.y += 100;
            break;
    }
};


// mention the boundries for the player to be within.
Player.prototype.playerBoundries = function() {
    
    if (this.x < 0 || this.x > 400) {
        if (this.x < 0) {
            this.x = 0;
        } else {
            this.x = 400;
        }
    }
    
    if (this.y < 0 || this.y > 320) {
        if (this.y < 0) {
            this.y = 0;
        } else {
            this.y = 320;
        }
    }
};


// bring back the player to the starting position.
Player.prototype.restart = function() {
    this.x = 200;
    this.y = 320;
};

// check for the collision between the player and the bug.
Player.prototype.collisionOccurred = function() {
    for (var i = 0; i < allBugs.length; i++) {
        if (this.x < allBugs[i].x + 75 && this.x + 65 > allBugs[i].x && this.y < allBugs[i].y + 50 && 70 + this.y > allBugs[i].y) {
            noOfGamesLost++;
            console.log("Games Lost : " + noOfGamesLost);
            this.scoreUpdate();
            this.restart(); 
        }
    }
};

// check if the player reached the water and act accordingly.
Player.prototype.distanceCheck = function() {
    if (this.y === 0) { 
         noOfGamesWon++;
         console.log("games_won : " + noOfGamesWon);
         this.scoreUpdate();
        this.restart(); 
    }
};

// update the score on the screen
Player.prototype.scoreUpdate = function() {
     document.getElementsByClassName('games_won')[0].innerHTML = 'Games Won: ' + noOfGamesWon;
     document.getElementsByClassName('games_lost')[0].innerHTML = 'Games Lost: ' + noOfGamesLost;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allBugs
// Place the player object in a variable called player
var allBugs = [];
var e1 = new Enemy(10, 70, 300);
var e2 = new Enemy(10, 150, 170);
var e3 = new Enemy(10, 230, 220);


var allBugs = [e1, e2, e3];

var player = new Player(200, 320);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
    player.playerBoundries();
});