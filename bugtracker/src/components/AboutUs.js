/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./AboutUs.css";
import '@fortawesome/fontawesome-free/css/all.css';
import sachin from '../Img/Sachin.jpg';
import zainab from '../Img/Zainab.jpeg';
import rohan from '../Img/Rohan.png';

import "./Features.css";

function Services() {
    let message = `Our Bug Tracking Application was developed by a dedicated and talented team of growing professionals, each bringing unique skills and expertise to the project. We believe in collaboration, innovation, and a shared commitment to delivering a high-quality solution.`;
    return (
        <section class="section-white">

            <div class="container">

                <div class="row">

                    <div class="col-md-12 text-center border-info m-3" style={{backgroundColor: 'skyblue', borderRadius: '30px',}}>

                        <h2 class="section-title"><span className="p-3" style={{ fontSize:'0.8rem' }}>The Team Behind Bug Tracking Application</span></h2>

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
                            <div class="team-info"><p>UI Developer</p></div>
                            <p>Sachin is software developer proficient in
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

                            <div class="team-info"><p>SEO Specialist</p></div>

                            <p>Graduating with a degree in Spanish and English, Alexandra has always loved writing and now she’s lucky enough to do it as part of her new job inside our agency.</p>

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

                            <img src={rohan} class="team-img" alt="pic" />

                            <h3>Rohan Patinge</h3>

                            <div class="team-info"><p>Marketing Manager</p></div>

                            <p>Elisa first fell in love with digital marketing at the university. He loves to learn, and looks forward to being part of this new exciting industry for many years.</p>

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