import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
// camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ 
  color: 0x3f2884,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Light

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);
const ambientLight = new THREE.AmbientLight(0xffffff);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(
  pointLight, 
  ambientLight, 
  // gridHelper
);

const controls = new OrbitControls( camera, renderer.domElement );

// Stars

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Textura Espaço

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Monke Box

const monkeTexture = new THREE.TextureLoader().load('monkeb.png');

const monke = new THREE.Mesh(
  new THREE.BoxGeometry(3.5, 3.5, 3.5), 
  new THREE.MeshBasicMaterial({ map: monkeTexture })
);

scene.add(monke);

// Jim de la Luna

const lunaTexture = new THREE.TextureLoader().load('moon.jpg');

const luna = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: lunaTexture,
    // normalMap: normalTexture,
  })
);

// Terra

const terraTexture = new THREE.TextureLoader().load('earth.jpg');

const terra = new THREE.Mesh(
  new THREE.SphereGeometry(6, 64, 64),
  new THREE.MeshStandardMaterial({
    map: terraTexture,
    // normalMap: normalTexture,
  })
);


// Positions

scene.add(luna, terra);

luna.position.z = 30;
luna.position.setX(-10);

terra.position.z = 35;
terra.position.y = 10;
terra.position.setX(-30);

monke.position.z = -5;
monke.position.x = 2;

// Scroll animacion

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animacion loop

function animate() {
  requestAnimationFrame( animate )
  
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  luna.rotation.x += 0.005;
  luna.rotation.y += 0.0075;
  luna.rotation.z += 0.005;

  monke.rotation.y += 0.01;
  monke.rotation.z += 0.01;

  terra.rotation.x += 0.005;
  terra.rotation.y += 0.0075;
  terra.rotation.z += 0.005;
  
  controls.update();
  
  renderer.render(scene, camera);
}

animate();