var map = {
    blocks : [] ,
    paths : [] ,
    x_length : 0 ,
    y_length : 0 ,
    x : 0 ,
    y : 0 ,
    size : 0 ,
    tanks : [] ,
    create : function(mapArr , paths) {
        this.x_length = mapArr[0].length ;
        this.y_length = mapArr.length ;
        var s = Block.size = this.getClientHeight()/this.x_length-10 ;
        var clientW = this.getClientWidth() ;
        for (var i=0 ; i<this.x_length ; i++) {
            this.blocks[i] = [] ;
            for (var j=0 ; j<this.y_length ; j++) {
                this.blocks[i][j] = new Block({
                    imgSrc : paths[mapArr[j][i]] ,
                    type : mapArr[j][i] ,
                    x : (i+1)*(s-1)+clientW/2-s*(this.x_length/2+1) ,
                    y : (j+1)*(s-1)
                }) ;
            }
        }
        this.x = (s-1)+clientW/2-s*(this.x_length/2+1) ;
        this.y = s-1 ;
        this.size = Block.size*this.x_length ;
    },
    getBlock : function(x ,y) {
        x-=this.x ;
        y-=this.y ;
        return this.blocks[parseInt(x/Block.size)][parseInt(y/Block.size)] ;
    } ,
    getBlocksInArea : function(x ,y) {
        var blocks = [] ;
        x-=this.x ;
        y-=this.y ;
        var x_index = parseInt(x/Block.size) ;
        var y_index = parseInt(y/Block.size) ;
        for(var i=-1 ; i<2 ; i++) {
            for (var j=-1 ; j<2 ; j++) {
                if(x_index+i>=0 && y_index+j>=0 && x_index+i<map.x_length && y_index+j<map.y_length) {
                    blocks.push(this.blocks[x_index+i][y_index+j]) ;
                }
            }
        }
        return blocks ;
    } ,
    isInMap : function (x,y) {
        if(arguments.length == 1) {
            var map_x = this.x+Block.size ;
            var map_y = this.y+Block.size ;
            var map_size = this.size - 2*Block.size-5 ;
            return !!Block.cross(x, {
                x: map_x,
                y: map_y,
                size: map_size
            });
        } else {
            return !!Block.inBlock(x, y, {
                x: this.x,
                y: this.y,
                size: this.size-10
            });
        }
    } ,
    getClientWidth : function() {
        return document.documentElement.clientWidth || document.body.clientWidth ;
    } ,
    getClientHeight : function() {
        return document.documentElement.clientHeight || document.body.clientHeight ;
    }
} ;