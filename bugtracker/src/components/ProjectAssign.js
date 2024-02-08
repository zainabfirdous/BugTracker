import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

export default function ProjectAssign() {
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const [message, setSetMessage] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [bgcolor, setBgColor] = useState("");

    const [projID, setProjID] = useState("");
    const [teamID, setTeamID] = useState("");
    const [empID, setEmpID] = useState("");
    const [isUpdateButton, setIsUpdateButton] = useState(false);

    const [projlist, setProjList] = useState([]);
    const [teamList, setTeamList] = useState([]);
    const [empList, setEmpList] = useState([]);
    const [ assignProjList, setAssignProjList] = useState([]);

    const getSelectData = async () => {
        const resp1 = await axios.get("http://127.0.0.1:5000/getprojects");
        // const resp2 = await axios.get("http://127.0.0.1:5000/Teams");
        // const resp3 = await axios.get("http://127.0.0.1:5000/get");
        setProjList(resp1.data);
        // setTeamList(resp2.data);
        // setEmpList(resp3.data);
    }

    const assignProjListget = async () =>{
        const resp1 = await axios.get("http://127.0.0.1:5000/getprojects");
        setAssignProjList(resp1.data);
        console.log(resp1.data)
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/", { replace: true });
        getSelectData();
        assignProjListget();
    }, [navigate]);

    const handlesubmit = (e) => {
        e.preventDefault();

        const projAssign = {
            projID: projID,
            teamID: teamID,
            empID: empID,
        };
        addProjAssign(projAssign);
    };

    const addProjAssign = async (projAssign) => {
        console.log(projAssign);
        const response = await axios.post(
            "http://127.0.0.1:5000/newBug",
            projAssign
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


    // const getProjAssign = async () => {
    //     try {
    //     //  const response1 = await axios.get("http://127.0.0.1:5000/get");
    //       const response = await axios.get("http://127.0.0.1:5000/getprojects");
    //     //  / console.log("Resp : " + response1.data);
    //       setProjectList(response.data);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };



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
                            {projlist.map((projItem) => {
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
                        <button type="button" className="btn btn-success text-center" onClick={handlesubmit}>
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
              {/* <th>Project</th> */}
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody> 
            {assignProjList.map((aplItem) => {
               let uid = parseInt(localStorage.getItem("uid"));
               let uid2 = parseInt(aplItem.empID);
              const urole = localStorage.getItem("urole")
              //  console.log("uid2:", uid2);
              //  console.log("uid:", uid);
             // console.log("Comparison:", uid2 === uid);
               if ( urole==="Admin" || uid2 === uid) {
               
              return (
                <tr key={aplItem.assignID}>
                  <td>{aplItem.assignID}</td>
                  <td>{aplItem.projID}</td>
                  <td>{aplItem.teamID}</td>
                  <td>{aplItem.empID}</td>
                  {/* <td>{aplItem.projID}</td> */}
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
