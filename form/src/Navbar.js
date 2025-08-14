import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./Navbar.css";

const UdyamNavbar = () => {
  return (
    <Navbar expand="lg" className="udyam-navbar fixed-top">
      <div className="navbar-inner">
        <div className="d-flex w-100 align-items-center">
          {/* Logo */}
          <Navbar.Brand
            href="https://udyamregistration.gov.in/Government-India/Ministry-MSME-registration.htm"
            className="udyam-logo me-auto"
          >
            <img
              src="/MINISTRY_NAME.webp"
              alt="Ministry Logo"
            />
          </Navbar.Brand>

          {/* Toggle for mobile */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Menu Items */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto h-100">
              <Nav.Link href="https://udyamregistration.gov.in/Government-India/Ministry-MSME-registration.htm" className="active">
                Home
              </Nav.Link>
              <Nav.Link href="https://udyamregistration.gov.in/docs/NIC-code-for-MSME-classification-definition.pdf" target="_blank">
                NIC Code
              </Nav.Link>

              {/* Useful Documents Dropdown */}
              <NavDropdown title="Useful Documents" id="useful-docs">
                <span className="underline"></span>
                <NavDropdown.Item href="https://udyamregistration.gov.in/msme-registration-process/free-government-portal.html">
                  Important
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="https://udyamregistration.gov.in/docs/Benefits_of_UR.pdf" target="_blank">
                  Udyam Registration Benefits <img src="/new.gif" alt="New" height="20" width="38" />
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="https://udyamregistration.gov.in/Highlights.aspx">
                  Site Highlights
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="https://udyamregistration.gov.in/Circular.aspx">
                  Circulars & Orders
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="https://udyamregistration.gov.in/docs/UdyamApplication.pdf" target="_blank">
                  Udyam Registration Sample form
                </NavDropdown.Item>
                <NavDropdown.Divider />
                
                {/* Nested Dropdown (requires custom CSS) */}
                <div className="dropdown-submenu">
                  <NavDropdown.Item as="a" href="#">
                    Udyam Registration Bulletin <img src="/new.gif" alt="New" height="20" width="38" />
                  </NavDropdown.Item>
                  <div className="dropdown-menu">
                    <NavDropdown.Item href="https://udyamregistration.gov.in/docs/Buletin-I-Analysis-of-Udyam-Registration-Data.pdf" target="_blank">Bulletin I</NavDropdown.Item>
                    <NavDropdown.Item href="https://udyamregistration.gov.in/docs/Buletin-II-Analysis-of-Udyam-Registration-Data.pdf" target="_blank">Bulletin II</NavDropdown.Item>
                    <NavDropdown.Item href="https://udyamregistration.gov.in/docs/Buletin-III-Analysis-of-Udyam-Registration-Data.pdf" target="_blank">Bulletin III</NavDropdown.Item>
                    <NavDropdown.Item href="https://udyamregistration.gov.in/docs/Buletin-IV-Analysis-of-Udyam-Registration-Data.pdf" target="_blank">Bulletin IV</NavDropdown.Item>
                    <NavDropdown.Item href="https://udyamregistration.gov.in/docs/Buletin-V-Analysis-of-Udyam-Registration-Data.pdf" target="_blank">Bulletin V</NavDropdown.Item>
                    <NavDropdown.Item href="https://udyamregistration.gov.in/docs/Buletin-VI-Analysis-of-Udyam-Registration-Data.pdf" target="_blank">Bulletin VI</NavDropdown.Item>
                    <NavDropdown.Item href="https://udyamregistration.gov.in/docs/Buletin-VII-Analysis-of-Udyam-Registration-Data.pdf" target="_blank">Bulletin VII <img src="/new.gif" alt="New" height="20" width="38" /></NavDropdown.Item>
                    <NavDropdown.Item href="https://udyamregistration.gov.in/docs/Buletin-VIII-Analysis-of-Udyam-Registration-Data.pdf" target="_blank">Bulletin VIII <img src="/new.gif" alt="New" height="20" width="38" /></NavDropdown.Item>
                  </div>
                </div>
                
                <NavDropdown.Divider />
                <NavDropdown.Item href="https://udyamregistration.gov.in/docs/Udyam_Metadata.pdf" target="_blank">
                  Metadata Compliance
                </NavDropdown.Item>
              </NavDropdown>

              {/* Print / Verify */}
              <NavDropdown title="Print / Verify" id="print-verify">
                <NavDropdown.Item href="https://udyamregistration.gov.in/Udyam_Login.aspx">
                  Print Udyam Certificate
                </NavDropdown.Item>
                <NavDropdown.Item href="https://udyamregistration.gov.in/Udyam_Verify.aspx">
                  Verify Udyam Registration Number <img src="/new.gif" alt="New" height="20" width="38" />
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="https://udyamregistration.gov.in/UA/PrintAcknowledgement_Pub.aspx">
                  Print UAM Certificate
                </NavDropdown.Item>
                <NavDropdown.Item href="https://udyamregistration.gov.in/UA/PrintApplication_Pub.aspx">
                  Print UAM Application
                </NavDropdown.Item>
                <NavDropdown.Item href="https://udyamregistration.gov.in/UA/UA_VerifyUAM.aspx">
                  Verify Udyog Aadhaar
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="https://udyamregistration.gov.in/ForgotRegNo.aspx">
                  Forgot Udyam/UAM No.
                </NavDropdown.Item>
              </NavDropdown>

              {/* Update Details */}
              <NavDropdown title="Update Details" id="update-details">
                <NavDropdown.Item href="https://udyamregistration.gov.in/Udyam_Login.aspx">
                  Update/Cancel Udyam Registration <img src="/new.gif" alt="New" height="20" width="38" />
                </NavDropdown.Item>
              </NavDropdown>

              {/* Login */}
              <NavDropdown title="Login" id="login-dropdown">
                <NavDropdown.Item href="https://udyamregistration.gov.in/Udyam_Officer_Login.aspx">
                  Officer's Login
                </NavDropdown.Item>
                <NavDropdown.Item href="https://udyamregistration.gov.in/Udyam_EFC_Login.aspx">
                  EFC's Login <img src="/new.gif" alt="New" height="20" width="38" />
                </NavDropdown.Item>
                <NavDropdown.Item href="https://udyamregistration.gov.in/Udyam_NSSH_Login.aspx">
                  NSSH Officer's Login <img src="/new.gif" alt="New" height="20" width="38" />
                </NavDropdown.Item>
                <NavDropdown.Item href="https://udyamregistration.gov.in/Udyam_Login.aspx">
                  Udyami Login
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </div>
      </div>
    </Navbar>
  );
};

export default UdyamNavbar;