import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal'; 
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import NoteContext from '../Context/NoteContext';
import './Profile.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function EmpTeam() {
    const [team, setTeam] = useState([])
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
              const response = await axios.get(`/${contextdata.urole === "Developer" ? "dev" : "tester"}/team`);
              console.log(response.data);
              setTeam(response.data)
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
  
  

    const fetchTeamMembers = async (teamID) => {
        try {
            const response = await axios.get(`/${contextdata.urole === "Developer" ? "dev" : "tester"}/teammembers/${teamID}`);
            console.log(response.data)
            setTeamMembers(response.data);
            return response.data;
        } catch(e){
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
      <div classNamw="col">
      <h2 className="heading">My Teams</h2>
      <table className="table table-striped">
          <thead>
              <tr>
                  <th >Team ID</th>
                  <th >Team Name</th>
                  <th >Project Name</th>
              </tr>
  
          </thead>
          <tbody> 
              {team.map((dataItem) => {
                return (
                  <tr key={dataItem.teamID}>
                    <td>{dataItem.teamID}</td>
                    <td>{dataItem.teamName}</td>
                    <td>{dataItem.projName}</td>
                    <td> <button className='btn btn-dark' onClick={() => handleClick(dataItem.teamID)}>Team Members </button></td>
                    </tr>
                    );
                  
              })}
          </tbody>
  
      </table>
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
                        </tr>
                    </thead>
                    <tbody>
                    
                        {teamMembers.map((member) => (
                            <tr key={member.empID}>
                                <td>{member.empID}</td>
                                <td>{member.fName}&nbsp;&nbsp;{member.lName}</td>
                                <td>{member.email}</td>
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
