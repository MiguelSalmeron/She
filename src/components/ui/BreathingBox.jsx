import React, { useState, useEffect } from 'react';

const BreathingBox = () => {
  const [phase, setPhase] = useState('Inhala');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    let timeout;
    
    const runCycle = () => {
      // Fase 1: Inhala (4 segundos)
      setPhase('Inhala');
      timeout = setTimeout(() => {
        // Fase 2: Sostén (7 segundos)
        setPhase('Sostén');
        timeout = setTimeout(() => {
          // Fase 3: Exhala (8 segundos)
          setPhase('Exhala');
          timeout = setTimeout(() => {
            // Reiniciar ciclo
            runCycle();
          }, 8000);
        }, 7000);
      }, 4000);
    };

    runCycle();

    return () => clearTimeout(timeout);
  }, [isActive]);

  // Determinar clases basadas en la fase actual
  const getCircleStyles = () => {
    let scaleClass = 'scale-100';
    let durationClass = 'duration-1000'; // Default, usado cuando no está activo

    if (isActive) {
      if (phase === 'Inhala') {
        scaleClass = 'scale-[2]'; // Escala al doble
        durationClass = 'duration-[4000ms]';
      } else if (phase === 'Sostén') {
        scaleClass = 'scale-[2]'; // Se mantiene al doble
        durationClass = 'duration-[7000ms]'; // No importa mucho porque no hay cambio de escala, pero lo mantenemos fluido
      } else if (phase === 'Exhala') {
        scaleClass = 'scale-100'; // Vuelve a su tamaño original
        durationClass = 'duration-[8000ms]';
      }
    }

    return `w-48 h-48 rounded-full bg-emerald-500/20 border border-emerald-400/30 shadow-[0_0_40px_rgba(16,185,129,0.2)] flex items-center justify-center transition-transform ease-in-out ${scaleClass} ${durationClass}`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative flex items-center justify-center w-80 h-80">
        {/* Círculo animado */}
        <div className={getCircleStyles()}>
          {/* Círculo interior estático pequeño para referencia central */}
          <div className="w-16 h-16 rounded-full bg-emerald-600/40 flex items-center justify-center backdrop-blur-sm z-10">
            {isActive && (
              <span className="text-white text-sm font-medium tracking-widest uppercase">
                {phase}
              </span>
            )}
            {!isActive && (
              <span className="text-white text-xs font-medium uppercase text-center leading-tight">
                Iniciar
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Controles */}
      <button
        onClick={() => setIsActive(!isActive)}
        className="mt-12 px-6 py-2 rounded-full bg-stone-800 text-stone-200 border border-stone-700 hover:bg-stone-700 hover:text-white transition-colors uppercase tracking-wider text-sm shadow-sm"
      >
        {isActive ? 'Detener' : 'Comenzar respiración'}
      </button>
      
      {isActive && (
        <p className="mt-6 text-stone-400 text-sm font-light tracking-wide">
          {phase === 'Inhala' && 'Por la nariz (4s)'}
          {phase === 'Sostén' && 'Mantén el aire (7s)'}
          {phase === 'Exhala' && 'Por la boca (8s)'}
        </p>
      )}
    </div>
  );
};

export default BreathingBox;
