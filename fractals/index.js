const WIDTH = 1000;
const HEIGHT = 800;
var offset = 18;

var canvas;
var ctx;

let o = new Line(new Point(5,5), 
                 new Point(5, -5), 
                 5, 
                 "blue");

document.getElementsByTagName("input")[0].addEventListener(("input"), () => {
    document.getElementById("range-iteration-value").innerText = "Iterations: " + document.getElementsByTagName("input")[0].value;
    updateF()
});

document.getElementsByTagName("input")[1].addEventListener(("input"), () => {
    document.getElementById("range-angle-value").innerText = "Starting Angle: " + document.getElementsByTagName("input")[1].value;
    updateF()
});

document.getElementsByTagName("input")[2].addEventListener(("input"), () => {
    document.getElementById("range-fractal-angle-value").innerText = "Fractal Angle: " + document.getElementsByTagName("input")[2].value;
    updateF()
});

document.getElementsByTagName("input")[3].addEventListener(("input"), () => {
    document.getElementById("range-offset-value").innerText = "Offset Value: " + document.getElementsByTagName("input")[3].value;
    offset =  document.getElementsByTagName("input")[3].value
    updateF()
});

document.addEventListener("DOMContentLoaded", (event) => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.setAttribute("width", WIDTH);
    canvas.setAttribute("height", HEIGHT);
    document.getElementsByTagName("input")[0].value = 50;
    document.getElementsByTagName("input")[3].value = offset;
    document.getElementById("range-offset-value").innerText = "Offset Value: " + offset;
    document.getElementById("range-iteration-value").innerText = "Iterations: " + document.getElementsByTagName("input")[0].value;
});

let objs = [o];

updateF()

const draw = () => {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    drawLine({ x: WIDTH / 2, y: 0 }, { x: WIDTH / 2, y: HEIGHT }, ctx, "Gray", 1);
    drawLine({ x: 0, y: HEIGHT / 2 }, { x: WIDTH, y: HEIGHT / 2 }, ctx, "Gray", 1);

    objs.forEach((x) => {
        drawLineOffset(x, ctx)
    });
}
setInterval(draw, 10);