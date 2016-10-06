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
        // if target is reached, select new random target
        if (! this.target){
            var x = Math.floor(Math.random() * width);
            var y = Math.floor(Math.random() * height);
            this.target = new Point(x, y);
        }

        desired_velocity = this.target - this.position;

        if (active_leaders.length > 0){
            // find local leaders
            var closest_leader = active_leaders[0];
            var closest_leader_distance = this.position.getDistance(closest_leader.position);

            for (var i = 1; i < active_leaders.length; i++){
                var this_leader_distance = this.position.getDistance(active_leaders[i].position);
                if (this_leader_distance < closest_leader_distance){
                    closest_leader = active_leaders[i];
                    closest_leader_distance = this_leader_distance;
                }
            }

            if (closest_leader_distance < mover_vision) {

                // if mover is close, in front of the leader, move out of the way
                var vec_leader_mover = this.position - closest_leader.position;

                var delta_angle = Math.abs(vec_leader_mover.angle - closest_leader.velocity.angle);
                if (delta_angle < 45 && closest_leader_distance < avoid_leaders_distance) {
                    this.shape.fillColor = 'yellow';

                    desired_velocity = closest_leader.position + closest_leader.velocity;
                }
                else {
                    this.shape.fillColor = 'red';
                    var target_behind_leader = closest_leader.velocity.rotate(180);
                    target_behind_leader.length = 40;
                    target_behind_leader = closest_leader.position + target_behind_leader;
                    var vec_to_target_behind = target_behind_leader - this.position;
                    var distance_to_target_behind = this.position.getDistance(target_behind_leader);

                    if (distance_to_target_behind < slowing_distance) { // ariving
                        var ramped_speed = this.max_velocity * (distance_to_target_behind / slowing_distance);
                        var clipped_speed = Math.min(ramped_speed, this.max_velocity);
                        desired_velocity = vec_to_target_behind * (clipped_speed / distance_to_target_behind);
                        desired_velocity = desired_velocity - this.velocity;
                    }
                    else { // moving normally
                        desired_velocity = target_behind_leader - this.position;
                    }
                }
            }
        }

        // lets put small repulsive force between movers
        var repuslive_force = new Point(0, 0);
        var cnt_swarm = 0;
        for (var i = 0; i < active_movers.length; i++){
            if (active_movers[i] == this) continue;
            var dist = this.position.getDistance(active_movers[i].position);
            if (dist < swarm_closest_distance){
                repuslive_force.x += active_movers[i].position.x;
                repuslive_force.y += active_movers[i].position.y;
                cnt_swarm++;
            }
        }
        if (cnt_swarm > 0){
            repuslive_force.x /= cnt_swarm;
            repuslive_force.y /= cnt_swarm;
            // repuslive_force.length = -30;
            repuslive_force = this.position - repuslive_force;
            this.applyForce(repuslive_force);
        }

        var delta_angle = this.angle - desired_velocity.angle;
        this.shape.rotate(-delta_angle);
        this.angle = desired_velocity.angle;

        this.applyForce(desired_velocity);

        this.velocity = this.velocity + this.acceleration;
        if (this.velocity.length > this.max_velocity){
            this.velocity.length = this.max_velocity;
        }
        this.acceleration.length = 0;
        this.position = this.position + this.velocity;

        this.constrainScreen();
        this.shape.position = this.position;


        if (this.position.getDistance(this.target) < 50){
            this.target = null; // destination reached
        }
    }

    this.constrainScreen = function(){
        if (this.position.x > width) this.position.x = 0;
        if (this.position.x < 0) this.position.x = width;
        if (this.position.y > height) this.position.y = 0;
        if (this.position.y < 0) this.position.y = height;
    }
}
