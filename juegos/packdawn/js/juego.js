var pacman;
var velocidad_barra = -50;
var barras;
var monedas;

var width_barra = 130;
var height_barra = width_barra / 10;

var tamanio_moneda = 30;

var timer;
var text_score;
var ultima_barra_y;
var score = 0;
var leftKey;
var rightKey;
var rect;
var rect2;
var rectl;
var rect2i;

var impact;
var sound_background;
var game;
var botones;
var pause;
var gyroInicial = 0;

var cloud;
var cielo;

var velocidadItem = 0;

var tiempoAireMoviendo = 5;
var aireMoviendo = false;

Bola.Juego = function(game) {
	this.game = game;

};
Bola.Juego.prototype = {

	crea_fondo: function(){

	},

	dibujaBotonesJuego: function(){

		botones = Funciones.prototype.dibujaBotonesJuego(this,this.veInicio,this.resetGame,
			function(){
    			botones.pause.loadTexture('play',0);
    			botones.pause.angle = 0;
					gyro.stopTracking();

	        	if ( !this.game.paused) this.game.paused = true;
        	});
	},
	crea_suelo_completo: function () {

	},
	render: function(){
    	//this.game.debug.geom( rect, 'rgba(255,0,0,1)' ) ;
    	//this.game.debug.geom( rect2, 'rgba(255,0,0,1)' ) ;

	},
	preload: function(){
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignVertically = true;
		this.game.scale.pageAlignHorizontally = true;

	},
	create: function() {
		
		//this.game.physics.startSystem(Phaser.Physics.ARCADE);

		score = 0;
		velocidad_barra = -50;
		velocidadItem = 0;

		game = Bola.Juego.prototype;
		juego = this.game;

	    leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    	rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);


	   	cielo  	= 	this.game.add.sprite(0 , 0, 'fondo');
	   	cielo.width = this.game.world.width;
	   	cielo.height = this.game.world.height;
	   	///cielo.alpha = 0.3;

	   	sound_background = this.game.add.audio('sound_background');
	   	sound_background.loop = true;
	   	sound_background.volume = .5;
	   	sound_background.play();

	   	impact = this.game.add.audio('impact');


	   	cloud  	= 	this.game.add.tileSprite(0 , 0, this.game.world.width,this.game.world.height ,'cloud');
    	//cloud.alpha = 0.3;

	    pacman  	= 	this.game.add.sprite(this.game.world.width / 2 , 200, 'pacman');

        this.game.physics.enable(pacman, Phaser.Physics.ARCADE);
        pacman.anchor.setTo(0.5, 0.5);

        pacman.width = 45;
        pacman.height = 45;
        pacman.body.gravity.y = 3000;

    	barras = this.game.add.group();
    	barras.enableBody = true;

    	monedas = this.game.add.group();
    	monedas.enableBody = true;

    	var x_aleatorio = Math.floor(Math.random() * (this.game.world.width-width_barra)  );
    	pacman.x = x_aleatorio;

    	this.genera_barra(x_aleatorio);

	 		text_score = this.game.add.text(this.game.world.width / 2,40,  "0",
	 		 					{ font: "60px Orange", fill: "#000", align: "center" });

	    text_score.anchor.set(0.5);
	    rect = new Phaser.Line(((this.game.world.width / 3) * 2) ,0,((this.game.world.width / 3) * 2),1000);
	    rect2 = new Phaser.Line((this.game.world.width / 3),0,(this.game.world.width / 3) ,1000);

			this.comienzaGiroscopio();

			this.dibujaBotonesJuego();
			this.game.input.onDown.add(this.despausa, this);

	},
	comienzaGiroscopio : function () {
		gyro.frequency = 8;

		gyro.startTracking(function(o) {
			console.log("tracking");

	   		if (gyroInicial == 0){
	   			gyroInicial = o.gamma;
	   		}

	   		pacman.body.velocity.x += (o.gamma -gyroInicial) * 8;

   			game.rota_pacman(pacman.body.velocity.x);

		});
	},
	despausa: function (event) {
		console.log(event,this.game.paused);
		if (this.game.paused){

			if (event.x >= 525 && event.x <= 565&& event.y >= 20 && event.y<= 60){
				this.game.paused = false;
    		botones.pause.loadTexture('pause',0);
    		botones.pause.angle = 180;
				this.comienzaGiroscopio();
			}
		}

	},
	 colision:function(bola,barra){

		if (!barra.tocada){
			impact.volume = 0.7;
	        impact.play();
			if("vibrate" in window.navigator) {
				window.navigator.vibrate(100);
			}
			barra.tocada = true;
			//score += 10;
		}
	},
	obtenUltimaBarra: function(){
		var y = 0;
		barras.forEach(function (item) {
			if (item.body.y > y){
				y = item.body.y;
			}
		});
		return y;
	},
	genera_barras:function(){


		var num_barras = Math.floor(Math.random() * 3) + 1;
		//num_barras = 3;
		switch (num_barras){
			case 1:
				this.genera_barra();
				break;
			case 2:
				var x1 = Math.floor(Math.random() * ( (this.game.world.width / 2)-width_barra)  ) + 1;
				var x2 = Math.floor(Math.random() * ( (this.game.world.width / 2)-width_barra)  ) + this.game.world.width / 2;
				this.genera_barra(x1);
				this.genera_barra(x2);
				break;
			case 3:
				var x1 = Math.floor(Math.random() * ( (this.game.world.width / 3)-width_barra  - 25)) + 1;
				var x2 = Math.floor(Math.random() * ( (this.game.world.width / 3)-width_barra  - 50)) + (this.game.world.width / 3) + 25;
				var x3 = Math.floor(Math.random() * ( (this.game.world.width / 3)-width_barra  - 50)) + ((this.game.world.width / 3) * 2) +  25;

				this.genera_barra(x1);
				this.genera_barra(x2);
				this.genera_barra(x3);
				break;
		}

    },
    rota_pacman: function(velocidad){
			console.log("Rotando pacman ", velocidad);
    	pacman.angle+= velocidad / 40;
    },
	mueve_izquierda: function(){
		this.valida_lados();

		pacman.body.velocity.x = -200 + velocidadItem;
		this.rota_pacman(pacman.body.velocity.x);
	},
	mueve_derecha: function(){
		this.valida_lados();

		pacman.body.velocity.x = 200 + velocidadItem;
		this.rota_pacman(pacman.body.velocity.x);
	},
	valida_lados: function(){
		if (pacman.x - pacman.width / 2 <0) pacman.x = pacman.width / 2;
		if (pacman.x + pacman.width / 2 >= juego.world.width) pacman.x = juego.world.width - pacman.width / 2;

	},
	muestra_info : function(texto,x,y){
		var text = this.game.add.text(x,y,  texto,
	 		 					{ font: "20px Arial", fill: "#04B404", align: "center" });
		text.alpha = 0.1;
    	var tween = this.game.add.tween(text).to( { alpha: 1 , y: y - 100}, 1000, "Linear", true);
    	tween.onComplete.add(function(){
    		text.destroy();
    	},this);
	},
	recogeMoneda: function (moneda) {
		score += 10;
		text_score.setText(score);
	   	var item_sound = this.game.add.audio('item');
	   	item_sound.play();
	   	this.muestra_info("+10",moneda.x + moneda.width / 2, moneda.y + moneda.height / 2);

	},
	recogeItemVerde: function (item) {

		if (Math.floor(Math.random() * 2) == 0){
			velocidadItem = 100;

			cloud.autoScroll(200, cloud._scroll.y);
		}else{
			velocidadItem = -100;

			cloud.autoScroll(-200, cloud._scroll.y);
		}

		aireMoviendo = true;


		this.game.time.events.add(Phaser.Timer.SECOND * tiempoAireMoviendo, function () {
			velocidadItem = 0;
			aireMoviendo = false;
			cloud.autoScroll(0, cloud._scroll.y);
		}, this);


	},
	recogeItem : function (pacman,item){
		switch (item.key)
		{
			case 'moneda':
				this.recogeMoneda(item);
				break;
			case 'itemVerde':
				this.recogeItemVerde(item);
				break;
		}
		item.kill();

	},
	update: function () {
		this.valida_lados();

		this.game.physics.arcade.collide(pacman, barras,this.colision,null,this);
		this.game.physics.arcade.collide(pacman, monedas,this.recogeItem,null,this);

		this.game.physics.arcade.collide(barras, monedas);

		var ultima_barra = this.obtenUltimaBarra();

		if (Math.floor(Math.random() * 100) == 2){
	    	var tween = this.game.add.tween(cloud).to( { alpha: Math.random()}, 500,"Linear",true);

		}

		if (ultima_barra <= 700){
			this.genera_barras();
		}


		pacman.body.velocity.x = velocidadItem;

	    if (leftKey.isDown)
	    {

    		game.mueve_izquierda();


	    }
	    else if (rightKey.isDown)
	    {
	        this.mueve_derecha();
	    }
	    if (this.valida_fin_juego()){
	    	this.fin_juego();
	    }
	},
	resetGame: function (argument) {
		sound_background.stop();
		gyro.stopTracking();
		this.game.state.start("Juego");

	},
	veInicio:function () {
		sound_background.stop();
		this.game.state.start("Inicio");
		gyro.stopTracking();
	},
	fin_juego: function(){
		sound_background.stop();
		this.game.state.start("Terminado");
		gyro.stopTracking();


	},
	valida_fin_juego: function(){
		if (pacman.y + pacman.height / 2 < 0){
			return true;
		}
		if (pacman.y - pacman.height  > this.game.world.height){
			return true;
		}
		return false;
	},
	generaItem(x,y,key){
		var moneda =  monedas.getFirstExists(false); //

		if (!moneda){
			moneda = monedas.create(x,y, key);
		}else{
			moneda.reset(x,y);
		}

		moneda.width = tamanio_moneda;
		moneda.height = tamanio_moneda;

		this.game.physics.enable(moneda, Phaser.Physics.ARCADE);


    moneda.body.gravity.y = 300;
		moneda.checkWorldBounds = true;
    moneda.outOfBoundsKill = true;
	},
	generaItemViento(x,y){
		this.generaItem(x,y,'itemVerde');
	},
	genera_moneda: function(x,y){
		this.generaItem(x,y,'moneda');

	},
	genera_barra: function(x){

		var x = x || Math.floor(Math.random() * (this.game.world.width-width_barra)  );


		var barra =  barras.getFirstExists(false); //

		if (!barra){
			barra = barras.create(x,this.game.world.height, 'barra');
		}else{

			barra.reset(x,this.game.world.height);

		}

		barra.width = width_barra;
		barra.height = height_barra;

		this.game.physics.enable(barra, Phaser.Physics.ARCADE);

		barra.body.immovable = true;
		barra.body.velocity.y = velocidad_barra;
		barra.body.allowGravity = false;
		barra.tocada = false;
		barras.setAll('body.velocity.y', velocidad_barra);
		var a1 = Math.floor(Math.random() * 2);
		var a2 = Math.floor(Math.random() * 3);


		if (a1 == 1){
			var x_aleatorio = Math.floor(Math.random() * width_barra);

			this.genera_moneda(x + x_aleatorio,this.game.world.height - tamanio_moneda);

		}else{
			if (a2 == 0 && !aireMoviendo || (score % 100 == 0 && !aireMoviendo && score !=0)){
				console.log("Se va a generar un item verde 2",a1,a2);

				var x_aleatorio = Math.floor(Math.random() * width_barra);

				this.generaItemViento(x + x_aleatorio,this.game.world.height - tamanio_moneda);

			}
		}

        barra.checkWorldBounds = true;
        barra.outOfBoundsKill = true;
        if (velocidad_barra>-400) {
        	velocidad_barra -= 0.8;

        	cloud.autoScroll(cloud._scroll.x, velocidad_barra * -1);
        }
	}
};
