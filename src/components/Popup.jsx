import { useState } from "react";
import image from "../assets/we are hiring.jpg"
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";

function Popup() {
  const [show, setShow] = useState(true);

  return (
    show && (
      <div style={overlay}>
        <div style={modal}>
          <button style={button} onClick={() => setShow(false)}><MdCancel /></button>
          <div style={{width: "100%", display: "flex", justifyContent: " center", alignItems: "center"}}>
            <img width={300} src={image} alt="we are hiring" />
          </div>
          <h2>We Are Hiring A Coach</h2>
          <Link to="/application-form" style={{background: "#004924", border: "none", padding: "6px 10px", color: "white", borderRadius: "10px"}}>Apply Now</Link>
        </div>
      </div>
    )
  );
}

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  zIndex: 10000,
  
};

const modal = {
  background: "#fff",
  padding: "20px",
  margin: " 60px auto",
  width: "400px",
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
//   alignItems: "center",
  textAlign: "center",
  gap: "10px"
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
