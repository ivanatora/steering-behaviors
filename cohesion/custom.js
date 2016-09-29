width = view.size.width;
height = view.size.height;
frame_every = 2;

active_movers = [];

close_distance = 100;
too_close_distance = 50;

run = true;

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

$(document).ready(function(){
    setup();

    $('#new').click(function(e){
        e.preventDefault();

        var x = Math.floor(Math.random() * width);
        var y = Math.floor(Math.random() * height);
        var mover = new Mover(new Point(x, y));
        active_movers.push(mover)
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