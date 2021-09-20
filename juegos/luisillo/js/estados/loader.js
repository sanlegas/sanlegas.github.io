var Pillo = {

};
Pillo.Loader = function(game) {
	this.game = game;
};
Pillo.Loader.prototype = {
	preload: function() {
		this.game.load.atlas('pillo', 'assets/pillo.png', 'assets/pillo.json');
		this.game.load.image('suelo', 'assets/suelo.png');
		this.load.atlas('dpad', 'assets/virtualjoystick/skins/dpad.png', 'assets/virtualjoystick/skins/dpad.json');
		this.game.load.image('like', 'assets/like.png');
		this.game.load.image('conjunto', 'assets/map.png');
		this.game.load.audio('itemSound', 'assets/item.wav');
		this.game.load.atlas('arcade', 'assets/virtualjoystick/skins/arcade-joystick.png', 'assets/virtualjoystick/skins/arcade-joystick.json');
		this.game.load.tilemap('map', 'assets/mapafinal.json', null, Phaser.Tilemap.TILED_JSON);

	},
	create: function(){
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignVertically = true;
		this.game.scale.pageAlignHorizontally = true;
  	this.game.state.start('Inicio');
	}
};
