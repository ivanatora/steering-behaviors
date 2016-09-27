width = view.size.width;
height = view.size.height;
frame_every = 2;
w = 10;
grid = [];
active_movers = [];
mouse_position = null;

slowing_distance = 100;

run = true;

threshold_shape = new Path.Circle({
    center: new Point(0, 0),
    radius: slowing_distance,
    strokeColor: 'red',
    strokeWidth: 4,
    fillColor: rgba(255, 255, 255, 0.3)
});

function setup(){

}

function onFrame(event) {
    if (run == false) return; // play-pause
    if (event.count % frame_every != 0) return; // 1 frame per X seconds

    for (var i = 0; i < active_movers.length; i++){
        active_movers[i].update();
    }
}

function onMouseDown(event){
    var mover = new Mover(event.point);
    active_movers.push(mover)
}

function onMouseDrag(event){
    var point = event.point;
    if (point.x > width || point.x < 0 || point.y < 0 || point.y > height){
        return;
    }
    var mover = new Mover(point);
    active_movers.push(mover)
}

function onMouseMove(event){
    mouse_position = event.point;

    threshold_shape.position = mouse_position;
}

$(document).ready(function(){
    setup();

    $('#new').click(function(e){
        e.preventDefault();

        var x = Math.floor(Math.random() * width);
        var y = Math.floor(Math.random() * height);
        var mover = new Mover(new Point(x, y));
        active_movers.push(mover)
    })
})