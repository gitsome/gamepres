var gamepres = gamepres || {};

(function($){

    var b2Vec2 = Box2D.Common.Math.b2Vec2;
    window.b2Vec2 = b2Vec2;
    var b2AABB = Box2D.Collision.b2AABB;
    var b2BodyDef = Box2D.Dynamics.b2BodyDef;
    var b2Body = Box2D.Dynamics.b2Body;
    var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    var b2Fixture = Box2D.Dynamics.b2Fixture;
    var b2World = Box2D.Dynamics.b2World;
    var b2MassData = Box2D.Collision.Shapes.b2MassData;
    var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
    var b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef;

    gamepres.physics = {};
    gamepres.physics.world = {};
    gamepres.physics.objects = {};
    gamepres.physics.players = {};
    gamepres.physics.width = 0;
    gamepres.physics.height = 0;

    var scale = 10;
    var gravity = new b2Vec2(0, 10);

    var pid = 0;
    gamepres.physics.getId = function () {
        pid++;
        return "obj-" + pid;
    };

    gamepres.physics.tick = function () {
        gamepres.physics.world.Step(1 / 20, 10, 10);
        gamepres.physics.world.ClearForces();
    };

    gamepres.physics.scale = function (value) {
        return value/scale;
    };

    gamepres.physics.unscale = function (value) {
        return value * scale;
    };

    gamepres.physics.debug = function () {
        gamepres.physics.world.DrawDebugData(true);
    };

    gamepres.physics.initializeWorld = function (canvas, width, height, listeners_in) {

        //default listners
        var defaultListeners = {
            BeginContact:$.noop,
            PreSolve:$.noop
        };

        //setup listners
        listeners_in = listeners_in || {};
        var listeners = $.extend({}, defaultListeners, listeners_in);

        //clear the object registry
        gamepres.physics.objects = {};

        //save width and height
        gamepres.physics.width = gamepres.physics.scale(width);
        gamepres.physics.height = gamepres.physics.scale(height);

        //create the fixture definitions
        var fixDef = new b2FixtureDef();
        fixDef.density = 1.0;
        fixDef.friction = 0.2;
        fixDef.restitution = 0.0;

        //create the world
        gamepres.physics.world = new b2World(gravity,  true);

        //setup debug drawing
        var debugDraw = new b2DebugDraw();
        debugDraw.SetSprite(canvas);
        debugDraw.SetDrawScale($('body').width() / gamepres.physics.width );
        debugDraw.SetFillAlpha(0.7);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        gamepres.physics.world.SetDebugDraw(debugDraw);

        //create static boundaries (start withe the ground)
        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_staticBody;

        fixDef.shape = new b2PolygonShape();
        fixDef.shape.SetAsBox(gamepres.physics.width, 0);

        //bottom
        bodyDef.position.Set(0, gamepres.physics.height );
        gamepres.physics.world.CreateBody(bodyDef).CreateFixture(fixDef);

        //create static boundaries (and the sides
        fixDef.shape = new b2PolygonShape();
        fixDef.shape.SetAsBox(0, gamepres.physics.height);

        //left
        bodyDef.position.Set(0, 0);
        gamepres.physics.world.CreateBody(bodyDef).CreateFixture(fixDef);
        bodyDef.position.Set(gamepres.physics.width, 0);
        gamepres.physics.world.CreateBody(bodyDef).CreateFixture(fixDef);

        //wire up the listerners
        var listener = new Box2D.Dynamics.b2ContactListener;
        listener.BeginContact = listeners.BeginContact;
        listener.PreSolve = listeners.PreSolve;
        gamepres.physics.world.SetContactListener(listener);
    };


    /*======= FIXTURE REMOVAL ======*/

    gamepres.physics.removeFixture = function (fixture) {
        var id = fixture.m_userData.bodyId;
        gamepres.physics.world.DestroyBody(fixture.GetBody());
        delete gamepres.physics.objects[id];
    };


    /*======= FIXTURE CREATION ======*/

    gamepres.physics.addRect = function (x, y, w, h, props, bodyDef) {
        props = props || {};
        props.userData = props.userData || {};

        //give it a unique id
        props.userData.bodyId = gamepres.physics.getId();

        //first the fixture definition
        var fixDef = new b2FixtureDef();
        fixDef.density = props.density || 1.0;
        fixDef.friction = props.friction || 0.2;
        fixDef.restitution = props.restitution || 0;
        fixDef.userData = props.userData;

        fixDef.shape = new b2PolygonShape();
        fixDef.shape.SetAsBox(
            w / 2 ,
            h / 2
        );

        bodyDef.position.x = x;
        bodyDef.position.y = y;
        var thisObj = gamepres.physics.world.CreateBody(bodyDef).CreateFixture(fixDef);

        gamepres.physics.objects[fixDef.userData.bodyId] = thisObj;
        return thisObj;
    };

    gamepres.physics.addCirc = function (x, y, w, props, bodyDef) {

        props = props || {};
        props.userData = props.userData || {};

        //give it a unique id
        props.userData.bodyId = gamepres.physics.getId();

        //first the fixture definition
        var fixDef = new b2FixtureDef();
        fixDef.density = props.density || 1.0;
        fixDef.friction = props.friction || 0.2;
        fixDef.restitution = props.restitution || 0;
        fixDef.userData = props.userData;

        fixDef.shape = new b2CircleShape(
            w / 2
        );

        bodyDef.position.x = x;
        bodyDef.position.y = y;
        var thisObj = gamepres.physics.world.CreateBody(bodyDef).CreateFixture(fixDef);

        gamepres.physics.objects[fixDef.userData.bodyId] = thisObj;
        return thisObj;
    };

    //RECTANGLES
    gamepres.physics.addStaticRect = function (x, y, w, h, props) {
        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_staticBody;
        return gamepres.physics.addRect(x, y, w, h, props, bodyDef);
    };
    gamepres.physics.addDynamicRect = function (x, y, w, h, props) {
        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        return gamepres.physics.addRect(x, y, w, h, props, bodyDef);
    };

    //CIRCLES
    gamepres.physics.addStaticCirc = function (x, y, w, props) {
        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_staticBody;
        return gamepres.physics.addCirc(x, y, w, props, bodyDef);
    };

    gamepres.physics.addDynamicCirc = function (x, y, w, props) {
        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        return gamepres.physics.addCirc(x, y, w, props, bodyDef);
    };


    /*======= PHYSICS MANIPULATION AND QUERYING ======*/

    gamepres.physics.applyImpulse = function(body, degrees, power) {
        body.ApplyImpulse(
            new b2Vec2(Math.cos(degrees * (Math.PI / 180)) * power,
            Math.sin(degrees * (Math.PI / 180)) * power),
            body.GetWorldCenter()
        );
    };

    gamepres.physics.applyTorque = function (body, torque) {
        body.ApplyTorque(torque);
    };

    gamepres.physics.somethingBelow = function (fixture, playerNum) {
        var somethingBelow = 0;
        var testAABB = new b2AABB();
        testAABB.lowerBound.Set( fixture.GetBody().GetPosition().x - fixture.width / 2 + fixture.width/4, fixture.GetBody().GetPosition().y + fixture.height/2);
        testAABB.upperBound.Set( fixture.GetBody().GetPosition().x + fixture.width / 2 - fixture.width/4, fixture.GetBody().GetPosition().y + fixture.height/2 + 0.01);
        gamepres.physics.world.QueryAABB(
            function(fix){
                if(!fix.m_userData || fix.m_userData.playerNum != playerNum){
                    somethingBelow = 1;
                    return false;
                }
                return true;
            },
            testAABB
        );
        return somethingBelow;
    };

})(jQuery);