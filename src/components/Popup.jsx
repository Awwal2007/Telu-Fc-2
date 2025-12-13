import { useState } from "react";
import image from "../assets/we are hiring.jpg"

function Popup() {
  const [show, setShow] = useState(true);

  return (
    show && (
      <div style={overlay}>
        <div style={modal}>
          <button style={button} onClick={() => setShow(false)}>Close</button>
          <div style={{width: "100%"}}>
            <img width={100} src={image} alt="we are hiring" />
          </div>
          <h2>We Are Hiring A Coach</h2>
          <button>Apply Now</button>
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
  borderRadius: "20px"
};

const modal = {
  background: "#fff",
  padding: "20px",
  margin: "15% auto",
  width: "300px",
};

const button = {
    textAlign: 'right',
    padding: "10px 20px",
    borderRadius: "10px"
}

export default Popup;
