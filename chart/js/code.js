var colors = [
"#8dd3c7",
"#ffffb3",
"#bebada",
"#fb8072",
"#80b1d3",
"#fdb462"]
var canvas;
var context;

function drawFootnote(y) {
	y = Math.floor(y);
 	w = canvas.width;
    h = canvas.height;

    maxR = Math.min(w, h) * 0.8 / 2;
    centerX = h / 2;
	centerY = h / 2;

 	context.beginPath();         	
    context.arc(centerX, y, 2.5, 0, 2 * Math.PI, false);
    context.fillStyle = "#000000";
    context.fill();

    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(centerX, y);
    context.lineTo(w, y);
    context.stroke();
}

function draw(sizes) {
    w = canvas.width;
    h = canvas.height;

    context.fillStyle = "white";
    context.fillRect(0, 0, w, h);

    maxR = Math.min(w, h) * 0.8 / 2;
    centerX = h / 2;
	centerY = h / 2;

	sizes.sort(function(a, b) {
      	return a - b;
    });
    
    console.log(sizes.toString());
	sizes.reverse();
	console.log(sizes.toString());
	

	for (i = 1; i < sizes.length; ++i) {
	 	sizes[i] /= sizes[0];
	}
	sizes[0] /= sizes[0];

	levels = []

	for (i = 0; i < sizes.length; ++i) {
	 	r = maxR * Math.sqrt(sizes[i]);
	 	console.log(sizes[i], r * r / (maxR * maxR));

	 	context.beginPath();
        context.arc(centerX, centerY + maxR - r, r, 0, 2 * Math.PI, false);
        context.fillStyle = colors[i];
        context.fill();
        context.lineWidth = 1;
        //context.strokeStyle = '#404040';
        //context.stroke();

        if (i < sizes.length - 1) {
        	nextR = maxR * Math.sqrt(sizes[i + 1]);
         	levels.push(centerY + maxR - (r + nextR));
        } else {
         	levels.push(centerY + maxR - r);
        }
	}
	for (i = 0; i < sizes.length; ++i) {
	 	drawFootnote(levels[i]);
	}
}

function drawByInput() {
 	sz1 = parseInt(document.getElementById("sz01").value);
 	sz2 = parseInt(document.getElementById("sz02").value);
 	sz3 = parseInt(document.getElementById("sz03").value);
 	draw([sz1, sz2, sz3]);
}

function savePicture() {
 	img = canvas.toDataURL("image/png");
}    

function init() {
 	canvas = document.getElementById('canvas');
 	context = canvas.getContext('2d');
 	canvas.width = 600;
 	draw([1, 0.5, 0.3]);

  	function download() {
        var dt = canvas.toDataURL("image/png");
        this.href = dt; //this may not work in the future..
    }
    document.getElementById('download').addEventListener('click', download, false);
}