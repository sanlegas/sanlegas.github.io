


function Funciones(){



}

Funciones.prototype = {
	dibujaBotonesJuego: function(game,functionBack,functionReset,functionPause){
		this.game = game;
	   	var back  	= 	game.add.sprite(410 , 40, 'back');
	   	back.width 	= 80;
	   	back.height = 40;
      back.anchor.setTo(0.5, 0.5);
      back.angle = 180;
      back.inputEnabled = true;
      back.events.onInputDown.add(functionBack,this.game);

 	   	var refresh  	= 	game.add.sprite(485 , 40, 'refresh');
	   	refresh.width 	= 60;
	   	refresh.height = 60;
      refresh.anchor.setTo(0.5, 0.5);
      refresh.angle = 180;
      refresh.inputEnabled = true;
      refresh.events.onInputDown.add(functionReset,this.game);

	   	var pause  	= 	game.add.sprite(545 , 40, 'pause');
	   	pause.width 	= 50;
	   	pause.height = 50;
      pause.anchor.setTo(0.5, 0.5);
      pause.angle = 180;
      pause.inputEnabled = true;
      pause.events.onInputDown.add(functionPause,this.game);

      return {"pause":pause};
	}
}
