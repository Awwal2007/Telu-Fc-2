import { useState } from "react";
import image from "../assets/we are hiring.jpg"
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";

function Popup() {
  const [show, setShow] = useState(true);

  return (
    show && (
      <div className="overlay" style={overlay}>
        <div className="modal" style={modal}>
          <button style={button} onClick={() => setShow(false)}><MdCancel /></button>
          <div style={{width: "100%", display: "flex", justifyContent: " center", alignItems: "center"}}>
            <img  src={image} alt="we are hiring" />
          </div>
          <h2>We Are Hiring A Coach</h2>
          <Link to="/application-form" style={{background: "#004924", border: "none", padding: "6px 10px", color: "white", borderRadius: "10px"}}>Apply Now</Link>
        </div>
      </div>
    )
  );
}

const overlay = {

  
};

const modal = {
  
};

const button = {
    padding: "5px 10px",
    borderRadius: "10px",
    background: "none",
    border: "none",
    width: "60px",
    fontSize: "2rem",
    cursor: "pointer",
    color: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

export default Popup;
