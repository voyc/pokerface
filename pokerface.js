PokerFace = function(container) {
	this.e = container;
	this.debug = false;
	this.focus = 50;
	this.pleasure = 50;
	this.controller = null;
}

PokerFace.prototype = {

	/* public */
	load: function() {
		this.setup();
		this.layout();
		this.drawFace();
	},

	/* public */
	resize: function() {
		this.layout();
		this.drawFace();
	},

	/* public.  Set to number between 0 and 100. */
	setPleasure: function(n) {
		var t = Number(n);
		t = Math.min(t,100);
		t = Math.max(t,0);
		this.pleasure = t;
		this.drawFace();
	},

	/* public.  Set to number between 0 and 100. */
	setFocus: function(n) {
		var t = Number(n);
		t = Math.min(t,100);
		t = Math.max(t,0);
		this.focus = t;
		this.drawFace();
	},
	
	/* private */
	setup: function() {
		this.divCanvas = document.createElement( 'div');
		this.divCanvas.style.height = '100%';
		this.divCanvas.style.width = '100%';
		
		this.e.appendChild(this.divCanvas);
		this.canvasFace = document.createElement( 'canvas');
		this.divCanvas.appendChild(this.canvasFace);
	},

	/* private */
	layout: function() {
		this.canvasFace.width = this.divCanvas.offsetWidth;
		this.canvasFace.height = this.divCanvas.offsetHeight;
	},

	/* private */	
	drawFace: function() {
		// draw head
		var centerX = this.canvasFace.width / 2;
		var centerY = this.canvasFace.height / 2;
		var radius = Math.min(this.canvasFace.width, this.canvasFace.height) / 2 - 5;
		var pctStroke = .0200;
	
		var ctx = this.canvasFace.getContext('2d');
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		ctx.closePath();
		ctx.fillStyle='#FFFF00';
		ctx.fill();
		ctx.lineWidth = radius * pctStroke;
		ctx.strokeStyle='#000000';
		ctx.stroke();
	
		// draw eyes
		var pctEye = .2000;
		
		var eyeLeftX = centerX - Math.floor(radius * pctEye);
		var eyeLeftY = centerY;
		var eyeRightX = centerX + Math.floor(radius * pctEye);
		var eyeRightY = centerY;
		var eyeRadius = radius * pctStroke;
	
		ctx.beginPath();
		ctx.arc(eyeLeftX, eyeLeftY, eyeRadius, 0, 2 * Math.PI, false);
		ctx.closePath();
		ctx.fillStyle='#000000';
		ctx.fill();
	
		ctx.beginPath();
		ctx.arc(eyeRightX, eyeRightY, eyeRadius, 0, 2 * Math.PI, false);
		ctx.closePath();
		ctx.fill();
	
		// draw brows
		var pctBrowTop = .4429;
		var pctBrowBottom = -.0500; // use negative pct to go below eyes
		var pctBrowOutside =  .5000;
		var pctBrowInside = .0571;
	
		var leftBrowLeftX = centerX - Math.floor(radius * pctBrowOutside);
		var leftBrowRightX = centerX - Math.floor(radius * pctBrowInside);
	
		var browTopMax = centerY - Math.floor(radius * pctBrowTop);
		var browBottomMax = centerY - Math.floor(radius * pctBrowBottom);
		var browHeight = browBottomMax - browTopMax;
		var leftBrowLeftY = browTopMax + (browHeight * ((100 - this.focus)/100));
		var leftBrowRightY = browTopMax + (browHeight * (this.focus/100));
	
		ctx.beginPath();
		ctx.moveTo(leftBrowLeftX, leftBrowLeftY);
		ctx.lineTo(leftBrowRightX, leftBrowRightY);
		ctx.stroke();
	
		var rightBrowLeftX = centerX + Math.floor(radius * pctBrowInside);
		var rightBrowRightX = centerX + Math.floor(radius * pctBrowOutside);
		var rightBrowLeftY = leftBrowRightY;
		var rightBrowRightY = leftBrowLeftY;
	
		ctx.beginPath();
		ctx.moveTo(rightBrowLeftX, rightBrowLeftY);
		ctx.lineTo(rightBrowRightX, rightBrowRightY);
		ctx.stroke();
	
		// draw mouth
		var pctMouthTop = .26;
		var pctMouthBottom = .66;
		var pctMouthOutside =  .50;
		var pctMouthInside = .36;
		var pctMouthInsideHeight = .140;
	
		var mouthTopMax = centerY + Math.floor(radius * pctMouthTop);
		var mouthBottomMax = centerY + Math.floor(radius * pctMouthBottom);
		var mouthHeight = mouthBottomMax - mouthTopMax;
		
		var mouthInsideTopMax = centerY + Math.floor(radius * (pctMouthTop-pctMouthInsideHeight));
		var mouthInsideBottomMax = centerY + Math.floor(radius * (pctMouthBottom+pctMouthInsideHeight));
		var mouthInsideHeight = mouthInsideBottomMax - mouthInsideTopMax;
	
		var mouthLeftX = centerX - Math.floor(radius * pctMouthOutside);
		var mouthLeftY = mouthTopMax + mouthHeight * ((100-this.pleasure)/100);
		var mouthOneX = centerX - Math.floor(radius * pctMouthInside);
		var mouthOneY = mouthInsideTopMax + mouthInsideHeight * (this.pleasure/100);
		var mouthTwoX = centerX + Math.floor(radius * pctMouthInside);
		var mouthTwoY = mouthInsideTopMax + mouthInsideHeight * (this.pleasure/100);
		var mouthRightX =  centerX + Math.floor(radius * pctMouthOutside);
		var mouthRightY = mouthTopMax + mouthHeight * ((100-this.pleasure)/100);
	
		ctx.beginPath();
		ctx.moveTo(mouthLeftX, mouthLeftY);
		ctx.bezierCurveTo(mouthOneX, mouthOneY, mouthTwoX, mouthTwoY, mouthRightX, mouthRightY);
		ctx.stroke();
	
		if (this.debug) {
			// draw mouth bezier points
			ctx.beginPath();
			ctx.moveTo(mouthLeftX, mouthLeftY);
			ctx.lineTo(mouthOneX, mouthOneY);
			ctx.lineTo(mouthTwoX, mouthTwoY);
			ctx.lineTo(mouthRightX, mouthRightY);
			ctx.closePath();
			ctx.strokeStyle = 'green';
			ctx.stroke();
	
			// draw mouth boxes
			ctx.beginPath();
			ctx.moveTo(mouthLeftX, mouthTopMax);
			ctx.lineTo(mouthRightX, mouthTopMax);
			ctx.lineTo(mouthRightX, mouthBottomMax);
			ctx.lineTo(mouthLeftX, mouthBottomMax);
			ctx.closePath();
			ctx.strokeStyle = 'pink';
			ctx.stroke();
	
			ctx.beginPath();
			ctx.moveTo(mouthOneX, mouthInsideTopMax);
			ctx.lineTo(mouthTwoX, mouthInsideTopMax);
			ctx.lineTo(mouthTwoX, mouthInsideBottomMax);
			ctx.lineTo(mouthOneX, mouthInsideBottomMax);
			ctx.closePath();
			ctx.stroke();
	
			// draw brow boxes
			ctx.beginPath();
			ctx.moveTo(leftBrowLeftX, browTopMax);
			ctx.lineTo(leftBrowRightX, browTopMax);
			ctx.lineTo(leftBrowRightX, browBottomMax);
			ctx.lineTo(leftBrowLeftX, browBottomMax);
			ctx.closePath();
			ctx.stroke();
	
			ctx.beginPath();
			ctx.moveTo(rightBrowLeftX, browTopMax);
			ctx.lineTo(rightBrowRightX, browTopMax);
			ctx.lineTo(rightBrowRightX, browBottomMax);
			ctx.lineTo(rightBrowLeftX, browBottomMax);
			ctx.closePath();
			ctx.stroke();
		}
	}
}
