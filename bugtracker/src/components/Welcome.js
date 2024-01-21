import React from 'react'

export default function Welcome() {
  return (
    <>
     <div className="container mt-5 text-center">
      <div className="jumbotron">
      <h1 className="display-4 text-primary" style={{ textShadow: '2px 2px 4px #5bc0de' }}>
          Welcome to BugTracker
        </h1>
        <p className="lead">Efficiently track and manage software issues with ease.</p>
        <hr className="my-4" />

        {/* Additional Information about Bug Management */}
        <div className="mt-5">
          <h2>Why BugTracker?</h2>
          <p>BugTracker is more than just a bug tracking tool. Here's why you'll love using it:</p>

          <ul className="list-unstyled">
            <li>
              <strong>Efficient Collaboration:</strong> Collaborate seamlessly with your team. Assign, comment, and track issues in one place.
            </li>
            <li>
              <strong>Improved Software Quality:</strong> Resolve issues promptly for a smoother user experience and higher software quality.
            </li>
            <li>
              <strong>Customizable Workflows:</strong> Adapt BugTracker to your unique project processes with customizable workflows.
            </li>
            <li>
              <strong>Real-time Notifications:</strong> Stay informed with real-time notifications about changes to issues.
            </li>
            <li>
              <strong>Data-driven Decision Making:</strong> Leverage valuable data and metrics for informed decision-making.
            </li>
            <li>
              <strong>Integration Capabilities:</strong> Integrate seamlessly with version control and development tools for an enhanced workflow.
            </li>
            <li>
              <strong>User-Friendly Interface:</strong> Enjoy an intuitive interface that encourages team adoption and simplifies issue tracking.
            </li>
            <li>
              <strong>Audit Trail and History:</strong> Keep track of changes with a detailed history for accountability and traceability.
            </li>
            <li>
              <strong>Prioritization and Severity:</strong> Prioritize and categorize issues for efficient resource allocation.
            </li>
            <li>
              <strong>Time and Resource Efficiency:</strong> Experience time and resource efficiency with BugTracker's streamlined processes.
            </li>
          </ul>
        </div>
      </div>
    </div>
    </>
  )
}
