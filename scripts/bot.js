function Bot(props) {
    this.tank = new Tank(props) ;
    this.interval_id = 0 ;
}
var bot_proto = Bot.prototype ;
bot_proto.start = function() {
    this.interval_id = setInterval((function(){
        if(this.tank.removed) clearInterval(this.interval_id) ;
        var dir = this.getRandDir() ;
        this.tank.move(dir[0],dir[1]) ;
        this.tank.fire() ;
    }).bind(this),500) ;
};
bot_proto.getRandDir = function() {
    var r = Math.random(),
        x = 0,
        y = 0;
    if(r>0.5) {
        r = Math.random() ;
        if(r>0.5) {
            x = 1 ;
        } else {
            x = -1 ;
        }
    } else {
        r = Math.random() ;
        if(r>0.5) {
            y = 1 ;
        } else {
            y = -1 ;
        }
    }
    return [x,y] ;
} ;
