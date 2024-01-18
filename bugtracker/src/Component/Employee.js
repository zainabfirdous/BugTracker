import React from 'react'
import Desktop from './Desktop'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Employee.css";
import AddEmployee from "./AddEmployee";

export default function Employee() {

  const navigate = useNavigate();

  const [employeeList, setEmployeeList] = useState([]);

  const [updateEmployee, setUpdateEmployee] = useState({});

  const getEmployee = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/get");
      setEmployeeList(response.data);
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
    alert(`${deletedRecords.data} Employee deleted successfully`);
  };

  const handleUpdateEmployee = (employee) => {
    console.log(employee);
    // pass employee object to addEmployee component
    setUpdateEmployee(employee);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/", { replace: true });

    getEmployee();
  }, [navigate]);

  return (
    <>
    <Desktop />
    <div
      class="container"
    >
       <div className="container">
        <AddEmployee
          updateEmployeeList={() => {
            getEmployee();
            setUpdateEmployee({});
          }}
          employee={updateEmployee}
        />
        <table className="table table-bordered table-strip">
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
                  <td>{empItem.roleID}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      style={{ marginRight: "5px" }}
                      onClick={() => handleUpdateEmployee(empItem)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(empItem.empID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    
    </>
    
  )
}
