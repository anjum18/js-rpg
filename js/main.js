var ts = new Tileset("grass-tileset.png");


window.onload = function() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

  ts.dessinerTile(1, ctx, 10, 10);
  ts.dessinerTile(5, ctx, 50, 10);
  ts.dessinerTile(6, ctx, 90, 10);
  ts.dessinerTile(7, ctx, 130, 10);

}
