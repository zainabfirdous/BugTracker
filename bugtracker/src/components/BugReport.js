import React, { useEffect, useState } from 'react';
import "./BugReport.css";
import axios from 'axios';

function BugReportPage() {

  axios.defaults.withCredentials = true;

  const [bugs, setBugs] = useState([]);
  const [bugStatus, setBugStatus] = useState([]);
  const [activeBugs, setActiveBugs] = useState([]);
  const [resolvedBugs, setResolvedBugs] = useState([]);

//Trouter.get("tester/trackBug/:id",trackingdetails) :-> get tracking table data

  const getBug = async() => {
    try{
      const resp = await axios.get("http://127.0.0.1:5000/getbugs");
      console.log(resp.data);
    setBugs(resp.data);
       }
   catch(err){
    console.log(err);
    }
  };
useEffect(() => {
  getBug();
}, [])



// const getActiveBugs = async()=> {
//   try{
//     const resp = await axios.get("http://127.0.0.1:5000/getbugs");
//     const respp = await axios.get("http://127.0.0.1:5000/tester/trackBug"); //to get tracking table data

//     console.log(resp.data);
//     setActiveBugs(resp.data);
//     setBugStatus(respp.data.status);
// } catch(err){
//   console.log(err);
//   }
// };
// useEffect(() => {
 
// })

  // const getresolveBug = async() => {
  //   try{
  //     const resp = await axios.get("http://127.0.0.1:5000/getbugs");
  //     const respp = await axios.get("http://127.0.0.1:5000/tester/trackBug"); //to get tracking table data
  
  //     console.log(resp.data);
  //     setResolvedBugs(resp.data);
  //     setBugStatus(respp.data);
  // } catch(err){
  //   console.log(err);
  //   }
  // };
  // useEffect(() => {
  //   getresolveBug();
  //   getActiveBugs();
  // })
   
    // const updatedActiveBugs = activeBugs.filter((bug) => bug.bugId !== bugId);
    // const resolvedBug = activeBugs.find((bug) => bug.id === bugId);
    // setResolvedBugs([...resolvedBugs, resolvedBug]);
    // setActiveBugs(updatedActiveBugs);


  return (
    <div>
      <h1>Bug Report Page</h1>
      <div className="container">
        <div className="bug-container">
          <h2>All Bugs</h2>
          <thead>
            <th>Bug ID</th>
            <th>Bug Name</th>
            <th>Priority</th>
            <th>Status</th>
          </thead>
          <tbody>
          {
          bugs.map((bug) => 
          {
            return (
           
             <tr key={bug.bugID}>
            <td>{bug.bugID}</td>
            <td>{bug.bugName}</td>
            <td>{bug.priority}</td>
            {/* {bugStatus.map((Status) => {
              return(
               <td key={Status.status}>{Status.status}</td>
               );
              })} */}
              </tr>
             
              );
          })
          }
      </tbody>

        </div>
        <div className="bug-container">
          <h2>Active Bugs</h2>
          <thead>
            <th>Bug ID</th>
            <th>Bug Name</th>
            <th>Priority</th>
            <th>Status</th>
          </thead>
          
          {/* {activeBugs.map((bug) => {
           return(
            <tr key={bug.bugId}>
            <td>{bug.bugId}</td>
            <td>{bug.bugName}</td>
            <td>{bug.priority}</td>
            {bugStatus.map((Status) => {
              if(Status.status === "in progress"){
              return(
            <td key={Status.status}>{Status.status}</td>
            );
          }
          return null;
              })}
              {bug.description}
              <button onClick={() => resolveBug(bug.id)}>Resolve</button>
            </tr>);
          })} */}
        </div>


        <div className="bug-container">
          <h2>Resolved Bugs</h2>
          {resolvedBugs.map((bug) => (
            <div key={bug.id}>{bug.description}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BugReportPage;
