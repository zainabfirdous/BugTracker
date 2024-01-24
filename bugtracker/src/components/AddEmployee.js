import { useEffect, useState } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function AddEmployee(props) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [message, setSetMessage] = useState("");
  const [ isAlertVisible, setIsAlertVisible ] = useState(false);
  const [ bgcolor , setBgColor] = useState("");

  const [rolelist, setRoleList] = useState([]);
  
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
        setRoleList(props.rolelist);

      setIsUpdateButton(true);
    } else setIsUpdateButton(false);
    getRole();
  }, [props]);

  const getRole = async () =>{
    const resp2 = await axios.get("http://127.0.0.1:5000/getrole");
    console.log(resp2);
    setRoleList(resp2.data);
  }

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
      setShow(true)
      setIsAlertVisible(true);
      setShow(true);
      setBgColor("bg-warning");
      setSetMessage(`${udpatedRecord.data.error}`);
        setTimeout(() => {
            setIsAlertVisible(false);
        }, 5000);
      
    }
    else{
      setShow(true)
      setIsAlertVisible(true);
      setShow(true);
      setBgColor("bg-info");
      setSetMessage("Employee updated successfully!");
        setTimeout(() => {
            setIsAlertVisible(false);
        }, 5000);
      
    }
    
  };

  const handleInput = (e) => {
    switch (e.target.id) {
      case "empID":
        setEmpID(e.target.value);
        console.log(e.target.value);
        break;
      case "firstName":
        setFirstName(e.target.value);
        console.log(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        console.log(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "roleID":
        setRoleID(e.target.value);
        console.log(e.target.value);
        break;
        default : break;
    }
    
  };

  const addEmployee = async (employee) => {
    const response = await axios.post(
      "http://127.0.0.1:5000/newEmployee",
      employee
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
    else{
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
        <label htmlFor="roleID">Role : </label>

        <select id="roleID" value={roleID} className="form-control form-select" variant="info"  aria-label="Default select example" onChange={handleInput}>
        <option id="Role"  selected>Select</option>
        {rolelist.map((roleItem) => {
              return (
        <option value={roleItem.roleID} key={roleItem.roleID}>{roleItem.roleName}</option>
        );
            })}
        </select>
      </div>
      <div className="form-group col-sm-12 col-md-4 d-flex align-items-end">
        <button type="button" className="btn btn-success text-center" onClick={handleSubmit}>
          {isUpdateButton ? "Update Employee" : "Add Employee"}
        </button>
      </div>
    </form>
    </>
  );
}
