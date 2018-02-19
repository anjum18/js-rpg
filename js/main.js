var bite = new Image();
bite.src = "tilesets/bite.png";


window.onload = function() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	ctx.fillStyle = 'blue';
	ctx.fillRect(10, 10, 100, 50);

	ctx.strokeStyle = 'red';
	ctx.strokeRect(75, 75, 50, 50);

  ctx.drawImage(bite, 150, 20);

  ctx.drawImage(bite, 200, 30, 100, 50);

  ctx.drawImage(bite, 0, 0, 10, 19, 200, 100, 10, 19);
}
