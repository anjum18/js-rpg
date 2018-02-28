const interval = 40;

var map = new Map("first");


for (var i = 0; i < map.getLargeur();  i++) {
	for (var j = 0; j < map.getHauteur();  j++) {
		if((Math.random()) > 0.8 && map.terrain[i][j] == 2 ) {

			var tree = new Decor("tree.png", j * TILE_SIZE, i * TILE_SIZE);
			map.addDecor(tree);
		}
	}
}


var pnj = new Personnage("pnj.png", 6, 10, DIRECTION.BAS);
map.addPersonnage(pnj);

var joueur = new Personnage("player.png", 6, 14, DIRECTION.HAUT);
map.addPersonnage(joueur);



window.onload = function() {
	var lastDirection = 0; //changes on every move, global for facing direction
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	canvas.width  = map.getLargeur() * TILE_SIZE;
	canvas.height = map.getHauteur() * TILE_SIZE;

	function refresh() {
		map.dessinerMap(ctx);
	}
	var theInterval = setInterval(refresh, interval);


	// Gestion du clavier
	window.onkeydown = function(event) {
		var e = event || window.event;
		var key = e.which || e.keyCode;
		switch(key) {
			case 38 : case 122 : case 119 : case 90 : case 87 : // Flèche haut, z, w, Z, W
				joueur.deplacer(DIRECTION.HAUT, map);
				lastDirection = DIRECTION.HAUT;
				break;
			case 40 : case 115 : case 83 : // Flèche bas, s, S
				joueur.deplacer(DIRECTION.BAS, map);
				lastDirection = DIRECTION.BAS;
				break;
			case 37 : case 113 : case 97 : case 81 : case 65 : // Flèche gauche, q, a, Q, A
				joueur.deplacer(DIRECTION.GAUCHE, map);
				lastDirection = DIRECTION.GAUCHE;
				break;
			case 39 : case 100 : case 68 : // Flèche droite, d, D
				joueur.deplacer(DIRECTION.DROITE, map);
				lastDirection = DIRECTION.DROITE;
				break;
			case 32 : // space
				var coords = joueur.getCoordonneesAdjacentes(lastDirection);
				if(coords.x == pnj.x && coords.y == pnj.y) {
					pnj.dialog(ctx,theInterval);
				}
				break;
			default :
				// Si la touche ne nous sert pas, nous n'avons aucune raison de bloquer son comportement normal.
				return true;
		}


		return false;
	}

}
