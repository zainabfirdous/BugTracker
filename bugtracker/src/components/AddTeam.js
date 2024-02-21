import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { useContext } from 'react';
import NoteContext from '../Context/NoteContext';

export default function AddTeam(props) {


  const contextdata = useContext(NoteContext);
  //  console.log("contextdata : ",contextdata);
  axios.defaults.headers.common['Authorization'] = contextdata.token;

  axios.defaults.withCredentials = true;
  const [isUpdateButton, setIsUpdateButton] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [message, setSetMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [bgcolor, setBgColor] = useState("");

  const [teamID, setTeamID] = useState();
  const [teamName, setTeamName] = useState();
  const [projID, setProjID] = useState();
  const [projlist, setProjList] = useState([]);

  const getProj = async () => {
    try{
    const resp = await axios.get("/admin/getProjects");
    setProjList(resp.data);
    }catch(e){
      console.log("Error Team Add : ",e)
    }
  }

  useEffect(() => {
    if (props.team.teamID) {
      setTeamID(props.team.teamID);
      setTeamName(props.team.teamName);
      setProjID(props.team.projID);
      setIsUpdateButton(true);
    } else setIsUpdateButton(false);
    getProj();
  }, [props]);

  const handlesubmit = (e) => {
    e.preventDefault();

    const team = {
      teamID: teamID,
      teamName: teamName,
      projID: projID,
      admID: contextdata.uid
    };
    isUpdateButton ? updateTeam(team) : addTeam(team);
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

  const addTeam = async (team) => {
  //  console.log(team);
    try {
      const response = await axios.post(
        "/admin/newTeam",
        team
      );
      if (response) {
        resetForm();
        props.updateTeamList();
        alertShow("Team Registered Successfully");
        getProj();
      }
    } catch (e) {
      alertShow(e.response.data.error);
    }
  }

  const updateTeam = async (team) => {
  //  console.log(team);
    try {
      const response = await axios.put(
        "/admin/updateTeam",
        team
      );
      if (response) {
        resetForm();
        props.updateTeamList();
        alertShow("Team Updated Successfully");
        getProj();
      }
    } catch (e) {
      alertShow(e.response.data.error);
    }
  }

  const resetForm = () => {
    setTeamName("");
    setProjID("");
  };

  const handleInput = (e) => {
    switch (e.target.id) {
      case "teamName":
        setTeamName(e.target.value);
        break;
      case "projID":
        setProjID(e.target.value);
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

      <form className="row mt-4"  onSubmit={handlesubmit}>

        <div className="form-group col-sm-12 col-md-4">
          <label htmlFor="teamName">Name: </label>
          <input
            className="form-control"
            type="text"
            id="teamName"
            value={teamName}
            onChange={handleInput}
            required
          />
        </div>

        <div className="form-group col-sm-12 col-md-4">
          <label htmlFor="projID">Project : </label>

          <select id="projID" value={projID} className="form-control form-select" variant="info" aria-label="Default select example" onChange={handleInput}>
            <option id="projID" selected>Select</option>
            {projlist.map((projItem) => {
              return (
                <option value={projItem.projID} key={projItem.projID}>{projItem.projID} {projItem.projName}</option>
              );
            })}
          </select>
        </div>

        <div className="form-group col-sm-12 col-md-4 d-flex align-items-end">
          <button type="submit" className={isUpdateButton ? "btn btn-warning text-center" : "btn btn-success text-center"}
           
          >
            {isUpdateButton ? "Update" : "Add Team"}
          </button>
        </div>
      </form>


    </>
  )
}
