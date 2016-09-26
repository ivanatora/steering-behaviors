width = view.size.width;
height = view.size.height;
frame_every = 1;
w = 20;
grid = [];

run = true;

PI = Math.PI;
window.sin = function(x){
    return Math.sin(x);
}
window.cos = function(x){
    return Math.cos(x);
}
window.abs = function(x){
    return Math.abs(x);
}
window.radians = function(x){
    return x * (Math.PI / 180);
}
window.degrees = function(x){
    return x * (180 / Math.PI);
}
window.rgb = function(r, g, b){
    return new Color(r, g, b);
}
window.rgba = function(r, g, b, a){
    return new Color(r, g, b, a);
}
window.map = function (val, in_min, in_max, out_min, out_max) {
    return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
window.map_range = function(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function setup(){
    noise.seed(Math.random());
    console.log(width, height)
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
            // console.log(i, j, grid[i][j]);
            var pos = new Path.Circle({
                center: [i * w, j * w],
                // radius: map_range(grid[i][j], 0, 1, 0, 10),
                radius: 3,
                strokeColor: 'white'
            });
            var angle = map_range(grid[i][j], 0, 1, Math.PI, -Math.PI);

            var arrow = new Path.Line({
                from: pos.position,
                to: [pos.position.x + 10 * cos(angle), pos.position.y + 10 * sin(angle)],
                strokeColor: 'white'
            })
            // arrow.length = 10;

            // arrow.rotate(degrees(angle), pos.position);
        }
    }
}

$(document).ready(function(){
    setup();


})

function onFrame(event) {
    if (run == false) return; // play-pause
    if (event.count % frame_every != 0) return; // 1 frame per X seconds


}