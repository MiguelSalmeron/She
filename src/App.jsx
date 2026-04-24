import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
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
            <h1>Jardín de Calma</h1>
            <p>Bienvenido de nuevo, {currentUser.email}</p>
          </header>
          <main>
            <section className="status-card">
              <h2>Tu espacio personal</h2>
              <p>Aquí comenzará a crecer tu jardín digital.</p>
              <button 
                onClick={() => logout()}
                className="logout-button"
              >
                Cerrar sesión
              </button>
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
