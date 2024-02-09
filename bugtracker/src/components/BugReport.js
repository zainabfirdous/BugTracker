import React from 'react'
import "../Login.css";

export default function BugReport() {
    return (
        <>
            <div className='container'>
                <div className='row mt-4'>
                    <div className='col-sm-12 col-md-4'>
                        <div className="bg-light border border-primary rounded ml-1">
                            <h3 className="bg-warning border border-warning rounded m-3" style={{ textAlign: 'center' }}>New</h3>
                            <div className='m-3 login-form rounded' style={{ width: "300px" }}>
                                <h5>UI Issue<span className=" bg-warning border border-warning rounded m-1"><span className="m-1">New</span></span>
                                 <span className=" bg-warning border border-warning rounded m-1"><span className="m-1">High</span></span></h5>
                                <h6>By : Sachin</h6>
                                <h6><span className="float-left border border-warning rounded"><p className='m-1'>Date-Time</p></span><span className="float-right border border-warning rounded"><p className='m-1'>Date-Time</p></span></h6>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-12 col-md-4'>
                    <div className="bg-light border border-primary rounded ml-1">
                            <h3 className="bg-info border border-info rounded m-3" style={{ textAlign: 'center' }}>Open</h3>
                            <div className='m-3 login-form rounded' style={{ width: "300px" }}>
                                <h5>UI Issue<span className=" bg-warning border border-warning rounded m-1"><span className="m-1">Open</span></span>
                                 <span className=" bg-warning border border-warning rounded m-1"><span className="m-1">High</span></span></h5>
                                <h6>By : Sachin</h6>
                                <h6>Assign to : Sachin</h6>
                                <h6><span className="float-left border border-warning rounded"><p className='m-1'>Date-Time</p></span><span className="float-right border border-warning rounded"><p className='m-1'>Date-Time</p></span></h6>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-12 col-md-4'>
                    <div className="bg-light border border-primary rounded ml-1">
                            <h3 className="bg-success border border-warning rounded m-3" style={{ textAlign: 'center' }}>Closed</h3>
                            <div className='m-3 login-form rounded' style={{ width: "300px" }}>
                                <h5>UI Issue<span className=" bg-warning border border-warning rounded m-1"><span className="m-1">Colsed</span></span>
                                 <span className=" bg-warning border border-warning rounded m-1"><span className="m-1">High</span></span></h5>
                                <h6>By : Sachin</h6>
                                <h6>Assign to : Sachin</h6>
                                <h6><span className="float-left border border-warning rounded"><p className='m-1'>Date-Time</p></span><span className="float-right border border-warning rounded"><p className='m-1'>Date-Time</p></span></h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
