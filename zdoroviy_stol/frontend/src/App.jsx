import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/main_page.jsx';
import Registration from './pages/Registration.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<div style={{padding: '50px', textAlign: 'center'}}><h1>404</h1></div>} />
      </Routes>
    </Router>
  );
}

export default App;