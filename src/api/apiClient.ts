import axios from 'axios';

const API_URL = 'http://10.76.34.155:5000'; // Cambia esto por la URL de tu API en Render
const API_KEY = 'mi_clave_secreta_12345';      // Clave API

// Configuración de Axios
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'X-API-KEY': API_KEY, // Agregar la clave API a todas las solicitudes
    'Content-Type': 'application/json',
  },
});

export default apiClient;