import { useEffect, useState } from "react";
import axios from "axios";

export default function AddEmployee(props) {
  const [empID, setEmpID] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [roleID, setRoleID] = useState();

  const [isUpdateButton, setIsUpdateButton] = useState(false);

  useEffect(() => {
    if (props.employee.empID) {
        setEmpID(props.employee.empID);
        setFirstName(props.employee.fName);
        setLastName(props.employee.lName);
        setEmail(props.employee.email);
        setRoleID(props.employee.roleID);
      setIsUpdateButton(true);
    } else setIsUpdateButton(false);
  }, [props]);

  const updateEmployee = async () => {
    const updatedData = {
        empID: empID,
      fName: firstName,
      lName: lastName,
      email: email,
      roleID: roleID,
    };
    console.log(updatedData);
    const udpatedRecord = await axios.put(
      "http://127.0.0.1:5000/updateEmployee",
      updatedData
    );
    props.updateEmployeeList();
    resetForm();
    if(udpatedRecord.data.error){
      alert(`${udpatedRecord.data.error}`);
    }
    else{
      alert("Employee updated successfully!");
    }
    
  };

  const handleInput = (e) => {
    switch (e.target.id) {
      case "empID":
        setEmpID(e.target.value);
        break;
      case "firstName":
        setFirstName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "roleID":
        setRoleID(e.target.value);
        break;
        default : break;
    }
  };

  const addEmployee = async (employee) => {
    const response = await axios.post(
      "http://127.0.0.1:5000/newEmployee",
      employee
    );
    if (response.data) {
      props.updateEmployeeList();
      resetForm();
    }
  };

  const resetForm = () => {
    setEmpID("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setRoleID("");
    setIsUpdateButton(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const object = {
        empID: empID,
        fName: firstName,
        lName: lastName,
        email: email,
        roleID: roleID,
    };

    console.log(object);

    // call api to save product
    if (isUpdateButton) {
      updateEmployee(object);
    } else {
      addEmployee(object);
    }
  };

  return (
    <form className="row mt-4">
      <div className="form-group col-sm-12 col-md-4">
        <label htmlFor="empID">Employee Id: </label>
        <input
          className="form-control"
          type="text"
          id="empID"
          value={empID}
          onChange={handleInput}
        />
      </div>
      <div className="form-group col-sm-12 col-md-4">
        <label htmlFor="firstName">First Name: </label>
        <input
          className="form-control"
          type="text"
          id="firstName"
          value={firstName}
          onChange={handleInput}
        />
      </div>
      <div className="form-group col-sm-12 col-md-4">
        <label htmlFor="lastName">Last Name: </label>
        <input
          className="form-control"
          type="text"
          id="lastName"
          value={lastName}
          onChange={handleInput}
        />
      </div>
      <div className="form-group col-sm-12 col-md-4">
        <label htmlFor="email">Email : </label>
        <input
          className="form-control"
          type="text"
          id="email"
          value={email}
          onChange={handleInput}
        />
      </div>
      <div className="form-group col-sm-12 col-md-4">
        <label htmlFor="roleID">Role ID: </label>
        <input
          className="form-control"
          type="text"
          id="roleID"
          value={roleID}
          onChange={handleInput}
        />
      </div>
      <div className="form-group col-sm-12 col-md-4 d-flex align-items-end">
        <button type="button" className="btn btn-success text-center" onClick={handleSubmit}>
          {isUpdateButton ? "Update Employee" : "Add Employee"}
        </button>
      </div>
    </form>
  );
}
