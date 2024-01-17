import './App.css';
import Login from './Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Desktop from './Component/Desktop'
import Home from './Component/Home'
import Employee from './Component/Employee'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Desktop" element={<Desktop />} />
      <Route path="/Employee" element={<Employee />} />
      
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
