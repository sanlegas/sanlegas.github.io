
Bola.Terminado = function(game) {
	this.game = game;
};
Bola.Terminado.prototype = {
	preload: function() {


	},
	crea_fondo: function(){



	   	var cielo  	= 	this.game.add.sprite(0 , 0, 'fondo');
	   	cielo.width = this.game.world.width;
	   	cielo.height = this.game.world.height;

	   	var cloud  	= 	this.game.add.tileSprite(0 , 0, this.game.world.width,this.game.world.height ,'cloud');
    	cloud.autoScroll(0, 50);

    	var terminado_text = this.game.add.text(this.game.world.width / 2,250, "Juego terminado",
	 		 					{ font: "80px Orange", fill: "#000", align: "center" });

	    terminado_text.anchor.set(0.5);

	    var text = "";
	    if (this.puntaje_max(score) == score){
	    	text = "Nuevo puntaje!\n " + score;
	    }else{
	    	text = "Puntaje hecho \n " + score + "\n Puntaje máximo \n " + this.puntaje_max(score);
	    }


    	var puntaje = this.game.add.text(this.game.world.width / 2,550, text,
	 		 					{ font: "80px Orange", fill: "#000", align: "center" });

	    puntaje.anchor.set(0.5);

    	puntaje.inputEnabled =true;
	    puntaje.events.onInputDown.add(function(){
	        this.game.state.start('Inicio');

	    }, this);

	   	var pacman  	= 	this.game.add.sprite(this.game.world.width / 2, 120, 'pacmanKill');
	   	pacman.anchor.set(0.5);


	   	pacman.width = 120;
	   	pacman.height = 120;

		this.game.add.tween(pacman).to( { width:150,height:150}, 500, Phaser.Easing.Linear.None, true, 0, 500, true);

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
	   	var finish = this.game.add.audio('finish');
	   	finish.play();
	},
	update: function () {
		// body...
	}
};