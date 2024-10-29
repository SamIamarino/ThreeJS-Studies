import * as THREE from 'three';

export const CorPontoLuz = 0xFFFFFF;
export const IntensidadePontoLuz = 100;
export const PontoLuz = new THREE.PointLight(CorPontoLuz, IntensidadePontoLuz);

PontoLuz.position.y = 5;
