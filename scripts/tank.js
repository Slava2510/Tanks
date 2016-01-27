function Tank(props) {
    var img = document.createElement("img") ;
    img.src = props.imgSrc ;
    document.documentElement.appendChild(img) ;
    this.img = img ;
    this.hp = props.hp ;
    this.power = props.power ;
    $(this.img).css({
        "top" : (this.y=props.y) ,
        "left" : (this.x=props.x)
    }) ;
    $(this.img).css({
        "width" : Block.size
    }) ;
    this.id = props.id ;
    this.speed = props.speed;
    this.direction = [0,-1] ;
    this.moving = false ;
    this.bomb_ready = true ;
    this.hpChanged = new Function() ;
    this.anim_counter = 0 ;
    if(props.type) {
        this.type = props.type ;
    }
    if(props.name) {
        this.name = props.name ;
    }
}
var proto = Tank.prototype ;
proto.move = function(x_delta , y_delta) {
    //this.stop() ;
    this.moving = true ;
    this.direction = [x_delta ,y_delta] ;
    var img = $(this.img) ;
    var speed = this.speed ;
    var anim_id = ++this.anim_counter ;
    if(x_delta != 0) img.rotate({animateTo: 90*x_delta, duration: 100});
    if(y_delta > 0) img.rotate({animateTo: 180, duration: 100});
    if(y_delta < 0) img.rotate({animateTo: 0, duration: 100});

    timer.addFunc(function(){
        if(!this.moving) return false ;
        if(this.anim_counter!=anim_id) return false ;
        var old_x = parseInt(img.css("left")) ;
        var old_y = parseInt(img.css("top")) ;
        var new_x = old_x + x_delta*speed ;
        var new_y = old_y + y_delta*speed ;
        var inArea = map.getBlocksInArea(old_x+Block.size/2 , old_y+Block.size/2) ;
        for (var i=0, len=inArea.length ; i<len ; i++) {
            if((inArea[i].type==2 || inArea[i].type==3) && Block.cross(inArea[i],{
                    x:new_x ,
                    y:new_y
                })) return false ;
        }
        if(!map.isInMap({
                x : new_x ,
                y : new_y
            })) return false ;
        img.css({
            "left": new_x,
            "top" : new_y
        }) ;
    },this) ;
    timer.start() ;
} ;
proto.stop = function() {
    this.moving = false ;
} ;
proto.fire = function() {
    if(!this.bomb_ready) return ;
    this.bomb_ready = false ;
    var img = $(this.img) ;
    var x = parseInt(img.css("left")) ;
    var y = parseInt(img.css("top")) ;
    var dir = this.direction ;
    var bomb = new Bomb({
        x : x+Block.size*(1/2-1/8) ,
        y : y+Block.size*(1/2-1/8)
    });
    img = $(bomb.img) ;
    timer.addFunc(function() {
        var old_x = parseInt(img.css("left")) ;
        var old_y = parseInt(img.css("top")) ;
        var new_x = old_x + 10*dir[0] ;
        var new_y = old_y + 10*dir[1] ;
        img.css({
            "left": new_x,
            "top" : new_y
        }) ;
        if(!map.isInMap(new_x+Bomb.size/2 , new_y+Bomb.size/2)) {
            return stop() ;
        }
        if(map.getBlock(new_x+Bomb.size/2 , new_y+Bomb.size/2).type == 3) {
            return stop() ;
        }
        var b = map.getBlock(new_x+Bomb.size/2 , new_y+Bomb.size/2) ;
        if(b.type == 2) {
            b.type = 1 ;
            $(b.img).attr("src",MAP_BLOCKS_PATHS[0]) ;
            return stop() ;
        }
        for (var i=0 ; i<map.tanks.length ; i++) {
            var t = map.tanks[i] ;
            if(Block.cross({
                    x: new_x ,
                    y: new_y ,
                    size : Block.size/4
                } , {
                    x: parseInt($(t.img).css("left")) ,
                    y: parseInt($(t.img).css("top"))
                }) && t.id!=this.id && !t.removed) {
                if((this.type === "bot" && t.type !== "bot")||(this.type !== "bot" && t.type !== "bot")) {
                    t.hp -= this.power;
                    this.hpChanged(-this.power);
                }
                if(this.type !== "bot" && t.type === "bot") {
                    t.hp -= this.power;
                }
                if (t.hp < 0) {
                    t.remove();
                }
                return stop();
            }
        }

        function stop() {
            bomb.remove() ;
            return false ;
        }
    },this) ;
    timer.start() ;
    setTimeout((function(){
        this.bomb_ready = true ;
    }).bind(this),300) ;
} ;
proto.remove = function() {
    this.move = new Function() ;
    this.fire = new Function() ;
    this.removed = true ;
    $(this.img).remove() ;
    var bots_count = 0 ;
    var player_name ;
    var lose = false ;
    for(var i=0 ; i<map.tanks.length  ; i++) {
        var tank = map.tanks[i] ;
        if(tank.type=="bot" && !tank.removed) bots_count++ ;
        if(tank.name) player_name = tank.name ;
        if(tank.name && tank.removed) {
            player_name = tank.name ;
            lose = true ;
            break ;
        }
    }
    if(lose) {
        gameOver(player_name + " LOSE !") ;
        return ;
    }
    if(bots_count==0) gameOver(player_name + " WIN !") ;
} ;
