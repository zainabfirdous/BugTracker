import React, { useState } from 'react'
import axios from 'axios';

export default function AddTeam() {
  axios.defaults.withCredentials = true;
    const [ isUpdateButton , setIsUpdateButton] = useState("");

    const [teamID, setTeamID] = useState();
    const [teamName, setTeamName] = useState();
    const [projID, setProjID] = useState();
    const [admID, setAdmID] = useState();

    const handleInput = (e) => {
        switch (e.target.id) {
          case "teamID":
            setTeamID(e.target.value);
            break;
          case "teamName":
            setTeamName(e.target.value);
            break;
          case "projID":
            setProjID(e.target.value);
            break;
            default : break;
        }
      };

  return (
    <>

<form className="row mt-4">
    <div className="form-group col-sm-12 col-md-4">
      <label htmlFor="teamID">Team Id: </label>
      <input
        className="form-control"
        type="text"
        id="teamID"
        value={teamID}
        onChange={handleInput}
      />
    </div>
    <div className="form-group col-sm-12 col-md-4">
      <label htmlFor="teamName">Name: </label>
      <input
        className="form-control"
        type="text"
        id="teamName"
        value={teamName}
        onChange={handleInput}
      />
    </div>

    <div className="form-group col-sm-12 col-md-4">
          <label htmlFor="projID">Project : </label>

          <select id="projID" value={projID} className="form-control form-select" variant="info" aria-label="Default select example" onChange={handleInput}>
            <option id="projID" selected>Select</option>
            {/* {rolelist.map((roleItem) => {
              return (
                <option value={roleItem.roleID} key={roleItem.roleID}>{roleItem.roleName}</option>
              );
            })} */}
          </select>
        </div>
    
    <div className="form-group col-sm-12 col-md-4 d-flex align-items-end">
      <button type="button" className="btn btn-success text-center"
    //    onClick={handleSubmit}
       >
        {isUpdateButton ? "Update Team" : "Add Team"}
      </button>
    </div>
  </form>
    

    </>
  )
}
