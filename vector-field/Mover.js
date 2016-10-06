window.Mover = function(point){
    this.position = point;

    this.angle = 0;

    this.shape = new Path({
        segments: [[-5, -5], [-5, 5], [10, 0]],
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
        
        // lets put small repulsive force between movers
        var repuslive_force = new Point(0, 0);
        var cnt_swarm = 0;
        for (var i = 0; i < active_movers.length; i++){
            if (active_movers[i] == this) continue;
            var dist = this.position.getDistance(active_movers[i].position);
            if (dist < swarm_closest_distance){
                repuslive_force.x += active_movers[i].velocity.x;
                repuslive_force.y += active_movers[i].velocity.y;
                cnt_swarm++;
            }
        }
        if (cnt_swarm > 0){
            repuslive_force.x /= cnt_swarm;
            repuslive_force.y /= cnt_swarm;
            repuslive_force.length = -30;
            force = force.аdd(repuslive_force);
        }

        var delta_angle = this.angle - force.angle;
        this.shape.rotate(-delta_angle);
        this.angle = force.angle;

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
