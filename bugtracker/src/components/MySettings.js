import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import NoteContext from '../Context/NoteContext';
import './Profile.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function MySettings() {

    const contextdata = useContext(NoteContext);
    
    axios.defaults.headers.common['Authorization'] = contextdata.token;
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const[empData, setempData] = useState({
        'empID':'',
        'fName':' ',
        'lName':'',
        'email':'',
        'roleID':''
    })
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [message, setSetMessage] = useState("");
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    //const [bgcolor, setBgColor] = useState("");


    const handleInput = (e) => {
        switch (e.target.id) {
          case "op":
            setOldPassword(e.target.value);
            break;
          case "np":
            setNewPassword1(e.target.value);
            break;
          case "np2":
            setNewPassword2(e.target.value);
            break;
          default:
            break;
        }
      }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(newPassword1 !== newPassword2){
            setShow(true)
            setIsAlertVisible(true);
            setShow(true);
            //setBgColor("bg-warning");
            setSetMessage(`${e.response.data.error}`);
            setTimeout(() => {
             setIsAlertVisible(false);
             }, 5000);
        }else{
            const body = {
                Newpassword: newPassword1,
                Oldpassword: oldPassword
              }
            try{
                const response = await axios.put(`/${contextdata.urole === "Developer" ? "dev" : "tester"}/updatePassword`, body);
                if (response) {
                    setShow(true)
                    setIsAlertVisible(true);
                    setShow(true);
                    //setBgColor("bg-info");
                    setSetMessage("Password updated successfully");
                    setTimeout(() => {
                      setIsAlertVisible(false);
                     
                    }, 5000);
                    resetForm();
                }

            }catch (e) {
                setShow(true)
                setIsAlertVisible(true);
                setShow(true);
                //setBgColor("bg-warning");
                setSetMessage(`${e.response.data.error}`);
                setTimeout(() => {
                 setIsAlertVisible(false);
                 }, 5000);
            }
    }}

    const resetForm = () => {
      setOldPassword("");
      setNewPassword1("");
      setNewPassword2("");
    };

    useEffect(()=>{
        const token = contextdata.token;
        if (token === null) navigate("/", { replace: true });
        user(contextdata);
  }, [navigate, contextdata]);
        
    const user = async(contextdata)=>{
            try{
                const resp = await axios.get(`/${contextdata.urole === "Admin" ? "admin/adminDashboardbyID" : contextdata.urole === "Developer" ? "dev/devDashboard" : "tester/testerDashboard"}`)
                console.log(resp.data)
                setempData(resp.data)
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }

        



  return (
<>
    {/* Alert Message */}
    <div className="App" >
    {isAlertVisible && <Modal style={{alignContent:'end'}} show={show}  onHide={handleClose}>
      <Modal.Header className="bg-white">
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-white" >{message}</Modal.Body>
      <Modal.Footer >
        <Button variant="warning" className='h-1' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>}
  </div>


    <div className='container profile-con text-center mt-3'>
        <div className='row profile-row'>
            <div className='col '>
            <h2 className="heading">My Account</h2>
            {contextdata.urole !== 'Admin' && ( 
            <form className='formdiv'>
                <div className="form-group accform">
                    <label for="empID">Employee ID</label>
                    <input type="text" className="form-control accformcontrol" id="empID" value={empData.empID} readOnly/>
                </div>
                <div className="form-group accform">
                    <label for="name">Name</label>
                    <input type="text" className="form-control accformcontrol" id="name" value={`${empData.fName} ${empData.lName}`} readOnly />
                </div>
                <div className="form-group accform">
                    <label for="email">Email</label>
                    <input type="email" className="form-control accformcontrol" id="email" value={empData.email} readOnly/>
                </div>
                <div className="form-group accform">
                    <label for="role">Role</label>
                    <input type="text" className="form-control accformcontrol" id="role" value={contextdata.urole} readOnly/>
                </div>
                <div className="form-group accform">
                    <label for="Oldpassword">Old Password</label>
                    <input type="password" className="form-control accformcontrol" id="op" placeholder='password' value={oldPassword} onChange={handleInput} required/>
                </div>
                <div className="form-group accform">
                    <label for="Newpassword">New Password</label>
                    <input type="password" className="form-control accformcontrol" id="np" placeholder='New password' value={newPassword1} onChange={handleInput}/>
                </div>
                <div className="form-group accform">
                    <label for="Newpassword">Confirm Password</label>
                    <input type="password" className="form-control accformcontrol" id="np2" placeholder='New password' value={newPassword2} onChange={handleInput}/>
                </div><br></br>
                <div className="form-group accform">
                <button type="submit" className="btn btn-dark custom-btn" onClick={handleSubmit}>Update Password</button>
                </div>
                </form>
                
 )}
                {contextdata.urole === 'Admin' && (
                  <form className='formdiv'>
                  <div className="form-group accform">
                      <label for="empID">Employee ID</label>
                      <input type="text" className="form-control accformcontrol" id="empid" value={empData.admID} readOnly/>
                  </div>
                  <div className="form-group accform">
                      <label for="name">Name</label>
                      <input type="text" className="form-control accformcontrol" id="name" value={`${empData.fName} ${empData.lName}`} readOnly />
                  </div>
                  <div className="form-group accform">
                      <label for="name">Email</label>
                      <input type="email" className="form-control accformcontrol" id="email" value={empData.email} readOnly/>
                  </div>
                  <div className="form-group accform">
                      <label for="name">Role</label>
                      <input type="text" className="form-control accformcontrol" id="role" value={contextdata.urole} readOnly/>
                  </div>
                  </form>
                )}
               
            </div>
            </div>

        </div>
    </>
  )
}
