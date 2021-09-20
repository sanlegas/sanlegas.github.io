
Holk.Terminado = function(game) {};
Holk.Terminado.prototype = {
	preload: function() {


	},
	crea_fondo: function(){
		var image = this.game.cache.getImage('fondo5');
	    var bgBuildings = this.game.add.tileSprite(0, 0, image.width, image.height, 'fondo5');
	    var porcion = this.game.world.height /image.height;
	    bgBuildings.scale.setTo(porcion,porcion);
	    this.game.physics.enable(bgBuildings, Phaser.Physics.ARCADE);
	    bgBuildings.body.allowGravity = false;
	    bgBuildings.body.immovable = true;
    	bgBuildings.autoScroll(Holk.VELOCIDAD_FONDO, 0);
	    this.game.world.sendToBack(bgBuildings);

		var image = this.game.cache.getImage('fondo4');
	    var bgBuildings = this.game.add.tileSprite(0, 0, image.width, image.height, 'fondo4');
	    var porcion = this.game.world.height /image.height;
	    bgBuildings.scale.setTo(porcion,porcion);
	    this.game.physics.enable(bgBuildings, Phaser.Physics.ARCADE);
	    bgBuildings.body.allowGravity = false;
	    bgBuildings.body.immovable = true;
    	bgBuildings.autoScroll(Holk.VELOCIDAD_FONDO + (Holk.VELOCIDAD_FONDO * 0.2), 0);
	    this.game.world.sendToBack(bgBuildings);

		var image = this.game.cache.getImage('fondo2');
	    var bgBuildings = this.game.add.tileSprite(0, 0, image.width, image.height, 'fondo2');
	    var porcion = this.game.world.height /image.height;
	    bgBuildings.scale.setTo(porcion,porcion);
	    this.game.physics.enable(bgBuildings, Phaser.Physics.ARCADE);
	    bgBuildings.body.allowGravity = false;
	    bgBuildings.body.immovable = true;
    	bgBuildings.autoScroll(Holk.VELOCIDAD_FONDO, 0);
	    this.game.world.sendToBack(bgBuildings);

		var image = this.game.cache.getImage('fondo1');
	    var bgBuildings = this.game.add.tileSprite(0, 0, image.width, image.height, 'fondo1');
	    var porcion = this.game.world.height /image.height;
	    bgBuildings.scale.setTo(porcion,porcion);
	    this.game.physics.enable(bgBuildings, Phaser.Physics.ARCADE);
	    bgBuildings.body.allowGravity = false;
	    bgBuildings.body.immovable = true;
    	bgBuildings.autoScroll(Holk.VELOCIDAD_FONDO, 0);
	    this.game.world.sendToBack(bgBuildings);
	},
	
	crea_suelo_completo: function () {

		suelo = this.game.add.tileSprite(0, this.game.world.height - this.game.world.height / Holk.TAMANIO_SUELO,
													this.game.world.width * 2  , this.game.world.height / Holk.TAMANIO_SUELO ,
													'suelo');

    	suelo.autoScroll(this.game.world.height / Holk.VELOCIDAD_SUELO, 0);

	},
	puntaje_max: function(score){
		var pm = localStorage.getItem('score_holk') || 0;
		if (score > pm){
			pm = score;
			localStorage.setItem('score_holk',pm);
		}
		return pm;
	},
	create: function() {
	 	this.crea_fondo();

	 	var text = this.game.add.text(this.	game.world.centerX, this.	game.world.centerY, "JUEGO TERMINADO \n PUNTAJE: " + score +" \n PUNTAJE MÁXIMO: " + this.puntaje_max(score) ,
	 		 	{ font: ( this.game.world.width / 12) +  "px phosphate", fill: "#39c05c", align: "center" });
	 	//this.scaleStage();
	    text.anchor.set(0.5);
	    text.inputEnabled = true;
	    text.events.onInputDown.add(function(){this.game.state.start('Inicio');}, this);
		
	 	this.crea_suelo_completo();
	},
	update: function () {
		// body...
	}
};