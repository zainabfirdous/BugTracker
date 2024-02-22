/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./AboutUs.css";
import '@fortawesome/fontawesome-free/css/all.css';
import sachin from '../Img/Sachin.jpg';
import zainab from '../Img/Zainab.jpeg';
import rohan from '../Img/Rohan.png';
import Anushka from '../Img/Anushka.jpg';
import Veena from '../Img/Veena.jpeg';

import "./Features.css";

function Services() {
    let message = `Our Bug Tracking Application was developed by a dedicated and talented team of growing professionals, each bringing unique skills and expertise to the project. We believe in collaboration, innovation, and a shared commitment to delivering a high-quality solution.`;
    return (
        <section class="section-white">

            <div class="container">

                <div class="row">

                    <div class="col-md-12 text-center border-info m-3" style={{ backgroundColor: 'skyblue', borderRadius: '30px', }}>

                        <h2 class="section-title"><span className="p-3" style={{ fontSize: '0.8rem' }}>The Team Behind Bug Tracking Application</span></h2>

                    </div>

                    <div class="offset-lg-3 col-md-12 col-lg-6 efficient" >

                        <div class="quote-container">
                            <p class="quote-text">{message}</p>
                        </div>
                    </div>


                    <div class="col-sm-6 col-md-4">

                        <div class="team-item">

                            <img src={sachin} class="team-img" alt="pic" />
                            <h3>Sachin Patidar</h3>
                            <div class="team-info"><p>UX Developer</p></div>
                            <p style={{ textAlign: 'justify' }}>Software developer proficient in
                                React and Node.js development. Additionally, He has expertise in UI functionality and REST APIs, with experience in
                                ADO Dot Net, Spring Boot, and Express.</p>

                            <ul class="team-icon">

                                <li><a href="#" class="twitter"><i class="fa-brands fa-twitter"></i></a></li>

                                <li><a href="#" class="pinterest"><i class="fa-brands fa-pinterest"></i></a></li>

                                <li><a href="#" class="facebook"><i class="fa-brands fa-facebook"></i></a></li>

                                <li><a href="#" class="dribble"><i class="fa-brands fa-linkedin"></i></a></li>

                            </ul>


                        </div>
                    </div>

                    <div class="col-sm-6 col-md-4">

                        <div class="team-item">

                            <img src={zainab} class="team-img" alt="pic" />

                            <h3>Zainab Firdous</h3>

                            <div class="team-info"><p>Backend Developer</p></div>

                            <p style={{ textAlign: 'justify' }}> Software developer proficient in React and Node.js development.
                                She has expertise in database designing, and RestAPIs with experience in .Net, Java and Express</p>

                            <ul class="team-icon">

                                <li><a href="#" class="twitter"><i class="fa-brands fa-twitter"></i></a></li>

                                <li><a href="#" class="pinterest"><i class="fa-brands fa-pinterest"></i></a></li>

                                <li><a href="#" class="facebook"><i class="fa-brands fa-facebook"></i></a></li>

                                <li><a href="#" class="dribble"><i class="fa-brands fa-linkedin"></i></a></li>

                            </ul>

                        </div>

                    </div>

                    <div class="col-sm-6 col-md-4">

                        <div class="team-item">

                            <img src={Anushka} class="team-img" alt="pic" />

                            <h3>Anushka Bajpai</h3>

                            <div class="team-info"><p>UI Developer</p></div>

                            <p style={{ textAlign: 'justify' }}>A passionate front-end developer dedicated to crafting visually stunning and highly functional web experiences. With a keen eye for design and a strong command of modern web technologies.</p>

                            <ul class="team-icon">

                                <li><a href="#" class="twitter"><i class="fa-brands fa-twitter"></i></a></li>

                                <li><a href="#" class="pinterest"><i class="fa-brands fa-pinterest"></i></a></li>

                                <li><a href="#" class="facebook"><i class="fa-brands fa-facebook"></i></a></li>

                                <li><a href="#" class="dribble"><i class="fa-brands fa-linkedin"></i></a></li>
                            </ul>

                        </div>
                    </div>
                    <div class="offset-lg-2 col-sm-6 col-md-4">

                        <div class="team-item">

                            <img src={rohan} class="team-img" alt="pic" />

                            <h3>Rohan Patinge</h3>

                            <div class="team-info"><p>MERN Developer</p></div>

                            <p style={{ textAlign: 'justify' }}>Software developer proficient in React and Node development. He has expertise in UI functionality with experience in Java, C++, and Node.js.<br></br>.</p>

                            <ul class="team-icon">

                                <li><a href="#" class="twitter"><i class="fa-brands fa-twitter"></i></a></li>

                                <li><a href="#" class="pinterest"><i class="fa-brands fa-pinterest"></i></a></li>

                                <li><a href="#" class="facebook"><i class="fa-brands fa-facebook"></i></a></li>

                                <li><a href="#" class="dribble"><i class="fa-brands fa-linkedin"></i></a></li>
                            </ul>

                        </div>

                    </div>
                    <div class="col-sm-6 col-md-4">

                        <div class="team-item">

                            <img src={Veena} class="team-img" alt="pic" />

                            <h3>Veena Dubey</h3>

                            <div class="team-info"><p>UI Developer</p></div>

                            <p style={{ textAlign: 'justify' }}>Passion for Full Stack Developer, with a
                                solid foundation in MERN
                                stack(MongoDB,Express.js,React.js,Node.js). Proven ability to
                                design, develop, and maintain user-friendly, scalable, and
                                performant web applications.</p>

                            <ul class="team-icon">

                                <li><a href="#" class="twitter"><i class="fa-brands fa-twitter"></i></a></li>

                                <li><a href="#" class="pinterest"><i class="fa-brands fa-pinterest"></i></a></li>

                                <li><a href="#" class="facebook"><i class="fa-brands fa-facebook"></i></a></li>

                                <li><a href="#" class="dribble"><i class="fa-brands fa-linkedin"></i></a></li>

                            </ul>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    )
}

export default Services;