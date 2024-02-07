import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Employee.css";
import AddEmployee from "./AddEmployee";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function Employee() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [employeeList, setEmployeeList] = useState([]);
  const [rolelist, setRoleList] = useState([]);
  const [message, setSetMessage] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [ isAlertVisible, setIsAlertVisible ] = useState(false);


  const [updateEmployee, setUpdateEmployee] = useState({});


  const getEmployee = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/get");
      const resp2 = await axios.get("http://127.0.0.1:5000/getrole");
       console.log(response.data);
      setRoleList(resp2.data);
      setEmployeeList(response.data);
      
      // employeeList.map((empItem) =>  {
      //   return ( 
      //     console.log(empItem.roleID) );
      // })
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (employeeID) => {
    console.log("delete : ", employeeID);
    const deletedRecords = await axios.delete(
      `http://127.0.0.1:5000/delete/${employeeID}`
    );
    getEmployee();
    if(deletedRecords.data.error){
      setIsAlertVisible(true);
      setShow(true);
        setSetMessage(`${deletedRecords.data.error}`);
        setTimeout(() => {
            setIsAlertVisible(false);
        }, 5000);
    }
    else{
      setIsAlertVisible(true);
      setShow(true);
        setSetMessage(`${deletedRecords.data} Employee deleted successfully`);
        setTimeout(() => {
            setIsAlertVisible(false);
        }, 5000);
    }
  };

  const handleUpdateEmployee = (employee) => {
    console.log(employee);
    // pass employee object to addEmployee component
    setUpdateEmployee(employee);
  };

  const isShow =async () =>{
    const response =await axios.get("http://127.0.0.1:5000");
    console.log("Hello : " + response.Valid);
    if (response){
     
    }else{
      navigate("/", { replace: true });
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/", { replace: true });
    isShow();
    
    getEmployee();
  }, [navigate]);

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
        <AddEmployee
          updateEmployeeList={() => {
            getEmployee();
            setUpdateEmployee({});
          }}
          employee={updateEmployee}
          rolelist={rolelist}
        />
        <div class="table-responsive">
        <table className="table table-striped table-bordered table-hover mt-4">
          <thead>
            <tr>
              <th>Employee Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody> 
            {employeeList.map((empItem) => {
              return (
                <tr key={empItem.empID}>
                  <td>{empItem.empID}</td>
                  <td>{empItem.fName}</td>
                  <td>{empItem.lName}</td>
                  <td>{empItem.email}</td>
                  {rolelist.map((roleItem) => {
                       if (roleItem.roleID === empItem.roleID) {
                         return (
                           <td key={roleItem.roleID}>{roleItem.roleName}</td>
                         );
                       }
                       return null; // or return <td key={roleItem.roleID}></td>;
                  })}
                  <td><div className='row'>
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
