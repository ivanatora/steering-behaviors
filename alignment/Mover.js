window.Mover = function(point){
    this.position = point;
    this.acceleration = new Point(0, 0);
    this.velocity = new Point(0, 0);
    this.target = null;

    this.max_velocity = 5;
    this.angle = 0;
    this.max_steer_angle = 20;

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

        // observe the local neighboors
        var local_velocity = new Point(0, 0);
        var cnt_local_movers = 0;

        for (var i = 0; i < active_movers.length; i++){
            if (active_movers[i] == this) continue;
            var distance = active_movers[i].position.getDistance(this.position);
            if (distance < close_distance && distance > too_close_distance){
                local_velocity.x += active_movers[i].position.x;
                local_velocity.y += active_movers[i].position.y;
                cnt_local_movers++;
            }
        }

        if (cnt_local_movers > 0){ // seek local center
            local_velocity.x = Math.floor(local_velocity.x / cnt_local_movers);
            local_velocity.y = Math.floor(local_velocity.y / cnt_local_movers);

            desired_velocity = local_velocity;
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
