import React, { useState } from 'react';
import "./css/ApplicationForm.css";
import logo from "../assets/telu logo.png";

import {Link, useNavigate} from "react-router-dom"

import Swal from "sweetalert2";


const ApplicationForm = () => {
    const [formData, setFormData] = useState({
        // SECTION A: Personal Information
        fullname: "",
        dob: "",
        gender: "",
        maritalStatus: "",
        nationality: "",
        state: "",
        lga: "",
        address: "",
        phone: "",
        email: "",
        nextOfKin: "",
        nextOfKinPhone: "",
        
        // SECTION B: Position Applied For
        position: [],
        otherPosition: "",
        
        // SECTION C: Coaching Qualifications
        highestEducation: "",
        otherEducation: "",
        certifications: [],
        otherCertification: "",
        issuingBody: "",
        yearObtained: "",
        
        // SECTION D: Coaching Experience
        yearsExperience: null,
        previousClubs: "",
        achievements: "",
        
        // SECTION E: Technical & Professional Skills
        preferredFormations: "",
        specialization: [],
        workWithYouths: "",
        workUnderPressure: "",
        
        // SECTION F: Availability & Remuneration
        availability: "",
        expectedSalary: 0,
        startDate: "",
        
        // SECTION G: Referees
        referee1Name: "",
        referee1Position: "",
        referee1Phone: "",
        referee2Name: "",
        referee2Position: "",
        referee2Phone: "",
        
        // SECTION H: Declaration
        declaration: false
    });

    // File upload states
    const [cvFile, setCvFile] = useState(null);
    const [applicationLetterFile, setApplicationLetterFile] = useState(null);
    const [passportPhoto, setPassportPhoto] = useState(null);
    const [certificateFiles, setCertificateFiles] = useState(Array(5).fill(null));
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false)

    const baseUrl = import.meta.env.VITE_BASE_URL

    const handleInput = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
            type === "checkbox"
                ? checked
                : type === "number"
                ? Number(value)
                : value
        }));

    };

    const handleCheckbox = (e) => {
        const { name, value, checked } = e.target;
        setFormData((prev) => {
            const currentValues = [...prev[name]];
            if (checked) {
                return { ...prev, [name]: [...currentValues, value] };
            } else {
                return { ...prev, [name]: currentValues.filter(item => item !== value) };
            }
        });
    };

    // File upload handlers
    const handleCvUpload = (e) => {
        setCvFile(e.target.files[0]);
    };

    const handleApplicationLetterUpload = (e) => {
        setApplicationLetterFile(e.target.files[0]);
    };

    const handlePassportPhotoUpload = (e) => {
        setPassportPhoto(e.target.files[0]);
    };

    const handleCertificateUpload = (e, index) => {
        const newCertificateFiles = [...certificateFiles];
        newCertificateFiles[index] = e.target.files[0];
        setCertificateFiles(newCertificateFiles);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to submit this application?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, submit",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;


        setErrorMessage("")
        
        // Basic validation
        if (!formData.fullname || !formData.email || !formData.phone) {
            setErrorMessage("Full Name, Email, and Phone are required.");
            return;
        }

        if (formData.position.length === 0) {
            setErrorMessage("Please select at least one position.");
            return;
        }


        // File validation
        if (!cvFile) {
            setErrorMessage("Please upload your CV.");
            return;
        }

        if (!applicationLetterFile) {
            setErrorMessage("Please upload your application letter.");
            return;
        }

        if (!passportPhoto) {
            setErrorMessage("Please upload your passport photograph.");
            return;
        }

        // Check at least two certificate is uploaded
        const uploadedCertificates = certificateFiles.filter(file => file !== null);
        if (uploadedCertificates.length <= 1) {
            setErrorMessage("Please upload at least two certificates.");
            return;
        }
        
        if (!formData.declaration) {
            setErrorMessage("You must agree to the declaration.");
            return;
        }

        try{
            setLoading(true)
            // Prepare FormData for file upload
            const submissionFormData = new FormData();
            
            // Add form fields
            Object.keys(formData).forEach(key => {
                if (key === 'certifications' || key === 'specialization') {
                    formData[key].forEach(val => submissionFormData.append(`${key}[]`, val));
                } else {
                    submissionFormData.append(key, formData[key]);
                }
            });

            // Add files
            submissionFormData.append('cv', cvFile);
            submissionFormData.append('applicationLetter', applicationLetterFile);
            submissionFormData.append('passportPhoto', passportPhoto);
            
            // Add certificate files
            certificateFiles.forEach((file, index) => {
                if (file) {
                    submissionFormData.append(`certificate${index + 1}`, file);
                }
            });

            
            

            const res = await fetch(`${baseUrl}/coach`, {
                method: "POST",
                body: submissionFormData
                // Note: Don't set Content-Type header for FormData, browser sets it automatically with boundary
            });

        
        

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Submission failed");
            
            Swal.fire({
                icon: "success",
                title: "Submitted!",
                text: "Your application has been sent successfully",
            });

            // Reset form
            setFormData({
                fullname: "", dob: "", gender: "", maritalStatus: "", nationality: "", state: "", lga: "",
                address: "", phone: "", email: "", nextOfKin: "", nextOfKinPhone: "", position: [], otherPosition: "",
                highestEducation: "", otherEducation: "", certifications: [], otherCertification: "", issuingBody: "",
                yearObtained: "", yearsExperience: null, previousClubs: "", achievements: "", preferredFormations: "",
                specialization: [], workWithYouths: "", workUnderPressure: "", availability: "", expectedSalary: 0,
                startDate: "", referee1Name: "", referee1Position: "", referee1Phone: "", referee2Name: "",
                referee2Position: "", referee2Phone: "", declaration: false
            });

            // Reset file states
            setCvFile(null);
            setApplicationLetterFile(null);
            setPassportPhoto(null);
            setCertificateFiles(Array(5).fill(null));

            setTimeout(()=>{
                navigate("/");
            }, 100)
        }catch(err){
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.message,
            });
        }finally{
            setLoading(false);
        }
        
    };

    return (
        <div className='application-form'>
            <div className="form-header">
                <Link to='/'>
                    <img src={logo} alt="TELU FC Logo" />
                </Link>
                <h1>TELU FOOTBALL CLUB</h1>
                <h2>COACHES APPLICATION FORM</h2>
            </div>

            <form onSubmit={handleSubmit}>
                {/* SECTION A: Personal Information */}
                <section className="section">
                    <h3>SECTION A: PERSONAL INFORMATION</h3>
                    <input type="text" name="fullname" placeholder="Full Name (Surname First)" 
                           value={formData.fullname} onChange={handleInput} />
                    <input type="date" name="dob" placeholder="Date of Birth" 
                           value={formData.dob} onChange={handleInput} />
                    <div className="radio-group">
                        <label>Gender:</label>
                        <label><input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleInput} /> Male</label>
                        <label><input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleInput} /> Female</label>
                    </div>
                    <div className="radio-group">
                        <label>Marital Status:</label>
                        <label><input type="radio" name="maritalStatus" value="Single" checked={formData.maritalStatus === "Single"} onChange={handleInput} /> Single</label>
                        <label><input type="radio" name="maritalStatus" value="Married" checked={formData.maritalStatus === "Married"} onChange={handleInput} /> Married</label>
                        <label><input type="radio" name="maritalStatus" value="Other" checked={formData.maritalStatus === "Other"} onChange={handleInput} /> Other</label>
                    </div>
                    <input type="text" name="nationality" placeholder="Nationality" 
                           value={formData.nationality} onChange={handleInput} />
                    <input type="text" name="state" placeholder="State of Origin" 
                           value={formData.state} onChange={handleInput} />
                    <input type="text" name="lga" placeholder="Local Government Area" 
                           value={formData.lga} onChange={handleInput} />
                    <textarea name="address" placeholder="Residential Address" 
                              value={formData.address} onChange={handleInput} rows="3"></textarea>
                    <input type="tel" name="phone" placeholder="Phone Number" 
                           value={formData.phone} onChange={handleInput}  />
                    <input type="email" name="email" placeholder="Email Address" 
                           value={formData.email} onChange={handleInput}  />
                    <input type="text" name="nextOfKin" placeholder="Next of Kin Name" 
                           value={formData.nextOfKin} onChange={handleInput} />
                    <input type="tel" name="nextOfKinPhone" placeholder="Next of Kin Phone Number" 
                           value={formData.nextOfKinPhone} onChange={handleInput} />
                </section>

                {/* SECTION B: Position Applied For */}
                <section className="section">
                    <h3>SECTION B: POSITION APPLIED FOR</h3>
                    <div className="checkbox-group">
                        <label><input type="checkbox" name="position" value="Head Coach" checked={formData.position.includes("Head Coach")} onChange={handleCheckbox} /> Head Coach</label>
                        <label><input type="checkbox" name="position" value="Assistant Coach" checked={formData.position.includes("Assistant Coach")} onChange={handleCheckbox} /> Assistant Coach</label>
                        <label><input type="checkbox" name="position" value="Goalkeeper Trainer" checked={formData.position.includes("Goalkeeper Trainer")} onChange={handleCheckbox} /> Goalkeeper Trainer</label>
                        <label><input type="checkbox" name="position" value="Fitness/Physical Trainer" checked={formData.position.includes("Fitness/Physical Trainer")} onChange={handleCheckbox} /> Fitness/Physical Trainer</label>
                        <label><input type="checkbox" name="position" value="Youth Development Coach" checked={formData.position.includes("Youth Development Coach")} onChange={handleCheckbox} /> Youth Development Coach</label>
                        <label><input type="checkbox" name="position" value="Technical Adviser" checked={formData.position.includes("Technical Adviser")} onChange={handleCheckbox} /> Technical Adviser</label>
                        <label><input type="checkbox" name="position" value="Other" checked={formData.position.includes("Other")} onChange={handleCheckbox} /> Other (Specify):</label>
                        {formData.position.includes("Other") && (
                            <input type="text" name="otherPosition" placeholder="Specify other position" 
                                value={formData.otherPosition} onChange={handleInput} />
                        )}
                    </div>
                </section>

                {/* SECTION C: Coaching Qualifications */}
                <section className="section">
                    <h3>SECTION C: COACHING QUALIFICATIONS</h3>
                    <div className="radio-group">
                        <label>Highest Educational Qualification:</label>
                        <label><input type="radio" name="highestEducation" value="SSCE" checked={formData.highestEducation === "SSCE"} onChange={handleInput} /> SSCE</label>
                        <label><input type="radio" name="highestEducation" value="OND" checked={formData.highestEducation === "OND"} onChange={handleInput} /> OND</label>
                        <label><input type="radio" name="highestEducation" value="HND" checked={formData.highestEducation === "HND"} onChange={handleInput} /> HND</label>
                        <label><input type="radio" name="highestEducation" value="B.Sc" checked={formData.highestEducation === "B.Sc"} onChange={handleInput} /> B.Sc</label>
                        <label><input type="radio" name="highestEducation" value="M.Sc" checked={formData.highestEducation === "M.Sc"} onChange={handleInput} /> M.Sc</label>
                        <label><input type="radio" name="highestEducation" value="Others" checked={formData.highestEducation === "Others"} onChange={handleInput} /> Others:</label>
                        {formData.highestEducation === "Others" && (
                            <input type="text" name="otherEducation" placeholder="Specify other qualification" 
                                   value={formData.otherEducation} onChange={handleInput} />
                        )}
                    </div>
                    
                    <div className="checkbox-group">
                        <label>Coaching Certifications:</label>
                        <label><input type="checkbox" name="certifications" value="NFF D License" onChange={handleCheckbox} /> NFF D License</label>
                        <label><input type="checkbox" name="certifications" value="NFF C License" onChange={handleCheckbox} /> NFF C License</label>
                        <label><input type="checkbox" name="certifications" value="NFF B License" onChange={handleCheckbox} /> NFF B License</label>
                        <label><input type="checkbox" name="certifications" value="CAF License" onChange={handleCheckbox} /> CAF License</label>
                        <label><input type="checkbox" name="certifications" value="FIFA License" onChange={handleCheckbox} /> FIFA License</label>
                        <label><input type="checkbox" name="certifications" value="Other" onChange={handleCheckbox} /> Other (Specify):</label>
                        {formData.certifications.includes("Other") && (
                            <input type="text" name="otherCertification" placeholder="Specify other certification" 
                                   value={formData.otherCertification} onChange={handleInput} />
                        )}
                    </div>
                    
                    <input type="text" name="issuingBody" placeholder="Issuing Body" 
                           value={formData.issuingBody} onChange={handleInput} />
                    <input type="text" name="yearObtained" placeholder="Year Obtained" 
                           value={formData.yearObtained} onChange={handleInput} />
                </section>

                {/* FILE UPLOAD SECTION */}
                <section className="section">
                    <h3>DOCUMENT UPLOADS</h3>
                    
                    <div className="file-upload-group">
                        <label>Curriculum Vitae (CV)*:</label>
                        <input type="file" accept=".pdf,.doc,.docx" onChange={handleCvUpload}  />
                        {cvFile && <span className="file-name">{cvFile.name}</span>}
                    </div>
                    
                    <div className="file-upload-group">
                        <label>Application Letter*:</label>
                        <input type="file" accept=".pdf,.doc,.docx" onChange={handleApplicationLetterUpload}  />
                        {applicationLetterFile && <span className="file-name">{applicationLetterFile.name}</span>}
                    </div>
                    
                    <div className="file-upload-group">
                        <label>Passport Photograph*:</label>
                        <input type="file" accept="image/*" onChange={handlePassportPhotoUpload}  />
                        {passportPhoto && <span className="file-name">{passportPhoto.name}</span>}
                    </div>
                    
                    <div className="file-upload-group">
                        <label>Certificates (Upload up to 5 certificates):</label>
                        <div className="certificate-container">
                            {[1, 2, 3, 4, 5].map((num, index) => (
                                <div key={index} className="certificate-upload">
                                    <label>Certificate {num}:</label>
                                    <input 
                                        type="file" 
                                        accept=".pdf,.jpg,.jpeg,.png" 
                                        onChange={(e) => handleCertificateUpload(e, index)} 
                                    />
                                    {certificateFiles[index] && (
                                        <span className="file-name">{certificateFiles[index].name}</span>
                                    )}
                                </div>                            
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION D: Coaching Experience */}
                <section className="section">
                    <h3>SECTION D: COACHING EXPERIENCE</h3>
                    <input type="number" name="yearsExperience" placeholder="Years of Coaching Experience" 
                        value={formData.yearsExperience} onChange={handleInput} min="0" />
                    <textarea name="previousClubs" placeholder="Previous Clubs/Teams Coached (Club/Team, Position Held, Period)" 
                        value={formData.previousClubs} onChange={handleInput} rows="4"></textarea>
                    <textarea name="achievements" placeholder="Major Achievements (if any)" 
                        value={formData.achievements} onChange={handleInput} rows="4"></textarea>
                </section>

                {/* SECTION E: Technical & Professional Skills */}
                <section className="section">
                    <h3>SECTION E: TECHNICAL & PROFESSIONAL SKILLS</h3>
                    <input type="text" name="preferredFormations" placeholder="Preferred Playing Formation(s)" 
                           value={formData.preferredFormations} onChange={handleInput} />
                    <div className="checkbox-group">
                        <label>Area of Specialization:</label>
                        <label><input type="checkbox" name="specialization" value="Tactics" onChange={handleCheckbox} /> Tactics</label>
                        <label><input type="checkbox" name="specialization" value="Player Development" onChange={handleCheckbox} /> Player Development</label>
                        <label><input type="checkbox" name="specialization" value="Youth Coaching" onChange={handleCheckbox} /> Youth Coaching</label>
                        <label><input type="checkbox" name="specialization" value="Fitness & Conditioning" onChange={handleCheckbox} /> Fitness & Conditioning</label>
                        <label><input type="checkbox" name="specialization" value="Match Analysis" onChange={handleCheckbox} /> Match Analysis</label>
                        <label><input type="checkbox" name="specialization" value="Discipline & Team Management" onChange={handleCheckbox} /> Discipline & Team Management</label>
                    </div>
                    <div className="radio-group">
                        <label>Ability to work with youths:</label>
                        <label><input type="radio" name="workWithYouths" value="Yes" checked={formData.workWithYouths === "Yes"} onChange={handleInput} /> Yes</label>
                        <label><input type="radio" name="workWithYouths" value="No" checked={formData.workWithYouths === "No"} onChange={handleInput} /> No</label>
                    </div>
                    <div className="radio-group">
                        <label>Ability to work under pressure:</label>
                        <label><input type="radio" name="workUnderPressure" value="Yes" checked={formData.workUnderPressure === "Yes"} onChange={handleInput} /> Yes</label>
                        <label><input type="radio" name="workUnderPressure" value="No" checked={formData.workUnderPressure === "No"} onChange={handleInput} /> No</label>
                    </div>
                </section>

                {/* SECTION F: Availability & Remuneration */}
                <section className="section">
                    <h3>SECTION F: AVAILABILITY & REMUNERATION</h3>
                    <div className="radio-group">
                        <label>Availability:</label>
                        <label><input type="radio" name="availability" value="Full Time" checked={formData.availability === "Full Time"} onChange={handleInput} /> Full Time</label>
                        <label><input type="radio" name="availability" value="Part Time" checked={formData.availability === "Part Time"} onChange={handleInput} /> Part Time</label>
                    </div>
                    <input type="number" name="expectedSalary" placeholder="Expected Monthly Salary (₦)" 
                        value={formData.expectedSalary} onChange={handleInput} min="0" />
                    <input type="date" name="startDate" placeholder="Date Available to Resume" 
                        value={formData.startDate} onChange={handleInput} />
                </section>

                {/* SECTION G: Referees */}
                <section className="section">
                    <h3>SECTION G: REFEREES</h3>
                    <h4>Referee 1</h4>
                    <input type="text" name="referee1Name" placeholder="Name" 
                           value={formData.referee1Name} onChange={handleInput} />
                    <input type="text" name="referee1Position" placeholder="Position" 
                           value={formData.referee1Position} onChange={handleInput} />
                    <input type="tel" name="referee1Phone" placeholder="Phone Number" 
                           value={formData.referee1Phone} onChange={handleInput} />
                    
                    <h4>Referee 2</h4>
                    <input type="text" name="referee2Name" placeholder="Name" 
                           value={formData.referee2Name} onChange={handleInput} />
                    <input type="text" name="referee2Position" placeholder="Position" 
                           value={formData.referee2Position} onChange={handleInput} />
                    <input type="tel" name="referee2Phone" placeholder="Phone Number" 
                           value={formData.referee2Phone} onChange={handleInput} />
                </section>

                {/* SECTION H: Declaration */}
                <section className="section">
                    <h3>SECTION H: DECLARATION</h3>
                    <div className="declaration">
                        <p>
                            I hereby declare that the information provided above is true and correct to the best of my knowledge. 
                            I understand that any false information may lead to disqualification or termination of appointment.
                        </p>
                        <label className="declaration-checkbox">
                            <input type="checkbox" name="declaration" checked={formData.declaration} onChange={handleInput} />
                            I agree to the declaration above
                        </label>
                    </div>
                </section>

                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit">{loading ? "Submitting..." : "Submit Application"}</button>
            </form>
        </div>
    )
}

export default ApplicationForm;