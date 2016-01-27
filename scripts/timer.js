var timer = {
    id : 0 ,
    delay : 10 ,
    addFunc : function (fn,obj) {
        obj = obj || window ;
        this.funcs.push({
            fn : fn ,
            obj : obj
        }) ;
    } ,
    funcs : [] ,
    start : function() {
        if(!timer.id) {
            (function next(){
                if(timer.funcs.length>0) {
                    for (var i = 0; i < timer.funcs.length; i++) {
                        if (timer.funcs[i].fn.call(timer.funcs[i].obj) === false) {
                            timer.funcs.splice(i, 1);
                            i--;
                        }
                    }
                    timer.id = setTimeout(next,timer.delay) ;
                } else {
                    clearTimeout(timer.id) ;
                    timer.id = 0 ;
                }

            })() ;
        }
    }
} ;