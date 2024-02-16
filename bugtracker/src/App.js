import './App.css';
import Login from './Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppInfo from './AppInfo'
import Employee from './components/Employee'
import Project from './components/Project'
import Welcome from './components/Welcome'
import BugRegistration from './components/BugRegistration';
import Dashboard from './Dashboard';
import Team from './components/Team';
import ProjectAssign from './components/ProjectAssign'
import BugReport from './components/BugReport'
import BugTracking from './components/BugTracking';
import TesterBugPortal from './components/TesterBugPortal';
import DevBugPortal from './components/DevBugPortal';
import UserProject from './components/UserProject';
import NoteState from '../src/Context/NoteState'

function App() {

  return (
    <>
    <NoteState >
    <BrowserRouter>
    <Dashboard/>
      <Routes>
      <Route path="/" element={<AppInfo />} />
      {/* {localStorage.user ? <Route path="/" element={<Welcome />} /> : <Route path="/" element={<AppInfo />} /> } */}
      <Route path="/Login" element={<Login />} />
      <Route path="/AppInfo" element={<AppInfo />} />
      {/* {localStorage.user ? <Route path="/Welcome" element={<Welcome />} /> : <Route path="/AppInfo" element={<AppInfo />} /> } */}
      <Route path="/Welcome" element={<Welcome />} />
      <Route path="/Employee" element={<Employee />} />
      <Route path="/Project" element={<Project />} />
      <Route path="/BugReg" element={<BugRegistration/>}/>
      <Route path="/BugReport" element={<BugReport/>}/>
      <Route path="/Team" element={<Team/>}/>
      <Route path="/ProjectAssign" element={<ProjectAssign/>}/>
      <Route path="/BugReport" element={<BugReport/>}/>
      <Route path='/BugTracking' element={<BugTracking/>}/>
      <Route path='/TesterBugPortal' element={<TesterBugPortal/>}/>
      <Route path='/DevBugPortal' element={<DevBugPortal/>}/>
      <Route path='/UserProject' element={<UserProject/>}/>
      {/* <Route path='/BugRegistrationForm' element={<BugRegistrationForm/>}/> */}
      
      </Routes>
    </BrowserRouter>
    </NoteState >
    </>
  );
}

export default App;
