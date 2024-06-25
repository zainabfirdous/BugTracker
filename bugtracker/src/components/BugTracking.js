import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import NoteContext from '../Context/NoteContext';
import './BugTracking.css'


export default function BugTracking() {

  const contextdata = useContext(NoteContext);
  axios.defaults.headers.common['Authorization'] = contextdata.token;

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [message, setSetMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [bgcolor, setBgColor] = useState("");

  const [showBugdesc, setShowBugdesc] = useState(false);
  const [visibleBugdesc, setVisibleBugdesc] = useState(false);
  const [showTrackID, setShowTrackID] = useState("");
  const handleCloseBugdesc = () => setShowBugdesc(false);
  const handleOpenBugdesc = (showTrackID) => {
    setShowTrackID(showTrackID);
    setShowBugdesc(true)
    setVisibleBugdesc(true);
  }

  const [bugList, setBugList] = useState([]);
  const [bugTrackList, setBugTrackList] = useState([]);
  const [empList, setEmpList] = useState([]);
  const [empName, setEmpName] = useState("");
  const [status, setStatus] = useState("");
  const handleStatus = (e) => {
    setStatus(e.target.value);
  }
  const [empID, setEmpId] = useState("");
  const [dueDate, setDueDate] = useState(Date);
  const [dueTime, setDueTime] = useState("");

  useEffect(() => {
    const token = contextdata.token;
    if (token === null) navigate("/", { replace: true });

    if (contextdata.urole === "Admin") {
      setStatus("New");
    } else if (contextdata.urole === "Developer") {
      setStatus("Assigned");
    }
    else {
      setStatus("Resolved");
    }
    getData();
  }, [navigate, contextdata])

  const resetinput = () => {
    setEmpId("");
    setDueDate("");
    setDueTime("");
  }

  const handlesubmit = (trackID) => {
    const bugAssign = {
      trackID: trackID,
      assignBy: contextdata.uid,
      assignTo: empID,
      dueDate: dueDate,
      dueTime: dueTime
    };
    putbugAssign(bugAssign);
  };

  const alertShow = (msg) => {
    setShow(true)
    setIsAlertVisible(true);
    setBgColor("bg-info");
    setSetMessage(msg);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 5000);
  }

  const handleClosed = async (trackID) => {
    try {
      const response = await axios.put(
        `/admin/updateTracker/close/${trackID}`
      );
      if (response) {
        alertShow(`Bug is Closed`);
        getData();
        setShowBugdesc(false);
      }
    }
    catch (e) {
      alertShow(e.response.data.error);
    }
  }

  const handleDelete = async (trackID) => {
    try {
      const response = await axios.delete(
        `/admin/deletetracks/${trackID}`
      );
      if (response) {
        alertShow(`Bug ${trackID} Deleted Successfully`);
        getData();
        setShowBugdesc(false);
      }

    } catch (e) {
      alertShow(e.response.data.error);
    }
  };

  const putbugAssign = async (bugAssign) => {
    try {
      const response = await axios.put(
        `/admin/updateTracker/assigned/${bugAssign.trackID}`,
        bugAssign
      );
      if (response) {
        alertShow(`Bug Assigned to ${empName} Successfully`);
        setShowBugdesc(false);
        getData();
        resetinput();
      }

    } catch (e) {
      console.log("Eorrrr : ", e)
      setIsAlertVisible(true);
      setShow(true);
      setSetMessage(`${e.response.data.error}`);
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 5000);
    }

  }

  const handleInput = (e) => {
    switch (e.target.id) {
      case "empID":
        setEmpId(e.target.value);
        empList.map((empItem) => {
          if (e.target.value === empItem.empID) {
            setEmpName(empItem.fName);
          }
          return null;
        })
        break;
      case "dueDate":
        setDueDate(e.target.value);
        break;
      case "dueTime":
        setDueTime(e.target.value);
        break;
      default: break;
    }
  }


  const getData = async () => {
    try {
      const data1 = await axios.get("/admin/getbugs");
      const data2 = await axios.get("/admin/trackbugs");
      const data3 = await axios.get("/admin/getEmployees");
     
      setBugList(data1.data);
      setBugTrackList(data2.data);
      setEmpList(data3.data);
    } catch (e) {
      console.log("Error in Tracking : ", e)
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

      {/* Alert Message */}
      <div className="App">
        {visibleBugdesc && <Modal size="lg" show={showBugdesc} onHide={handleClose}>
          <Modal.Header className="bg-white">
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-white" >
            <div className="container" style={{ background: "linear-gradient(to right, #e6f7ff, #e7f7ff)" }}>

              <div className='col-md-12  p-1' >
                <div className=" m-xl-3" style={{ background: "linear-gradient(to right, #e6f7ff, #e7f7ff)" }}>

                  {
                    bugTrackList.map((btItem) => {
                      if (btItem.trackID === showTrackID) {
                        return (
                          bugList.map((bugItem) => {
                            if (bugItem.bugID === btItem.bugID) {
                              return (
                                <div key={btItem.trackID} className='m-3 login-form rounded' style={{ width: "auto" }}>
                                  <div className="row mt-1">
                                    <div className="col-12 ">
                                      <h5 >Tracking ID : {btItem.trackID}</h5>
                                    </div>
                                    <div className="col-12 ">
                                      <h5 >Bug ID : {bugItem.bugID}</h5>
                                    </div>
                                    <div className="col-12 ">
                                      <h5 >Subject : {bugItem.bugName}</h5>
                                    </div>
                                  </div>
                                  <div className="row mt-1">
                                    {
                                      bugTrackList.map((btItem) => {
                                        if (bugItem.bugID === btItem.bugID) {
                                          return (
                                            <div className="col-12">
                                              <h5 className="mt-1">Status :
                                                <span className=" m-1" style={{
                                                  backgroundColor: btItem.status === 'New' ? '#00ff00' :
                                                    btItem.status === 'Assigned' ? '#ffA500' :
                                                      btItem.status === 'Open' ? '#FFFF00' :
                                                        btItem.status === 'Resolved' ? '#6bb329' :
                                                          btItem.status === 'Verified' ? '#00cc00' :
                                                            btItem.status === 'Reopened' ? '#FF0000' :
                                                              btItem.status === 'Retest' ? '#9370DB' :
                                                                btItem.status === 'Closed' ? '#186aed' :
                                                                  '#808080',borderRadius:'10px'
                                                }}  ><span className="m-1">{btItem.status}</span></span>
                                              </h5>
                                              <h5 className="mt-1">Priority :
                                                <span className=" m-1" style={{
                                                  backgroundColor: bugItem.priority === "Low" ? 'skyblue' :
                                                    bugItem.priority === "Medium" ? '#ff8c00' :
                                                      bugItem.priority === "High" || bugItem.priority === "Critical" ? '#dc3545' :
                                                        '#808080',borderRadius:'10px'
                                                }}><span className="m-1">{bugItem.priority}</span></span>
                                              </h5>
                                            </div>
                                          )
                                        }
                                        return null;
                                      })
                                    }
                                  </div>

                                  {
                                    empList.map((empItem) => {
                                      if (empItem.empID === bugItem.regBy) {
                                        return (
                                          <div className="row mt-1">
                                            <div className="col-12">
                                              <h5 className="mt-1">Tester :<span className="border border-info rounded m-1"><span className="m-1">({empItem.empID}) {empItem.fName}</span></span>
                                              </h5>
                                            </div>
                                            {
                                              empList.map((empItem) => {
                                                if (empItem.empID === btItem.assignTo && status !== "New") {
                                                  return (
                                                    <div className="col-12">
                                                      <h5 className="mt-1" key={bugItem.assignTo} >Assign To :<span className=" border border-info rounded m-1"><span className="m-1">({empItem.empID}) {empItem.fName}</span></span>
                                                      </h5>
                                                    </div>
                                                  );
                                                }
                                                return null;
                                              })
                                            }
                                            <div className="col-12">
                                              <h5 className="mt-1">Create : <span className="border border-warning rounded m-1"><span className="m-1">{bugItem.crtDate} {bugItem.crtTime}</span></span>
                                              </h5>
                                            </div>
                                            {
                                              btItem.status === "New" ?
                                                <div></div>
                                                :
                                                btItem.status === "Assigned" || btItem.status === "Open" ?
                                                  <div className="col-12">
                                                    <h5 className="mt-1">Assign : <span className="border border-warning rounded m-1"><span className="m-1">{btItem.assignDate} {btItem.assignTime}</span></span>
                                                    </h5>
                                                    <h5 className="mt-1">Due : <span className="border border-warning rounded m-1"><span className="m-1">{btItem.dueDate} {btItem.dueTime}</span></span>
                                                    </h5>
                                                  </div> : btItem.compDate != null ?
                                                    <div className="col-12">
                                                      <h5 className="mt-1">Assign : <span className="border border-warning rounded m-1"><span className="m-1">{btItem.assignDate} {btItem.assignTime}</span></span>
                                                      </h5>
                                                      <h5 className="mt-1">Due : <span className="border border-warning rounded m-1"><span className="m-1">{btItem.dueDate} {btItem.dueTime}</span></span>
                                                      </h5>
                                                      <h5 className="mt-1">Completed : <span className="border border-warning rounded m-1"><span className="m-1">{btItem.compDate} {btItem.compTime}</span></span>
                                                      </h5>
                                                    </div>
                                                    : <div></div>}
                                            <div className="form-group col-12">
                                              <div className=' border border-warning rounded' style={{ height: '100px', overflow: 'auto' }}>
                                                {bugItem.bugDesc}
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      }
                                      return null;
                                    })
                                  }


                                  <div>
                                    {
                                      contextdata.urole === "Admin"
                                        ?
                                        <form className="row mt-4">
                                          <div className="form-group col-sm-12 col-md-4">
                                            <label htmlFor="empID">Assign To : </label>

                                            <select id="empID" value={empID} className="form-control form-select" variant="info" aria-label="Default select example"
                                              onChange={handleInput}
                                            >
                                              <option id="empID" selected>Select</option>
                                              {empList.map((empItem) => {
                                                if (empItem.roleID === 2) {
                                                  return (
                                                    <option value={empItem.empID} key={empItem.empID}>{empItem.empID} {empItem.fName}</option>
                                                  );
                                                }
                                                return null;
                                              })}
                                            </select>
                                          </div>
                                          <div className="form-group col-sm-12 col-md-4">
                                            <label htmlFor="startDate">Due Date : </label>
                                            <input
                                              className="form-control"
                                              type="date"
                                              id="dueDate"
                                              value={dueDate}
                                              onChange={handleInput}
                                              pattern="[A-Za-z]+"
                                            />
                                          </div>
                                          <div className="form-group col-sm-12 col-md-4">
                                            <label htmlFor="startDate">Due Time : </label>
                                            <input
                                              className="form-control"
                                              type="time"
                                              id="dueTime"
                                              value={dueTime}
                                              onChange={handleInput}
                                              required
                                            />
                                          </div>

                                          <div className="form-group col-sm-12 col-md-4">
                                            <button type="button" onClick={() => handlesubmit(btItem.trackID)} className="btn btn-success text-center">Assign Bug</button>
                                          </div>

                                          {
                                            btItem.status === "Verified" ?
                                              <div className="form-group col-sm-12 col-md-4">
                                                <button type="button" onClick={() => handleClosed(btItem.trackID)} className="btn btn-warning text-center">Close Bug</button>
                                              </div>

                                              :
                                              <div></div>
                                          }

                                          {("All" === status)
                                            ?
                                            <div className="form-group col-sm-12 col-md-4">
                                              <button type="button" onClick={() => handleDelete(btItem.trackID)} className="btn btn-danger text-center">Delete Bug</button>
                                            </div>
                                            :
                                            <div></div>}

                                        </form>
                                        : (
                                          btItem.status === "Assigned" ?
                                            <form className="row mt-4">
                                            </form>
                                            :
                                            <form className="row mt-4">
                                            </form>)
                                    }
                                  </div>
                                </div>
                              )
                            }
                            return null;
                          }))
                      }
                      return null;
                    })
                  }
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className={bgcolor} >
            <Button variant="warning" className='h-1' onClick={handleCloseBugdesc}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>}
      </div>

      {/* Main Body */}


      <div className="container" style={{ background: "linear-gradient(to right, #e6f7ff, #e7f7ff)" }}>

      

        <div className='col-md-12 m-2 p-1' >
          <div className="bg-light border border-primary rounded m-xl-5" style={{ background: "linear-gradient(to right, #e6f7ff, #e7f7ff)" }}>
            {
              contextdata.urole === "Admin" ?
                <span className=" m-1"><span className="m-2">
                  <select className="border border-warning rounded m-4 pl-5 pr-5 pt-2 pb-2"
                    id="status"
                    name="status"
                    value={status}
                    onChange={handleStatus}
                    required
                  >
                    <option value="New">New</option>
                    <option value="Assigned">Assigned</option>
                    <option value="Open">Open</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Verified">Verified</option>
                    <option value="Reopened">Reopened</option>
                    <option value="Retest">Retest</option>
                    <option value="Closed">Closed</option>
                    <option value="All">All</option>
                  </select>
                </span></span>
                :
                <span className=" m-1"><span className="m-2">
                  <select className="border border-warning rounded m-4 pl-5 pr-5 pt-2 pb-2"
                    id="status"
                    name="status"
                    value={status}
                    onChange={handleStatus}
                    required
                  >
                    <option selected value="Assigned">Assigned</option>
                    <option value="Open">Open</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Verified">Verified</option>
                  </select>
                </span></span>
            }
            {
              bugTrackList.map((btItem) => {
                if ("All" === status || btItem.status === status) {
                  return (
                    bugList.map((bugItem) => {
                      if (bugItem.bugID === btItem.bugID) {
                        return (
                          <div key={btItem.trackID} className='m-3 login-form rounded' style={{ width: "auto" }}>
                            <div className="row mt-1">
                              <div className="col-12 ">
                                <h5 >{btItem.trackID} : {bugItem.bugName}</h5>
                              </div>
                            </div>
                            <div className="row mt-1">
                              {
                                bugTrackList.map((btItem) => {
                                  if (bugItem.bugID === btItem.bugID) {
                                    return (
                                      <div className="col-3">
                                        <h5 className="mt-1"><span className={` border-warning  m-1`} style={{
                                          backgroundColor: btItem.status === 'New' ? '#00ff00' :
                                            btItem.status === 'Assigned' ? '#ffA500' :
                                              btItem.status === 'Open' ? '#FFFF00' :
                                                btItem.status === 'Resolved' ? '#6bb329' :
                                                  btItem.status === 'Verified' ? '#00cc00' :
                                                    btItem.status === 'Reopened' ? '#FF0000' :
                                                      btItem.status === 'Retest' ? '#9370DB' :
                                                        btItem.status === 'Closed' ? '#186aed' :
                                                          '#808080',borderRadius:'10px'
                                        }} ><span className="m-1" >{btItem.status}</span></span>
                                          <span className="border border-warning m-1" style={{
                                            backgroundColor: bugItem.priority === "Low" ? 'skyblue' :
                                              bugItem.priority === "Medium" ? '#ff8c00' :
                                                bugItem.priority === "High" || bugItem.priority === "Critical" ? '#dc3545' :
                                                  '#808080',borderRadius:'10px'
                                          }}><span className="m-1">{bugItem.priority}</span></span>
                                        </h5>
                                      </div>
                                    )
                                  }
                                  return null;
                                })
                              }
                            </div>

                            {
                              empList.map((empItem) => {
                                if (empItem.empID === bugItem.regBy) {
                                  return (
                                    <div className="row mt-1">
                                      <div className="col-md-12 col-lg-3">
                                        <h5 className="mt-1">Tester :<span className="border border-info rounded m-1"><span className="m-1">({empItem.empID}) {empItem.fName}</span></span>
                                        </h5>
                                      </div>
                                      {
                                        empList.map((empItem) => {
                                          if (empItem.empID === btItem.assignTo && status !== "New") {
                                            return (
                                              <div className="col-lg-12 col-xl-4">
                                                <h5 className="mt-1" key={bugItem.assignTo} >Assign To :<span className="border border-info rounded m-1"><span className="m-1">({empItem.empID}) {empItem.fName}</span></span>
                                                </h5>
                                              </div>
                                            );
                                          }
                                          return null;
                                        })
                                      }
                                      <div className="col-lg-12 col-xl-4">
                                        <h5 className="mt-1">Create : <span className="m-1"><span className="m-1">{bugItem.crtDate} <span className="bg-info m-1 p-1" style={{borderRadius:'10px'}}>{bugItem.crtTime}</span></span></span>
                                        </h5>
                                      </div>
                                      <div className="form-group col-lg-12 col-xl-2">
                                        <button type="button" onClick={() => handleOpenBugdesc(btItem.trackID)} style={{borderRadius:'10px'}} className="btn btn-success text-center">Details</button>
                                      </div>
                                    </div>
                                  );
                                }
                                return null;
                              })
                            }
                          </div>
                        )
                      }
                      return null;
                    }))

                }
                return null;
              })
            }
          </div>
        </div>


      </div>

    </>
  )
}
