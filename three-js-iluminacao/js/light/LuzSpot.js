import * as THREE from 'three';

const color = 0xffffff;
const intensity = 80;

export const LuzSpot = new THREE.SpotLight( color, intensity );
LuzSpot.position.y = 4;