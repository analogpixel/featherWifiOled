var width=128;
var height=64;
//var width=16;
//var height=16;
var drag=false;
var ctx;
var rect;
var scalex = 10;
var scaley = 10;
var bitmap = [];
var canvas;

/*
  return the bitmap as an array of ints  16bits long
*/
function convertToInt() {
	var intArr = [];
	for (var i=0; i < width*height; i+=16) {
		var t = 0;
		var s = "";
		for (var k=0; k < 16; k++) {
			s = s + bitmap[i+k];
			if (bitmap[i+k] == 1) { 
				t = t + Math.pow(2, 15-k);
			}
			
		}
		intArr.push(t);
		console.log("0b" + s, t);
	}
	
	return intArr;
}

function writeData() {
	var data = convertToInt();
	$.post("saveData", {'d': data.join(",") }, (d) => {console.log("ok"); });
	
	// just return the bits 
	//$.post("saveData", {'d': bitmap.join(",") }, (d) => {console.log("ok"); });
}

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
