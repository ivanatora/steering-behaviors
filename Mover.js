window.Mover = function(point){
    this.position = point;

    this.shape = new Path.Circle({
        center: this.position,
        radius: 5,
        fillColor: 'red'
    })


    this.update = function(){
        var i = Math.floor(this.position.x / w);
        var j = Math.floor(this.position.y / w);
        var angle = map_range(grid[i][j], 0, 1, Math.PI, -Math.PI);
        var force = new Point(10, 0);
        force = force.rotate(degrees(angle));

        this.position = this.position + force;

        this.constrainScreen();
        this.shape.position = this.position;
    }

    this.constrainScreen = function(){
        if (this.position.x > width) this.position.x = 0;
        if (this.position.x < 0) this.position.x = width;
        if (this.position.y > height) this.position.y = 0;
        if (this.position.y < 0) this.position.y = height;
    }
}
