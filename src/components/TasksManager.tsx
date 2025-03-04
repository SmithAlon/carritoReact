// src/components/TaskManager.tsx

import React, { useState, useEffect } from 'react';
import { Tarea, tareaService } from '../services/api';

const TasksManager: React.FC = () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Tarea, '_id'>>({
    titulo: '',
    descripcion: '',
    completada: false
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  // Cargar tareas al montar el componente
  useEffect(() => {
    fetchTareas();
  }, []);

  // Obtener todas las tareas
  const fetchTareas = async () => {
    try {
      setLoading(true);
      const data = await tareaService.obtenerTodas();
      setTareas(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las tareas: ' + (err instanceof Error ? err.message : 'Error desconocido'));
    } finally {
      setLoading(false);
    }
  };

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : value
    }));
  };

  // Manejar cambio en checkbox
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Crear o actualizar tarea
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      if (editMode && currentId) {
        // Actualizar tarea existente
        await tareaService.actualizar(currentId, { ...formData, _id: currentId });
      } else {
        // Crear nueva tarea
        await tareaService.crear(formData);
      }
      
      // Reiniciar formulario y recargar tareas
      resetForm();
      fetchTareas();
      
    } catch (err) {
      setError('Error: ' + (err instanceof Error ? err.message : 'Error desconocido'));
    } finally {
      setLoading(false);
    }
  };

  // Eliminar tarea
  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      try {
        setLoading(true);
        await tareaService.eliminar(id);
        fetchTareas();
      } catch (err) {
        setError('Error al eliminar: ' + (err instanceof Error ? err.message : 'Error desconocido'));
      } finally {
        setLoading(false);
      }
    }
  };

  // Preparar tarea para edición
  const handleEdit = (tarea: Tarea) => {
    if (tarea._id) {
      setFormData({
        titulo: tarea.titulo,
        descripcion: tarea.descripcion,
        completada: tarea.completada
      });
      setEditMode(true);
      setCurrentId(tarea._id);
    }
  };

  // Reiniciar formulario
  const resetForm = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      completada: false
    });
    setEditMode(false);
    setCurrentId(null);
  };

  // Cambiar estado de completado
  const toggleCompletado = async (tarea: Tarea) => {
    if (tarea._id) {
      try {
        const updatedTarea = { ...tarea, completada: !tarea.completada };
        await tareaService.actualizar(tarea._id, updatedTarea);
        fetchTareas();
      } catch (err) {
        setError('Error al actualizar estado: ' + (err instanceof Error ? err.message : 'Error desconocido'));
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Gestor de Tareas</h1>
      
      {/* Mostrar errores */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {/* Formulario para crear/editar tareas */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
        <h2 className="text-xl font-semibold mb-4">{editMode ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="titulo">
              Título
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="titulo"
              name="titulo"
              type="text"
              value={formData.titulo}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
              Descripción
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={3}
            />
          </div>
          
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="completada"
                checked={formData.completada}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <span className="text-gray-700 text-sm font-bold">Completada</span>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Procesando...' : editMode ? 'Actualizar' : 'Crear'}
            </button>
            
            {editMode && (
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={resetForm}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
      
      {/* Lista de tareas */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-xl font-semibold mb-4">Mis Tareas</h2>
        
        {loading && <p className="text-gray-600">Cargando tareas...</p>}
        
        {!loading && tareas.length === 0 && (
          <p className="text-gray-600">No hay tareas disponibles.</p>
        )}
        
        <ul className="divide-y divide-gray-200">
          {tareas.map((tarea) => (
            <li key={tarea._id} className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={tarea.completada}
                    onChange={() => toggleCompletado(tarea)}
                    className="mr-3 h-5 w-5"
                  />
                  <div>
                    <h3 className={`text-lg font-medium ${tarea.completada ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                      {tarea.titulo}
                    </h3>
                    {tarea.descripcion && (
                      <p className="text-gray-600 mt-1">{tarea.descripcion}</p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(tarea)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(tarea._id!)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TasksManager;