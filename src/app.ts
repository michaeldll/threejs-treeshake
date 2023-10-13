import "./scss/global.scss";
import { BoxGeometry, Mesh, MeshNormalMaterial, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { callWhenReady } from "./utils";

type Window = typeof window & {
  IS_PRODUCTION: boolean;
};

const init = () => {
  console.log("ready");

  const width = window.innerWidth, height = window.innerHeight;

  // init

  const camera = new PerspectiveCamera(70, width / height, 0.01, 10);
  camera.position.z = 1;

  const scene = new Scene();

  const geometry = new BoxGeometry(0.2, 0.2, 0.2);
  const material = new MeshNormalMaterial();

  const mesh = new Mesh(geometry, material);
  scene.add(mesh);

  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setAnimationLoop(animation);
  document.body.appendChild(renderer.domElement);

  // animation
  function animation(time) {

    mesh.rotation.x = time / 2000;
    mesh.rotation.y = time / 1000;

    renderer.render(scene, camera);

  }

  // Enable hot reloading in development
  if (!(window as Window).IS_PRODUCTION) {
    new EventSource('/esbuild').addEventListener('change', () => location.reload())
  };
};

callWhenReady(init);
