import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import DetailPage from './pages/DetailPage';

export default function App() {
    return (
        <Router>
            <div className="app-layout">
                <nav className="sidebar">
                    <Link to="/">Home</Link>
                    <Link to="/create">Create</Link>
                </nav>
                <div className="content">
                    <img src="/assets/crewmate-icon..png" className="crewmate-icon" alt="crewmates" />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/create" element={<CreatePage />} />
                        <Route path="/edit/:id" element={<EditPage />} />
                        <Route path="/detail/:id" element={<DetailPage />} />
                        <Route path="*" element={<h1>Page Not Found</h1>} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}
