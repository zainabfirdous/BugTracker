import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ReactModal from 'react-modal'; 
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import NoteContext from '../Context/NoteContext';
import './Profile.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function MyAccount() {
  const [data, setData] = useState([])
  const [teamMembers, setTeamMembers] = useState([]);
  const [isReactModalOpen, setIsReactModalOpen] = useState(false);

  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [message, setSetMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [bgcolor, setBgColor] = useState("");

  const contextdata = useContext(NoteContext);
  axios.defaults.headers.common['Authorization'] = contextdata.token;
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  useEffect(()=>{
    const token = contextdata.token;
    if (token === null) navigate("/", { replace: true });
    fetchData(contextdata);
}, [navigate, contextdata]);
  
    const fetchData = async(contextdata)=>{
        try{
            const response = await axios.get(`/${contextdata.urole === "Developer" ? "dev" : "tester"}/myprojects`);
            setData(response.data)
        }catch(e){
            setShow(true)
            setIsAlertVisible(true);
            setShow(true);
            setBgColor("bg-warning");
            setSetMessage(e.response.data.error);
            setTimeout(() => {
              setIsAlertVisible(false);
            }, 5000);
          }
    }



  const fetchTeamMembers = async (projID) => {
    try {
        const response = await axios.get(`/${contextdata.urole === "Developer" ? "dev" : "tester"}/projTeam/${projID}`);
        console.log(response.data)
        setTeamMembers(response.data);
        return response.data;
    }catch(e){
        setShow(true)
        setIsAlertVisible(true);
        setShow(true);
        setBgColor("bg-warning");
        setSetMessage(e.response.data.error);
        setTimeout(() => {
          setIsAlertVisible(false);
        }, 5000);
      }
};

const handleClick = async (teamID) => {
  const members = await fetchTeamMembers(teamID);
  if (members) {
      setIsReactModalOpen(true);
  }else{
        setShow(true)
        setIsAlertVisible(true);
        setShow(true);
        setBgColor("bg-warning");
        setSetMessage("No team members found");
        setTimeout(() => {
          setIsAlertVisible(false);
        }, 5000);
      
  }
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
      <Modal.Footer className={bgcolor} >
        <Button variant="warning" className='h-1' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>}</div>
   
    <div className="container profile-con text-center mt-3">
        <div className = "row profile-row">
            <div className="col">
            <h2 className="heading">My Projects</h2>
            <div class="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th >Project ID</th>
                            <th >Project Name</th>
                            <th >Project status</th>
                            <th >Start Date</th>
                            <th >End Date</th>
                        </tr>

                     </thead>
                    <tbody> 
                        {data.map((dataItem) => {
                        return (
                            <tr key={dataItem.projID}>
                            <td>{dataItem.projID}</td>
                            <td>{dataItem.projName}</td>
                            <td>{dataItem.status}</td>
                            <td>{dataItem.startDate}</td>
                            <td>{dataItem.endDate}</td>
                            <td> <button className='btn btn-dark' onClick={() => handleClick(dataItem.projID)}>Team Members</button></td>
                        </tr>
                  );
                
            })}
                 </tbody>

                </table>
                </div>
            <ReactModal
                isOpen={isReactModalOpen}
                onRequestClose={() => setIsReactModalOpen(false)}
                contentLabel="Team Members Modal"
                overlayClassName="modal-overlay"
                className="modal-content react-modal"
            >
                <h2 className='heading-modal'>Team Members</h2>
                <div class="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Team Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                        {teamMembers.map((member) => (
                            <tr key={member.empID}>
                                <td>{member.empID}</td>
                                <td>{member.fName}&nbsp;&nbsp;{member.lName}</td>
                                <td>{member.email}</td>
                                <td>{member.teamName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                <button  id="bt1" className='btn btn-dark' onClick={() => setIsReactModalOpen(false)}>Close</button> {/* Close button */}
                
                </ReactModal>
    </div>
    </div>
   
    </div>
    </>
  )
}


