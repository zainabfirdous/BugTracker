import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "../BugRegistration.css";
import { useContext } from 'react';
import NoteContext from '../Context/NoteContext';

function BugRegistration() {

  const contextdata = useContext(NoteContext);
  //  console.log("contextdata : ",contextdata);
  axios.defaults.headers.common['Authorization'] = contextdata.token;

  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [message, setSetMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [bgcolor, setBgColor] = useState("");

  const [bugID, setbugID] = useState();
  const [bugName, setbugName] = useState();
  const [priority, setpriority] = useState();
  const [bugDesc, setbugDesc] = useState();
  const [projID, setprojID] = useState();
  const [projlist, setProjList] = useState([]);
  const [bugList, setBugList] = useState([]);
  const [priorityBGColor, setPriorityBGColor] = useState("");

  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const token = contextdata.token;
    if (token===null) navigate("/", { replace: true });
    getBug(contextdata);

  }, [navigate,contextdata]);

  const getBug = async (contextdata) => {
    try {
      console.log("Get Call");
      const response = await axios.get(`${contextdata.urole==="Admin" ? "/admin/getbugs" : "tester/getbugs"}`);
      // console.log("Bugs : ",response.data);
      setBugList(response.data);
      const resp = await axios.get(`${contextdata.urole==="Admin" ? "/admin/getProjects" : "tester/getProjects"}`);
     // console.log("Projects : ",resp.data);
      setProjList(resp.data);
    } catch (err) {
    //  console.log(err);
    }
  };

  const handleUpdate = async (bug) => {
    setIsUpdate(true);
    setbugID(bug.bugID);
    setbugName(bug.bugName);
    setpriority(bug.priority);
    setbugDesc(bug.bugDesc);
    setprojID(bug.projID);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  const alertShow = (msg) =>{
    setShow(true)
        setIsAlertVisible(true);
        setBgColor("bg-info");
        setSetMessage(msg);
        setTimeout(() => {
          setIsAlertVisible(false);
        }, 5000);
  }

  const handleUpdateBug = async () => {
    const bugData = {
      bugID: bugID,
      bugName: bugName,
      priority: priority,
      bugDesc: bugDesc,
      projID: projID,
      regBy: contextdata.uid
    };
    try{
   //   console.log("bugData : ",bugData);
    const response = await axios.put(
      `${contextdata.urole==="Admin" ? "/admin/updateBug" : "/tester/updateBug"}`,
      bugData
    );
   if(response){
    resetForm();
    alertShow("Bug Updated Successfully");
    setPriorityBGColor("");
    setIsUpdate(false);
    getBug(contextdata);
   }
    }catch(e){
      alertShow(e.response.data.error);
    }
  }

  const resetForm = () => {
    setbugID("");
    setbugName("");
    setpriority("");
    setbugDesc("");
    setprojID("");
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const bugData = {
      bugName: bugName,
      priority: priority,
      bugDesc: bugDesc,
      projID: projID,
      regBy: contextdata.uid
    };
    addBug(bugData);
  };

  const addBug = async (bug) => {
   // console.log(bug);

    try {
   //   console.log("contextdata.urole : ",contextdata.urole)
      const response = await axios.post(
        `${contextdata.urole==="Admin" ? "/admin/newBug" : "/tester/newBug"}`,
        bug
      );
   //   console.log(response.data);
      resetForm();
      alertShow("Bug Registered Successfully");
      setPriorityBGColor("");
      getBug(contextdata);
      addBugTrack(response.data.bugID);
      window.scrollTo({
        bottom: 0,
        behavior: 'smooth',
      });
     
    }
    catch (e) {
   //   console.log(e)
   alertShow(e.response.data.error);
    }
  }

  const addBugTrack = async (bugID) => {
    const bugTract = {
      bugID: bugID
    }
    try {
      const response = await axios.post(
        `${contextdata.urole==="Admin" ? `/admin/newtrack` : `/tester/newtrack`}`,
        bugTract
      );
      if(response){
        getBug(contextdata);
      }
    }
    catch (e) {
    }
  }

  const handleDelete = async (bugID) => {
    try {
      const response = await axios.delete(
        `${contextdata.urole==="Admin" ? `/admin/deletebug/${bugID}` : `/tester/deletebug/${bugID}`}`
      );
      // console.log(response.data);
      addBugTrack(response.data.bugID);
      resetForm();
      alertShow("Bug Deleted Successfully");
      getBug(contextdata);

    } catch (e) {
      alertShow(e.response.data.error);
    }
  }

  const handleInput = (e) => {
    switch (e.target.id) {
      case "bugName":
        setbugName(e.target.value);
        // console.log(bugName);
        break;
      case "priority":
        setpriority(e.target.value);
        switch (e.target.value) {
          case "Low":
            setPriorityBGColor('skyblue');
            break;
          case "Medium":
            setPriorityBGColor('#ff8c00');
            break;
          case "High":
            setPriorityBGColor('#dc3545');
            break;
          case "Critical":
            setPriorityBGColor('#dc3545');
            break;
          default: break;
        }
        // console.log(priority);
        break;
      case "bugDesc":
        setbugDesc(e.target.value);
        break;
      case "projID":
        setprojID(e.target.value);
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


      <div className="bug-registration-form" >
        <div className="row" >
          <div className="offset-md-3 offset-xl-4 col-sm-12 col-md-6 col-xl-4">
            <form className="bug-form" onSubmit={handlesubmit}>
              <div className="form-group">
                <h3 className="form-title">Bug Registration</h3>
              </div>
              <div className="form-group">
                <label htmlFor="projID">Project : </label>
                <select
                  className="form-control"
                  id="projID"
                  name="projID"
                  value={projID}
                  onChange={handleInput}
                  required
                >
                  <option id="projID">
                    Select
                  </option>
                  {projlist.map((projItem) => (
                    <option key={projItem.projID} style={{ backgroundColor: 'skyblue' }} value={projItem.projID}>
                      {projItem.projID} {projItem.projName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                  style={{ color: 'black', backgroundColor: priorityBGColor }}

                  className="form-control"
                  id="priority"
                  name="priority"
                  value={priority}
                  onChange={handleInput}
                  required
                >
                  <option style={{ color: 'black', backgroundColor: 'white' }}>Select</option>
                  <option style={{ color: 'white', backgroundColor: 'skyblue', }} value="Low">Low</option>
                  <option style={{ color: 'black', backgroundColor: '#ff8c00' }} value="Medium">Medium</option>
                  <option style={{ color: 'white', backgroundColor: '#dc3545' }} value="High">High</option>
                  <option style={{ color: 'white', backgroundColor: '#8b0000' }} value="Critical">Critical</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="bugName">Bug Name</label>
                <input
                  className="form-control"

                  type="text"
                  id="bugName"
                  name="bugName"
                  value={bugName}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="bugDesc">Bug Description</label>
                <textarea
                  className="form-control"
                  style={{ height: "115px" }}
                  id="bugDesc"
                  name="bugDesc"
                  value={bugDesc}
                  onChange={handleInput}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                {isUpdate ? (
                  <button type="button" onClick={handleUpdateBug} className="btn btn-warning">
                    Update
                  </button>
                ) : (
                  <button type="submit" className="btn btn-success">
                    Register Bug
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Table Data */}

      <div
        className="container"
      >
        <div class="table-responsive">
          <table className="table table-striped table-bordered table-hover mt-4">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Priority</th>
                <th>Description</th>
                <th>Project</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bugList.map((bugItem) => {
                let uid = contextdata.uid;
                let uid2 = parseInt(bugItem.regBy);
                const urole = contextdata.urole;
                if (urole === "Admin" || uid2 === uid) {

                  return (
                    <tr key={bugItem.bugID}>
                      <td>{bugItem.bugID}</td>
                      <td>{bugItem.bugName}</td>
                      <td>{bugItem.priority}</td>
                      <td>
                        <div style={{ height: '100px', width: '400px', overflow: 'auto' }}>
                          {bugItem.bugDesc}
                        </div>
                      </td>
                      {projlist.map((projItem) => {
                        if (projItem.projID === bugItem.projID) {
                          return (
                            <td key={bugItem.projID}><div style={{ width: '200px' }}>{projItem.projID} : {projItem.projName}</div></td>
                          );
                        }
                        return null; // or return <td key={roleItem.roleID}></td>;
                      })}

                      <td>
                        <div style={{ width: '200px' }}>
                          <div className='row'>
                            <div className='col-sm-12 col-lg-6'>
                              <button type="button"
                                className="btn btn-warning m-1 text-center"
                                style={{ marginRight: "5px" }}
                                onClick={() => handleUpdate(bugItem)}
                              >
                                Update
                              </button>
                            </div>
                            <div className='col-sm-12 col-lg-6'>
                              <button type="button"
                                className="btn btn-danger m-1 text-center"
                                onClick={() => handleDelete(bugItem.bugID)}
                              >
                                Delete
                              </button>
                            </div>
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

export default BugRegistration