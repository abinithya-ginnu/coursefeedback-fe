import logo from './logo.svg';
import './App.css';
import Login from './Login/Login';
import { Route, Routes } from 'react-router-dom';
import DashboardNav from './DashboardNav/DashboardNav';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path= '/' element={<Login />}></Route>
        <Route path= '/dashboard' element={<DashboardNav />}></Route>
      </Routes>
    </div>
  );
}

export default App;
