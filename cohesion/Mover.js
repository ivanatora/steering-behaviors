window.Mover = function(point){
    this.position = point;
    this.acceleration = new Point(0, 0);
    this.velocity = new Point(0, 0);

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
        var target = null;

        var local_center = new Point(0, 0);
        var cnt_local_movers = 0;

        for (var i = 0; i < active_movers.length; i++){
            if (active_movers[i] == this) continue;
            var distance = active_movers[i].position.getDistance(this.position);
            if (distance < close_distance && distance > too_close_distance){
                local_center.x += active_movers[i].position.x;
                local_center.y += active_movers[i].position.y;
                cnt_local_movers++;
            }
        }


        if (cnt_local_movers > 0){ // seek local center
            local_center.x = Math.floor(local_center.x / cnt_local_movers);
            local_center.y = Math.floor(local_center.y / cnt_local_movers);
            // console.log('local_center', local_center)

            target = local_center - this.position;
        }
        else { // random movement
            target = new Point(0, 10);
            var rand_angle = Math.random() * 360;
            target = target.rotate(rand_angle);
        }


        var delta_angle = this.angle - target.angle;
        this.shape.rotate(-delta_angle);
        this.angle = target.angle;


        this.applyForce(target);

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
