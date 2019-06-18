const onxrloaded = () => {
  const initXrScene = ({
    scene,
    camera,
    content_type,
    rotation,
    longitude,
    latitude,
    opacity
  }) => {
    //https://www.kaviar.app/img/logo_dark.png
    if (content_type == "image") {
      var loader = new THREE.TextureLoader();
      loader.load("https://picsum.photos/id/1015/6000/4000", texture => {
        const material = new THREE.MeshBasicMaterial({
          map: texture
        });
        var geometry = new THREE.PlaneGeometry(10, 10 * 0.75);
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 0, -7);
        mesh.scale.set(0.5, 0.5, 0.5);
        scene.add(mesh);
        var light = new THREE.PointLight(0xffffff, 1, 0);
        light.position.set(1, 1, 0);
        scene.add(light);
        camera.position.set(0, 3, 0);
      });
    } else if (content_type == "video") {
    } else if (content_type == "3D") {
      /**
       *
       *
       *
       * https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.obj
       *
       * https://threejs.org/examples/models/obj/male02/male02_dds.mtl
       * male02.obj
       */

      var mesh = null;
      /**
       * 
       * 
      https://threejsfundamentals.org/threejs/resources/
      models/windmill/windmill.obj'
   
       * 
 *https://threejs.org/examples/models/obj/walt/
WaltHead.mtl
 */

      var mtlLoader = new THREE.MTLLoader();
      mtlLoader.setPath("https://threejs.org/examples/models/obj/walt/");
      mtlLoader.load("WaltHead.mtl", function(materials) {
        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath("https://threejs.org/examples/models/obj/walt/");
        objLoader.load("WaltHead.obj", function(object) {
          mesh = object; /*
          object.position.y = 0;
          object.position.x = 0;*/
          object.position.z = -25;
          object.scale.x = 0.1;
          object.scale.y = 0.1;
          object.scale.z = 0.1;

          object.castShadow = true;

          scene.add(mesh);
          var light = new THREE.PointLight(0xffffff, 1);
          light.position.set(0, 3, 0);
          scene.add(light);

          camera.position.set(0, 3, 0);
        });
      });

      /**
       *
       *
       *
       *
       *
       */
    } else {
      console.log("content error");
    }
    camera.position.set(0, 3, 0);
  };

  XR.addCameraPipelineModules([
    XR.GlTextureRenderer.pipelineModule(),
    XR.Threejs.pipelineModule(),
    XR.XrController.pipelineModule(),
    XRExtras.AlmostThere.pipelineModule(),
    XRExtras.RuntimeError.pipelineModule()
  ]);
  var longitude = null;
  var latitude = null;
  navigator.geolocation.getCurrentPosition(function(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  });

  XR.addCameraPipelineModule({
    name: "KaviAR",

    onStart: () => {
      const { scene, camera } = XR.Threejs.xrScene();
      const content_type = "3D";
      const rotation = 90;
      const opacity = 1;

      console.log(latitude + "-------------latitude-----------");
      console.log(longitude + "---long");
      initXrScene({
        scene,
        camera,
        content_type,
        rotation,
        longitude,
        latitude,
        opacity
      });
      XR.XrController.updateCameraProjectionMatrix({
        origin: camera.position,
        facing: camera.quaternion
      });
    }
  });

  const canvas = document.getElementById("camerafeed");
  XR.run({ canvas });
};

window.onload = () => {
  window.XR ? onxrloaded() : window.addEventListener("xrloaded", onxrloaded);
};
