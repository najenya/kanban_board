import React, { useState } from 'react';
import RegisterPage from './components/Register';
import LoginPage from './components/Login';
import TaskList from './components/TaskList';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <h1>Task Manager</h1>
      {!isLoggedIn ? (
        <>
          
          <LoginPage onLogin={handleLogin} />
          <RegisterPage />
        </>
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <TaskList />
        </>
      )}
    </div>
  );
};

export default App;


