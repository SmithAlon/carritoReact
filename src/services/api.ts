// src/services/api.ts

// Tipos para la aplicación
export interface Tarea {
    _id?: string;
    titulo: string;
    descripcion: string;
    completada: boolean;
  }
  
  export interface Usuario {
    username: string;
    password: string;
  }
  
  // Importar configuración de entorno
  import env from '../config/env';
  
  // URL base de la API
  const API_URL = env.apiUrl;
  
  // Clave API para autenticación
  const API_KEY = env.apiKey;
  
  // Headers para solicitudes autenticadas
  const getAuthHeaders = () => {
    return {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY
    };
  };
  
  // Servicio para gestionar usuarios
  export const usuarioService = {
    // Registrar un nuevo usuario
    async registrar(usuario: Usuario): Promise<{ mensaje: string; id: string }> {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.mensaje || 'Error al registrar usuario');
      }
      
      return response.json();
    },
    
    // Iniciar sesión
    async login(usuario: Usuario): Promise<{ mensaje: string }> {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.mensaje || 'Credenciales inválidas');
      }
      
      return response.json();
    }
  };
  
  // Servicio para gestionar tareas
  export const tareaService = {
    // Obtener todas las tareas
    async obtenerTodas(): Promise<Tarea[]> {
      const response = await fetch(`${API_URL}/tareas`, {
        method: 'GET',
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.mensaje || 'Error al obtener tareas');
      }
      
      return response.json();
    },
    
    // Obtener una tarea por ID
    async obtenerPorId(id: string): Promise<Tarea> {
      const response = await fetch(`${API_URL}/tareas/${id}`, {
        method: 'GET',
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.mensaje || 'Tarea no encontrada');
      }
      
      return response.json();
    },
    
    // Crear una nueva tarea
    async crear(tarea: Omit<Tarea, '_id'>): Promise<{ mensaje: string; id: string }> {
      const response = await fetch(`${API_URL}/tareas`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(tarea)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.mensaje || 'Error al crear tarea');
      }
      
      return response.json();
    },
    
    // Actualizar una tarea existente
    async actualizar(id: string, tarea: Tarea): Promise<{ mensaje: string }> {
      const response = await fetch(`${API_URL}/tareas/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(tarea)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.mensaje || 'Error al actualizar tarea');
      }
      
      return response.json();
    },
    
    // Eliminar una tarea
    async eliminar(id: string): Promise<{ mensaje: string }> {
      const response = await fetch(`${API_URL}/tareas/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.mensaje || 'Error al eliminar tarea');
      }
      
      return response.json();
    }
  };