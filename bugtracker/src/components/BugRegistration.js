import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function BugRegistration() {

  axios.defaults.withCredentials = true;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [message, setSetMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [bgcolor, setBgColor] = useState("");


  const navigate = useNavigate();
  const [bugID, setbugID] = useState();
  const [bugName, setbugName] = useState();
  const [priority, setpriority] = useState();
  const [bugDesc, setbugDesc] = useState();
  const [projID, setprojID] = useState();
  const [projlist, setProjList] = useState([]);
  const [bugList, setBugList] = useState([]);

  const getProj = async () => {
    const resp = await axios.get("http://127.0.0.1:5000/getprojects");
    setProjList(resp.data);
  }

  const getBug = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/getbugs");
      setBugList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/", { replace: true });
    getBug();
    getProj();
  }, [navigate]);


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
      bugID: bugID,
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
      "http://127.0.0.1:5000/newBug",
      bug
    );
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
      resetForm();
      setShow(true)
      setIsAlertVisible(true);
      setShow(true);
      setBgColor("bg-warning");
      setSetMessage("Bug Registered Successfully");
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 5000);
    }
  }



  const handleInput = (e) => {
    switch (e.target.id) {
      case "bugID":
        setbugID(e.target.value);
        // console.log(bugID);
        break;
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

        <form className="row mt-4" onSubmit={handlesubmit}>
          <div className="form-group offset-4 col-4">
            <label htmlFor="bugID"><h1>Bug Registration Form</h1></label><br></br>
            <label htmlFor="bugID">Bug ID</label>
            <input className="form-control"
              type="text"
              id="bugID"
              name="bugID"
              value={bugID}
              onChange={handleInput}
              required
            />
          </div>
          <div className="form-group offset-4 col-4">
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
          <div className="form-group offset-4 col-4">
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
          <div className="form-group offset-4 col-4">
            <label htmlFor="bugDesc">Bug Description</label>
            <textarea className="form-control"
              id="bugDesc"
              name="bugDesc"
              value={bugDesc}
              onChange={handleInput}
              required
            ></textarea>
          </div>
          <div className="form-group offset-4 col-4">
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
          <div className="form-group offset-4 col-4">
            <button type="submit" className="btn btn-success text-center">Register Bug</button>
          </div>

        </form>
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
              {/* <th>Action</th> */}
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
                  <td>{bugItem.bugDesc}</td>
                  <td>{bugItem.projID}</td>
                  {/* <td>{bugItem.regBy}</td> */}
                  {/* {rolelist.map((roleItem) => {
                       if (roleItem.roleID === empItem.roleID) {
                         return (
                           <td key={roleItem.roleID}>{roleItem.roleName}</td>
                         );
                       }
                       return null; // or return <td key={roleItem.roleID}></td>;
                  })} */}
                  {/* <td>
                    <div className='row'>
                    <div className='col-sm-12 col-lg-6'>
                    <button type="button"
                      className="btn btn-warning m-1 text-center"
                      style={{ marginRight: "5px" }}
                      onClick={() => handleUpdateEmployee(empItem)}
                    >
                      Update
                    </button>
                    </div>
                    <div   className='col-sm-12 col-lg-6'>
                    <button type="button"
                      className="btn btn-danger m-1 text-center"
                      onClick={() => handleDelete(empItem.empID)}
                    >
                      Delete
                    </button>
                    </div>
                  </div>
                  </td> */}
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