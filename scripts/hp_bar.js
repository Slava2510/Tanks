function HpBar(name , max , x , y) {
    this.name = name ;
    this.x = x ;
    this.y = y ;
    this.max = max ;
    this.current = max ;

    var div = document.createElement("div") ;
    document.documentElement.appendChild(div) ;
    $(div).css({
        left : x ,
        top : y ,
        width : "200px" ,
        height : "20px" ,
        position : "fixed" ,
        backgroundColor : "red" ,
        borderRadius : "5px" ,
        border : "solid 2px"
    }) ;

    var div2 = document.createElement("div") ;
    div2.innerHTML = name ;
    document.documentElement.appendChild(div2) ;
    $(div2).css({
        left : x ,
        top : y ,
        width : "200px" ,
        height : "20px" ,
        position : "fixed" ,
        textAlign : "center" ,
        borderRadius : "5px" ,
        border : "solid 2px" ,
        padding : "0" ,
        color : "white"
    }) ;
    this.div = div ;
    this.label = div2 ;

    this.hpChange = function(delta) {
        this.current+=delta ;
        $(this.div).css("width",(200*(this.current/this.max))) ;
        if(this.current<0) {
            this.label.innerHTML = this.name + " LOSE !" ;
            gameOver("GAME OVER ") ;
        }
    }
}