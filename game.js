//Audio stuff
var ac = new AudioContext();
var tempo = 120;
var octave = 3;
var blueNote = new Note('E4 q');
var redNote = new Note('A4 q');
var greenNote = new Note('E3 q');
var yellowNote = new Note('Cs4 q');
var sequence = new Sequence(ac, tempo);
function playNote(note, octave, length)
{
    var sequence = new Sequence(ac, tempo, [note+octave+" "+length]);
    sequence.loop = false;
    sequence.play();
}

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
playerCurrentMove = 0;
newMove = function () {
    potentialMoves = ["blue","red","green","yellow"];
    moves.push(potentialMoves[Math.floor(Math.random() * 4)]);
}

function simonIntroduction()
{
    var sequence = new Sequence(ac, tempo, ['E4 q', 'A4 q', 'E3 q', 'C#4 q']);
    sequence.loop = false;
    sequence.play();
    
    playNote('E','3','w');
    playNote('A','3','w');
    playNote('E','2','w');
    playNote('C#','3','w');        
}

presentMoves = function () {
    playerCurrentMove = 0;
    var i = 0;
    var interval = setInterval(function () {
        if (i >= moves.length) {
            clearInterval(interval);
            blue.className = "tile";
            red.className = "tile";
            green.className = "tile";
            yellow.className = "tile";
        }
        blue.className = "tile";
        red.className = "tile";
        green.className = "tile";
        yellow.className = "tile";
        
            switch (moves[i]) {
                case "blue":
                    playNote('E',octave,'q');
                    blue.className = blue.className + " lit";
                    break;
                case "red":
                    playNote('A',octave,'q');
                    red.className = red.className + " lit";
                    break;
                case "green":
                    playNote('E',octave-1,'q');
                    green.className = green.className + " lit";
                    break;
                case "yellow":
                    playNote('C#',octave,'q');
                    yellow.className = yellow.className + " lit";
                    break;
            }
        i++;

    }, 600);

}


function padClicked(event)
{
    padClicked = event.target.id;
    blue.className = "tile";
    red.className = "tile";
    green.className = "tile";
    yellow.className = "tile";  
    
    if (moves[playerCurrentMove] == padClicked)
    {
        switch (padClicked) {
                case "blue":
                    playNote('E',octave,'q');
                    blue.className = blue.className + " lit";
                    break;
                case "red":
                    playNote('A',octave,'q');
                    red.className = red.className + " lit";
                    break;
                case "green":
                    playNote('E',octave-1,'q');
                    green.className = green.className + " lit";
                    break;
                case "yellow":
                    playNote('C#',octave,'q');
                    yellow.className = yellow.className + " lit";
                    break;
        }
        playerCurrentMove++;
    
        if (playerCurrentMove >= moves.length)
        {
            setTimeout(function(){
            newMove();
            presentMoves();}, 100);
        }
    }
    else
    {
        moves = [];
        playerCurrentMove = 0; 
        playNote("F#","1",'q');
        setTimeout(function(){
            newMove();
            presentMoves();}, 400);
    }
    

}

//simonIntroduction();
newMove();
presentMoves();
