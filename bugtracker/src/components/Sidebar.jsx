import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaHome, FaUser } from 'react-icons/fa';
import { FaCashRegister } from 'react-icons/fa6';
import { MdBugReport } from 'react-icons/md';
import { FcBusinessman } from "react-icons/fc";
import { FaBug } from 'react-icons/fa';
import { MdFeaturedVideo ,MdOutlineKeyboardDoubleArrowRight as Open, MdOutlineKeyboardDoubleArrowLeft  as Close} from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { FcAbout } from "react-icons/fc";
import { AiFillProject } from "react-icons/ai";
import { MdOutlineAssignment } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import SidebarMenu from './SidebarMenu';
import { useContext } from 'react';
import NoteContext from '../Context/NoteContext';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { IoIosLogIn } from "react-icons/io";


const SideBar = ({ children }) => {

    const contextdata = useContext(NoteContext);
    const { setUserInfo } = useContext(NoteContext);
    axios.defaults.headers.common['Authorization'] = contextdata.token;

    axios.defaults.withCredentials = true;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = contextdata.token;
        const role = contextdata.urole;
        setIsLoggedIn(!!token); // Check if token exists in localStorage
        setUserRole(role);
    }, [contextdata]);


    const handleLogout = () => {
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            user: null,
            urole: null,
            uid: null,
            token: null
        }));
        setShowLogoutModal(false);
        navigate("/AppInfo", { replace: true });
    };

    const toggle = () => setIsOpen(!isOpen);

    // Define routes based on user role
    const adminRoutes = [
        { path: '/BugReport', name: 'Dashboard', icon: <FaHome /> },
        { path: '/BugTracking', name: 'Bug Tracking', icon: <FaBug /> },
        { path: '/BugReg', name: 'Bug Registration', icon: <FaCashRegister /> },
        { path: '/Employee', name: 'Employee', icon: <FaUser /> },
        { path: '/Project', name: 'Project', icon: <AiFillProject /> },
        { path: '/Team', name: 'Team', icon: <RiTeamFill /> },
        { path: '/ProjectAssign', name: 'Project Assign', icon: <MdOutlineAssignment /> },
        {
            path: '/profile',
            name: 'Profile',
            icon: <FcBusinessman />,
            subRoutes: [
                { path: '/manage-account', name: 'Manage Account' }
            ],},
            // subRoutes: [
            //     { path: '/profile/Login', name: 'Login', icon: <IoIosLogIn /> },
            //     { path: '/profile/Logout', name: 'Logout' },
            // ],
        
    ];

    const userRoutes = [
        { path: '/BugReport', name: 'Dashboard', icon: <FaHome /> },
        { path: '/DevBugPortal', name: 'Bug Tracking', icon: <FaBug /> },
        { path: '/Profile', name: 'Profile', icon: <FcBusinessman />,
        subRoutes: [
            { path: '/my-projects', name: 'My Projects' },
            { path: '/my-teams', name: 'My Teams' },
            { path: '/manage-account', name: 'Manage Account' }
        ],
     },

    ];

    const testerRoutes = [
        { path: '/BugReport', name: 'Dashboard', icon: <FaHome /> },
        { path: '/BugReg', name: 'Bug Registr', icon: <FaBug /> },
        { path: '/TesterBugPortal', name: 'Bug Report', icon: <MdBugReport /> },
        { path: '/Profile', name: 'Profile', icon: <FcBusinessman />,
        subRoutes: [
            { path: '/my-projects', name: 'My Projects' },
            { path: '/my-teams', name: 'My Teams' },
            { path: '/manage-account', name: 'Manage Account' }
        ],},
    ];

    const guestRoutes = [
        { path: '/AppInfo', name: 'Feature', icon: <MdFeaturedVideo /> },
        { path: '/AppInfo', name: 'About Us', icon: <FcAbout /> },
        { path: '/Login', name: 'Login', icon: <IoIosLogIn /> }
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

            <Navbar expand="xxl" style={{ position: 'absolute', zIndex: 2, marginTop: "20px" }} >

                <Navbar.Toggle
                    aria-controls="basic-navbar-nav m-2"
                    style={{
                        margin: "2px",
                        backgroundColor: 'skyblue',
                        position: 'fixed',  // Change to 'fixed' to prevent movement
                        zIndex: 1
                    }}

                    icon={<FaBug />}
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <div className='row'>
                        <div className={isOpen ? 'col-12' : 'col-12'}>
                            <div className="main-container">

                                <motion.div
                                    animate={{
                                        width: isOpen ? '180px' : '80px',
                                        transition: {
                                            duration: 0.5,
                                            type: 'spring',
                                            damping: 10,
                                        },
                                    }}
                                    className={`sidebar `}
                                    style={{ backgroundColor: 'black' }}
                                >
                                    <div className="top_section mt-5 mr-0">
                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.h1
                                                    variants={showAnimation}
                                                    initial="hidden"
                                                    animate="show"
                                                    exit="hidden"
                                                    className="logo link_text"  style={{fontSize:'16px'}} onClick={toggle} 
                                                >Bug Tracker
                                                </motion.h1>
                                            )}
                                        </AnimatePresence>
                                        <div className="bars">
                                        {isOpen ? <Close style={{fontSize:"30px"}} onClick={toggle} />  :  <Open style={{fontSize:"30px"}}  onClick={toggle} /> }
                                        </div>
                                    </div>
                                    <Navbar.Collapse id="basic-navbar-nav" >
                                        <Nav className="mr-auto">
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
                                                            activeClassName="active" style={{ textDecoration: 'none' }}
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
                                                    <AnimatePresence>
                                                        {isOpen && (
                                                            <motion.div
                                                                variants={showAnimation}
                                                                initial="hidden"
                                                                animate="show"
                                                                exit="hidden"
                                                                className="link_text"
                                                            >
                                                                {isLoggedIn ? (
                                                                    <Button onClick={() => setShowLogoutModal(true)} style={{backgroundColor:'white',color:'black'}}>Logout</Button>
                                                                ) : (
                                                                    <></>
                                                                )}

                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>

                                                </div>
                                            </section>
                                        </Nav>
                                    </Navbar.Collapse>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </Navbar.Collapse>

            </Navbar>
            {/* <div className={isOpen ? 'offset-sm-2 col-10' : 'offset-sm-1 col-11 mt-4'}>
                <main className="" style={{ width: '100%' }}>
                    {children}
                </main>
            </div> */}

            {children}


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
