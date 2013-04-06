var scale = 30;

requirejs(["world", "castleTest", "box2d"], 
function (world, castleTest) {
var iteration = 0;
 var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

	var debugDraw = new b2DebugDraw();
	var canvas = document.getElementById("canvas");
	debugDraw.SetSprite(canvas.getContext("2d"));
	debugDraw.SetDrawScale(scale);
	debugDraw.SetFillAlpha(0.5);
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);

	castleTest.init();

	canvas.addEventListener('click', castleTest.shoot, false);

	window.setInterval(update, 1000 / 60);

 function update() {
		world.Step(1 / 60, 1, 1);
		world.DrawDebugData();
		world.ClearForces();
 };
});
