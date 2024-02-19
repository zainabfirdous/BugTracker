import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaHome, FaUser } from 'react-icons/fa';
import { FaCashRegister } from 'react-icons/fa6';
import { MdBugReport } from 'react-icons/md';
import { FcBusinessman } from "react-icons/fc";
import { FaBug } from 'react-icons/fa';
import { MdFeaturedVideo } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { FcAbout } from "react-icons/fc";
import { AiFillProject } from "react-icons/ai";
import { MdOutlineAssignment } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import SidebarMenu from './SidebarMenu';

const SideBar = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('urole');
        setIsLoggedIn(!!token); // Check if token exists in localStorage
        setUserRole(role);
    }, []);


    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setShowLogoutModal(false); // Close the logout modal
        navigate('/login'); // Redirect to the login page
    };

    const toggle = () => setIsOpen(!isOpen);

    // Define routes based on user role
    const adminRoutes = [
        { path: '/', name: 'Dashboard', icon: <FaHome /> },
        { path: '/BugTracking', name: 'Bug Tracking', icon: <FaBug /> },
        { path: '/Employee', name: 'Employee', icon: <FaUser /> },
        { path: '/Project', name: 'Project', icon: <AiFillProject /> },
        { path: '/BugRegistration', name: 'Bug Registration', icon: <FaCashRegister /> },
        { path: '/BugReport', name: 'Bug Report', icon: <MdBugReport /> },
        { path: '/Team', name: 'Team', icon: <RiTeamFill /> },
        { path: '/ProjectAssign', name: 'Project Assign', icon: <MdOutlineAssignment /> },
        {
            path: '/profile',
            name: 'Profile',
            icon: <FcBusinessman />,
            // subRoutes: [
            //   { path: '/profile/Login', name: 'Login', icon: <IoIosLogIn /> },
            //   { path: '/profile/Logout', name: 'Logout', icon: <IoIosLogOut /> },
            // ],
        },
    ];

    const userRoutes = [
        { path: '/', name: 'Dashboard', icon: <FaHome /> },
        { path: '/BugTracking', name: 'Bug Tracking', icon: <FaBug /> },
        { path: '/Profile', name: 'Profile', icon: <FcBusinessman /> },
       
    ];

    const testerRoutes = [
        { path: '/', name: 'Dashboard', icon: <FaHome /> },
        { path: '/BugRegistr', name: 'Bug Registr', icon: <FaBug /> },
        { path: '/BugReport', name: 'Bug Report', icon: <MdBugReport /> },
        { path: '/Profile', name: 'Profile', icon: <FcBusinessman /> },
        // Add more tester-specific routes here
    ];

    const guestRoutes = [
        { path: '/feature', name: 'Feature', icon: <MdFeaturedVideo /> },
        { path: '/aboutus', name: 'About Us', icon: <FcAbout /> },
    ];
    
    const routes = isLoggedIn
    ? userRole === 'Admin'
        ? adminRoutes
        : userRole === 'Developer'
            ? userRoutes
            : userRole === 'Tester'
                ? testerRoutes
                : guestRoutes // Assuming any unrecognized role will default to guestRoutes
    : guestRoutes;


    const showAnimation = {
        hidden: {
            width: 0,
            opacity: 0,
            transition: {
                duration: 0.5,
            },
        },
        show: {
            opacity: 1,
            width: 'auto',
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <>
            <div className="main-container">
                <motion.div
                    animate={{
                        width: isOpen ? '250px' : '65px',
                        transition: {
                            duration: 0.5,
                            type: 'spring',
                            damping: 10,
                        },
                    }}
                    className={`sidebar `}
                    style={{ backgroundColor: 'black' }}
                >
                    <div className="top_section">
                        <AnimatePresence>
                            {isOpen && (
                                <motion.h1
                                    variants={showAnimation}
                                    initial="hidden"
                                    animate="show"
                                    exit="hidden"
                                    className="logo"
                                > Bug Tracker
                                </motion.h1>
                            )}
                        </AnimatePresence>
                        <div className="bars">
                        <FaBug onClick={toggle} />
                        </div>
                    </div>
                   
                    <section className="routes">
                        {routes.map((route, index) => {
                            if (route.subRoutes) {
                                return (
                                    <SidebarMenu
                                        setIsOpen={setIsOpen}
                                        route={route}
                                        showAnimation={showAnimation}
                                        isOpen={isOpen}
                                        key={index}
                                    />
                                );
                            }

                            return (
                                <NavLink
                                    to={route.path}
                                    key={index}
                                    className="link"
                                    activeClassName="active"
                                >
                                    <div className="icon">{route.icon}</div>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                variants={showAnimation}
                                                initial="hidden"
                                                animate="show"
                                                exit="hidden"
                                                className="link_text"
                                            >
                                                {route.name}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </NavLink>
                            );
                        })}
                        <div className="login-button">
                    {isLoggedIn ? (
                        <Button onClick={() => setShowLogoutModal(true)}>Logout</Button>
                    ) : (
                        <NavLink to="/login">
                            <Button>Login</Button>
                        </NavLink>
                    )}
                </div>
                    </section>
                </motion.div>
                <main className="m-0 p-0" style={{ width: '100%' }}>
                    {children}
                </main>
                
            </div>
            {/* Logout Confirmation Modal */}
            <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Logout Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to logout?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleLogout}>
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SideBar;
