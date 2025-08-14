import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            {/* Left Section */}
            <div className="col-lg-4 col-md-6 footer-contact">
              <h3 className="footer-titlee">UDYAM REGISTRATION</h3>
              <p>
                Ministry of MSME <br />
                Udyog bhawan - New Delhi <br />
                <br />
                <strong>Email:</strong> champions@gov.in <br />
                <br />
                <strong>
                  <a href="https://udyamregistration.gov.in/ContactUs.aspx">
                    Contact Us
                  </a>
                </strong>
                <br />
                <strong>
                  <a
                    href="https://champions.gov.in/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    For Grievances / Problems
                  </a>
                </strong>
              </p>
            </div>

            {/* Middle Section */}
            <div className="col-lg-4 col-md-6 footer-links">
              <h4 className="footer-title">Our Services</h4>
              <ul>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <a href="https://champions.gov.in/">CHAMPIONS</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <a href="https://samadhaan.msme.gov.in/">MSME Samadhaan</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <a href="https://sambandh.msme.gov.in/">MSME Sambandh</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <a href="https://dashboard.msme.gov.in/">MSME Dashboard</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <a href="https://msmedi.dcmsme.gov.in/">
                    Entrepreneurship Skill Development Programme (ESDP)
                  </a>
                </li>
              </ul>
            </div>

            {/* Right Section */}
            <div className="col-lg-4 col-md-6 footer-video">
              <h4 className="footer-title">Video</h4>
              <video controls width="100%" poster="/videos/udyam.png">
                <source src="/videos/udyam.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="container">
          <hr className="footer-divider" />
          <div className="footer-bottom-row">
            <div className="footer-text">
              <p>
                © Copyright <strong>Udyam Registration</strong>. All Rights
                Reserved, Website Content Managed by Ministry of Micro Small and
                Medium Enterprises, GoI
              </p>
              <p>
                Website hosted &amp; managed by{" "}
                <a href="http://home.nic.in/" target="_blank" rel="noreferrer">
                  National Informatics Centre
                </a>
                ,{" "}
                <a href="http://deity.gov.in/" target="_blank" rel="noreferrer">
                  Ministry of Communications and IT
                </a>
                ,{" "}
                <a href="http://india.gov.in/" target="_blank" rel="noreferrer">
                  Government of India
                </a>
              </p>
            </div>
            <div className="social-links">
              <a
                href="https://twitter.com/minmsme"
                className="twitter"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://www.facebook.com/minmsme"
                className="facebook"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com/minmsme/"
                className="instagram"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      
    </footer>
  );
};

export default Footer;
