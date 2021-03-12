/* liner.js */

Liner = function(container) {
	this.e = container;
	this.nterms = 7;
	this.ascalar = [];
	for (var i=0; i<this.nterms; i++) {
		this.ascalar[i] = 0;
	}
}

Liner.prototype = {

	/* public */
	load: function() {
		this.setup();
		this.layout();
		this.drawGraph();
	},

	/* public */
	resize: function() {
		this.layout();
		this.drawGraph();
	},

	/* private */
	setup: function() {
		this.divCanvas = document.createElement( 'div');
		this.divCanvas.style.height = '100%';
		this.divCanvas.style.width = '100%';
		
		this.e.appendChild(this.divCanvas);
		this.canvasGraph = document.createElement( 'canvas');
		this.divCanvas.appendChild(this.canvasGraph);
	},

	/* private */
	layout: function() {
		this.canvasGraph.width = this.divCanvas.offsetWidth;
		this.canvasGraph.height = this.divCanvas.offsetHeight;
	},

	/* private */	
	drawGraph: function() {
		// draw head
		var centerX = this.canvasGraph.width / 2;
		var centerY = this.canvasGraph.height / 2;
		var radius = Math.min(this.canvasGraph.width, this.canvasGraph.height) / 2 - 5;
		var pctStroke = .0200;
	
		var ctx = this.canvasGraph.getContext('2d');
		ctx.clearRect(0, 0, this.canvasGraph.width, this.canvasGraph.height);
	
		var centerX = this.canvasGraph.width / 2;
		var centerY = this.canvasGraph.height / 2;
		var radius = Math.min(this.canvasGraph.width, this.canvasGraph.height) / 2 - 5;
		var tick = radius / 5;
		
		var left = centerX - radius;
		var right = centerX + radius;
		var top = centerY - radius;
		var bottom = centerY + radius;
	
		// draw outside square
		if (false) {
			ctx.beginPath();
			ctx.moveTo(left,top);
			ctx.lineTo(right,top);	
			ctx.lineTo(right,bottom);	
			ctx.lineTo(left,bottom);	
			ctx.closePath();
			ctx.strokeStyle='#0000ff';
			ctx.stroke();
		}

		// draw meridians
		for (var i=left+tick; i<right-tick; i+=tick) {
			ctx.beginPath();
			ctx.moveTo(i,top);
			ctx.lineTo(i,bottom);	
			ctx.closePath();
			ctx.strokeStyle='#000000';
			ctx.lineWidth = 0.5;
			ctx.stroke();
		}		
		
		// draw parallels
		for (var j=top+tick; j<bottom; j+=tick) {
			ctx.beginPath();
			ctx.moveTo(left,j);
			ctx.lineTo(right,j);	
			ctx.closePath();
			ctx.strokeStyle='#000000';
			ctx.lineWidth = 0.5;
			ctx.stroke();
		}		

		// draw axes
		ctx.beginPath();
		ctx.moveTo(centerX,top);
		ctx.lineTo(centerX,bottom);	
		ctx.moveTo(left, centerY);
		ctx.lineTo(right, centerY);	
		ctx.closePath();
		ctx.strokeStyle='#000000';
		ctx.lineWidth = 2.5;
		ctx.stroke();

		// draw line
		var scale = 100;
		var grid = scale * 2;
		var interpolate = radius/scale;
		ctx.beginPath();
		ctx.strokeStyle='#0000cc';
		var x,y,xx,yy;
		for (var t=0; t<grid; t++) {  // t: 0 to 200
			x = t-scale;       // x: -100 to +100

			//y = c6*(x**6) + c5*(x**5) + c4*(x**4) + c3*(x**3) + c2*(x**2) + c1*(x**1) + c0*(x**0);
			y = 0;
			for (var i=0; i<this.nterms; i++) {
				term = this.ascalar[i] * (x ** i);
				y += term;
			}
			
			xx = centerX + (x * interpolate)    // xx: left to right
			yy = centerY - (y * interpolate)


			if (t == 0) 
				ctx.moveTo(xx,yy) 
			else
				ctx.lineTo(xx,yy) 
		}	
		ctx.closePath();
		ctx.stroke();
	}
}
