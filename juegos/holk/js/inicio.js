var carga = false;
var Holk = {
	VERSION:6,
	TAMANIO_SUELO:16,  //Con respecto al eje Y
	VELOCIDAD_SUELO:-1.2,
	VELOCIDAD_MARCK:-2,
	POSICION_HOLK_X:70,
	PORCION_TEXT_SCORE:10,
	PORCION_H_MARCK:8,
	HEIGHT_HOLK:258,
	PORCION_H_HOLK:5,
	PORCION_PACMAN:15,
	MEGA_ALTURA_MAX:8,
	PORCION_H_MEGA:3,  //Con respecto a la altura de holk
	VELOCIDAD_MEGA:-2.15,
	GRAVEDAD:0.2,
	VELOCIDAD_HOLK:{SALTO1:-0.55,SALTO2:-0.85},
	VELOCIDAD_FONDO:-100,
	TAMANIO_ENTRE_EDIFICIOS:4,
	TAMANIO_EDIFICIOS_PORCION:9, //Con respecto al eje Y
	TEXTURES: [{nombre:"suelo",width:112,height:112}]
};
Holk.Inicio = function(game) {};
Holk.Inicio.prototype = {
	preload: function() {
		console.log("preload Holk.Inicio");
		if (!carga){
			carga = true;
			this.game.load.image('suelo', 'assets/suelo.png');
			this.game.load.image('mega', 'assets/mega.png');
			this.game.load.image('pacman', 'assets/pacman.png');

			this.game.load.spritesheet('marck', 'assets/marck.png',224,315);


			this.game.load.image('fondo1', 'assets/background/layer-1.png');
			this.game.load.image('fondo2', 'assets/background/layer-2.png');
			this.game.load.image('fondo3', 'assets/background/layer-3.png');
			this.game.load.image('fondo4', 'assets/background/layer-4.png');
			this.game.load.image('fondo5', 'assets/background/layer-5.png');
			this.game.load.image('banner', 'assets/banner.png');

			this.game.load.spritesheet('holk', 'assets/hulk.png', 185, 258);
			this.game.load.spritesheet('marcianito', 'assets/marcianito.png', 128, 190);

			this.game.load.audio('cumbia','assets/marcianito.mp3');
			this.game.load.audio('fondo','assets/marcianito.mp3');
			this.game.load.audio('powerup','assets/powerup.mp3');
			this.game.load.audio('marck_colision_rojo','assets/marck_colision_rojo.mp3');
			this.game.load.audio('game_over','assets/game_over.wav');
			this.game.load.audio('item','assets/item.wav');
			console.log("Cargando");
		}

	    //text.events.onInputDown.add(function(){this.game.state.start('Juego');}, this);
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
	create: function() {
		console.log("create Holk.Inicio");

	 	this.crea_fondo();
		var image = this.game.cache.getImage('banner');
		var porcion = this.game.world.width /image.width;

		var banner = this.game.add.sprite(0,this.game.world.height / 6, 'banner');
		banner.scale.setTo(porcion,porcion);
		banner.inputEnabled = true;


		banner.events.onInputDown.add(function(){this.game.state.start('Juego');}, this);



	 	var juego_nuevo = this.game.add.text(this.game.world.width / 2 + this.game.world.width / 10,this.game.world.height / 1.5,  score,
	 		 	{ font: ( this.game.world.height / 12) +  "px phosphate", fill: "#39c05c", align: "center" });

	    juego_nuevo.anchor.set(0.5);
	    juego_nuevo.setText("Juego Nuevo");

		this.crea_suelo_completo();
	},
	update: function () {
		// body...
	}
};