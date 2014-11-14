/**
 * Created with JetBrains PhpStorm.
 * User: outdream
 * Date: 27.10.14
 * Time: 15:49
 * To change this template use File | Settings | File Templates.
 */

var img = new Image();
$(document).ready(function() {
for (i=0; i<map.length; i++)
{
    img = new Image();
    img.src='./icon_and_texute/'+map[i].texture;
}
});
//img.src = './icon_and_texute/rocks.jpg';
var selectColor = "rgba(0, 0, 0, 0.5)";
var hexHeight,
    hexRadius,
    hexRectangleHeight,
    hexRectangleWidth,
    hexagonAngle = 0.523598776, // 30 degrees in radians
    sideLength = 36,
    boardWidth = 30,
    boardHeight = 15;
var SrollInterval,SrollIntervalml,SrollIntervalmt, scroll=false, scrollml=false, scrollmt=false;

function getKeyCode(event) {
    var e = event || window.event;
    return keyCode = e.which || e.KeyCode;
}

document.onkeydown = function(e){
   var scrollTopMax= $('#game').height()-$(window).height()+202;
   var scrollLeftMax= $('#game').width()-$(window).width()+202;

   switch (parseInt(getKeyCode(e))) {
       case 37:    // left
           if (scroll==false)
               SrollInterval = setInterval(function(){
                   if ($(window).scrollLeft()>0)
                   {
                       $(window).scrollLeft($(window).scrollLeft()-5);
                   }
               }, 10);
           scroll=true;
           break;
       case 38:    // top
           if (scroll==false)
               SrollInterval = setInterval(function(){
                   if ($(window).scrollTop()>0)
                   {
                       $(window).scrollTop($(window).scrollTop()-5);
                   }
               }, 10);
           scroll=true;
           break;
       case 39:    // right
           if (scroll==false)
               SrollInterval = setInterval(function(){
                   if ($(window).scrollLeft()<scrollLeftMax)
                   {
                       $(window).scrollLeft($(window).scrollLeft()+5);
                   }
               }, 10);
           scroll=true;
           break;
       case 40:    // down
           if (scroll==false)
               SrollInterval = setInterval(function(){
                   if ($(window).scrollTop()<scrollTopMax)
                   {
                       $(window).scrollTop($(window).scrollTop()+5);
                   }
               }, 10);
           scroll=true;
           break;
   }

}
document.onkeyup = function(e){
    clearInterval(SrollInterval);
    scroll=false;
}

function createHexGrid(){

    var canvas = document.getElementById('hexMap');
    //canvas.addEventListener('mousemove', MouseMoveEventHandler, false);
    canvas.addEventListener('click', CanvasClickEventHandler, false);
    //$("#hexMap").draggable();
    $('html').css('overflow', 'hidden');
    hexHeight = Math.sin(hexagonAngle) * sideLength;
    hexRadius = Math.cos(hexagonAngle) * sideLength;
    hexRectangleHeight = sideLength + 2 * hexHeight;
    hexRectangleWidth = 2 * hexRadius;
    canvas.height = hexRadius * (boardHeight * 2) - (boardHeight * hexHeight) / 3 - hexHeight;
    canvas.width = hexRadius * boardWidth * 2 + hexRadius;
    $('#game').height(canvas.height);
    $('#game').width(canvas.width);


    if (canvas.getContext){
        var ctx = canvas.getContext('2d');

        //    ctx.drawImage(img);
        ctx.fillStyle = selectColor;
        ctx.strokeStyle = "#CCCCCC";
        ctx.lineWidth = 2;
        drawBoard(ctx, boardWidth, boardHeight);
    }

    function CanvasClickEventHandler(e){
            var x,
                y,
                hexX,
                hexY,
                screenX,
                screenY;

            x = e.offsetX || e.layerX;
            y = e.offsetY || e.layerY;
            hexY = Math.floor(y / (hexHeight + sideLength));
            hexX = Math.floor((x - (hexY % 2) * hexRadius) / hexRectangleWidth);
            screenX = hexX * hexRectangleWidth + ((hexY % 2) * hexRadius);
            screenY = hexY * (hexHeight + sideLength);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBoard(ctx, boardWidth, boardHeight);
            if(hexX >= 0 && hexX < boardWidth) {
                if(hexY >= 0 && hexY < boardHeight) {
                    ctx.fillStyle = selectColor;//"#000000";
                    drawHexagon(ctx, hexY*boardWidth+hexX, screenX, screenY, true);
                }
            }
    };



    $('#game').height();




    $(window).mousemove(function(e){
        var scrollTopMax= $('#game').height()-$(window).height()+202;
        var scrollLeftMax= $('#game').width()-$(window).width()+202;
       if(e.clientX<5) //left
       {
           if (scrollml==false)
           {
               SrollIntervalml = setInterval(function(){
                   if ($(window).scrollLeft()>0)
                   {
                       $(window).scrollLeft($(window).scrollLeft()-5);
                   }
               }, 10);
                scrollml=true;
           }
       }
       else
       {
           if(e.clientX>($(window).width()-5)) //right
           {
               if (scrollml==false)
               {
                   SrollIntervalml = setInterval(function(){
                       if ($(window).scrollLeft()<scrollLeftMax)
                       {
                           $(window).scrollLeft($(window).scrollLeft()+5);
                       }
                   }, 10);
                   scrollml=true;
               }
           }
           else
           {
               clearInterval(SrollIntervalml);
               scrollml=false;
           }
       }
        if(e.clientY<5) //top
        {
            if (scrollmt==false)
            {
                SrollIntervalmt = setInterval(function(){
                    if ($(window).scrollTop()>0)
                    {
                        $(window).scrollTop($(window).scrollTop()-5);
                    }
                }, 10);
                scrollmt=true;
            }
        }
        else
        {
            if(e.clientY>($(window).height()-5)) //right
            {
                if (scrollmt==false)
                {
                    SrollIntervalmt = setInterval(function(){
                        if ($(window).scrollTop()<scrollLeftMax)
                        {
                            $(window).scrollTop($(window).scrollTop()+5);
                        }
                    }, 10);
                    scrollmt=true;
                }
            }
            else
            {
                clearInterval(SrollIntervalmt);
                scrollmt=false;
            }
        }
    });

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

    for (var j = 0; j < height; ++j) {
        for (var i = 0; i < width; ++i) {
            drawHexagon(
                canvasContext, j*width+i,
                    i * hexRectangleWidth + ((j % 2) * hexRadius),
                    j * (sideLength + hexHeight),
                false
            );
        }
    }
}


function drawHexagon(canvasContext, id, x, y, fill) {

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
    //img.src=
    img = new Image();
    img.src='./icon_and_texute/'+map[id].texture;
    console.log(img.src);
    canvasContext.drawImage(img, x, y, hexRectangleWidth, hexRectangleHeight);

    if (fill) {
        canvasContext.fill();
    } else {
        canvasContext.stroke();
    }

    canvasContext.restore();
}
function randomTexture(){
    //texture random;
    var randomTexture=Math.floor(Math.random()*6)+1;
    var cityProbably=Math.random();
    var srcPath='';
    switch (randomTexture){
        case 0: srcPath='./icon_and_texute/rocks.jpg';
            break;
        case 1: srcPath='./icon_and_texute/trees.jpg';
            break;
        case 2: srcPath='./icon_and_texute/grass.jpg';
            break;
        case 3: srcPath='./icon_and_texute/gas.jpg';
            break;
        case 4: srcPath='./icon_and_texute/coal.jpg';
            break;
        case 5: if(cityProbably<0.2066)
                     srcPath='./icon_and_texute/City.png';
                else srcPath='./icon_and_texute/grass.jpg';
            break;
        case 6: srcPath='./icon_and_texute/wheat.jpg';
                break;
        default: srcPath='./icon_and_texute/grass.jpg';
    }
    return srcPath;
}