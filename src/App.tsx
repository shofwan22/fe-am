import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WizardPage from './pages/Wizard';
import EmployeesPage from './pages/Employees';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/wizard" element={<WizardPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
