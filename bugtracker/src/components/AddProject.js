import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import NoteContext from '../Context/NoteContext';

export default function AddProject(props) {

  const contextdata = useContext(NoteContext);
  //  console.log("contextdata : ",contextdata);
  axios.defaults.headers.common['Authorization'] = contextdata.token;
  axios.defaults.withCredentials = true;

  const [message, setSetMessage] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [bgcolor, setBgColor] = useState("");

  const [projID, setProjID] = useState();
  const [projName, setProjName] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [status, setStatus] = useState();

  const [isUpdateButton, setIsUpdateButton] = useState(false);

  useEffect(() => {
    if (props.project.projID) {
      setProjID(props.project.projID);
      setProjName(props.project.projName);
      setStartDate(props.project.startDate);
      setEndDate(props.project.endDate);
      setStatus(props.project.status);
      setIsUpdateButton(true);
    } else setIsUpdateButton(false);
  }, [props]);

  const resetForm = () => {
    setProjID("");
    setProjName("");
    setStartDate("");
    setEndDate("");
    setStatus("");
    setIsUpdateButton(false);
  };

  const alertShow = (msg) =>{
    setShow(true)
        setIsAlertVisible(true);
        setBgColor("bg-info");
        setSetMessage(msg);
        setTimeout(() => {
          setIsAlertVisible(false);
        }, 5000);
  }

  const handleInput = (e) => {
    switch (e.target.id) {
      case "projID":
        setProjID(e.target.value);
        break;
      case "projName":
        setProjName(e.target.value);
        break;
      case "startDate":
        setStartDate(e.target.value);
        break;
      case "endDate":
        if(startDate <= e.target.value ){
          setEndDate(e.target.value);
          break;
        }
        else{
          alertShow("End Date must be Future date than Start Date!");
        break;
        }
      case "status":
        setStatus(e.target.value);
        break;
      default: break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const object = {
      projID: projID,
      projName: projName,
      startDate: startDate,
      endDate: endDate,
      status: status,
    };

   // console.log(object);
    if (isUpdateButton) {
      updateProject(object);
    } else {
      addProject(object);
    }
  };

  const updateProject = async () => {
    const updatedData = {
      projID: projID,
      projName: projName,
      startDate: startDate,
      endDate: endDate,
      status: status,
    };
    try {
      const udpatedRecord = await axios.put(
        "/admin/updateProject",
        updatedData
      );
      props.updateProjectList();
      resetForm();
      if (udpatedRecord) {
        alertShow("Project updated successfully!");
      }
    } catch (e) {
      alertShow(e.response.data.error);
    }
  };

  const addProject = async (project) => {
 //   console.log(project);
    try {
      const response = await axios.post(
        "/admin/newProject",
        project
      );
     if(response){
      props.updateProjectList();
      resetForm();
      alertShow("Project Added");
     }
    }
    catch (e) {
      alertShow(e.response.data.error);
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


      <form className="row mt-4" onSubmit={handleSubmit}>
        {
          isUpdateButton ?
            <div className="form-group col-sm-12 col-md-4">

              <label htmlFor="projID">Project Id: </label>
              <input
                className="form-control"
                type="text"
                id="projID"
                value={projID}
                readonly
              />
            </div>
            :
            <div></div>}
        <div className="form-group col-sm-12 col-md-4">
          <label htmlFor="projName">Name: </label>
          <input
            className="form-control"
            type="text"
            id="projName"
            value={projName}
            onChange={handleInput}
            required
          />
        </div>
        <div className="form-group col-sm-12 col-md-4">
          <label htmlFor="startDate">Start : </label>
          {
            isUpdateButton ?
              <input
                className="form-control"
                type="date"
                id="startDate"
                value={startDate}
                onChange={handleInput}
                readOnly
              />
              :
              <input
                className="form-control"
                type="date"
                id="startDate"
                value={startDate}
                onChange={handleInput}
                required
              />
          }

        </div>
        <div className="form-group col-sm-12 col-md-4">
          <label htmlFor="endDate">End : </label>
          <input
            className="form-control"
            type="date"
            id="endDate"
            value={endDate}
            onChange={handleInput}
            required
          />
        </div>
        <div className="form-group col-sm-12 col-md-4 ">
          <label htmlFor="endDate">Status </label>
          <select class="form-control" value={status} id="status" aria-label="Default select example" onChange={handleInput} required>
            <option selected >Select</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="form-group col-sm-12 col-md-4 d-flex align-items-end">
          <button type="submit" className={isUpdateButton ? "btn btn-warning text-center" : "btn btn-success text-center"} >
            {isUpdateButton ? "Update Project" : "Add Project"}
          </button>
        </div>
      </form>

    </>
  )
}
