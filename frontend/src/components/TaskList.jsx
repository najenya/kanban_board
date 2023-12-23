import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskItem from './TaskItem';
import TaskForm from './AddTask';
import '../styles.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]); 

  useEffect(() => {
    fetch('http://localhost:8000/board/tasks/')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleAddTask = (title) => {
    fetch('http://localhost:8000/board/tasks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    })
      .then(response => response.json())
      .then(data => setTasks([...tasks, data]))
      .catch(error => console.error('Error creating task:', error));
  };

  const handleRemoveTask = (taskId) => {
    fetch(`http://localhost:8000/board/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .then(() => setTasks(tasks.filter(task => task.id !== taskId)))
      .catch(error => console.error('Error deleting task:', error));
  };

  const handleMoveTask = (taskId, newStatus) => {
    fetch(`http://localhost:8000/board/tasks/${taskId}/${newStatus}`, {
      method: 'PUT',
    })
      .then(response => response.json())
      .then(data => {
        setTasks(tasks.map(task => (task.id === taskId ? data : task)));
      })
      .catch(error => console.error('Error updating task status:', error));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
  
    const updatedTasks = [...tasks];
    const movedTask = updatedTasks.find(task => task.id === Number(result.draggableId));
  
   
    if (movedTask) {
      movedTask.status = result.destination.droppableId;
      handleMoveTask(movedTask.id, result.destination.droppableId);
    }
  
    setTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div>
        <h2>Задачи</h2>
        <TaskForm onAddTask={handleAddTask} />
        <div className="task-columns">
          {['ToDo', 'InProgress', 'Done'].map(status => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="task-column"
                >
                  <h3>{status}</h3>
                  <ul className="task-list">
                    {tasks
                      .filter(task => task.status === status)
                      .map((task, index) => (
                        <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="task-item"
                            >
                              <TaskItem
                                task={task}
                                onRemoveTask={handleRemoveTask}
                                onMoveTask={handleMoveTask}
                              />
                            </li>
                          )}
                        </Draggable>
                      ))}
                  </ul>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default TaskList;
