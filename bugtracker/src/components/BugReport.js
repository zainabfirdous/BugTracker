
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
    const [empList, setEmpList] = useState([]);

    const getData = async (contextdata) => {
        try {
            const data1 = await axios.get(`${contextdata.urole === "Admin" ? "/admin/getbugs" : contextdata.urole === "Developer" ? "/dev/getbugs" : "tester/getbugs"}`);
            const data2 = await axios.get(`${contextdata.urole === "Admin" ? "/admin/trackbugs" : contextdata.urole === "Developer" ? "/dev/trackbugs" : "tester/trackBug"}`);
            const data3 = await axios.get(`${contextdata.urole === "Admin" ? "/admin/getEmployees" : contextdata.urole === "Developer" ? "/dev/getEmployees" : "tester/getbugs"}`);
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

    return (
        <>
            <div className='container'>
                <div className='row mt-4'>
                    <div className='col-md-12 col-lg-4'>
                        <div className="bg-light border border-primary rounded ml-1">
                            <h3 className="bg-warning border border-warning rounded m-3" style={{ textAlign: 'center' }}>New</h3>
                            <div className=' border border-warning rounded' style={{ maxHeight: '600px', overflow: 'auto' }}>
                                {
                                    bugTrackList.map((btItem) => {
                                        if (btItem.status === "New") {
                                            return (
                                                bugList.map((bugItem) => {
                                                    let uid = contextdata.uid;
                                                     if (contextdata.urole === "Admin" ?
                                                        bugItem.bugID === btItem.bugID :
                                                        contextdata.urole === "Tester" ?
                                                            bugItem.bugID === btItem.bugID && bugItem.regBy === uid :
                                                            bugItem.bugID === btItem.bugID && btItem.assignTo === uid)
                                                             
                                                            {
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
                                                                                        <h5 className="mt-1"><span className="bg-warning border border-warning rounded m-1"><span className="m-1">{btItem.status}</span></span></h5>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                            return null;
                                                                        })
                                                                    }
                                                                    <div className="col-4">
                                                                        <h5 className="mt-1"><span className="bg-warning border border-warning rounded m-1"><span className="m-1">{bugItem.priority}</span></span></h5>
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
                                                                <h6><span className="float-left border border-warning rounded"><p className='m-1'>{bugItem.crtDate} {bugItem.crtTime}</p></span>
                                                                    {/* <span className="float-right border border-warning rounded"><p className='m-1'>{bugItem.crtTime}</p></span> */}
                                                                </h6>
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
                        <div className="bg-light border border-primary rounded ml-1">
                            <h3 className="bg-info border border-info rounded m-3" style={{ textAlign: 'center' }}>Open</h3>
                            <div className=' border border-warning rounded' style={{ maxHeight: '600px', overflow: 'auto' }}>
                                {
                                    bugTrackList.map((btItem) => {
                                        if (btItem.status === "Assigned" || btItem.status === "Open" || btItem.status === "Resolved") {
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
                                                                                        <h5 className="mt-1"><span className="bg-warning border border-warning rounded m-1"><span className="m-1">{btItem.status}</span></span></h5>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                            return null;
                                                                        })
                                                                    }
                                                                    <div className="col-4">
                                                                        <h5 className="mt-1"><span className="bg-warning border border-warning rounded m-1"><span className="m-1">{bugItem.priority}</span></span></h5>
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
                    </div>
                    <div className='col-md-12 col-lg-4'>
                        <div className="bg-light border border-primary rounded ml-1">
                            <h3 className="bg-success border border-warning rounded m-3" style={{ textAlign: 'center' }}>Closed</h3>
                            <div className=' border border-warning rounded' style={{ maxHeight: '600px', overflow: 'auto' }}>
                                {
                                    bugTrackList.map((btItem) => {
                                        if (btItem.status === "Verified" || btItem.status === "Closed") {
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
                                                                                        <h5 className="mt-1"><span className="bg-warning border border-warning rounded m-1"><span className="m-1">{btItem.status}</span></span></h5>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                            return null;
                                                                        })
                                                                    }
                                                                    <div className="col-4">
                                                                        <h5 className="mt-1"><span className="bg-warning border border-warning rounded m-1"><span className="m-1">{bugItem.priority}</span></span></h5>
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

