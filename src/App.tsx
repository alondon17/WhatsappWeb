import React from 'react';
import Login from './components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css'
import MainPage from './components/MainPage/MainPage';
import useUser from './utility/hooks/useUser';

function App() {
  const user = useUser()
  return (
    <div className="App">
      {user ? <MainPage /> : <Login />}
    </div>
  );
}

export default App;
