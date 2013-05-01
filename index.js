var voxelMesh = require('voxel-mesh');
var voxel = require('voxel');
var Perlin = require('perlin');

function Clouds(opts) {
  if (!(this instanceof Clouds)) return new Clouds(opts || {});
  if (opts.THREE) opts = {game:opts};
  this.game = opts.game;
  this.high = opts.high || 10;
  this.distance = opts.distance || 300;
  this.many = opts.many || 100;
  this.speed = opts.speed || 0.01;
  this.material = opts.material || new this.game.THREE.MeshBasicMaterial({
    emissive: 0xffffff,
    shading: this.game.THREE.FlatShading,
    fog: false,
    transparent: true,
    opacity: 0.5,
  });
  this.clouds = [];
  for (var i = 0; i < this.many; i++) {
    this.generate();
  }
}
module.exports = Clouds;

Clouds.prototype.generate = function(size) {
  var game = this.game;
  size = size || 16;
  var scale = new game.THREE.Vector3(1, 1, 1);

  var noise = new Int8Array(size * size);
  var perlin = new Perlin();
  perlin.generate([0, 0], [size, size], function(point, value) {
     noise[point[0] + point[1] * size] = Math.round(value);
  });

  var data = voxel.generate([0, 0, 0], [size, 1, size], function(x, y, z) {
    return noise[x + z * size];
  });

  var cloud = voxelMesh(data, voxel.meshers.greedy, scale, game.THREE);
  cloud.createSurfaceMesh(this.material);
  cloud.addToScene(game.scene);

  this._position(cloud);

  this.clouds.push(cloud);
  return cloud;
};

Clouds.prototype.tick = function(dt) {
  var self = this;
  var player = self.game.controls.target().avatar.position;
  self.clouds.forEach(function(cloud) {
    cloud.surfaceMesh.position.z += self.speed * rand(1, 1.5);
    if (distanceTo(cloud.surfaceMesh.position, player) > self.distance) {
      self._position(cloud);
    }
  });
};

Clouds.prototype._position = function(cloud) {
  var player = this.game.controls.target().avatar.position;
  var x = rand(player.x - this.distance, player.x + this.distance);
  var y = player.y + this.high + rand(0, this.high * 2);
  var z = rand(player.z - this.distance, player.z + this.distance);
  cloud.setPosition(x, y, z);
};

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function distanceTo(a, b) {
  if (!Array.isArray(a)) a = [a.x, a.y, a.z];
  if (!Array.isArray(b)) b = [b.x, b.y, b.z];
  var dx = b[0] - a[0];
  var dy = b[1] - a[1];
  var dz = b[2] - a[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
