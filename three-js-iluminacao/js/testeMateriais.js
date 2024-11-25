import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'lil-gui';
import { LuzSpot } from './light/LuzSpot'; 

class ColorGUIHelper {

  constructor( object, prop ) {

    this.object = object;
    this.prop = prop;

  }
  get value() {

    return `#${this.object[ this.prop ].getHexString()}`;

  }
  set value( hexString ) {

    this.object[ this.prop ].set( hexString );

  }

}



//Controles de Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//Renderizador 
const renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( rotationAnimation );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild( renderer.domElement );

//Controles
const controls = new OrbitControls(camera , renderer.domElement );


//Plano
const planeSize = 20;
const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
const planeMat = new THREE.MeshLambertMaterial({
  color: 0x0d3b85,
  side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.receiveShadow = true;
plane.position.y = -1;
plane.rotation.x = Math.PI * -.5;

scene.add(plane);



//Geometria
const geometry = new THREE.BoxGeometry( 1, 1, 1 );

//Materiais do cubo
const standartMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
const lineMaterial = new THREE.LineBasicMaterial( {
	color: 0xffffff,
	linewidth: 1,
	linecap: 'round', 
	linejoin:  'round' 
} );

const lineDashedMaterial = new THREE.LineDashedMaterial( {
	color: 0xffffff,
	linewidth: 1,
	scale: 1,
	dashSize: 3,
	gapSize: 1,
} );

const basicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

const meshDepthMaterial = new THREE.MeshDepthMaterial( );

const meshDistanceMaterial = new THREE.MeshDistanceMaterial();

const meshLambertMaterial =  new THREE.MeshLambertMaterial( {color : 0x00ff00} );

const meshMatCapMaterial = new THREE.MeshMatcapMaterial( {color : 0x00ff00} );

const meshNormalMaterial = new THREE.MeshNormalMaterial();

const meshPhongMaterial = new THREE.MeshPhongMaterial( {color : 0x00ff00} );

const meshPhysicalMaterial = new THREE.MeshPhysicalMaterial( );

const meshToonMaterial = new THREE.MeshToonMaterial( {color : 0x00ff00} );

//Cubo1 config 
const cube = new THREE.Mesh( geometry, standartMaterial );
cube.castShadow = true;
cube.receiveShadow = false;
cube.position.x = -2;
cube.position.y = 1;

//Cubo2 Config 
const cube2 = new THREE.Mesh( geometry, lineMaterial );
cube2.castShadow = true;
cube2.receiveShadow = false;
cube2.position.x = 2;
cube2.position.y = 1;

//Cubo2 Config 
const cube3 = new THREE.Mesh( geometry, lineDashedMaterial );
cube3.castShadow = true;
cube3.receiveShadow = false;
cube3.position.x = 3;
cube3.position.y = 1;

//Cubo2 Config 
const cube4 = new THREE.Mesh( geometry, basicMaterial );
cube4.castShadow = true;
cube4.receiveShadow = false;
cube4.position.x = 5;
cube4.position.y = 1;

//Cubo2 Config 
const cube5 = new THREE.Mesh( geometry, meshDepthMaterial );
cube5.castShadow = true;
cube5.receiveShadow = false;
cube5.position.x = 7;
cube5.position.y = 1;


//Cubo2 Config 
const cube7 = new THREE.Mesh( geometry, meshLambertMaterial );
cube7.castShadow = true;
cube7.receiveShadow = false;
cube7.position.x = -4;
cube7.position.y = 1;

//Cubo2 Config 
const cube8 = new THREE.Mesh( geometry, meshMatCapMaterial );
cube8.castShadow = true;
cube8.receiveShadow = false;
cube8.position.x = -6;
cube8.position.y = 1;

//Cubo2 Config 
const cube9 = new THREE.Mesh( geometry, meshNormalMaterial );
cube9.castShadow = true;
cube9.receiveShadow = false;
cube9.position.x = 2;
cube9.position.y = 1;
cube9.position.z = 1;


//Cubo2 Config 
const cube10 = new THREE.Mesh( geometry, meshPhongMaterial );
cube10.castShadow = true;
cube10.receiveShadow = false;
cube10.position.x = 2;
cube10.position.y = 1;
cube10.position.z = 5;


let array = [cube,cube2,cube3,cube4,cube5,cube7,cube8,cube9];

// const helper = new THREE.CameraHelper( light.shadow.camera );
const pointLightHelper = new THREE.PointLightHelper(LuzSpot);
LuzSpot.castShadow = true;


let random = Math.floor((Math.random() * 10) + 1);

//Scenne adds
array.forEach( cube => {
    
    scene.add(cube);
})



scene.add( LuzSpot ) ;
scene.add( pointLightHelper );

camera.position.z = 10;
camera.position.x = 0;
camera.position.y = 8;


//Gui config
const gui = new GUI({
  width: 200,
  title: 'Scene Controlers',
  closeFolders: true  
});

    
    const lightFolder = gui.addFolder('Spot');
	lightFolder.addColor( new ColorGUIHelper( LuzSpot, 'color' ), 'value' ).name( 'color' );
	lightFolder.add( LuzSpot, 'intensity', -1, 100 );
    lightFolder.add(LuzSpot.position,'x',-5,10);
    lightFolder.add(LuzSpot.position,'y',-5,10);
    lightFolder.add(LuzSpot.position,'z',-5,10);
    lightFolder.add(LuzSpot,'distance',0,20);
    lightFolder.add(LuzSpot,'angle',0,5);
    lightFolder.add(LuzSpot,'penumbra',0,2);
    lightFolder.add(LuzSpot,'decay',-5,5);

    array.forEach( cube => {
        
        const folder = gui.addFolder('Cube');
        
        folder.add(cube.position,'x',-10,10);
        folder.add(cube.position,'y',-5,5);
        folder.add(cube.position,'z',-5,5);

    });
    

function rotationAnimation() {
  
  controls.update();

//   cube.rotation.x += 0.02;
//   cube2.rotation.x += 0.02;

//   cube.rotation.y += 0.02;
//   cube2.rotation.y += 0.02;
  
	renderer.render( scene, camera );

}