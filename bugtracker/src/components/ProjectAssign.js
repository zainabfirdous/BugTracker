import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import NoteContext from '../Context/NoteContext';

export default function ProjectAssign() {
  
  const contextdata = useContext(NoteContext);
  //  console.log("contextdata : ",contextdata);
  axios.defaults.headers.common['Authorization'] = contextdata.token;

  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [message, setSetMessage] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [bgcolor, setBgColor] = useState("");

  const [assignID, setAssignID] = useState("");
  const [projID, setProjID] = useState("");
  const [teamID, setTeamID] = useState("");
  const [empID, setEmpID] = useState("");
  const [isUpdateButton, setIsUpdateButton] = useState(false);

  const [projList, setProjList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [empList, setEmpList] = useState([]);
  const [assignProjList, setAssignProjList] = useState([]);

  useEffect(() => {
    const token = contextdata.token;
    if (token===null) navigate("/", { replace: true });
    getSelectData();
  }, [navigate,contextdata]);

  const handleUpdateProject = async (aplItem) => {

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setIsUpdateButton(true);
    setAssignID(aplItem.assignID);
    setProjID(aplItem.projID);
    setTeamID(aplItem.teamID);
    setEmpID(aplItem.empID);

  }

  const getSelectData = async () => {
    try{
      const resp1 = await axios.get("/admin/getProjects");
      const resp2 = await axios.get("/admin/getteams");
      const resp3 = await axios.get("/admin/getEmployees");
      const resp4 = await axios.get("/admin/projectAssign");
     // console.log("resp1 L ",resp1);
      setProjList(resp1.data);
      setTeamList(resp2.data);
      setEmpList(resp3.data);
      setAssignProjList(resp4.data);
    }
    catch(e){
      console.log(e.message);
    }
  }

  const handlesubmit = (e) => {
    e.preventDefault();

    const projAssign = {
      projID: projID,
      teamID: teamID,
      empID: empID,
    };
    isUpdateButton ?
      updateProjAssign(projAssign) :
      addProjAssign(projAssign)
      ;
  };

  const handleDelete = async (assignID) => {
    try{
      const response = await axios.delete(
        `/admin/deleteprojAssign/${assignID}`
      );
      if(response){
        setShow(true)
      setIsAlertVisible(true);
      setShow(true);
      setBgColor("bg-warning");
      setSetMessage("Project Assignment Deleted Successfully");
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 5000);
      getSelectData();
      }
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

  const updateProjAssign = async (projectAssign) => {
    const data = { ...projectAssign };
    data.assignID = assignID;
    try{
      const response = await axios.put(
        "/admin/updateProjAssign",
        data
      );
      if(response){
        getSelectData();
        resetForm();
        setShow(true)
        setIsAlertVisible(true);
        setShow(true);
        setBgColor("bg-warning");
        setSetMessage("Assignment Updated Successfully");
        setTimeout(() => {
          setIsAlertVisible(false);
        }, 5000);
        setIsUpdateButton(false);
      }

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

  const addProjAssign = async (projAssign) => {
    console.log(projAssign);
    try{
      const response = await axios.post(
        "/admin/newPorjectAssign",
        projAssign
      );
      if(response){
        getSelectData();
        resetForm();
        setShow(true)
        setIsAlertVisible(true);
        setShow(true);
        setBgColor("bg-warning");
        setSetMessage("Project Assigned Successfully");
        setTimeout(() => {
          setIsAlertVisible(false);
        }, 5000);
      }
    }
    catch(e){
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

  const resetForm = () => {
    setProjID("");
    setTeamID("");
    setEmpID("");
  };

  const handleInput = (e) => {
    switch (e.target.id) {
      case "projID":
        setProjID(e.target.value);
        break;
      case "teamID":
        setTeamID(e.target.value);
        break;
      case "empID":
        setEmpID(e.target.value);
        break;
      default: break;
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
        </Modal>}
      </div>

      {/* Main Body */}

      <div
        className="container"
      >
        <form className="row mt-4">
          <div className="form-group col-sm-12 col-md-4">
            <label htmlFor="projID">Project Id: </label>
            <select id="projID" value={projID} className="form-control form-select" variant="info" aria-label="Default select example" onChange={handleInput}>
              <option id="projID" selected>Select</option>
              {projList.map((projItem) => {
                return (
                  <option value={projItem.projID} key={projItem.projID}>{projItem.projID} {projItem.projName}</option>
                );
              })}
            </select>
          </div>
          <div className="form-group col-sm-12 col-md-4">
            <label htmlFor="teamID">Team : </label>
            {/* <input
                            className="form-control"
                            type="text"
                            id="teamID"
                            value={teamID}
                            onChange={handleInput}
                        /> */}
            <select id="teamID" value={teamID} className="form-control form-select" variant="info" aria-label="Default select example" onChange={handleInput}>
              <option id="teamID" selected>Select</option>
              {teamList.map((teamItem) => {
                return (
                  <option value={teamItem.teamID} key={teamItem.teamID}>{teamItem.teamID} {teamItem.teamName}</option>
                );
              })}
            </select>
          </div>
          <div className="form-group col-sm-12 col-md-4">
            <label htmlFor="startDate">Employee : </label>
            {/* <input
                            className="form-control"
                            type="empID"
                            id="empID"
                            value={empID}
                            onChange={handleInput}
                        /> */}
            <select id="empID" value={empID} className="form-control form-select" variant="info" aria-label="Default select example" onChange={handleInput}>
              <option id="empID" selected>Select</option>
              {empList.map((empItem) => {
                return (
                  <option value={empItem.empID} key={empItem.empID}>{empItem.empID} {empItem.fName}</option>
                );
              })}
            </select>
          </div>
          <div className="form-group col-sm-12 col-md-4 d-flex align-items-end">
            <button type="button" className={isUpdateButton ? "btn btn-warning text-center" : "btn btn-success text-center"} onClick={handlesubmit}>
              {isUpdateButton ? "Update Project" : "Add Project"}
            </button>
          </div>
        </form>
      </div>

      <div
        className="container"
      >
        <div class="table-responsive">
          <table className="table table-striped table-bordered table-hover mt-4">
            <thead>
              <tr>
                <th>Id</th>
                <th>Project</th>
                <th>Team</th>
                <th>Employee</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {assignProjList.map((aplItem) => {
                let uid = contextdata.uid
                let uid2 = parseInt(aplItem.empID);
                const urole = contextdata.urole;
                //  console.log("uid2:", uid2);
                //  console.log("uid:", uid);
                // console.log("Comparison:", uid2 === uid);
                if (urole === "Admin" || uid2 === uid) {

                  return (
                    <tr key={aplItem.assignID}>
                      <td>{aplItem.assignID}</td>
                      {/* <td>{aplItem.projID}</td> */}
                      {projList.map((projItem) => {
                        if (projItem.projID === aplItem.projID) {
                          return (
                            <td key={aplItem.projID}>{projItem.projID} {projItem.projName}</td>
                          );
                        }
                        return null; // or return <td key={roleItem.roleID}></td>;
                      })}
                      {teamList.map((teamItem) => {
                        if (teamItem.teamID === aplItem.teamID) {
                          return (
                            <td key={aplItem.teamID}>{teamItem.teamID} {teamItem.teamName}</td>
                          );
                        }
                        return null; // or return <td key={roleItem.roleID}></td>;
                      })}
                      {empList.map((empItem) => {
                        if (empItem.empID === aplItem.empID) {
                          return (
                            <td key={aplItem.empID}>{empItem.empID} {empItem.fName}</td>
                          );
                        }
                        return null; // or return <td key={roleItem.roleID}></td>;
                      })}
                      {/* <td>{aplItem.teamID}</td>
                  <td>{aplItem.empID}</td> */}

                      <td>
                        <div className='row'>
                          <div className='col-sm-12 col-lg-6'>
                            <button type="button"
                              className="btn btn-warning m-1 text-center"
                              style={{ marginRight: "5px" }}
                              onClick={() => handleUpdateProject(aplItem)}
                            >
                              Update
                            </button>
                          </div>
                          <div className='col-sm-12 col-lg-6'>
                            <button type="button"
                              className="btn btn-danger m-1 text-center"
                              onClick={() => handleDelete(aplItem.assignID)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>

                  );
                } return null;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>


  )
}
