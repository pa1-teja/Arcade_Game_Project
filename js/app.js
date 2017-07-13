var noOfGamesWon = 0;
var noOfGamesLost = 0;
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // Update all the enemies  
    this.x = this.x + (this.speed * dt);
    if (this.x > 400) {
        this.x = 0;
    }
    return this.x;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
var Player = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.collosionOccurenceCheck();
    this.distanceCheck();
};

Player.prototype.playerBoundries = function() {
    
    if (this.x < 0 || this.x > 400) {
        if (this.x < 0) {
            this.x = 0;
        } else {
            this.x = 400;
        }
    }
    
    if (this.y < 0 || this.y > 520) {
        if (this.y < 0) {
            this.y = 0;
        } else {
            this.y = 520;
        }
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

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

Player.prototype.Restart = function() {
    this.x = 200;
    this.y = 320;
};

Player.prototype.gameUp = function() {
        this.Restart();
};

Player.prototype.collosionOccurenceCheck = function() {
    for (var i = 0; i < allBugs.length; i++) {
        if (this.x < allBugs[i].x + 75 && this.x + 65 > allBugs[i].x && this.y < allBugs[i].y + 50 && 70 + this.y > allBugs[i].y) {
            noOfGamesLost++;
            console.log("Games Lost : " + noOfGamesLost);
            this.scoreUpdate();
            this.Restart(); 
        }
    }
};

Player.prototype.distanceCheck = function() {
    if (this.y === 0) { 
         noOfGamesWon++;
         console.log("games_won : " + noOfGamesWon);
         this.scoreUpdate();
        this.Restart(); 
    }
};


Player.prototype.scoreUpdate = function() {
     document.getElementsByClassName('games_won')[0].innerHTML = 'Games Won: ' + noOfGamesWon;
     document.getElementsByClassName('games_lost')[0].innerHTML = 'Games Lost: ' + noOfGamesLost;
};


var allBugs = [];
var e1 = new Enemy(10, 70, 300);
var e2 = new Enemy(10, 150, 170);
var e3 = new Enemy(10, 230, 220);


var allBugs = [e1, e2, e3];


// Place the player object in a variable called player
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