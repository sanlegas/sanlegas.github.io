var pillo;
var jugador;
var suelo;

var SUELO_C = {
								ALTO:70,
								VELOCIDAD:-200,
								LONGITUD:300,
								ULTIMO_X:600
							};

var PILLO_C = {
	X_POS:120,
	V_SALTO1:-280,
	V_SALTO2:-180,
	GRAVEDAD:280,
	SCALE:0.8
}

var numSaltos = 0;
var sueloGrupo;
var pilloSuelo = false;

var layer;
var likes;
var pad;
var stick;
var itemSound;

var zoomAmount;

Pillo.Inicio = function(game) {
	this.game = game;
};
Pillo.Inicio.prototype = {

	create: function(){
		itemSound = this.game.add.audio('itemSound');

		sueloGrupo = this.game.add.group();
		sueloGrupo.enableBody = true;
		game.stage.backgroundColor = "#F1F8E9";

		pillo = this.game.add.sprite(0, 0, 'pillo');
		this.game.physics.enable(pillo, Phaser.Physics.ARCADE);
		pillo.animations.add('run');
		pillo.x = PILLO_C.X_POS;
		pillo.body.gravity.y = PILLO_C.GRAVEDAD;
		pillo.y = 100;
		pillo.scale.setTo(PILLO_C.SCALE,PILLO_C.SCALE);
		pillo.anchor.set(0.5,0.5);

		pillo.body.allowRotation = true;

		var map = this.game.add.tilemap('map');
		map.addTilesetImage('conjunto');
		map.setCollisionBetween(1, 3);
		map.setTileIndexCallback(3, this.toca_suelo, this);
		map.setTileIndexCallback(1, this.recogeLike, this);

		layer = map.createLayer('ladrillos');
		layer.resizeWorld();

		likes = game.add.group();
    likes.enableBody = true;

		    //  And now we convert all of the Tiled objects with an ID of 34 into sprites within the coins group
    map.createFromObjects('objetos', 1, 'like', 0, true, false, likes);

		pad = this.game.plugins.add(Phaser.VirtualJoystick);
	  stick = pad.addStick(0, 0, 200, 'arcade');
	  stick.alignBottomLeft();

    this.buttonA = pad.addButton(800, 420, 'arcade', 'button1-up', 'button1-down');
		this.buttonA.onDown.add(this.zoomIn, this);

		this.buttonB = pad.addButton(900, 420, 'arcade', 'button2-up', 'button2-down');
		this.buttonB.onDown.add(this.onTap, this);

		console.log("world bounds: ",game.world.getBounds());

		this.game.camera.follow(pillo);


	},
	sigue: function () {

	},
	zoomIn: function () {
		zoomAmount = 0.05;
		this.sigue();
	},
	zoomOut:function () {
		zoomAmount = -0.05;
		this.sigue();
	},
	recogeLike:function (p,l) {
		console.log('like');
		l.kill();
		itemSound.play();
	},
	toca_suelo:function() {
		numSaltos = 0;

		return true;
	},
	onTap:function() {
		if (numSaltos < 2){
			if (numSaltos == 0){
				pillo.body.velocity.y = PILLO_C.V_SALTO1;
				numSaltos++;
			}else{
				pillo.body.velocity.y = PILLO_C.V_SALTO2;
				numSaltos++;
			}
		}
	},
	update:function(){
		this.game.physics.arcade.collide(pillo, layer);
		this.game.physics.arcade.overlap(pillo, likes, this.recogeLike, null, this);
		this.game.camera.x = 0;
		this.game.camera.y = 40;
		console.log(this.game.camera.x,this.game.camera.y);

		var maxSpeed = 400;

		if (stick.isDown)
		{
			pillo.animations.play('run', 15, true);
			var velocity = this.game.physics.arcade.velocityFromRotation(stick.rotation, stick.force * maxSpeed);
			if (velocity.x < 0){
					pillo.scale.x = -1 * PILLO_C.SCALE;
			}else if (velocity.x > 0) {
				pillo.scale.x = PILLO_C.SCALE;
			}
			pillo.body.velocity.x = velocity.x;
		}
		else
		{
			pillo.animations.stop();
			pillo.frame = 0;
			pillo.body.velocity.x =0;
		}
	}
};
