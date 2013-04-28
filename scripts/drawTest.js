requirejs(["http://code.createjs.com/easeljs-0.6.0.min.js", "http://code.createjs.com/tweenjs-0.4.0.min.js"], 
function () {
	var canvas = document.getElementById('canvas');
	var stage = new createjs.Stage(canvas);
	
	var bounds = new createjs.Rectangle();
	bounds.width = canvas.width;
	bounds.height = canvas.height;

	var g = new createjs.Graphics();
	g.setStrokeStyle(2);
	g.beginStroke(createjs.Graphics.getRGB(128,128,128,1));
	g.drawCircle(0,0,4);

	circle = new createjs.Shape(g);
	circle.x = 10;
	circle.y = 20;

	stage.addChild(circle);
	stage.update();

	createjs.Ticker.setFPS(30);

	var world = {
		tick: function() {
		circle.x = circle.x + 1;
		stage.update();
	      }
	}
	createjs.Ticker.addListener(world);
});
