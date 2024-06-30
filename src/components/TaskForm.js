// src/components/TaskForm.js
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { createTask } from '../api';

const TaskForm = ({ onTaskAdded, loading }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [dueDate, setDueDate] = useState('');
  const [reminder, setReminder] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) {
      return; // Prevent multiple submissions while loading
    }

    try {
      // Create new task object
      const newTask = {
        title,
        description,
        status,
        due_date: dueDate,
        reminder,
      };

      // Call API to create task
      await createTask(newTask);

      // Reset form fields and state
      setTitle('');
      setDescription('');
      setStatus('To Do');
      setDueDate('');
      setReminder('');
      setError(null);

      // Notify parent component of task addition
      onTaskAdded(newTask);
    } catch (error) {
      console.error('Error adding task:', error);

      if (error.response && error.response.data.errors) {
        // Handle specific error messages from API
        setError(error.response.data.errors.join(', '));
      } else {
        setError('Unknown error occurred');
      }
    }
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formStatus">
          <Form.Label>Status:</Form.Label>
          <Form.Control
            as="select"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formDueDate">
          <Form.Label>Due Date:</Form.Label>
          <Form.Control
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formReminder">
          <Form.Label>Reminder:</Form.Label>
          <Form.Control
            type="datetime-local"
            value={reminder}
            onChange={e => setReminder(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" disabled={loading}>
          {loading ? 'Adding Task...' : 'Add Task'}
        </Button>
      </Form>
    </div>
  );
};

export default TaskForm;
