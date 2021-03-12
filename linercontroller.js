/* linercontroller.js */

LinerController = function(owner, container) {
	this.owner = owner;
	this.container = container;
	this.aslider = [];
}

LinerController.prototype = {
	load: function() {
		this.setup()
	},

	resize: function() {
	},

	setup: function() {
		this.divController = document.createElement( 'div');
		this.divController.id = 'controller';
		this.container.appendChild(this.divController);

		var table = document.createElement( 'table');
		this.divController.appendChild(table);
		var row = table.insertRow();
		var cell,s;

		for (var i=this.owner.nterms-1; i>=0; i--) {
			cell = row.insertCell();
			if (i == this.owner.nterms-1)
				cell.innerHTML = 'y = ';
			else
				cell.innerHTML = '+';

			cell = row.insertCell();

			s = document.createElement('span');
			cell.appendChild(s);
			s.id = 'scalar_'+i;
			s.class = 'term_scalar';
			s.innerHTML = this.owner.ascalar[i];

			s = document.createElement('span');
			cell.appendChild(s);
			s.class = 'term_constant';
			s.innerHTML = 'x';

			s = document.createElement('span');
			cell.appendChild(s);
			s.class = 'term_exponent';
			s.innerHTML = '<sup>' + i + '</sup>';
		}

		var row = table.insertRow();
		for (var i=this.owner.nterms-1; i>=0; i--) {
			cell = row.insertCell();
			cell = row.insertCell();
			slider = document.createElement( 'input');
			cell.appendChild(slider);
			slider.id = i
			slider.setAttribute('type', 'range');
			slider.setAttribute('orient', 'vertical');
			slider.setAttribute('min', '-100');
			slider.setAttribute('max', '100');
			slider.setAttribute('step', '1');
			slider.setAttribute('value', this.owner.ascalar[i]);
			
			var self = this;
			slider.oninput = function(e) {self.onSlide(e)};
			slider.onchange = function(e) {self.onSlide(e)};
			this.aslider.push(slider);
		}
	},

	onSlide: function(e) {
		var slider = e.target
		var i = parseInt(e.target.id)
		var n = Number(slider.value);
		this.owner.ascalar[i] = n;	
		document.getElementById('scalar_' + i).innerHTML = n;
		this.owner.drawGraph();
	},
}

