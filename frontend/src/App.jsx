import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/main_page.jsx';
import Registration from './pages/Registration.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import NewsPage from './pages/NewsPage.jsx';
import ArticleDetail from './pages/ArticleDetail.jsx';
import About from './pages/About.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<div style={{padding: '50px', textAlign: 'center'}}><h1>404</h1></div>} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:slug" element={<ArticleDetail />} />
        <Route path="/about-us" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;