// ThreeModel.jsx

import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeModel = ({ containerRef }) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.25, 20);
    camera.position.set(-1.8, 0.6, 2.7);

    const scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.3);
    directionalLight.position.set(1, 1, 0);
    scene.add(directionalLight);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    container.appendChild(renderer.domElement);

    new OrbitControls(camera, renderer.domElement);

    const loader = new GLTFLoader();
    loader.load('../public/models/corn11.glb', (gltf) => {
      scene.add(gltf.scene);
    }, undefined, (error) => {
      console.error('Error al cargar el modelo GLTF:', error);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeChild(renderer.domElement);
    };
  }, [containerRef]);

  return null;
};

export default ThreeModel;
