// src/pages/Login.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
    } catch (err) {
      setError('Fallo en la autenticación. Por favor revisa tus credenciales.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 text-stone-700 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm p-8 border border-stone-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-light text-stone-800 tracking-wide">
            Jardín de Calma
          </h2>
          <p className="text-sm text-stone-400 mt-2">
            {isLogin ? 'Bienvenida de nuevo a tu espacio.' : 'Comienza a sembrar tu tranquilidad.'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-stone-500 mb-2">Correo electrónico</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all text-stone-700"
              placeholder="tu@correo.com"
            />
          </div>

          <div>
            <label className="block text-sm text-stone-500 mb-2">Contraseña</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all text-stone-700"
              placeholder="••••••••"
            />
          </div>

          <button 
            disabled={loading}
            type="submit" 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl transition-colors duration-300 font-medium disabled:opacity-50"
          >
            {isLogin ? 'Entrar al Jardín' : 'Crear mi espacio'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            {isLogin ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  );
}
