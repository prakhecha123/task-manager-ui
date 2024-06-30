// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',  // Replace with your API base URL
});

export const fetchTasks = () => {
  return api.get('/tasks')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching tasks:', error);
      throw error;
    });
};

export const createTask = (taskData) => {
  return api.post('/tasks', taskData)
    .then(response => response.data)
    .catch(error => {
      console.error('Error creating task:', error);
      throw error;
    });
};

export const updateTask = (taskId, taskData) => {
  return api.put(`/tasks/${taskId}`, taskData)
    .then(response => response.data)
    .catch(error => {
      console.error(`Error updating task ${taskId}:`, error);
      throw error;
    });
};

export const deleteTask = (taskId) => {
  return api.delete(`/tasks/${taskId}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Error deleting task ${taskId}:`, error);
      throw error;
    });
};
