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