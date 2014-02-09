# voxel-clouds

Clouds for [voxel.js](http://voxeljs.com).

# example

[View this example](http://shama.github.io/voxel-clouds)

```js
// create a clouds
var clouds = require('voxel-clouds')({
  
  // pass a copy of the game
  game: game,

  // how high up the clouds should be from the player
  high: 10,

  // the distance from the player the clouds should repeat
  distance: 300,

  // how many clouds to generate
  many: 100,

  // how fast the clouds should move
  speed: 0.01,

  // material of the clouds
  material: new game.THREE.MeshBasicMaterial({
    emissive: 0xffffff,
    shading: game.THREE.FlatShading,
    fog: false,
    transparent: true,
    opacity: 0.5,
  }),
});

// on tick, move the clouds
game.on('tick', clouds.tick.bind(clouds));
```

# api

## `clouds.generate([size:16])`
Will generate a cloud 16x1x16.

## `clouds.tick(delta)`
Call on game tick to move the clouds and upon exceeding the distance from the
player; loop the cloud.

## `clouds.clouds`
An array of all the generated voxel mesh clouds.

# install

With [npm](https://npmjs.org) do:

```
npm install voxel-clouds
```

Use [browserify](http://browserify.org) to `require('voxel-clouds')`.

## release history
* 0.2.0 - update deps
* 0.1.0 - initial release

## license
Copyright (c) 2013 Kyle Robinson Young<br/>
Licensed under the MIT license.
