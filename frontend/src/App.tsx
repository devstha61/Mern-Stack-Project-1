
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './features/auth/login/login';
import Register from './features/auth/register/register';
import Home from './features/home/homepage';
import LoginGuard from './shared/guards/loginguard';
import AuthGuard from './shared/guards/authguard';


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginGuard><Login/></LoginGuard>} />
      <Route path="/register" element={<LoginGuard><Register /></LoginGuard>} />
      <Route path="/home" element={<AuthGuard><Home /></AuthGuard>} />
    </Routes>

  );
}

export default App;


