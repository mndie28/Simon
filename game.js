//Audio stuff
var ac = new AudioContext();
var tempo = 120;
var octave = 3;
var blueNote = new Note('E4 q');
var redNote = new Note('A4 q');
var greenNote = new Note('E3 q');
var yellowNote = new Note('Cs4 q');
var sequence = new Sequence(ac, tempo);

function playNote(note, octave, length) {
    var sequence = new Sequence(ac, tempo, [note + octave + " " + length]);
    sequence.loop = false;
    sequence.play();
}

//UI
livesDiv = document.getElementById("lives");
simonCircle = document.getElementById("circle");

//Pads
blue = document.getElementById("blue");
blue.onclick = padClicked;
red = document.getElementById("red");
red.onclick = padClicked;
green = document.getElementById("green");
green.onclick = padClicked;
yellow = document.getElementById("yellow");
yellow.onclick = padClicked;

//Simon
moves = [];
simonHealth = 50;
playerCurrentMove = 0;
playerGoingReverse = false;
playerLives = 3;

function newGame() {
    moves = [];
    simonHealth = 50;
    playerCurrentMove = 0;
    playerLives = 3;
    updateUI();
}

function newMove() {
    potentialMoves = ["blue", "red", "green", "yellow"];
    moves.push(potentialMoves[Math.floor(Math.random() * 4)]);
}

function simonIntroduction() {
    var sequence = new Sequence(ac, tempo, ['E4 q', 'A4 q', 'E3 q', 'C#4 q']);
    sequence.loop = false;
    sequence.play();

    playNote('E', '3', 'w');
    playNote('A', '3', 'w');
    playNote('E', '2', 'w');
    playNote('C#', '3', 'w');
}

function presentMoves() {
    playerCurrentMove = 0;
    var i = 0;
    var interval = setInterval(function() {
        if (i >= moves.length) {
            clearInterval(interval);
            clearPads()
        }
        clearPads();

        switch (moves[i]) {
            case "blue":
                playNote('E', octave, 'q');
                blue.className = blue.className + " lit";
                break;
            case "red":
                playNote('A', octave, 'q');
                red.className = red.className + " lit";
                break;
            case "green":
                playNote('E', octave - 1, 'q');
                green.className = green.className + " lit";
                break;
            case "yellow":
                playNote('C#', octave, 'q');
                yellow.className = yellow.className + " lit";
                break;
        }
        i++;

    }, simonHealth*6);

}

function clearPads() {
    blue.className = "tile";
    red.className = "tile";
    green.className = "tile";
    yellow.className = "tile";
}

function padClicked(event) {
    padClicked = event.target.id;
    clearPads();
    
    if (moves[playerCurrentMove] == padClicked || moves[moves.length - playerCurrentMove - 1] == padClicked) {
        if (moves[moves.length - playerCurrentMove - 1] == padClicked)
        {
            playerGoingReverse = true;
        }
        else
        {
            playerGoingReverse = false;   
        }
        switch (padClicked) {
            case "blue":
                playNote('E', octave, 'q');
                blue.className = blue.className + " lit";
                break;
            case "red":
                playNote('A', octave, 'q');
                red.className = red.className + " lit";
                break;
            case "green":
                playNote('E', octave - 1, 'q');
                green.className = green.className + " lit";
                break;
            case "yellow":
                playNote('C#', octave, 'q');
                yellow.className = yellow.className + " lit";
                break;
        }
        playerCurrentMove++;

        if (playerCurrentMove >= moves.length) {
            setTimeout(function() {
                if (playerGoingReverse)
                {
                    simonHealth -= moves.length;
                    if (simonHealth <= 0)
                    {
                        alert("You win!");
                        newGame();
                    }
                }
                updateUI();
                newMove();
                presentMoves();

            }, 100);
        }
    } else {
        moves = [];
        playerCurrentMove = 0;
        playerLives -= 1;
        updateUI();
        if (playerLives < 0)
        {
         alert("You Lose!");
         newGame();
        }
        playNote("F#", "1", 'q');
        setTimeout(function() {
            newMove();
            presentMoves();
            
        }, 400);
    }

}

function updateUI(){
    livesDiv.innerHTML = "Lives: " + playerLives;
    simonCircle.innerHTML = simonHealth;
}

//simonIntroduction();
updateUI();
newMove();
presentMoves();