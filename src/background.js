import {createElement} from "./utils/domUtils.js";
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import model from "./assets/models/level.glb";
import {loadGLTFModel} from "./utils/threejsUtils.js";

export function background() {
    const background = createElement('div', {id: 'background'});
    document.body.appendChild(background);

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({antialias: true});
    let camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
    camera.position.z = 25;

    renderer.setSize(background.clientWidth, background.clientHeight);
    renderer.setPixelRatio(devicePixelRatio);
    background.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    // event listener for window resize
    window.addEventListener('resize', function() {
        // console.log('resize')
        var width = window.innerWidth;
        var height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });

    let frame = 0;

    loadGLTFModel(model, scene)
        .then((components) => {
            console.log('Loaded components:', components);

            // Fallback for camera
            if (components.cameras.length > 0) {
                camera = components.cameras[0];
                // Re-attach controls to camera
                controls.object = camera;
            } else {
                console.warn("No camera found in the GLTF model. Using default camera.");
            }

            components.lights.forEach((light) => {
                light.intensity *= 0.01;
            });
        })
        .catch((error) => {
            console.error('Failed to load model:', error);
        });

    //animation once per frame
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        frame += 0.01;
    }

    //mouse coordinates
    const mouse = {
        x: undefined,
        y: undefined
    };

    animate();

    // mouse move listener
    addEventListener('mousemove', (e) => {
        mouse.x = (e.clientX / innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / innerHeight) * 2 + 1;
        // console.log(mouse);
    });

    return background;
}
