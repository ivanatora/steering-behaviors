window.Leader = function(point){
    this.position = point;
    this.acceleration = new Point(0, 0);
    this.velocity = new Point(0, 0);

    this.max_velocity = 3;
    this.angle = 0;
    this.target = null;

    this.shape = new Path({
        segments: [[-7, -7], [-7, 7], [14, 0]],
        fillColor: 'green'
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

        // observe the local neighboors, if any leaders found, flee from them
        var local_velocity = new Point(0, 0);
        var cnt_local_movers = 0;

        for (var i = 0; i < active_leaders.length; i++){
            if (active_leaders[i] == this) continue;
            var distance = active_leaders[i].position.getDistance(this.position);
            if (distance < close_distance){
                desired_velocity = this.position - active_leaders[i].position;

                // re-assign new target to prevent constant bumping into each other
                var x = Math.floor(Math.random() * width);
                var y = Math.floor(Math.random() * height);
                this.target = new Point(x, y);
            }
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
