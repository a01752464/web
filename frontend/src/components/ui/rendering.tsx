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
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Cámara
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.25, 100);
    camera.position.set(0, 2.7, 4);
    camera.lookAt(0, 2, 0);

    // Escena
    const scene = new THREE.Scene();

    // Iluminación
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.6);
    directionalLight.position.set(0, 2.7, 1);
    scene.add(directionalLight);

    // Renderizador
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 2, 0);
    
    // Variable para almacenar el modelo
    let model: THREE.Group | null = null;

    // Cargar el modelo GLTF
    const loader = new GLTFLoader();
    loader.load('../../../public/models/corn11.glb', (gltf) => {
      model = gltf.scene;
      scene.add(model);
      controls.update(); // Asegúrate de llamar a esto si cambias el target
    }, undefined, (error) => {
        console.error('Error al cargar el modelo GLTF:', error);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotación del modelo
      if (model) {
        model.rotation.y += 0.01;
      }
      
      controls.update(); // Necesario si OrbitControls habilita el damping o si cambia el target dinámicamente.
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
