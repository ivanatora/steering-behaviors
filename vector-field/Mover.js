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

        if (mouse_position && mouse_position.getDistance(this.position) < 50){
            var flee_vector = mouse_position.subtract(this.position);
            flee_vector.length = 10;
            force = force.subtract(flee_vector);
        }

        // for (var i = 0; i < active_movers.length; i++){
        //     if (active_movers[i] == this) continue;
        //
        //     var dist = this.position.getDistance(active_movers[i].position);
        //     if (dist < 10){
        //         var flee_vector = active_movers[i].position.subtract(this.position);
        //         flee_vector.length = 20;
        //         force = force.subtract(flee_vector);
        //     }
        // }

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
