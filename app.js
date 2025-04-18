const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  2,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;
camera.position.y = 10;
camera.position.x = 20;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const loader = new THREE.GLTFLoader();
loader.load(
  "./model.glb",
  function (gltf) {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        const oldMat = child.material;
        child.material = new THREE.MeshBasicMaterial({
          map: oldMat.map || null,
          color: oldMat.color || 0xffffff,
        });
      }
    });
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error("GLB Load Error:", error);
  }
);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
