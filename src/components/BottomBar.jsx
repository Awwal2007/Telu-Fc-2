
import './css/ButtonBar.css';

import logo from "../assets/telu logo.png"
import { IoCallOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';


const ButtonBar = () => {

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Images Carousel Section */}
        <div className="footer-section">
          <div className="section-header">
            <h3 className="section-title">Stay Updated</h3>
          </div>
          <div className="newsletter-container">
              <div className="archives-list">
                <Link to='/' className="archive-link">
                  <img style={{width: "60px"}} src={logo} alt="logo" />
                </Link>
                <p>Get the latest update from our social medias or contact us</p>
                <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                    <p style={{display: "flex", gap: "5px"}}>
                        <IoCallOutline />
                        <span>09033884748</span>
                    </p>
                    <p style={{display: "flex", gap: "5px"}}>
                        <HiOutlineMail/>
                        <span>telufootbalclub@info.com</span>
                    </p>
                    <p style={{display: "flex", gap: "5px"}}>
                        <IoLocationOutline/>
                        <span>Government Quarters. Oke Afo, Iwo. Osun State. Nigeria.</span>
                    </p>
                </div>
              </div>
              
          </div>
        </div>

        {/* Newsletter Signup Section */}
        <div className="footer-section">
          <div className="section-header">
            <h3 className="section-title">Quick Links</h3>
          </div>
          <div className="newsletter-container">
              <div className="archives-list">
                <Link to='/' className="archive-link">Home</Link>
                <Link to='/blogs' className="archive-link">Blogs</Link>
                <Link to='/gallery' className="archive-link">Gallery</Link>
              </div>
              
          </div>
        </div>

        {/* Archives Section */}
        <div className="footer-section">
          <div className="section-header">
            <h3 className="section-title">Supports</h3>
          </div>
          <div className="archives-container">
            <div className="archives-list">
              <a className="archive-link">FAQs</a>
              <a className="archive-link">Contact Supports</a>
              <a className="archive-link">Terms and Condition</a>
              <a className="archive-link">Privacy Policy</a>
              <a className="archive-link">Cookie Policy</a>
            </div>
          </div>
        </div>


      </div>
      
      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Telu Football Club. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default ButtonBar;
