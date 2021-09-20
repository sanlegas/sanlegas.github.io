
Bola.Inicio = function(game) {
	this.game = game;

};
Bola.Inicio.prototype = {
	preload: function() {

		this.game.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.setShowAll();
		this.game.scale.refresh();

	},
	dibujaBotones: function(){
		Funciones.prototype.dibujaBotones();
	},
	crea_fondo: function(){

	   	var cielo  	= 	this.game.add.sprite(0 , 0, 'fondo');
	   	cielo.width = this.game.world.width;
	   	cielo.height = this.game.world.height;
	   	//cielo.alpha = 0.4;

	   	var cloud  	= 	this.game.add.tileSprite(0 , 0, this.game.world.width,this.game.world.height ,'cloud');
    	cloud.autoScroll(0, 50);
    	cloud.alpha = 0.5;
    	var terminado_text = this.game.add.text(this.game.world.width / 2,300, "Juego nuevo",
	 		 					{ font: "80px Orange", fill: "#000", align: "center" });

    	terminado_text.inputEnabled =true;
	    terminado_text.events.onInputDown.add(function(){
	        this.game.state.start('Juego');
	    }, this);

	    terminado_text.anchor.set(0.5);
     	var puntaje_text = this.game.add.text(this.game.world.width / 2,450, "Puntaje máximo",
	 		 					{ font: "80px Orange", fill: "#000", align: "center" });
    	puntaje_text.inputEnabled =true;
	    puntaje_text.events.onInputDown.add(function(){
	        this.game.state.start('Puntaje');
	    }, this);

	    puntaje_text.anchor.set(0.5);

     	var acerca_text = this.game.add.text(this.game.world.width / 2,600, "Acerca de",
	 		 					{ font: "80px Orange", fill: "#000", align: "center" });
    	acerca_text.inputEnabled =true;
	    acerca_text.events.onInputDown.add(function(){
	        this.game.state.start('Acerca');
	    }, this);

	    acerca_text.anchor.set(0.5);

 	   	var pacman  	= 	this.game.add.sprite(this.game.world.width / 2, 120, 'pacman');
	   	pacman.anchor.set(0.5);
	   	pacman.inputEnabled = true;
	   	pacman.events.onInputDown.add(function () {
	   		// body...
	   		this.game.state.start('Juego');
	   	},this);

	   	pacman.width = 150;
	   	pacman.height = 150;

		this.game.add.tween(pacman).to( { width:180,height:180}, 500, Phaser.Easing.Linear.None, true, 0, 500, true);

	},
	resize: function () {

	    var canvas = game.canvas, width = window.innerWidth, height = window.innerHeight;
	    var wratio = width / height, ratio = canvas.width / canvas.height;

	    if (wratio < ratio) {
	        canvas.style.width = width + "px";
	        canvas.style.height = (width / ratio) + "px";
	    } else {
	        canvas.style.width = (height * ratio) + "px";
	        canvas.style.height = height + "px";
	    }

	},
	create: function() {
		//this.resize();
	 	this.crea_fondo();

	},
	update: function () {
		// body...
	}
};
