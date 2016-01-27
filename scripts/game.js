$("#single").click(function(){
    $("#name , #control").show() ;
    $("#menu").hide() ;
    var player_name ;
    var tank ;
    $("#input").keydown(function (e) {
        if (e.keyCode == 13 && $("#input").val() != "") {
            player_name = $("#input").val();
            $("#name , #control").hide() ;
            $("#tank_menu").show() ;
        }
    });
    $(".img").click(function(e) {
        tank = window[$(this).attr("id")];
        tank.name = player_name;
        tank.id = 0 ;
        $("#tank_menu").hide() ;
        $("body").css("background","rgb(19,45,72)") ;
        startSingleGame(tank) ;
    }) ;

    function startSingleGame(t) {
        map.create(MAP_1 , MAP_BLOCKS_PATHS) ;
        t.x = map.blocks[1][2].x ;
        t.y = map.blocks[1][2].y ;
        var tank = new Tank(t) ;
        map.tanks.push(tank) ;
        var hp_bar = new HpBar(t.name , t.hp ,map.x,10) ;
        for (var i=0 ; i<3 ; i++) {
            BOT.x = map.blocks[7+i][5+i].x ;
            BOT.y = map.blocks[7+i][5+i].y ;
            BOT.id = i+1 ;
            var bot = new Bot(BOT) ;
            map.tanks.push(bot.tank) ;
            bot.start() ;
            bot.tank.hpChanged = function(d) {
                hp_bar.hpChange(d) ;

            } ;
        }
        var controller = getController(WASD_KEY_CODES) ;
        controller.keyDown = function(d_x , d_y) {
            tank.move(d_x,d_y) ;
        } ;
        controller.keyUp = function() {
            tank.stop() ;
        } ;
        controller.keyFire = function() {
            if(map.tanks.length === 1) hp_bar.label.innerHTML="You Win" ;
            tank.fire() ;
        } ;
    }
});

$("#multi").click(function(){
    $("#name ,#control").show() ;
    $("#menu").hide() ;
    var player1_name ;
    var player2_name ;
    var tank1 ;
    var tank2 ;
    $("#input").keydown(function (e) {
        if (e.keyCode == 13 && $("#input").val() != "") {
            if(!player2_name && !player1_name) {
                player1_name = $("#input").val();
                $("#input").val("Enter name !") ;
            } else {
                player2_name = $("#input").val();
            }
            $("#name ,#control").hide() ;
            $("#control img").attr("src","images/pointers.png") ;
            $("#tank_menu").show() ;
        }
    });
    $(".img").click(function(e) {
        if (!tank1 && !tank2) {
            tank1 = window[$(this).attr("id")];
            tank1.name = player1_name;
            tank1.x = 500;
            tank1.y = 400;
            tank1.id = 0 ;
            $("#tank_menu").hide() ;
            $("#name , #control").show() ;
        } else {
            tank2 = window[$(this).attr("id")];
            tank2.name = player2_name;
            tank2.x = 400;
            tank2.y = 400;
            tank2.id = 1 ;
            $("#tank_menu").hide() ;
            $("body").css("background","rgb(19,45,72)") ;
            startMultiGame(tank1 , tank2) ;
        }
    }) ;

    function startMultiGame(t1 , t2) {
        map.create(MAP_1 , MAP_BLOCKS_PATHS) ;
        t1.x = map.blocks[1][2].x ;
        t1.y = map.blocks[1][2].y ;

        t2.x = map.blocks[9][8].x ;
        t2.y = map.blocks[9][8].y ;

        var tank1 = new Tank(t1) ;
        var tank2 = new Tank(t2) ;
        map.tanks.push(tank1) ;
        map.tanks.push(tank2) ;
        var hp_bar1 = new HpBar(t1.name , t1.hp ,map.x,10) ;
        tank1.hpChanged = function(d) {
           hp_bar2.hpChange(d) ;
        } ;

        var hp_bar2 = new HpBar(t2.name , t2.hp ,map.x+map.size-200,10) ;
        tank2.hpChanged = function(d) {
            hp_bar1.hpChange(d) ;
        } ;

        var controller1 = getController(WASD_KEY_CODES) ;
        controller1.keyDown = function(d_x , d_y) {
            tank1.move(d_x,d_y) ;
        } ;
        controller1.keyUp = function() {
            tank1.stop() ;
        } ;
        controller1.keyFire = function() {
            tank1.fire() ;
        } ;

        var controller2 = getController(POINTERS_KEY_CODES) ;
        controller2.keyDown = function(d_x , d_y) {
            tank2.move(d_x,d_y) ;
        } ;
        controller2.keyUp = function() {
            tank2.stop() ;
        } ;
        controller2.keyFire = function() {
            tank2.fire() ;
        }
    }
});

$("#about").click(function(){
    $("#about_info").show() ;
}) ;