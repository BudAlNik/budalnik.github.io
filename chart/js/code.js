var colors = [
"#8dd3c7",
"#ffffb3",
"#bebada",
"#fb8072",
"#80b1d3",
"#fdb462"]
var canvas;
var context;

function draw(sizes) {
    w = canvas.width;
    h = canvas.height;

    context.fillStyle = "white";
    context.fillRect(0, 0, w, h);

    maxR = Math.min(w, h) * 0.8 / 2;
    centerX = w / 2;
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

	for (i = 0; i < sizes.length; ++i) {
	 	r = maxR * Math.sqrt(sizes[i]);
	 	console.log(sizes[i], r * r / (maxR * maxR));

	 	context.beginPath();
        context.arc(centerX, centerY + maxR - r, r, 0, 2 * Math.PI, false);
        context.fillStyle = colors[i];
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = '#404040';
        context.stroke();
	}
}

function drawByInput() {
 	sz1 = parseInt(document.getElementById("sz01").value);
 	sz2 = parseInt(document.getElementById("sz02").value);
 	sz3 = parseInt(document.getElementById("sz03").value);
 	draw([sz1, sz2, sz3]);
}

function init() {
 	canvas = document.getElementById('canvas');
 	context = canvas.getContext('2d');
 	draw([1, 0.5, 0.3]);
}