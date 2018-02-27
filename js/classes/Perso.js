var DIRECTION = {
	"BAS"    : 0,
	"GAUCHE" : 1,
	"DROITE" : 2,
	"HAUT"   : 3
}
var DUREE_ANIMATION = 4;
var DUREE_DEPLACEMENT = 10;

var PLAYER_DEFAULT_HEALTH = 80



function Personnage(url, x, y, direction) {

	this.dialogCount = 0;
	this.dialogs = [
		"Hello World",
		"Bye"
	];
	this.health = PLAYER_DEFAULT_HEALTH;

  this.etatAnimation = -1;
	this.x = x; // (en cases)
	this.y = y; // (en cases)
	this.xCol = x * TILE_SIZE; // (en pixels)
	this.yCol = y * TILE_SIZE; // (en pixels)
	this.width = TILE_SIZE;
	this.height = TILE_SIZE;
	this.direction = direction;

	// Chargement de l'image dans l'attribut image
	this.image = new Image();
	this.image.referenceDuPerso = this;
	this.image.onload = function() {
		if(!this.complete)
			throw "Erreur de chargement du sprite nommé \"" + url + "\".";

		// Taille du personnage
		this.referenceDuPerso.largeur = this.width / 4;
		this.referenceDuPerso.hauteur = this.height / 4;
	}
	this.image.src = "sprites/" + url;
}

Personnage.prototype.dessinerPersonnage = function(context) {
  var frame = 0; // Numéro de l'image à prendre pour l'animation
  var decalageX = 0, decalageY = 0; // Décalage à appliquer à la position du personnage
  if(this.etatAnimation >= DUREE_DEPLACEMENT) {
  	// Si le déplacement a atteint ou dépassé le temps nécessaire pour s'effectuer, on le termine
  	this.etatAnimation = -1;
  } else if(this.etatAnimation >= 0) {
  	// On calcule l'image (frame) de l'animation à afficher
  	frame = Math.floor(this.etatAnimation / DUREE_ANIMATION);
  	if(frame > DUREE_ANIMATION - 1) {
  		frame %= DUREE_ANIMATION;
  	}

  	// Nombre de pixels restant à parcourir entre les deux cases
  	var pixelsAParcourir = TILE_SIZE - (TILE_SIZE * (this.etatAnimation / DUREE_DEPLACEMENT));

  	// À partir de ce nombre, on définit le décalage en x et y.
  	// NOTE : Si vous connaissez une manière plus élégante que ces quatre conditions, je suis preneur
  	if(this.direction == DIRECTION.HAUT) {
  		decalageY = pixelsAParcourir;
  	} else if(this.direction == DIRECTION.BAS) {
  		decalageY = -pixelsAParcourir;
  	} else if(this.direction == DIRECTION.GAUCHE) {
  		decalageX = pixelsAParcourir;
  	} else if(this.direction == DIRECTION.DROITE) {
  		decalageX = -pixelsAParcourir;
  	}

  	this.etatAnimation++;
  }
  /*
   * Si aucune des deux conditions n'est vraie, c'est qu'on est immobile,
   * donc il nous suffit de garder les valeurs 0 pour les variables
   * frame, decalageX et decalageY
   */


   context.drawImage(
   		this.image,
   		this.largeur * frame, this.direction * this.hauteur, // Point d'origine du rectangle source à prendre dans notre image
   		this.largeur, this.hauteur, // Taille du rectangle source (c'est la taille du personnage)
   		// Point de destination (dépend de la taille du personnage)
   		(this.x * TILE_SIZE) - (this.largeur / 2) + 16 + decalageX, (this.y * TILE_SIZE) - this.hauteur + 24 + decalageY,
   		this.largeur, this.hauteur // Taille du rectangle destination (c'est la taille du personnage)
   );

}

Personnage.prototype.getCoordonneesAdjacentes = function(direction)  {
	console.log(direction);
	var coord = {'x' : this.x, 'y' : this.y};
	switch(direction) {
		case DIRECTION.BAS :
			coord.y++;
			break;
		case DIRECTION.GAUCHE :
			coord.x--;
			break;
		case DIRECTION.DROITE :
			coord.x++;
			break;
		case DIRECTION.HAUT :
			coord.y--;
			break;
	}
	return coord;
}

Personnage.prototype.deplacer = function(direction, map) {
  // On ne peut pas se déplacer si un mouvement est déjà en cours !
  if(this.etatAnimation >= 0) {
  	return false;
  }



	// On change la direction du personnage
	this.direction = direction;

	// On vérifie que la case demandée est bien située dans la carte
	var prochaineCase = this.getCoordonneesAdjacentes(direction);
	this.xCol = prochaineCase.x * TILE_SIZE;
	this.yCol = prochaineCase.y * TILE_SIZE;

	//collisions with trees
	var collide = false;
	for (var i = 0; i < map.decors.length; i++) {
		if(this.isCollide(map.decors[i])) {
			collide = true;
		}
	}

	//collision with NPCs
	for (var i = 0; i < map.personnages.length; i++) {
		if(i==1) {break;} //ignore collision of player with himself, player is loaded second, index 1
		if(this.isCollide(map.personnages[i])) {
			collide = true;
		}
	}

	if(collide) {
		return false;
	}

	//collision with bordures
	if(prochaineCase.x < 0 || prochaineCase.y < 0 || prochaineCase.x >= map.getLargeur() || prochaineCase.y >= map.getHauteur()) {
		// On retourne un booléen indiquant que le déplacement ne s'est pas fait,
		// Ça ne coute pas cher et ca peut toujours servir
		return false;
	}
  // On commence l'animation
  this.etatAnimation = 1;

	// On effectue le déplacement
	this.x = prochaineCase.x;
	this.y = prochaineCase.y;
	this.xCol = prochaineCase.x * TILE_SIZE;
	this.yCol = prochaineCase.y * TILE_SIZE;

	return true;
}

Personnage.prototype.isCollide = function (b) {

		let toleranceHeightB = b.height - 2;
		let toleranceWidthB = b.width - 2;
		let toleranceHeightA = this.height - 2;
		let toleranceWidthA = this.width - 2;
    return !(
        ((this.yCol + toleranceHeightA) < (b.yCol)) ||
        (this.yCol > (b.yCol + toleranceHeightB)) ||
        ((this.xCol + toleranceWidthA) < b.xCol) ||
        (this.xCol > (b.xCol + toleranceWidthB))
    );

};

Personnage.prototype.dialog = function() {

	alert(this.dialogs[this.dialogCount]);
	this.dialogCount++;
	if(this.dialogs[this.dialogCount] === undefined) {
		this.dialogCount = 0;
	}
}
