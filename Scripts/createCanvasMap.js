/**
 * Created with JetBrains PhpStorm.
 * User: outdream
 * Date: 27.10.14
 * Time: 15:49
 * To change this template use File | Settings | File Templates.
 */

var img = new Image();
img.src = './icon_and_texute/grass.jpg';
var selectColor = "rgba(0, 0, 0, 0.5)";
var hexHeight,
    hexRadius,
    hexRectangleHeight,
    hexRectangleWidth,
    hexagonAngle = 0.523598776, // 30 degrees in radians
    sideLength = 36,
    boardWidth = 30,
    boardHeight = 15;

function createHexGrid(){

    var canvas = document.getElementById('hexMap');
    canvas.addEventListener('mousemove', MouseMoveEventHandler, false);
    //$("#hexMap").draggable();
    $('html').css('overflow', 'hidden');
    hexHeight = Math.sin(hexagonAngle) * sideLength;
    hexRadius = Math.cos(hexagonAngle) * sideLength;
    hexRectangleHeight = sideLength + 2 * hexHeight;
    hexRectangleWidth = 2 * hexRadius;
    canvas.height = hexRadius * (boardHeight * 2) - (boardHeight * hexHeight) / 3 - hexHeight;
    canvas.width = hexRadius * boardWidth * 2 + hexRadius;


    if (canvas.getContext){
        var ctx = canvas.getContext('2d');

        //    ctx.drawImage(img);
        ctx.fillStyle = selectColor;
        ctx.strokeStyle = "#CCCCCC";
        ctx.lineWidth = 2;
        drawBoard(ctx, boardWidth, boardHeight)
    }
}

function MouseMoveEventHandler(event) {
    var x,
        y,
        hexX,
        hexY,
        screenX,
        screenY;

    x = event.layerX - event.currentTarget.offsetLeft;
    y = event.layerY - event.currentTarget.offsetTop;
    hexY = Math.floor(y / (hexHeight + sideLength));
    hexX = Math.floor((x - (hexY % 2) * hexRadius) / hexRectangleWidth);

    screenX = hexX * hexRectangleWidth + ((hexY % 2) * hexRadius);
    screenY = hexY * (hexHeight + sideLength);

//    var canvas = document.getElementById('hoverMap');
//    if (canvas.getContext) {
//        var ctx = canvas.getContext('2d');
//
//        //    ctx.drawImage(img);
//        ctx.fillStyle = selectColor;
//        ctx.strokeStyle = "#CCCCCC";
//        ctx.lineWidth = 2;
//
//        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
//
//
//        if (hexX >= 0 && hexX < boardWidth) {
//            if (hexY >= 0 && hexY < boardHeight) {
//                ctx.fillStyle = selectColor;
//                drawHexagon(ctx, screenX, screenY, true);
//            }
//        }
//    }
//    ctx.strokeText(event.clientX.toString(), 150, 150);
}
function drawBoard(canvasContext, width, height) {


    for (var i = 0; i < width; ++i) {
        for (var j = 0; j < height; ++j) {
            drawHexagon(
                canvasContext,
                    i * hexRectangleWidth + ((j % 2) * hexRadius),
                    j * (sideLength + hexHeight),
                false
            );
        }
    }
}


function drawHexagon(canvasContext, x, y, fill) {

    canvasContext.save();
    canvasContext.beginPath();
    canvasContext.moveTo(x + hexRadius, y);
    canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight);
    canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
    canvasContext.lineTo(x + hexRadius, y + hexRectangleHeight);
    canvasContext.lineTo(x, y + sideLength + hexHeight);
    canvasContext.lineTo(x, y + hexHeight);
    canvasContext.closePath();

    canvasContext.clip();
    canvasContext.drawImage(img, x, y, hexRectangleWidth, hexRectangleHeight);

    if (fill) {
        canvasContext.fill();
    } else {
        canvasContext.stroke();
    }

    canvasContext.restore();
}