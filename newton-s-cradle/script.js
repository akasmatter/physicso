// Matter.js - http://brm.io/matter-js/

var Example = Example || {};

Example.newtonsCradle = function() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Body = Matter.Body,
        Composites = Matter.Composites,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 600,
            wireframes: false
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    var cradle = Composites.newtonsCradle(200, 100, 8, 30, 250);
    World.add(world, cradle);
    Body.translate(cradle.bodies[0], { x: -150, y: -100 });
    
    // cradle = Composites.newtonsCradle(280, 380, 7, 20, 140);
    // World.add(world, cradle);
    // Body.translate(cradle.bodies[0], { x: -140, y: -100 });

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 50 },
        max: { x: 800, y: 600 }
    });

    // context for MatterTools.Demo
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};

// create demo interface
// not required to use Matter.js

MatterTools.Demo.create({
  toolbar: {
    title: 'Newton\'s Cradle',
    url: 'https://akasmatter.github.io/physicso/newton-s-cradle/',
    reset: true,
    source: false,
    fullscreen: true,
    exampleSelect: false
  },
  preventZoom: true,
  resetOnOrientation: true,
  examples: [
    {
      name: 'Newton\'s Cradle',
      id: 'newtonsCradle',
      init: Example.newtonsCradle,
      sourceLink: 'https://akasmatter.github.io/physicso/newton-s-cradle/'
    }
  ]
});
