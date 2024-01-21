import React from 'react'
import Desktop from './Desktop'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddProject from './AddProject';

export default function Project() {

  const navigate = useNavigate();

  const [projectList, setProjectList] = useState([]);

  const [updateProject, setUpdateProject] = useState({});

  const getProject = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/getprojects");
      setProjectList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (projID) => {
    console.log("delete : ", projID);
    const deletedRecords = await axios.delete(
      `http://127.0.0.1:5000/deleteproj/${projID}`
    );
    getProject();
    if(deletedRecords.data.error){
      alert(`${deletedRecords.data.error}`);
    }
    else{
      alert(`${deletedRecords.data} Project deleted successfully`);
    }
  };

  const handleUpdateProject = (project) => {
    console.log(project);
    // pass employee object to addEmployee component
    setUpdateProject(project);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/", { replace: true });

    getProject();
  }, [navigate]);

  return (
    <>
    <div
      class="container"
    >
       <div className="container">
        <AddProject
          updateProjectList={() => {
            getProject();
            setUpdateProject({});
          }}
          project={updateProject}
        />
        <div class="table-responsive">
        <table className="table table-striped table-bordered table-hover mt-4">
          <thead>
            <tr>
              <th>Project Id</th>
              <th>Name</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody> 
            {projectList.map((projItem) => {
              return (
                <tr key={projItem.projID}>
                  <td>{projItem.projID}</td>
                  <td>{projItem.projName}</td>
                  <td>{projItem.startDate}</td>
                  <td>{projItem.endDate}</td>
                  <td>{projItem.status}</td>
                  <td>
                    <div className='row'>
                    <div className='col-sm-12 col-lg-6'>
                    <button type="button"
                      className="btn btn-warning m-1 text-center"
                      style={{ marginRight: "5px" }}
                      onClick={() => handleUpdateProject(projItem)}
                    >
                      Update
                    </button>
                    </div>
                    <div   className='col-sm-12 col-lg-6'>
                    <button type="button"
                      className="btn btn-danger m-1 text-center"
                      onClick={() => handleDelete(projItem.projID)}
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
