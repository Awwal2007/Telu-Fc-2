import React, { useState, useEffect } from 'react';
import './css/Admin.css';
import { useNews } from '../hooks/useNews';
import Swal from 'sweetalert2';

const Admin = () => {
  const [events, setEvents] = useState([]);
  const [imagePreviews, setImagePreviews] = useState({});
  const [expandedRows, setExpandedRows] = useState({});
  const [facebookLink, setFacebookLink] = useState('');
  const [activeTab, setActiveTab] = useState('events');
  
  // Coach states
  const [coaches, setCoaches] = useState([]);
  const [filteredCoaches, setFilteredCoaches] = useState([]);
  const [coachFilter, setCoachFilter] = useState('all'); // 'all', 'approved', 'pending'
  const [loadingCoaches, setLoadingCoaches] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(null); // For detailed view

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    description: '',
    mainImage: null,
    image1: null,
    image2: null,
    image3: null,
  });

  const {
    createNews,
    fetchNews,
    deleteNews, 
    loading,
    creating,
    news,
    createFacebookLink,
    fetchFacebookLink,
    deleteFacebookLink,
    facebookPosts
  } = useNews();

  // Fetch news when component mounts
  useEffect(() => {
    fetchNews();
    fetchFacebookLink();
    fetchCoaches();
  }, []);

  // Keep local events list synced with news from the hook
  useEffect(() => {
    setEvents(news);
  }, [news]);

  // Filter coaches based on selected filter
  useEffect(() => {
    if (coaches.length > 0) {
      let filtered = [...coaches];
      if (coachFilter === 'approved') {
        filtered = coaches.filter(coach => coach.status === "approved");
      } else if (coachFilter === 'pending') {
        filtered = coaches.filter(coach => coach.status === "pending");
      }else if(coachFilter === 'rejected'){
        filtered = coaches.filter(coach => coach.status === "rejected");
      }
      setFilteredCoaches(filtered);
    }
  }, [coaches, coachFilter]);

  const baseUrl = import.meta.env.VITE_BASE_URL
  

  const confirmAction = async (text) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, proceed',
      cancelButtonText: 'Cancel',
    });

    return result.isConfirmed;
  };


  // Fetch coaches from API
  const fetchCoaches = async () => {
    setLoadingCoaches(true);
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`${baseUrl}/coach`);
      const data = await response.json();
      setCoaches(data.data);
      
      setFilteredCoaches(data.data);
    } catch (error) {
      console.error('Error fetching coaches:', error);
    } finally {
      setLoadingCoaches(false);
    }
  };

  // Approve coach application
  const approveCoach = async (id) => {
    const confirmed = await confirmAction('Approve this coach application?');
    if (!confirmed) return;

    try {
      const response = await fetch(`${baseUrl}/coach/change/status/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status: "approved" }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (data.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Approved",
          text: data.message,
          timer: 2000,
          showConfirmButton: false,
        });
        fetchCoaches();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error approving coach",
      });
    }
  };


  // Reject coach application
  const rejectCoach = async (id) => {
    const confirmed = await confirmAction('Reject this coach application?');
    if (!confirmed) return;

    try {
      const response = await fetch(`${baseUrl}/coach/change/status/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status: "rejected" }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (data.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Rejected",
          text: data.message,
          timer: 2000,
          showConfirmButton: false,
        });
        fetchCoaches();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error rejecting coach",
      });
    }
  };


  // Delete coach application
  const deleteCoach = async (id) => {
    const confirmed = await confirmAction('Delete this coach application permanently?');
    if (!confirmed) return;

    try {
      const response = await fetch(`${baseUrl}/coach/delete/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: data.message,
          timer: 2000,
          showConfirmButton: false,
        });
        fetchCoaches();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error deleting coach",
      });
    }
  };


  // View coach details
  const viewCoachDetails = (coach) => {
    setSelectedCoach(coach);
  };

  // Close coach details
  const closeCoachDetails = () => {
    setSelectedCoach(null);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file) {
      setNewEvent((prev) => ({ ...prev, [name]: file }));
      setImagePreviews((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
    }
  };

  const addEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newEvent.title);
    formData.append('date', newEvent.date);
    formData.append('description', newEvent.description);
    if (newEvent.mainImage) formData.append('mainImage', newEvent.mainImage);
    if (newEvent.image1) formData.append('image1', newEvent.image1);
    if (newEvent.image2) formData.append('image2', newEvent.image2);
    if (newEvent.image3) formData.append('image3', newEvent.image3);

    await createNews(formData);
    setNewEvent({ title: '', date: '', description: '', mainImage: null, image1: null, image2: null, image3: null, });
    setImagePreviews({});
    fetchNews();
  };

  const removeEvent = async (id) => {
    const confirmed = await confirmAction('Delete this event?');
    if (!confirmed) return;

    await deleteNews(id);

    Swal.fire({
      icon: "success",
      title: "Deleted",
      text: "Event deleted successfully",
      timer: 1500,
      showConfirmButton: false,
    });

    fetchNews();
  };


  const toggleExpand = (id, field) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: !prev[id]?.[field],
      },
    }));
  };

  const truncate = (text, length) => {
    if (!text) return 'N/A';
    return text.length > length ? text.slice(0, length) + '...' : text;
  };

  // Facebook Link Section
  const addFacebookPost = async (e) => {
    e.preventDefault();
    if (!facebookLink) return;

    await createFacebookLink({facebookLink});
    setFacebookLink('');
    fetchFacebookLink();
  };

  const removeFacebookPost = async (id) => {
    const confirmed = await confirmAction('Delete this Facebook post?');
    if (!confirmed) return;

    await deleteFacebookLink(id);

    Swal.fire({
      icon: "success",
      title: "Deleted",
      text: "Facebook post removed",
      timer: 1500,
      showConfirmButton: false,
    });

    fetchFacebookLink();
  };


  // Facebook SDK loader
  useEffect(() => {
    if (!window.FB) {
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);
    } else {
      window.FB.XFBML.parse();
    }
  }, []);

  useEffect(() => {
    if (window.FB) window.FB.XFBML.parse();
  }, [facebookPosts]);

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <nav className="admin-nav">
          <button 
            className={activeTab === 'events' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab('events')}
          >
            Events
          </button>
          <button 
            className={activeTab === 'facebook' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab('facebook')}
          >
            Facebook Posts
          </button>
          <button 
            className={activeTab === 'coaches' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab('coaches')}
          >
            Coach Applications ({coaches.length})
          </button>
        </nav>
      </header>

      {activeTab === 'events' && (
        <>
          <section className="form-section">
            <h2>Add New Event</h2>
            <form onSubmit={addEvent} className="event-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">Title *</label>
                  <input
                    required
                    type="text"
                    name="title"
                    placeholder="Event title"
                    value={newEvent.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="date">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={newEvent.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  name="description"
                  placeholder="Event description"
                  value={newEvent.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="mainImage">Main Image *</label>
                  <input
                    name="mainImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="image1">Image 1</label>
                  <input name="image1" type="file" accept="image/*" onChange={handleImage} />
                </div>
                <div className="form-group">
                  <label htmlFor="image2">Image 2</label>
                  <input name="image2" type="file" accept="image/*" onChange={handleImage} />
                </div>
                <div className="form-group">
                  <label htmlFor="image3">Image 3</label>
                  <input name="image3" type="file" accept="image/*" onChange={handleImage} />
                </div>
              </div>
              
              <div className="preview-row">
                {imagePreviews.mainImage && <div className="preview-container"><img loading='lazy' src={imagePreviews.mainImage} alt='mainImage' className="preview" /><span>Main</span></div>}
                {imagePreviews.image1 && <div className="preview-container"><img loading='lazy' src={imagePreviews.image1} alt='image1' className="preview" /><span>Image 1</span></div>}
                {imagePreviews.image2 && <div className="preview-container"><img loading='lazy' src={imagePreviews.image2} alt='image2' className="preview" /><span>Image 2</span></div>}
                {imagePreviews.image3 && <div className="preview-container"><img loading='lazy' src={imagePreviews.image3} alt='image3' className="preview" /><span>Image 3</span></div>}
              </div>
              
              <button disabled={creating} type="submit" className="submit-btn">
                {creating ? 'Adding Event...' : 'Add Event'}
              </button>
            </form>
          </section>

          <section className="events-section">
            <h2>Manage Events</h2>
            {loading ? (
              <div className="loading">Loading events...</div>
            ) : events.length === 0 ? (
              <div className="no-data">No events found. Add your first event above.</div>
            ) : (
              <div className="events-table-container">
                <table className="events-table">
                  <thead>
                    <tr>
                      <th>Main Image</th>
                      <th>Title</th>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Extra Images</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((ev) => (
                      <tr key={ev._id}>
                        <td>
                          <img loading='lazy' src={ev.mainImage} alt={ev.title} className="thumb" />
                        </td>
                        <td>
                          {expandedRows[ev._id]?.title ? ev.title : truncate(ev.title, 20)}
                          {ev?.title && ev.title.length > 20 && (
                            <span
                              className="read-more"
                              onClick={() => toggleExpand(ev._id, 'title')}
                            >
                              {expandedRows[ev._id]?.title ? ' Show less' : ' Show more'}
                            </span>
                          )}
                        </td>
                        <td>{new Date(ev.date).toLocaleDateString()}</td>
                        <td>
                          {expandedRows[ev._id]?.description ? ev.description : truncate(ev.description, 50)}
                          {ev?.description && ev.description.length > 50 && (
                            <span
                              className="read-more"
                              onClick={() => toggleExpand(ev._id, 'description')}
                            >
                              {expandedRows[ev._id]?.description ? ' Show less' : ' Show more'}
                            </span>
                          )}
                        </td>
                        <td className="extra-images">
                          {ev.image1 && <img loading='lazy' src={ev.image1} alt={ev.title} className="thumb" />}
                          {ev.image2 && <img loading='lazy' src={ev.image2} alt={ev.title} className="thumb" />}
                          {ev.image3 && <img loading='lazy' src={ev.image3} alt={ev.title} className="thumb" />}
                        </td>
                        <td>
                          <button onClick={() => removeEvent(ev._id)} className="delete-btn">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}

      {activeTab === 'facebook' && (
        <section className="facebook-section">
          <h2>Manage Facebook Posts</h2>
          <form onSubmit={addFacebookPost} className="facebook-form">
            <div className="form-group">
              <label htmlFor="facebookLink">Facebook Post URL</label>
              <input
                type="url"
                id="facebookLink"
                value={facebookLink}
                onChange={(e) => setFacebookLink(e.target.value)}
                placeholder="Paste Facebook post URL here"
                required
              />
            </div>
            <button type="submit" className="submit-btn">Add Facebook Post</button>
          </form>
          
          <div className="facebook-posts-grid">
            {facebookPosts.length === 0 ? (
              <div className="no-data">No Facebook posts added yet.</div>
            ) : (
              facebookPosts.map((post) => (
                <div key={post._id} className="facebook-post-card">
                  <div className="fb-post-container">
                    <div
                      className="fb-post"
                      data-href={post.facebookLink}
                      data-width="100%"
                      data-show-text="true"
                    ></div>
                  </div>
                  <button onClick={() => removeFacebookPost(post._id)} className="delete-btn">Delete Post</button>
                </div>
              ))
            )}
          </div>

        </section>
      )}

      {activeTab === 'coaches' && (
        <section className="coaches-section">
          <h2>Coach Applications</h2>
          
          <div className="coach-filter-buttons">
            <button 
              className={`filter-btn ${coachFilter === 'all' ? 'active' : ''}`}
              onClick={() => setCoachFilter('all')}
            >
              All Coaches ({coaches.length})
            </button>
            <button 
              className={`filter-btn ${coachFilter === 'approved' ? 'active' : ''}`}
              onClick={() => setCoachFilter('approved')}
            >
              Approved ({coaches.filter(c => c.status === "approved").length})
            </button>
            <button 
              className={`filter-btn ${coachFilter === 'rejected' ? 'active' : ''}`}
              onClick={() => setCoachFilter('rejected')}
            >
              Rejected ({coaches.filter(c => c.status === "rejected").length})
            </button>
            <button 
              className={`filter-btn ${coachFilter === 'pending' ? 'active' : ''}`}
              onClick={() => setCoachFilter('pending')}
            >
              Pending ({coaches.filter(c => c.status === "pending").length})
            </button>
          </div>

          {loadingCoaches ? (
            <div className="loading">Loading coach applications...</div>
          ) : filteredCoaches.length === 0 ? (
            <div className="no-data">No coach applications found.</div>
          ) : (
            <div className="coaches-table-container">
              <table className="coaches-table">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Position</th>
                    <th>Experience</th>
                    <th>Status</th>
                    <th>Applied Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCoaches.map((coach) => (
                    <tr key={coach._id} className={selectedCoach?._id === coach._id ? 'selected-row' : ''}>
                      <td>
                        <div className="coach-name-cell">
                          <div className="coach-name">
                            {coach.fullname}
                            {coach.passportPhoto && (
                              <img 
                                src={coach.passportPhoto} 
                                alt={coach.fullname} 
                                className="coach-photo-thumb"
                                onError={(e) => e.target.style.display = 'none'}
                              />
                            )}
                          </div>
                          {coach.gender && <span className="gender-badge">{coach.gender}</span>}
                        </div>
                      </td>
                      <td>{coach.email}</td>
                      <td>{coach.phone}</td>
                      <td>
                        {Array.isArray(coach.position) ? coach.position.join(', ') : coach.position}
                        {coach.otherPosition && <div className="other-info">Other: {coach.otherPosition}</div>}
                      </td>
                      <td>
                        {coach.yearsExperience ? `${coach.yearsExperience} years` : 'N/A'}
                      </td>
                      <td>
                        <span className={`status-badge ${coach.status}`}>
                          {coach.status}
                        </span>
                      </td>
                      <td>{formatDate(coach.createdAt)}</td>
                      <td>
                        <div className="coach-actions">
                          <button 
                            onClick={() => viewCoachDetails(coach)} 
                            className="view-btn"
                          >
                            View
                          </button>
                          {coach.status !== "approved" && (
                            <button 
                              onClick={() => approveCoach(coach._id)} 
                              className="approve-btn"
                            >
                              Approve
                            </button>
                          )}
                          {coach.status === "approved" && (
                            <button 
                              onClick={() => rejectCoach(coach._id)} 
                              className="approve-btn"
                            >
                              Reject
                            </button>
                          )}
                          <button 
                            onClick={() => deleteCoach(coach._id)} 
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* Coach Details Modal */}
      {selectedCoach && (
        <div className="coach-details-modal" onClick={closeCoachDetails}>
          <div className="coach-details-content" onClick={(e) => e.stopPropagation()}>
            <div className="coach-details-header">
              <h2>Coach Application Details</h2>
              <button className="close-btn" onClick={closeCoachDetails}>×</button>
            </div>
            
            <div className="coach-details-body">
              <div className="coach-info-grid">
                
                {/* SECTION A: Personal Info */}
                <div className="info-section">
                  <h3>Personal Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Full Name:</label>
                      <p>{selectedCoach.fullname || 'N/A'}</p>
                    </div>
                    <div className="info-item">
                      <label>Date of Birth:</label>
                      <p>{formatDate(selectedCoach.dob)}</p>
                    </div>
                    <div className="info-item">
                      <label>Gender:</label>
                      <p>{selectedCoach.gender || 'N/A'}</p>
                    </div>
                    <div className="info-item">
                      <label>Marital Status:</label>
                      <p>{selectedCoach.maritalStatus || 'N/A'}</p>
                    </div>
                    <div className="info-item">
                      <label>Nationality:</label>
                      <p>{selectedCoach.nationality || 'N/A'}</p>
                    </div>
                    <div className="info-item">
                      <label>State/LGA:</label>
                      <p>{selectedCoach.state ? `${selectedCoach.state}${selectedCoach.lga ? ` / ${selectedCoach.lga}` : ''}` : 'N/A'}</p>
                    </div>
                    <div className="info-item">
                      <label>Address:</label>
                      <p>{selectedCoach.address || 'N/A'}</p>
                    </div>
                    <div className="info-item">
                      <label>Phone:</label>
                      <p>{selectedCoach.phone || 'N/A'}</p>
                    </div>
                    <div className="info-item">
                      <label>Email:</label>
                      <p>{selectedCoach.email || 'N/A'}</p>
                    </div>
                    <div className="info-item">
                      <label>Next of Kin:</label>
                      <p>{selectedCoach.nextOfKin || 'N/A'}</p>
                    </div>
                    <div className="info-item">
                      <label>Next of Kin Phone:</label>
                      <p>{selectedCoach.nextOfKinPhone || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* SECTION B: Position */}
                <div className="info-section">
                  <h3>Position & Qualifications</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Position(s):</label>
                      <p>
                        {Array.isArray(selectedCoach.position) 
                          ? selectedCoach.position.join(', ')
                          : selectedCoach.position || 'N/A'
                        }
                        {selectedCoach.otherPosition && <span> ({selectedCoach.otherPosition})</span>}
                      </p>
                    </div>
                    <div className="info-item">
                      <label>Highest Education:</label>
                      <p>
                        {selectedCoach.highestEducation || 'N/A'}
                        {selectedCoach.otherEducation && <span> ({selectedCoach.otherEducation})</span>}
                      </p>
                    </div>
                    <div className="info-item">
                      <label>Certifications:</label>
                      <p>
                        {Array.isArray(selectedCoach.certifications) && selectedCoach.certifications.length > 0 
                          ? selectedCoach.certifications.join(', ')
                          : 'N/A'
                        }
                        {selectedCoach.otherCertification && <span> ({selectedCoach.otherCertification})</span>}
                      </p>
                    </div>
                    <div className="info-item">
                      <label>Institution Attended:</label>
                      <p>{selectedCoach.institutionAttended || 'N/A'}</p>
                    </div>
                    <div className="info-item">
                      <label>Year Obtained:</label>
                      <p>{selectedCoach.yearObtained || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* SECTION D: Experience */}
                <div className="info-section">
                  <h3>Experience</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Years of Experience:</label>
                      <p>{selectedCoach.yearsExperience ? `${selectedCoach.yearsExperience} years` : 'N/A'}</p>
                    </div>
                    <div className="info-item full-width">
                      <label>Previous Clubs/Teams:</label>
                      <p>{selectedCoach.previousClubs || 'N/A'}</p>
                    </div>
                    <div className="info-item full-width">
                      <label>Achievements:</label>
                      <p>{selectedCoach.achievements || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* SECTION E: Skills */}
                <div className="info-section">
                  <h3>Skills & Specialization</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Preferred Formations:</label>
                      <p>{selectedCoach.preferredFormations || 'N/A'}</p>
                    </div>
                    <div className="info-item">
                      <label>Specialization:</label>
                      <p>
                        {Array.isArray(selectedCoach.specialization) 
                          ? selectedCoach.specialization.join(', ')
                          : selectedCoach.specialization || 'N/A'
                        }
                      </p>
                    </div>
                    <div className="info-item">
                      <label>Work with Youths:</label>
                      <p>{selectedCoach.workWithYouths || 'N/A'}</p>
                    </div>
                    <div className="info-item">
                      <label>Work Under Pressure:</label>
                      <p>{selectedCoach.workUnderPressure || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* SECTION F: Availability */}
                <div className="info-section">
                  <h3>Availability</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Availability:</label>
                      <p>{selectedCoach.availability || 'N/A'}</p>
                    </div>
                    <div className="info-item">
                      <label>Expected Salary:</label>
                      <p>{selectedCoach.expectedSalary ? `$${selectedCoach.expectedSalary}` : 'N/A'}</p>
                    </div>
                    <div className="info-item">
                      <label>Start Date:</label>
                      <p>{formatDate(selectedCoach.startDate)}</p>
                    </div>
                  </div>
                </div>

                {/* SECTION G: Referees */}
                {selectedCoach.referees && selectedCoach.referees.length > 0 && (
                  <div className="info-section">
                    <h3>Referees</h3>
                    <div className="referees-list">
                      {selectedCoach.referees.map((referee, index) => (
                        <div key={index} className="referee-item">
                          <h4>Referee {index + 1}</h4>
                          <div className="info-grid">
                            <div className="info-item">
                              <label>Name:</label>
                              <p>{referee.name || 'N/A'}</p>
                            </div>
                            <div className="info-item">
                              <label>Position:</label>
                              <p>{referee.position || 'N/A'}</p>
                            </div>
                            <div className="info-item">
                              <label>Phone:</label>
                              <p>{referee.phone || 'N/A'}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* File Uploads */}
                <div className="info-section">
                  <h3>Uploaded Documents</h3>
                  <div className="file-links">
                    {selectedCoach.cv && (
                      <a href={selectedCoach.cv} target="_blank" rel="noopener noreferrer" className="file-link">
                        📄 Curriculum Vitae (CV)
                      </a>
                    )}
                    {selectedCoach.applicationLetter && (
                      <a href={selectedCoach.applicationLetter} target="_blank" rel="noopener noreferrer" className="file-link">
                        📄 Application Letter
                      </a>
                    )}
                    {selectedCoach.passportPhoto && (
                      <a href={selectedCoach.passportPhoto} target="_blank" rel="noopener noreferrer" className="file-link">
                        📷 Passport Photo
                      </a>
                    )}
                    {Array.isArray(selectedCoach.certificates) && selectedCoach.certificates.map((cert, index) => (
                      <a key={index} href={cert} target="_blank" rel="noopener noreferrer" className="file-link">
                        📜 Certificate {index + 1}
                      </a>
                    ))}
                  </div>
                </div>

              </div>
              
              <div className="coach-details-actions">
                {selectedCoach.status !== "approved" && (
                  <button onClick={() => approveCoach(selectedCoach._id)} className="approve-btn large">
                    Approve Coach
                  </button>
                )}
                {selectedCoach.status === "approved" && (
                  <button onClick={() => approveCoach(selectedCoach._id)} className="approve-btn large">
                    Reject Coach
                  </button>
                )}
                <button onClick={() => deleteCoach(selectedCoach._id)} className="delete-btn large">
                  Delete Application
                </button>
                <button onClick={closeCoachDetails} className="close-details-btn">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Mock data based on your schema
// const mockCoaches = [
//   {
//     _id: '1',
//     fullname: 'John Doe',
//     dob: '1985-05-15',
//     gender: 'Male',
//     maritalStatus: 'Married',
//     nationality: 'Nigerian',
//     state: 'Lagos',
//     lga: 'Ikeja',
//     address: '123 Main Street, Lagos',
//     phone: '+2348012345678',
//     email: 'john.doe@example.com',
//     nextOfKin: 'Jane Doe',
//     nextOfKinPhone: '+2348098765432',
    
//     position: ['Head Coach', 'Technical Director'],
//     otherPosition: '',
    
//     highestEducation: 'B.Sc. Sports Science',
//     otherEducation: '',
//     certifications: ['CAF License B', 'First Aid Certification'],
//     otherCertification: '',
//     issuingBody: 'CAF',
//     yearObtained: '2020',
    
//     yearsExperience: 8,
//     previousClubs: 'Shooting Stars, Dolphins FC',
//     achievements: 'Won State Championship 2022',
    
//     preferredFormations: '4-3-3, 4-4-2',
//     specialization: ['Tactics', 'Youth Development'],
//     workWithYouths: 'Yes',
//     workUnderPressure: 'Yes',
    
//     availability: 'Full Time',
//     expectedSalary: 150000,
//     startDate: '2024-03-01',
    
//     referees: [
//       {
//         name: 'Michael Johnson',
//         position: 'Club Chairman',
//         phone: '+2348033344555'
//       }
//     ],
    
//     cv: '/uploads/cv1.pdf',
//     applicationLetter: '/uploads/letter1.pdf',
//     passportPhoto: '/uploads/photo1.jpg',
//     certificates: ['/uploads/cert1.pdf', '/uploads/cert2.pdf'],
    
//     isApproved: false,
//     declaration: true,
//     createdAt: '2024-01-15T10:30:00Z'
//   }
// ];

export default Admin;