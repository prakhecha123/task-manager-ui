// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskManagerApp from './components/TaskManagerApp';  // Import your main component here
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <TaskManagerApp />  {/* Render your main component here */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to measure performance, pass a function
// to log results (for example: reportWebVitals(console.log))
reportWebVitals();
