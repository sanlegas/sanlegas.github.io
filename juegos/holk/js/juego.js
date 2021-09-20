var game;
var edificio_grupo;
var edificios;
var posicion_holk_x;
var music_marcianito;
var music_fondo;
var music_fondo_rojo;
var sound_rojo;
var text_score;
var score = 0;
var marck_grupo;
var cont_velocidad_marck=0;
var interstitial;
var interstitial_ok = false
var banner;

function main() {
    // You application code

	Cocoon.Ad.AdMob.configure({
	     android: {
	          interstitial: "ca-app-pub-4628520148212977/4269822246",
	          banner: 		"ca-app-pub-4628520148212977/5781104647"
	     }
	});

};

function is_mobile(){

	return document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
}

document.addEventListener('deviceready', main, false);

Holk.Juego = function(g) {
	game = g;
};

Holk.Juego.prototype = {
	fin_juego: function(){
		if (is_mobile() && interstitial_ok){
			interstitial.show();
		}

		game.state.start('Terminado');
		music_fondo.stop();
		var sound = game.add.audio('game_over');
		sound.play();
		cont_velocidad_marck = 0;


		edificio_grupo = null;
		edificios = null;
		music_marcianito = null;
		music_fondo = null;
		sound_rojo = null;
		marck_grupo = null;
		cont_velocidad_marck=0;


	},
	muestra_intersticial: function(){

	},
	update: function () {

	    cont_velocidad_marck+=0.00003;

		var ultimo_edificio = edificio_grupo.getAt(edificio_grupo.length -1);
		//console.log(ultimo_edificio);
		var porcion = (this.game.world.height / Holk.TAMANIO_EDIFICIOS_PORCION) / 112;

		if (ultimo_edificio != -1){
			this.crea_marck(ultimo_edificio.x + (ultimo_edificio.width * porcion) + ((this.game.world.height / Holk.TAMANIO_EDIFICIOS_PORCION) * Holk.TAMANIO_ENTRE_EDIFICIOS) ,ultimo_edificio.position.y);

			if (edificio_grupo.length <= 4){
				var num_edificios =  Math.floor(Math.random() * 4) + 3;
				var alto_edificio =  Math.floor(Math.random() * 3) + 1;

				this.crea_edificio(ultimo_edificio.x + (ultimo_edificio.width * porcion) + ((this.game.world.height / Holk.TAMANIO_EDIFICIOS_PORCION) * Holk.TAMANIO_ENTRE_EDIFICIOS),num_edificios,alto_edificio);
			}
		}else{
			var num_edificios =  Math.floor(Math.random() * 3) + 2;
			var alto_edificio =  Math.floor(Math.random() * 3) + 1;
			this.crea_edificio(this.game.world.width * 2.3,num_edificios,1);

		}

	},
	crea_marck: function(x,y){
		var flag = false;


		if (marck_grupo.length  < 2){
					console.log("Persigue:",marck_grupo.length);

		    var marck = this.game.add.sprite(x,y, 'marck');
			this.game.physics.enable(marck, Phaser.Physics.ARCADE);
			marck.body.immovable = true;

			var mult = (Math.random() * 2) + 1;
			marck.body.velocity.x = (this.game.world.height /  Holk.VELOCIDAD_MARCK) * mult * (1 + cont_velocidad_marck);

	        marck.width = this.game.world.height / Holk.PORCION_H_MARCK;
	        marck.height = this.game.world.height / Holk.PORCION_H_MARCK;
	        marck.anchor.setTo(0.5,0.5);
			var a =  Math.floor(Math.random() * 2);

	        marck.update  = function(){

				if (this.body.position.x + (this.body.width) < 0 || (this.body.position.y ) > this.game.world.height) {

					this.destroy();
				}else{

					if ((marck.body.position.x >= (game.world.width / 3) * 2) && a==1){
						if (holk.body.position.y > marck.body.position.y + marck.height){
							marck.body.position.y+=5;
						}else if(holk.body.position.y < marck.body.position.y){
							marck.body.position.y-=5;
						}
					}

					game.physics.arcade.overlap(holk, marck, function(){
						if (holk.rojo){
							marck.angle = 180;
							marck.body.gravity.y = holk.body.gravity.y * 2;

						}else{
				        	this.game.physics.arcade.collide(holk, marck);

						}
						var sound = this.game.add.audio('marck_colision_rojo');
						sound.play();
					}, null, this);

				}
	        }

	        marck_grupo.add(marck);
	    }

	},
	fin_rojo: function(){
		holk.rojo = false;
		holk.animations.play('corriendo');
		//music_fondo.play();
		//music_fondo_rojo.stop();
		//console.log("fin rojo");
	},
	recoge_pacman: function(holk,pacman){
		//console.log("Recogiendo pacman");
		var sound = game.add.audio('item');
		sound.play();
		score+=10;
		text_score.setText(score);
		pacman.kill();
	},
	recoge_mega : function(holk,mega){


		if (!holk.rojo){

		    game.time.events.add(Phaser.Timer.SECOND * 15, Holk.Juego.prototype.fin_rojo, this);
    		sound_rojo = game.add.audio('powerup');
    		sound_rojo.onStop.add(function(s){

    		},this);

    		sound_rojo.play();
    		music_fondo.play();

	    	holk.rojo = true;
			holk.animations.play('corriendo_rojo');

		}

		mega.kill();

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
	create: function() {

		if (is_mobile() && (banner == null || banner == undefined)){

			banner = Cocoon.Ad.AdMob.createBanner();
			interstitial = Cocoon.Ad.AdMob.createInterstitial();
			interstitial_ok = false;

			interstitial.on("load", function(){
			   interstitial_ok = true;
			});

			banner.on("load", function(){
			   banner.show();
			});

			interstitial.load();
			banner.load();
		}


		score = 0;
		game.physics.startSystem(Phaser.Physics.ARCADE);


		edificio_grupo = this.game.add.group();
	    edificio_grupo.enableBody = true;
	    //game = this.game;

		mega_grupo = this.game.add.group();

	    pacman_grupo = this.game.add.group();
	    pacman_grupo.enableBody = true;

	   	marck_grupo = this.game.add.group();
	    marck_grupo.enableBody = true;

	    this.crea_fondo();

	    this.game.input.onTap.add(this.onTap, this);

	    	music_fondo = game.add.audio('fondo');
	    	music_fondo.loop = true;

	    	music_fondo.play();



    	var tamanio_porcion = this.game.world.height / Holk.PORCION_H_HOLK;
	    var porcion = tamanio_porcion / Holk.HEIGHT_HOLK;

	    var py = this.game.world.height - (this.game.world.height / Holk.TAMANIO_SUELO) - (Holk.HEIGHT_HOLK * porcion);
	    holk = this.game.add.sprite(Holk.POSICION_HOLK_X, py, 'holk');
    	this.game.physics.enable(holk, Phaser.Physics.ARCADE);


	    holk.width = holk.width * porcion;
	   	holk.height = holk.height * porcion;
	   	//holk.scale.setTo(porcion,porcion);

	   	holk.rojo = false;
    	holk.animations.add('corriendo', [0,1, 2, 3, 4, 5, 6, 7, 8], 20, true);
    	holk.animations.add('corriendo_rojo', [18,19, 20, 21, 22, 23, 24, 25, 26], 20, true);
    	holk.animations.add('saltando_rojo', [18,19, 20, 21, 22, 23, 24, 25, 26], 8, true);

    	holk.animations.add('saltando', [0,1, 2, 3, 4, 5, 6, 7, 8], 8, true);
    	holk.animations.play('corriendo');


    	holk.cont_salto = 0;

    	holk.update = function () {
    		// body...
	    	if (holk.body.position.y >= this.game.world.height){
				Holk.Juego.prototype.fin_juego();

	    	}

    		if (holk.body.position.x > 0){
    			holk.body.position.x = Holk.POSICION_HOLK_X;
    		}
    	}

	    if (1== 1) {


		    var marcianito = this.game.add.sprite(this.game.world.width / 2,holk.height / 2, 'marcianito');
		    var a = Array.apply(null, {length: 128}).map(Number.call, Number);
		    marcianito.animations.add('bailando',a);
		    marcianito.play('bailando',15,true);
		    marcianito.isPlay = false;
		    marcianito.width = holk.width;
		    marcianito.height = holk.height;

		    marcianito.inputEnabled = true;
		    marcianito.events.onInputDown.add(function(){
		    	if (marcianito.isPlay){
		    		marcianito.isPlay = false;
		    		music_marcianito.stop();
		    	}else{
		    		marcianito.isPlay = true;
		    		music_marcianito.play();
		    	}
		    },this);

		}


	    this.crea_suelo_completo();

    	holk.body.gravity.y = this.game.world.height / Holk.GRAVEDAD;

	 	text_score = this.game.add.text(this.game.world.width / 2,holk.height / 1.5,  score,
	 		 	{ font: ( this.game.world.height / Holk.PORCION_TEXT_SCORE) +  "px phosphate", fill: "#39c05c", align: "center" });
	    text_score.anchor.set(0.5);


	},
	crea_suelo_completo: function () {

		suelo = this.game.add.tileSprite(0, this.game.world.height - this.game.world.height / Holk.TAMANIO_SUELO,
													this.game.world.width * 2  , this.game.world.height / Holk.TAMANIO_SUELO ,
													'suelo');

		this.game.physics.enable(suelo, Phaser.Physics.ARCADE);
		suelo.body.immovable = true;

		suelo.body.velocity.x = this.game.world.height /  Holk.VELOCIDAD_SUELO;

        suelo.checkWorldBounds = true;
        suelo.outOfBoundsKill = true;

        suelo.update = function(){
        	this.game.physics.arcade.collide(holk, suelo,Holk.Juego.prototype.toca_suelo);

        }


	},onTap:function (pointer) {

		if (holk.cont_salto  < 2){
			if (holk.cont_salto == 1){
				holk.body.velocity.y = this.game.world.height / Holk.VELOCIDAD_HOLK.SALTO2;

			}else{

				holk.body.velocity.y = this.game.world.height / Holk.VELOCIDAD_HOLK.SALTO1;

			}
			holk.cont_salto++;
			holk.saltando = true;
			if (holk.rojo){
				holk.animations.play('saltando_rojo');
			}else{
				holk.animations.play('saltando');
			}


		}
	},
	toca_suelo: function(){
		holk.cont_salto = 0;
		holk.saltando = false;
		if (holk.rojo){
			holk.animations.play('corriendo_rojo');
		}else{
			holk.animations.play('corriendo');
		}
	},
	crea_mega: function(x,porcion,texture,width,height){
		if (holk.rojo) return false;

 		if (Math.floor(Math.random() * 4) == 0){
			//console.log("Generando mega");
			var y_max = this.game.world.height - ( (height * porcion) * texture.height) - (holk.height / Holk.PORCION_H_MEGA);
			var y_min = this.game.world.height - ( (height * porcion) * texture.height) - ((holk.height / Holk.PORCION_H_MEGA) * Holk.MEGA_ALTURA_MAX);
		    var mega  = this.game.add.sprite(x + ((width * texture.width * porcion ) / 2) - ( (holk.height / Holk.PORCION_H_MEGA)/2)   , y_max, 'mega');

		    mega.width = holk.height / Holk.PORCION_H_MEGA;
		   	mega.height = holk.height / Holk.PORCION_H_MEGA;
		   	mega.velocidad = this.game.world.height / Holk.VELOCIDAD_MEGA * -1;

	    	this.game.physics.enable(mega, Phaser.Physics.ARCADE);
	    	//console.log("velocidad ",mega.velocidad);
		   	mega.body.velocity.y = mega.velocidad * -1;
		   	mega.body.gravity.y = 0;
		   	mega.body.velocity.x = this.game.world.height / Holk.VELOCIDAD_SUELO;

		   	mega.update = function(){
		   		if (this.velocidad < 0){
		   			//console.log("velocidad es negativa");
		   			if (this.body.position.y >= y_max){
		   				//console.log("y llego a maximo");
		   				this.body.velocity.y = this.velocidad;
		   				this.velocidad =  this.velocidad * -1;
		   			}
		   		}else{
		   			//console.log("velocidad es positiva");
		   			if (this.body.position.y <= y_min){
		   				//console.log("y llego a minimo");
		   				this.body.velocity.y = this.velocidad;
		   				this.velocidad =  this.velocidad * -1;
		   			}
		   		}

				game.physics.arcade.overlap(holk, mega, function(){
					Holk.Juego.prototype.recoge_mega(holk,mega);
				}, null, this);

				if (this.body.position.x + (this.body.width * porcion) < 0) {

					this.kill();
				}


		   	}

	    	mega_grupo.add(mega);
	    	return true;
		}
		return false;
	},
	checkOverlap: function(spriteA, spriteB) {

	    var boundsA = spriteA.getBounds();
	    var boundsB = spriteB.getBounds();

	    return Phaser.Rectangle.intersects(boundsA, boundsB);

	},
	crea_edificio: function (x,width,height,sin_imagenes) {

		var i = 0;

		var texture = Holk.TEXTURES[i];

		var porcion = (this.game.world.height / Holk.TAMANIO_EDIFICIOS_PORCION) / texture.height;

		if (sin_imagenes == undefined || !sin_imagenes){

			if (!this.crea_mega(x,porcion,texture,width,height)){
				var tam_pacman = this.game.world.height / Holk.PORCION_PACMAN;

				var eje_y_aleatorio = Math.floor(Math.random() * 6) + 1;
				var eje_x_aleatorio = Math.floor(Math.random() * (width * texture.width * porcion) + tam_pacman);

			    var pacman  	= 	this.game.add.sprite(x - tam_pacman + eje_x_aleatorio , this.game.world.height - ( (height * porcion) * texture.height) - ((this.game.world.height / Holk.PORCION_PACMAN) * eje_y_aleatorio), 'pacman');
			    pacman.width 	= 	tam_pacman;
			   	pacman.height 	= 	tam_pacman;

		    	this.game.physics.enable(pacman, Phaser.Physics.ARCADE);
		    	//pacman.body.gravity.y = 200;
		    	pacman.body.velocity.x = this.game.world.height / Holk.VELOCIDAD_SUELO;

		    	pacman_grupo.add(pacman);

		    	pacman.update = function () {
		    		//this.game.physics.arcade.collide(pacman, edificio_grupo);
		    		this.game.physics.arcade.overlap(holk, pacman,Holk.Juego.prototype.recoge_pacman,null,this);

		    	};

			}
		}

		var edificio =	this.game.add.tileSprite(x,
		 				this.game.world.height - ( (height * porcion) * texture.height),
		 				(width * 1) * texture.width,height * texture.height,texture.nombre);


		edificio.porcion = porcion;


		edificio.scale.setTo(porcion,porcion);

	    this.game.physics.enable(edificio, Phaser.Physics.ARCADE);
	    edificio.body.allowGravity = false;
	    edificio.body.immovable = true;
	    edificio.body.velocity.x = this.game.world.height / Holk.VELOCIDAD_SUELO ;

	    edificio.update = function(){
	    	//edificio.body.position.x = edificio.body.position.x - 2;

			this.game.physics.arcade.collide(holk, edificio,Holk.Juego.prototype.toca_suelo);

			//this.game.physics.arcade.collide(mega, edificio_grupo);

			if (this.body.position.x + (this.body.width * porcion) < 0) {

				this.destroy();
			}

	    }

    	edificio_grupo.add(edificio);

	}
};
