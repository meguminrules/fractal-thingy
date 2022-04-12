class Point {
    constructor(x, y, size=1, color="black", label=false) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.label = label;
    }
}

class Line {
    constructor(p1, p2, strokeWidth=1, color="black") {
        this.p1 = p1;
        this.p2 = p2;
        this.strokeWidth = strokeWidth;
        this.color = color;
    }
}

// Rotate a point around the origin
const rotatePoint = (p, angle) => {
    return {x: (p.x * Math.cos(angle / (180 / Math.PI))) - (p.y * Math.sin(angle / (180 / Math.PI))), y: (p.x * Math.sin(angle / (180 / Math.PI))) + (p.y * Math.cos(angle / (180 / Math.PI)))}
}

// Rotate a point around a center point
const rotatePointA = (p, cp, angle) => {
    return {x: ((p.x - cp.x) * Math.cos(angle / (180 / Math.PI))) - ((p.y - cp.y) * Math.sin(angle / (180 / Math.PI))) + cp.x, y: ((p.x - cp.x) * Math.sin(angle / (180 / Math.PI))) + ((p.y - cp.y) * Math.cos(angle / (180 / Math.PI))) + cp.y}
}

// Rotate a line around the origin
const rotateLine = (line, angle) => {
    return new Line(new Point(rotatePoint(new Point(line.p1.x, line.p1.y), angle).x, rotatePoint(new Point(line.p1.x, line.p1.y), angle).y), new Point(rotatePoint(new Point(line.p2.x, line.p2.y), angle).x, rotatePoint(new Point(line.p2.x, line.p2.y), angle).y), line.strokeWidth, line.color)
}

// Rotate a line around a center point
const rotateLineA = (line, cp, angle) => {
    return new Line(new Point(rotatePointA(new Point(line.p1.x, line.p1.y), cp, angle).x, rotatePointA(new Point(line.p1.x, line.p1.y), cp, angle).y), new Point(rotatePointA(new Point(line.p2.x, line.p2.y), cp, angle).x, rotatePointA(new Point(line.p2.x, line.p2.y), cp, angle).y), line.strokeWidth, line.color)
}

/**
 * @name length
 * @description Gets length of a line
 * @param {Line} line An object of the line class
 * 
 * @returns {float} Float value length of the line
 */
const length = (line) => {
    return Math.sqrt(Math.pow((line.p2.x - line.p1.x),2) + Math.pow((line.p2.y - line.p1.y), 2))
}

// Update fractal
const updateF = (line) => {
    objs = [o]
    objs[0] = rotateLineA(o, 
                          new Point((o.p1.x + o.p2.x) / 2, (o.p1.y + o.p2.y)/ 2), 
                          document.getElementById("range-angle").value);
    for(let i = 0; i < document.getElementsByTagName("input")[0].value; i++) {
        if (i == 0) {
            objs.push(new Line(objs[i].p1, new Point(objs[i].p1.x - (objs[i].p2.x - objs[i].p1.x), objs[i].p1.y - (objs[i].p2.y - objs[i].p1.y)), 5, "red"))
        } else {
            objs.push(new Line(objs[i].p2, new Point(objs[i].p2.x - (objs[i].p1.x - objs[i].p2.x), objs[i].p2.y - (objs[i].p1.y - objs[i].p2.y)), 5, "red"))
        }
        objs[i + 1].p2 = rotatePointA(objs[i + 1].p2, new Point((objs[i + 1].p1.x + objs[i + 1].p2.x) / 2, (objs[i + 1].p1.y + objs[i + 1].p2.y) / 2), document.getElementsByTagName("input")[2].value)
    }
}

// Get
const getAngle = (line) => {
    return Math.atan2(line.p2.y, line.p2.x) * (180 / Math.PI)
}

const randomNumber = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min));

const drawLabelOffset = (p, text, ctx) => {
    ctx.font = p.size + "px Arial";
    ctx.fillStyle = p.color;
    ctx.textAlign = 'center';
    ctx.fillText(text, p.x * offset * ((Math.sign(p.x) == "+") ? -1 : 1) + (WIDTH / 2), p.y * offset * -1 + (HEIGHT / 2) - (p.size - 3));
}

const drawLabel = (p, text, ctx) => {
    ctx.font = p.size + "px Arial";
    ctx.fillStyle = p.color;
    ctx.textAlign = 'center';
    ctx.fillText(text, p.x, p.y - (p.size - 3));
}

const placePoint = (p, context) => {
    context.beginPath();
    context.fillStyle = p.color;
    context.arc(p.x,
        p.y,
        p.size,
        0 * Math.PI,
        2 * Math.PI);
    context.fill();

    if (p.label) {
        p.size = offset;
        p.color = "Blue"
        drawLabelOffset(p, "(" + p.x + ", " + p.y + ")", context);
    }
}

const placePointOffset = (p, context) => {
    context.beginPath();
    context.fillStyle = p.color;
    context.arc(p.x * offset * ((Math.sign(p.x) == "+") ? -1 : 1) + (WIDTH / 2),
        p.y * offset * -1 + (HEIGHT / 2),
        p.size,
        0 * Math.PI,
        2 * Math.PI);
    context.fill();

    if (p.label) {
        p.size = offset;
        p.color = "Blue"
        drawLabelOffset(p, "(" + p.x + ", " + p.y + ")", context);
    }
}

const drawLineOffset = (line, context) => {
    context.beginPath()
    context.moveTo(line.p1.x * offset * ((Math.sign(line.p1.x) == "+") ? -1 : 1) + (WIDTH / 2),
        line.p1.y * offset * -1 + (HEIGHT / 2));
    context.lineTo(line.p2.x * offset * ((Math.sign(line.p2.x) == "+") ? -1 : 1) + (WIDTH / 2),
        line.p2.y * offset * -1 + (HEIGHT / 2));
    context.lineWidth = line.strokeWidth;
    context.strokeStyle = line.color;
    context.stroke();
}

const drawLine = (p1, p2, context, color, width) => {
    context.beginPath()
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.lineWidth = width;
    context.strokeStyle = color;
    context.stroke();
}

const getMousePos = (canvas, evt) => {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}