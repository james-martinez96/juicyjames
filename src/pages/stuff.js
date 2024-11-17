import {createElement} from "../utils/domUtils.js";
import * as THREE from "three";
import {Sky} from 'three/addons/objects/Sky.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

const stuff = {
    title: 'Stuff',
    content: 'This is more stuff with three.js',
};

export function renderStuff() {
    const main = document.querySelector('main');
    main.innerHTML = '';

    const section = createElement('section', {class: 'stuff'});

    const h2 = createElement('h2', {class: 'stuff-header'}, stuff.title);

    const p = createElement('p', {}, stuff.content);

    section.appendChild(h2);
    section.appendChild(p);

    // Three.js containr
    const canvasContainer = createElement('div', {class: 'threejs-container'});
    section.appendChild(canvasContainer);

    main.appendChild(section);

    // Init three.js
    const fov = 75;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 1000;
    const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(-1, 2, 4);
    scene.add(light);
    camera.position.z = 4;

    const controls = new OrbitControls(camera, canvasContainer);
    controls.target.set(0, 0, 0);
    controls.update();

    // Renderer
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    renderer.setAnimationLoop(animate);
    canvasContainer.appendChild(renderer.domElement);

    // Add a rotating cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial();
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    // Sky
    const sky = new Sky();
    sky.scale.setScalar(450000);
    const phi = THREE.MathUtils.degToRad(90);
    const theta = THREE.MathUtils.degToRad(180);
    const sunPosition = new THREE.Vector3().setFromSphericalCoords(1, phi, theta);
    sky.material.uniforms.sunPosition.value = sunPosition;
    scene.add(sky);

    // Animation loop
    function animate() {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    // animate();
    return main;
}
