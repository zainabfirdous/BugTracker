import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import NoteContext from '../Context/NoteContext';



export default function UserProject() {

  const contextdata = useContext(NoteContext);
  axios.defaults.headers.common['Authorization'] = contextdata.token;

  axios.defaults.withCredentials = true;
  const [message, setSetMessage] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    const token = contextdata.token;
    if (token === null) navigate("/", { replace: true });
    getProject(contextdata);
  }, [navigate, contextdata]);

  const getProject = async (contextdata) => {
    try {
      const response = await axios.get(`/${contextdata.urole === "Developer" ? "dev/devprojects" : "tester/testerprojects"}`);
      setProjectList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTeamMemInProject = async (projID) => {
    try {
      const response = await axios.get(
        `/dev/projTeam/${projID}/${localStorage.getItem("uid")}`
      );
      if (response) {
        setIsAlertVisible(true);
        setShow(true);
        setSetMessage(`Project Data Fetched successfully`);
        setTimeout(() => {
          setIsAlertVisible(false);
        }, 5000);
      }
    }
    catch (e) {
      setIsAlertVisible(true);
      setShow(true);
      setSetMessage(e.response.data.error);
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 5000);
    }
  };

  const handleTeamMemWithID = async (projID) => {
    try {
      const empTeamMem = await axios.get(
        `/dev/teammembers/${projID}/${localStorage.getItem("uid")}`
      );
      if (empTeamMem) {
        setIsAlertVisible(true);
        setShow(true);
        setSetMessage(`Team Data Fetched successfully`);
        setTimeout(() => {
          setIsAlertVisible(false);
        }, 5000);
      }
    } catch (e) {
      setIsAlertVisible(true);
      setShow(true);
      setSetMessage(e.response.data.error);
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
            <h5>{contextdata.token}</h5>
            <h5>{contextdata.urole}</h5>
            <h5>{contextdata.uid}</h5>
            <h5>{contextdata.user}</h5>
            <table className="table table-striped table-bordered table-hover mt-4">
              <thead>
                <tr><th style={{ textAlign: 'center', backgroundColor: 'honeydew' }} colspan="6">Projects</th></tr>
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
                          <div className='col-sm-12 col-lg-6'>
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

    </>

  )
}
