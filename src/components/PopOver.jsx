import { useState } from "react";
import image from "../assets/we are hiring.jpg"
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";

const PopOver = () => {
  const [show, setShow] = useState(true);

  return (
    show && (
      <div className="pop-up-overlay" style={overlay}>
        <div className="pop-up-modal" style={modal}>
          <button style={button} onClick={() => setShow(false)}><MdCancel /></button>
          <div style={{width: "100%", display: "flex", justifyContent: " center", alignItems: "center"}}>
            <img  src={image} alt="we are hiring" />
          </div>
          <h2>Apply to join TELU FC</h2>
          <div style={{display: "flex", justifyContent: "center", gap: "40px",alignItems: "center"}}>
            <Link target="blank" to="/application-form" style={{background: "#F58220", border: "none", padding: "6px 10px", color: "white", borderRadius: "10px"}}>As a Coach</Link>
            <a href="https://player.telufootballclub.com/" target="blank" style={{background: "#004924", border: "none", padding: "6px 10px", color: "white", borderRadius: "10px"}}>As a Player</a>
          </div>
        </div>
      </div>
    )
  );
}

const overlay = {

};

const modal = {
  fontFamily: "Poppins",
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

export default PopOver;
