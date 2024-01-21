import './App.css';
import Login from './Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Desktop from './components/Desktop'
import Home from './components/Home'
import Employee from './components/Employee'
import Project from './components/Project'
import Welcome from './components/Welcome'

function App() {

  return (
    <>
    
    <BrowserRouter>
    <Desktop/>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Welcome" element={<Welcome />} />
      {/* <Route path="/Desktop" element={<Desktop />} /> */}
      <Route path="/Employee" element={<Employee />} />
      <Route path="/Project" element={<Project />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
