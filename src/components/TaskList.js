// src/components/TaskList.js
import React, { useState, useEffect } from 'react';
import { ListGroup, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const baseURL = 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL: baseURL,
});

const TaskList = ({ tasks, onDeleteTask, onUpdateTaskStatus }) => {
  const [error, setError] = useState(null);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  const handleDelete = (taskId) => {
    api.delete(`/tasks/${taskId}`)
      .then(() => {
        onDeleteTask(taskId);
        setTaskList(taskList.filter(task => task.id !== taskId));
        setError(null);
      })
      .catch(error => {
        console.error(`Error deleting task ${taskId}:`, error);
        setError(error.response ? error.response.data.errors.join(', ') : 'Unknown error occurred');
      });
  };

  const handleUpdateStatus = (taskId, newStatus) => {
    api.put(`/tasks/${taskId}`, { status: newStatus })
      .then(() => {
        onUpdateTaskStatus(taskId, newStatus);
        setTaskList(taskList.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
        setError(null);
      })
      .catch(error => {
        console.error(`Error updating task ${taskId} status:`, error);
        setError(error.response ? error.response.data.errors.join(', ') : 'Unknown error occurred');
      });
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <h2>Task List</h2>
      {taskList.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ListGroup>
          {taskList.map(task => (
            <ListGroup.Item key={task.id}>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
              <p>Due Date: {task.due_date}</p>
              <p>Reminder: {task.reminder}</p>
              <Button variant="danger" onClick={() => handleDelete(task.id)}>Delete</Button>
              {task.status !== 'Done' && (
                <Button variant="success" onClick={() => handleUpdateStatus(task.id, 'Done')}>
                  Mark as Done
                </Button>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default TaskList;
