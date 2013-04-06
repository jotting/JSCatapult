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
	bodyDef.type = b2Body.b2_staticBody;
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(20, 2);
	bodyDef.position.Set(10, 400 / 30 + 1.8);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	bodyDef.position.Set(10, -1.8);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	fixDef.shape.SetAsBox(2, 14);
	bodyDef.position.Set(-1.8, 13);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	bodyDef.position.Set(21.8, 13);
	world.CreateBody(bodyDef).CreateFixture(fixDef);

	return world;
});
