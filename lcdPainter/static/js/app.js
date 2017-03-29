var width=128;
var height=64;
var drag=false;
var ctx;
var rect;
var scalex = 10;
var scaley = 10;
var bitmap = [];
var canvas;

// onload
$( () => {


	console.log("draw");
	canvas = document.getElementById('paint');
	
	canvas.width =  width*scalex;
	canvas.height = height*scaley;
	rect = document.getElementById("paint").getBoundingClientRect();
    ctx = canvas.getContext('2d'),
    drag = false;

    canvas.addEventListener('mousedown', mouseDown, false);
  	canvas.addEventListener('mouseup', mouseUp, false);
  	canvas.addEventListener('mousemove', mouseMove, false);

  	clearBitmap();

} );

function clearBitmap() {
	for (var j=0; j < width*height; j++) {
		bitmap[j] = 0;
	}
}

function mouseDown(e) {
	
  drag = true;
}

function mouseUp() {
  drag = false;
  redraw();
}

function redraw() {
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	canvas.width = canvas.width;

	for (var x=0; x< width; x++) {
		for (var y=0; y < height; y++) {
			if ( bitmap[x + (y*width) ] == 1) {
				ctx.fillRect( x*scalex, y*scaley, scalex, scaley);
			}
		}
	}
}

function mouseMove(e) {
  if (drag) {
      x = Math.floor(e.clientX - rect.left);
      y = Math.floor(e.clientY - rect.top);
   	  xx = Math.floor(x/scalex)
   	  yy = Math.floor(y/scaley);

   	  bitmap[xx + (yy*width) ] = 1;
   	  ctx.fillRect( xx*scalex, yy*scaley, scalex, scaley);
   
   	    }
}
