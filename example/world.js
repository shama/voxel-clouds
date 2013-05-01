var createGame = require('voxel-engine');

var game = createGame({
  chunkDistance: 2,
  generate: function(x, y, z) {
    return (Math.sqrt(x*x + y*y + z*z) > 200 || y*y > 10) ? 0 : (Math.random() * 2) + 1;
  },
  materials: [['grass', 'dirt', 'grass_dirt'], 'dirt'],
  texturePath: 'textures/'
});
var container = document.body;
game.appendTo(container);

// create a player
var createPlayer = require('voxel-player')(game);
var shama = createPlayer('textures/shama.png');
shama.yaw.position.set(0, 10, 0);
shama.possess();

var clouds = require('../')(game);
game.on('tick', function(dt) {
  clouds.tick(dt);
});
