import {createElement} from "./utils/domUtils.js";
import gsap from 'gsap';
import * as THREE from 'three';
// import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
// import * as dat from 'dat.gui';

export function background() {
    const background = createElement('div', {id: 'background'});
    document.body.appendChild(background);

    // dat.gui controls
    //const gui = new dat.GUI()
    const world = {
        plane: {
            width: 400,
            height: 400,
            widthSegments: 50,
            heightSegments: 50
        }
    };
    //gui.add(world.plane, 'width', 1, 500).
    //  onChange(generatePlane)
    //
    //gui.add(world.plane, 'height', 1, 500).
    //  onChange(generatePlane)
    //
    //gui.add(world.plane, 'widthSegments', 1, 100).
    //  onChange(generatePlane)
    //
    //gui.add(world.plane, 'heightSegments', 1, 100).
    //  onChange(generatePlane)

    function generatePlane() {
        // planeMesh.geometry.dispose()
        planeMesh.geometry = new THREE.
            PlaneGeometry(
                world.plane.width,
                world.plane.height,
                world.plane.widthSegments,
                world.plane.heightSegments
            );

        // vertice position radomization
        const {array} = planeMesh.geometry.attributes.position;
        const randomValues = [];
        for (let i = 0; i < array.length; i++) {

            if (i % 3 === 0) {
                const x = array[i];
                const y = array[i + 1];
                const z = array[i + 2];

                array[i] = x + (Math.random() - 0.5) * 3;
                array[i + 1] = y + (Math.random() - 0.5) * 3;
                array[i + 2] = z + (Math.random() - 0.5) * 3;
            }

            randomValues.push(Math.random() * Math.PI * 2);
        };

        planeMesh.geometry.attributes.position.randomValues = randomValues;
        planeMesh.geometry.attributes.position.originalPosition = planeMesh.geometry.attributes.position.array;

        // color attribute addition
        const colors = [];
        for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++) {
            colors.push(0, 0.19, 0.4);
        }

        planeMesh.geometry.setAttribute(
            'color',
            new THREE.BufferAttribute(new Float32Array(colors), 3)
        );
    }

    //create raycaster
    const raycaster = new THREE.Raycaster();
    //console.log(raycaster)
    //create basic scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({antialias: true});

    //const canvas = document.querySelector('#background');
    //console.log(canvas)

    //set renderer size to screen dimensions
    // renderer.setSize(innerWidth, innerHeight);
    renderer.setSize(background.clientWidth, background.clientHeight);
    renderer.setPixelRatio(devicePixelRatio);
    // idk what the fuck is going on
    // document.body.appendChild(renderer.domElement);
    background.appendChild(renderer.domElement);
    //const can = document.getElementsByTagName('canvas')[1]
    //can.id = 'background';
    //console.log(can)

    // event listener for window resize
    window.addEventListener('resize', function() {
        //console.log('resize')
        var width = window.innerWidth;
        var height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });

    // orbit controls
    //new OrbitControls(camera, renderer.domElement)

    //move camera back 5 to see box
    camera.position.z = 100;

    //create blue plane 
    const planeGeometry = new THREE.PlaneGeometry(world.plane.width, world.plane.height, world.plane.widthSegments, world.plane.heightSegments);
    const planeMaterial = new THREE.
        MeshPhongMaterial({
            //color: 0xff0000, 
            side: THREE.DoubleSide,
            flatShading: true,
            vertexColors: true
        });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(planeMesh);
    generatePlane();

    //console.log(planeMesh.geometry.attributes.position.array)

    //console.log(planeMesh.geometry.attributes.position)


    //add directional light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, -1, 1);
    scene.add(light);

    //add directional backlight
    const backLight = new THREE.DirectionalLight(0xffffff, 1);
    backLight.position.set(0, 1, -1);
    scene.add(backLight);

    let frame = 0;

    //animation once per frame
    function animate() {
        requestAnimationFrame(animate);
        //render out the scene
        renderer.render(scene, camera);
        //planeMesh.rotation.x += 0.01
        //racaster to track mouse
        raycaster.setFromCamera(mouse, camera);
        frame += 0.01;

        // vertex animation
        const {array, originalPosition, randomValues} = planeMesh.geometry.attributes.position;
        for (let i = 0; i < array.length; i += 3) {
            //x
            array[i] = originalPosition[i] + Math.cos(frame + randomValues[i]) * 0.01;
            //y
            array[i + 1] = originalPosition[i + 1] + Math.sin(frame + randomValues[i + 1]) * 0.01;

            //if (i === 0) {
            //  console.log(Math.cos(frame))
            //}
        }

        planeMesh.geometry.attributes.position.needsUpdate = true;

        //change color of vertice in array under mouse
        const intersects = raycaster.intersectObject(planeMesh);
        if (intersects.length > 0) {
            //console.log(intersects[0].face)
            //console.log(intersects[0].object.geometry)
            const {color} = intersects[0].object.geometry.attributes;

            // vertice 1
            color.setX(intersects[0].face.a, 0.1);
            color.setY(intersects[0].face.a, 0.5);
            color.setZ(intersects[0].face.a, 1);

            // vertice 2
            color.setX(intersects[0].face.b, 0.1);
            color.setY(intersects[0].face.b, 0.5);
            color.setZ(intersects[0].face.b, 1);

            // vertice 3
            color.setX(intersects[0].face.c, 0.1);
            color.setY(intersects[0].face.c, 0.5);
            color.setZ(intersects[0].face.c, 1);

            color.needsUpdate = true;

            const initialColor = {
                r: 0,
                g: 0.19,
                b: 0.4
            };
            const hoverColor = {
                r: 0.1,
                g: 0.5,
                b: 1
            };
            //animate light under mouse
            gsap.to(hoverColor, {
                r: initialColor.r,
                g: initialColor.g,
                b: initialColor.b,
                onUpdate: () => {
                    // vertice 1
                    color.setX(intersects[0].face.a, hoverColor.r);
                    color.setY(intersects[0].face.a, hoverColor.g);
                    color.setZ(intersects[0].face.a, hoverColor.b);

                    // vertice 2
                    color.setX(intersects[0].face.b, hoverColor.r);
                    color.setY(intersects[0].face.b, hoverColor.g);
                    color.setZ(intersects[0].face.b, hoverColor.b);

                    // vertice 3
                    color.setX(intersects[0].face.c, hoverColor.r);
                    color.setY(intersects[0].face.c, hoverColor.g);
                    color.setZ(intersects[0].face.c, hoverColor.b);
                }
            });
        }
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
