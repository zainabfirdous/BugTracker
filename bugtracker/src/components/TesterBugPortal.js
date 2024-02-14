import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function TesterBugPortal() {

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
        console.log("showTrackID : ", showTrackID)
    }

    const [bugList, setBugList] = useState([]);
    const [bugTrackList, setBugTrackList] = useState([]);
    const [empList, setEmpList] = useState([]);
    const [status, setStatus] = useState("");
    const handleStatus = (e) => {
        setStatus(e.target.value);
    }

    const handleReopen = async (trackID) =>{
        const response = await axios.put(
          `http://127.0.0.1:5000/tester/updateTrack/reopen/${trackID}`

        );
        if (response.data.error) {
          setShow(true)
          setIsAlertVisible(true);
          setBgColor("bg-warning");
          setSetMessage(response.data.error);
          setTimeout(() => {
            setIsAlertVisible(false);
          }, 5000);
        }
        else {
          setShow(true)
          setIsAlertVisible(true);
          setBgColor("bg-warning");
          setSetMessage(`Marked as Reopen`);
          setTimeout(() => {
            setIsAlertVisible(false);
          }, 5000);
          getData();
          setShowBugdesc(false);
        }
      }

    const handleVerified = async (trackID) => {
        const response = await axios.put(
            `http://127.0.0.1:5000/tester/updateTrack/verified/${trackID}`
        );
        if (response.data.error) {
            setShow(true)
            setIsAlertVisible(true);
            setBgColor("bg-warning");
            setSetMessage(response.data.error);
            setTimeout(() => {
                setIsAlertVisible(false);
            }, 5000);
        }
        else {
            setShow(true)
            setIsAlertVisible(true);
            setBgColor("bg-warning");
            setSetMessage(`Marked as Verified`);
            setTimeout(() => {
                setIsAlertVisible(false);
            }, 5000);
            getData();
            setShowBugdesc(false);
        }

    }



    const getData = async () => {
        const data1 = await axios.get("http://127.0.0.1:5000/admin/getbugs");
        const data2 = await axios.get("http://127.0.0.1:5000/admin/trackbugs");
        const data3 = await axios.get("http://127.0.0.1:5000/admin/getEmployees");
        setBugList(data1.data);
        setBugTrackList(data2.data);
        setEmpList(data3.data);
        //console.log(data1.data);
        // console.log(data2.data);
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/", { replace: true });
        if (localStorage.getItem("urole") === "Tester") {
            setStatus("Resolved");
        }
        getData();
    }, [navigate])


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

            {/* Show Details */}
            <div className="App">
                {visibleBugdesc && <Modal size="lg" show={showBugdesc} onHide={handleClose}>
                    <Modal.Header className="bg-white">
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-white" >{message}</Modal.Body>
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
                                                            //     console.log(bugItem.bugID, bugItem.bugName, bugItem.bugID === btItem.bugID)
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
                                                                                                <span className="bg-warning border border-warning rounded m-1"><span className="m-1">{btItem.status}</span></span>
                                                                                            </h5>
                                                                                            <h5 className="mt-1">Priority :
                                                                                                <span className="bg-warning border border-warning rounded m-1"><span className="m-1">{bugItem.priority}</span></span>
                                                                                            </h5>
                                                                                        </div>
                                                                                    )}
                                                                                return null;
                                                                            })}
                                                                    </div>
                                                                    {
                                                                        empList.map((empItem) => {
                                                                            if (empItem.empID === bugItem.regBy) {
                                                                                return (
                                                                                    <div className="row mt-1">
                                                                                        <div className="col-12">
                                                                                            <h5 className="mt-1">Tester :<span className="bg-warning border border-warning rounded m-1"><span className="m-1">({empItem.empID}) {empItem.fName}</span></span>
                                                                                            </h5>
                                                                                        </div>
                                                                                        {
                                                                                            empList.map((empItem) => {
                                                                                                //  console.log("bugItem.assignTo : ",bugItem.assignTo ,"empItem.empID : ",empItem.empID,bugItem)
                                                                                                if (empItem.empID === btItem.assignTo && status !== "New") {
                                                                                                    return (
                                                                                                        <div className="col-12">
                                                                                                            <h5 className="mt-1" key={bugItem.assignTo} >Assign To :<span className="bg-warning border border-warning rounded m-1"><span className="m-1">({empItem.empID}) {empItem.fName}</span></span>
                                                                                                            </h5>
                                                                                                        </div>
                                                                                                    );
                                                                                                }
                                                                                                return null;
                                                                                            })}
                                                                                        <div className="col-12">
                                                                                            <h5 className="mt-1">Create : <span className="bg-info border border-warning rounded m-1"><span className="m-1">{bugItem.crtDate}</span></span>
                                                                                            </h5>
                                                                                        </div>
                                                                                        <div className="form-group col-12">
                                                                                            <div className=' border border-warning rounded' style={{ height: '100px', overflow: 'auto' }}>
                                                                                                {bugItem.bugDesc}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                );
                                                                            }
                                                                            return null;
                                                                        })}
                                                                    <div>
                                                                        {
                                                                            btItem.status === "Resolved" ?
                                                                            <form className="row mt-4">
                                                                            <div className="form-group col-sm-12 col-md-2">
                                                                                <button type="button" onClick={() => handleVerified(btItem.trackID)} className="btn btn-success text-center">Verified</button>
                                                                            </div>
                                                                            <div className="form-group col-sm-12 col-md-2">
                                                                                <button type="button" onClick={() => handleReopen(btItem.trackID)} className="btn btn-danger text-center">Reopen</button>
                                                                            </div>
                                                                        </form>
                                                                        : btItem.status === "Retest" ?
                                                                        <form className="row mt-4">
                                                                            <div className="form-group col-sm-12 col-md-2">
                                                                                <button type="button" onClick={() => handleVerified(btItem.trackID)} className="btn btn-success text-center">Verified</button>
                                                                            </div>
                                                                            <div className="form-group col-sm-12 col-md-2">
                                                                                <button type="button" onClick={() => handleReopen(btItem.trackID)} className="btn btn-danger text-center">Reopen</button>
                                                                            </div>
                                                                        </form> :
                                                                        <form></form>
                                                                        }
                                                                        
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                        return null;
                                                    }))
                                            }
                                            return null;
                                        })}
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
                        <span className=" m-1"><span className="m-2">
                            <select className="border border-warning rounded m-4 pl-5 pr-5 pt-2 pb-2"
                                id="status"
                                name="status"
                                value={status}
                                onChange={handleStatus}
                                required
                            >
                                <option selected value="Resolved">Resolved</option>
                                <option value="Verified">Verified</option>
                                <option value="Reopen">Reopen</option>
                                <option value="Retest">Retest</option>
                                <option value="Closed">Closed</option>
                                <option value="All">All</option>

                                {/* let uid = parseInt(localStorage.getItem('uid'));
                                if (("All" === status && btItem.assignTo === uid) || ( btItem.status === status && btItem.assignTo === uid)) { */}
                            </select>
                        </span></span>
                        {
                            bugTrackList.map((btItem) => {
                                if ("All" === status || btItem.status === status) {
                                    return (
                                        bugList.map((bugItem) => {
                                            let uid = parseInt(localStorage.getItem('uid'));
                                            if (bugItem.bugID === btItem.bugID && bugItem.regBy === uid ) {
                                                //     console.log(bugItem.bugID, bugItem.bugName, bugItem.bugID === btItem.bugID)
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
                                                                                <h5 className="mt-1"><span className="bg-warning border border-warning rounded m-1"><span className="m-1">{btItem.status}</span></span>
                                                                                    <span className="bg-warning border border-warning rounded m-1"><span className="m-1">{bugItem.priority}</span></span>
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
                                                                                <h5 className="mt-1">Tester :<span className="bg-warning border border-warning rounded m-1"><span className="m-1">({empItem.empID}) {empItem.fName}</span></span>
                                                                                </h5>
                                                                            </div>
                                                                            {
                                                                                empList.map((empItem) => {
                                                                                    //  console.log("bugItem.assignTo : ",bugItem.assignTo ,"empItem.empID : ",empItem.empID,bugItem)
                                                                                    if (empItem.empID === btItem.assignTo && status !== "New") {
                                                                                        return (
                                                                                            <div className="col-lg-12 col-xl-4">
                                                                                                <h5 className="mt-1" key={bugItem.assignTo} >Assign To :<span className="bg-warning border border-warning rounded m-1"><span className="m-1">({empItem.empID}) {empItem.fName}</span></span>
                                                                                                </h5>
                                                                                            </div>
                                                                                        );
                                                                                    }
                                                                                    return null;
                                                                                })
                                                                            }
                                                                            <div className="col-lg-12 col-xl-3">
                                                                                <h5 className="mt-1">Create : <span className="bg-info border border-warning rounded m-1"><span className="m-1">{bugItem.crtDate}</span></span>
                                                                                </h5>
                                                                            </div>
                                                                            <div className="form-group col-lg-12 col-xl-2">
                                                                                <button type="button" onClick={() => handleOpenBugdesc(btItem.trackID)} className="btn btn-success text-center">Details</button>
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