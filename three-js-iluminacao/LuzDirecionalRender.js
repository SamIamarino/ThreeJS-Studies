import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "lil-gui";
import { LuzDirecional } from "./light/LuzDirecional";

class ColorGUIHelper {
  constructor(object, prop) {
    this.object = object;
    this.prop = prop;
  }

  get value() {
    return `#${this.object[this.prop].getHexString()}`;
  }

  set value(hexString) {
    this.object[this.prop].set(hexString);
  }
}

//Controles de Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//Renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(rotationAnimation);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

//Controles
const controls = new OrbitControls(camera, renderer.domElement);

//Plano
const planeSize = 20;
const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
const planeMat = new THREE.MeshLambertMaterial({
  color: 0x0d3b85,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.receiveShadow = true;
plane.position.y = -1;
plane.rotation.x = Math.PI * -0.5;
scene.add(plane);

//Materiais do cubo
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

//Cone config.
const geometriaCone = new THREE.ConeGeometry(1, 2, 30);
const materialCone = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const cone = new THREE.Mesh(geometriaCone, materialCone);
cone.castShadow = true;
cone.receiveShadow = false;

//Cubo1 config
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
cube.receiveShadow = false;
cube.position.x = -2;
cube.position.y = 1;

//Cubo2 Config
const cube2 = new THREE.Mesh(geometry, material);
cube2.castShadow = true;
cube2.receiveShadow = false;
cube2.position.x = 2;
cube2.position.y = 1;

// const helper = new THREE.CameraHelper( light.shadow.camera );
// const pointLightHelper = new THREE.PointLightHelper(LuzDirecional);
LuzDirecional.castShadow = true;

//Scenes
scene.add(cube);
scene.add(cube2);
scene.add(cone);
scene.add(LuzDirecional);

//Camera Config.
camera.position.z = 10;
camera.position.x = 0;
camera.position.y = 5;

//Gui config
const gui = new GUI({
  width: 200,
  title: "Scene Controlers",
  closeFolders: true,
});

const lightFolder = gui.addFolder("Luz Direcional");
lightFolder
  .addColor(new ColorGUIHelper(LuzDirecional, "color"), "value")
  .name("color");
lightFolder.add(LuzDirecional, "intensity", -1, 100);
lightFolder.add(LuzDirecional.position, "x", -5, 5);
lightFolder.add(LuzDirecional.position, "y", -5, 5);
lightFolder.add(LuzDirecional.position, "z", -5, 5);

const cube1Folder = gui.addFolder("Cube1");

cube1Folder.add(cube.position, "x", -10, 10);
cube1Folder.add(cube.position, "y", -5, 5);
cube1Folder.add(cube.position, "z", -5, 5);

const cube2Folder = gui.addFolder("Cube2");

cube2Folder.add(cube2.position, "x", -5, 5);
cube2Folder.add(cube2.position, "y", -5, 5);
cube2Folder.add(cube2.position, "z", -5, 5);

const coneFolder = gui.addFolder("Cone");
coneFolder.add(cone.position, "x", -5, 5);
coneFolder.add(cone.position, "y", -5, 5);
coneFolder.add(cone.position, "z", -5, 5);

function rotationAnimation() {
  controls.update();

  cube.rotation.x += 0.02;
  cube2.rotation.x += 0.02;

  cube.rotation.y += 0.02;
  cube2.rotation.y += 0.02;

  renderer.render(scene, camera);
}
