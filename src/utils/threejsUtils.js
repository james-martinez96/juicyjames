import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

// Gizmos
export class GizmoManager {
    constructor(scene) {
        this.scene = scene;
        this.helpers = new Map(); // To store gizmo helpers with unique keys
    }

    /**
     * Add a helper the scene and manage it.
     * @param {string} key - Unique identifier for the helper.
     * @param {THREE.Object3D} helper - The helper object to add.
     */
    addHelper(key, helper) {
        if (this.helpers.has(key)) {
            console.warn(`Helper with key '${key}' already exists.`);
            return;
        }
        this.helpers.set(key, helper);
        helper.visible = false;
        this.scene.add(helper);
    }

    /**
     * Remove a helper from the scene.
     * @param {string} key - Unique identifier for the helper to remove.
     */
    removeHelper(key) {
        const helper = this.helpers.get(key);
        if (helper) {
            this.scene.remove(helper);
            this.helpers.delete(key);
        } else {
            console.warn(`Helper with key '${key}' does not exist.`);
        }
    }

    /**
     * Enable (make visible) a helper in the scene.
     * @param {string} key - Unique identifier for the helper.
     */
    enableHelper(key) {
        const helper = this.helpers.get(key);
        if (helper) {
            helper.visible = true;
        } else {
            console.warn(`Helper with key '${key}' does not exist.`);
        }
    }

    /**
     * Disable (make invisible) a helper in the scene.
     * @param {string} key - Unique identifier for the helper.
     */
    disableHelper(key) {
        const helper = this.helpers.get(key);
        if (helper) {
            helper.visible = false;
        } else {
            console.warn(`Helper with key '${key}' does not exist.`);
        }
    }

    /**
     * Toggle the helper in the scene.
     * @param {string} key - unique identifier for the helper.
     */
    toggleHelper(key) {
        const helper = this.helpers.get(key);
        if (helper) {
            helper.visible = !helper.visible;
        } else {
            console.warn(`Helper with key '${key}' does not exist.`);
        }
    }

    // Add jsdoc
    updateHelper(key, updateFn) {
        const helper = this.helpers.get(key);
        if (helper) {
            updateFn(helper);
        } else {
            console.warn(`Helper with key '${key}' does not exist.`);
        }
    }
}

/**
 * A helper function to load GLTF models.
 * @param {string} url - The path to the GLTF model.
 * @param {THREE.Scene} scene - The Three.js scene where the model will be added.
 * @returns {Promise<Object>} A promise that resolves with the loaded GLTF components.
 */
export function loadGLTFModel(url, scene) {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();

        loader.load(
            url,
            (gltf) => {
                // Add the loaded scene to the Three.js scene
                scene.add(gltf.scene);
                console.log('Model loaded successfully:', gltf);

                // Extract useful components like meshes, lights, and cameras
                const components = {
                    scene: gltf.scene,
                    meshes: [],
                    lights: [],
                    cameras: gltf.cameras || [],
                    animations: gltf.animations || [],
                };

                // Traverse the scene to categorize objects
                gltf.scene.traverse((node) => {
                    if (node.isMesh) {
                        components.meshes.push(node);
                    }
                    if (node.isLight) {
                        components.lights.push(node);
                    }
                });

                resolve(components); // Resolve with all extracted components
            },
            undefined, // Progress callback (optional)
            (error) => {
                console.error('Error loading GLTF model:', error);
                reject(error); // Reject the promise on error
            }
        );
    });
}

/**
 * Recursively generates a tree-like textual representation of an object hierarchy.
 *
 * @param {Object} obj - The object to represent as a tree.
 * @param {string} [obj.name] - The name of the object. Defaults to "*no-name*" if not provided.
 * @param {string} [obj.type] - The type of the object, used in the representation.
 * @param {Object[]} [obj.children] - An array of child objects. Defaults to an empty array.
 * @param {string[]} [lines=[]] - Accumulated lines of the tree representation. Defaults to an empty array.
 * @param {boolean} [isLast=true] - Whether the current object is the last child at its level.
 * @param {string} [prefix=''] - Indentation prefix for the current level of the tree.
 * @returns {string[]} - An array of strings representing the tree structure.
 *
 * @example
 * const obj = {
 *     name: "Root",
 *     type: "Folder",
 *     children: [
 *         {name: "Child 1", type: "File", children: []},
 *         {
 *             name: "Child 2",
 *             type: "Folder",
 *             children: [
 *                 {name: "Grandchild 1", type: "File", children: []},
 *                 {name: "Grandchild 2", type: "File", children: []}
 *             ]
 *         }
 *     ]
 * };
 * 
 * const tree = dumpObject(obj);
 * console.log(tree.join('\n'));
 * 
 * // Output:
 * // Root [Folder]
 * // ├─Child 1 [File]
 * // └─Child 2 [Folder]
 * //   ├─Grandchild 1 [File]
 * //   └─Grandchild 2 [File]
 */
export function dumpObject(obj, lines = [], isLast = true, prefix = '') {
    const localPrefix = isLast ? '└─' : '├─';
    lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
    const newPrefix = prefix + (isLast ? '  ' : '│ ');
    const lastNdx = obj.children.length - 1;
    obj.children.forEach((child, ndx) => {
        const isLast = ndx === lastNdx;
        dumpObject(child, lines, isLast, newPrefix);
    });
    return lines;
}
