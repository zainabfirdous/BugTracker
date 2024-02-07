import React from 'react'
import { useState } from "react";
import axios from 'axios';

function BugRegistration() {
 // axios.defaults.withCredentials = true;
  const [bugID, setbugID]=useState();
const [bugName, setbugName]=useState();
const [priority, setpriority]=useState();
const [bugDesc, setbugDesc]=useState();
const [projID,setprojID]=useState();
const [regBy,setregBy]=useState();

const handleInput = (e) => {
  switch (e.target.id) {
    case "bugID":
      setbugID(e.target.value);
      break;
    case "bugName":
      setbugName(e.target.value);
      break;
    case "priority":
      setpriority(e.target.value);
      break;
    case "bugDesc":
      setbugDesc(e.target.value);
      break;
    case "projID":
      setprojID(e.target.value);
      break;
    case "regBy":
      setregBy(e.target.value);
        break;
      
      default : break;
  }
};


const handlesubmit =(e) =>{
  e.preventDefault();

  // const bugData = {
  //      bugID,
  //     bugName,
  //     priority,
  //     bugDesc,
  //     projID,
  //     regBy
  // };
  // // post("/api/bugs", bugData)
  // // .then((res) => {
  // //     alert("Bugregistered successfully!");
  // //     setbugID("");
  // //     setbugName("");
  // //     setpriority("");
  // //     setbugDesc("");
  // //     setprojID("");
  // //     setregBy("");
  // // })

  // .catch((err) => {
  //     alert("Something went wrong. Please try again.");
  // });
};


  return (
   <>
   
   <div className="bug-registration-form">
        
        <form className="row mt-4" onSubmit={handlesubmit}>
        <div className="form-group offset-4 col-4">
                <label htmlFor="bugID"><h1>Bug Registration Form</h1></label><br></br>
                <label htmlFor="bugID">Bug ID</label>
                <input  className="form-control"
                type = "text"
                id ="bugID"
                name = "bugID"
                value = {bugID}
                OnChange = {handleInput}
                required
                />
            </div>
            <div className="form-group offset-4 col-4">
                <label htmlFor = "bugName">Bug Name</label>
                <input className="form-control"
                type = "text"
                id ="bugName"
                name = "bugName"
                value = {bugName}
                OnChange = {(e) => setbugName(e.target.value)}
                required
                />
            </div>
            <div className="form-group offset-4 col-4">
                <label htmlFor = "priority">Priority</label>
                <select className="form-control"
                id ="priority"
                name = "priority"
                value = {priority}
                OnChange = {(e) => setpriority(e.target.value)}
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
            onChange={(e) => setbugDesc(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group offset-4 col-4">
            <label htmlFor="projID">Project</label>
            <input className="form-control"
            type ="text"
            id = "projID"
            name = "projID"
            value = {projID}
            onChange={(e) => setprojID(e.target.value)}
            required
            />
         </div>
        <div className="form-group offset-4 col-4">
          <label htmlFor="regBy">Registered By</label>
          <input className="form-control"
            type="text"
            id="regBy"
            name="regBy"
            value={regBy}
            onChange={(e) => setregBy(e.target.value)}
            required
          />
          </div>
        <div className="form-group offset-4 col-4">
          <button type="submit" className="btn btn-success text-center">Register Bug</button>
        </div>
          
        </form>
    </div>
   
   </>
  )
}

export default BugRegistration