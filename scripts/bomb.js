
function Bomb(props) {
    var img = document.createElement("img") ;
    img.src = BOMB_SRC ;
    document.documentElement.appendChild(img) ;
    this.img = img ;
    $(img).css({
        "top" : (this.y=props.y) ,
        "left" : (this.x=props.x)
    }) ;
    Bomb.size = Block.size/4 ;
    $(img).css({
        "width" : Bomb.size
    }) ;
    this.direction = [0,-1] ;
}
Bomb.prototype.remove = function() {
   this.img.parentNode.removeChild(this.img) ;
} ;
