requirejs(["world", "castleTest", "box2d"], 
function (world, castleTest) {
 var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

	var debugDraw = new b2DebugDraw();
	debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
	debugDraw.SetDrawScale(30.0);
	debugDraw.SetFillAlpha(0.5);
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);

	window.setInterval(update, 1000 / 60);

 function update() {
		world.Step(1 / 60, 10, 10);
		world.DrawDebugData();
		world.ClearForces();
 };
});
