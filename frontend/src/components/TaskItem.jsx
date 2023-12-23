import React from 'react';

const TaskItem = ({ task, onRemoveTask, onMoveTask }) => { 
  const handleRemoveClick = () => {
    onRemoveTask(task.id);
  };

  const handleMoveClick = (newStatus) => {
    onMoveTask(task.id, newStatus);
  };

  return (
    <li className="task-item">
      <div className="task-info">
        <span>{task.title}</span>
        <div>
          <button
            className="button-todo"
            onClick={() => handleMoveClick('ToDo')}
          >
            ToDo
          </button>
          <button
            className="button-inprogress"
            onClick={() => handleMoveClick('InProgress')}
          >
            InProgress
          </button>
          <button
            className="button-done"
            onClick={() => handleMoveClick('Done')}
          >
            Done
          </button>
          <button
            className="button-delete"
            onClick={handleRemoveClick}
          >
            Удалить
          </button>
        </div>
      </div>
    </li>
  );
};

export default TaskItem;
