
import "../Login.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import NoteContext from '../Context/NoteContext';

export default function BugReport() {


    const contextdata = useContext(NoteContext);
    axios.defaults.headers.common['Authorization'] = contextdata.token;

    const navigate = useNavigate();
    const [bugList, setBugList] = useState([]);
    const [bugTrackList, setBugTrackList] = useState([]);
    
  const [statusCounts, setStatusCounts] = useState([]);
    const [empList, setEmpList] = useState([]);

    const getData = async (contextdata) => {
        try {
            const data1 = await axios.get(`${contextdata.urole === "Admin" ? "/admin/getbugs" : contextdata.urole === "Developer" ? "/dev/getbugs" : "tester/getbugs"}`);
            const data2 = await axios.get(`${contextdata.urole === "Admin" ? "/admin/trackbugs" : contextdata.urole === "Developer" ? "/dev/trackbugs" : "tester/trackBug"}`);
            const data3 = await axios.get(`${contextdata.urole === "Admin" ? "/admin/getEmployees" : contextdata.urole === "Developer" ? "/dev/getEmployees" : "tester/getbugs"}`);
            const getStatusCounts = await axios.get(`${contextdata.urole === "Admin" ? "/admin/getStatusCounts" : contextdata.urole === "Developer" ? "/dev/getEmployees" : "tester/getbugs"}`);
            setStatusCounts(getStatusCounts.data);
            setBugList(data1.data);
            setBugTrackList(data2.data);
            setEmpList(data3.data);
        } catch (e) {
            console.log("Error in Bug Fatching : ", e)
        }
    }


    useEffect(() => {
        const token = contextdata.token;
        if (token === null) navigate("/", { replace: true });
        getData(contextdata);
    }, [navigate, contextdata])

    const [status1, setStatus1] = useState("New");
    const [status2, setStatus2] = useState("Resolved");
    const [status3, setStatus3] = useState("Closed");

    return (
        <>
            <div className='container'>
    {
        contextdata.urole === "Admin" ?
          
        <div className='row mt-4'>

            {/* ++++++++++++++++++++++++++++++++++++++++++++++++++ Report Column 1 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

        <div className='col-md-12 col-lg-4'>
                <div className="border border-primary rounded ml-1" >
                {
                   statusCounts.map((stsCount) => {
                     if (stsCount.status === "New") {
                    return (
                     <div>
                      <h3 className="border border-warning rounded m-1" style={{ backgroundColor: '#f5c842' }}> <span className="ml-3">New : {stsCount.status_count}</span></h3>
                     </div>
                 )}
         return null;
           })
     }
     {
                   statusCounts.map((stsCount) => {
                     if (stsCount.status === "Assigned") {
                    return (
                     <div>
                      <h3 className="border border-warning rounded m-1" style={{ backgroundColor: '#f5c842' }}> <span className="ml-3">Assigned : {stsCount.status_count}</span></h3>
                     </div>
                 )}
         return null;
           })
     }
     {
                   statusCounts.map((stsCount) => {
                     if (stsCount.status === "Open") {
                    return (
                     <div>
                      <h3 className="border border-warning rounded m-1" style={{ backgroundColor: '#f5c842' }}> <span className="ml-3">Open : {stsCount.status_count}</span></h3>
                     </div>
                 )}
         return null;
           })
     }
</div></div>

  {/* ++++++++++++++++++++++++++++++++++++++++++++++++++ Report Column 2 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}


<div className='col-md-12 col-lg-4'>
                <div className="border border-primary rounded ml-1" >
                {
                   statusCounts.map((stsCount) => {
                     if (stsCount.status === "Resolved") {
                    return (
                     <div>
                      <h3 className="border border-warning rounded m-1" style={{ backgroundColor: '#6bb329' }}> <span className="ml-3">Resolved : {stsCount.status_count}</span></h3>
                     </div>
                 )}
         return null;
           })
     }
     {
                   statusCounts.map((stsCount) => {
                     if (stsCount.status === "Verified") {
                    return (
                     <div>
                      <h3 className="border border-warning rounded m-1" style={{ backgroundColor: '#6bb329' }}> <span className="ml-3">Verified : {stsCount.status_count}</span></h3>
                     </div>
                 )}
         return null;
           })
     }
   
</div></div>

{/* ++++++++++++++++++++++++++++++++++++++++++++++++++ Report Column 3 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}


<div className='col-md-12 col-lg-4'>
                <div className="border border-primary rounded ml-1" >
                {
                   statusCounts.map((stsCount) => {
                     if (stsCount.status === "Reopened") {
                    return (
                     <div>
                      <h3 className="border border-warning rounded m-1" style={{ backgroundColor: '#fa5d32' }}> <span className="ml-3">Reopened : {stsCount.status_count}</span></h3>
                     </div>
                 )}
         return null;
           })
     }
     {
                   statusCounts.map((stsCount) => {
                     if (stsCount.status === "Retest") {
                    return (
                     <div>
                      <h3 className="border border-warning rounded m-1" style={{ backgroundColor: '#fa5d32' }}> <span className="ml-3">Retest : {stsCount.status_count}</span></h3>
                     </div>
                 )}
         return null;
           })
     }
     {
                   statusCounts.map((stsCount) => {
                     if (stsCount.status === "Closed") {
                    return (
                     <div>
                      <h3 className="border border-warning rounded m-1" style={{ backgroundColor: '#fa5d32' }}> <span className="ml-3">Closed : {stsCount.status_count}</span></h3>
                     </div>
                 )}
         return null;
           })
     }
</div></div>

</div>
            :
            <div></div>
    }
        
                <div className='row mt-4'>
                <div className='col-md-12 col-lg-4'>
                        <div className="border border-primary rounded ml-1" >
                            <h3 className="border border-warning rounded m-1" style={{ backgroundColor: '#f5c842' }}>
                                <select className="border border-info rounded m-1" style={{ textAlign: 'center', backgroundColor: '#f5c842', fontSize: '1.2rem' }}
                                    id="status"
                                    name="status"
                                    value={status1}
                                    onChange={(e) => { setStatus1(e.target.value) }}
                                    required
                                >
                                    <option value="New" style={{ backgroundColor: '#f5c842' }}>New</option>
                                    <option value="Assigned" style={{ backgroundColor: '#f5c842' }}>Assigned</option>
                                    <option value="Open" style={{ backgroundColor: '#f5c842' }}>Open</option>
                                </select>


                            </h3>
                            <div className=' border border-warning rounded' style={{ maxHeight: '600px', overflow: 'auto' }}>
                                {
                                    bugTrackList.map((btItem) => {
                                        if (btItem.status === status1) {
                                            return (
                                                bugList.map((bugItem) => {
                                                    let uid = contextdata.uid;
                                                    if (contextdata.urole === "Admin" ?
                                                        bugItem.bugID === btItem.bugID :
                                                        contextdata.urole === "Tester" ?
                                                            bugItem.bugID === btItem.bugID && bugItem.regBy === uid :
                                                            bugItem.bugID === btItem.bugID && btItem.assignTo === uid) {
                                                        return (

                                                            <div className='m-3 login-form rounded' style={{ width: "auto" }}>
                                                                <div className="row mt-1">
                                                                    <div className="col-12 ">
                                                                        <h5 >{bugItem.bugID} : {bugItem.bugName}</h5>
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-1">
                                                                    {
                                                                        bugTrackList.map((btItem) => {
                                                                            if (bugItem.bugID === btItem.bugID) {
                                                                                return (
                                                                                    <div className="col-3">
                                                                                        <h5 className="mt-1"><span className="border-warning  m-1" style={{
                                                                                            backgroundColor: btItem.status === 'New' ? '#00ff00' :
                                                                                                btItem.status === 'Assigned' ? '#ffA500' :
                                                                                                    btItem.status === 'Open' ? '#FFFF00' :
                                                                                                        '#808080',fontSize:'15px'
                                                                                        }} ><span className="m-1">{btItem.status}</span></span></h5>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                            return null;
                                                                        })
                                                                    }
                                                                    <div className="col-4">
                                                                        <h5 className="mt-1"><span className="border border-warning rounded m-1" style={{
                                                                            backgroundColor: bugItem.priority === "Low" ? 'skyblue' :
                                                                                bugItem.priority === "Medium" ? '#ff8c00' :
                                                                                    bugItem.priority === "High" || bugItem.priority === "Critical" ? '#dc3545' :
                                                                                        '#808080',fontSize:'15px'
                                                                        }}><span className="m-1">{bugItem.priority}</span></span></h5>
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-1">

                                                                    {
                                                                        empList.map((empItem) => {
                                                                            if (empItem.empID === bugItem.regBy) {
                                                                                return (
                                                                                    <div className="col-12">
                                                                                        <h6 className="mt-1">Tester : ({empItem.empID}) {empItem.fName}</h6>
                                                                                    </div>
                                                                                );
                                                                            }
                                                                            return null;
                                                                        })
                                                                    }
                                                                </div>

                                                                <div className="row mt-1">
                                                                    <div className="col-12">
                                                                        <h6><span className="float-left border border-warning rounded"><p className='m-1'>{bugItem.crtDate} {bugItem.crtTime}</p></span>
                                                                        </h6> </div>
                                                                </div>

                                                                {btItem.status !== 'New'
                                                                    ?
                                                                    <div className="row mt-1">
                                                                        <div className="col-12">
                                                                            <h6 className=""><span className="float-left border border-warning rounded"><p className='m-1'>{btItem.dueDate} {btItem.dueTime}</p></span></h6>
                                                                        </div>
                                                                    </div>
                                                                    :
                                                                    <div></div>
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                    return null;
                                                }))

                                        }
                                        return null;
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className='col-md-12 col-lg-4'>
                        <div className="border border-primary rounded ml-1" >
                            <h3 className="border border-warning rounded m-1" style={{ backgroundColor: '#6bb329' }}>
                                <select className="border border-info rounded m-1" style={{ textAlign: 'center', backgroundColor: '#6bb329', fontSize: '1.2rem' }}
                                    id="status"
                                    name="status"
                                    value={status2}
                                    onChange={(e) => { setStatus2(e.target.value) }}
                                    required
                                >
                                    <option value="Resolved" style={{ backgroundColor: '#6bb329' }}>Resolved</option>
                                    <option value="Verified" style={{ backgroundColor: '#6bb329' }}>Verified</option>
                                </select>
                            </h3>
                            <div className=' border border-warning rounded' style={{ maxHeight: '600px', overflow: 'auto' }}>
                                {
                                    bugTrackList.map((btItem) => {
                                        if (btItem.status === status2) {
                                            return (
                                                bugList.map((bugItem) => {
                                                    let uid = contextdata.uid;

                                                    if (contextdata.urole === "Admin" ?
                                                        bugItem.bugID === btItem.bugID :
                                                        contextdata.urole === "Tester" ?
                                                            bugItem.bugID === btItem.bugID && bugItem.regBy === uid :
                                                            bugItem.bugID === btItem.bugID && btItem.assignTo === uid) {
                                                        return (

                                                            <div className='m-3 login-form rounded' style={{ width: "auto" }}>
                                                                <div className="row mt-1">
                                                                    <div className="col-12 ">
                                                                        <h5 >{bugItem.bugID} : {bugItem.bugName}</h5>
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-1">
                                                                    {
                                                                        bugTrackList.map((btItem) => {
                                                                            if (bugItem.bugID === btItem.bugID) {
                                                                                return (
                                                                                    <div className="col-4">
                                                                                        <h5 className="mt-1"><span className="border border-warning rounded m-1" style={{
                                                                                            backgroundColor:
                                                                                                btItem.status === 'Resolved' ? '#6bb329' :
                                                                                                    btItem.status === 'Verified' ? '#00cc00' :
                                                                                                        '#808080',fontSize:'15px'
                                                                                        }} ><span className="m-1">{btItem.status}</span></span></h5>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                            return null;
                                                                        })
                                                                    }
                                                                    <div className="col-4">
                                                                        <h5 className="mt-1"><span className="border border-warning rounded m-1" style={{
                                                                            backgroundColor: bugItem.priority === "Low" ? 'skyblue' :
                                                                                bugItem.priority === "Medium" ? '#ff8c00' :
                                                                                    bugItem.priority === "High" || bugItem.priority === "Critical" ? '#dc3545' :
                                                                                        '#808080',fontSize:'15px'
                                                                        }}><span className="m-1">{bugItem.priority}</span></span></h5>
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-1">
                                                                    {
                                                                        empList.map((empItem) => {
                                                                            if (empItem.empID === bugItem.regBy) {
                                                                                return (
                                                                                    <div className="col-12">
                                                                                        <h6 className="mt-1" key={bugItem.regBy}>Tester : {empItem.fName}</h6>
                                                                                    </div>
                                                                                );
                                                                            }
                                                                            return null;
                                                                        })
                                                                    }
                                                                    {
                                                                        empList.map((empItem) => {
                                                                            if (empItem.empID === btItem.assignTo) {
                                                                                return (
                                                                                    <div className="col-12">
                                                                                        <h6 className="mt-1" key={bugItem.assignTo}>Assign To : {empItem.fName}</h6>
                                                                                    </div>
                                                                                );
                                                                            }
                                                                            return null;
                                                                        })
                                                                    }
                                                                </div>
                                                                <div className="row mt-1">
                                                                    <div className="col-12">
                                                                        <h6 className=""><span className="float-left border border-warning rounded"><p className='m-1'>{btItem.assignDate} {btItem.assignTime}</p></span></h6>
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-1">
                                                                    <div className="col-12">
                                                                        <h6 className=""><span className="float-left border border-warning rounded"><p className='m-1'>{btItem.dueDate} {btItem.dueTime}</p></span></h6>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    return null;
                                                }))

                                        }
                                        return null;
                                    })
                                }
                            </div>
                        </div>
                    </div> <div className='col-md-12 col-lg-4'>
                        <div className="border border-primary rounded ml-1" >
                            <h3 className="border border-warning rounded m-1" style={{ backgroundColor: '#fa5d32' }}>
                                <select className="border border-info rounded m-1" style={{ textAlign: 'center', backgroundColor: '#fa5d32', fontSize: '1.2rem' }}
                                    id="status"
                                    name="status"
                                    value={status3}
                                    onChange={(e) => { setStatus3(e.target.value) }}
                                    required
                                >
                                    <option value="Reopened" style={{ backgroundColor: '#fa5d32' }}>Reopened</option>
                                    <option value="Retest" style={{ backgroundColor: '#fa5d32' }}>Retest</option>
                                    <option value="Closed" style={{ backgroundColor: '#fa5d32' }}>Closed</option>
                                </select>
                            </h3>

                            <div className=' border border-warning rounded' style={{ maxHeight: '600px', overflow: 'auto' }}>
                                {
                                    bugTrackList.map((btItem) => {
                                        if (btItem.status === status3) {
                                            return (
                                                bugList.map((bugItem) => {
                                                    let uid = contextdata.uid;

                                                    if (contextdata.urole === "Admin" ?
                                                        bugItem.bugID === btItem.bugID :
                                                        contextdata.urole === "Tester" ?
                                                            bugItem.bugID === btItem.bugID && bugItem.regBy === uid :
                                                            bugItem.bugID === btItem.bugID && btItem.assignTo === uid) {
                                                        return (

                                                            <div className='m-3 login-form rounded' style={{ width: "auto" }}>
                                                                <div className="row mt-1">
                                                                    <div className="col-12 ">
                                                                        <h5 >{bugItem.bugID} : {bugItem.bugName}</h5>
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-1">
                                                                    {
                                                                        bugTrackList.map((btItem) => {
                                                                            if (bugItem.bugID === btItem.bugID) {
                                                                                return (
                                                                                    <div className="col-4">
                                                                                        <h5 className="mt-1"><span className="border border-warning rounded m-1" style={{
                                                                                            backgroundColor:
                                                                                                btItem.status === 'Reopened' ? '#FF0000' :
                                                                                                    btItem.status === 'Retest' ? '#9370DB' :
                                                                                                        btItem.status === 'Closed' ? '#186aed' :
                                                                                                            '#808080',fontSize:'15px'
                                                                                        }} ><span className="m-1">{btItem.status}</span></span></h5>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                            return null;
                                                                        })
                                                                    }
                                                                    <div className="col-4">
                                                                        <h5 className="mt-1"><span className="border border-warning rounded m-1" style={{
                                                                            backgroundColor: bugItem.priority === "Low" ? 'skyblue' :
                                                                                bugItem.priority === "Medium" ? '#ff8c00' :
                                                                                    bugItem.priority === "High" || bugItem.priority === "Critical" ? '#dc3545' :
                                                                                        '#808080',fontSize:'15px'
                                                                        }}><span className="m-1">{bugItem.priority}</span></span></h5>
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-1">
                                                                    {
                                                                        empList.map((empItem) => {
                                                                            if (empItem.empID === bugItem.regBy) {
                                                                                return (
                                                                                    <div className="col-12">
                                                                                        <h6 className="mt-1">Tester : {empItem.fName}</h6>
                                                                                    </div>
                                                                                );
                                                                            }
                                                                            return null;
                                                                        })
                                                                    }
                                                                    {
                                                                        empList.map((empItem) => {
                                                                            if (empItem.empID === btItem.assignTo) {
                                                                                return (
                                                                                    <div className="col-12">
                                                                                        <h6 className="mt-1">Assign To : {empItem.fName}</h6>
                                                                                    </div>
                                                                                );
                                                                            }
                                                                            return null;
                                                                        })
                                                                    }
                                                                </div>
                                                                <div className="row mt-1">
                                                                    <div className="col-12">
                                                                        <h6 className=""><span className="float-left border border-warning rounded"><p className='m-1'>{btItem.assignDate} {btItem.assignTime}</p></span></h6>
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-1">
                                                                    <div className="col-12">
                                                                        <h6 className=""><span className="float-left border border-warning rounded"><p className='m-1'>{btItem.dueDate} {btItem.dueTime}</p></span></h6>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    return null;
                                                }))

                                        }
                                        return null;
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

