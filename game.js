var ac = new AudioContext();
var tempo = 120;
var octave = 3;

var blueNote = new Note('E4 q');
var redNote = new Note('A4 q');
var greenNote = new Note('E3 q');
var yellowNote = new Note('Cs4 q');
var sequence = new Sequence(ac, tempo);

blue = document.getElementById("blue");
red = document.getElementById("red");
green = document.getElementById("green");
yellow = document.getElementById("yellow");

moves = [];
newMove = function () {
    moves.push(Math.floor(Math.random() * 4) + 1);
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
    var i = 0;
    var interval = setInterval(function () {
        blue.className = "tile";
        red.className = "tile";
        green.className = "tile";
        yellow.className = "tile";
            switch (moves[i]) {
                case 1:
                    playNote('E',octave,'q');
                    blue.className = blue.className + " lit";
                    break;
                case 2:
                    playNote('A',octave,'q');
                    red.className = red.className + " lit";
                    break;
                case 3:
                    playNote('E',octave,'q');
                    green.className = green.className + " lit";
                    break;
                case 4:
                    playNote('C#',octave,'q');
                    yellow.className = yellow.className + " lit";
                    break;
            }
        i++;
        if (i >= moves.length) {
            clearInterval(interval);
        }
    }, 600);

}

function playNote(note, octave, length)
{
    var sequence = new Sequence(ac, tempo, [note+octave+" "+length]);
    sequence.loop = false;
    sequence.play();
}

newMove();
newMove();
newMove();
newMove();
newMove();
newMove();
newMove();
newMove();
newMove();
newMove();
presentMoves();
//simonIntroduction();