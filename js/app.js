var noOfGamesWon = 0;
var noOfGamesLost = 0;


var Enemy = function(x, y, speed) {
  
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};


Enemy.prototype.update = function(dt) {
   
    this.x = this.x + (this.speed * dt);
    if (this.x > 400) {
        this.x = 0;
    }
    return this.x;
};


Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



var Player = function(x, y) {
  
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};


Player.prototype.update = function() {
   
    this.collisionOccurred();
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


Player.prototype.collisionOccurred = function() {
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

var player = new Player(200, 320);

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