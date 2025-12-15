import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlayerSignup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    state: '',
    lga: '',
    address: '',
    phone: '',
    email: '',
    emergencyContact: '',
    emergencyPhone: '',
    
    // Player Details
    position: [],
    preferredPositions: [],
    jerseyNumber: '',
    height: '',
    weight: '',
    dominantFoot: '',
    
    // Football Background
    previousClubs: '',
    yearsOfExperience: '',
    achievements: '',
    specialSkills: [],
    
    // Medical Information
    medicalConditions: '',
    allergies: '',
    bloodGroup: '',
    
    // Parent/Guardian Information (for minors)
    guardianName: '',
    guardianPhone: '',
    guardianEmail: '',
    guardianRelationship: '',
    
    // Agreement
    agreeToTerms: false,
    consentForPhotos: false,
    consentForData: false
  });

  const [errors, setErrors] = useState({});

  const positions = [
    'Goalkeeper',
    'Center Back',
    'Right Back', 
    'Left Back',
    'Defensive Midfielder',
    'Central Midfielder',
    'Attacking Midfielder',
    'Right Winger',
    'Left Winger',
    'Striker'
  ];

  const skills = [
    'Dribbling',
    'Shooting',
    'Passing',
    'Heading',
    'Tackling',
    'Speed',
    'Stamina',
    'Vision',
    'Free Kicks',
    'Penalty Taking'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'position' || name === 'preferredPositions' || name === 'specialSkills') {
        setFormData(prev => ({
          ...prev,
          [name]: checked 
            ? [...prev[name], value]
            : prev[name].filter(item => item !== value)
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.emergencyContact) newErrors.emergencyContact = 'Emergency contact is required';
      if (!formData.emergencyPhone) newErrors.emergencyPhone = 'Emergency phone is required';
    }
    
    if (step === 2) {
      if (formData.position.length === 0) newErrors.position = 'Select at least one position';
      if (!formData.height) newErrors.height = 'Height is required';
      if (!formData.weight) newErrors.weight = 'Weight is required';
      if (!formData.dominantFoot) newErrors.dominantFoot = 'Dominant foot is required';
    }
    
    if (step === 3) {
      if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Years of experience is required';
    }
    
    if (step === 4) {
      if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
    }
    
    if (step === 5) {
      if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
      if (!formData.consentForData) newErrors.consentForData = 'You must consent to data processing';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateStep()) {
      try {
        // Here you would typically send the data to your backend
        const response = await fetch('http://localhost:5000/api/players/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
        
        if (response.ok) {
          const result = await response.json();
          alert('Registration successful! You will be contacted soon.');
          navigate('/');
        } else {
          throw new Error('Registration failed');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Registration failed. Please try again.');
      }
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const isMinor = formData.dateOfBirth && calculateAge(formData.dateOfBirth) < 18;

  return (
    <div className="player-signup-container">
      <div className="signup-header">
        <div className="logo-section">
          <h1>Player Registration</h1>
          <p>Join our football club</p>
        </div>
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
          <div className="progress-steps">
            {[1, 2, 3, 4, 5].map((stepNum) => (
              <div 
                key={stepNum} 
                className={`progress-step ${stepNum === step ? 'active' : ''} ${stepNum < step ? 'completed' : ''}`}
              >
                <div className="step-number">{stepNum}</div>
                <div className="step-label">
                  {stepNum === 1 && 'Personal'}
                  {stepNum === 2 && 'Player Info'}
                  {stepNum === 3 && 'Experience'}
                  {stepNum === 4 && 'Medical'}
                  {stepNum === 5 && 'Agreement'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="signup-form">
        
        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div className="form-step">
            <h2>Personal Information</h2>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={errors.fullName ? 'error' : ''}
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth *</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={errors.dateOfBirth ? 'error' : ''}
                />
                {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
                {formData.dateOfBirth && (
                  <span className="age-display">Age: {calculateAge(formData.dateOfBirth)} years</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="gender">Gender *</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={errors.gender ? 'error' : ''}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.gender && <span className="error-message">{errors.gender}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="nationality">Nationality</label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  placeholder="Your nationality"
                />
              </div>

              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State of residence"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lga">LGA</label>
                <input
                  type="text"
                  id="lga"
                  name="lga"
                  value={formData.lga}
                  onChange={handleChange}
                  placeholder="Local Government Area"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Your residential address"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="080XXXXXXXX"
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="emergencyContact">Emergency Contact Name *</label>
                <input
                  type="text"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  placeholder="Emergency contact person"
                  className={errors.emergencyContact ? 'error' : ''}
                />
                {errors.emergencyContact && <span className="error-message">{errors.emergencyContact}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="emergencyPhone">Emergency Phone *</label>
                <input
                  type="tel"
                  id="emergencyPhone"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  placeholder="080XXXXXXXX"
                  className={errors.emergencyPhone ? 'error' : ''}
                />
                {errors.emergencyPhone && <span className="error-message">{errors.emergencyPhone}</span>}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Player Details */}
        {step === 2 && (
          <div className="form-step">
            <h2>Player Information</h2>
            
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Position(s) *</label>
                {errors.position && <span className="error-message">{errors.position}</span>}
                <div className="checkbox-group">
                  {positions.map((pos) => (
                    <label key={pos} className="checkbox-label">
                      <input
                        type="checkbox"
                        name="position"
                        value={pos}
                        checked={formData.position.includes(pos)}
                        onChange={handleChange}
                      />
                      <span className="checkmark"></span>
                      {pos}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group full-width">
                <label>Special Skills</label>
                <div className="checkbox-group skills-grid">
                  {skills.map((skill) => (
                    <label key={skill} className="checkbox-label">
                      <input
                        type="checkbox"
                        name="specialSkills"
                        value={skill}
                        checked={formData.specialSkills.includes(skill)}
                        onChange={handleChange}
                      />
                      <span className="checkmark"></span>
                      {skill}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="jerseyNumber">Preferred Jersey Number</label>
                <input
                  type="number"
                  id="jerseyNumber"
                  name="jerseyNumber"
                  value={formData.jerseyNumber}
                  onChange={handleChange}
                  placeholder="e.g., 10"
                  min="1"
                  max="99"
                />
              </div>

              <div className="form-group">
                <label htmlFor="height">Height (cm) *</label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="e.g., 175"
                  className={errors.height ? 'error' : ''}
                />
                {errors.height && <span className="error-message">{errors.height}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="weight">Weight (kg) *</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g., 70"
                  className={errors.weight ? 'error' : ''}
                />
                {errors.weight && <span className="error-message">{errors.weight}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="dominantFoot">Dominant Foot *</label>
                <select
                  id="dominantFoot"
                  name="dominantFoot"
                  value={formData.dominantFoot}
                  onChange={handleChange}
                  className={errors.dominantFoot ? 'error' : ''}
                >
                  <option value="">Select Foot</option>
                  <option value="Right">Right</option>
                  <option value="Left">Left</option>
                  <option value="Both">Both</option>
                </select>
                {errors.dominantFoot && <span className="error-message">{errors.dominantFoot}</span>}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Football Background */}
        {step === 3 && (
          <div className="form-step">
            <h2>Football Background</h2>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="yearsOfExperience">Years of Experience *</label>
                <select
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  className={errors.yearsOfExperience ? 'error' : ''}
                >
                  <option value="">Select Experience</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5+">5+ years</option>
                </select>
                {errors.yearsOfExperience && <span className="error-message">{errors.yearsOfExperience}</span>}
              </div>

              <div className="form-group full-width">
                <label htmlFor="previousClubs">Previous Clubs/Teams</label>
                <textarea
                  id="previousClubs"
                  name="previousClubs"
                  value={formData.previousClubs}
                  onChange={handleChange}
                  placeholder="List any previous clubs or teams you've played for"
                  rows="3"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="achievements">Achievements & Awards</label>
                <textarea
                  id="achievements"
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleChange}
                  placeholder="List any football achievements, awards, or tournaments won"
                  rows="4"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Medical Information */}
        {step === 4 && (
          <div className="form-step">
            <h2>Medical Information</h2>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="bloodGroup">Blood Group *</label>
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className={errors.bloodGroup ? 'error' : ''}
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
                {errors.bloodGroup && <span className="error-message">{errors.bloodGroup}</span>}
              </div>

              <div className="form-group full-width">
                <label htmlFor="medicalConditions">Medical Conditions</label>
                <textarea
                  id="medicalConditions"
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleChange}
                  placeholder="Any existing medical conditions (asthma, diabetes, etc.)"
                  rows="3"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="allergies">Allergies</label>
                <textarea
                  id="allergies"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="List any allergies (food, medication, etc.)"
                  rows="3"
                />
              </div>
            </div>

            {/* Show guardian section for minors */}
            {isMinor && (
              <div className="guardian-section">
                <h3>Parent/Guardian Information</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="guardianName">Guardian Name</label>
                    <input
                      type="text"
                      id="guardianName"
                      name="guardianName"
                      value={formData.guardianName}
                      onChange={handleChange}
                      placeholder="Guardian's full name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="guardianPhone">Guardian Phone</label>
                    <input
                      type="tel"
                      id="guardianPhone"
                      name="guardianPhone"
                      value={formData.guardianPhone}
                      onChange={handleChange}
                      placeholder="080XXXXXXXX"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="guardianEmail">Guardian Email</label>
                    <input
                      type="email"
                      id="guardianEmail"
                      name="guardianEmail"
                      value={formData.guardianEmail}
                      onChange={handleChange}
                      placeholder="guardian.email@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="guardianRelationship">Relationship</label>
                    <input
                      type="text"
                      id="guardianRelationship"
                      name="guardianRelationship"
                      value={formData.guardianRelationship}
                      onChange={handleChange}
                      placeholder="e.g., Father, Mother, etc."
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 5: Agreement */}
        {step === 5 && (
          <div className="form-step">
            <h2>Terms & Agreement</h2>
            
            <div className="terms-section">
              <div className="terms-box">
                <h3>Terms & Conditions</h3>
                <div className="terms-content">
                  <p>By registering as a player, you agree to the following:</p>
                  <ul>
                    <li>Regular attendance at training sessions</li>
                    <li>Adherence to the club's code of conduct</li>
                    <li>Payment of registration fees (if applicable)</li>
                    <li>Participation in scheduled matches and tournaments</li>
                    <li>Maintaining sportsmanship and fair play</li>
                    <li>Following coach instructions and team rules</li>
                  </ul>
                  <p>The academy reserves the right to dismiss any player who violates these terms.</p>
                </div>
              </div>

              <div className="agreement-checkboxes">
                <label className="checkbox-label large">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-text">
                    I have read and agree to the Terms & Conditions *
                  </span>
                </label>
                {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}

                <label className="checkbox-label large">
                  <input
                    type="checkbox"
                    name="consentForPhotos"
                    checked={formData.consentForPhotos}
                    onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-text">
                    I consent to the use of my photos/videos for promotional purposes
                  </span>
                </label>

                <label className="checkbox-label large">
                  <input
                    type="checkbox"
                    name="consentForData"
                    checked={formData.consentForData}
                    onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-text">
                    I consent to the processing of my personal data for registration purposes *
                  </span>
                </label>
                {errors.consentForData && <span className="error-message">{errors.consentForData}</span>}
              </div>

              <div className="summary-section">
                <h3>Registration Summary</h3>
                <div className="summary-grid">
                  <div className="summary-item">
                    <span className="summary-label">Name:</span>
                    <span className="summary-value">{formData.fullName || 'Not provided'}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Age:</span>
                    <span className="summary-value">
                      {formData.dateOfBirth ? calculateAge(formData.dateOfBirth) + ' years' : 'Not provided'}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Position(s):</span>
                    <span className="summary-value">
                      {formData.position.length > 0 ? formData.position.join(', ') : 'Not selected'}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Experience:</span>
                    <span className="summary-value">{formData.yearsOfExperience || 'Not provided'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="form-navigation">
          {step > 1 && (
            <button type="button" onClick={prevStep} className="nav-btn prev-btn">
              Previous
            </button>
          )}
          
          {step < 5 ? (
            <button type="button" onClick={nextStep} className="nav-btn next-btn">
              Next Step
            </button>
          ) : (
            <button type="submit" className="nav-btn submit-btn">
              Complete Registration
            </button>
          )}
        </div>
      </form>

      {/* <div className="signup-footer">
        <p>Need help? Contact us at <a href="mailto:academy@example.com">academy@example.com</a> or call <a href="tel:+2348012345678">08012345678</a></p>
        <p className="copyright">© 2024 Football Academy. All rights reserved.</p>
      </div> */}
    </div>
  );
};

export default PlayerSignup;