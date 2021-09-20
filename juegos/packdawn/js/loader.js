var timeIni;

function imprimeTiempo(){
	var nt = new Date().getTime();
	console.log( (nt - timeIni) / 1000 );
}
var Bola = {

};
Bola.Loader = function(game) {
	this.game = game;
};
Bola.Loader.prototype = {
	preload: function() {
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignVertically = true;
		this.game.scale.pageAlignHorizontally = true;
		//timeIni = new Date().getTime();

		this.game.load.image('pacman', 'assets/pacman.png');
		

		this.game.load.image('moneda', 'assets/moneda.png');
		this.game.load.image('itemVerde', 'assets/itemVerde.png');
		this.game.load.image('barra', 'assets/barra.png');
		this.game.load.image('fondo', 'assets/sky.jpg');
		this.game.load.image('cloud', 'assets/cloud.png');
		this.game.load.image('back', 'assets/back.png');
		this.game.load.image('refresh', 'assets/refresh.png');
		this.game.load.image('pause', 'assets/pause.png');
		this.game.load.image('sanlegas', 'assets/sanlegas.jpg');
		this.game.load.image('youtube', 'assets/youtube.png');
		this.game.load.image('play', 'assets/play.png');
		this.game.load.image('pacmanKill', 'assets/pacman_kill.png');

		//Carga de audio

    	this.game.load.audio('impact', 'assets/impact.mp3');
    	this.game.load.audio('sound_background', 'assets/sound_background.mp3');
		this.game.load.audio('finish', 'assets/sound_finish.mp3');
		this.game.load.audio('item', 'assets/item.wav');
		//imprimeTiempo();
	},
	create: function(){

        this.game.state.start('Inicio');

	}
};
