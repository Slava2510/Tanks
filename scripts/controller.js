(function (){
    function Controller(keyCodes) {
        this.keyCodes = keyCodes ;
        this.keyDown = new Function() ;
        this.keyUp = new Function() ;
        this.keyFire = new Function() ;
        this.current = false ;
        this.upHandler = function(e){
            e.preventDefault() ;
            var con = this ;
            switch (e.keyCode) {
                case con.keyCodes.up :
                    if(this.current=="up") {
                        this.current = false ;
                        con.keyUp() ;
                    }
                    break ;
                case con.keyCodes.down :
                    if(this.current=="down") {
                        this.current = false ;
                        con.keyUp() ;
                    }
                    break ;
                case con.keyCodes.left :
                    if(this.current=="left") {
                        this.current = false ;
                        con.keyUp() ;
                    }
                    break ;
                case con.keyCodes.right :
                    if(this.current=="right") {
                        this.current = false ;
                        con.keyUp() ;
                    }
                    break ;
            }
        } ;
        this.downHandler = function(e) {
            e.preventDefault() ;
            var con = this ;
            if(e.keyCode == con.keyCodes.fire) con.keyFire() ;
            switch (e.keyCode) {
                case con.keyCodes.up :
                    if(this.current!= "up") {
                        this.current = "up" ;
                        this.keyDown(0, -1);
                    }
                    break ;
                case con.keyCodes.down :
                    if(this.current!= "down") {
                        this.current = "down" ;
                        this.keyDown(0, 1);
                    }
                    break ;
                case con.keyCodes.left :
                    if(this.current!= "left") {
                        this.current = "left" ;
                        this.keyDown(-1, 0);
                    }
                    break ;
                case con.keyCodes.right :
                    if(this.current!= "right") {
                        this.current = "right" ;
                        this.keyDown(1, 0);
                    }
                    break ;
            }
        } ;
    }

    function getController(keyCodes) {
        var con = new Controller(keyCodes) ;
        $(document).bind("keyup",con.upHandler.bind(con)) ;
        $(document).bind("keydown",con.downHandler.bind(con)) ;
        return con ;
    }

    window.getController = getController ;
})() ;