import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";

export default function AddProject(props) {

        const [projID, setProjID] = useState();
        const [projName, setProjName] = useState();
        const [startDate, setStartDate] = useState();
        const [endDate, setEndDate] = useState();
        const [status, setStatus] = useState();

        const [isUpdateButton, setIsUpdateButton] = useState(false);

        const resetForm = () => {
            setProjID("");
            setProjName("");
            setStartDate("");
            setEndDate("");
            setStatus("");
            setIsUpdateButton(false);
          };
        
  useEffect(() => {
    if (props.project.projID) {
        setProjID(props.project.projID);
        setProjName(props.project.projName);
        setStartDate(props.project.startDate);
        setEndDate(props.project.endDate);
        setStatus(props.project.status);
      setIsUpdateButton(true);
    } else setIsUpdateButton(false);
  }, [props]);

    const handleInput = (e) => {
        switch (e.target.id) {
          case "projID":
            setProjID(e.target.value);
            break;
          case "projName":
            setProjName(e.target.value);
            break;
          case "startDate":
            setStartDate(e.target.value);
            break;
          case "endDate":
            setEndDate(e.target.value);
            break;
          case "status":
            setStatus(e.target.value);
            break;
            default : break;
        }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        const object = {
            projID: projID,
            projName: projName,
            startDate: startDate,
            endDate: endDate,
            status: status,
        };
    
        console.log(object);
        // addProject(object);
      //  call api to save product
        if (isUpdateButton) {
          updateProject(object);
        } else {
            addProject(object);
        }
      };

      const updateProject = async () => {
        const updatedData = {
            projID: projID,
            projName: projName,
            startDate: startDate,
            endDate: endDate,
            status: status,
        };
        console.log(updatedData);
        const udpatedRecord = await axios.put(
          "http://127.0.0.1:5000/updateProject",
          updatedData
        );
        props.updateProjectList();
        resetForm();
        if(udpatedRecord.data.error){
          alert(`${udpatedRecord.data.error}`);
        }
        else{
          alert("Project updated successfully!");
        }
        
      };

      const addProject = async (project) => {
        console.log(project);
        const response = await axios.post(
          "http://127.0.0.1:5000/newProject",
          project
        );
        if (response.data.error) {
          alert(`${response.data.error}`);
        }
        else{
          props.updateEmployeeList();
          resetForm();
        }
      };

  return (
    <form className="row mt-4">
    <div className="form-group col-sm-12 col-md-4">
      <label htmlFor="projID">Project Id: </label>
      <input
        className="form-control"
        type="text"
        id="projID"
        value={projID}
        onChange={handleInput}
      />
    </div>
    <div className="form-group col-sm-12 col-md-4">
      <label htmlFor="projName">Name: </label>
      <input
        className="form-control"
        type="text"
        id="projName"
        value={projName}
        onChange={handleInput}
      />
    </div>
    <div className="form-group col-sm-12 col-md-4">
      <label htmlFor="startDate">Start : </label>
      <input
        className="form-control"
        type="date"
        id="startDate"
        value={startDate}
        onChange={handleInput}
      />
    </div>
    <div className="form-group col-sm-12 col-md-4">
      <label htmlFor="endDate">End : </label>
      <input
        className="form-control"
        type="date"
        id="endDate"
        value={endDate}
        onChange={handleInput}
      />
    </div>
    <div className="form-group col-sm-12 col-md-4 ">
    <label htmlFor="endDate">Status </label>
        <select class="form-control" value={status}  id="status" aria-label="Default select example" onChange={handleInput}>
               <option selected >Select</option>
               <option value="Active">Active</option>
               <option value="Inactive">Inactive</option>
        </select>
    </div>
    <div className="form-group col-sm-12 col-md-4 d-flex align-items-end">
      <button type="button" className="btn btn-success text-center" onClick={handleSubmit}>
        {isUpdateButton ? "Update Project" : "Add Project"}
      </button>
    </div>
  </form>
  )
}
