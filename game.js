var ac = new AudioContext();
var tempo = 120;

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

presentMoves = function () {
    var i = 0;
    var interval = setInterval(function () {
        blue.className = "tile";
        red.className = "tile";
        green.className = "tile";
        yellow.className = "tile";
            switch (moves[i]) {
                case 1:
                    var sequence = new Sequence(ac, tempo, ['E4 q']);
                    sequence.loop = false;
                    sequence.play();
                    blue.className = blue.className + " lit";
                    break;
                case 2:
                    var sequence = new Sequence(ac, tempo, ['A4 q']);
                    sequence.loop = false;
                    sequence.play();
                    red.className = red.className + " lit";
                    break;
                case 3:
                    var sequence = new Sequence(ac, tempo, ['E3 q']);
                    sequence.loop = false;
                    sequence.play();
                    green.className = green.className + " lit";
                    break;
                case 4:
                    var sequence = new Sequence(ac, tempo, ['C#4 q']);
                    sequence.loop = false;
                    sequence.play();
                    yellow.className = yellow.className + " lit";
                    break;
            }
        i++;
        if (i >= moves.length) {
            clearInterval(interval);
        }
    }, 600);

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
