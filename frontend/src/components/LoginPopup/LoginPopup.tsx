import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

function LoginPopup({setShowLogin}) {
    const [currState,setCurrState] = useState("Sign UP")
  return (
    <div className="login-popup">
        <form action="" className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState === "Login"?<></>:  <input type="text" placeholder='Your Name' required />      }
                <input type="text" placeholder='Your Email' required />
                <input type="password" placeholder='Password' required />
            </div>
            <button>{currState === "Sign UP"?"Create Account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By containing, i agree to the terms of use and privacy policy</p>
            </div>
            {currState ==="Login"
            ?            <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click Here</span></p>
            :            <p>Already have and account? <span onClick={()=>setCurrState("Login")}>Login Here</span></p>

            }
        </form>
    </div>
)
}

export default LoginPopup