define(["world"], function (world) { return { 
canvas: null,
makeBox: function(x,y,width,height) {
	var   b2BodyDef = Box2D.Dynamics.b2BodyDef
	,	b2Body = Box2D.Dynamics.b2Body
	,	b2FixtureDef = Box2D.Dynamics.b2FixtureDef
	,	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

	var fixDef = new b2FixtureDef;
	fixDef.density = 1.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.2;

	var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_dynamicBody;


	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(
		width //half width
		,  height //half height
	);

	bodyDef.position.x = x;
	bodyDef.position.y = y;
	world.CreateBody(bodyDef).CreateFixture(fixDef);
},

addShape: function() {
	var b2BodyDef = Box2D.Dynamics.b2BodyDef,
	    b2Body = Box2D.Dynamics.b2Body,
	    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
	    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
	    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;

	var fixDef = new b2FixtureDef;
	fixDef.density = 1.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.2;

	var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_dynamicBody;

	if(Math.random() > 0.5) {
		fixDef.shape = new b2PolygonShape;
		fixDef.shape.SetAsBox(
			Math.random() + 0.1, //half width
			Math.random() + 0.1 //half height
		);
	} else {
		fixDef.shape = new b2CircleShape(
			Math.random() + 0.1 //radius
		);
	}
	bodyDef.position.x = Math.random() * 10;
	bodyDef.position.y = Math.random() * 10;
	world.CreateBody(bodyDef).CreateFixture(fixDef);
},

addTriangle: function(x, y) {
	var b2Vec2 = Box2D.Common.Math.b2Vec2,
	    b2BodyDef = Box2D.Dynamics.b2BodyDef,
	    b2Body = Box2D.Dynamics.b2Body,
	    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
	    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

	var fixDef = new b2FixtureDef;
	fixDef.density = 1.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.2;

	var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_dynamicBody;
	bodyDef.angle=1.57;

	fixDef.shape = new b2PolygonShape;

	fixDef.shape.SetAsArray([
		new b2Vec2(-0.25, 0),
		new b2Vec2(0, -1),
		new b2Vec2(0.25, 0)],3
	);

	bodyDef.position.x = x;
	bodyDef.position.y = y;
	world.CreateBody(bodyDef).CreateFixture(fixDef);
},

makeWall: function(x, y, height, xsize, ysize) {
	for (var i=0; i < height; i++) {
		this.makeBox(x , y - ysize - 2*ysize*i, xsize, ysize);
	}
},

shoot: function(e) {

	var getCursorPosition = function(e) {
		var x;
		var y;
		if (e.pageX || e.pageY) {
			x = e.pageX;
			y = e.pageY;
		}
		else {
			x = e.clientX + document.body.scrollLeft +
				document.documentElement.scrollLeft;
			y = e.clientY + document.body.scrollTop +
				document.documentElement.scrollTop;
		}

		x -= canvas.offsetLeft;
		y -= canvas.offsetTop;

		var returnVal = {x: null, y:null};
		returnVal.x = x / scale;
		returnVal.y = y / scale;

		return returnVal;
	};

	var b2Vec2 = Box2D.Common.Math.b2Vec2, 
	    b2BodyDef = Box2D.Dynamics.b2BodyDef, 
	    b2Body = Box2D.Dynamics.b2Body, 
	    b2FixtureDef = Box2D.Dynamics.b2FixtureDef, 
	    b2Fixture = Box2D.Dynamics.b2Fixture, 
	    b2World = Box2D.Dynamics.b2World, 
	    b2MassData = Box2D.Collision.Shapes.b2MassData, 
	    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape, 
	    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape, 
	    b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

	var fixDef = new b2FixtureDef;
	fixDef.density = 1.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.2;

	var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_dynamicBody;

	fixDef.shape = new b2CircleShape(
		0.2 //radius
	);

	var click = getCursorPosition(e);

	bodyDef.position.x = click.x;
	bodyDef.position.y = click.y;
	var zzy = world.CreateBody(bodyDef);
	zzy.CreateFixture(fixDef);

	var force=new b2Vec2(2500,800);
	zzy.ApplyForce(force,zzy.GetWorldCenter());
},


init: function() {
	canvas = document.getElementById("canvas");
	var x = canvas.width / scale;
	var y = canvas.height / scale;

	var size = 0.5;
	var height = 6;
	var width = 4;

	this.makeWall(x - 1, y - 1, height, size, size);
	this.makeWall(x - 1 - 2 * size * width, y - 1, height, size, size);

	var roofX = x - 1 - size * width; // Halfway between walls
	var roofY = y - 1 - size - 2 * height * size; // Ground - Height
	var roofWidth = size * (width + 1)
	this.makeBox(roofX, roofY, roofWidth, size);

	this.makeWall(roofX, roofY - 1, 4, size / 2, size);
}
};
});
