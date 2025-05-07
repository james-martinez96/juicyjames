import {createElement} from "./utils/domUtils.js";
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import model from "./assets/models/level.glb";
import {loadGLTFModel, GizmoManager} from "./utils/threejsUtils.js";

export function background() {
    const background = createElement('div', {id: 'background'});
    document.body.appendChild(background);

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({antialias: true});
    let camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
    camera.position.z = 25;

    renderer.setSize(background.clientWidth, background.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optional, improves shadow quality

    background.appendChild(renderer.domElement);

    // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    // scene.add(ambientLight);

    const controls = new OrbitControls(camera, renderer.domElement);

    // Gizmos
    // scene.add(new THREE.AxesHelper(10));
    // scene.add(new THREE.GridHelper(50, 50));
    // Create a GizmoManager instance
    const gizmoManager = new GizmoManager(scene);

    // Add an AxesHelper to the scene
    const axesHelper = new THREE.AxesHelper(50);
    gizmoManager.addHelper('axes', axesHelper);

    // Add a GridHelper
    const gridHelper = new THREE.GridHelper(50, 50);
    gizmoManager.addHelper('grid', gridHelper);

    // Toggle helper on keypress
    window.addEventListener('keydown', (event) => {
        if (event.key === '1') {
            gizmoManager.toggleHelper('axes');
        } else if (event.key === '2') {
            gizmoManager.toggleHelper('grid');
        } else if (event.key === '3') {
            gizmoManager.toggleHelper('box');
        }
    });

    // event listener for window resize
    function onWindowResize() {
        // console.log('resize')
        var width = background.clientWidth;
        var height = background.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onWindowResize);

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

            // Lights
            components.lights.forEach((light) => {
                if (light.type === 'PointLight') {
                    light.intensity *= 0.01;
                    light.castShadow = true;
                    light.shadow.mapSize.width = 1024;
                    light.shadow.mapSize.height = 1024;
                    const lightHelper = new THREE.PointLightHelper(light);
                    scene.add(lightHelper);
                    console.log("light shadow map:", light.shadow.map); // shadow map is null?
                    // light.shadow.bias = -0.001;
                }
            });

            // Meshes
            components.meshes.forEach((mesh, index) => {
                const boxHelper = new THREE.BoxHelper(mesh);
                // scene.add(boxHelper);

                console.log(`Obj-${index}`);
                gizmoManager.addHelper(`Obj-${index}`, boxHelper);
                if (mesh.name === 'Floor-col') {
                    mesh.receiveShadow = true;
                }
                else if (mesh.name === 'Icosphere-rigid') {
                    mesh.receiveShadow = true;
                    mesh.castShadow = true;
                }
                else {
                    mesh.castShadow = true;
                    // meshes.receiveShadow = true;
                }
            });
        })
        .catch((error) => {
            console.error('Failed to load model:', error);
        });

    //mouse coordinates
    const mouse = {
        x: undefined,
        y: undefined
    };

    // mouse move listener
    addEventListener('mousemove', (e) => {
        mouse.x = (e.clientX / innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / innerHeight) * 2 + 1;
        // console.log(mouse);
    });

    //animation once per frame
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();

    return background;
}
