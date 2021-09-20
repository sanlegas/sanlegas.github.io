
Bola.Puntaje = function(game) {
	this.game = game;
};
Bola.Puntaje.prototype = {
	preload: function() {


	},
	crea_fondo: function(){

	   	var cielo  	= 	this.game.add.sprite(0 , 0, 'fondo');
	   	cielo.width = this.game.world.width;
	   	cielo.height = this.game.world.height;

	   	var cloud  	= 	this.game.add.tileSprite(0 , 0, this.game.world.width,this.game.world.height ,'cloud');
    	cloud.autoScroll(0, 50);


	    var text = "Puntaje máximo: \n " + this.puntaje_max(0);


    	var puntaje = this.game.add.text(this.game.world.width / 2,400, text,
	 		 					{ font: "80px Orange", fill: "#000", align: "center" });

	    puntaje.anchor.set(0.5);

    	puntaje.inputEnabled =true;
	    puntaje.events.onInputDown.add(function(){
	        this.game.state.start('Inicio');

	    }, this);
	},
	puntaje_max: function(score){
		var pm = localStorage.getItem('score_Bola') || 0;
		if (score > pm){
			pm = score;
			localStorage.setItem('score_Bola',pm);
		}
		return pm;
	},
	create: function() {
	 	this.crea_fondo();

	},
	update: function () {
		// body...
	}
};