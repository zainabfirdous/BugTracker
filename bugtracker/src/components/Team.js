import React from 'react'
import AddTeam from './AddTeam';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import NoteContext from '../Context/NoteContext';


export default function Team() {

  const contextdata = useContext(NoteContext);
  axios.defaults.headers.common['Authorization'] = contextdata.token;

  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [message, setSetMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [bgcolor, setBgColor] = useState("");
  const [teamList, setTeamList] = useState([]);
  const [projlist, setProjList] = useState([]);
  const [admlist, setAdmlist] = useState([]);

  const [updateTeam, setUpdateTeam] = useState({});

  useEffect(() => {
    const token = contextdata.token;
    if (token === null) navigate("/", { replace: true });
    getData();
  }, [navigate, contextdata]);

  const handleUpdateTeam = (team) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setUpdateTeam(team);
  }

  const getData = async () => {
    try {
      const response = await axios.get("/admin/getteams");
      setTeamList(response.data);
      const resp1 = await axios.get("/admin/getProjects");
      setProjList(resp1.data);
      const resp2 = await axios.get("/admin/adminDashboard");
      setAdmlist(resp2.data);

    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (teamID) => {
    try {
      const response = await axios.delete(
        `/admin/deleteteam/${teamID}`
      );
      if(response){
        setShow(true)
      setIsAlertVisible(true);
      setShow(true);
      setBgColor("bg-warning");
      setSetMessage("Team Deleted Successfully");
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 5000);
      getData();
      }
    } catch (e) {
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
        <div className="container">
          <AddTeam
            updateTeamList={() => {
              getData();
              setUpdateTeam({});
            }}
            team={updateTeam}
          />
          <div class="table-responsive">
            <table className="table table-striped table-bordered table-hover mt-4">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Team Name</th>
                  <th>Project ID</th>
                  <th>Project Name</th>
                  <th>Admin</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {teamList.map((teamItem) => {
                  return (
                    <tr key={teamItem.teamID}>
                      <td>{teamItem.teamID}</td>
                      <td>{teamItem.teamName}</td>
                      <td>{teamItem.projID}</td>
                      {projlist.map((projItem) => {
                        if (teamItem.projID === projItem.projID) {
                          return (
                            <td key={teamItem.projID}>{projItem.projName}</td>
                          );
                        }
                        return null;
                      })}
                      {/* <td>{teamItem.projID}</td> */}
                      {admlist.map((admItem) => {
                        if (teamItem.admID === admItem.admID) {
                          return (
                            <td key={teamItem.admID}>{admItem.fName}</td>
                          );
                        }
                        return null;
                      })}
                      {/* <td>{teamItem.admID}</td> */}
                      <td>
                        <div className='row'>
                          <div className='col-sm-12 col-lg-6'>
                            <button type="button"
                              className="btn btn-warning m-1 text-center"
                              style={{ marginRight: "5px" }}
                              onClick={() => handleUpdateTeam(teamItem)}
                            >
                              Update
                            </button>
                          </div>
                          <div className='col-sm-12 col-lg-6'>
                            <button type="button"
                              className="btn btn-danger m-1 text-center"
                              onClick={() => handleDelete(teamItem.teamID)}
                            >
                              Delete
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
