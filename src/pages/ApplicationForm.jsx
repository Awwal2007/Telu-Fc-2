import React, { useState } from 'react';
import "./css/ApplicationForm.css";
import logo from "../assets/telu logo.png";

import {Link} from "react-router-dom"
import { toast } from 'sonner';

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
        position: "",
        otherPosition: "",
        
        // SECTION C: Coaching Qualifications
        highestEducation: "",
        otherEducation: "",
        certifications: [],
        otherCertification: "",
        issuingBody: "",
        yearObtained: "",
        
        // SECTION D: Coaching Experience
        yearsExperience: "",
        previousClubs: "",
        achievements: "",
        
        // SECTION E: Technical & Professional Skills
        preferredFormations: "",
        specialization: [],
        workWithYouths: "",
        workUnderPressure: "",
        
        // SECTION F: Availability & Remuneration
        availability: "",
        expectedSalary: "",
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

    const [errorMessage, setErrorMessage] = useState("");

    const handleInput = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage("")
        
        // Basic validation
        if (!formData.fullname || !formData.email || !formData.phone) {
            setErrorMessage("Full Name, Email, and Phone are required.");
            return;
        }
        
        if (!formData.declaration) {
            setErrorMessage("You must agree to the declaration.");
            return;
        }

        // Prepare data for submission
        const submissionData = {
            ...formData,
            certifications: formData.certifications.join(', '),
            specialization: formData.specialization.join(', ')
        };

        const res = await fetch("http://localhost:500/api/coach", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(submissionData)
        });

        const data = await res.json();

        if (data.status === "success") {
            toast.success("Application submitted successfully!");
            // Reset form
            setFormData({
                fullname: "", dob: "", gender: "", maritalStatus: "", nationality: "", state: "", lga: "",
                address: "", phone: "", email: "", nextOfKin: "", nextOfKinPhone: "", position: "", otherPosition: "",
                highestEducation: "", otherEducation: "", certifications: [], otherCertification: "", issuingBody: "",
                yearObtained: "", yearsExperience: "", previousClubs: "", achievements: "", preferredFormations: "",
                specialization: [], workWithYouths: "", workUnderPressure: "", availability: "", expectedSalary: "",
                startDate: "", referee1Name: "", referee1Position: "", referee1Phone: "", referee2Name: "",
                referee2Position: "", referee2Phone: "", declaration: false
            });
            
            setTimeout(()=>{
                location.href = "/"
            }, 100)
        } else {
            setErrorMessage(data.message || "Submission failed. Please try again.");
        }        
        location.href = "/"

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
                           value={formData.fullname} onChange={handleInput} required />
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
                           value={formData.phone} onChange={handleInput} required />
                    <input type="email" name="email" placeholder="Email Address" 
                           value={formData.email} onChange={handleInput} required />
                    <input type="text" name="nextOfKin" placeholder="Next of Kin Name" 
                           value={formData.nextOfKin} onChange={handleInput} />
                    <input type="tel" name="nextOfKinPhone" placeholder="Next of Kin Phone Number" 
                           value={formData.nextOfKinPhone} onChange={handleInput} />
                </section>

                {/* SECTION B: Position Applied For */}
                <section className="section">
                    <h3>SECTION B: POSITION APPLIED FOR</h3>
                    <div className="checkbox-group">
                        <label><input type="checkbox" name="position" value="Head Coach" onChange={handleCheckbox} /> Head Coach</label>
                        <label><input type="checkbox" name="position" value="Assistant Coach" onChange={handleCheckbox} /> Assistant Coach</label>
                        <label><input type="checkbox" name="position" value="Goalkeeper Trainer" onChange={handleCheckbox} /> Goalkeeper Trainer</label>
                        <label><input type="checkbox" name="position" value="Fitness/Physical Trainer" onChange={handleCheckbox} /> Fitness/Physical Trainer</label>
                        <label><input type="checkbox" name="position" value="Youth Development Coach" onChange={handleCheckbox} /> Youth Development Coach</label>
                        <label><input type="checkbox" name="position" value="Technical Adviser" onChange={handleCheckbox} /> Technical Adviser</label>
                        <label><input type="checkbox" name="position" value="Other" onChange={handleCheckbox} /> Other (Specify):</label>
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

                <p className="error-message">{errorMessage}</p>
                <button type="submit">Submit Application</button>
            </form>
        </div>
    )
}

export default ApplicationForm;