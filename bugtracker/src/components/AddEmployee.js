import { useEffect, useState } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import NoteContext from '../Context/NoteContext';


export default function AddEmployee(props) {


  const contextdata = useContext(NoteContext);
  //  console.log("contextdata : ",contextdata);
  axios.defaults.headers.common['Authorization'] = contextdata.token;
  axios.defaults.withCredentials = true;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [message, setSetMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [bgcolor, setBgColor] = useState("");

  const [rolelist, setRoleList] = useState([]);

  const [empID, setEmpID] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [roleID, setRoleID] = useState();
  const [isUpdateButton, setIsUpdateButton] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCnf, setPasswordCnf] = useState("");

  useEffect(() => {
    if (props.employee.empID) {
      setEmpID(props.employee.empID);
      setFirstName(props.employee.fName);
      setLastName(props.employee.lName);
      setEmail(props.employee.email);
      setRoleID(props.employee.roleID);
      setRoleList(props.rolelist);
      setIsUpdateButton(true);
    } else setIsUpdateButton(false);
    getRole();
  }, [props]);

  const getRole = async () => {
    try {
      const resp2 = await axios.get("/admin/getrole");
      setRoleList(resp2.data);
    } catch (e) {
      console.log("Error : ", e)
    }
  }

  const alertShow = (msg) => {
    setShow(true)
    setIsAlertVisible(true);
    setBgColor("bg-info");
    setSetMessage(msg);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 5000);
  }

  const updateEmployee = async () => {
    const updatedData = {
      empID: empID,
      fName: firstName,
      lName: lastName,
      email: email,
      roleID: roleID,
    };
    try {
      const udpatedRecord = await axios.put(
        "/admin/updateEmployee",
        updatedData
      );
      if (udpatedRecord) {
        props.updateEmployeeList();
        resetForm();
        alertShow("Employee updated successfully!");
      }
    } catch (e) {
      alertShow(e.response.data.error);
    }
  };

  const handleInput = (e) => {
    switch (e.target.id) {
      case "empID":
        setEmpID(e.target.value);
        //  console.log(e.target.value);
        break;
      case "firstName":
        setFirstName(e.target.value);
        //  console.log(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        //  console.log(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "roleID":
        setRoleID(e.target.value);
        // console.log(e.target.value);
        break;
      case "username":
        setUsername(e.target.value);
        // console.log(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        // console.log(e.target.value);
        break;
      case "passwordCnf":
        setPasswordCnf(e.target.value);
        // console.log(e.target.value);
        break;
      default: break;
    }

  };

  const addEmployee = async (employee) => {
    if (password !== passwordCnf) {
      alertShow("Password Not Matching!!!");
    } else {
      console.log("Employee : ", employee)
      try {
        const response = await axios.post(
          "/admin/newEmployee",
          employee);
        profileAdd(response.data.empID)

      } catch (e) {
        alertShow(e.response.data.error);
      }
    }
  };

  const profileAdd = async (empID) => {
    console.log('response empId empId : ', empID);
    try {
      const profileLogin = {
        empID: empID,
        username: username,
        password: password
      }
      const resp = await axios.post(
        "/admin/userprofile",
        profileLogin);
      if (resp) {
        props.updateEmployeeList();
        resetForm();
        setUsername("");
        setPassword("");
        setPasswordCnf("");
      }
    } catch (e) {
      alertShow(e.response.data.error);
    }
  }

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

    //  console.log(object);

    if (isUpdateButton) {
      updateEmployee(object);
    } else {
      addEmployee(object);
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

      <form className="row mt-4" onSubmit={handleSubmit}>
        {
          isUpdateButton ?
            <div className="form-group col-sm-12 col-md-4">
              <label htmlFor="empID">Employee Id: </label>
              <input
                className="form-control"
                type="text"
                id="empID"
                value={empID}
                readonly
              />
            </div>
            :
            <div></div>
        }

        <div className="form-group col-sm-12 col-md-4">
          <label htmlFor="firstName">First Name: </label>
          <input
            className="form-control"
            type="text"
            id="firstName"
            value={firstName}
            onChange={handleInput}
            required
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
            required
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
            required
          />
        </div>

        <div className="form-group col-sm-12 col-md-4">
          <label htmlFor="roleID">Role : </label>

          <select id="roleID" value={roleID} className="form-control form-select" variant="info" aria-label="Default select example" onChange={handleInput}>
            <option id="Role" selected>Select</option>
            {rolelist.map((roleItem) => {
              return (
                <option value={roleItem.roleID} key={roleItem.roleID}>{roleItem.roleName}</option>
              );
            })}
          </select>
        </div>
        {
          isUpdateButton ?
            <></>
            :
            <>
              <div className="form-group col-sm-12 col-md-4">
                <label htmlFor="email">Username : </label>
                <input
                  className="form-control"
                  type="text"
                  id="username"
                  value={username}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <label htmlFor="email">Password : </label>
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  value={password}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <label htmlFor="email">Confirm : </label>
                <input
                  className="form-control"
                  type="text"
                  id="passwordCnf"
                  value={passwordCnf}
                  onChange={handleInput}
                  required
                />
              </div>
            </>
        }

        <div className="form-group col-sm-12 col-md-4 d-flex align-items-end">
          <button type="submit" className={isUpdateButton ? "btn btn-warning text-center" : "btn btn-success text-center"} >
            {isUpdateButton ? "Update Employee" : "Add Employee"}
          </button>
        </div>
      </form>
    </>
  );
}
