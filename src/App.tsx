// src/App.tsx

import React, { useState, useEffect } from 'react';
import Auth from './components/Auth.tsx';
import TaskManager from './components/TasksManager.tsx';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Verificar si el usuario está autenticado al cargar la aplicación
  useEffect(() => {
    // Aquí podrías implementar una lógica más robusta de autenticación
    // usando tokens JWT almacenados en localStorage, por ejemplo
    const checkAuth = () => {
      // Por ahora, simplemente comprobar si hay un marcador en localStorage
      const auth = localStorage.getItem('isAuthenticated');
      if (auth === 'true') {
        setIsAuthenticated(true);
      }
    };
    
    checkAuth();
  }, []);

  // Manejar login exitoso
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  // Manejar logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Gestor de Tareas
          </h1>
          
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cerrar Sesión
            </button>
          )}
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {isAuthenticated ? (
          <TaskManager />
        ) : (
          <Auth onLoginSuccess={handleLoginSuccess} />
        )}
      </main>
    </div>
  );
};

export default App;