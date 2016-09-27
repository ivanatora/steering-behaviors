width = view.size.width;
height = view.size.height;
frame_every = 2;
w = 10;
grid = [];
active_movers = [];
arrow_shapes = [];
arrows_visible = false;
mouse_position = null;


run = true;


function setup(){
    seed = $('#seed').val();
    noise.seed(seed);
    grid = [];

    // clear old arrows, if exist
    for (var i = 0; i < arrow_shapes.length; i++){
        arrow_shapes[i].remove();
    }

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
            var pos = new Point(i * w, j * w);
            var angle = map_range(grid[i][j], 0, 1, Math.PI, -Math.PI);

            var arrow = new Path.Line({
                from: pos,
                to: [pos.x + 10 * cos(angle), pos.y + 10 * sin(angle)],
                strokeColor: 'white',
                visible: arrows_visible
            })
            arrow_shapes.push(arrow);
        }
    }
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
}

$(document).ready(function(){
    var seed = Math.floor(Math.random() * 65535);
    $('#seed').val(seed);

    setup();

    $('#clear_movers').click(function(e){
        e.preventDefault();
        for (var i = 0; i < active_movers.length; i++){
            active_movers[i].shape.remove();
        }
        active_movers = [];
    })

    $('#use_new').click(function(e){
        e.preventDefault();
        setup();
    })

    $('#randomize').click(function(e){
        e.preventDefault();
        var seed = Math.floor(Math.random() * 65535);
        $('#seed').val(seed);
        setup();
    })

    $('#show_field').click(function(e){
        e.preventDefault();
        for (var i = 0; i < arrow_shapes.length; i++){
            arrow_shapes[i].visible = true;
        }
        arrows_visible = true;
    })

    $('#hide_field').click(function(e){
        e.preventDefault();
        for (var i = 0; i < arrow_shapes.length; i++){
            arrow_shapes[i].visible = false;
        }
        arrows_visible = false;
    })
})