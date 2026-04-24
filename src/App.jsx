import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import BreathingBox from './components/ui/BreathingBox';
import './index.css';

function AppContent() {
  const { currentUser, logout } = useAuth();

  return (
    <div className="app-container">
      {!currentUser ? (
        <Login />
      ) : (
        <>
          <header>
            <h1 className="mb-2">Jardín de Calma</h1>
            <p>Bienvenido de nuevo, {currentUser.email}</p>
          </header>
          <main className="p-6">
            <section className="status-card mb-8">
              <h2>Tu espacio personal</h2>
              <p>Aquí comenzará a crecer tu jardín digital.</p>
              <button 
                onClick={() => logout()}
                className="mt-4 px-4 py-2 bg-stone-700 text-white rounded hover:bg-stone-600 transition"
              >
                Cerrar sesión
              </button>
            </section>
            
            <section className="flex justify-center w-full">
              <BreathingBox />
            </section>
          </main>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
