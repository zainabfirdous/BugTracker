import './App.css';
import Login from './Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Desktop from './components/Desktop'
import AppInfo from './AppInfo'
import Employee from './components/Employee'
import Project from './components/Project'
import Welcome from './components/Welcome'
import Test from './components/Test'


function App() {


  return (
    <>
    
    <BrowserRouter>
    <Desktop/>
      <Routes>
      {localStorage.user ? <Route path="/" element={<Welcome />} /> : <Route path="/" element={<AppInfo />} /> }
      <Route path="/Login" element={<Login />} />
      <Route path="/AppInfo" element={<AppInfo />} />
      {localStorage.user ? <Route path="/Welcome" element={<Welcome />} /> : <Route path="/AppInfo" element={<AppInfo />} /> }
      <Route path="/Welcome" element={<Welcome />} />
      <Route path="/Employee" element={<Employee />} />
      <Route path="/Project" element={<Project />} />
      <Route path="/Test" element={<Test />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
