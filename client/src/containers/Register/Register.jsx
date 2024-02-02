import { useState } from "react"
import "./Register.css"
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import rootUrl from "../../baseUrl"

export default function Register() {

    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const navigate = useNavigate();

    const registerUser = async () => {
        if (!username || !email || !password) {
          setError("All fields are required.");
          return;
        }

        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: username,email: email, password: password }),
          credentials: 'include',
        };
    
        try {
            const res = await fetch(`${rootUrl}register`, requestOptions);
            if(!res.ok){
              throw new Error(`HTTP error! Status: ${res.status}`);
            }
            navigate("/login");
        } catch (error) {
          // Handle registration error if needed
          console.error("Registration failed", error);
        }
    };

  return (
    <div className='register-container'>
      <div className="register-wrapper">
        <h1 className="register-heading">Register On Hacky News</h1>
        <input type="text" placeholder="Username" value={username} required onChange={(e)=>setUsername(e.target.value)}/>
        <input type="email" placeholder="Email" value={email} required onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} required onChange={(e)=>setPassword(e.target.value)}/>
        {error && <div className="error-text"><i>** {error} **</i></div>}
        <button className="register-btn" onClick={registerUser}>Register</button>
    
        <div onClick={()=>navigate("/login")} className="register-login-link"><i>Already have an account</i></div>
      </div>
    </div>
  )
}