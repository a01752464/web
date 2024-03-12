

import { useRef } from 'react';
import { SparklesCore } from "./ui/sparkles";
import ThreeModelComponent from './ui/rendering'; // Asegúrate de que la ruta de importación sea correcta

export function SparklesPreview() {
  const threeContainerRef = useRef(null);

  return (
    <>
      <div className="sparkles-preview-container">
        <h1 className="text-3xl lg:text-100xl font-bold text-center text-verqor-color relative z-20 verqor-title">
          Verqor Game
        </h1>
        <div className="w-full absolute inset-0 h-screen">
          <SparklesCore
            id="tsparticlesfullpage"
            background="#F8F8FF"
            minSize={1.6}
            maxSize={3.2}
            particleDensity={200}
            className="w-full h-full"
            particleColor="#fd8a32" />
        </div>
        <div ref={threeContainerRef} className="three-container" style={{ width: '400px', height: '450px' ,zIndex: '300'}} /> {/* Aquí se define el estilo directamente, pero podrías querer ajustarlo según tus necesidades */}
        <ThreeModelComponent containerRef={threeContainerRef} />
      </div>
    </>
  );
}

export default SparklesPreview;
