width = view.size.width;
height = view.size.height;
frame_every = 2;
w = 20;
grid = [];
active_movers = [];

run = true;


function setup(){
    noise.seed(Math.random());
    for (var i = 0; i < width; i += w){
        var col = [];
        for (var j = 0; j < height; j += w){
            noise_level = noise.perlin2(i/width, j/height);
            noise_level = map_range(noise_level, -1, 1, 0, 1);
            col.push(noise_level);
        }
        grid.push(col);
    }

    for (var i = 0; i < grid.length; i++){
        for (var j = 0; j < grid[i].length; j++){
            var pos = new Path.Circle({
                center: [i * w, j * w],
                radius: 2,
                strokeColor: 'white'
            });
            var angle = map_range(grid[i][j], 0, 1, Math.PI, -Math.PI);

            var arrow = new Path.Line({
                from: pos.position,
                to: [pos.position.x + 10 * cos(angle), pos.position.y + 10 * sin(angle)],
                strokeColor: 'white'
            })
        }
    }
}

$(document).ready(function(){
    setup();


})

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