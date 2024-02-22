import React from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from 'react';
import NoteContext from './Context/NoteContext';
import axios from 'axios';
import bgImage from './background.jpg'


export default function AppInfo() {

  const contextdata = useContext(NoteContext);
  axios.defaults.headers.common['Authorization'] = contextdata.token;

  const navigate = useNavigate();
  useEffect(() => {
  }, [navigate,contextdata]);
  return (
    <>
<div className="container mt-5 p-3" style={{
  backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  minHeight: '100vh',
  width: '100%',
  padding: '20px',
  boxSizing: 'border-box',
}}>
  <div className='row'>
    <div className='col-lg-12'>
      <h1 className="mb-4">Bug Tracking Web-Tool</h1>
      <p>
        Welcome to our Bug Tracking App! This application is designed to help teams manage and track software issues efficiently throughout the software development lifecycle.
      </p>

      <h2 className='mt-4'>Key Features</h2>
      <ul className='pl-3'>
        <li>Workflow Management: Customize workflows to match your development process.</li>
        <li>Collaboration: Assign issues to team members and track their progress.</li>
        <li>Reporting: Generate reports and metrics for better project insights.</li>
      </ul>

      <h2 className='mt-4'>Getting Started</h2>
      <p>
        To get started, sign in to your account or create a new one. Once logged in, you can start creating and managing your projects and issues. Use the intuitive interface to collaborate with your team and ensure a smooth development process.
      </p>

      <p className='mb-4'>
        Thank you for choosing our Bug Tracking App. If you have any questions or feedback, feel free to contact our support team.
      </p>
    </div>
  </div>
</div>
    </>
  )
}
