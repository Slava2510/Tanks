var TANK_PATHS = [
    "images/tank_yellow.png" ,
    "images/tank_blue.png" ,
    "images/tank_red.png" ,
    "images/tank_black.png",
    "images/tank_bot.png"
] ;

var MAP_BLOCKS_PATHS = [
    "images/ground.jpg",
    "images/grass.jpeg",
    "images/brick.jpg" ,
    "images/metal.png"
] ;

var MAP_1 = [[1,1,1,1,3,3,1,1,1,1],
             [1,1,0,0,0,0,0,0,1,1],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,2,2,2,0,0,0,0,0],
             [0,0,2,2,2,0,0,0,0,0],
             [0,0,0,0,0,2,2,2,0,0],
             [0,0,0,0,0,2,2,2,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,3,0,0,0,0,3,0,0],
             [0,0,3,0,0,0,0,3,0,0]] ;

var WASD_KEY_CODES = {
    left : 65 ,
    right : 68 ,
    up : 87 ,
    down : 83 ,
    fire : 32
} ;
var POINTERS_KEY_CODES = {
    left : 37 ,
    right : 39 ,
    up : 38 ,
    down : 40 ,
    fire : 17
} ;

var BOMB_SRC = "images/bomb.png" ;

var BLACK_LORD = {
    speed : 3 ,
    hp : 500 ,
    power : 150 ,
    imgSrc : TANK_PATHS[3]
} ;

var ANGEL = {
    speed : 5 ,
    hp : 300 ,
    power : 80 ,
    imgSrc : TANK_PATHS[1]
} ;

var DOMINATOR = {
    speed : 1 ,
    hp : 1000 ,
    power : 200 ,
    imgSrc : TANK_PATHS[2]
} ;

var RIPPER = {
    speed : 2 ,
    hp : 800 ,
    power : 120 ,
    imgSrc : TANK_PATHS[0]
} ;

var BOT = {
    speed : 2 ,
    hp : 500 ,
    power : 100 ,
    imgSrc : TANK_PATHS[4] ,
    type : "bot"
} ;

function gameOver(param) {
    $("#game_over h1").append(param) ;
    $("#game_over").show() ;
}

$("#input").val("Enter name !") ;
$("#input").focus(function(e) {
    $("#input").val("") ;
}) ;

