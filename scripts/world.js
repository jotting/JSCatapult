define(["box2d"], function() {
 var   b2Vec2 = Box2D.Common.Math.b2Vec2,
	b2BodyDef = Box2D.Dynamics.b2BodyDef, 
	b2Body = Box2D.Dynamics.b2Body, 
	b2FixtureDef = Box2D.Dynamics.b2FixtureDef, 
	b2World = Box2D.Dynamics.b2World, 
	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

	var world	= new b2World(
								new b2Vec2(0, 10), //gravity
								true // Allow sleep
								);

	var fixDef = new b2FixtureDef;
	fixDef.density = 1.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.2;
 
	var bodyDef = new b2BodyDef;
 
	//create ground
	var canvas = document.getElementById("canvas");
	bodyDef.type = b2Body.b2_staticBody;
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(canvas.width / scale, 1);
	bodyDef.position.Set(0, canvas.height / scale);
	world.CreateBody(bodyDef).CreateFixture(fixDef);

	return world;
});
