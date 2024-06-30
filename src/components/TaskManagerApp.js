// src/components/TaskManagerApp.js
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api';

const TaskManagerApp = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchTasks()
      .then(data => {
        setTasks(data);
        setFilteredTasks(data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
    applyFilter(filter);
    fetchTasks()
      .then(data => {
        setTasks(data);
        setFilteredTasks(data);
      })
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId)
      .then(() => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
        applyFilter(filter);
      })
      .catch(error => {
        console.error(`Error deleting task ${taskId}:`, error);
      });
  };

  const handleUpdateTaskStatus = (taskId, newStatus) => {
    updateTask(taskId, { status: newStatus })
      .then(updatedTask => {
        const updatedTasks = tasks.map(task =>
          task.id === taskId ? { ...task, status: updatedTask.status } : task
        );
        setTasks(updatedTasks);
        applyFilter(filter);
      })
      .catch(error => {
        console.error(`Error updating task ${taskId} status:`, error);
      });
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
    applyFilter(selectedFilter);
  };

  const applyFilter = (selectedFilter) => {
    if (selectedFilter === 'All') {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(task => task.status === selectedFilter);
      setFilteredTasks(filtered);
    }
  };

  return (
    <Container className="task-manager-app">
      <h1>Task Manager</h1>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <hr />
      <TaskFilter onFilterChange={handleFilterChange} />
      <hr />
      <TaskList
        tasks={filteredTasks}
        onDeleteTask={handleDeleteTask}
        onUpdateTaskStatus={handleUpdateTaskStatus}
      />
    </Container>
  );
};

export default TaskManagerApp;
