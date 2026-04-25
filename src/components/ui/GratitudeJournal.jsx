import React, { useState } from 'react';

export default function GratitudeJournal() {
  const [entry, setEntry] = useState('');
  const [isPlanted, setIsPlanted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (entry.trim() === '') return;
    setIsPlanted(true);
    setTimeout(() => {
      setEntry('');
      setIsPlanted(false);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl shadow-sm border border-stone-100 max-w-sm mx-auto w-full mt-8">
      <h2 className="text-xl font-light text-stone-700 mb-6 tracking-wide text-center">Diario de Gratitud</h2>
      {!isPlanted ? (
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          <p className="text-sm text-stone-400 text-center mb-4">Escribe algo bueno de hoy para "plantarlo".</p>
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Hoy agradezco por..."
            className="w-full p-4 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-100 text-stone-700 h-24 mb-4 resize-none"
            maxLength={120}
          />
          <button type="submit" disabled={entry.trim() === ''} className="w-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 py-3 rounded-xl transition-all font-medium disabled:opacity-50 border border-emerald-100">
            Plantar recuerdo
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center py-6 animate-bounce">
          <span className="text-6xl mb-4">🌸</span>
          <p className="text-stone-600 font-medium">¡Ha florecido!</p>
        </div>
      )}
    </div>
  );
}
