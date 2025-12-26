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
        otherMaritalStatus: "",
        nationality: "",
        state: "",
        lga: "",
        address: "",
        phone: "",
        email: "",
        nextOfKin: "",
        nextOfKinPhone: "",
        nextOfKinRelationship: "",
        
        // SECTION B: Position Applied For
        position: [],
        otherPosition: "",
        
        // SECTION C: Coaching Qualifications
        highestEducation: "",
        otherEducation: "",
        certifications: [],
        otherCertification: "",
        institutionAttended: "",
        courseOfStudy: "",
        yearObtained: "",
        
        // SECTION D: Coaching Experience
        yearsExperience: 0,
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
    const [passportPhotoPreview, setPassportPhotoPreview] = useState(null);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPreviewModal, setShowPreviewModal] = useState(false);

    const baseUrl = import.meta.env.VITE_BASE_URL;

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
        const file = e.target.files[0];
        setPassportPhoto(file);
        
        // Create preview URL
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPassportPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPassportPhotoPreview(null);
        }
    };

    const handleCertificateUpload = (e, index) => {
        const newCertificateFiles = [...certificateFiles];
        newCertificateFiles[index] = e.target.files[0];
        setCertificateFiles(newCertificateFiles);
    };

    const handleViewDetails = () => {      
        setErrorMessage("");
        
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
        
        // All validations passed, show preview modal
        setShowPreviewModal(true);
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to submit this application?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, submit",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        try {
            setLoading(true);
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
                fullname: "", dob: "", gender: "", maritalStatus: "", otherMaritalStatus: "", nationality: "", state: "", lga: "",
                address: "", phone: "", email: "", nextOfKin: "", nextOfKinRelationship: "", nextOfKinPhone: "", position: [], otherPosition: "",
                highestEducation: "", otherEducation: "", certifications: [], otherCertification: "", institutionAttended: "", courseOfStudy: "",
                yearObtained: "", yearsExperience: 0, previousClubs: "", achievements: "", preferredFormations: "",
                specialization: [], workWithYouths: "", workUnderPressure: "", availability: "", expectedSalary: 0,
                startDate: "", referee1Name: "", referee1Position: "", referee1Phone: "", referee2Name: "",
                referee2Position: "", referee2Phone: "", declaration: false
            });

            // Reset file states
            setCvFile(null);
            setApplicationLetterFile(null);
            setPassportPhoto(null);
            setPassportPhotoPreview(null);
            setCertificateFiles(Array(5).fill(null));

            // Close modal and navigate
            setShowPreviewModal(false);
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch(err) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.message || "Failed to submit, please try again",
            });
            console.log(err)
        } finally {
            setLoading(false);
        }
    };

    // Format data for display
    const formatArrayData = (array) => {
        if (!array || array.length === 0) return "None";
        return array.join(", ");
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Not specified";
        return new Date(dateString).toLocaleDateString();
    };

    // Preview Modal Component
    const PreviewModal = () => {
        if (!showPreviewModal) return null;

        return (
            <div className="preview-modal-overlay">
                <div className="preview-modal">
                    <div className="preview-modal-header">
                        <h2>Application Preview</h2>
                        <button 
                            className="close-modal-btn"
                            onClick={() => setShowPreviewModal(false)}
                        >
                            ×
                        </button>
                    </div>
                    
                    <div className="preview-modal-content">
                        <div className="preview-section">
                            <h3>Personal Information</h3>
                            <div className="preview-row">
                                <span className="preview-label">Full Name:</span>
                                <span className="preview-value">{formData.fullname || "Not specified"}</span>
                            </div>
                            <div className="preview-row">
                                <span className="preview-label">Date of Birth:</span>
                                <span className="preview-value">{formatDate(formData.dob)}</span>
                            </div>
                            <div className="preview-row">
                                <span className="preview-label">Gender:</span>
                                <span className="preview-value">{formData.gender || "Not specified"}</span>
                            </div>
                            <div className="preview-row">
                                <span className="preview-label">Email:</span>
                                <span className="preview-value">{formData.email || "Not specified"}</span>
                            </div>
                            <div className="preview-row">
                                <span className="preview-label">Phone:</span>
                                <span className="preview-value">{formData.phone || "Not specified"}</span>
                            </div>
                            <div className="preview-row">
                                <span className="preview-label">Marital Status:</span>
                                <span className="preview-value">{formData.maritalStatus || "Not specified"}{formData.otherMaritalStatus && <span>{formData.otherMaritalStatus}</span>}</span>
                            </div>
                            <div className="preview-row">
                                <span className="preview-label">Next of Kin:</span>
                                <span className="preview-value">{formData.nextOfKin || "Not specified"}</span>
                            </div>
                            <div className="preview-row">
                                <span className="preview-label">RelationShip:</span>
                                <span className="preview-value">{formData.nextOfKinRelationship || "Not specified"}</span>
                            </div>
                            <div className="preview-row">
                                <span className="preview-label">Next of Kin Phon No.:</span>
                                <span className="preview-value">{formData.nextOfKinPhone || "Not specified"}</span>
                            </div>
                            <div className="preview-row">
                                <span className="preview-label">Nationality:</span>
                                <span className="preview-value">{formData.nationality || "Not specified"}</span>
                            </div>
                            <div className="preview-row">
                                <span className="preview-label">State:</span>
                                <span className="preview-value">{formData.state || "Not specified"}</span>
                            </div>
                            <div className="preview-row">
                                <span className="preview-label">Local Government:</span>
                                <span className="preview-value">{formData.lga || "Not specified"}</span>
                            </div>
                        </div>

                        <div className="preview-section">
                            <h3>Position Applied For</h3>
                            <div className="preview-row">
                                <span className="preview-label">Positions:</span>
                                <span className="preview-value">{formatArrayData(formData.position)}</span>
                            </div>
                            {formData.otherPosition && (
                                <div className="preview-row">
                                    <span className="preview-label">Other Position:</span>
                                    <span className="preview-value">{formData.otherPosition}</span>
                                </div>
                            )}
                        </div>

                        <div className="preview-section">
                            <h3>Qualifications & Experience</h3>
                            <div className="preview-row">
                                <span className="preview-label">Highest Education:</span>
                                <span className="preview-value">{formData.highestEducation || "Not specified"}</span>
                            </div>
                            <div className="preview-row">
                                <span className="preview-label">Certifications:</span>
                                <span className="preview-value">{formatArrayData(formData.certifications)}</span>
                            </div>
                            <div className="preview-row">
                                <span className="preview-label">Years of Experience:</span>
                                <span className="preview-value">{formData.yearsExperience || "0"}</span>
                            </div>
                        </div>

                        <div className="preview-section">
                            <h3>Documents Uploaded</h3>
                            <div className="preview-row">
                                <span className="preview-label">CV:</span>
                                <span className="preview-value">{cvFile?.name || "Not uploaded"}</span>
                            </div>
                            <div className="preview-row">
                                <span className="preview-label">Application Letter:</span>
                                <span className="preview-value">{applicationLetterFile?.name || "Not uploaded"}</span>
                            </div>
                            
                            {/* Passport Photo Preview */}
                            <div className="preview-row">
                                <span className="preview-label">Passport Photo:</span>
                                <div className="preview-photo-container">
                                    <span className="preview-value">{passportPhoto?.name || "Not uploaded"}</span>
                                    {passportPhotoPreview && (
                                        <div className="passport-photo-preview">
                                            <img 
                                                src={passportPhotoPreview} 
                                                alt="Passport Preview" 
                                                className="passport-preview-img"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="preview-row">
                                <span className="preview-label">Certificates:</span>
                                <span className="preview-value">
                                    {certificateFiles.filter(f => f).map(f => f.name).join(", ") || "None uploaded"}
                                </span>
                            </div>
                        </div>

                        <div className="preview-section">
                            <h3>Technical & Professional Skills</h3>
                            <div className="preview-row">
                                <span className="preview-label">Preferred Playing Formation:</span>
                                <span className="preview-value">{formData.preferredFormations || "Not specified"}</span>
                            </div>
                            <div className="preview-row">
                                <span className="preview-label">Area of Specialization:</span>
                                <span className="preview-value">
                                    {formData.specialization.join(", ") || "Not specified"}
                                </span>
                            </div>
                            <div className="preview-row">
                                <span className="preview-label">Ability to Work with Youth:</span>
                                <span className="preview-value">{formData.workWithYouths}</span>
                            </div>
                            <div className="preview-row">
                                <span className="preview-label">Ability to Work under Pressure:</span>
                                <span className="preview-value">{formData.workUnderPressure}</span>
                            </div>
                        </div>

                        <div className="preview-section">
                            <h3>Availability & Salary</h3>
                            <div className="preview-row">
                                <span className="preview-label">Availability:</span>
                                <span className="preview-value">{formData.availability || "Not specified"}</span>
                            </div>
                            <div className="preview-row">
                                <span className="preview-label">Expected Salary:</span>
                                <span className="preview-value">
                                    {formData.expectedSalary ? `₦${formData.expectedSalary.toLocaleString()}` : "Not specified"}
                                </span>
                            </div>
                            <div className="preview-row">
                                <span className="preview-label">Start Date:</span>
                                <span className="preview-value">{formatDate(formData.startDate)}</span>
                            </div>
                        </div>

                        <div className="preview-section">
                            <h3>Referees</h3>
                            <div className="preview-row">
                                <span className="preview-label">Referee 1:</span>
                                <span className="preview-value">{formData.referee1Name || "Not specified"}</span>
                                <span className="preview-value">{formData.referee1Phone || "Not specified"}</span>
                                <span className="preview-value">{formData.referee1Position || "Not specified"}</span>
                            </div>
                            <div className="preview-row">
                                <span className="preview-label">Referee 2:</span>
                                <span className="preview-value">{formData.referee2Name || "Not specified"}</span>
                                <span className="preview-value">{formData.referee2Phone || "Not specified"}</span>
                                <span className="preview-value">{formData.referee2Position || "Not specified"}</span>
                            </div>
                        </div>

                        <div className="preview-section">
                            <h3>Declaration</h3>
                            <div className="preview-row">
                                <span className="preview-label">Agreed to Declaration:</span>
                                <span className="preview-value">{formData.declaration ? "Yes" : "No"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="preview-modal-footer">
                        <button 
                            className="preview-back-btn"
                            onClick={() => setShowPreviewModal(false)}
                        >
                            Back to Edit
                        </button>
                        <button 
                            className="preview-submit-btn"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit Application"}
                        </button>
                    </div>
                </div>
            </div>
        );
    };


    

    return (
        <>
            <div className='application-form'>
                <div className="form-header">
                    <Link to='/'>
                        <img src={logo} alt="TELU FC Logo" />
                    </Link>
                    <h1>TELU FOOTBALL CLUB</h1>
                    <h2>COACHES APPLICATION FORM</h2>
                </div>

                <form onSubmit={(e) => e.preventDefault()}>
                    {/* SECTION A: Personal Information */}
                    <section className="section">
                        <h3>SECTION A: PERSONAL INFORMATION</h3>
                        <div></div>
                        <label htmlFor="fullname">
                            Fullname:
                            <input type="text" name="fullname" placeholder="Full Name (Surname First)" 
                               value={formData.fullname} onChange={handleInput} />
                        </label>
                        <label htmlFor="phone">
                            Phone:
                            <input type="tel" name="phone" placeholder="Phone Number" 
                                value={formData.phone} onChange={handleInput}  />
                        </label>
                        <label htmlFor="email">
                            Email:
                            <input type="email" name="email" placeholder="Email Address" 
                                value={formData.email} onChange={handleInput}  />
                        </label>
                        <label htmlFor="dob">
                            Date Of Birth:
                             <input type="date" name="dob" placeholder="Date of Birth" 
                               value={formData.dob} onChange={handleInput} />
                        </label>
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
                            {formData.maritalStatus === "Other" && (
                                <input type="text" name="otherMaritalStatus" placeholder="Specify other marital status" 
                                       value={formData.otherMaritalStatus} onChange={handleInput} />
                            )}
                        </div>
                        <label htmlFor="nationality">
                            Nationality:
                            <input type="text" name="nationality" placeholder="Nationality" 
                               value={formData.nationality} onChange={handleInput} />
                        </label>
                        <label htmlFor="state">
                            State:
                            <input type="text" name="state" placeholder="State of Origin" 
                               value={formData.state} onChange={handleInput} />
                        </label>
                        <label htmlFor="lga">
                            Local Government Area:
                            <input type="text" name="lga" placeholder="Local Government Area" 
                               value={formData.lga} onChange={handleInput} />
                        </label>
                        <label htmlFor="address">
                            Residential Address:
                            <textarea name="address" placeholder="Residential Address" 
                                  value={formData.address} onChange={handleInput} rows="3"></textarea>
                        </label>
                        <label htmlFor="nextOfKin">
                            Next of Kin:
                            <input type="text" name="nextOfKin" placeholder="Next of Kin Name" 
                                value={formData.nextOfKin} onChange={handleInput} />
                        </label>
                        <label htmlFor="nextOfKinRelationship">
                            Relationship:
                            <input type="text" name="nextOfKinRelationship" placeholder="Relationship" 
                                value={formData.nextOfKinRelationship} onChange={handleInput} />
                        </label>
                        <label htmlFor="nextOfKinPhone">
                            Next of Kin Phone:
                            <input type="tel" name="nextOfKinPhone" placeholder="Next of Kin Phone Number" 
                                value={formData.nextOfKinPhone} onChange={handleInput} />
                        </label>
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
                        <div></div>                        
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
                        
                        <label htmlFor="institutionAttended">
                            Institution Attended:
                            <textarea type="text" name="institutionAttended" placeholder="Institution Attended" 
                                value={formData.institutionAttended} onChange={handleInput} />
                        </label>
                        <label htmlFor="courseOfStudy">
                            Course of Study:
                            <textarea type="text" name="courseOfStudy" placeholder="Course of Study" 
                                value={formData.courseOfStudy} onChange={handleInput} />
                        </label>
                        <label htmlFor="yearObtained">
                            Year Obtained:
                            <input type="text" name="yearObtained" placeholder="Year Obtained" 
                                value={formData.yearObtained} onChange={handleInput} />
                        </label>
                    </section>

                    {/* FILE UPLOAD SECTION */}
                    <section className="section">
                        <h3>DOCUMENT UPLOADS</h3>
                        <div></div>
                        
                        <div className="file-upload-group">
                            <label>Curriculum Vitae (CV):</label>
                            <input type="file"  onChange={handleCvUpload}  />
                            {cvFile && <span className="file-name">{cvFile.name}</span>}
                        </div>
                        
                        <div className="file-upload-group">
                            <label>Application Letter:</label>
                            <input type="file"  onChange={handleApplicationLetterUpload}  />
                            {applicationLetterFile && <span className="file-name">{applicationLetterFile.name}</span>}
                        </div>
                        
                        <div className="file-upload-group">
                            <label>Passport Photograph:</label>
                            <input type="file" accept="image/*" onChange={handlePassportPhotoUpload}  />
                            {passportPhoto && <span className="file-name">{passportPhoto.name}</span>}
                            {passportPhotoPreview && (
                                <div className="photo-preview-small">
                                    <img 
                                        src={passportPhotoPreview} 
                                        alt="Preview" 
                                        className="small-preview-img"
                                    />
                                    <span className="preview-text">Preview</span>
                                </div>
                            )}
                        </div>
                        
                        <div className="file-upload-group">
                            <label>Certificates (Upload at least 2 certificates):</label>
                            <div className="certificate-container">
                                {[1, 2, 3, 4, 5].map((num, index) => (
                                    <div key={index} className="certificate-upload">
                                        <label>Certificate {num}:</label>
                                        <input 
                                            type="file" 
                                            // accept=".pdf,.doc,.docx,.jpg,.png,.jpeg,.webp" 
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
                        <div></div>
                        <label htmlFor="yearsExperience">
                            Years of Coaching Experience:
                            <input type="number" name="yearsExperience" placeholder="Years of Coaching Experience" 
                                value={formData.yearsExperience === 0 ? "" : formData.yearsExperience} onChange={handleInput} min="0" />
                        </label>
                        <label htmlFor="previousClubs">
                            Previous Clubs/Teams Coached (Club/Team, Position Held, Period):
                            <textarea name="previousClubs" placeholder="" 
                                value={formData.previousClubs} onChange={handleInput} rows="4"></textarea>
                        </label>

                        <label htmlFor="achievements">
                            Major Achievements (if any)
                            <textarea name="achievements" placeholder="" 
                                value={formData.achievements} onChange={handleInput} rows="4"></textarea>
                        </label>
                    </section>

                    {/* SECTION E: Technical & Professional Skills */}
                    <section className="section">
                        <h3>SECTION E: TECHNICAL & PROFESSIONAL SKILLS</h3>
                        <div></div>
                        <label htmlFor="preferredFormations">
                            Preferred Playing Formation(s):
                            <input type="text" name="preferredFormations" placeholder="Preferred Playing Formation(s)" 
                                value={formData.preferredFormations} onChange={handleInput} />
                        </label>
                        <div style={{flexDirection: "column"}} className="checkbox-group">
                            <label style={{display: "block"}}>Area of Specialization:</label>
                            <div>
                                <label><input type="checkbox" name="specialization" value="Tactics" onChange={handleCheckbox} /> Tactics</label>
                                <label><input type="checkbox" name="specialization" value="Player Development" onChange={handleCheckbox} /> Player Development</label>
                                <label><input type="checkbox" name="specialization" value="Youth Coaching" onChange={handleCheckbox} /> Youth Coaching</label>
                                <label><input type="checkbox" name="specialization" value="Fitness & Conditioning" onChange={handleCheckbox} /> Fitness & Conditioning</label>
                                <label><input type="checkbox" name="specialization" value="Match Analysis" onChange={handleCheckbox} /> Match Analysis</label>
                                <label><input type="checkbox" name="specialization" value="Discipline & Team Management" onChange={handleCheckbox} /> Discipline & Team Management</label>
                            </div>
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
                        <div></div>
                        <div className="radio-group">
                            <label>Availability:</label>
                            <label><input type="radio" name="availability" value="Full Time" checked={formData.availability === "Full Time"} onChange={handleInput} /> Full Time</label>
                            <label><input type="radio" name="availability" value="Part Time" checked={formData.availability === "Part Time"} onChange={handleInput} /> Part Time</label>
                        </div>
                        <label htmlFor="expectedSalary">
                            Expected Monthly Salary (₦)
                            <input type="number" name="expectedSalary" placeholder="Expected Monthly Salary (₦)" 
                                value={formData.expectedSalary === 0 ? "" : formData.expectedSalary}  onChange={handleInput} min="0" />
                        </label>
                        <label htmlFor="startDate">
                            Date Available to Resume:
                            <input type="date" name="startDate" placeholder="Date Available to Resume" 
                                value={formData.startDate} onChange={handleInput} />
                        </label>
                    </section>

                    {/* SECTION G: Referees */}
                    <section className="section">
                        <h3>SECTION G: REFEREES</h3>
                        <div></div>
                        <div>
                            <h4>Referee 1</h4>
                            <input type="text" name="referee1Name" placeholder="Name" 
                                value={formData.referee1Name} onChange={handleInput} />
                            <input type="text" name="referee1Position" placeholder="Position" 
                                value={formData.referee1Position} onChange={handleInput} />
                            <input type="tel" name="referee1Phone" placeholder="Phone Number" 
                               value={formData.referee1Phone} onChange={handleInput} />
                        </div>
                        
                        <div>
                            <h4>Referee 2</h4>
                        <input type="text" name="referee2Name" placeholder="Name" 
                               value={formData.referee2Name} onChange={handleInput} />
                        <input type="text" name="referee2Position" placeholder="Position" 
                               value={formData.referee2Position} onChange={handleInput} />
                        <input type="tel" name="referee2Phone" placeholder="Phone Number" 
                               value={formData.referee2Phone} onChange={handleInput} />
                        </div>
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
                    <button type="button" onClick={handleViewDetails}>
                        View Details & Submit
                    </button>
                </form>
            </div>
            
            {/* Preview Modal */}
            <PreviewModal />
        </>
    );
};

export default ApplicationForm;