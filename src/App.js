import './App.css';
import { TableComponent } from './components/TableComponent';
import LoginPage from './components/LoginPage';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';

function App() {
  return (
    <Router>
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route exact path='/tableView' element={<TableComponent />} />
            <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
    </Router>
  );
}

export default App;
