import React from 'react'
import "./Features.css";

export default function Welcome() {

  return (
    <>
      <div className="container1 text-center">
        <div className='row1'>
          <div className='col-12'>
            <div className=" ">

              <h1 className="display-4  " style={{ textShadow: '2px 2px 4px #5bc0de' }}>
              Why should you choose us?
              </h1>
              <p className="lead">We Provide Efficiently track and manage software issues with ease.</p>
              <hr className="my-4" />

              {/* Additional Information about Bug Management */}

              <div class="container mt-5">
                <div class="row">
                  <div class="col-sm-4 bug">
                    <h4 >Why Bug Tracker </h4>
                    <p>BugTracker is more than just a bug tracking tool. Here's why you'll love using it</p>
                    <br></br>
                  </div>
                  
                  <div class="col-sm-4 efficient" >
                    <h4>Efficient Collaboration</h4>
                    <p>Collaborate seamlessly with your team. Assign, comment, and track issues in one place.</p>
                    <br></br>
                  </div>
                  <div class="col-sm-4 software">
                    <h4>Improved Software Quality</h4>
                    <p>Resolve issues promptly for a smoother user experience and higher software quality.  </p>
                    <br></br>
                  </div>
                  <div class="col-sm-4 work">
                    <h4>Customizable Workflows</h4>
                    <p>Adapt BugTracker to your unique project processes with customizable workflows.</p>
                    <br></br>
                  </div>
                  <div class="col-sm-4 real">
                    <h4>Real-time Notifications</h4>
                    <p>Stay informed with real-time notifications about changes to issues.</p>
                    <br></br>
                  </div>
                  <div class="col-sm-4 datad">
                    <h4>Data-driven Decision Making</h4>
                    <p>Leverage valuable data and metrics for informed decision-making.</p>
                    <br></br>
                  </div>
                  <div class="col-sm-4 integration">
                    <h4>Integration Capabilities</h4>
                    <p>Integrate seamlessly with version control and development tools for an enhanced workflow.</p>
                  </div>
                  <div class="col-sm-4 user">
                    <h4>User-Friendly Interface</h4>
                    <p>Enjoy an intuitive interface that encourages team adoption and simplifies issue tracking.</p>
                    <br></br>
                  </div>
                  <div class="col-sm-4 trail">
                    <h4>Audit Trail and History</h4>
                    <p>Keep track of changes with a detailed history for accountability and traceability.</p>
                    <br></br>
                  </div>
                  <div class="col-sm-4 severity">
                    <h4>Prioritization and Severity</h4>
                    <p>Prioritize and categorize issues for efficient resource allocation.</p>
                    <br></br>
                  </div>
                  <div class="col-sm-4 times">
                    <h4>Time and Resource Efficiency</h4>
                    <p>Experience time and resource efficiency with BugTracker's streamlined processes.</p>
                    <br></br>
                  </div>
                  <div class="col-sm-4 central">
                    <h4>Centralized Repository</h4>
                    <p>Central hub for teams to manage issues, ensuring a unified source of truth for developers.</p>
                    <br></br>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
