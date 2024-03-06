// Si estás utilizando TypeScript, cambia la extensión a .tsx y ajusta las importaciones y componentes para usar tipos adecuados.

import { useEffect, RefObject } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ThreeModelComponentProps {
  containerRef: RefObject<HTMLDivElement>;
}

const ThreeModelComponent: React.FC<ThreeModelComponentProps> = ({ containerRef }) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth; // Ajusta esto según tus necesidades o usa dimensiones fijas
    const height = container.clientHeight; // Ajusta esto según tus necesidades o usa dimensiones fijas

    // Cámara
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.25, 20);
    camera.position.set(-1.8, 0.6, 2.7);

    // Escena
    const scene = new THREE.Scene();

    // Iluminación
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.3);
    directionalLight.position.set(1, 1, 0);
    scene.add(directionalLight);

    // Renderizador
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    container.appendChild(renderer.domElement);

    // Controles de órbita
    new OrbitControls(camera, renderer.domElement);

    // Cargar el modelo GLTF
    const loader = new GLTFLoader();
    loader.load('../../../public/models/corn11.glb', (gltf) => {
        scene.add(gltf.scene);
    }, undefined, (error) => {
        console.error('Error al cargar el modelo GLTF:', error);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Limpieza al desmontar el componente
    return () => {
      if(container.firstChild) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [containerRef]);

  return null; // No es necesario renderizar nada en el DOM, Three.js maneja el canvas
};

export default ThreeModelComponent;
