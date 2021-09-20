
Bola.Acerca = function(game) {
	this.game = game;
};
Bola.Acerca.prototype = {
	preload: function() {


	},
	crea_fondo: function(){

	   	var cielo  	= 	this.game.add.sprite(0 , 0, 'fondo');
	   	cielo.width = this.game.world.width;
	   	cielo.height = this.game.world.height;

	   	var cloud  	= 	this.game.add.tileSprite(0 , 0, this.game.world.width,this.game.world.height ,'cloud');
    	cloud.autoScroll(0, 50);

	   	var sanlegas  	= 	this.game.add.sprite(this.game.world.width / 2  , 200, 'sanlegas');
	   	sanlegas.width = 130;
	   	sanlegas.height = 130;
	   	sanlegas.inputEnabled = true;
	   	sanlegas.events.onInputDown.add(function () {
	   		// body...
	   		window.open("https://www.youtube.com/user/issale99");
	   	},this);
	   	sanlegas.anchor.set(0.5);
		this.game.add.tween(sanlegas).to( { width:160,height:160}, 500, Phaser.Easing.Linear.None, true, 0, 500, true);

    	var text1 = this.game.add.text(this.game.world.width / 2,350, "Programado por Sanlegas",
	 		 					{ font: "50px Orange", fill: "#000", align: "center" });
	    text1.anchor.set(0.5);
    	text1.inputEnabled =true;
	    text1.events.onInputDown.add(function(){
	        window.open("https://www.youtube.com/user/issale99");
	    }, this);

	   	var youtube  	= 	this.game.add.sprite(this.game.world.width / 2 , 470, 'youtube');
	   	youtube.width = 150;
	   	youtube.height = 110;
	   	youtube.inputEnabled = true;
	   	youtube.events.onInputDown.add(function () {
	   		window.open("https://www.youtube.com/user/issale99");
	   	},this);
	   	youtube.anchor.set(0.5);
		this.game.add.tween(youtube).to( { width:180,height:140}, 500, Phaser.Easing.Linear.None, true, 0, 500, true);

    	var text2 = this.game.add.text(this.game.world.width / 2,630, "www.youtube.com/user\n/issale99",
	 		 					{ font: "50px Orange", fill: "#000", align: "center" });
	    text2.anchor.set(0.5);
    	text2.inputEnabled =true;
	    text2.events.onInputDown.add(function(){
	        window.open("https://www.youtube.com/user/issale99");
	    }, this);

	   	var back  	= 	this.game.add.sprite(this.game.world.width / 2 	 , 800, 'back');
	   	back.width 	= 160;
	   	back.height = 80;
        back.anchor.setTo(0.5, 0.5);
        back.angle = 180;
        back.inputEnabled = true;

        back.events.onInputDown.add(function() {
        	this.game.state.start("Inicio");
        },this);


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