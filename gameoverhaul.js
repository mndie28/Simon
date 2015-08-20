var ac = new AudioContext();
var tempo = 120;


var simon = {
    health: 100,

    octave: 3,
    moves: [],
    health: 100,
    isPresenting: false,

    timeouts: [],

    blue: document.getElementById("blue"),
    red: document.getElementById("red"),
    green: document.getElementById("green"),
    yellow: document.getElementById("yellow"),
    centerCircle: document.getElementById("circle"),


    init: function()
    {
        this.blue.onclick = padClicked;
        this.red.onclick = padClicked;
        this.green.onclick = padClicked;
        this.yellow.onclick = padClicked;
    },

    intro: function()
    {
        this.isPresenting = true;
        var sequence = new Sequence(ac, tempo, ['E4 q', 'A4 q', 'E3 q', 'C#4 q']);
        sequence.loop = false;
        sequence.play();
        that = this;
        this.lightPad(this.blue);
        setTimeout(function()
        {
            that.clearPads();
            that.lightPad(that.red);
            setTimeout(function()
            {
                that.clearPads();
                that.lightPad(that.green);
                setTimeout(function()
                {
                    that.clearPads();
                    that.lightPad(that.yellow);
                    setTimeout(function()
                    {
                        that.clearPads();
                        that.isPresenting = false;
                    }, 400);
                }, 400);
            }, 400);
        }, 400);



        playNote('E', '3', 'w', .2);
        playNote('A', '3', 'w', .2);
        playNote('E', '2', 'w', .2);
        playNote('C#', '3', 'w', .2);
    },

    newMove: function()
    {
        var potentialMoves = ["blue", "red", "green", "yellow"];
        this.moves.push(potentialMoves[Math.floor(Math.random() * 4)]);
    },

    presentMoves: function()
    {
        player.currentMove = 0;
        var i = 0;
        var that = this;
        this.isPresenting = true;
        var interval = setInterval(function()
        {
            if (i >= that.moves.length)
            {
                clearInterval(interval);
                that.clearPads()
                that.isPresenting = false;
            }
            that.clearPads();

            switch (that.moves[i])
            {
                case "blue":
                    playNote('E', that.octave, 'q');
                    that.lightPad(that.blue);
                    break;
                case "red":
                    playNote('A', that.octave, 'q');
                    that.lightPad(that.red);
                    break;
                case "green":
                    playNote('E', that.octave - 1, 'q');
                    that.lightPad(that.green);
                    break;
                case "yellow":
                    playNote('C#', that.octave, 'q');
                    that.lightPad(that.yellow);
                    break;
            }
            i++;

        }, that.health * 6);

    },
    clearPads: function()
    {
        this.blue.className = "tile";
        this.red.className = "tile";
        this.green.className = "tile";
        this.yellow.className = "tile";
    },

    lightPad: function(pad)
    {
        pad.className = pad.className + " lit";
    }


}

var player = {
    currentMove: 0,
    goingReverse: false,
    lives: 3,
    livesDiv: document.getElementById("lives"),

}

function padClicked(event)
{
    if (simon.isPresenting == false)
    {
        padClicked = event.target.id;
        simon.clearPads();
        if (player.currentMove == 0)
        {
            if (simon.moves[simon.moves.length - 1] == padClicked)
            {
                player.goingReverse = true;
            }
            else
            {
                player.goingReverse = false;
            }
        }
        if ((simon.moves[player.currentMove] == padClicked && player.goingReverse == false) || (simon.moves[simon.moves.length - player.currentMove - 1] == padClicked && player.goingReverse == true))
        {

            switch (padClicked)
            {
                case "blue":
                    playNote('E', simon.octave, 'q');
                    simon.lightPad(simon.blue);
                    break;
                case "red":
                    playNote('A', simon.octave, 'q');
                    simon.lightPad(simon.red);
                    break;
                case "green":
                    playNote('E', simon.octave - 1, 'q');
                    simon.lightPad(simon.green);
                    break;
                case "yellow":
                    playNote('C#', simon.octave, 'q');
                    simon.lightPad(simon.yellow);
                    break;
            }
            player.currentMove++;

            if (player.currentMove >= simon.moves.length)
            {
                setTimeout(function()
                {
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

                }, 200);
            }
        }
        else
        {
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
                setTimeout(function()
                {
                    simon.newMove();
                    simon.presentMoves();

                }, 400);
            }
        }
    }

}

function newGame()
{
    simon.moves = [];
    simon.health = 100;
    player.currentMove = 0;
    player.lives = 3;

    updateUI();

    //
    simon.newMove();
    simon.presentMoves();
}

function playNote(note, octave, length, gain)
{
    if (gain === undefined)
        gain = 1.0;
    var sequence = new Sequence(ac, tempo, [note + octave + " " + length]);
    sequence.gain.gain.value = gain;
    sequence.loop = false;
    sequence.play();
}

function updateUI()
{
    player.livesDiv.innerHTML = "Lives: " + player.lives;
    simon.centerCircle.innerHTML = simon.health;
}

simon.intro();
setTimeout(function()
{
    simon.init();
    newGame();
}, 2200);