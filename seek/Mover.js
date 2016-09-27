window.Mover = function(point){
    this.position = point;
    this.acceleration = new Point(0, 0);
    this.velocity = new Point(0, 0);

    this.max_velocity = 5;

    this.shape = new Path.Circle({
        center: this.position,
        radius: 5,
        fillColor: 'red'
    })

    this.applyForce = function(force){
        this.acceleration = this.acceleration + force;
    }

    this.update = function(){
        var target_offset = null;
        var desired_velocity = null;
        var steering = null;
        if (! mouse_position){
            return;
        }

        target_offset = mouse_position - this.position;

        var distance = target_offset.length;
        if (distance < slowing_distance){ // arrival mode
            this.shape.fillColor = 'white';
            var ramped_speed = this.max_velocity * (distance / slowing_distance);
            var clipped_speed = Math.min(ramped_speed, this.max_velocity);

            desired_velocity = target_offset * (clipped_speed / distance);
            steering = desired_velocity - this.velocity;
        }
        else { // seek mode
            this.shape.fillColor = 'red';
            steering = target_offset;
        }


        this.applyForce(steering);

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
