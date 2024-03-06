// Si estás utilizando TypeScript, asegúrate de ajustar las importaciones y componentes para usar tipos adecuados.

import { useRef } from 'react';
import { SparklesCore } from "./ui/sparkles";
import ThreeModelComponent from './ui/rendering'; // Asegúrate de que la ruta de importación sea correcta

export function SparklesPreview() {
  const threeContainerRef = useRef(null);

  return (
    <>
      <div className="h-[54rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <div className="w-full absolute inset-0 h-screen">
          <SparklesCore
            id="tsparticlesfullpage"
            background="#ffffff"
            minSize={1.6}
            maxSize={3.2}
            particleDensity={200}
            className="w-full h-full"
            particleColor="#fd8a32" />
        </div>
        <div ref={threeContainerRef} className="three-container" style={{ width: '500px', height: '500px' ,zIndex: '300'}} /> {/* Aquí se define el estilo directamente, pero podrías querer ajustarlo según tus necesidades */}
        <ThreeModelComponent containerRef={threeContainerRef} />
        <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-verqor-color relative z-20">
          Verqor Game
        </h1>
      </div>
    </>
  );
}

export default SparklesPreview;
