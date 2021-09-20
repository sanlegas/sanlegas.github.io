

var zoomAmount;
var size = new Phaser.Rectangle();

var tamanio = 1;
var grid;

var puntos = [];

var upKey;

var downKey;
var leftKey;
var rigthKey;

var puntoView = {x:0,y:0};
var swipe;

var tamColor = 50;

var colores = [
								{color:"#FFFFFF"},
								{color:"#CFD8DC"},
								{color:"#424242"},
								{color:"#000000"},
								{color:"#E91E63"},
								{color:"#F44336"},
								{color:"#FF9800"},
								{color:"#795548"},
								{color:"#FFEB3B"},
								{color:"#8BC34A"},
								{color:"#4CAF50"},
								{color:"#00BCD4"},
								{color:"#2196F3"},
								{color:"#304FFE"},
								{color: "#B388FF"},
								{color:"#9C27B0"}
							];
var paleta;
var direction = 0;
var colorSeleccionado;

var pixel;

var juego;

var flagClick = false;
var stick;

var flagTest = false;


Pillo.Inicio = function(game) {
	this.game = game;
};
Pillo.Inicio.prototype = {
	onscroll: function (e) {
		//console.log(e);
		if(game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_UP) {

			direction = 1;
	   } else {
			 direction = 2;
	   }
	},
	create: function(){

  	this.game.input.mouse.mouseWheelCallback = this.onscroll;

		game.stage.backgroundColor = "#FFF";

		pad = this.game.plugins.add(Phaser.VirtualJoystick);

		stick = pad.addDPad(0, 0, 200, 'dpad');
	  stick.alignBottomLeft(0);

		stick.onDown.add(function (x) {
			flagClick = true;
		}, this);


    this.buttonA = pad.addButton(game.world.width - 200, game.world.height - 150, 'arcade', 'button1-up', 'button1-down');
		this.buttonA.onDown.add(this.zoomIn, this);

		this.buttonB = pad.addButton(game.world.width - 100, game.world.height - 150, 'arcade', 'button2-up', 'button2-down');
		this.buttonB.onDown.add(this.zoomOut, this);

		size = game.world.getBounds();

		upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		rigthKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		colorSeleccionado = colores[1];
		tamanio = 8;

		this.dibujaPrimer();
		this.dibujaPaletaColores();
		//pixel = this.creaPixel();
		juego = this;
		//this.game.input.onTap.add(this.clickSprite);
	},
	creaPixel:function () {
		var bmd = this.game.make.bitmapData(tamanio, tamanio);

		bmd.rect(0,0,tamanio,tamanio,"#fff");
		return bmd;
	},
	clickSprite2: function (s,p) {
		console.log("click sprite");
		if (flagClick){
			flagClick = false;
			return;

		}
		var x;
		var y;

		x = ( (s.input.downPoint.x + puntoView.x) / grid.scale.x) / tamanio;
		y = ( (s.input.downPoint.y + puntoView.y) / grid.scale.y) / tamanio;
		//console.log("click2",x,y);


		var punto = new Phaser.Point(Math.floor(x) ,Math.floor(y));
		var bmd = this.game.cache.getBitmapData('grid');
		console.log(bmd.width);
		var color = colorSeleccionado.color;
		console.log("click 2",punto.x * tamanio,punto.y * tamanio);


		bmd.rect(punto.x * tamanio,punto.y * tamanio,tamanio,tamanio, color);
		if(flagTest){
			console.log(puntoView.x,(bmd.width / 2));

			console.log((bmd.width / 2) + s.input.downPoint.x,punto.x * tamanio);

			//bmd.rect(0,0,(bmd.width / 2) + s.input.downPoint.x,s.input.downPoint.y, color);
		}
		bmd.dirty = true;

	},
	clickSprite: function (s,p) {

		var x;
		var y;

		x = s.input.downPoint.x / tamanio;
		y = s.input.downPoint.y / tamanio;

		var punto = new Phaser.Point(Math.floor(x) + puntoView.x,Math.floor(y) + puntoView.y);
		//punto.color = colorSeleccionado.color;

		puntos["" + punto.x + punto.y] = colorSeleccionado.color;


		var nx = punto.x - ((tamanioWorld / tamanio) / 2);
		var ny = punto.y - ( (tamanioWorld / tamanio) / 2) + ( (tamanioWorld / tamanio) / 8);

		puntoView.x = Math.floor(nx);
		puntoView.y = Math.floor(ny);

		juego.dibuja();
	},
	obtenColor: function (color) {
		var part = color.slice(1);
		return "0x".concat(part);
	},

	dibujaPaletaColores: function () {
		var numFila = 8;

		var graphics = game.add.graphics(0, 0);

		for (var i = 0; i < 2;i++){
			for (var n = 0; n < numFila;n++){
				var colorO = colores[(i * numFila) + n];

				graphics.lineStyle(1);
				graphics.beginFill(this.obtenColor(colorO.color),1);
				graphics.drawRect(n * tamColor, i * tamColor, tamColor, tamColor);

			}
		}
		if (paleta != undefined){
			paleta.destroy();
		}
		paleta = game.add.sprite((this.game.width / 2) - (tamColor * 4), this.game.height - (tamColor * 3));
		paleta.addChild(graphics);
		paleta.inputEnabled = true;
		paleta.input.pixelPerfectOver = true;
		paleta.input.useHandCursor = true;
		paleta.events.onInputDown.add(this.seleccionaColor, this);
		graphics = null;

	},
	seleccionaColor: function (s) {
		var x =	(s.input.downPoint.x - (this.game.width / 2) + (tamColor * 4)) / tamColor;
		var y = (s.input.downPoint.y - (this.game.height) + (tamColor * 3)) / tamColor;
		var i = Math.floor(x) + (Math.floor(y) * 8);
		colorSeleccionado = colores[i];
	},
	dibujaPrimer: function () {
		var num = (tamanioWorld * 4) / tamanio;
		var bmd = this.game.make.bitmapData(tamanio * num , tamanio * num);

		console.log("TAm: ",tamanio * num, (tamanio * num) * (tamanio * num));

		this.game.cache.addBitmapData('grid', bmd);

		grid = this.game.add.sprite(0, 0, bmd);
		grid.inputEnabled = true;
		//grid.input.enableDrag();
		grid.input.pixelPerfectOver = true;
		grid.events.onInputDown.add(this.clickSprite2, this);
		console.log("Dibuja primer");
	},
	dibujaPixel: function(){


		var x = game.input.mousePointer.position.x;
		var y = game.input.mousePointer.position.y;
		if (x == 0 && y == 0){
			return;
		}
		if (x >= paleta.x && x <= paleta.x + (tamColor * 8)){
			if (y >= paleta.y && y <= paleta.y + (tamColor * 2)){
				pixel.destroy();
				return;
			}
		}
		var bmd = this.game.make.bitmapData(tamanio , tamanio );
		bmd.rect(0,0,tamanio,tamanio, colorSeleccionado.color);
		if (pixel != undefined){
			pixel.destroy();
		}

		pixel = this.game.add.sprite(x, y, bmd);
		pixel.anchor.setTo(0.5,0.5);
		pixel.scale.set(grid.scale.x,grid.scale.y);


		bmd = null;
	},
	zoomIn: function () {
		flagClick = true;

		if (grid.scale.x < 0.1){
			grid.scale.set(grid.scale.x + 0.01,grid.scale.y +0.01);

		}else{
			grid.scale.set(grid.scale.x + 0.1,grid.scale.y +0.1);

		}

		console.log(grid.scale.x);

		console.log(puntoView);

	},
	zoomOut:function () {
		flagClick = true;

		if (grid.scale.x > 0.1){
			grid.scale.set(grid.scale.x - 0.1,grid.scale.y - 0.1);

		}else{
			grid.scale.set(grid.scale.x - 0.01,grid.scale.y - 0.01);

		}
		console.log(grid.scale.x);

	},
	validaLimites:function () {
		//console.log("Validando limites");
		var bmd = this.game.cache.getBitmapData('grid');

		if (grid.x > 0){
			console.log("Se va a renderizar parte izquierda");
			var num = (tamanioWorld * 4) / tamanio;

			var aumento = (450);

			var bmdNuevo = this.game.make.bitmapData(bmd.width + aumento, bmd.height + aumento);

			bmdNuevo.draw(bmd,aumento, aumento);

			//console.log(bmd.width);

			bmd = bmdNuevo;
			this.game.cache.addBitmapData('grid', bmd);
			var scale = {
									x:grid.scale.x,
									y:grid.scale.y}
									;

			console.log("Scale: ",scale);

			grid.destroy();
			grid = this.game.add.sprite(0, 0, bmd);
			grid.inputEnabled = true;
			grid.input.pixelPerfectOver = true;
			grid.events.onInputDown.add(this.clickSprite2, this);
			grid.scale.set(scale.x,scale.y);
			//scale = {x:grid.scale.x,y:grid.scale.y};
			console.log("Scale: ",scale);

			//console.log(bmd.width);
			grid.x = (aumento) * scale.x * -1;
			grid.y =  (aumento) * scale.y * -1;

			puntoView.x = (aumento) * scale.x;
			puntoView.y = aumento * scale.y;


			flagTest = true;
			this.dibujaPaletaColores();
			//debugger;
		}
	},
	update:function(){
		var p = Math.floor(Math.round( (1 / tamanio ) * 70)  ) - 1;
		var bmd = this.game.cache.getBitmapData('grid');

		this.dibujaPixel();

		if (stick.isDown)
			 {
				 console.log("stick down");

					 if (stick.direction === Phaser.LEFT)
					 {
							grid.x += p;
							puntoView.x -= p;
						}
					 else if (stick.direction === Phaser.RIGHT)
					 {
							grid.x -= p;

							puntoView.x += p;					 }
					 else if (stick.direction === Phaser.UP)
					 {
							grid.y += p;

							puntoView.y -= p ;
					 }
					 else if (stick.direction === Phaser.DOWN)
					 {
							grid.y -= p;
							puntoView.y += p ;
					 }
			 }

		if(direction !=0){
			switch (direction) {
				case 1:
					this.zoomIn();
					break;
				case 2:
					this.zoomOut();
			}
			direction = 0;
		}

		if (upKey.isDown){
			//bmd.move(0,p);
			grid.y += p;

			puntoView.y -= p ;
		}
		if (downKey.isDown){
			//bmd.move(0,-p);
			grid.y -= p;
			puntoView.y += p ;
		}
		if (leftKey.isDown){
			//bmd.move(p,0);
			grid.x += p;

			puntoView.x -= p;
		}
		if (rigthKey.isDown){
			//bmd.move(-p,0);
			grid.x -= p;

			puntoView.x += p;
		}
		//console.log(puntoView);

		this.validaLimites();
	}
};
