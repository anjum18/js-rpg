
const TILE_SIZE = 32;


function Tileset(url) {
	// Chargement de l'image dans l'attribut image
	this.image = new Image();
	this.image.referenceDuTileset = this;
  this.image.src = "tilesets/" + url;
	this.image.onload = function() {
		if(!this.complete) {
      throw new Error("Erreur de chargement du tileset nommé \"" + url + "\".");
    }

    this.referenceDuTileset.largeur = this.width / TILE_SIZE;
	}

}

// Méthode de dessin du tile numéro "numero" dans le contexte 2D "context" aux coordonnées x et y
Tileset.prototype.dessinerTile = function(numero, context, xDestination, yDestination) {
  // Largeur du tileset en tiles
  var xSourceEnTiles = numero % this.largeur;
  if(xSourceEnTiles == 0) {
    xSourceEnTiles = this.largeur;
  }
  var ySourceEnTiles = Math.ceil(numero / this.largeur);
  var xSource = (xSourceEnTiles - 1) * TILE_SIZE;
  var ySource = (ySourceEnTiles - 1) * TILE_SIZE;

  context.drawImage(this.image, xSource, ySource, TILE_SIZE, TILE_SIZE, xDestination, yDestination, TILE_SIZE, TILE_SIZE);
}
