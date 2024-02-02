import { useState } from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import rootUrl from "../../baseUrl"

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const loginUser = async () => {
        if (!email || !password) {
            setError("All fields are required.");
            return;
        }

        try {
            const res = await axios.post(`${rootUrl}login`,{email: email,password: password},
                {
                    headers:{
                        'Content-Type': 'application/json',
                    }
                }
            );

                localStorage.setItem("username",res.data.username)
            navigate('/home'); // Navigate to "/home" after successful login
        } catch (error) {
            // Handle login error if needed
            console.error("Login failed", error);
            setError("Invalid credentials. Please try again.");
        }
    };

  return (
    <div className='login-container'>
      <div className="login-wrapper">
        <h1 className="login-heading">Login On Hacky News</h1>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        {error && <div className="error-text"><i>** {error} **</i></div>}
        <button className="login-btn" onClick={loginUser}>Login</button>
        <div className="login-register-link" onClick={()=>navigate('/')}><i>Create an account</i></div>
      </div>
    </div>
  )
}