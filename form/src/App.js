import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import UdyamNavbar from "./Navbar";
import "./App.css";
import Footer from "./Footer";

function App() {
  const [aadhaar, setAadhaar] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [pan, setPan] = useState("");
  const [orgType, setOrgType] = useState("");
  const [panName, setPanName] = useState("");
  const [dob, setDob] = useState("");
  const [agreeAadhaar, setAgreeAadhaar] = useState(false);
  const [agreePan, setAgreePan] = useState(false);

  const [showOtpSection, setShowOtpSection] = useState(false);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);
  const [showPanSection, setShowPanSection] = useState(false);

  const [errors, setErrors] = useState({});
  const API_BASE = "http://localhost:5000/api";

  useEffect(() => {
    const backToTopButton = document.querySelector('.back-to-top');

    const handleScroll = () => {
      if (window.scrollY > 100) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    };

    const handleClick = (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    window.addEventListener('scroll', handleScroll);
    backToTopButton.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      backToTopButton.removeEventListener('click', handleClick);
    };
  }, []); 


  // Validation helpers
  const validateAadhaarSection = () => {
    let newErrors = {};
    if (!aadhaar || aadhaar.length !== 12 || !/^\d{12}$/.test(aadhaar)) {
      newErrors.aadhaar = "Enter a valid 12-digit Aadhaar number.";
    }
    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!agreeAadhaar) {
      newErrors.consent = "You must agree to Aadhaar consent.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOtp = () => {
    if (!otp || otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      setErrors({ otp: "Enter a valid 6-digit OTP." });
      return false;
    }
    setErrors({});
    return true;
  };

  const validatePanSection = () => {
    let newErrors = {};
    if (!orgType) newErrors.orgType = "Select organisation type.";
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan)) {
      newErrors.pan = "Enter a valid 10-character PAN (e.g., ABCDE1234F).";
    }
    if (!panName.trim()) newErrors.panName = "Name as per PAN is required.";
    if (!dob) newErrors.dob = "Select Date of Birth/DOI.";
    if (!agreePan) newErrors.panConsent = "You must agree to PAN consent.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 1: Send OTP
  const handleSendOtp = async () => {
    if (!validateAadhaarSection()) return;

    try {
      const response = await axios.post(`${API_BASE}/send-otp`, {
        aadhaar_no: aadhaar,
        entrepreneur_name: name,
      });
      alert(`OTP sent successfully! Your OTP is ${response.data.otp}`);
      setShowOtpSection(true);
    } catch (error) {
      alert(error.response?.data?.error || "Error sending OTP");
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    if (!validateOtp()) return;

    try {
      const response = await axios.post(`${API_BASE}/verify-otp`, {
        aadhaar_no: aadhaar,
        otp: otp,
      });
      setShowOtpSection(false);
      setAadhaarVerified(true);
      setShowPanSection(true);
    } catch (error) {
      alert(error.response?.data?.error || "OTP verification failed");
    }
  };

  // Step 3: Submit full form (PAN Validate)
  const handleSubmit = async () => {
    if (!validatePanSection()) return;

    try {
      const response = await axios.post(`${API_BASE}/submit`, {
        aadhaar_no: aadhaar,
        entrepreneur_name: name,
        otp: otp,
        org_type: orgType,
        pan_number: pan,
        pan_holder_name: panName,
        dob: dob,
      });
      alert("Form submitted successfully!");
      console.log(response.data);
    } catch (error) {
      alert(error.response?.data?.error || "Submission failed");
    }
  };

  return (
    <div id="top" style={{backgroundColor: '#FFFFFF', minHeight: '100vh'}}>
      <UdyamNavbar />
      
      {/* Header Info Bar */}
      <div style={{
        backgroundColor: '#e9ecef',
        padding: '10px 0',
        marginTop: '50px',
        borderBottom: '1px solid #ddd',
        height:'50px'
      }}>
        <div className="container">
          <h6 className="mb-0 text-center" style={{color: '#1d1d1dff', fontWeight: '400', fontSize: '20px'}}>
            UDYAM REGISTRATION FORM - For New Enterprise who are not Registered yet as MSME
          </h6>
        </div>
      </div>

      <div className="container my-4">
        {/* Aadhaar Verification Section */}
        <div className="card shadow-sm mb-4" style={{
          border: '1px solid #dee2e6',
          borderRadius: '6px'
        }}>
          <div className="card-header" style={{
            backgroundColor: '#007BFF', 
            color: '#fff',
            fontWeight: 500, 
            fontSize: '14px', 
            letterSpacing: '0.3px', 
            padding: '10px 16px',
            borderTopLeftRadius: '6px',
            borderTopRightRadius: '6px'
          }}>
            Aadhaar Verification With OTP
          </div>
          <div className="card-body" style={{backgroundColor: 'white', padding: '18px'}}>
            {/* Input Fields Row */}
            <div className="row mb-4">
              <div className="col-md-6 mb-3">
                <label className="form-label" style={{fontWeight: '600', color: '#333', marginBottom: '8px', fontSize: '12px'}}>
                  1. Aadhaar Number/ आधार संख्या
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.aadhaar ? 'is-invalid' : ''}`}
                  placeholder="Your Aadhaar No"
                  value={aadhaar}
                  onChange={(e) => setAadhaar(e.target.value)}
                  readOnly={showPanSection}
                  style={{
                    height: '40px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '12px',
                    backgroundColor: showPanSection ? '#f1f1f1' : 'white',
                    color: showPanSection ? '#6c757d' : '#212529'
                  }}
                />
                {errors.aadhaar && <div className="invalid-feedback">{errors.aadhaar}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label" style={{fontWeight: '600', color: '#333', marginBottom: '8px', fontSize: '12px'}}>
                  2. Name of Entrepreneur / उद्यमी का नाम
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="Name as per Aadhaar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  readOnly={showPanSection}
                  style={{
                    height: '40px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '12px',
                    backgroundColor: showPanSection ? '#f1f1f1' : 'white',
                    color: showPanSection ? '#6c757d' : '#212529'
                  }}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>
            </div>

            {/* Information Points */}
            <div className="mb-4" style={{fontSize: '12px', color: '#000'}}>
              <ul className="mb-3" style={{paddingLeft: '20px'}}>
                <li className="mb-2">Aadhaar number shall be required for Udyam Registration.</li>
                <li className="mb-2">
                  The Aadhaar number shall be of the proprietor in the case of a proprietorship firm, of the managing partner in the case of a partnership firm and of a karta in the case of a Hindu Undivided Family (HUF).
                </li>
                <li className="mb-2">
                  In case of a Company or a Limited Liability Partnership or a Cooperative Society or a Society or a Trust, the organisation or its authorised signatory shall provide its GSTIN(As per applicability of CGST Act 2017 and as notified by the ministry of MSME{' '}
                  <a href="#" style={{color: '#2196F3', textDecoration: 'none'}}>
                    vide S.O. 1055(E) dated 05th March 2021
                  </a>
                  ) and PAN along with its Aadhaar number.
                </li>
              </ul>
            </div>

            {/* Consent Checkbox */}
            <div className="form-check mb-4">
              <input
                className={`form-check-input ${errors.consent ? 'is-invalid' : ''}`}
                type="checkbox"
                id="aadhaarConsent"
                checked={agreeAadhaar}
                onChange={() => setAgreeAadhaar(!agreeAadhaar)}
                readOnly={showPanSection} 
                style={{
                  marginTop: '4px',
                  accentColor: showPanSection ? '#d6d6d6' : '#0d6efd',
                  pointerEvents: showPanSection ? 'none' : 'auto',
                  fontSize: '12px'
                }}
              />
              <label 
                className="form-check-label" 
                htmlFor="aadhaarConsent" 
                style={{ fontSize: '12px', lineHeight: '1.5' }}
              >
                I, the holder of the above Aadhaar, hereby give my consent to Ministry of MSME, Government of India, for using my Aadhaar number as allotted by UIDAI for Udyam Registration. NIC / Ministry of MSME, Government of India, have informed me that my Aadhaar data will not be stored/shared. / मैं, आधार धारक, इस प्रकार उद्यम पंजीकरण के लिए यूआईडीएआई के साथ अपने आधार संख्या का उपयोग करने के लिए सू0ल0म0उ0 मंत्रालय, भारत सरकार को अपनी सहमति देता हूं। एनआईसी / सू0ल0म0उ0 मंत्रालय, भारत सरकार ने मुझे सूचित किया है कि मेरा आधार डेटा संग्रहीत / साझा नहीं किया जाएगा।
              </label>
              {errors.consent && (
                <div className="invalid-feedback d-block">{errors.consent}</div>
              )}
            </div>

            {/* Generate OTP Button */}
            {!showOtpSection && !showPanSection && (
              <button 
                className="btn btn-primary"
                onClick={handleSendOtp}
                style={{
                  backgroundColor: '#007BFF',
                  borderColor: '#007BFF',
                  padding: '8px 24px',
                  fontWeight: '600',
                  fontSize: '12px'
                }}
              >
                Validate & Generate OTP
              </button>
            )}

            {/* OTP Section */}
            {showOtpSection && !showPanSection && (
              <div className="border-top pt-4 mt-4">
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label" style={{ fontWeight: 700, color: 'black' }}>
                      <span style={{ color: '#d32f2f' }}>*</span> Enter One Time Password (OTP) Code
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.otp ? 'is-invalid' : ''}`}
                      placeholder="OTP code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength="6"
                      style={{
                        height: '40px',
                        border: '1px solid #ced4da',
                        borderRadius: '4px'
                      }}
                    />
                    {errors.otp && <div className="invalid-feedback">{errors.otp}</div>}
                    <small className="text-muted">OTP has been sent to **********</small>
                  </div>
                </div>
                <div className="mt-3">
                  <button 
                    className="btn btn-primary"
                    onClick={handleVerifyOtp}
                    style={{
                      backgroundColor: '#007BFF',
                      borderColor: '#007BFF',
                      padding: '8px 24px',
                      fontWeight: '600',
                      fontSize:'12px'
                    }}
                  >
                    Validate
                  </button>
                </div>
              </div>
            )}

            {/* Aadhaar Verified Success Message */}
            {showPanSection && (
              <div 
                style={{
                  color: '#057a20', 
                  marginTop: '20px',
                  fontWeight: 'bold'
                }}
              >
                Your Aadhaar has been successfully verified. You can continue Udyam Registration process.
              </div>
            )}
          </div>
        </div>

        {/* PAN Verification Section */}
        {showPanSection && (
          <div className="card shadow-sm mb-4" style={{border: '1px solid #dee2e6'}}>
            <div className="card-header" style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '14px',
              padding: '12px 20px'
            }}>
              PAN Verification
            </div>
            <div className="card-body" style={{backgroundColor: 'white', padding: '25px'}}>
              <div className="row mb-4">
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{fontWeight: '600', color: '#333', marginBottom: '8px', fontSize: '12px'}}>
                    3. Type of Organisation / संगठन के प्रकार
                  </label>
                  <select
                    className={`form-select ${errors.orgType ? 'is-invalid' : ''}`}
                    value={orgType}
                    onChange={(e) => setOrgType(e.target.value)}
                    style={{
                      height: '40px',
                      border: '1px solid #ced4da',
                      borderRadius: '4px',
                      color: orgType ? '#333' : '#6c757d',
                      fontSize: '10px'
                    }}
                  >
                    <option value="">Type of Organisation / संगठन के प्रकार</option>
                    <option value="Proprietary">1. Proprietary / एकल स्वामित्व</option>
                    <option value="Hindu Undivided Family">2. Hindu Undivided Family / हिंदू अविभाजित परिवार (एचयूएफ)</option>
                    <option value="Partnership">3. Partnership / पार्टनरशिप</option>
                    <option value="Co-Operative">4. Co-Operative / सहकारी</option>
                    <option value="Private Limited Company">5. Private Limited Company / प्राइवेट लिमिटेड कंपनी</option>
                    <option value="Public Limited Company">6. Public Limited Company / पब्लिक लिमिटेड कंपनी</option>
                    <option value="Self Help Group">7. Self Help Group / स्वयं सहायता समूह</option>
                    <option value="Limited Liability Partnership">8. Limited Liability Partnership / सीमित दायित्व भागीदारी</option>
                    <option value="Society">9. Society / सोसाइटी</option>
                    <option value="Trust">10. Trust / ट्रस्ट</option>
                    <option value="Others">11. Others / अन्य</option>
                  </select>
                  {errors.orgType && <div className="invalid-feedback">{errors.orgType}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{fontWeight: '600', color: '#333', marginBottom: '8px', fontSize: '12px'}}>
                    4.1 PAN / पैन
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.pan ? 'is-invalid' : ''}`}
                    placeholder="ENTER PAN NUMBER"
                    value={pan}
                    onChange={(e) => setPan(e.target.value.toUpperCase())}
                    style={{
                      height: '40px',
                      border: '1px solid #ced4da',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}
                  />
                  {errors.pan && <div className="invalid-feedback">{errors.pan}</div>}
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{fontWeight: '600', color: '#333', marginBottom: '8px', fontSize: '12px'}}>
                    4.1.1 Name of PAN Holder / पैन धारक का नाम
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.panName ? 'is-invalid' : ''}`}
                    placeholder="Name as per PAN"
                    value={panName}
                    onChange={(e) => setPanName(e.target.value)}
                    style={{
                      height: '40px',
                      border: '1px solid #ced4da',
                      borderRadius: '4px'
                    }}
                  />
                  {errors.panName && <div className="invalid-feedback">{errors.panName}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{fontWeight: '600', color: '#333', marginBottom: '8px', fontSize: '12px'}}>
                    4.1.2 DOB or DOI as per PAN / पैन के अनुसार जन्म तिथि या निगमन तिथि
                  </label>
                  <input
                    type="date"
                    className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    style={{
                      height: '40px',
                      border: '1px solid #ced4da',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}
                  />
                  {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
                </div>
              </div>

              {/* PAN Consent Checkbox */}
              <div className="form-check mb-4">
                <input
                  className={`form-check-input ${errors.panConsent ? 'is-invalid' : ''}`}
                  type="checkbox"
                  id="panConsent"
                  checked={agreePan}
                  onChange={() => setAgreePan(!agreePan)}
                  style={{ marginTop: '4px', fontSize: '12px' }}
                />
                <label className="form-check-label" htmlFor="panConsent" style={{ fontSize: '12px', lineHeight: '1.5' }}>
                  I, the holder of the above PAN, hereby give my consent to Ministry of MSME, Government of India, 
                  for using my data/ information available in the Income Tax Returns filed by me, and also the same 
                  available in the GST Returns and also from other Government organizations, for MSME classification 
                  and other official purposes, in pursuance of the MSMED Act, 2006.
                </label>
                {errors.panConsent && <div className="invalid-feedback d-block">{errors.panConsent}</div>}
              </div>
              <button 
                className="btn btn-primary"
                onClick={handleSubmit}
                style={{
                  backgroundColor: '007BFF',
                  borderColor: '#007BFF',
                  padding: '8px 24px',
                  fontWeight: '600'
                }}
              >
                PAN Validate
              </button>
            </div>
          </div>
        )}

        
      </div>
      
      {/* Footer Notice */}
      <div className="notice-container">
        <a href="#">
          Activities (NIC codes) not covered under MSMED Act, 2006 for Udyam Registration
        </a>
      </div>

      <Footer />

      <a 
        href="#top" 
        className="back-to-top" 
        style={{ marginBottom: '5%', display: 'inline' }}
      >
        <i className="fas fa-chevron-up"></i>
      </a>

      <button
        aria-label="Accessibility Options"
        id="uw-widget-custom-trigger"
        class="uw-widget-custom-trigger"
      >
        <i class="fas fa-universal-access icon"></i>
      </button>
    </div>
  );
}



export default App;