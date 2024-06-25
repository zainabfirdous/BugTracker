import { useEffect, useState } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import NoteContext from '../Context/NoteContext';


export default function AddEmployee(props) {

  let strRegex = new RegExp(/^[a-zA-Z\s-, ]+$/);
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
  const [fnameerr, setFnameerr] = useState(null);
  const [lastName, setLastName] = useState();
  const [lnameerr, setLnameerr]  = useState(null);
  const [email, setEmail] = useState();
  const [emailerr, setEmailerr ] = useState(null);
  const [roleID, setRoleID] = useState();
  const [isUpdateButton, setIsUpdateButton] = useState(false);

  const [username, setUsername] = useState("");
  const [usererr, setUsererr ] = useState(null);
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
        let result1 = strRegex.test(e.target.value);  
        if (result1) {
          setFnameerr(null);
          setFirstName(e.target.value);
        }
        else{
          setFirstName(e.target.value);
          setFnameerr("Alphabet Only")
        }
        //  console.log(e.target.value);
        break;
      case "lastName":
        let result2 = strRegex.test(e.target.value);  
        if (result2) {
          setLnameerr(null);
          setLastName(e.target.value);
        }
        else{
          setLastName(e.target.value);
          setLnameerr("Alphabet Only")
        }
       
        //  console.log(e.target.value);
        break;
      case "email":
      //  var validRegex = /^[a-zA-Z0-9.!#$%&.'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      var validRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,}$/;
        let result3 = validRegex.test(e.target.value);  
        if (result3) {
          setEmailerr(null);
          setEmail(e.target.value);
        }
        else{
          setEmail(e.target.value);
          setEmailerr("User Proper Email Address")
        }
       
        break;
      case "roleID":
        setRoleID(e.target.value);
        // console.log(e.target.value);
        break;
      case "username":
        let strRegexusr = new RegExp(/^[a-z0-9]+$/i);
        let resultu = strRegexusr.test(e.target.value);  
        if (resultu) {
          setUsererr(null);
          setUsername(e.target.value);
        }
        else{
          setUsername(e.target.value);
          setUsererr("Alphabets and Numbers Only!!!")
        }
        
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
          console.log("EMployee is been Added!!! Forced")
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
        alertShow("Employee Added!")
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
          /><p className="ml-3 mt-2 mb-0" class="text-danger" >{fnameerr}</p>
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
          /><p className="ml-3 mt-2 mb-0" class="text-danger" >{lnameerr}</p>
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
          /><p className="ml-3 mt-2 mb-0" class="text-danger" >{emailerr}</p>
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
                /><p className="ml-3 mt-2 mb-0" class="text-danger" >{usererr}</p>
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
