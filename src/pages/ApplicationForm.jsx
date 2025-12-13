import React, { useState } from 'react'
import "./css/ApplicationForm.css"
import logo from "../assets/telu logo.png"

const ApplicationForm = () => {

    const [info, setInfo] = useState({
        fullname: "",
        email: "",
        contact: ""
    })

    const [errorMessage, setErrorMessage] = useState("")

    const handleInput = (e)=>{

        const {name, value} = e.target
        setInfo((prev) => ({
            ...prev,
            [name]: value
        }))   

        
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()

        if(!info.fullname){
            setErrorMessage("Fullname is Required")
            return
        }
        if(!info.email){
            setErrorMessage("Email is Required")
            return
        }
        if(!info.contact){
            setErrorMessage("Contact is Required")
            return
        }
        
        const res = await fetch("http://localhost:500/api/coach", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(info)
        })

        const data = await res.json()

        if(data.status == "success"){
            alert(data.message)
        }

        console.log(data);
        setErrorMessage("")
        setInfo({
            fullname: "",
            email: "",
            contact: ""
        })
    }

  return (
    <div className='application-form'>
        <section className="login">            
            <div className="signin-container">
                <div className="signin-form">
                    <h2>Coach Application Form</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-container">
                            <label htmlFor="username">FullName *</label>
                            <input onChange={handleInput} value={info.name} name='fullname' type="text"/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="email">Email*</label>
                            <input onChange={handleInput} value={info.email} name='email' type="email"/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="contact">Contact*</label>
                            <input onChange={handleInput} value={info.contact} name='contact' type="tel"/>
                        </div>
                        
                        {/* <div className="checkbox-container">
                            <div className="check" for="terms">
                                <input type="checkbox" name="terms" id="terms"/>
                                Accept all the Terms and Conditions
                            </div>
                        </div> */}
                        <div>
                            <p className="errorP">{errorMessage}</p>
                        </div>
                        <div className="login-button">
                            <button type="submit">Apply</button>
                        </div>
                        {/* <div className="login-button">
                            Already have an account? <a href="./index.html">Login</a>
                        </div> */}
                    </form>
                </div>
                <div className="signin-illustration">
                    <img src={logo} alt="logo" />
                </div>
            </div>
        </section>

    </div>
  )
}

export default ApplicationForm