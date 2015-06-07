PokerFaceController = function(owner) {
	this.owner = owner;
}

PokerFaceController.prototype = {
	setup: function() {
		this.divController = document.createElement( 'div');
		this.owner.e.appendChild(this.divController);

		var table = document.createElement( 'table');
		this.divController.appendChild(table);
		var row = table.insertRow();
		var cell = row.insertCell();
		cell.innerHTML = 'Pleasure:';
		cell = row.insertCell();
		this.sliderPleasure = document.createElement( 'input');
		cell.appendChild(this.sliderPleasure);
		this.sliderPleasure.setAttribute('type', 'range');
		this.sliderPleasure.setAttribute('min', '-100');
		this.sliderPleasure.setAttribute('max', '100');
		this.sliderPleasure.setAttribute('step', '1');
		this.sliderPleasure.setAttribute('value', '0');
		
		var self = this;
		this.sliderPleasure.oninput = function() {self.onSlidePleasure()};
		this.sliderPleasure.onchange = function() {self.onSlidePleasure()};

		row = table.insertRow();
		cell = row.insertCell();
		cell.innerHTML = 'Focus:';
		cell = row.insertCell();
		this.sliderFocus = document.createElement( 'input');
		cell.appendChild(this.sliderFocus);
		this.sliderFocus.setAttribute('type', 'range');
		this.sliderFocus.setAttribute('min', '-100');
		this.sliderFocus.setAttribute('max', '100');
		this.sliderFocus.setAttribute('step', '1');
		this.sliderFocus.setAttribute('value', '0');

		var self = this;
		this.sliderFocus.oninput = function() {self.onSlideFocus()};
		this.sliderFocus.onchange = function() {self.onSlideFocus()};

	},

	layout: function() {
		var controllerH = this.divController.offsetHeight;
		var controllerW = this.divController.offsetWidth;

		var canvasH = this.owner.e.offsetHeight;
		var canvasW = this.owner.e.offsetWidth;
				
		this.owner.divCanvas.style.height = canvasH-controllerH + 'px';
	},

	onSlidePleasure: function() {
		// Slider uses values between -100 and 100.
		// Convert it to a value between 0 and 100.
		var n = Number(this.sliderPleasure.value);
		if (n < 0) n += 1;
		n += 100;
		n = Math.ceil(n / 2);
		this.owner.setPleasure(n);
	},

	onSlideFocus: function() {
		var n = Number(this.sliderFocus.value);
		if (n < 0) n += 1;
		n += 100;
		n = Math.ceil(n / 2);
		this.owner.setFocus(n);
	}
}
