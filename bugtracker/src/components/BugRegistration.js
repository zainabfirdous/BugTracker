import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function BugRegistration() {

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

  const [isUpdate, setIsUpdate] = useState(false);

  const getBug = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/getbugs");
      setBugList(response.data);
      const resp = await axios.get("http://127.0.0.1:5000/getprojects");
    setProjList(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/", { replace: true });
    getBug();
  
  }, [navigate]);

  const handleUpdate = async (bug) =>{
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

  const handleUpdateBug = () =>{

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
      // bugID: bugID,
      bugName: bugName,
      priority: priority,
      bugDesc: bugDesc,
      projID: projID,
      regBy: localStorage.getItem("uid")
    };
    addBug(bugData);
  };

  const addBug = async (bug) => {
    console.log(bug);
    const response = await axios.post(
      "http://127.0.0.1:5000/tester/newBug",
      bug
    );
    console.log(response.data);
    if (response.data.error) {
      setShow(true)
      setIsAlertVisible(true);
      setShow(true);
      setBgColor("bg-warning");
      setSetMessage(response.data.error);
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 5000);
    }
    else {
      // props.updateEmployeeList();
      addBugTrack(response.data.bugID);
      resetForm();
      setShow(true)
      setIsAlertVisible(true);
      setShow(true);
      setBgColor("bg-warning");
      setSetMessage("Bug Registered Successfully");
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 5000);
      getBug();
    }
  }

  const addBugTrack = async (bugID) =>{
    const bugTract = {
      bugID: bugID
  }
  const response = await axios.post(
    "http://127.0.0.1:5000/tester/newtrack",
    bugTract
  );
  console.log(response);
  }

  const handleDelete = async (bugID) =>{
    const response = await axios.delete(
      `http://127.0.0.1:5000/tester/deletebug/${bugID}`      
    );
    console.log(response.data);
    if (response.data.error) {
      setShow(true)
      setIsAlertVisible(true);
      setShow(true);
      setBgColor("bg-warning");
      setSetMessage(response.data.error);
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 5000);
    }
    else {
      addBugTrack(response.data.bugID);
      resetForm();
      setShow(true)
      setIsAlertVisible(true);
      setShow(true);
      setBgColor("bg-warning");
      setSetMessage("Bug Deleted Successfully");
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 5000);
      getBug();
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


      <div className="bug-registration-form">
      <div className="row">
      <div className="col-md-12  offset-lg-3 col-lg-6">
      <form className="row mt-4  border border-warning rounded m-3" onSubmit={handlesubmit}>
        <div className="form-group col-md-12  offset-lg-2 col-lg-8">
        <h3 className=" m-3" style={{ textAlign: 'center' }}><span className='m-4 bg-warning border border-warning rounded'><span className='m-2'>Bug Registration</span></span></h3>
          </div>
          <div className="form-group col-md-12  offset-lg-2 col-lg-8">
            <label htmlFor="bugName">Bug Name</label>
            <input className="form-control"
              type="text"
              id="bugName"
              name="bugName"
              value={bugName}
              onChange={handleInput}
              required
            />
          </div>
          <div className="form-group col-md-12  offset-lg-2 col-lg-8">
            <label htmlFor="priority">Priority</label>
            <select className="form-control"
              id="priority"
              name="priority"
              value={priority}
              onChange={handleInput}
              required
            >
              <option value=""> Select a Priority </option>
              <option value="low"> Low</option>
              <option value="medium"> Medium </option>
              <option value="high"> High </option>
              <option value="critical"> Critical </option>
            </select>
          </div>
          <div className="form-group col-md-12 offset-lg-2 col-lg-8" >
            <label htmlFor="bugDesc">Bug Description</label>
            <textarea className="form-control" style={{height:"115px"}}
              id="bugDesc"
              name="bugDesc"
              value={bugDesc}
              onChange={handleInput}
              required
            ></textarea>
          </div>
          <div className="form-group col-md-12  offset-lg-2 col-lg-8">
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
          <div className="form-group col-md-12  offset-lg-2 col-lg-8">
          { isUpdate ? <button type="button" onClick={handleUpdateBug} className="btn btn-warning text-center">Update</button> :
          <button type="submit" className="btn btn-success text-center">Register Bug</button>  }
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
               let uid = parseInt(localStorage.getItem("uid"));
               let uid2 = parseInt(bugItem.regBy);
              const urole = localStorage.getItem("urole")
              //  console.log("uid2:", uid2);
              //  console.log("uid:", uid);
             // console.log("Comparison:", uid2 === uid);
               if ( urole==="Admin" || uid2 === uid) {
               
              return (
                <tr key={bugItem.bugID}>
                  <td>{bugItem.bugID}</td>
                  <td>{bugItem.bugName}</td>
                  <td>{bugItem.priority}</td>
                  <td>
                  <div style={{ height: '100px',width:'400px', overflow: 'auto' }}>
                  {bugItem.bugDesc}
                  </div>
                  </td>
                  {projlist.map((projItem) => {
                       if (projItem.projID === bugItem.projID) {
                         return (
                           <td  key={bugItem.projID}><div style={{width:'200px'}}>{projItem.projID} : {projItem.projName}</div></td>
                         );
                       }
                       return null; // or return <td key={roleItem.roleID}></td>;
                  })}
                  
                  <td>
                  <div style={{width:'200px'}}>
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
                    <div   className='col-sm-12 col-lg-6'>
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