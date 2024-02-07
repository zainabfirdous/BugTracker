import React from 'react'
import AddTeam from './AddTeam';
import axios from 'axios';



export default function Team() {
  axios.defaults.withCredentials = true;
  return (
    <>
    
    {/* Main Body */}
    <div
      className="container"
    >
       <div className="container">
        <AddTeam
        //   updateTeamList={() => {
        //     getTeam();
        //     setUpdateTeam({});
        //   }}
        //   team={updateTeam}
        />
        <div class="table-responsive">
        <table className="table table-striped table-bordered table-hover mt-4">
          <thead>
            <tr>
              <th>Team Id</th>
              <th>Team Name</th>
              <th>Project ID</th>
              <th>Project Name</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody> 
            {/* {teamList.map((teamItem) => {
              return (
                <tr key={teamItem.teamID}>
                  <td>{teamItem.teamID}</td>
                  <td>{teamItem.teamName}</td>
                  <td>{teamItem.projID}</td>
                  <td>{teamItem.projID}</td>
                  <td>{teamItem.admID}</td>
                  <td>
                    <div className='row'>
                    <div className='col-sm-12 col-lg-6'>
                    <button type="button"
                      className="btn btn-warning m-1 text-center"
                      style={{ marginRight: "5px" }}
                      onClick={() => handleUpdateTeam(teamItem)}
                    >
                      Update
                    </button>
                    </div>
                    <div   className='col-sm-12 col-lg-6'>
                    <button type="button"
                      className="btn btn-danger m-1 text-center"
                      onClick={() => handleDelete(teamItem.teamID)}
                    >
                      Delete
                    </button>
                    </div>
                  </div>
                  </td>
                </tr>
              );
            })} */}
          </tbody>
        </table>
        </div>
      </div>
    </div>


    </>
  )
}
