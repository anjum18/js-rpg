function Decor(url,x,y) {

  // Chargement de l'image dans l'attribut image
	this.image = new Image();
  this.x = x;
  this.y = y;

	this.image.onload = function() {
		if(!this.complete)
			throw "Erreur de chargement du sprite nommé \"" + url + "\".";


	}
	this.image.src = "tilesets/" + url;

}

Decor.prototype.dessinerDecor = function(context) {

   context.drawImage(this.image, this.x, this.y);
}
