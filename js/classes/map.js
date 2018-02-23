function Map(nom) {


	// Création de l'objet XmlHttpRequest
	var xhr = new XMLHttpRequest;

  // Chargement du fichier
  xhr.open("GET", './maps/' + nom + '.json', false);
  xhr.send(null);
  if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)) {
    throw new Error("Impossible de charger la carte nommée \"" + nom + "\" (code HTTP : " + xhr.status + ").");
  }

  var mapJsonData = xhr.responseText;


  // Analyse des données
  var mapData = JSON.parse(mapJsonData);

  this.tileset = new Tileset(mapData.tileset);
  // Liste des personnages présents sur le terrain.
  this.personnages = new Array();

	this.decors = new Array();
  this.terrain = mapData.terrain;

}




// Pour récupérer la taille (en tiles) de la carte
Map.prototype.getHauteur = function() {
  return this.terrain.length;
}
Map.prototype.getLargeur = function() {
  return this.terrain[0].length;
}

Map.prototype.dessinerMap = function(context) {
  for(var i = 0, l = this.terrain.length ; i < l ; i++) {
    var ligne = this.terrain[i];
    var y = i * TILE_SIZE;
    for(var j = 0, k = ligne.length ; j < k ; j++) {
      this.tileset.dessinerTile(ligne[j], context, j * TILE_SIZE, y);
    }
  }
  // Dessin des personnages
  for(var i = 0, l = this.personnages.length ; i < l ; i++) {
  	this.personnages[i].dessinerPersonnage(context);
  }

	for(var i = 0, l = this.decors.length ; i < l ; i++) {
  	this.decors[i].dessinerDecor(context);
  }

}

// Pour ajouter un personnage
Map.prototype.addPersonnage = function(perso) {
	this.personnages.push(perso);
}

Map.prototype.addDecor = function(decor) {
	this.decors.push(decor);
}
