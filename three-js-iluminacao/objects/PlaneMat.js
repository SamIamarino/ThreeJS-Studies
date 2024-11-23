//Plano
const planeSize = 20;
const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
const planeMat = new THREE.MeshLambertMaterial({
  color: 0x0d3b85,
  side: THREE.DoubleSide,
});
export const PlaneMat = new THREE.Mesh(planeGeo, planeMat);
plane.position.y = -1;
plane.rotation.x = Math.PI * -0.5;
