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

                    blue.className = blue.className + " lit";
                    break;
                case 2:
   
                    red.className = red.className + " lit";
                    break;
                case 3:

                    green.className = green.className + " lit";
                    break;
                case 4:

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
