import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import UpdateProfile from './components/Update';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/updateProfile" element={<UpdateProfile />} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
