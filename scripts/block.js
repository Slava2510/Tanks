function Block(props) {
    var img = document.createElement("img") ;
    img.src = props.imgSrc ;
    document.documentElement.appendChild(img) ;
    this.img = img ;
    this.type = props.type ;
    $(this.img).css({
        "top" : (this.y=props.y) ,
        "left" : (this.x=props.x)
    }) ;
    $(this.img).css({
        "width" : Block.size
    }) ;
    if(props.type==1) {
        $(this.img).css("zIndex",100) ;
    }
}
Block.inBlock = function(x, y, block) {
    var size = block.size || Block.size ;
    return (block.x <= x) && (x <= block.x + size) && (block.y <= y) && (y <= block.y + size) ;
} ;
Block.cross = function(b1 , b2) {
    var size = b1.size || Block.size ;
    var x = b1.x ;
    var y = b1.y ;
    if(Block.inBlock(x,y,b2)) return true ;
    x+=size ;
    y+=size ;
    if(Block.inBlock(x,y,b2)) return true ;
    x = b1.x ;
    if(Block.inBlock(x,y,b2)) return true ;
    y = b1.y ;
    x+=size ;
    if(Block.inBlock(x,y,b2)) return true ;
    return false ;
} ;