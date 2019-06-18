var videoTexture = new THREEx.VideoTexture(
  "https://www.youtube.com/watch?v=4oZRB0iXo3g"
);

var geometry = new THREE.CubeGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({
  map: videoTexture.texture
});
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
