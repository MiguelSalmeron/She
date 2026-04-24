import React, { useState, useEffect } from 'react';

export default function PixelPomodoro() {
  const FOCUS_TIME = 25 * 60; // 25 minutos en segundos
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isActive, setIsActive] = useState(false);

  // Efecto del temporizador
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Aquí en la Fase 3 conectaremos la lógica para sumar "Energía Vital" a Firebase
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(FOCUS_TIME);
  };

  // Calcular la etapa de crecimiento de la planta (0 a 4)
  const progress = 1 - (timeLeft / FOCUS_TIME);
  let stage = 0;
  if (progress > 0.2) stage = 1;
  if (progress > 0.5) stage = 2;
  if (progress > 0.8) stage = 3;
  if (progress === 1) stage = 4;

  // Estos emojis serán reemplazados por tus archivos .png de pixel art (ej. <img src="/sprites/seed.png" />)
  const growthSprites = ['🌰', '🌱', '🌿', '🪴', '🌳']; 
  const messages = [
    "Plantando la intención...",
    "Echando raíces...",
    "Creciendo de a poco...",
    "A punto de florecer...",
    "¡Buen trabajo! Tiempo de descansar."
  ];

  // Formato de tiempo (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 max-w-sm mx-auto mt-8 font-vt323">
      {/* Contenedor estilo "Retro/Pixel" */}
      <div className="bg-stone-100 border-4 border-stone-800 p-6 rounded-none shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] w-full">
        
        {/* Pantalla del Sprite */}
        <div className="bg-[#8bac0f] border-4 border-stone-800 h-40 flex flex-col items-center justify-center mb-6 relative overflow-hidden">
          {/* Efecto de líneas de escaneo (Scanlines) sutiles */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
          
          <span className="text-7xl drop-shadow-md mb-2 transition-transform duration-700 hover:scale-110 cursor-pointer">
            {growthSprites[stage]}
          </span>
          <p className="text-[#306230] font-bold text-lg uppercase tracking-widest mt-2 px-2 text-center">
            {messages[stage]}
          </p>
        </div>

        {/* Reloj y Controles */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-5xl font-mono font-bold text-stone-800 tracking-tighter">
            {formatTime(timeLeft)}
          </div>
          
          <div className="flex gap-3 w-full">
            <button 
              onClick={toggleTimer}
              className={`flex-1 border-2 border-stone-800 font-bold py-2 px-4 uppercase text-lg transition-transform active:translate-y-1 ${
                isActive 
                  ? 'bg-amber-100 hover:bg-amber-200 text-stone-800 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]' 
                  : 'bg-emerald-400 hover:bg-emerald-500 text-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]'
              }`}
            >
              {isActive ? 'Pausar' : timeLeft === 0 ? 'Plantar otra' : 'Regar'}
            </button>
            
            <button 
              onClick={resetTimer}
              className="bg-stone-200 hover:bg-stone-300 text-stone-800 border-2 border-stone-800 font-bold py-2 px-4 uppercase text-lg shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] transition-transform active:translate-y-1"
            >
              Soltar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
