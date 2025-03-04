// src/config/env.ts

// Configuración para diferentes entornos
interface Config {
    apiUrl: string;
    apiKey: string;
  }
  
  // Valores predeterminados para desarrollo
  const defaultConfig: Config = {
    // Si estás en modo producción, usa la URL de Render, de lo contrario usa localhost
    apiUrl: import.meta.env.MODE === 'production' 
      ? 'http://127.0.0.1:10000/api' // Reemplaza con tu URL real de Render
      : ' http://10.204.182.119:10000', // Observa que ahora es puerto 10000
    apiKey: 'mi_clave_secreta_12345' // Esto debería venir de variables de entorno
  };
  
  // En Vite, las variables de entorno están disponibles en import.meta.env
  // con el prefijo VITE_ en lugar de REACT_APP_
  const env = {
    apiUrl: import.meta.env.VITE_API_URL || defaultConfig.apiUrl,
    apiKey: import.meta.env.VITE_API_KEY || defaultConfig.apiKey
  };
  
  export default env;