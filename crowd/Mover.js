window.Mover = function(point){
    this.position = point;
    this.acceleration = new Point(0, 0);
    this.velocity = new Point(0, 0);

    this.max_velocity = 5;
    this.angle = 0;

    this.shape = new Path.Circle({
        center: this.position,
        radius: 20,
        strokeColor: 'red'
    })
    this.direction_shape = new Path.Line({
        from: this.position,
        to: this.position,
        strokeColor: 'green'
    });

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



        var delta_angle = this.angle - desired_velocity.angle;
        // this.shape.rotate(-delta_angle);
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

        // draw direction
        this.direction_shape.segments[0].point = this.position;
        this.direction_shape.segments[1].point.x = this.position.x + 20 * Math.cos(radians(this.angle));
        this.direction_shape.segments[1].point.y = this.position.y + 20 * Math.sin(radians(this.angle));
    }

    this.constrainScreen = function(){
        if (this.position.x > width) this.position.x = 0;
        if (this.position.x < 0) this.position.x = width;
        if (this.position.y > height) this.position.y = 0;
        if (this.position.y < 0) this.position.y = height;
    }
}
