import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styles from "../UserProfile.css";


export default function UserProject() {

     //axios.defaults.withCredentials = true;
  const [message, setSetMessage] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [ isAlertVisible, setIsAlertVisible ] = useState(false);
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState([]);

  const getProject = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/${localStorage.getItem("urole")==="Developer" ? "dev" : "tester"}/${localStorage.getItem("urole")==="Developer" ? "devprojects" : "testerprojects"}/${localStorage.getItem("uid")}`);
      setProjectList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTeamMemInProject = async (projID) => {
    const projectteamMem = await axios.get(
      `http://127.0.0.1:5000/dev/projTeam/${projID}/${localStorage.getItem("uid")}`
    );
    if(projectteamMem.data.error){
      setIsAlertVisible(true);
      setShow(true);
        setSetMessage(`${projectteamMem.data.error}`);
        setTimeout(() => {
            setIsAlertVisible(false);
        }, 5000);
    }
    else{
      setIsAlertVisible(true);
      setShow(true);
        setSetMessage(`Project Data Fetched successfully`);
        setTimeout(() => {
            setIsAlertVisible(false);
        }, 5000);
    }
  };

  const handleTeamMemWithID = async (projID) => {
    
    const empTeamMem = await axios.get(
        `http://127.0.0.1:5000/dev/teammembers/${projID}/${localStorage.getItem("uid")}`
      );
      if(empTeamMem.data.error){
        setIsAlertVisible(true);
        setShow(true);
          setSetMessage(`${empTeamMem.data.error}`);
          setTimeout(() => {
              setIsAlertVisible(false);
          }, 5000);
      }
      else{
        setIsAlertVisible(true);
        setShow(true);
          setSetMessage(`Team Data Fetched successfully`);
          setTimeout(() => {
              setIsAlertVisible(false);
          }, 5000);
      }

  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/", { replace: true });

    getProject();
  }, [navigate]);

  const [activeTab, setActiveTab] = useState('profile');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
   
    <>
    
    {/* Alert Message */}
    <div className="App">
          {isAlertVisible && <Modal show={show} onHide={handleClose}>
       <Modal.Header className="bg-white">
         <Modal.Title></Modal.Title>
       </Modal.Header>
       <Modal.Body className="bg-white" >{message}</Modal.Body>
       <Modal.Footer className="bg-dark" >
         <Button variant="warning" className='h-1' onClick={handleClose}>
           Close
         </Button>
       </Modal.Footer>
     </Modal>}   
   </div>

    {/* Main Body */}
   <div
     className="container"
   >
      <div className="container">
       <div class="table-responsive">
       <table className="table table-striped table-bordered table-hover mt-4">
         <thead>
         <tr><th style={{textAlign:'center',backgroundColor:'honeydew'}} colspan="6">Projects</th></tr>
           <tr>
             <th>Project Id</th>
             <th>Name</th>
             <th>Start</th>
             <th>End</th>
             <th>Status</th>
             <th>Action</th>
           </tr>
         </thead>
         <tbody>
           {projectList.map((projItem) => {
             return (
               <tr key={projItem.projID}>
                 <td>{projItem.projID}</td>
                 <td>{projItem.projName}</td>
                 <td>{projItem.startDate}</td>
                 <td>{projItem.endDate}</td>
                 <td>{projItem.status}</td>
                 <td>
                   <div className='row'>
                   <div className='col-sm-12 col-lg-6'>
                   <button type="button"
                     className="btn btn-warning m-1 text-center"
                     style={{ marginRight: "5px" }}
                     onClick={() => handleTeamMemWithID(projItem.projID)}
                   >
                     Bugs
                   </button>
                   </div>
                   <div   className='col-sm-12 col-lg-6'>
                   <button type="button"
                     className="btn btn-danger m-1 text-center"
                     onClick={() => handleTeamMemInProject(projItem.projID)}
                   >
                     Team
                   </button>
                   </div>
                 </div>
                 </td>
               </tr>
             );
           })}
         </tbody>
       </table>
       </div>
     </div>
   </div>

   <div className={styles['user-profile']}>
      <div className={styles.sidebar}>
        <ul>
          <li className={activeTab === 'profile' ? styles.active : ''} onClick={() => handleTabChange('profile')}>
            Profile
          </li>
          <li className={activeTab === 'project' ? styles.active : ''} onClick={() => handleTabChange('project')}>
            Project
          </li>
          <li className={activeTab === 'team' ? styles.active : ''} onClick={() => handleTabChange('team')}>
            Team
          </li>
          <li className={activeTab === 'setting' ? styles.active : ''} onClick={() => handleTabChange('setting')}>
            Setting
          </li>
        </ul>
      </div>

      <div className={styles.content}>
        {/* Content components go here */}
      </div>
    </div>
   </>

  )
}
