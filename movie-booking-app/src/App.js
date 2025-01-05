import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './components/user/LandingPage';
import Login from './components/Login';
import Register from './components/user/Register';
import UpdateProfile from './components/user/Update';
import AdminLandingPage from './components/admin/AdminLandingPage';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminLandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/updateProfile" element={<UpdateProfile />} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
