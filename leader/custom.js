width = view.size.width;
height = view.size.height;
frame_every = 2;
w = 10;
grid = [];
active_movers = [];
active_leaders = [];
mouse_position = null;

mover_vision = 100;
close_distance = 150;
slowing_distance = 10;
avoid_leaders_distance = 70;
swarm_closest_distance = 30;

run = true;

function setup(){

}

function onFrame(event) {
    if (run == false) return; // play-pause
    if (event.count % frame_every != 0) return; // 1 frame per X seconds

    for (var i = 0; i < active_movers.length; i++){
        active_movers[i].update();
    }

    for (var i = 0; i < active_leaders.length; i++){
        active_leaders[i].update();
    }
}

function onMouseDown(event){
    var mover = new Mover(event.point);
    active_movers.push(mover);
    $('#current-number-movers').html(active_movers.length);
}

function onMouseDrag(event){
    var point = event.point;
    if (point.x > width || point.x < 0 || point.y < 0 || point.y > height){
        return;
    }
    var mover = new Mover(point);
    active_movers.push(mover);
    $('#current-number-movers').html(active_movers.length);
}

function onMouseMove(event){
    mouse_position = event.point;

}

$(document).ready(function(){
    setup();

    $('#new').click(function(e){
        e.preventDefault();

        var x = Math.floor(Math.random() * width);
        var y = Math.floor(Math.random() * height);
        var mover = new Mover(new Point(x, y));
        active_movers.push(mover);
        $('#current-number-movers').html(active_movers.length);
    })

    $('#new-leader').click(function(e){
        e.preventDefault();

        var x = Math.floor(Math.random() * width);
        var y = Math.floor(Math.random() * height);
        var leader = new Leader(new Point(x, y));
        active_leaders.push(leader);
        $('#current-number-leaders').html(active_leaders.length);
    })

    $('#play').click(function(e){
        e.preventDefault();
        run = true;
    })

    $('#pause').click(function(e){
        e.preventDefault();
        run = false;
    })
})