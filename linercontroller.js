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
			slider.setAttribute('min', '-20');
			slider.setAttribute('max', '20');
			slider.setAttribute('step', '1');
			slider.setAttribute('value', this.owner.ascalar[i]);
			
			var self = this;
			slider.oninput = function(e) {self.onSlide(e)};
			slider.onchange = function(e) {self.onSlide(e)};
			this.aslider.push(slider);
		}
	},

	xonSlide: function(e) {
		var slider = e.target
		var i = parseInt(e.target.id)
		var n = Number(slider.value);
		this.owner.ascalar[i] = n;	
		document.getElementById('scalar_' + i).innerHTML = n;
		this.owner.drawGraph();
	},

	onSlide: function(e) {
		f = function(v) {
			if (v ==  0) n =  0;
			else if (v ==  1) n =  0;
			else if (v ==  2) n = .1;
			else if (v ==  3) n = .2;
			else if (v ==  4) n = .3;
			else if (v ==  5) n = .4;
			else if (v ==  6) n = .5;
			else if (v ==  7) n = .6;
			else if (v ==  8) n = .7;
			else if (v ==  9) n = .8;
			else if (v == 10) n = .9;
			else if (v == 11) n =  1;
			else if (v == 12) n =  2;
			else if (v == 13) n =  3;
			else if (v == 14) n =  4;
			else if (v == 15) n =  5;
			else if (v == 16) n =  6;
			else if (v == 17) n =  7;
			else if (v == 18) n =  8;
			else if (v == 19) n =  9;
			else if (v == 20) n = 10;
			else if (v == -1) n =  0;
			else if (v == -2) n =-.1;
			else if (v == -3) n =-.2;
			else if (v == -4) n =-.3;
			else if (v == -5) n =-.4;
			else if (v == -6) n =-.5;
			else if (v == -7) n =-.6;
			else if (v == -8) n =-.7;
			else if (v == -9) n =-.8;
			else if (v ==-10) n =-.9;
			else if (v ==-11) n = -1;
			else if (v ==-12) n = -2;
			else if (v ==-13) n = -3;
			else if (v ==-14) n = -4;
			else if (v ==-15) n = -5;
			else if (v ==-16) n = -6;
			else if (v ==-17) n = -7;
			else if (v ==-18) n = -8;
			else if (v ==-19) n = -9;
			else if (v ==-20) n =-10;
			return n
		}
		var slider = e.target
		var i = parseInt(e.target.id)
		var v = Number(slider.value);
		
		// logarithmic scale, derive n from v
		var n = f(v);
		


		this.owner.ascalar[i] = n;	
		document.getElementById('scalar_' + i).innerHTML = n;
		this.owner.drawGraph();
	},
}

