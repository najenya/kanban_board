import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState('');

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      onAddTask(newTask);
      setNewTask('');
    }
  };

  return (
    <div>
      <input type="text" value={newTask} onChange={handleInputChange} />
      <button onClick={handleAddTask}>Добавить задачу</button>
    </div>
  );
};

export default TaskForm;
