import './App.css';
import Login from './Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Desktop from './components/Desktop'
import Home from './components/Home'
import Employee from './components/Employee'
import Project from './components/Project'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Desktop" element={<Desktop />} />
      <Route path="/Employee" element={<Employee />} />
      <Route path="/Project" element={<Project />} />
      
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
