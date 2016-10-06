window.Mover = function(point){
    this.position = point;
    this.acceleration = new Point(0, 0);
    this.velocity = new Point(0, 0);
    this.max_velocity = 5;

    this.angle = 0;

    this.shape = new Path({
        segments: [[-5, -5], [-5, 5], [10, 0]],
        fillColor: 'red'
    })

    this.applyForce = function(force){
        this.acceleration = this.acceleration + force;
    }

    this.update = function(){
        var i = Math.floor(this.position.x / w);
        var j = Math.floor(this.position.y / w);
        var angle = map_range(grid[i][j], 0, 1, Math.PI, -Math.PI);
        var force = new Point(10, 0);
        force = force.rotate(degrees(angle));

        if (repulsion_enabled) {
            // lets put small repulsive force between movers
            var repuslive_force = new Point(0, 0);
            var cnt_swarm = 0;
            for (var i = 0; i < active_movers.length; i++) {
                if (active_movers[i] == this) continue;
                var dist = this.position.getDistance(active_movers[i].position);
                if (dist < swarm_closest_distance) {
                    repuslive_force.x += active_movers[i].position.x;
                    repuslive_force.y += active_movers[i].position.y;
                    cnt_swarm++;
                }
            }
            if (cnt_swarm > 0) {
                repuslive_force.x /= cnt_swarm;
                repuslive_force.y /= cnt_swarm;
                // repuslive_force.length = -10;
                repuslive_force = this.position - repuslive_force;
                this.applyForce(repuslive_force)
            }
        }

        var delta_angle = this.angle - force.angle;
        this.shape.rotate(-delta_angle);
        this.angle = force.angle;

        this.applyForce(force);

        // this.position = this.position + force;

        this.velocity = this.velocity + this.acceleration;
        if (this.velocity.length > this.max_velocity){
            this.velocity.length = this.max_velocity;
        }
        this.acceleration.length = 0;
        this.position = this.position + this.velocity;

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
