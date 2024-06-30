// src/components/TaskFilter.js
import React from 'react';
import { Form } from 'react-bootstrap';

const TaskFilter = ({ onFilterChange }) => {
  const handleChange = event => {
    const status = event.target.value;
    onFilterChange(status);
  };

  return (
    <Form.Group controlId="taskFilter">
      <Form.Label>Filter by Status:</Form.Label>
      <Form.Control as="select" onChange={handleChange}>
        <option value="All">All</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </Form.Control>
    </Form.Group>
  );
};

export default TaskFilter;
