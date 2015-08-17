var ac = new AudioContext();
var tempo = 120;

var simon = {
 health: 100,

 octave: 3,
 moves: [],
 health: 100,
    
 blue: document.getElementById("blue"),
 red: document.getElementById("red"),
 green: document.getElementById("green"),
 yellow: document.getElementById("yellow"),
 centerCircle: document.getElementById("circle"),
    
    
 init: function() {
    this.blue.onclick = padClicked;
    this.red.onclick = padClicked;
    this.green.onclick = padClicked;
    this.yellow.onclick = padClicked;
 },
        
newMove: function() {
    var potentialMoves = ["blue", "red", "green", "yellow"];
    this.moves.push(potentialMoves[Math.floor(Math.random() * 4)]);
},

presentMoves: function(){
    player.currentMove = 0;
    var i = 0;
    var that = this;
    var interval = setInterval(function() {
        if (i >= that.moves.length) {
            clearInterval(interval);
            that.clearPads()
        }
        that.clearPads();

        switch (that.moves[i]) {
            case "blue":
                playNote('E', that.octave, 'q');
                that.blue.className = that.blue.className + " lit";
                break;
            case "red":
                playNote('A', that.octave, 'q');
                red.className = red.className + " lit";
                break;
            case "green":
                playNote('E', that.octave - 1, 'q');
                that.green.className = that.green.className + " lit";
                break;
            case "yellow":
                playNote('C#', that.octave, 'q');
                that.yellow.className = that.yellow.className + " lit";
                break;
        }
        i++;

    }, that.health*6);

},
clearPads: function() {
    this.blue.className = "tile";
    this.red.className = "tile";
    this.green.className = "tile";
    this.yellow.className = "tile";
}

    
}

var player = {
    currentMove: 0,
    goingReverse: false,
    lives: 3,
    livesDiv: document.getElementById("lives"),
    
}

function padClicked(event) {
    padClicked = event.target.id;
    simon.clearPads();
    
    if (simon.moves[player.currentMove] == padClicked || simon.moves[simon.moves.length - player.currentMove - 1] == padClicked) {
        if (simon.moves[simon.moves.length - player.currentMove - 1] == padClicked)
        {
            player.goingReverse = true;
        }
        else
        {
            player.goingReverse = false;   
        }
        switch (padClicked) {
            case "blue":
                playNote('E', simon.octave, 'q');
                simon.blue.className = simon.blue.className + " lit";
                break;
            case "red":
                playNote('A', simon.octave, 'q');
                simon.red.className = simon.red.className + " lit";
                break;
            case "green":
                playNote('E', simon.octave - 1, 'q');
                simon.green.className = simon.green.className + " lit";
                break;
            case "yellow":
                playNote('C#', simon.octave, 'q');
                simon.yellow.className = simon.yellow.className + " lit";
                break;
        }
        player.currentMove++;

        if (player.currentMove >= simon.moves.length) {
            setTimeout(function() {
                if (player.goingReverse)
                {
                    simon.health -= simon.moves.length;
                    if (simon.health <= 0)
                    {
                        alert("You win!");
                        newGame();
                    }
                }
                updateUI();
                simon.newMove();
                simon.presentMoves();

            }, 100);
        }
    } else {
        simon.moves = [];
        player.currentMove = 0;
        player.lives -= 1;
        updateUI();
        playNote("F#", "1", 'q');
        if (player.lives < 0)
        {
         alert("You Lose!");
         newGame();
        }
        else
        {
        
            setTimeout(function() {
                simon.newMove();
                simon.presentMoves();

            }, 400);
        }
    }

}

function newGame() {
    simon.moves = [];
    simon.health = 100;
    player.currentMove = 0;
    player.lives = 3;
    
    updateUI();
    
    //
    simon.newMove();
    simon.presentMoves();
}

function playNote(note, octave, length) {
    var sequence = new Sequence(ac, tempo, [note + octave + " " + length]);
    sequence.loop = false;
    sequence.play();
}

function updateUI(){
    player.livesDiv.innerHTML = "Lives: " + player.lives;
    simon.centerCircle.innerHTML = simon.health;

}

simon.init();
newGame();